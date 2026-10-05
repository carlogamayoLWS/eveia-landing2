import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'

const DARK_SECTION_SELECTOR =
  '.dark, .sec4, .sec7, .footer, .sec8-banner, .reports-sources, .reports-uses, .reports-cta, .reports-cta-wrap, .search-uses, .pricing-hero, .pricing-expand'

export default function Navbar() {
  const [isOverDark, setIsOverDark] = useState(false)
  const [productOpen, setProductOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileProductOpen, setMobileProductOpen] = useState(false)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const location = useLocation()
  const [prevKey, setPrevKey] = useState(location.key)
  if (prevKey !== location.key) {
    setPrevKey(location.key)
    setMobileMenuOpen(false)
  }

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

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    const handleResize = () => {
      if (window.innerWidth > 860) setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const closeMobile = () => setMobileMenuOpen(false)

  return createPortal(
    <>
      {/* DESKTOP NAVBAR (UNTOUCHED FOR DESKTOP >= 861px) */}
      <div className="nav-wrap nav-desktop-wrap">
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
      </div>

      {/* MOBILE NAVBAR (ACTIVE ONLY ON <= 860px) */}
      <div className={`nav-mobile-wrap ${isOverDark ? 'nav-mobile-over-dark' : ''}`}>
        <header className="nav-mobile-bar">
          <div className="nav-mobile-bar-glass" aria-hidden="true" />
          <Link to="/" className="nav-mobile-brand" onClick={closeMobile}>
            Eveia<span className="brand-dot">.AI</span>
          </Link>

          <div className="nav-mobile-actions">
            <a href="mailto:inquiry@eveia.ai" className="nav-mobile-demo-btn">
              Demo
            </a>
            <button
              type="button"
              className={`nav-mobile-toggle ${mobileMenuOpen ? 'is-open' : ''}`}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              <span className="mobile-hamburger-bar top" />
              <span className="mobile-hamburger-bar mid" />
              <span className="mobile-hamburger-bar bot" />
            </button>
          </div>
        </header>

        {/* MOBILE FULL-SCREEN / SLIDE DRAWER */}
        <div className={`nav-mobile-drawer ${mobileMenuOpen ? 'is-active' : ''}`} aria-hidden={!mobileMenuOpen}>
          <div className="nav-mobile-drawer-backdrop" onClick={closeMobile} />
          <div className="nav-mobile-drawer-sheet">
            <div className="nav-mobile-drawer-header">
              <Link to="/" className="nav-mobile-brand" onClick={closeMobile}>
                Eveia<span className="brand-dot">.AI</span>
              </Link>
              <button
                type="button"
                className="nav-mobile-close-btn"
                aria-label="Close menu"
                onClick={closeMobile}
              >
                ✕
              </button>
            </div>

            <div className="nav-mobile-drawer-scroll">
              {/* Product Accordion */}
              <div className={`nav-mobile-accordion ${mobileProductOpen ? 'is-expanded' : ''}`}>
                <button
                  type="button"
                  className="nav-mobile-accordion-trigger"
                  onClick={() => setMobileProductOpen((o) => !o)}
                  aria-expanded={mobileProductOpen}
                >
                  <span>Product</span>
                  <span className="accordion-chevron">▾</span>
                </button>
                <div className="nav-mobile-accordion-body">
                  <Link to="/#what-is-eveia" onClick={closeMobile}>
                    <span className="accordion-bullet" />
                    What is Eveia.AI
                  </Link>
                  <Link to="/#how-it-works" onClick={closeMobile}>
                    <span className="accordion-bullet" />
                    How it Works
                  </Link>
                  <Link to="/#security-privacy" onClick={closeMobile}>
                    <span className="accordion-bullet" />
                    Security & Privacy
                  </Link>
                </div>
              </div>

              {/* Solutions Accordion */}
              <div className={`nav-mobile-accordion ${mobileSolutionsOpen ? 'is-expanded' : ''}`}>
                <button
                  type="button"
                  className="nav-mobile-accordion-trigger"
                  onClick={() => setMobileSolutionsOpen((o) => !o)}
                  aria-expanded={mobileSolutionsOpen}
                >
                  <span>Solutions</span>
                  <span className="accordion-chevron">▾</span>
                </button>
                <div className="nav-mobile-accordion-body">
                  <div className="nav-mobile-group-label">BY NEED</div>
                  <NavLink to="/reports" onClick={closeMobile}>
                    <span className="accordion-bullet" />
                    Decision-Ready Reports
                  </NavLink>
                  <NavLink to="/search" onClick={closeMobile}>
                    <span className="accordion-bullet" />
                    Instant Answers from Data
                  </NavLink>
                  <NavLink to="/proposals" onClick={closeMobile}>
                    <span className="accordion-bullet" />
                    Proposal Drafting
                  </NavLink>
                  <NavLink to="/summaries" onClick={closeMobile}>
                    <span className="accordion-bullet" />
                    Executive Summaries
                  </NavLink>

                  <div className="nav-mobile-group-label" style={{ marginTop: '16px' }}>BY INDUSTRY</div>
                  <NavLink to="/enterprise" onClick={closeMobile}>
                    <span className="accordion-bullet" />
                    Enterprise
                  </NavLink>
                  <NavLink to="/government" onClick={closeMobile}>
                    <span className="accordion-bullet" />
                    Government
                  </NavLink>
                  <NavLink to="/healthcare" onClick={closeMobile}>
                    <span className="accordion-bullet" />
                    Healthcare
                  </NavLink>
                  <NavLink to="/legal" onClick={closeMobile}>
                    <span className="accordion-bullet" />
                    Legal
                  </NavLink>
                  <NavLink to="/financial-services" onClick={closeMobile}>
                    <span className="accordion-bullet" />
                    Financial Services
                  </NavLink>
                  <NavLink to="/energy" onClick={closeMobile}>
                    <span className="accordion-bullet" />
                    Energy & Utilities
                  </NavLink>
                  <NavLink to="/manufacturing" onClick={closeMobile}>
                    <span className="accordion-bullet" />
                    Manufacturing
                  </NavLink>

                  <div className="nav-mobile-group-foot">
                    <a href="#solutions" onClick={closeMobile}>
                      Data Privacy and AI →
                    </a>
                  </div>
                </div>
              </div>

              <NavLink to="/pricing" className="nav-mobile-direct-link" onClick={closeMobile}>
                Pricing
              </NavLink>
              <a href="#blog" className="nav-mobile-direct-link" onClick={closeMobile}>
                Blog
              </a>

              <div className="nav-mobile-drawer-footer">
                <a
                  href="mailto:inquiry@eveia.ai"
                  className="btn btn-primary nav-mobile-drawer-cta"
                  onClick={closeMobile}
                >
                  Request a Private Demo
                </a>
                <p className="nav-mobile-drawer-tagline">
                  Your Private Enterprise AI. Built to move your team forward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}
