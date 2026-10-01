import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ringsArt from '../assets/summaries-rings.png'
import industryImg from '../assets/enterprise-industry.png'
import footerLogo from '../assets/footer-logo.png'
import Footer from '../components/Footer.jsx'
import { INDUSTRY_CARDS, industries } from '../data/industries.js'

function useInView(threshold = 0.2, rootMargin = '0px 0px -40px 0px') {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, isVisible]
}

export default function IndustryPage({ id }) {
  const page = industries[id]
  const [teamsRef, teamsVisible] = useInView(0.15)
  const [stackRef, stackVisible] = useInView(0, '0px 0px 0px 0px')
  const pageRef = useRef(null)
  const ringsRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const root = pageRef.current
    if (!root) return undefined

    let ticking = false
    const update = () => {
      ticking = false
      if (!ringsRef.current) return
      const rect = ringsRef.current.getBoundingClientRect()
      const progress = (window.innerHeight * 0.72 - rect.top) / window.innerHeight
      const p = Math.max(-0.35, Math.min(0.55, progress))
      ringsRef.current.style.setProperty('--rings-y', `${p * 90}px`)
      ringsRef.current.style.setProperty('--rings-scale', `${1 + p * 0.08}`)
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [id])

  return (
    <main ref={pageRef} className={`reports-page summaries-page enterprise-page enterprise-page--${id}`}>
      <div className="reports-hero-wrap">
        <header className="reports-hero">
          <div className="reports-hero-inner">
            <div className="reports-hero-copy">
              <p className="reports-eyebrow">{page.eyebrow}</p>
              <h1 className="reports-hero-title">{page.title}</h1>
              <p className="reports-hero-desc">{page.description}</p>
              <div className="reports-hero-ctas">
                <a className="btn btn-primary" href="#request-demo">
                  Request a Private Demo
                </a>
              </div>
              <p className="reports-hero-note">{page.note}</p>
            </div>
            <div className="enterprise-hero-visual">
              <img src={page.hero} alt={page.heroAlt} />
            </div>
          </div>
        </header>
      </div>

      <section className="reports-sources">
        <div className="reports-sources-inner">
          <div className="summaries-how-head">
            <img
              ref={ringsRef}
              className={`summaries-rings ${teamsVisible ? 'is-inview' : ''}`}
              src={ringsArt}
              alt=""
              aria-hidden="true"
            />
            <h2 className="reports-sources-title">{page.howTitle}</h2>
            <p className="reports-sources-desc">{page.howBody}</p>
          </div>
          <div
            ref={teamsRef}
            className={`enterprise-teams ${teamsVisible ? 'is-visible' : ''}`}
          >
            {page.teams.map((team) => (
              <article
                className={`enterprise-team enterprise-team--${team.accent}`}
                key={team.title}
              >
                <img src={team.icon} alt="" />
                <h3>{team.title}</h3>
                <p>{team.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div
        ref={stackRef}
        className={`reports-stack-wrap ${stackVisible ? 'is-visible' : ''}`}
      >
        <div className="reports-stack">
          <span className="enterprise-stack-glow" aria-hidden="true" />
          <section className="reports-how">
            <div className="reports-how-inner">
              <h2 className="reports-how-heading">
                {page.builtBefore}
                <span>{page.builtHighlight}</span>
                {page.builtAfter}
              </h2>
              <p className="reports-how-lead">{page.builtLead}</p>
              <ul className="reports-how-list">
                {page.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="reports-how-lead">{page.builtClose}</p>
            </div>
          </section>

          <section className="reports-amplify">
            <div className="reports-byneed">
              <p className="reports-byneed-label">BY INDUSTRY</p>
              <div className="reports-byneed-grid">
                {INDUSTRY_CARDS.map((item) => (
                  <article className="reports-byneed-card" key={item.title}>
                    <img src={industryImg} alt="" />
                    <div className="reports-byneed-copy">
                      <h3>{item.title}</h3>
                      <p>Lorem ipsum dolor sit amet consectetur. Ac sapien....</p>
                      <Link to={item.href}>Read more →</Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="reports-cta-wrap" id="request-demo">
        <div className="reports-cta">
          <div className="reports-cta-bg" aria-hidden="true">
            <img src={footerLogo} alt="" />
          </div>
          <div className="reports-cta-content">
            <h2 className="reports-cta-heading">{page.ctaTitle}</h2>
            <p className="reports-cta-desc">{page.ctaBody}</p>
            <div className="reports-cta-actions">
              <a className="reports-cta-btn reports-cta-btn--primary" href="mailto:inquiry@eveia.ai">
                Request Demo
              </a>
              <a className="reports-cta-btn" href="mailto:inquiry@eveia.ai">
                Send us a message
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
