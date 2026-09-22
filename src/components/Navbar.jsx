import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const DARK_SECTION_SELECTOR = '.dark, .sec4, .sec7, .footer, .sec8-banner'

export default function Navbar() {
  const [isOverDark, setIsOverDark] = useState(false)

  useEffect(() => {
    const updateNavTheme = () => {
      const navY = 56
      const darkSections = document.querySelectorAll(DARK_SECTION_SELECTOR)
      let overDark = false

      for (const section of darkSections) {
        const { top, bottom } = section.getBoundingClientRect()
        if (navY >= top && navY <= bottom) {
          overDark = true
          break
        }
      }

      setIsOverDark(overDark)
    }

    updateNavTheme()
    window.addEventListener('scroll', updateNavTheme, { passive: true })
    window.addEventListener('resize', updateNavTheme)

    return () => {
      window.removeEventListener('scroll', updateNavTheme)
      window.removeEventListener('resize', updateNavTheme)
    }
  }, [])

  return createPortal(
    <div className="nav-wrap">
      <nav className={`nav-pill ${isOverDark ? 'nav-over-dark' : ''}`}>
        <a href="#">Product <span className="caret">▾</span></a>
        <a href="#">Solutions <span className="caret">▾</span></a>
        <a href="#" className="label-hide">Blog</a>
        <a href="#" className="label-hide">Pricing</a>
        <a href="#" className="cta">Request a Demo</a>
      </nav>
    </div>,
    document.body
  )
}
