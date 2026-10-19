import { useEffect, useRef, useState } from 'react'
import iconPdf from '../assets/icon-pdf.webp'
import iconWord from '../assets/icon-word.webp'
import iconExcel from '../assets/icon-excel.webp'
import iconPpt from '../assets/icon-ppt.webp'
import iconSlides from '../assets/icon-slides.webp'
import iconSheets from '../assets/icon-sheets.webp'
import iconCsv from '../assets/icon-csv.webp'
import iconDocs from '../assets/icon-docs.webp'
import usesVisual from '../assets/reports-uses-ipad.webp'
import byNeedAnswers from '../assets/reports-byneed-answers.webp'
import byNeedProposal from '../assets/reports-byneed-proposal.webp'
import byNeedSummaries from '../assets/reports-byneed-summaries.webp'
import footerLogo from '../assets/footer-logo.webp'
import iconFolder from '../assets/reports-icon-folder.svg'
import iconBars from '../assets/reports-icon-bars.svg'
import iconFolderOpen from '../assets/reports-icon-folder-open.svg'
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
    image: byNeedAnswers,
  },
  {
    title: 'Create Proposal Faster',
    body: 'Proposal writing often starts with gathering pricing, service information, company.',
    href: '/proposals',
    image: byNeedProposal,
  },
  {
    title: 'Executive Summaries',
    body: 'Important information is often buried in long reports, meeting records, audits...',
    href: '/summaries',
    image: byNeedSummaries,
  },
]

const AMPLIFY = [
  {
    tone: 'blue',
    title: 'It drafts, people decide.',
    body: 'Eveia.AI prepares reports and summaries, while people review, refine, and approve the final output.',
  },
  {
    tone: 'pink',
    title: 'It brings information together.',
    body: 'Eveia.AI helps teams make sense of approved data and documents, giving people a clearer starting point for analysis and decision-making.',
  },
  {
    tone: 'orange',
    title: 'It keeps people connected to the source.',
    body: 'Source references help users verify important information and apply their own judgment.',
  },
  {
    tone: 'green',
    title: 'It supports human expertise.',
    body: 'Eveia.AI handles the work of organizing and synthesizing information so your team can focus on analysis, decisions, and action.',
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
      <div className="reports-file-tile-face">
        <img src={src} alt={alt} />
      </div>
    </div>
  )
}

const Q2_MOUNTAIN =
  'M78 92 L102 86 L124 90 L148 74 L162 82 L186 64 L204 76 L228 48 L246 58 L268 32 L286 42 L310 8'
const Q2_MOUNTAIN_FILL = `${Q2_MOUNTAIN} L310 115 L78 115 Z`
const Q2_PINK =
  'M6 96 L28 80 L46 88 L78 48 L108 84 L128 62 L152 80 L176 44 L206 74 L236 54 L262 82 L292 48 L310 58'

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
            <span>+12.6%</span>
            <span className="reports-q2-delta-prev">+12.0%</span>
          </p>
        </div>
        <div>
          <p className="reports-q2-label">Growth</p>
          <p className="reports-q2-value">24.8%</p>
          <p className="reports-q2-delta">
            <span>+3.7%</span>
            <span className="reports-q2-delta-prev">+1.7%</span>
          </p>
        </div>
        <div>
          <p className="reports-q2-label">Customers</p>
          <p className="reports-q2-value">1,842</p>
          <p className="reports-q2-delta">
            <span>+18.3%</span>
            <span className="reports-q2-delta-prev">+8.2%</span>
          </p>
        </div>
      </div>
      <svg className="reports-q2-spark" viewBox="0 0 310 115" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="q2SparkFill" gradientUnits="objectBoundingBox" x1="0.2" y1="0" x2="0.85" y2="1">
            <stop offset="19.25%" stopColor="#E5DBFF" />
            <stop offset="82.54%" stopColor="#491ACF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="reports-q2-spark-fill" d={Q2_MOUNTAIN_FILL} fill="url(#q2SparkFill)" />
        <path
          className="reports-q2-spark-line reports-q2-spark-line--magenta"
          d={Q2_MOUNTAIN}
          fill="none"
          stroke="#B216BD"
          strokeWidth="1.84"
          strokeLinejoin="round"
          strokeLinecap="round"
          pathLength="1"
        />
        <path
          className="reports-q2-spark-line reports-q2-spark-line--pink"
          d={Q2_PINK}
          fill="none"
          stroke="#FF7EB0"
          strokeWidth="1.84"
          strokeLinejoin="round"
          strokeLinecap="round"
          pathLength="1"
        />
      </svg>
      <div className="reports-q2-donut" aria-hidden="true">
        <div className="reports-q2-donut-ring" />
        <div className="reports-q2-donut-hole" />
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
    <main className="reports-page reports-page--blush">
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
              <a className="btn btn-secondary" href="/contact#send-message">
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
                <span className="reports-mini-icon reports-mini-icon--folder">
                  <img src={iconFolder} alt="" width="52" height="52" />
                </span>
                <div>
                  <p className="reports-mini-title">Sales Deck</p>
                  <p className="reports-mini-meta">PDF . 8.4 MB</p>
                  <p className="reports-mini-meta">Updated 2 days ago</p>
                </div>
              </div>
              <div className="reports-mini-tile reports-mini-tile--chart" aria-hidden="true">
                <img src={iconBars} alt="" width="56" height="56" />
              </div>
              <div className="reports-mini-tile reports-mini-tile--folder" aria-hidden="true">
                <img src={iconFolderOpen} alt="" width="47" height="42" />
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
            Built to Amplify Human Expertise
          </h2>
          <p className="reports-amplify-desc">
            Eveia.AI works alongside your team to turn approved information into
            clear, useful outputs, helping people spend less time processing
            information and more time applying their expertise.
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
                <div className="reports-byneed-media">
                  <img src={item.image} alt="" />
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
              See how Eveia.AI can help prepare a report your team regularly
              works on, using approved organizational information.
            </p>
            <div className="reports-cta-actions">
              <a className="reports-cta-btn reports-cta-btn--primary" href="mailto:inquiry@eveia.ai">
                Request Demo
              </a>
              <a className="reports-cta-btn" href="/contact#send-message">
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
