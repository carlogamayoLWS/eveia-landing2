import { useEffect, useRef, useState } from 'react'
import iconPdf from '../assets/icon-pdf.png'
import iconWord from '../assets/icon-word.png'
import iconExcel from '../assets/icon-excel.png'
import iconPpt from '../assets/icon-ppt.png'
import iconSlides from '../assets/icon-slides.png'
import iconSheets from '../assets/icon-sheets.png'
import iconCsv from '../assets/icon-csv.png'
import iconDocs from '../assets/icon-docs.png'
import usesVisual from '../assets/reports-chat-ui.png'
import footerLogo from '../assets/footer-logo.png'
import Footer from '../components/Footer.jsx'

const FILE_ROW_1 = [
  { src: iconPdf, alt: 'PDF' },
  { src: iconWord, alt: 'Microsoft Word' },
  { src: iconExcel, alt: 'Microsoft Excel' },
  { src: iconPpt, alt: 'Microsoft PowerPoint' },
  { src: iconSlides, alt: 'Google Slides' },
]

const FILE_ROW_2 = [
  { src: iconSheets, alt: 'Google Sheets' },
  { src: iconDocs, alt: 'Google Docs' },
  { src: iconCsv, alt: 'CSV' },
]

const DOC_TYPES = [
  'Department updates',
  'Financial summaries',
  'Operational reports',
  'Meeting minutes',
  'Previous reports',
  'Project and programme updates',
]

const USE_CASES = [
  {
    title: 'Management Reports',
    body: 'Prepare recurring monthly and quarterly reports from multiple sources.',
  },
  {
    title: 'Board and Committee Papers',
    body: 'Bring information from different departments into one structured document.',
  },
  {
    title: 'Compliance Reports',
    body: 'Organize information into reports that follow established formats and schedules.',
  },
  {
    title: 'Project Status Report',
    body: 'Consolidate updates from teams working with different documents and reporting formats.',
  },
  {
    title: 'Incident and After-Action Reports',
    body: 'Bring together information from logs, correspondence, notes, and other records.',
  },
]

const BY_NEED = [
  {
    title: 'Instant Answers from Data',
    body: 'Your organization already has the information people need.',
    href: '/search',
  },
  {
    title: 'Create Proposal Faster',
    body: 'Proposal writing often starts with gathering pricing, service information, company.',
    href: '/proposals',
  },
  {
    title: 'Executive Summaries',
    body: 'Important information is often buried in long reports, meeting records, audits...',
    href: '/#solutions',
  },
]

const AMPLIFY = [
  {
    tone: 'blue',
    title: 'It drafts, not signs off.',
    body: 'A person reviews the report before it is used.',
  },
  {
    tone: 'pink',
    title: 'It does not correct source data.',
    body: 'If a source contains an incorrect figure, the user can trace it back and verify it.',
  },
  {
    tone: 'orange',
    title: 'It works from your approved information.',
    body: 'It does not create unsupported recommendations or outside context.',
  },
  {
    tone: 'green',
    title: 'It can make mistakes.',
    body: 'Source links help users check important information before relying on it.',
  },
]

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

function FileTile({ src, alt, offset = 0, delay = 0, rise = 180 }) {
  return (
    <div
      className="reports-file-tile"
      style={{
        '--tile-offset': offset,
        '--tile-delay': `${delay}s`,
        '--tile-rise': `${rise}px`,
      }}
    >
      <img src={src} alt={alt} />
    </div>
  )
}

function Q2ReportCard() {
  return (
    <article className="reports-q2-card">
      <div className="reports-q2-menu" aria-hidden="true">•••</div>
      <h3>Q2 Business Report</h3>
      <div className="reports-q2-metrics">
        <div>
          <p className="reports-q2-label">Revenue</p>
          <p className="reports-q2-value">$8.4M</p>
          <p className="reports-q2-delta">
            <span>+12.6%</span> +12.0%
          </p>
        </div>
        <div>
          <p className="reports-q2-label">Growth</p>
          <p className="reports-q2-value">24.8%</p>
          <p className="reports-q2-delta">
            <span>+3.7%</span> +1.7%
          </p>
        </div>
        <div>
          <p className="reports-q2-label">Customers</p>
          <p className="reports-q2-value">1,842</p>
          <p className="reports-q2-delta">
            <span>+18.3%</span> +8.2%
          </p>
        </div>
      </div>
      <div className="reports-q2-charts">
        <svg className="reports-q2-spark" viewBox="0 0 320 120" preserveAspectRatio="none" aria-hidden="true">
          <path
            className="reports-q2-spark-fill"
            d="M0 96 C36 94 52 86 78 80 C112 72 124 88 156 70 C196 48 214 52 246 42 C278 32 298 18 320 10 V120 H0 Z"
            fill="#F3E8FF"
          />
          <path
            className="reports-q2-spark-line"
            d="M0 96 C36 94 52 86 78 80 C112 72 124 88 156 70 C196 48 214 52 246 42 C278 32 298 18 320 10"
            fill="none"
            stroke="#FF4D9A"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength="1"
          />
        </svg>
        <svg className="reports-q2-donut" viewBox="0 0 72 72" aria-hidden="true">
          <circle cx="36" cy="36" r="24" fill="none" stroke="#F6D7F4" strokeWidth="10" />
          <circle
            className="reports-q2-donut-pink"
            cx="36"
            cy="36"
            r="24"
            fill="none"
            stroke="#FF4D9A"
            strokeWidth="10"
            strokeLinecap="butt"
            transform="rotate(-20 36 36)"
          />
          <circle
            className="reports-q2-donut-purple"
            cx="36"
            cy="36"
            r="24"
            fill="none"
            stroke="#7C3AED"
            strokeWidth="10"
            transform="rotate(110 36 36)"
          />
        </svg>
      </div>
    </article>
  )
}

export default function ReportsPage() {
  const [sourcesRef, sourcesVisible] = useInView(0.28)
  const [stackRef, stackVisible] = useInView(0, '0px 0px 0px 0px')
  const [howRef, howVisible] = useInView()
  const [usesRef, usesVisible] = useInView()
  const [amplifyRef, amplifyVisible] = useInView(0.08, '0px 0px -8% 0px')
  const usesScrollerRef = useRef(null)
  const usesCardsRef = useRef(null)

  useEffect(() => {
    const section = usesRef.current
    const scroller = usesScrollerRef.current
    const cards = usesCardsRef.current
    if (!section || !scroller || !cards) return

    let ticking = false

    const syncCards = () => {
      ticking = false
      if (window.matchMedia('(max-width: 860px), (prefers-reduced-motion: reduce)').matches) {
        cards.style.setProperty('--uses-cards-y', '0px')
        return
      }

      const pin = section.querySelector('.reports-uses-sticky')
      if (!pin) return

      const pinH = pin.offsetHeight
      const range = section.offsetHeight - pinH
      if (range <= 0) return

      const traveled = Math.min(range, Math.max(0, -section.getBoundingClientRect().top + pin.getBoundingClientRect().top))
      const progress = traveled / range
      const maxY = Math.max(0, cards.scrollHeight - scroller.clientHeight)
      cards.style.setProperty('--uses-cards-y', `${-(progress * maxY)}px`)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(syncCards)
      }
    }

    syncCards()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [usesRef])

  return (
    <main className="reports-page">
      <div className="reports-hero-wrap">
      <header className="reports-hero">
        <div className="reports-hero-ambient" aria-hidden="true" />
        <div className="reports-hero-inner">
          <div className="reports-hero-copy">
            <p className="reports-eyebrow">Decision-Ready Reports</p>
            <h1 className="reports-hero-title">
              Turn Approved Information{' '}
              <span className="reports-hero-grad">Into Reports Faster</span>
            </h1>
            <p className="reports-hero-desc">
              Preparing a report often takes more time than writing it. Teams
              collect updates, check documents, reconcile figures, and search
              through previous reports before they can start.
            </p>
            <div className="reports-hero-ctas">
              <a className="btn btn-primary" href="#request-demo">
                Request a Private Demo
              </a>
              <a className="btn btn-secondary" href="mailto:inquiry@eveia.ai">
                Send us a message
              </a>
            </div>
            <p className="reports-hero-note">
              The thinking happens in the last hour, after days of assembly.
            </p>
          </div>

          <div className="reports-hero-visual">
            <Q2ReportCard />
            <div className="reports-hero-minis">
              <div className="reports-mini-file">
                <span className="reports-mini-icon reports-mini-icon--folder" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 7.5A2.5 2.5 0 0 1 5.5 5h3.1c.4 0 .8.2 1.1.5l1.2 1.2c.3.3.7.5 1.1.5H18.5A2.5 2.5 0 0 1 21 9.7v6.8A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z"
                      fill="#FC0061"
                    />
                  </svg>
                </span>
                <div>
                  <p className="reports-mini-title">Sales Deck</p>
                  <p className="reports-mini-meta">PDF . 8.4 MB</p>
                  <p className="reports-mini-meta">Updated 2 days ago</p>
                </div>
              </div>
              <div className="reports-mini-tile reports-mini-tile--chart" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M4 19V10" stroke="#7C4DFF" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M10 19V5" stroke="#7C4DFF" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M16 19V13" stroke="#7C4DFF" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M22 19V8" stroke="#7C4DFF" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </div>
              <div className="reports-mini-tile reports-mini-tile--folder" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 7.5A2.5 2.5 0 0 1 5.5 5h3.1c.4 0 .8.2 1.1.5l1.2 1.2c.3.3.7.5 1.1.5H18.5A2.5 2.5 0 0 1 21 9.7v6.8A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z"
                    fill="#E45CFF"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>
      </div>

      <section className="reports-sources">
        <div className="reports-sources-glow reports-sources-glow--purple" aria-hidden="true" />
        <div className="reports-sources-glow reports-sources-glow--pink" aria-hidden="true" />
        <div className="reports-sources-inner">
          <h2 className="reports-sources-title">
            Eveia.AI helps teams generate reports from approved
            organizational documents and data.
          </h2>
          <p className="reports-sources-desc">
            It finds relevant information, organizes it into the sections you
            need, and provides the sources behind the content. Spend less time
            assembling information and more time reviewing what it means.
          </p>
          <div
            ref={sourcesRef}
            className={`reports-files-stage ${sourcesVisible ? 'is-visible' : ''}`}
          >
          <div className="reports-file-grid" aria-label="Supported document types">
            <div className="reports-file-row">
              {FILE_ROW_1.map((file, i) => (
                <FileTile
                  key={file.alt}
                  {...file}
                  offset={i - Math.floor(FILE_ROW_1.length / 2)}
                  delay={0.12 + Math.abs(i - Math.floor(FILE_ROW_1.length / 2)) * 0.05}
                  rise={220}
                />
              ))}
            </div>
            <div className="reports-file-row">
              {FILE_ROW_2.map((file, i) => (
                <FileTile
                  key={file.alt}
                  {...file}
                  offset={i - Math.floor(FILE_ROW_2.length / 2)}
                  delay={0.02 + Math.abs(i - Math.floor(FILE_ROW_2.length / 2)) * 0.04}
                  rise={110}
                />
              ))}
            </div>
          </div>

          <div className="reports-composer">
            <p className="reports-composer-label">Message Eveia....</p>
            <div className="reports-composer-row">
              <span className="reports-composer-clip" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 12.5V8.2A4.2 4.2 0 0 1 16.4 8.2v8.1a3.3 3.3 0 1 1-6.6 0V9.1"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <p className="reports-composer-hint">
                Enter to send · Enter to send · Drag & drop or paste files here
              </p>
              <button type="button" className="reports-composer-auto">
                Auto
                <span>▾</span>
              </button>
              <button type="button" className="reports-composer-send">
                Send
              </button>
            </div>
          </div>
          </div>
        </div>
      </section>

      <div
        ref={stackRef}
        className={`reports-stack-wrap ${stackVisible ? 'is-visible' : ''}`}
      >
      <div className="reports-stack">
      <section
        ref={howRef}
        className={`reports-how ${howVisible ? 'is-visible' : ''}`}
      >
        <div className="reports-how-inner">
          <h2 className="reports-how-heading">
            How <span>Eveia.AI</span> Helps With AI Report Generation
          </h2>
          <p className="reports-how-lead">
            Connect the documents your team already uses, such as:
          </p>
          <ul className="reports-how-list">
            {DOC_TYPES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="reports-how-body">
            Ask for the report you need in plain language. Eveia.AI retrieves
            relevant information and creates a structured draft based on your
            approved sources.
          </p>
          <p className="reports-how-body">
            Each answer includes its source, so your team can review and verify
            the information before using it.
          </p>
        </div>
      </section>

      <section
        ref={usesRef}
        className={`reports-uses ${usesVisible ? 'is-visible' : ''}`}
      >
        <div className="reports-uses-sticky">
        <div className="reports-uses-glow" aria-hidden="true" />
        <div className="reports-uses-inner">
          <h2 className="reports-uses-heading">
            Where Organizations Use AI Report Generation
          </h2>
          <div className="reports-uses-split">
            <div className="reports-uses-scroller" ref={usesScrollerRef}>
              <div className="reports-uses-cards" ref={usesCardsRef}>
                {USE_CASES.map((item) => (
                  <article className="reports-use-card" key={item.title}>
                    <span className="reports-use-dot" />
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="reports-uses-visual">
              <img
                src={usesVisual}
                alt="Q3 board report generated inside Eveia.AI chat"
              />
            </div>
          </div>
        </div>
        </div>
      </section>

      <section
        className={`reports-amplify ${amplifyVisible ? 'is-visible' : ''}`}
      >
        <div className="reports-amplify-inner">
          <h2 className="reports-amplify-heading">
            Built for Human Review
          </h2>
          <p className="reports-amplify-desc">
            Eveia.AI helps prepare reports, but people remain responsible for
            reviewing and approving them.
          </p>
          <div ref={amplifyRef} className="reports-amplify-cards">
            {AMPLIFY.map((item) => (
              <article
                className={`reports-amplify-card reports-amplify-card--${item.tone}`}
                key={item.title}
              >
                <span className="reports-amplify-dot" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="reports-byneed">
          <p className="reports-byneed-label">BY NEED</p>
          <div className="reports-byneed-grid">
            {BY_NEED.map((item) => (
              <article className="reports-byneed-card" key={item.title}>
                <div className="reports-byneed-media" aria-hidden="true">
                  <span>Image</span>
                </div>
                <div className="reports-byneed-copy">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <a href={item.href}>Read more →</a>
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
            <h2 className="reports-cta-heading">
              Start With a Report Your Team Already Produces
            </h2>
            <p className="reports-cta-desc">
              Bring a report your team regularly prepares and the documents it
              uses. We can show you how Eveia.AI can use your approved
              organizational information to prepare a source-supported draft.
            </p>
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
