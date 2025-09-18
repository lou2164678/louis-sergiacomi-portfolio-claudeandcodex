export const runtime = 'nodejs'
type Body = { question: string }
import { embed, cosine } from '../../../../lib/embeddings'
import { openaiCompat } from '../../../../lib/openaiClient'

export async function POST(req: Request): Promise<Response> {
  try {
    const { question } = (await req.json()) as Body
    const apiKey = req.headers.get('x-api-key') || undefined
    const { chunks } = await loadIndex()
    if (!chunks || !chunks.length) return json({ error: 'KB is empty. Please index documents first.' }, 400)
    const [qv] = await embed([question], apiKey ? { apiKey } : undefined)
    const ranked = rankByVector(chunks, qv).slice(0, 4)
    const system = 'Sales enablement coach; answer only from provided chunks; always show citations [Title p.X]. JSON only.'
    const chunksText = ranked.map(r => `[Doc:${r.title} p.${r.page || 1}]\n${r.text}`).join('\n\n')
    const user = `Question: ${question}\n\nTop Chunks:\n${chunksText}\n\nReturn JSON with keys: bullets (string[] length 3), caveat (string), talkTrack (string), citations ({title:string,page?:number}[]).`
    const baseUrl = (process.env.XAI_BASE_URL || 'https://api.x.ai/v1').replace(/\/$/, '')
    const model = process.env.XAI_MODEL || 'grok-code-fast-1'
    const llm = await openaiCompat.chatJSON<{ bullets: string[]; caveat: string; talkTrack: string; citations: { title:string; page?:number }[] }>([
      { role: 'system', content: system },
      { role: 'user', content: user }
    ], apiKey ? { apiKey, baseUrl, model, temperature: 0.2, maxTokens: 600 } : { baseUrl, model, temperature: 0.2, maxTokens: 600 })
    const citations = llm.citations?.length ? llm.citations : ranked.map(r => ({ title: r.title, page: r.page }))
    return json({ answer: { bullets: llm.bullets, caveat: llm.caveat, talkTrack: llm.talkTrack }, citations, context: ranked.map(r => ({ title: r.title, page: r.page, excerpt: r.text.slice(0, 240) })) })
  } catch (e: any) {
    return json({ error: e?.message || 'Bad request' }, 400)
  }
}

function json(data: any, status = 200): Response { return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } }) }

async function loadIndex(): Promise<{ chunks: { id:string; docId:string; title:string; page?:number; text:string; embedding?: number[] }[] }> {
  const { readFile } = await import('fs/promises')
  const { join } = await import('path')
  const p = join(process.cwd(), 'apps', 'sales-toolkit', 'data', 'objections_index.json')
  try {
    const raw = await readFile(p, 'utf8')
    const data = JSON.parse(raw)
    return { chunks: data.chunks || [] }
  } catch {
    return { chunks: [] }
  }
}

function rankByVector(chunks: { title:string; page?:number; text:string; embedding?: number[] }[], qv: number[]) {
  const q = new Float32Array(qv)
  return chunks.map(c => ({ ...c, score: c.embedding ? cosine(new Float32Array(c.embedding), q) : 0 }))
    .sort((a,b) => b.score - a.score)
}
