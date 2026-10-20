const EVEIA_API_BASE = import.meta.env.VITE_EVEIA_API_BASE?.trim() || '/eveia-api'
export const EVEIA_AGENT_ID =
  import.meta.env.VITE_EVEIA_AGENT_ID ?? '7e5923e3-9b4f-43ab-b3e3-ab0764ea4487'
const EVEIA_API_KEY = import.meta.env.VITE_EVEIA_API_KEY ?? ''

export interface EveiaChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface EveiaAgentInfo {
  name: string
}

export interface EveiaTrackingIds {
  visitorSessionId: string
  embedSessionId: string | null
}

export const DEFAULT_CHAT_ERROR = 'Something went wrong. Please try again.'

type StreamPayload = {
  type?: string
  content?: string
  embed_session_id?: string
  error?: unknown
  message?: unknown
}

function hashStoragePart(value: string): string {
  let hash = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return (hash >>> 0).toString(36)
}

function trackingStorageKey(): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'unknown-origin'
  return `eveia:embed-tracking:${EVEIA_AGENT_ID}:${hashStoragePart(origin)}:${hashStoragePart(EVEIA_API_KEY)}`
}

function createVisitorSessionId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `v-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

export function loadEveiaTrackingIds(): EveiaTrackingIds {
  if (typeof window === 'undefined' || !EVEIA_API_KEY) {
    return { visitorSessionId: createVisitorSessionId(), embedSessionId: null }
  }

  try {
    const raw = window.localStorage.getItem(trackingStorageKey())
    if (!raw) {
      const ids = { visitorSessionId: createVisitorSessionId(), embedSessionId: null }
      saveEveiaTrackingIds(ids)
      return ids
    }

    const parsed = JSON.parse(raw) as Partial<EveiaTrackingIds>
    return {
      visitorSessionId:
        typeof parsed.visitorSessionId === 'string' && parsed.visitorSessionId.trim()
          ? parsed.visitorSessionId
          : createVisitorSessionId(),
      embedSessionId:
        typeof parsed.embedSessionId === 'string' && parsed.embedSessionId.trim()
          ? parsed.embedSessionId
          : null,
    }
  } catch {
    return { visitorSessionId: createVisitorSessionId(), embedSessionId: null }
  }
}

export function saveEveiaTrackingIds(ids: EveiaTrackingIds): void {
  if (typeof window === 'undefined' || !EVEIA_API_KEY) return

  try {
    window.localStorage.setItem(trackingStorageKey(), JSON.stringify(ids))
  } catch {
    // Storage may be unavailable in private browsing.
  }
}

function embedOrigin(): string {
  return typeof window !== 'undefined' ? window.location.origin : ''
}

function externalHeaders(accept?: string): HeadersInit {
  const headers: Record<string, string> = {
    'X-API-Key': EVEIA_API_KEY,
  }
  if (accept) headers.Accept = accept
  const origin = embedOrigin()
  if (origin) headers['X-Embed-Origin'] = origin
  return headers
}

export function isEveiaChatConfigured(): boolean {
  return Boolean(EVEIA_API_KEY && EVEIA_AGENT_ID)
}

export async function fetchEveiaAgentInfo(): Promise<EveiaAgentInfo | null> {
  if (!isEveiaChatConfigured()) return null

  try {
    const response = await fetch(
      `${EVEIA_API_BASE}/api/v1/external/agents/${EVEIA_AGENT_ID}/info`,
      { headers: externalHeaders() },
    )
    if (!response.ok) return null
    const data = await response.json()
    return { name: typeof data.name === 'string' && data.name.trim() ? data.name : 'Eveia' }
  } catch {
    return null
  }
}

export interface StreamEveiaChatOptions {
  messages: EveiaChatMessage[]
  tracking: EveiaTrackingIds
  onChunk?: (text: string) => void
  onEmbedSessionId?: (sessionId: string) => void
  signal?: AbortSignal
}

export async function streamEveiaChat({
  messages,
  tracking,
  onChunk,
  onEmbedSessionId,
  signal,
}: StreamEveiaChatOptions): Promise<string> {
  if (!isEveiaChatConfigured()) {
    throw new Error('Eveia chat is not configured')
  }

  const response = await fetch(
    `${EVEIA_API_BASE}/api/v1/external/agents/${EVEIA_AGENT_ID}/chat`,
    {
      method: 'POST',
      headers: {
        ...externalHeaders('text/event-stream'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: EVEIA_AGENT_ID,
        messages,
        stream: true,
        booking_mode: false,
        visitor_session_id: tracking.visitorSessionId,
        embed_session_id: tracking.embedSessionId ?? undefined,
      }),
      signal,
    },
  )

  const headerSessionId = response.headers.get('X-Embed-Session-Id')?.trim()
  if (headerSessionId) onEmbedSessionId?.(headerSessionId)

  if (!response.ok) {
    if (response.status === 413) {
      throw new Error("This conversation has grown too long for me to process. Please start a new chat and try again.")
    }
    throw new Error(`Chat request failed (${response.status})`)
  }

  const reader = response.body?.getReader()
  if (!reader) throw new Error('Chat response is not readable')

  const decoder = new TextDecoder()
  let assistantMessage = ''
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed.startsWith('data: ')) continue

      const jsonStr = trimmed.slice(6)
      if (jsonStr === '[DONE]') continue

      let json: StreamPayload
      try {
        json = JSON.parse(jsonStr)
      } catch {
        continue
      }

      if (json.type === 'error') {
        const message =
          typeof json.message === 'string' && json.message.trim()
            ? json.message
            : DEFAULT_CHAT_ERROR
        throw new Error(message)
      }

      if (json.type === 'embed_session' && json.embed_session_id) {
        onEmbedSessionId?.(json.embed_session_id)
        continue
      }

      if (json.type === 'content' && json.content) {
        assistantMessage += json.content
        onChunk?.(assistantMessage)
      }
    }
  }

  return assistantMessage
}
