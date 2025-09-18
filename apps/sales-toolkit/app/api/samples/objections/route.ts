export async function GET(): Promise<Response> {
  try {
    const { readFile } = await import('fs/promises')
    const { join } = await import('path')
    const p = join(process.cwd(), 'apps', 'sales-toolkit', 'data', 'objections_samples.json')
    const raw = await readFile(p, 'utf8')
    const docs = JSON.parse(raw)
    return new Response(JSON.stringify({ docs }), { status: 200, headers: { 'content-type': 'application/json' } })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || 'Failed to load sample' }), { status: 500, headers: { 'content-type': 'application/json' } })
  }
}

