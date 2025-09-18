import type { Battlecard, CompetitorInput } from '../../../../lib/types'
import { openaiCompat } from '../../../../lib/openaiClient'

type Body = { ourSummary: string; competitors: CompetitorInput[]; personas: string[] }

export async function POST(req: Request): Promise<Response> {
  try {
    const body = (await req.json()) as Body
    const apiKey = req.headers.get('x-api-key') || undefined
    const bc = await synthesizeLLM(body, apiKey)
    return json(bc)
  } catch (e: any) {
    return json({ error: e?.message || 'Bad request' }, 400)
  }
}

function json(data: any, status = 200): Response { return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } }) }

async function synthesizeLLM(body: Body, apiKey?: string): Promise<Battlecard> {
  const now = new Date().toISOString()
  const system = 'Sales enablement expert; concise, source-grounded; cite for claims. JSON only.'
  const comps = (body.competitors || []).map(c => {
    const title = c.title || c.id
    const pre = `[Doc:${title}]\n${c.raw}`
    return pre
  }).join('\n\n')
  const user = `Our Summary:\n${tighten(body.ourSummary)}\n\nCompetitor Sources (prefix with [Doc:Title]):\n${comps}\n\nPersonas: ${body.personas?.join(', ') || '-'}\n\nReturn strict JSON matching this shape:\n${schemaStr()}\nRules:\n- Every claim should be grounded in a provided source.\n- If not disclosed, mark 'Not disclosed' and add a citation to the closest relevant doc.\n- Keep strings concise.`
  try {
    const baseUrl = (process.env.XAI_BASE_URL || 'https://api.x.ai/v1').replace(/\/$/, '')
    const model = process.env.XAI_MODEL || 'grok-code-fast-1'
    const data = await openaiCompat.chatJSON<Battlecard>([
      { role: 'system', content: system },
      { role: 'user', content: user }
    ], { apiKey, baseUrl, model, temperature: 0.2, maxTokens: 2000 })
    return { ...data, createdAt: data.createdAt || now }
  } catch {
    const ourPitch = tighten(body.ourSummary)
    const competitorSummaries = (body.competitors || []).map(c => ({ id: c.id, oneLine: tighten(c.raw.slice(0, 200)) }))
    const primary = body.competitors?.[0]
    const comparison = [
      { metric: 'Price', us: 'Value-based tiers', competitor: primary ? guessPrice(primary.raw) : 'Not disclosed' },
      { metric: 'Integrations', us: 'Salesforce, Snowflake, Slack', competitor: 'Varies by plan' },
      { metric: 'Time-to-value', us: 'Days (prebuilt templates)', competitor: 'Weeks' }
    ]
    const objections = [{ question: 'Too expensive vs incumbent?', answer: 'TCO trends lower with consolidation.', citations: citeFrom(body.competitors) }]
    const elevatorByRole = (body.personas || []).map(p => ({ role: p, pitch: pitchFor(p, ourPitch) }))
    return { personas: body.personas || [], summary: { ourPitch, competitorSummaries }, comparison, exploitables: ['Slow deployments'], defenses: ['Security posture'], objections, elevatorByRole, createdAt: now }
  }
}

function tighten(s: string) { return s.trim().replace(/\s+/g, ' ') }
function guessPrice(s: string) { return /enterp|premium|custom/i.test(s) ? 'Premium/Custom' : /free|starter/i.test(s) ? 'Free/Starter' : 'Not disclosed' }
function citeFrom(comps: CompetitorInput[]) { return (comps || []).slice(0,2).map(c => ({ title: c.title || c.id })) }
function pitchFor(role: string, ourPitch: string) {
  if (role === 'AE') return 'Win cycles by consolidating tools; fast proof points in days.'
  if (role === 'SDR') return 'Sharper outbound with clear value props and ROI snippets.'
  if (role === 'CS') return 'Smoother onboarding and lower admin toil for your team.'
  return ourPitch
}

function schemaStr() {
  return `{
  account?: string; personas: string[];
  summary: { ourPitch:string; competitorSummaries: {id:string; oneLine:string}[] };
  comparison: { metric:string; us:string; competitor:string }[];
  exploitables: string[]; defenses: string[];
  objections: { question:string; answer:string; citations:{title:string; page?:number}[] }[];
  elevatorByRole: { role:string; pitch:string }[];
  createdAt:string;
}`
}
