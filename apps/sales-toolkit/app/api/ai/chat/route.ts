export const runtime = 'nodejs'

type Role = 'system' | 'user' | 'assistant'
type Body = {
  messages: { role: Role; content: string }[]
  model?: string
  temperature?: number
  max_tokens?: number
  response_format?: any
  stream?: boolean
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = (await req.json()) as Body
    if (!body?.messages?.length) return json({ error: 'messages[] is required' }, 400)

    const apiKey = req.headers.get('x-api-key') || process.env.OPENAI_API_KEY || process.env.OPENAI_COMPATIBLE_API_KEY
    if (!apiKey) return json({ error: 'Server misconfiguration: missing OPENAI_API_KEY' }, 500)
    const baseUrl = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')
    const model = body.model || process.env.OPENAI_MODEL || 'gpt-4o-mini'

    const upstream = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: body.messages,
        temperature: body.temperature ?? 0.2,
        max_tokens: body.max_tokens ?? 1200,
        response_format: body.response_format,
        stream: !!body.stream
      })
    })

    if (body.stream) {
      return new Response(upstream.body, {
        status: upstream.status,
        headers: { 'Content-Type': upstream.headers.get('Content-Type') || 'text/event-stream' }
      })
    }

    const text = await upstream.text().catch(() => '')
    return new Response(text, {
      status: upstream.status,
      headers: { 'content-type': upstream.headers.get('Content-Type') || 'application/json' }
    })
  } catch (e: any) {
    return json({ error: e?.message || 'Bad request' }, 400)
  }
}

function json(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } })
}

