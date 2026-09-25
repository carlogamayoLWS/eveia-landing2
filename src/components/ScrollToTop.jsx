import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

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
    const scrollToHash = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior, block: 'start' })
    }

    scrollToHash()
    const frame = requestAnimationFrame(scrollToHash)
    const timer = window.setTimeout(scrollToHash, 80)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [pathname, hash])

  return null
}
