import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PIN_TO_SECTION_TOP = new Set(['what-is-eveia', 'how-it-works'])

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior = reduceMotion ? 'instant' : 'smooth'

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }

    const id = decodeURIComponent(hash.slice(1))
    const reveal = (el) => {
      el.classList.add('is-visible')
      el.querySelectorAll('.sec6-row').forEach((row) => row.classList.add('is-inview'))
    }

    const pinToTop = (el) => {
      const top = Math.round(el.getBoundingClientRect().top + window.scrollY)
      if (Math.abs(window.scrollY - top) > 2) {
        window.scrollTo({ top, left: 0, behavior: 'instant' })
      }
    }

    const scrollToHash = (mode) => {
      const el = document.getElementById(id)
      if (!el) return false
      reveal(el)
      if (PIN_TO_SECTION_TOP.has(id)) {
        pinToTop(el)
        return true
      }
      el.scrollIntoView({ behavior: mode, block: 'start' })
      return true
    }

    scrollToHash(behavior)
    const frame = requestAnimationFrame(() => scrollToHash(behavior))
    const timer = window.setTimeout(() => scrollToHash('instant'), 80)
    const late = window.setTimeout(() => scrollToHash('instant'), 320)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
      window.clearTimeout(late)
    }
  }, [pathname, hash])

  return null
}
