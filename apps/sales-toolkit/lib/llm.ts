type ChatMessage = { role: 'system'|'user'|'assistant'; content: string }

export type LLMConfig = {
  apiKey?: string
  baseUrl?: string
  model?: string
  temperature?: number
  maxTokens?: number
}

function getConfig(overrides?: LLMConfig) {
  const apiKey = overrides?.apiKey || process.env.OPENAI_API_KEY || process.env.OPENAI_COMPATIBLE_API_KEY
  if (!apiKey) throw new Error('Missing OPENAI_API_KEY (or OPENAI_COMPATIBLE_API_KEY) in env')
  const baseUrl = (overrides?.baseUrl || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')
  const model = overrides?.model || process.env.OPENAI_MODEL || 'gpt-4o-mini'
  const temperature = overrides?.temperature ?? 0.2
  const maxTokens = overrides?.maxTokens ?? 1200
  return { apiKey, baseUrl, model, temperature, maxTokens }
}

export async function generateJSON<T>(messages: ChatMessage[], overrides?: LLMConfig): Promise<T> {
  const cfg = getConfig(overrides)
  const res = await fetch(`${cfg.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'authorization': `Bearer ${cfg.apiKey}` },
    body: JSON.stringify({
      model: cfg.model,
      messages,
      temperature: cfg.temperature,
      response_format: { type: 'json_object' },
      max_tokens: cfg.maxTokens,
    })
  })
  if (!res.ok) {
    const txt = await res.text().catch(()=> '')
    throw new Error(`LLM request failed: ${res.status} ${res.statusText} ${txt}`)
  }
  const data = await res.json()
  const content = data?.choices?.[0]?.message?.content
  if (!content || typeof content !== 'string') throw new Error('LLM returned empty content')
  try {
    return JSON.parse(content) as T
  } catch {
    // Fallback: try to extract first JSON object
    const m = content.match(/\{[\s\S]*\}/)
    if (m) return JSON.parse(m[0]) as T
    throw new Error('LLM returned non-JSON content')
  }
}

