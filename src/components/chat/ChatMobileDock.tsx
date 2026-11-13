import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChatEveSprite } from './ChatEveSprite'
import { WELCOME_MESSAGE } from './chatLeadFlow'

// The hero CTA is the first primary button in page content; the dock CTA
// takes over once it has scrolled up under the top bar.
const HERO_CTA_SELECTOR =
  '#root .btn-primary, #root .m-btn-primary, #root .m-page-btn, #root .contact-hero-cta'
const TOPBAR_CLEARANCE = 100

function useDockCta(pathname: string) {
  const [showCta, setShowCta] = useState(false)
  useEffect(() => {
    let frame = 0
    const sync = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const cta = document.querySelector(HERO_CTA_SELECTOR)
        const next = cta ? cta.getBoundingClientRect().bottom < TOPBAR_CLEARANCE : true
        setShowCta(next)
      })
    }
    sync()
    const late = setTimeout(sync, 400)
    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(late)
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [pathname])
  return showCta
}

const [GREET_LEAD, ...GREET_REST] = WELCOME_MESSAGE.split('. ')

type Props = { open: boolean; onOpen: () => void }

// Phone-only reserved dock: Eve greeting (or the demo CTA) beside the Eve launcher.
export function ChatMobileDock({ open, onOpen }: Props) {
  const { pathname } = useLocation()
  const showCta = useDockCta(pathname)

  return (
    <div className={`chat-dock${showCta ? ' show-cta' : ''}${open ? ' is-chat-open' : ''}`}>
      <div className="chat-dock-slot">
        <button
          type="button"
          className="chat-dock-greet"
          onClick={onOpen}
          tabIndex={showCta ? -1 : 0}
          aria-hidden={showCta}
        >
          <span>
            <strong>{GREET_LEAD}.</strong> {GREET_REST.join('. ')}
          </span>
        </button>
        <a
          href="mailto:inquiry@eveia.ai"
          className="chat-dock-cta"
          tabIndex={showCta ? 0 : -1}
          aria-hidden={!showCta}
        >
          Request a Private Demo
        </a>
      </div>
      <button
        type="button"
        className="chat-dock-eve"
        aria-label="Open Eveia.AI chat"
        aria-expanded={open}
        onClick={onOpen}
      >
        <ChatEveSprite />
        <span className="chat-dock-ping" aria-hidden="true" />
      </button>
    </div>
  )
}
