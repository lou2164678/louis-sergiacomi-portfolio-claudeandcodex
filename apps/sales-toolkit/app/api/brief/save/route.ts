export const runtime = 'nodejs'

type Body = { brief: any }

export async function POST(req: Request): Promise<Response> {
  try {
    const { brief } = (await req.json()) as Body
    if (!brief || typeof brief !== 'object') return json({ error: 'Invalid brief' }, 400)

    const entry = {
      id: `brief_${Date.now()}`,
      createdAt: new Date().toISOString(),
      companyName: safeName(brief),
      brief,
    }

    const { join } = await import('path')
    const { readFile, writeFile, mkdir } = await import('fs/promises')
    const dataDir = join(process.cwd(), 'apps', 'sales-toolkit', 'data')
    const file = join(dataDir, 'briefs.json')
    try { await mkdir(dataDir, { recursive: true }) } catch {}
    let arr: any[] = []
    try { const raw = await readFile(file, 'utf8'); arr = JSON.parse(raw); if (!Array.isArray(arr)) arr = [] } catch {}
    arr.push(entry)
    await writeFile(file, JSON.stringify(arr, null, 2), 'utf8')
    return json({ ok: true, id: entry.id })
  } catch (e: any) {
    return json({ error: e?.message || 'Failed to save' }, 500)
  }
}

function json(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } })
}

function safeName(b: any): string {
  try { return String(b?.company_profile?.overview?.company_name || 'Unknown') } catch { return 'Unknown' }
}

