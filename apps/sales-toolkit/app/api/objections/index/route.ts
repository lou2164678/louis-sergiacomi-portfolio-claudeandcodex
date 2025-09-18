export const runtime = 'nodejs'
import { embed } from '../../../../lib/embeddings'

type Body = { files?: { name:string; size:number; type?:string }[]; docs?: { id?:string; title:string; text:string }[] }

export async function POST(req: Request): Promise<Response> {
  try {
    const contentType = req.headers.get('content-type') || ''
    const apiKey = req.headers.get('x-api-key') || undefined
    let docs: { id: string; title: string; text: string }[] = []
    let filesMeta: { name: string; size: number; type?: string }[] = []

    if (contentType.includes('application/json')) {
      const body = (await req.json()) as Body
      docs = (body.docs || []).map((d, i) => ({ id: d.id || `doc_${Date.now()}_${i}`, title: d.title || `Doc ${i+1}`, text: d.text || '' }))
      filesMeta = body.files || []
    } else if (contentType.includes('multipart/form-data')) {
      const fd = await req.formData()
      const fileEntries = fd.getAll('files') as File[]
      for (let i = 0; i < fileEntries.length; i++) {
        const f = fileEntries[i]
        const buf = Buffer.from(await f.arrayBuffer())
        const type = f.type || guessMime(f.name)
        let text = ''
        if (type.startsWith('text/') || /\.(md|txt|csv)$/i.test(f.name)) {
          text = buf.toString('utf8')
        } else if (type === 'application/pdf' || /\.pdf$/i.test(f.name)) {
          text = await extractPdfText(buf)
        } else {
          text = ''
        }
        filesMeta.push({ name: f.name, size: f.size, type })
        docs.push({ id: `doc_${Date.now()}_${i}`, title: f.name, text })
      }
    } else {
      return json({ error: 'Unsupported content-type' }, 415)
    }

    const chunks = docs.flatMap(d => chunkDoc(d))
    const vectors = await embed(chunks.map(c => c.text), apiKey ? { apiKey } : undefined)
    const chunksWithEmb = chunks.map((c, i) => ({ ...c, embedding: vectors[i] }))
    await persist({ docs, files: filesMeta, chunks: chunksWithEmb })
    return json({ ok: true, counts: { docs: docs.length, files: filesMeta.length, chunks: chunks.length }, docs: docs.map(d => ({ id: d.id, title: d.title })) })
  } catch (e: any) {
    return json({ error: e?.message || 'Bad request' }, 400)
  }
}

function json(data: any, status = 200): Response { return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } }) }

function chunkDoc(d: { id:string; title:string; text:string }) {
  const size = 400
  const chunks: { id: string; docId: string; title: string; page?: number; text: string }[] = []
  for (let i = 0; i < d.text.length; i += size) {
    const text = d.text.slice(i, i + size)
    chunks.push({ id: `chunk_${d.id}_${i/size}`, docId: d.id, title: d.title, page: Math.floor(i/size)+1, text })
  }
  if (!chunks.length) chunks.push({ id: `chunk_${d.id}_0`, docId: d.id, title: d.title, page: 1, text: d.text })
  return chunks
}

async function persist(data: any) {
  const { writeFile } = await import('fs/promises')
  const { join } = await import('path')
  const p = join(process.cwd(), 'apps', 'sales-toolkit', 'data', 'objections_index.json')
  await writeFile(p, JSON.stringify(data, null, 2), 'utf8')
}

function guessMime(name: string) { if (/\.md$/i.test(name)) return 'text/markdown'; if (/\.txt$/i.test(name)) return 'text/plain'; if (/\.csv$/i.test(name)) return 'text/csv'; if (/\.pdf$/i.test(name)) return 'application/pdf'; return 'application/octet-stream' }

async function extractPdfText(buf: Buffer): Promise<string> {
  try {
    const pdfParse = (await import('pdf-parse')).default as (b: Buffer) => Promise<{ text: string }>
    const res = await pdfParse(buf)
    return res.text || ''
  } catch {
    return ''
  }
}

