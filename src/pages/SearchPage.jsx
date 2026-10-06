import { useEffect, useRef, useState } from 'react'
import searchIconExcel from '../assets/search-icon-excel.png'
import searchIconPpt from '../assets/search-icon-ppt.png'
import searchIconWord from '../assets/search-icon-word.png'
import searchIconCsv from '../assets/search-icon-csv.png'
import searchIconPdf from '../assets/search-icon-pdf.png'
import searchHeroGlass from '../assets/search-hero-glass.png'
import searchAvatar from '../assets/search-avatar.png'
import searchAgentLogo from '../assets/search-chat-agent.png'
import searchChatPdf from '../assets/search-chat-pdf.svg'
import searchChatDownload from '../assets/search-chat-download.svg'
import searchChatEye from '../assets/search-chat-eye.svg'
import searchChatMore from '../assets/search-chat-more.svg'
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

const USER_QUESTION = 'What are the available leave types and policy details?'
const AGENT_REPLY =
  'There are 2 types of leave available. You can view the details or download the full leave policy.'

const HERO_FILES = [
  { key: 'excel', src: searchIconExcel, alt: 'Excel' },
  { key: 'ppt', src: searchIconPpt, alt: 'PowerPoint' },
  { key: 'word', src: searchIconWord, alt: 'Word' },
  { key: 'csv', src: searchIconCsv, alt: 'CSV' },
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

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function useSearchChatDemo(active) {
  const [typed, setTyped] = useState('')
  const [phase, setPhase] = useState('idle')
  const [showUser, setShowUser] = useState(false)
  const [showAgent, setShowAgent] = useState(false)
  const [showFile, setShowFile] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!active) return undefined
    if (reduced) {
      setTyped('')
      setPhase('sent')
      setShowUser(true)
      setShowAgent(true)
      setShowFile(true)
      return undefined
    }

    let cancelled = false

    const run = async () => {
      setTyped('')
      setPhase('typing')
      setShowUser(false)
      setShowAgent(false)
      setShowFile(false)

      for (let i = 1; i <= USER_QUESTION.length; i += 1) {
        if (cancelled) return
        setTyped(USER_QUESTION.slice(0, i))
        await wait(28)
      }

      if (cancelled) return
      setPhase('sending')
      await wait(420)
      if (cancelled) return
      setTyped('')
      setPhase('sent')
      setShowUser(true)
      await wait(520)
      if (cancelled) return
      setShowAgent(true)
      await wait(380)
      if (cancelled) return
      setShowFile(true)
    }

    run()
    return () => {
      cancelled = true
    }
  }, [active])

  return { typed, phase, showUser, showAgent, showFile }
}

export default function SearchPage() {
  const [stackRef, stackVisible] = useInView(0, '0px 0px 0px 0px')
  const [chatRef, chatVisible] = useInView(0.28, '0px 0px -40px 0px')
  const [usesRef, usesVisible] = useInView(0.12)
  const [heroReady, setHeroReady] = useState(false)
  const chatDemo = useSearchChatDemo(chatVisible)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setHeroReady(true)
      return undefined
    }
    const id = requestAnimationFrame(() => setHeroReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

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
                <a className="btn btn-secondary" href="/contact#send-message">
                  Send us a message
                </a>
              </div>
              <p className="reports-hero-note">
                Eveia.AI lets employees ask questions in plain language and find
                answers across approved company documents.
              </p>
            </div>
            <div
              className={`search-hero-visual ${heroReady ? 'is-ready' : ''}`}
              aria-hidden="true"
            >
              {HERO_FILES.map((file) => (
                <span className={`search-hero-file search-hero-file--${file.key}`} key={file.key}>
                  <img src={file.src} alt="" />
                </span>
              ))}
              <div className="search-hero-bar">
                <span className="search-hero-pdf">
                  <img src={searchIconPdf} alt="" />
                </span>
                <span className="search-hero-lines">
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
              </div>
              <div className="search-hero-glass">
                <img src={searchHeroGlass} alt="" />
                <span className="search-hero-glass-liquid" />
              </div>
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
            <div
              className="search-chat-panel"
              aria-label="Eveia.AI answering a leave policy question with a source PDF"
            >
              <div className={`search-chat-user ${chatDemo.showUser ? 'is-in' : ''}`}>
                <p>{USER_QUESTION}</p>
                <img src={searchAvatar} alt="" />
              </div>
              <div className={`search-chat-agent ${chatDemo.showAgent ? 'is-in' : ''}`}>
                <img className="search-chat-logo" src={searchAgentLogo} alt="" />
                <div className="search-chat-agent-col">
                  <p>{AGENT_REPLY}</p>
                  <div className={`search-chat-file ${chatDemo.showFile ? 'is-in' : ''}`}>
                    <img className="search-chat-file-pdf" src={searchChatPdf} alt="" />
                    <div>
                      <strong>HR Policies and Guideli...</strong>
                      <span>PDF</span>
                    </div>
                    <img src={searchChatDownload} alt="" />
                    <img src={searchChatEye} alt="" />
                    <span className="search-chat-file-more">
                      <img src={searchChatMore} alt="" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`reports-composer search-composer ${chatDemo.phase === 'sending' ? 'is-sending' : ''}`}
            >
              <p className="reports-composer-label">
                {chatDemo.phase === 'typing' ? (
                  <>
                    {chatDemo.typed}
                    <span className="search-composer-caret" />
                  </>
                ) : (
                  'Message Eveia....'
                )}
              </p>
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
                <button
                  type="button"
                  className={`reports-composer-send ${chatDemo.phase === 'sending' ? 'is-pressed' : ''}`}
                >
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
