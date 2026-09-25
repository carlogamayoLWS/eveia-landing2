import { useEffect, useRef, useState } from 'react'
import heroVisual from '../assets/search-hero-visual.png'
import chatVisual from '../assets/search-chat.png'
import usecaseLeft from '../assets/search-usecase-left.png'
import usecaseCenter from '../assets/search-usecase-center.png'
import usecaseRight from '../assets/search-usecase-right.png'
import byNeedImg from '../assets/search-byneed.jpg'
import footerLogo from '../assets/footer-logo.png'
import Footer from '../components/Footer.jsx'

const SECURE_POINTS = [
  'Answers based on approved organizational knowledge',
  'Source links for easy verification',
  'Role-based access',
  'Cloud or on-premise deployment',
  'Privacy-focused handling of company information',
]

const USE_PILLS = [
  { title: 'HR policies and procedures', tone: 'blue' },
  { title: 'Operations and process documents', tone: 'pink' },
  { title: 'Compliance Documents', tone: 'orange' },
  { title: 'Technical Manuals', tone: 'green' },
  { title: 'Contracts and legal information', tone: 'magenta' },
  { title: 'Internal reports and records', tone: 'red' },
]

const BY_NEED = [
  {
    title: 'Decision-Ready Reports',
    body: 'Preparing a report often takes more time than writing it.',
    href: '/reports',
  },
  {
    title: 'Create Proposal Faster',
    body: 'Proposal writing often starts with gathering pricing, service information, company.',
    href: '/proposals',
  },
  {
    title: 'Executive Summaries',
    body: 'Important information is often buried in long reports, meeting records, audits...',
    href: '/summaries',
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

export default function SearchPage() {
  const [stackRef, stackVisible] = useInView(0, '0px 0px 0px 0px')
  const [chatRef, chatVisible] = useInView(0.2)
  const [usesRef, usesVisible] = useInView(0.12)

  return (
    <main className="reports-page search-page">
      <div className="reports-hero-wrap">
        <header className="reports-hero">
          <div className="reports-hero-inner">
            <div className="reports-hero-copy">
              <p className="reports-eyebrow">Instant Answers from Data</p>
              <h1 className="reports-hero-title">
                Enterprise <span className="reports-hero-grad">AI Search</span>
              </h1>
              <p className="reports-hero-desc">
                Your organization already has the information people need. The
                problem is finding it quickly. Each answer includes its source,
                so users can verify the information before using it.
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
                Eveia.AI lets employees ask questions in plain language and find
                answers across approved company documents.
              </p>
            </div>
            <div className="search-hero-visual">
              <img src={heroVisual} alt="Enterprise AI Search across company files" />
            </div>
          </div>
        </header>
      </div>

      <section className="reports-sources">
        <div className="reports-sources-glow reports-sources-glow--purple" aria-hidden="true" />
        <div className="reports-sources-glow reports-sources-glow--pink" aria-hidden="true" />
        <div className="reports-sources-inner">
          <h2 className="reports-sources-title">Find Answers, Not Just Files</h2>
          <p className="reports-sources-desc">
            Instead of searching through folders and opening multiple documents,
            employees can ask a question and get a relevant answer from your
            organization’s knowledge. Eveia.AI works with the documents you
            connect and respects user access permissions.
          </p>
          <div
            ref={chatRef}
            className={`search-chat-stage ${chatVisible ? 'is-visible' : ''}`}
          >
            <img
              className="search-chat-img"
              src={chatVisual}
              alt="Eveia.AI answering a leave policy question with a source PDF"
            />
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
          <section className="reports-how">
            <div className="reports-how-inner">
              <h2 className="reports-how-heading">
                Built for Secure <span>Enterprise.AI</span>
              </h2>
              <p className="reports-how-lead">
                Eveia.AI assists with finding information. People review the
                answer and make the final decision.
              </p>
              <ul className="reports-how-list">
                {SECURE_POINTS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section
            ref={usesRef}
            className={`search-uses ${usesVisible ? 'is-visible' : ''}`}
          >
            <div className="search-uses-glow" aria-hidden="true" />
            <div className="search-uses-inner">
              <h2 className="search-uses-heading">Common Use Cases</h2>
              <p className="search-uses-desc">
                Explore how organizations turn everyday documents and internal
                knowledge into faster, more useful answers.
              </p>
              <div className="search-docs" aria-hidden="true">
                <img className="search-docs-side search-docs-left" src={usecaseLeft} alt="" />
                <img className="search-docs-center" src={usecaseCenter} alt="" />
                <img className="search-docs-side search-docs-right" src={usecaseRight} alt="" />
              </div>
              <div className="search-pills">
                {USE_PILLS.map((item) => (
                  <article
                    className={`search-pill search-pill--${item.tone}`}
                    key={item.title}
                  >
                    <span className="search-pill-dot" />
                    <p>{item.title}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="reports-amplify">
            <div className="reports-byneed">
              <p className="reports-byneed-label">BY NEED</p>
              <div className="reports-byneed-grid">
                {BY_NEED.map((item) => (
                  <article className="reports-byneed-card" key={item.title}>
                    <img src={byNeedImg} alt="" />
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
              Ready to Find Information Faster?
            </h2>
            <p className="reports-cta-desc">
              See how Eveia.AI can help your team find the information they
              need, faster.
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
