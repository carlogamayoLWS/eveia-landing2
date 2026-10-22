import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { EVEIA_RESPONSE_STYLE_PROMPT } from '../../lib/eveiaChatPrompt'
import {
  cancelActiveFlow,
  createFreshChatState,
  EMPTY_LEAD_DATA,
  getFieldForPhase,
  handleLeadInput,
  isCollectingDetails,
  isLeadFlowActive,
  loadChatState,
  parseBookingIntent,
  parsePricingIntent,
  resetChatLeadStorage,
  saveChatState,
  shouldRetrySubmit,
  startDemoFlow,
  startPricingFlow,
  submitLead,
  type FlowMode,
  type LeadData,
  type LeadPhase,
  type PersistedChatMsg,
} from './chatLeadFlow'
import {
  DEFAULT_CHAT_ERROR,
  isEveiaChatConfigured,
  loadEveiaTrackingIds,
  saveEveiaTrackingIds,
  streamEveiaChat,
  type EveiaChatMessage,
  type EveiaTrackingIds,
} from './eveiaChatApi'
import { formatChatMessage, TypingIndicator } from './chatMessageFormat'
import { ChatEveSprite } from './ChatEveSprite'
import chatIcon from '../../assets/chaticon.png'

type ChatMsg = PersistedChatMsg

function bootFromStorage() {
  return loadChatState()
}

function parseCssRgb(value: string) {
  const m = value.match(/rgba?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)\s*[, ]\s*([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)/i)
  if (!m) return null
  const alpha = m[4] == null
    ? 1
    : m[4].endsWith('%')
      ? Number(m[4].slice(0, -1)) / 100
      : Number(m[4])
  return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]), a: alpha }
}

function lumaOf(rgb: { r: number; g: number; b: number }) {
  return 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b
}

function gradientLuma(image: string) {
  if (!image || image === 'none' || !/gradient/i.test(image)) return null
  const stops = [...image.matchAll(/rgba?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)\s*[, ]\s*([\d.]+)/g)]
  if (!stops.length) return null
  const lumas = stops.map((stop) => lumaOf({ r: Number(stop[1]), g: Number(stop[2]), b: Number(stop[3]) }))
  return lumas.reduce((sum, value) => sum + value, 0) / lumas.length
}

function isPaintedLayer(style: CSSStyleDeclaration) {
  if (style.visibility === 'hidden' || Number(style.opacity) === 0) return false
  const clip = style.clipPath
  if (clip && clip !== 'none' && /inset\(\s*100%/.test(clip)) return false
  return true
}

function layerLuma(style: CSSStyleDeclaration) {
  if (!isPaintedLayer(style)) return null
  const overlay = parseCssRgb(style.backgroundColor)
  const fromGradient = gradientLuma(style.backgroundImage)
  if (overlay && overlay.a >= 0.28) {
    const overlayLuma = lumaOf(overlay)
    if (fromGradient == null || overlay.a >= 0.55) return overlayLuma
    return overlayLuma * overlay.a + fromGradient * (1 - overlay.a)
  }
  return fromGradient
}

function sampleImageLuma(img: HTMLImageElement, cx: number, cy: number) {
  if (!img.complete || !img.naturalWidth) return null
  const box = img.getBoundingClientRect()
  if (box.width < 2 || box.height < 2) return null
  const sx = ((cx - box.left) / box.width) * img.naturalWidth
  const sy = ((cy - box.top) / box.height) * img.naturalHeight
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return null
  try {
    ctx.drawImage(img, sx, sy, 1, 1, 0, 0, 1, 1)
    const px = ctx.getImageData(0, 0, 1, 1).data
    return lumaOf({ r: px[0], g: px[1], b: px[2] })
  } catch {
    return null
  }
}

function isCoveredStickyHero(node: Element, hits: Element[]) {
  if (!node.closest('.hero')) return false
  return hits.some((hit) => {
    if (hit === node || hit.closest('.hero')) return false
    if (!(hit instanceof HTMLElement)) return false
    const z = Number.parseInt(getComputedStyle(hit).zIndex, 10)
    return Number.isFinite(z) && z >= 2
  })
}

function isDarkBehindAsk(ask: HTMLElement) {
  const widget = ask.closest('.chat-widget')
  const rect = ask.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const prev = widget instanceof HTMLElement ? widget.style.visibility : ''
  if (widget instanceof HTMLElement) {
    widget.style.visibility = 'hidden'
    void widget.offsetHeight
  }
  const hits = document.elementsFromPoint(cx, cy)
  if (widget instanceof HTMLElement) widget.style.visibility = prev

  for (const node of hits) {
    if (!(node instanceof Element) || node.closest('.chat-widget')) continue
    if (isCoveredStickyHero(node, hits)) continue

    const cs = getComputedStyle(node)
    const before = layerLuma(getComputedStyle(node, '::before'))
    const own = layerLuma(cs)
    const fromImg = node instanceof HTMLImageElement ? sampleImageLuma(node, cx, cy) : null
    const luma = before ?? own ?? fromImg
    if (luma == null) continue
    return luma < 160
  }

  return false
}

export function ChatWidget() {
  const { pathname } = useLocation()
  const initial = bootFromStorage()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [msgs, setMsgs] = useState<ChatMsg[]>(initial.msgs)
  const [leadPhase, setLeadPhase] = useState<LeadPhase>(initial.phase)
  const [leadData, setLeadData] = useState<LeadData>(initial.lead)
  const [flowMode, setFlowMode] = useState<FlowMode>(initial.flowMode)
  const [hasSubmittedDemo, setHasSubmittedDemo] = useState<boolean>(initial.hasSubmittedDemo === true)
  const [sending, setSending] = useState(false)
  const messagesRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const askRef = useRef<HTMLSpanElement>(null)
  const [askOnDark, setAskOnDark] = useState(false)
  const trackingRef = useRef<EveiaTrackingIds>(loadEveiaTrackingIds())
  const abortRef = useRef<AbortController | null>(null)
  const leadPhaseRef = useRef(leadPhase)
  const leadDataRef = useRef(leadData)
  const flowModeRef = useRef(flowMode)
  const msgsRef = useRef(msgs)
  const hydratedOpenRef = useRef(false)
  const stickToBottomRef = useRef(true)
  const suppressScrollTrackingRef = useRef(false)
  const validationAttemptsRef = useRef(0)

  const isNearBottom = useCallback((el: HTMLElement) => {
    return el.scrollHeight - el.scrollTop - el.clientHeight < 80
  }, [])

  const scrollMessagesToBottom = useCallback(() => {
    const el = messagesRef.current
    if (!el) return
    suppressScrollTrackingRef.current = true
    el.scrollTop = el.scrollHeight
    requestAnimationFrame(() => {
      suppressScrollTrackingRef.current = false
    })
  }, [])

  const onMessagesScroll = useCallback(() => {
    if (suppressScrollTrackingRef.current) return
    const el = messagesRef.current
    if (!el) return
    stickToBottomRef.current = isNearBottom(el)
  }, [isNearBottom])

  leadPhaseRef.current = leadPhase
  leadDataRef.current = leadData
  flowModeRef.current = flowMode
  msgsRef.current = msgs

  const persistState = useCallback((next?: {
    msgs?: ChatMsg[]
    phase?: LeadPhase
    lead?: LeadData
    flowMode?: FlowMode
    hasSubmittedDemo?: boolean
  }) => {
    saveChatState({
      msgs: next?.msgs ?? msgsRef.current,
      phase: next?.phase ?? leadPhaseRef.current,
      lead: next?.lead ?? leadDataRef.current,
      flowMode: next?.flowMode ?? flowModeRef.current,
      hasSubmittedDemo: next?.hasSubmittedDemo ?? hasSubmittedDemo,
    })
  }, [hasSubmittedDemo])

  const handleClose = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    persistState()
    setOpen(false)
  }, [persistState])

  const handleToggle = useCallback(() => {
    if (open) {
      handleClose()
      return
    }
    setOpen(true)
  }, [open, handleClose])

  useEffect(() => {
    if (open) return
    const ask = askRef.current
    if (!ask) return

    let frame = 0
    const sync = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const el = askRef.current
        if (el) setAskOnDark(isDarkBehindAsk(el))
      })
    }

    sync()
    window.addEventListener('scroll', sync, { passive: true, capture: true })
    window.addEventListener('resize', sync)
    document.addEventListener('scroll', sync, { passive: true, capture: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', sync, true)
      window.removeEventListener('resize', sync)
      document.removeEventListener('scroll', sync, true)
    }
  }, [open, pathname])

  const startFreshChat = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    resetChatLeadStorage()
    const boot = createFreshChatState()
    setMsgs(boot.msgs)
    setLeadPhase(boot.phase)
    setLeadData(boot.lead)
    setFlowMode(boot.flowMode)
    setHasSubmittedDemo(false)
    leadPhaseRef.current = boot.phase
    leadDataRef.current = boot.lead
    flowModeRef.current = boot.flowMode
    msgsRef.current = boot.msgs
    setText('')
    setSending(false)
    stickToBottomRef.current = true
    validationAttemptsRef.current = 0
    saveChatState(boot)
    requestAnimationFrame(() => {
      const el = messagesRef.current
      if (!el) return
      suppressScrollTrackingRef.current = true
      el.scrollTop = 0
      requestAnimationFrame(() => {
        suppressScrollTrackingRef.current = false
      })
    })
  }, [])

  useEffect(() => {
    if (!open) {
      hydratedOpenRef.current = false
      return
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, handleClose])

  useEffect(() => {
    if (!open || hydratedOpenRef.current) return
    hydratedOpenRef.current = true

    trackingRef.current = loadEveiaTrackingIds()
    const boot = loadChatState()
    setMsgs(boot.msgs)
    setLeadPhase(boot.phase)
    setLeadData(boot.lead)
    setFlowMode(boot.flowMode)
    setHasSubmittedDemo(boot.hasSubmittedDemo === true)
    leadPhaseRef.current = boot.phase
    leadDataRef.current = boot.lead
    flowModeRef.current = boot.flowMode
    msgsRef.current = boot.msgs
    setText('')
    setSending(false)
  }, [open])

  useEffect(() => {
    if (!open) return
    persistState({ msgs, phase: leadPhase, lead: leadData, flowMode, hasSubmittedDemo })
  }, [msgs, leadPhase, leadData, flowMode, hasSubmittedDemo, open, persistState])

  useEffect(() => {
    if (!open) return
    if (!stickToBottomRef.current) return
    const id = requestAnimationFrame(() => {
      scrollMessagesToBottom()
    })
    return () => cancelAnimationFrame(id)
  }, [msgs, open, scrollMessagesToBottom])

  useEffect(() => {
    if (!open) return
    stickToBottomRef.current = true
    const id = requestAnimationFrame(() => {
      scrollMessagesToBottom()
    })
    return () => cancelAnimationFrame(id)
  }, [open, scrollMessagesToBottom])

  useEffect(() => {
    const el = messagesRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => {
      if (!open) return
      if (!stickToBottomRef.current) return
      scrollMessagesToBottom()
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [open, scrollMessagesToBottom])

  function persistEmbedSessionId(sessionId: string) {
    trackingRef.current = { ...trackingRef.current, embedSessionId: sessionId }
    saveEveiaTrackingIds(trackingRef.current)
  }

  function buildChatRequestMessages(history: ChatMsg[], userMsg: string): EveiaChatMessage[] {
    const recent = history.filter((m) => m.text.trim()).slice(-20)
    return [
      { role: 'system', content: EVEIA_RESPONSE_STYLE_PROMPT },
      ...recent.map((m) => ({ role: m.role, content: m.text })),
      { role: 'user', content: userMsg },
    ]
  }

  /**
   * Persist lead/demo/pricing turns into Eveia embed chat logs without using the
   * VALID/INVALID AI validator. Local UI text stays authoritative; API is asked
   * to echo the exact assistant reply so SaaS transcript matches the widget.
   */
  function syncLeadTurnToEveia(
    historyBefore: ChatMsg[],
    userText: string | undefined,
    assistantTexts: string[],
  ) {
    if (!isEveiaChatConfigured()) return
    const assistantContent = assistantTexts.map((t) => t.trim()).filter(Boolean).join('\n\n')
    if (!assistantContent) return

    const messages: EveiaChatMessage[] = [
      {
        role: 'system',
        content:
          'You are Eveia.AI on the marketing site continuing a private demo or pricing intake. ' +
          'Reply with EXACTLY the following text and nothing else — no quotes, no preamble, no extras:\n\n' +
          assistantContent,
      },
      ...historyBefore
        .filter((m) => m.text.trim())
        .slice(-18)
        .map((m) => ({ role: m.role, content: m.text })),
      { role: 'user', content: (userText ?? 'Continue').trim() || 'Continue' },
    ]

    void streamEveiaChat({
      messages,
      tracking: trackingRef.current,
      onEmbedSessionId: persistEmbedSessionId,
    }).catch(() => {
      // Best-effort logging only — never block the local lead UI.
    })
  }

  function appendLeadExchange(userText: string, assistantTexts: string[]) {
    const historyBefore = msgsRef.current
    const next: ChatMsg[] = [...historyBefore, { role: 'user', text: userText, source: 'lead' }]
    for (const assistantText of assistantTexts) {
      next.push({ role: 'assistant', text: assistantText, source: 'lead' })
    }
    msgsRef.current = next
    setMsgs(next)
    syncLeadTurnToEveia(historyBefore, userText, assistantTexts)
  }

  function buildFlowMsgs(userLabel: string | undefined, assistantTexts: string[]): ChatMsg[] {
    const assistantMsgs = assistantTexts.map((text) => ({
      role: 'assistant' as const,
      text,
      source: 'lead' as const,
    }))
    if (userLabel) {
      return [
        ...msgsRef.current,
        { role: 'user' as const, text: userLabel, source: 'lead' },
        ...assistantMsgs,
      ]
    }
    return [...msgsRef.current, ...assistantMsgs]
  }

  function commitFlowMessages(newMsgs: ChatMsg[], phase: LeadPhase, lead: LeadData, flowMode: FlowMode) {
    msgsRef.current = newMsgs
    setMsgs(newMsgs)
    setLeadData(lead)
    setFlowMode(flowMode)
    setLeadPhase(phase)
    leadDataRef.current = lead
    flowModeRef.current = flowMode
    leadPhaseRef.current = phase
    persistState({ msgs: newMsgs, phase, lead, flowMode })
  }

  function beginDemoFlow(userLabel?: string) {
    const historyBefore = msgsRef.current
    const started = startDemoFlow(leadDataRef.current)
    const newMsgs = buildFlowMsgs(userLabel, started.assistantMessages)
    commitFlowMessages(newMsgs, started.phase, started.lead, started.flowMode)
    syncLeadTurnToEveia(historyBefore, userLabel, started.assistantMessages)
  }

  function beginPricingFlow(userLabel?: string) {
    const historyBefore = msgsRef.current
    const started = startPricingFlow(leadDataRef.current)
    const newMsgs = buildFlowMsgs(userLabel, started.assistantMessages)
    commitFlowMessages(newMsgs, started.phase, started.lead, started.flowMode)
    syncLeadTurnToEveia(historyBefore, userLabel, started.assistantMessages)
  }

  function handleCancelFlow() {
    const mode = flowModeRef.current
    if (mode === 'idle') return
    const historyBefore = msgsRef.current
    const cancelled = cancelActiveFlow(mode)
    const userLabel = mode === 'demo' ? 'Cancel private demo' : 'Cancel request pricing'
    const newMsgs = buildFlowMsgs(userLabel, cancelled.assistantMessages)
    commitFlowMessages(newMsgs, cancelled.phase, cancelled.lead, cancelled.flowMode)
    validationAttemptsRef.current = 0
    syncLeadTurnToEveia(historyBefore, userLabel, cancelled.assistantMessages)
  }

  async function processLeadReply(msg: string) {
    const mode = flowModeRef.current

    if (shouldRetrySubmit(leadPhaseRef.current)) {
      const historyBefore = msgsRef.current
      const outcome = await submitLead(leadDataRef.current, mode)
      const assistantText = outcome.success
        ? outcome.message
        : `${outcome.message} Please try again or email us at inquiry@eveia.ai.`
      setMsgs((current) => [
        ...current,
        { role: 'user', text: msg, source: 'lead' },
        { role: 'assistant', text: assistantText, source: 'lead' },
      ])
      const nextPhase: LeadPhase = outcome.success ? 'done' : 'submit_failed'
      setLeadPhase(nextPhase)
      leadPhaseRef.current = nextPhase
      if (outcome.success) {
        setFlowMode('idle')
        flowModeRef.current = 'idle'
        setLeadPhase('idle')
        leadPhaseRef.current = 'idle'
        if (mode === 'demo') {
          setHasSubmittedDemo(true)
        }
      }
      syncLeadTurnToEveia(historyBefore, msg, [assistantText])
      return
    }

    // Local validation only — do NOT call Eveia chat API here (that polluted chat logs with VALID/INVALID).
    const prevPhase = leadPhaseRef.current
    const prevLead = leadDataRef.current
    const fieldKey = getFieldForPhase(mode, prevPhase)?.key
    const result = handleLeadInput(prevPhase, prevLead, mode, msg)
    const rejected =
      result.phase === prevPhase &&
      fieldKey != null &&
      result.lead[fieldKey] === prevLead[fieldKey]

    if (rejected && result.assistantMessages.length > 0) {
      validationAttemptsRef.current += 1
      if (validationAttemptsRef.current >= 3) {
        appendLeadExchange(result.userEcho ?? msg, [
          "Sorry, I can't proceed with that information. I'll be ready when you are.",
        ])
        setFlowMode('idle')
        flowModeRef.current = 'idle'
        setLeadPhase('idle')
        leadPhaseRef.current = 'idle'
        setLeadData(EMPTY_LEAD_DATA)
        leadDataRef.current = EMPTY_LEAD_DATA
        validationAttemptsRef.current = 0
        return
      }
    } else {
      validationAttemptsRef.current = 0
    }

    setLeadData(result.lead)
    leadDataRef.current = result.lead
    appendLeadExchange(result.userEcho ?? msg, result.assistantMessages)

    if (result.phase === 'submitting') {
      setLeadPhase('submitting')
      leadPhaseRef.current = 'submitting'
      const historyBeforeSubmit = msgsRef.current
      const outcome = await submitLead(result.lead, result.flowMode)
      const nextPhase: LeadPhase = outcome.success ? 'done' : 'submit_failed'
      setLeadPhase(nextPhase)
      leadPhaseRef.current = nextPhase
      if (outcome.success) {
        setFlowMode('idle')
        flowModeRef.current = 'idle'
        setLeadPhase('idle')
        leadPhaseRef.current = 'idle'
        if (result.flowMode === 'demo') {
          setHasSubmittedDemo(true)
        }
      } else {
        setFlowMode(result.flowMode)
        flowModeRef.current = result.flowMode
      }
      const assistantText = outcome.success
        ? outcome.message
        : `${outcome.message} Please try again or email us at inquiry@eveia.ai.`
      setMsgs((current) => [
        ...current,
        { role: 'assistant', text: assistantText, source: 'lead' },
      ])
      // User turn already synced via appendLeadExchange; log the submit result as a follow-up.
      syncLeadTurnToEveia(historyBeforeSubmit, undefined, [assistantText])
      return
    }

    setLeadPhase(result.phase)
    leadPhaseRef.current = result.phase
    setFlowMode(result.flowMode)
    flowModeRef.current = result.flowMode
  }

  async function runFreeChat(msg: string) {
    if (!isEveiaChatConfigured()) {
      setMsgs((current) => [
        ...current,
        { role: 'user', text: msg, source: 'chat' },
        {
          role: 'assistant',
          text: 'Chat is temporarily unavailable. The server build is missing VITE_EVEIA_API_KEY — add it in Vercel env vars, then redeploy.',
          source: 'chat',
        },
      ])
      return
    }

    const requestMessages = buildChatRequestMessages(msgsRef.current, msg)
    setMsgs((current) => [
      ...current,
      { role: 'user', text: msg, source: 'chat' },
      { role: 'assistant', text: '', source: 'chat' },
    ])

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    try {
      const reply = await streamEveiaChat({
        messages: requestMessages,
        tracking: trackingRef.current,
        signal: controller.signal,
        onEmbedSessionId: persistEmbedSessionId,
        onChunk: (content) => {
          setMsgs((current) => {
            const next = [...current]
            const last = next[next.length - 1]
            if (last?.role === 'assistant') {
              next[next.length - 1] = { role: 'assistant', text: content, source: 'chat' }
            }
            return next
          })
        },
      })

      if (!reply.trim()) {
        setMsgs((current) => {
          const next = [...current]
          next[next.length - 1] = {
            role: 'assistant',
            text: 'I could not generate a response. Please try again.',
            source: 'chat',
          }
          return next
        })
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        setMsgs((current) => {
          const last = current[current.length - 1]
          if (last?.role === 'assistant' && !last.text.trim()) {
            return current.slice(0, -1)
          }
          return current
        })
        return
      }

      const message = error instanceof Error && error.message ? error.message : DEFAULT_CHAT_ERROR
      setMsgs((current) => {
        const next = [...current]
        next[next.length - 1] = { role: 'assistant', text: message, source: 'chat' }
        return next
      })
    } finally {
      if (abortRef.current === controller) abortRef.current = null
    }
  }

  async function sendMessage(msg: string) {
    if (!msg || sending) return

    if (isLeadFlowActive(flowModeRef.current, leadPhaseRef.current)) {
      setText('')
      setSending(true)
      try {
        await processLeadReply(msg)
      } finally {
        setSending(false)
      }
      return
    }

    if (parsePricingIntent(msg)) {
      setText('')
      beginPricingFlow(msg)
      return
    }

    if (parseBookingIntent(msg)) {
      setText('')
      beginDemoFlow(msg)
      return
    }

    setText('')
    setSending(true)
    try {
      await runFreeChat(msg)
    } finally {
      setSending(false)
    }
  }

  async function send() {
    await sendMessage(text.trim())
  }

  const showTyping = sending && !msgs[msgs.length - 1]?.text?.trim()
  const showBookDemo = flowMode === 'idle' && !sending && !hasSubmittedDemo
  const showCancelDemo = flowMode === 'demo' && isCollectingDetails(flowMode, leadPhase) && !sending
  const showCancelPricing = flowMode === 'pricing' && isCollectingDetails(flowMode, leadPhase) && !sending
  const currentField = getFieldForPhase(flowMode, leadPhase)
  const showOptionButtons = !!currentField?.options?.length
  const showSkipButton = !!currentField?.optional

  return (
    <div className={`chat-widget${open ? ' is-open' : ''}`}>
      <div
        ref={panelRef}
        className={`chat-widget-panel${open ? ' open' : ''}`}
        role="dialog"
        aria-modal="false"
        aria-label="Eveia.AI chat"
        aria-hidden={!open}
      >
        <div className="chat-header">
          <div className="chat-header-left">
            <img src={chatIcon} alt="" className="chat-header-icon" />
            <div>
              <div className="chat-header-title">Eveia.AI</div>
              <div className="chat-header-sub">Complete work faster · Try it free</div>
            </div>
          </div>
          <div className="chat-header-actions">
            <button
              type="button"
              className="chat-refresh"
              aria-label="New chat"
              title="New chat"
              onClick={startFreshChat}
              disabled={sending}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button className="chat-close" aria-label="Close chat" onClick={handleClose}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="chat-messages" ref={messagesRef} onScroll={onMessagesScroll}>
          {msgs.map((m, i) => {
            const isLast = i === msgs.length - 1
            const isEmptyAssistant = m.role === 'assistant' && !m.text.trim()

            if (isEmptyAssistant && !(isLast && showTyping)) return null

            return (
              <div className={`msg ${m.role}`} key={i}>
                {m.role === 'assistant' && (
                  <div className="msg-avatar">
                    <img src={chatIcon} alt="" className="msg-avatar-img" />
                  </div>
                )}
                <div className={`msg-bubble${isLast && showTyping ? ' msg-bubble--typing' : ''}`}>
                  {isLast && showTyping ? (
                    <TypingIndicator />
                  ) : m.role === 'assistant' ? (
                    formatChatMessage(m.text)
                  ) : (
                    m.text
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="chat-footer">
          {(showBookDemo || showCancelDemo || showCancelPricing || showOptionButtons || showSkipButton) && (
            <div className="chat-action-bar">
              {showBookDemo && (
                <button
                  type="button"
                  className="chat-action-btn primary"
                  onClick={() => beginDemoFlow('Book a demo')}
                  disabled={sending}
                >
                  Book a demo
                </button>
              )}
              {currentField?.options?.map((option) => (
                <button
                  key={option}
                  type="button"
                  className="chat-action-btn"
                  onClick={() => void sendMessage(option)}
                  disabled={sending}
                >
                  {option}
                </button>
              ))}
              {currentField?.optional && (
                <button
                  type="button"
                  className="chat-action-btn"
                  onClick={() => void sendMessage('skip')}
                  disabled={sending}
                >
                  Skip
                </button>
              )}
              {showCancelDemo && (
                <button
                  type="button"
                  className="chat-action-btn chat-action-btn--cancel"
                  onClick={handleCancelFlow}
                  disabled={sending}
                >
                  Cancel private demo
                </button>
              )}
              {showCancelPricing && (
                <button
                  type="button"
                  className="chat-action-btn chat-action-btn--cancel"
                  onClick={handleCancelFlow}
                  disabled={sending}
                >
                  Cancel request pricing
                </button>
              )}
            </div>
          )}

          <div className="chat-input-wrap">
            <textarea
              className="chat-input"
              placeholder="Ask Eveia.AI..."
              rows={1}
              value={text}
              onChange={(e) => {
                setText(e.target.value)
                e.target.style.height = 'auto'
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void send() }
              }}
            />
            <button className="chat-send" aria-label="Send" onClick={() => void send()} disabled={!text.trim() || sending}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`chat-widget-launcher${open ? ' is-open' : ''}`}
        aria-label={open ? 'Close chat' : 'Open Eveia.AI chat'}
        aria-expanded={open}
        onClick={handleToggle}
      >
        <span className="chat-widget-glass" aria-hidden="true" />
        <ChatEveSprite />
        {open && (
          <span className="chat-widget-launcher-close" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        )}
      </button>
      {!open && (
        <span
          ref={askRef}
          className={`chat-widget-ask${askOnDark ? ' is-on-dark' : ''}`}
          aria-hidden="true"
        >
          <span className="chat-widget-ask-disc" />
          <span className="chat-widget-ask-mark">?</span>
        </span>
      )}
    </div>
  )
}
