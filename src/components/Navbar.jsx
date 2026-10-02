import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink } from 'react-router-dom'

const DARK_SECTION_SELECTOR =
  '.dark, .sec4, .sec7, .footer, .sec8-banner, .reports-sources, .reports-uses, .reports-cta, .reports-cta-wrap, .search-uses, .pricing-hero, .pricing-expand'

export default function Navbar() {
  const [isOverDark, setIsOverDark] = useState(false)
  const [productOpen, setProductOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)

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

  useEffect(() => {
    if (!productOpen && !solutionsOpen) return

    const onPointerDown = (event) => {
      if (!event.target.closest('.nav-item')) {
        setProductOpen(false)
        setSolutionsOpen(false)
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [productOpen, solutionsOpen])

  return createPortal(
    <div className="nav-wrap">
      <nav className={`nav-pill ${isOverDark ? 'nav-over-dark' : ''}`}>
        <div className="nav-pill-glass" aria-hidden="true" />
        <div className={`nav-item ${productOpen ? 'is-open' : ''}`}>
          <button
            type="button"
            className="nav-trigger"
            aria-expanded={productOpen}
            aria-haspopup="true"
            onClick={() => {
              setProductOpen((open) => !open)
              setSolutionsOpen(false)
            }}
          >
            Product <span className="caret">▾</span>
          </button>
          <div className="nav-dropdown">
            <Link to="/#what-is-eveia" onClick={() => setProductOpen(false)}>
              What is Eveia.AI
            </Link>
            <Link to="/#how-it-works" onClick={() => setProductOpen(false)}>
              How it Works
            </Link>
            <Link to="/#security-privacy" onClick={() => setProductOpen(false)}>
              Security & Privacy
            </Link>
          </div>
        </div>
        <div className={`nav-item ${solutionsOpen ? 'is-open' : ''}`}>
          <button
            type="button"
            className="nav-trigger"
            aria-expanded={solutionsOpen}
            aria-haspopup="true"
            onClick={() => {
              setSolutionsOpen((open) => !open)
              setProductOpen(false)
            }}
          >
            Solutions <span className="caret">▾</span>
          </button>
          <div className="nav-mega">
            <div className="nav-mega-grid">
              <div className="nav-mega-col">
                <p className="nav-mega-label">BY NEED</p>
                <NavLink to="/reports" onClick={() => setSolutionsOpen(false)}>
                  Decision-Ready Reports
                </NavLink>
                <NavLink to="/search" onClick={() => setSolutionsOpen(false)}>
                  Instant Answers from Data
                </NavLink>
                <NavLink to="/proposals" onClick={() => setSolutionsOpen(false)}>
                  Proposal Drafting
                </NavLink>
                <NavLink to="/summaries" onClick={() => setSolutionsOpen(false)}>
                  Executive Summaries
                </NavLink>
              </div>
              <div className="nav-mega-col nav-mega-col--industry">
                <p className="nav-mega-label">BY INDUSTRY</p>
                <div className="nav-mega-industry">
                  <div>
                    <NavLink to="/enterprise" onClick={() => setSolutionsOpen(false)}>
                      Enterprise
                    </NavLink>
                    <NavLink to="/government" onClick={() => setSolutionsOpen(false)}>
                      Government
                    </NavLink>
                    <NavLink to="/healthcare" onClick={() => setSolutionsOpen(false)}>
                      Healthcare
                    </NavLink>
                    <NavLink to="/legal" onClick={() => setSolutionsOpen(false)}>
                      Legal
                    </NavLink>
                  </div>
                  <div>
                    <NavLink to="/financial-services" onClick={() => setSolutionsOpen(false)}>
                      Financial Services
                    </NavLink>
                    <NavLink to="/energy" onClick={() => setSolutionsOpen(false)}>
                      Energy & Utilities
                    </NavLink>
                    <NavLink to="/manufacturing" onClick={() => setSolutionsOpen(false)}>
                      Manufacturing
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="nav-mega-foot">
              <a href="#solutions" onClick={() => setSolutionsOpen(false)}>
                Data Privacy and AI
              </a>
            </div>
          </div>
        </div>
        <a href="#" className="label-hide">Blog</a>
        <NavLink to="/pricing" className="label-hide">Pricing</NavLink>
        <a href="mailto:inquiry@eveia.ai" className="cta">Request a Demo</a>
      </nav>
    </div>,
    document.body
  )
}
