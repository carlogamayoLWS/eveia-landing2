import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'
import { useIsMobile } from '../../hooks/useIsMobile.js'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock.js'
import { MobileIcon } from './MobileIcons.jsx'
import MobileMenuDrawer, { MobileWordmark } from './MobileMenuDrawer.jsx'
import { MOBILE_DARK_SELECTOR } from './mobileNavLinks.js'

const BAR_MID_Y = 28

function useTopbarTheme(pathname) {
  const [state, setState] = useState({ dark: false, scrolled: false })
  useEffect(() => {
    let frame = 0
    const sync = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        let dark = false
        for (const el of document.querySelectorAll(MOBILE_DARK_SELECTOR)) {
          if (el.closest('.m-drawer, .chat-widget')) continue
          const { top, bottom } = el.getBoundingClientRect()
          if (top <= BAR_MID_Y && bottom >= BAR_MID_Y) {
            dark = true
            break
          }
        }
        const scrolled = window.scrollY > 4
        setState((s) => (s.dark === dark && s.scrolled === scrolled ? s : { dark, scrolled }))
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
  return state
}

function MobileTopbarInner() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [prevKey, setPrevKey] = useState(location.key)
  if (prevKey !== location.key) {
    setPrevKey(location.key)
    setOpen(false)
  }
  const { dark, scrolled } = useTopbarTheme(location.pathname)
  useBodyScrollLock(open)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)
  const cls = `m-topbar${dark ? ' is-dark' : ''}${scrolled ? ' is-scrolled' : ''}`

  return createPortal(
    <>
      <header className={cls}>
        <MobileWordmark onClick={close} />
        <div className="m-topbar-actions">
          <a href="mailto:inquiry@eveia.ai" className="m-topbar-demo">
            Demo
          </a>
          <button
            type="button"
            className="m-icon-btn"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <MobileIcon name="menu" />
          </button>
        </div>
      </header>
      <MobileMenuDrawer open={open} onClose={close} />
    </>,
    document.body
  )
}

// Phone-only top bar + full-screen menu. Renders nothing at 768px and up,
// where the existing Navbar stays in charge.
export default function MobileTopbar() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileTopbarInner /> : null
}
