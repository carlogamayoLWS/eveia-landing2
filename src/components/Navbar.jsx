import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink } from 'react-router-dom'

const DARK_SECTION_SELECTOR =
  '.dark, .sec4, .sec7, .footer, .sec8-banner, .reports-sources, .reports-uses, .reports-cta, .reports-cta-wrap'

export default function Navbar() {
  const [isOverDark, setIsOverDark] = useState(false)
  const [productOpen, setProductOpen] = useState(false)

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
        <div
          className={`nav-item ${productOpen ? 'is-open' : ''}`}
          onMouseEnter={() => setProductOpen(true)}
          onMouseLeave={() => setProductOpen(false)}
        >
          <button
            type="button"
            className="nav-trigger"
            aria-expanded={productOpen}
            aria-haspopup="true"
            onClick={() => setProductOpen(true)}
          >
            Product <span className="caret">▾</span>
          </button>
          <div className="nav-dropdown">
            <NavLink to="/reports" onClick={() => setProductOpen(false)}>
              AI Report Generation
            </NavLink>
            <Link to="/" onClick={() => setProductOpen(false)}>
              What is Eveia.AI
            </Link>
          </div>
        </div>
        <a href="#">Solutions <span className="caret">▾</span></a>
        <a href="#" className="label-hide">Blog</a>
        <Link to="/#pricing" className="label-hide">Pricing</Link>
        <a href="mailto:inquiry@eveia.ai" className="cta">Request a Demo</a>
      </nav>
    </div>,
    document.body
  )
}
