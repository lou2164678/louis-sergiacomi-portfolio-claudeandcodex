export type Vector = Float32Array

export interface EmbeddingItem { id: string; values: number[]; meta?: Record<string, unknown> }

export function cosine(a: Vector, b: Vector): number {
  let dot = 0, na = 0, nb = 0
  for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i] }
  const denom = Math.sqrt(na) * Math.sqrt(nb) || 1
  return dot / denom
}

type EmbeddingConfig = { apiKey?: string; baseUrl?: string; model?: string }
function getEmbedCfg(overrides?: EmbeddingConfig) {
  const apiKey = overrides?.apiKey || process.env.OPENAI_API_KEY || process.env.OPENAI_COMPATIBLE_API_KEY
  if (!apiKey) throw new Error('Missing OPENAI_API_KEY (or OPENAI_COMPATIBLE_API_KEY) in env')
  const baseUrl = (overrides?.baseUrl || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')
  const model = overrides?.model || process.env.OPENAI_EMBEDDINGS_MODEL || 'text-embedding-3-small'
  return { apiKey, baseUrl, model }
}

export async function embed(texts: string[], overrides?: EmbeddingConfig): Promise<number[][]> {
  if (!texts.length) return []
  const cfg = getEmbedCfg(overrides)
  const res = await fetch(`${cfg.baseUrl}/embeddings`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'authorization': `Bearer ${cfg.apiKey}` },
    body: JSON.stringify({ model: cfg.model, input: texts })
  })
  if (!res.ok) {
    const txt = await res.text().catch(()=> '')
    throw new Error(`Embeddings request failed: ${res.status} ${res.statusText} ${txt}`)
  }
  const data = await res.json()
  const vectors = (data?.data || []).map((d: any) => d?.embedding as number[])
  return vectors
}

