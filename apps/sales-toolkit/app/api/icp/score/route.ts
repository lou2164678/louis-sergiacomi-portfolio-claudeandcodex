import { Scored } from '../../../../lib/types'
import { openaiCompat } from '../../../../lib/openaiClient'

type Body = { rows: { name:string; url?:string; industry?:string; employees?:number; region?:string; tech?: string[] }[] }

export async function POST(req: Request): Promise<Response> {
  try {
    const body = (await req.json()) as Body
    const apiKey = req.headers.get('x-api-key') || undefined
    const rules = await loadRules()
    const rows: Scored[] = []
    for (const r of (body.rows || [])) {
      const s = score(r, rules)
      const explain = await explainICP({ ...r, score: s.score, rules }, apiKey)
      rows.push({ ...r, score: s.score, reasons: explain.reasons.slice(0,3), firstPlay: explain.firstPlay })
    }
    return json({ rows })
  } catch (e: any) {
    return json({ error: e?.message || 'Bad request' }, 400)
  }
}

function json(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } })
}

async function loadRules() {
  const { readFile } = await import('fs/promises')
  const { join } = await import('path')
  const p = join(process.cwd(), 'apps', 'sales-toolkit', 'data', 'icp_rules.json')
  const raw = await readFile(p, 'utf8')
  return JSON.parse(raw) as {
    industryAllow: string[]
    regionAllow: string[]
    size: { min: number; max: number }
    techKeywords: string[]
    weights: { industry:number; size:number; region:number; tech:number }
  }
}

function score(row: { industry?: string; employees?: number; region?: string; tech?: string[] }, rules: Awaited<ReturnType<typeof loadRules>>) {
  const reasons: string[] = []
  let pts = 0
  if (row.industry && rules.industryAllow.includes(row.industry)) { pts += rules.weights.industry; reasons.push(`Industry match: ${row.industry}`) }
  if (typeof row.employees === 'number') {
    const within = row.employees >= rules.size.min && row.employees <= rules.size.max
    if (within) { pts += rules.weights.size; reasons.push(`Size fit: ${row.employees}`) } else { reasons.push(`Size outside: ${row.employees}`) }
  }
  if (row.region && rules.regionAllow.includes(row.region)) { pts += rules.weights.region; reasons.push(`Region fit: ${row.region}`) }
  const tech = (row.tech || []).filter(t => rules.techKeywords.includes(t))
  if (tech.length) { pts += rules.weights.tech; reasons.push(`Tech match: ${tech.join(', ')}`) }
  const score = clamp(pts)
  const firstPlay = score >= 70 ? 'Direct outbound with ROI case study' : score >= 40 ? 'Warm intro or webinar invite' : 'Nurture: content + newsletter'
  return { score, reasons: reasons.slice(0,3), firstPlay }
}

function clamp(n: number, min=0, max=100) { return Math.max(min, Math.min(max, n)) }

async function explainICP(input: { name?: string; url?: string; industry?: string; employees?: number; region?: string; score: number; rules: any }, apiKey?: string) {
  const system = 'You are a RevOps analyst. Output concise JSON only.'
  const user = `Given this account and heuristic score, produce JSON with keys: reasons (string[3]) and firstPlay (string).\nAccount: ${JSON.stringify({ name: input.name, url: input.url, industry: input.industry, employees: input.employees, region: input.region })}\nScore: ${input.score}\nRules: ${JSON.stringify({ weights: input.rules.weights, industryAllow: input.rules.industryAllow, regionAllow: input.rules.regionAllow, size: input.rules.size })}`
  try {
    const baseUrl = (process.env.XAI_BASE_URL || 'https://api.x.ai/v1').replace(/\/$/, '')
    const model = process.env.XAI_MODEL || 'grok-code-fast-1'
    return await openaiCompat.chatJSON<{ reasons: string[]; firstPlay: string }>([
      { role: 'system', content: system },
      { role: 'user', content: user }
    ], { apiKey, baseUrl, model, temperature: 0.2, maxTokens: 600 })
  } catch {
    const fallback = input.score >= 70 ? 'Direct outbound with ROI case study' : input.score >= 40 ? 'Warm intro or webinar invite' : 'Nurture: content + newsletter'
    return { reasons: ['Heuristic explanation unavailable'], firstPlay: fallback }
  }
}
