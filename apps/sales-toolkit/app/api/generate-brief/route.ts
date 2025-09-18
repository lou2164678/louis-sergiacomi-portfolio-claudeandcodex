export const runtime = 'nodejs'
import Ajv from 'ajv'
import { openaiCompat } from '../../../lib/openaiClient'

// Prompt template (copied verbatim from the source project)
const COMPANY_BRIEF_PROMPT_TEMPLATE = `
Produce an evidence-based, comprehensive company brief for {company_name} strictly as a single JSON object matching the schema below—no prose or text outside the JSON. For each factual claim, include mandatory inline citation(s) using "source" or "sources" fields, listing title, publisher, URL, and date (YYYY-MM-DD). Use only credible, recent (past 24 months, if possible) official company sources, investor documents, analyst/industry reports, or top-tier media—never Wikipedia, unverifiable blogs, or forums. If a required field cannot be determined, set its value to "unknown" and explain why in metadata.limitations; never fabricate data or use placeholders like "TBD".

## Requirements

- Structure the entire output as a valid JSON object, in full compliance with the schema below (do not add prose or formatting outside the JSON).
- Scope:
    - Company Profile: overview, key executives, financials, 3–5 recent news items.
    - Products/Services: core offerings (features, audience, launch), target segments, unique value propositions.
    - Pricing: models, tiers, competitive pricing positioning.
    - Competitive Analysis: minimum 2 direct competitors (strengths/weaknesses/differentiation/pricing), and indirect alternatives.
    - Market Position: TAM/SAM where available, key trends, opportunities, challenges.
    - Metadata: research_date (today's date in YYYY-MM-DD), data_freshness, confidence_score, key_sources, limitations, follow_up_questions.
- For each source/citation object, include all required metadata (title, publisher, URL, date).
- No speculative, estimated, or fabricated data. If data is not publicly available, set value to "unknown" and explain in metadata.limitations.
- All sections and fields must match the shape and keys of the schema exactly.
- Review before returning:
    - JSON is valid and matches the schema exactly.
    - All factual fields (not free-text) include properly formatted and recent inline sources.
    - No prose or commentary outside or in addition to the JSON.

## Output Format

- Output only the single JSON object, fully filled in as outlined.
- Never include text, prose, or markdown outside the JSON.
- Adhere strictly to key naming, nesting, and field types as shown in the schema below.
- Inline citations must appear within each relevant field as "source" or "sources".

## JSON Schema

{
  "company_profile": {
    "overview": {
      "company_name": "{company_name}",
      "founded": "YYYY or YYYY-MM-DD",
      "headquarters": "City, State/Country",
      "industry": "Primary industry classification",
      "employee_count": "Number or range",
      "mission_statement": "Quoted or summarized mission",
      "business_model": "How the company makes money",
      "sources": [{"title": "Source title", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}]
    },
    "key_executives": [{"name": "Full Name", "position": "Job Title", "background": "Brief professional background", "source": {"title": "Source title", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}],
    "financials": {"revenue": "Latest annual revenue figure or 'unknown'", "funding": "Total funding/public status", "valuation": "Most recent valuation or 'unknown'", "profitability": "Profitability status/trend", "sources": [{"title": "Source title", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}]},
    "recent_news": [{"headline": "News headline", "date": "YYYY-MM-DD", "summary": "1–2 sentence significance", "source": {"title": "Publication", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}, "impact": "Potential business impact"}]
  },
  "products_services": {
    "core_offerings": [{"name": "Product/Service name", "description": "Concise description", "features": ["feature1", "feature2", "feature3"], "target_audience": "Primary customer segment", "launch_date": "YYYY-MM-DD or 'unknown'", "source": {"title": "Source title", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}],
    "target_segments": [{"segment_name": "Market segment name", "description": "Segment characteristics", "size": "Market size estimate or 'unknown'", "growth_rate": "Annual growth rate or 'unknown'", "source": {"title": "Market research source", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}],
    "unique_value_propositions": [{"proposition": "Key value proposition", "supporting_evidence": "Evidence supporting the claim", "source": {"title": "Source title", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}]
  },
  "pricing_structure": {
    "pricing_models": [{"model_type": "SaaS, Usage-based, One-time, etc.", "description": "How pricing works", "price_range": "Price range or specific price if public", "billing_frequency": "Monthly/Annual/etc.", "source": {"title": "Pricing page or source", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}],
    "tiers": [{"tier_name": "Plan name", "price": "Specific price or 'unknown'", "features_included": ["feature1", "feature2"], "target_customer": "Intended customer type", "source": {"title": "Pricing source", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}],
    "competitive_positioning": {"market_position": "Premium/Mid-market/Budget/etc.", "price_comparison": "How prices compare vs competitors", "value_justification": "Why customers pay this price", "sources": [{"title": "Comparison source", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}]}
  },
  "competitive_analysis": {
    "direct_competitors": [{"company_name": "Competitor name", "market_share": "Estimate or 'unknown'", "strengths": ["strength1", "strength2"], "weaknesses": ["weakness1", "weakness2"], "pricing_comparison": "Comparison vs {company_name} or 'unknown'", "differentiation": "Key differentiating factors", "source": {"title": "Source title", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}],
    "indirect_competitors": [{"company_name": "Alternative provider", "alternative_solution": "Alternative approach", "threat_level": "High/Medium/Low", "source": {"title": "Source title", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}],
    "competitive_advantages": [{"advantage": "Specific advantage", "description": "Why it matters", "sustainability": "Sustainability of advantage", "source": {"title": "Source title", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}],
    "threats": [{"threat": "Specific competitive threat", "impact_level": "High/Medium/Low", "timeline": "Time horizon or 'unknown'", "mitigation_strategy": "Likely/possible response", "source": {"title": "Source title", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}]
  },
  "market_position": {
    "market_size": {"total_addressable_market": "TAM estimate or 'unknown'", "serviceable_addressable_market": "SAM estimate or 'unknown'", "market_growth_rate": "Annual growth rate", "geographic_presence": ["Region1", "Region2"], "sources": [{"title": "Market research source", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}]},
    "growth_trends": [{"trend": "Specific market trend", "impact": "Impact on {company_name}", "timeline": "Time horizon", "source": {"title": "Industry analysis source", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}],
    "key_opportunities": [{"opportunity": "Growth opportunity", "potential_impact": "Estimated business impact", "feasibility": "High/Medium/Low", "source": {"title": "Supporting analysis", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}],
    "challenges": [{"challenge": "Business challenge", "severity": "High/Medium/Low", "potential_solutions": ["solution1", "solution2"], "source": {"title": "Challenge source", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}]
  },
  "metadata": {
    "research_date": "YYYY-MM-DD",
    "data_freshness": "e.g., 'Most data within last 12 months'",
    "confidence_score": "High/Medium/Low (based on source quality and corroboration)",
    "key_sources": [{"title": "Key source title", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}],
    "limitations": ["Brief limitation statements"],
    "follow_up_questions": ["Suggested next research questions"]
  }
}
`;

function sourceSchema() {
  return {
    type: 'object',
    required: ['title', 'publisher', 'url', 'date'],
    additionalProperties: false,
    properties: {
      title: { type: 'string' },
      publisher: { type: 'string' },
      url: { type: 'string' },
      date: { type: 'string' },
    }
  } as const
}

const companyBriefSchema = {
  type: 'object',
  required: ['company_profile', 'products_services', 'pricing_structure', 'competitive_analysis', 'market_position', 'metadata'],
  additionalProperties: false,
  properties: {
    company_profile: {
      type: 'object',
      required: ['overview', 'key_executives', 'financials', 'recent_news'],
      additionalProperties: false,
      properties: {
        overview: {
          type: 'object',
          required: ['company_name', 'founded', 'headquarters', 'industry', 'employee_count', 'mission_statement', 'business_model', 'sources'],
          additionalProperties: false,
          properties: {
            company_name: { type: 'string' },
            founded: { type: 'string' },
            headquarters: { type: 'string' },
            industry: { type: 'string' },
            employee_count: { anyOf: [{ type: 'string' }, { type: 'number' }] },
            mission_statement: { type: 'string' },
            business_model: { type: 'string' },
            sources: { type: 'array', items: sourceSchema(), minItems: 1 },
          }
        },
        key_executives: {
          type: 'array',
          items: { type: 'object', required: ['name', 'position', 'background', 'source'], additionalProperties: false,
            properties: { name: { type: 'string' }, position: { type: 'string' }, background: { type: 'string' }, source: sourceSchema() } }
        },
        financials: {
          type: 'object', required: ['revenue', 'funding', 'valuation', 'profitability', 'sources'], additionalProperties: false,
          properties: { revenue: { type: 'string' }, funding: { type: 'string' }, valuation: { type: 'string' }, profitability: { type: 'string' }, sources: { type: 'array', items: sourceSchema(), minItems: 1 } }
        },
        recent_news: {
          type: 'array', items: { type: 'object', required: ['headline', 'date', 'summary', 'source', 'impact'], additionalProperties: false,
            properties: { headline: { type: 'string' }, date: { type: 'string' }, summary: { type: 'string' }, source: sourceSchema(), impact: { type: 'string' } } }
        }
      }
    },
    products_services: {
      type: 'object', required: ['core_offerings', 'target_segments', 'unique_value_propositions'], additionalProperties: false,
      properties: {
        core_offerings: { type: 'array', items: { type: 'object', required: ['name', 'description', 'features', 'target_audience', 'launch_date', 'source'], additionalProperties: false,
          properties: { name: { type: 'string' }, description: { type: 'string' }, features: { type: 'array', items: { type: 'string' } }, target_audience: { type: 'string' }, launch_date: { type: 'string' }, source: sourceSchema() } } },
        target_segments: { type: 'array', items: { type: 'object', required: ['segment_name', 'description', 'size', 'growth_rate', 'source'], additionalProperties: false,
          properties: { segment_name: { type: 'string' }, description: { type: 'string' }, size: { type: 'string' }, growth_rate: { type: 'string' }, source: sourceSchema() } } },
        unique_value_propositions: { type: 'array', items: { type: 'object', required: ['proposition', 'supporting_evidence', 'source'], additionalProperties: false,
          properties: { proposition: { type: 'string' }, supporting_evidence: { type: 'string' }, source: sourceSchema() } } }
      }
    },
    pricing_structure: {
      type: 'object', required: ['pricing_models', 'tiers', 'competitive_positioning'], additionalProperties: false,
      properties: {
        pricing_models: { type: 'array', items: { type: 'object', required: ['model_type', 'description', 'price_range', 'billing_frequency', 'source'], additionalProperties: false,
          properties: { model_type: { type: 'string' }, description: { type: 'string' }, price_range: { type: 'string' }, billing_frequency: { type: 'string' }, source: sourceSchema() } } },
        tiers: { type: 'array', items: { type: 'object', required: ['tier_name', 'price', 'features_included', 'target_customer', 'source'], additionalProperties: false,
          properties: { tier_name: { type: 'string' }, price: { type: 'string' }, features_included: { type: 'array', items: { type: 'string' } }, target_customer: { type: 'string' }, source: sourceSchema() } } },
        competitive_positioning: { type: 'object', required: ['market_position', 'price_comparison', 'value_justification', 'sources'], additionalProperties: false,
          properties: { market_position: { type: 'string' }, price_comparison: { type: 'string' }, value_justification: { type: 'string' }, sources: { type: 'array', items: sourceSchema(), minItems: 1 } } }
      }
    },
    competitive_analysis: {
      type: 'object', required: ['direct_competitors', 'indirect_competitors', 'competitive_advantages', 'threats'], additionalProperties: false,
      properties: {
        direct_competitors: { type: 'array', items: { type: 'object', required: ['company_name', 'market_share', 'strengths', 'weaknesses', 'pricing_comparison', 'differentiation', 'source'], additionalProperties: false,
          properties: { company_name: { type: 'string' }, market_share: { type: 'string' }, strengths: { type: 'array', items: { type: 'string' } }, weaknesses: { type: 'array', items: { type: 'string' } }, pricing_comparison: { type: 'string' }, differentiation: { type: 'string' }, source: sourceSchema() } } },
        indirect_competitors: { type: 'array', items: { type: 'object', required: ['company_name', 'alternative_solution', 'threat_level', 'source'], additionalProperties: false,
          properties: { company_name: { type: 'string' }, alternative_solution: { type: 'string' }, threat_level: { type: 'string' }, source: sourceSchema() } } },
        competitive_advantages: { type: 'array', items: { type: 'object', required: ['advantage', 'description', 'sustainability', 'source'], additionalProperties: false,
          properties: { advantage: { type: 'string' }, description: { type: 'string' }, sustainability: { type: 'string' }, source: sourceSchema() } } },
        threats: { type: 'array', items: { type: 'object', required: ['threat', 'impact_level', 'timeline', 'mitigation_strategy', 'source'], additionalProperties: false,
          properties: { threat: { type: 'string' }, impact_level: { type: 'string' }, timeline: { type: 'string' }, mitigation_strategy: { type: 'string' }, source: sourceSchema() } } }
      }
    },
    market_position: {
      type: 'object', required: ['market_size', 'growth_trends', 'key_opportunities', 'challenges'], additionalProperties: false,
      properties: {
        market_size: { type: 'object', required: ['total_addressable_market', 'serviceable_addressable_market', 'market_growth_rate', 'geographic_presence', 'sources'], additionalProperties: false,
          properties: { total_addressable_market: { type: 'string' }, serviceable_addressable_market: { type: 'string' }, market_growth_rate: { type: 'string' }, geographic_presence: { type: 'array', items: { type: 'string' } }, sources: { type: 'array', items: sourceSchema(), minItems: 1 } } },
        growth_trends: { type: 'array', items: { type: 'object', required: ['trend', 'impact', 'timeline', 'source'], additionalProperties: false,
          properties: { trend: { type: 'string' }, impact: { type: 'string' }, timeline: { type: 'string' }, source: sourceSchema() } } },
        key_opportunities: { type: 'array', items: { type: 'object', required: ['opportunity', 'potential_impact', 'feasibility', 'source'], additionalProperties: false,
          properties: { opportunity: { type: 'string' }, potential_impact: { type: 'string' }, feasibility: { type: 'string' }, source: sourceSchema() } } },
        challenges: { type: 'array', items: { type: 'object', required: ['challenge', 'severity', 'potential_solutions', 'source'], additionalProperties: false,
          properties: { challenge: { type: 'string' }, severity: { type: 'string' }, potential_solutions: { type: 'array', items: { type: 'string' } }, source: sourceSchema() } } }
      }
    },
    metadata: {
      type: 'object', required: ['research_date', 'data_freshness', 'confidence_score', 'key_sources', 'limitations', 'follow_up_questions'], additionalProperties: false,
      properties: { research_date: { type: 'string' }, data_freshness: { type: 'string' }, confidence_score: { type: 'string' }, key_sources: { type: 'array', items: sourceSchema(), minItems: 1 }, limitations: { type: 'array', items: { type: 'string' } }, follow_up_questions: { type: 'array', items: { type: 'string' } } }
    }
  }
} as const

const ajv = new Ajv({ allErrors: true })
const validateCompanyBrief = ajv.compile(companyBriefSchema)

type Body = { companyName: string }

export async function POST(req: Request): Promise<Response> {
  try {
    const { companyName } = (await req.json()) as Body
    const name = String(companyName || '').trim()
    if (!name) return json({ error: 'companyName is required' }, 400)

    // Prefer xAI Grok for this route by default, without changing global OPENAI_* envs
    // Allows setting a per-provider key via header while keeping embeddings elsewhere working.
    const overrideApiKey = req.headers.get('x-api-key')
      || process.env.XAI_API_KEY
      || process.env.OPENAI_COMPATIBLE_API_KEY
      || process.env.OPENAI_API_KEY

    if (!overrideApiKey) return json({ error: 'Server misconfiguration: missing API key (x-api-key or XAI_API_KEY/OPENAI_API_KEY)' }, 500)

    const baseUrl = (process.env.XAI_BASE_URL || 'https://api.x.ai/v1').replace(/\/$/, '')
    const model = process.env.XAI_MODEL || 'grok-code-fast-1'

    const prompt = COMPANY_BRIEF_PROMPT_TEMPLATE.replaceAll('{company_name}', name)

    try {
      const parsed = await openaiCompat.chatJSON<any>([
        { role: 'user', content: prompt }
      ], { apiKey: overrideApiKey, baseUrl, model, temperature: 0.2, maxTokens: 3000 })

      const valid = validateCompanyBrief(parsed)
      if (!valid) return json({ error: 'Model JSON failed schema validation', details: validateCompanyBrief.errors }, 502)
      return json(parsed)
    } catch (e: any) {
      return json({ error: e?.message || 'Model call failed' }, 502)
    }
  } catch (e: any) {
    return json({ error: e?.message || 'Unexpected server error' }, 500)
  }
}

function json(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } })
}

function cleanJsonString(text: string): string {
  const trimmed = text.trim()
  if (trimmed.startsWith('```json') && trimmed.endsWith('```')) return trimmed.substring(7, trimmed.length - 3).trim()
  if (trimmed.startsWith('```') && trimmed.endsWith('```')) return trimmed.substring(3, trimmed.length - 3).trim()
  return trimmed
}
