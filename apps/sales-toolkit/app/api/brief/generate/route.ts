import type { Brief } from '../../../../lib/types'
import { openaiCompat } from '../../../../lib/openaiClient'

type Input = { input: { url?: string; text?: string; industry?: string; segment?: 'SMB'|'MM'|'ENT' } }

export async function POST(req: Request): Promise<Response> {
  try {
    const body = (await req.json()) as Input
    const apiKey = req.headers.get('x-api-key') || undefined
    const b = await generateBrief(body.input, apiKey)
    return json(b)
  } catch (e: any) {
    return json({ error: e?.message || 'Bad request' }, 400)
  }
}

function json(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } })
}

async function generateBrief(input: Input['input'], apiKey?: string): Promise<Brief> {
  const system = 'You are a B2B sales strategist. Output concise, non-fluffy bullets. Use only provided context.'
  const user = `Context:\nIndustry: ${input.industry || 'Unknown'}\nSegment: ${input.segment || 'Unknown'}\nURL: ${input.url || '-'}\nText: ${input.text || '-'}\n\nTask: Produce a JSON object matching this TypeScript type:\n${briefSchemaString()}\nRules:\n- If a field is not supported by the context, set to \'Unknown (not in source)\'.\n- Use concise bullet strings (no prose paragraphs).\n- Do not include extra fields. JSON only.`
  try {
    const baseUrl = (process.env.XAI_BASE_URL || 'https://api.x.ai/v1').replace(/\/$/, '')
    const model = process.env.XAI_MODEL || 'grok-code-fast-1'
    const data = await openaiCompat.chatJSON<Brief>([
      { role: 'system', content: system },
      { role: 'user', content: user }
    ], { apiKey, baseUrl, model, temperature: 0.2, maxTokens: 1200 })
    return normalizeBrief(data, input)
  } catch {
    return synthesizeBrief(input)
  }
}

function briefSchemaString() {
  return `{
  id: string; companyName: string; sourceType: 'url'|'text';
  industry?: string; segment?: 'SMB'|'MM'|'ENT';
  firmographics: { hq?: string; size?: string; revenue?: string; tech_stack?: string[] };
  pains: string[]; discovery: string[]; valueProps: string[]; expansion: string[];
  meddicc: { metrics?: string[]; economicBuyer?: string; decisionCriteria?: string[]; risks?: string[] };
  rawSources: { url?: string; text?: string }; createdAt: string;
}`
}

function normalizeBrief(b: Brief, input: Input['input']): Brief {
  return {
    ...b,
    id: b.id || `brief_${Date.now()}`,
    companyName: b.companyName || deriveName(input.url, input.text),
    sourceType: input.url ? 'url' : 'text',
    industry: b.industry ?? input.industry,
    segment: b.segment ?? inferSegment(input.text || ''),
    rawSources: { url: input.url, text: input.text || '' },
    createdAt: b.createdAt || new Date().toISOString()
  }
}

function synthesizeBrief(input: Input['input']) {
  const now = new Date().toISOString()
  const sourceText = input.text || ''
  const companyName = deriveName(input.url, sourceText)
  const segment = input.segment || inferSegment(sourceText)
  const pains = inferPains(sourceText, input.industry)
  const discovery = [
    'What systems are in your current stack and where are the gaps?',
    'What triggers a purchase and who is involved in the decision?',
    'What metric matters most this quarter (e.g., CAC, LTV, payback)?',
    'Where do you see the biggest friction in onboarding or activation?',
    'How do you measure time-to-value for new tooling?'
  ]
  const valueProps = [
    'Faster time-to-value via prebuilt integrations',
    'Lower total cost by consolidating overlapping tools',
    'Reduced risk with enterprise-grade security and governance'
  ]
  const expansion = [
    'Start with a pilot team, expand to adjacent workflows',
    'Add-on analytics module for exec reporting'
  ]
  const meddicc = {
    metrics: ['Time-to-value (days)', 'Onboarding time (hours)'],
    economicBuyer: 'Unknown (not in source)',
    decisionCriteria: ['Integration coverage', 'Security posture', 'Total cost of ownership'],
    risks: ['Competing internal priorities']
  }

  return {
    id: `brief_${Date.now()}`,
    companyName,
    sourceType: input.url ? 'url' : 'text',
    industry: input.industry,
    segment,
    firmographics: {
      hq: 'Unknown (not in source)',
      size: segment === 'ENT' ? '1000+' : segment === 'MM' ? '100-1000' : '1-100',
      revenue: 'Unknown (not in source)',
      tech_stack: inferTech(sourceText)
    },
    pains,
    discovery,
    valueProps,
    expansion,
    meddicc,
    rawSources: { url: input.url, text: sourceText },
    createdAt: now
  } as Brief
}

function deriveName(url?: string, text?: string): string {
  if (url) {
    try {
      const u = new URL(url)
      const host = u.hostname.replace(/^www\./, '')
      const part = host.split('.')[0]
      return part.charAt(0).toUpperCase() + part.slice(1)
    } catch {}
  }
  const match = (text || '').trim().split(/[\s,\.]/).filter(Boolean)[0] || 'Company'
  return match.charAt(0).toUpperCase() + match.slice(1)
}

function inferSegment(text: string): 'SMB'|'MM'|'ENT' {
  const t = (text || '').toLowerCase()
  if (t.includes('enterprise') || t.includes('global')) return 'ENT'
  if (t.includes('mid-market') || t.includes('scale')) return 'MM'
  return 'SMB'
}

function inferPains(text: string, industry?: string): string[] {
  const pains = new Set<string>()
  const t = (text || '').toLowerCase()
  if (t.includes('expand') || t.includes('international')) pains.add('Global expansion complexity')
  if (t.includes('integrat')) pains.add('Integration overhead and maintenance')
  if (t.includes('cost') || t.includes('price')) pains.add('Pressure to reduce total cost')
  if (industry?.toLowerCase() === 'ecommerce') pains.add('Checkout conversion and localization')
  if (!pains.size) pains.add('Unknown (not in source)')
  return Array.from(pains)
}

function inferTech(text: string): string[] {
  const out: string[] = []
  const addIf = (kw: string, name: string) => { if (text.toLowerCase().includes(kw)) out.push(name) }
  addIf('shopify', 'Shopify')
  addIf('salesforce', 'Salesforce')
  addIf('snowflake', 'Snowflake')
  addIf('bigquery', 'BigQuery')
  return out
}
