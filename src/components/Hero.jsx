import { useEffect, useRef } from 'react'
import heroBg from '../assets/hero-bg.webp'

export default function Hero() {
  const brandRef = useRef(null)

  useEffect(() => {
    const brand = brandRef.current
    if (!brand) return undefined

    const logo = brand.querySelector('.logo-mark')
    const tag = brand.querySelector('.tagline')
    if (!logo || !tag) return undefined

    const fitTagline = () => {
      tag.style.letterSpacing = '0px'
      const start = tag.querySelector('.t1')
      const end = tag.querySelector('.t2')
      if (!start || !end) return
      const natural = end.getBoundingClientRect().right - start.getBoundingClientRect().left
      const extra = logo.getBoundingClientRect().width - natural
      const chars = tag.textContent.replace(/\s+/g, ' ').trim()
      const gaps = Math.max(chars.length - 1, 1)
      tag.style.letterSpacing = `${Math.max(extra, 0) / gaps}px`
    }

    fitTagline()
    const fontsReady = document.fonts?.ready?.then(fitTagline)
    const observer = new ResizeObserver(fitTagline)
    observer.observe(logo)
    window.addEventListener('resize', fitTagline)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', fitTagline)
      fontsReady?.catch?.(() => {})
    }
  }, [])

  return (
    <header
      className="hero"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <p className="eyebrow">YOUR PRIVATE ENTERPRISE AI</p>
      <div className="hero-brand" ref={brandRef}>
        <h1 className="logo-mark">Eveia.AI</h1>
        <p className="tagline"><span className="t1">MOVE YOUR TEAM</span> <span className="t2">FORWARD</span></p>
      </div>
      <p className="hero-desc">Turn your organization's knowledge into <br className="hero-br" />instant answers, reports, and proposals in minutes.</p>
      <div className="hero-ctas">
        <a className="btn btn-primary" href="mailto:inquiry@eveia.ai">Request a Private Demo</a>
        <a className="btn btn-secondary" href="/contact#send-message">Send us a message</a>
      </div>
    </header>
  )
}
