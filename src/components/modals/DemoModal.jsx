import { useEffect, useMemo, useRef, useState } from 'react'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import { CALENDLY_DEMO_URL } from '../../lib/ctaLinks'

function buildCalendlyEmbedUrl() {
  const url = new URL(CALENDLY_DEMO_URL)
  url.searchParams.set('hide_gdpr_banner', '1')
  url.searchParams.set('embed_type', 'Inline')
  url.searchParams.set('embed_domain', window.location.hostname)
  return url.toString()
}

export function DemoModal({ open, onClose, onSuccess }) {
  const overlayRef = useRef(null)
  const [frameReady, setFrameReady] = useState(false)
  const embedSrc = useMemo(() => (open ? buildCalendlyEmbedUrl() : ''), [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useBodyScrollLock(open)

  useEffect(() => {
    if (!open) setFrameReady(false)
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    function onMessage(event) {
      if (event.origin !== 'https://calendly.com') return
      const name = typeof event.data === 'object' && event.data && 'event' in event.data
        ? String(event.data.event)
        : ''
      if (name === 'calendly.event_scheduled') onSuccess?.()
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [open, onSuccess])

  return (
    <div
      ref={overlayRef}
      className={`form-overlay${open ? ' open' : ''}`}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div className="form-modal calendly-modal" role="dialog" aria-modal="true" aria-labelledby="demo-title">
        <button type="button" className="form-close" aria-label="Close" onClick={onClose}>&times;</button>

        <div className="calendly-modal-header">
          <h2 id="demo-title" className="form-title">Request a Private Demo</h2>
          <p className="form-subtitle">Pick a time that works for you. We’ll walk you through Eveia.AI live.</p>
        </div>

        <div className="calendly-embed">
          {open ? (
            <>
              {frameReady ? null : (
                <div className="calendly-embed-loading" aria-hidden="true">Loading scheduler…</div>
              )}
              <iframe
                title="Schedule a private demo with Eveia.AI"
                src={embedSrc}
                className={`calendly-iframe${frameReady ? ' is-ready' : ''}`}
                onLoad={() => setFrameReady(true)}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
