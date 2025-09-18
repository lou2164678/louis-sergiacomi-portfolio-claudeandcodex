export type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string }

export type OpenAICompatConfig = {
  apiKey?: string
  baseUrl?: string
  model?: string
  temperature?: number
  maxTokens?: number
}

function getEnv<T>(overrides?: OpenAICompatConfig) {
  const apiKey = overrides?.apiKey || process.env.OPENAI_API_KEY || process.env.OPENAI_COMPATIBLE_API_KEY
  if (!apiKey) throw new Error('Missing OPENAI_API_KEY (or OPENAI_COMPATIBLE_API_KEY) in env')
  const baseUrl = (overrides?.baseUrl || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')
  const model = overrides?.model || process.env.OPENAI_MODEL || 'gpt-4o-mini'
  const temperature = overrides?.temperature ?? 0.2
  const maxTokens = overrides?.maxTokens ?? 1200
  return { apiKey, baseUrl, model, temperature, maxTokens }
}

export function createOpenAICompatibleClient(defaults?: OpenAICompatConfig) {
  return {
    async chat(messages: ChatMessage[], opts?: OpenAICompatConfig & { responseFormat?: any }): Promise<string> {
      const cfg = getEnv({ ...defaults, ...opts })
      const res = await fetch(`${cfg.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${cfg.apiKey}`
        },
        body: JSON.stringify({
          model: cfg.model,
          messages,
          temperature: cfg.temperature,
          max_tokens: cfg.maxTokens,
          response_format: opts?.responseFormat
        })
      })
      if (!res.ok) {
        const txt = await res.text().catch(() => '')
        throw new Error(`LLM request failed: ${res.status} ${res.statusText} ${txt}`)
      }
      const data = await res.json()
      const content = data?.choices?.[0]?.message?.content
      if (!content || typeof content !== 'string') throw new Error('LLM returned empty content')
      return content
    },

    async chatJSON<T>(messages: ChatMessage[], opts?: OpenAICompatConfig): Promise<T> {
      const text = await this.chat(messages, { ...opts, responseFormat: { type: 'json_object' } })
      try {
        return JSON.parse(text) as T
      } catch {
        const m = text.match(/\{[\s\S]*\}/)
        if (m) return JSON.parse(m[0]) as T
        throw new Error('LLM returned non-JSON content')
      }
    },

    async embeddings(inputs: string[], opts?: OpenAICompatConfig & { embeddingsModel?: string }): Promise<number[][]> {
      if (!inputs.length) return []
      const merged = { ...defaults, ...opts }
      const apiKey = merged.apiKey || process.env.OPENAI_API_KEY || process.env.OPENAI_COMPATIBLE_API_KEY
      if (!apiKey) throw new Error('Missing OPENAI_API_KEY (or OPENAI_COMPATIBLE_API_KEY) in env')
      const baseUrl = (merged.baseUrl || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')
      const model = opts?.embeddingsModel || process.env.OPENAI_EMBEDDINGS_MODEL || 'text-embedding-3-small'
      const res = await fetch(`${baseUrl}/embeddings`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ model, input: inputs })
      })
      if (!res.ok) {
        const txt = await res.text().catch(() => '')
        throw new Error(`Embeddings request failed: ${res.status} ${res.statusText} ${txt}`)
      }
      const data = await res.json()
      return (data?.data || []).map((d: any) => d?.embedding as number[])
    }
  }
}

// Convenience singleton using only env vars
export const openaiCompat = createOpenAICompatibleClient()

