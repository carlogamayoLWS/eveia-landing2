import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import heroVisual from '../assets/proposal-hero.png'
import docLeft from '../assets/proposal-doc-left.png'
import docCenterLeft from '../assets/proposal-doc-center-left.png'
import docCenterRight from '../assets/proposal-doc-center-right.png'
import docRight from '../assets/proposal-doc-right.png'
import overlapVisual from '../assets/proposal-laptop.png'
import whoLaptop from '../assets/proposal-who-laptop.png'
import fileSprite from '../assets/proposal-file-sprite.png'
import byNeedImg from '../assets/proposal-byneed.png'
import dotBlue from '../assets/proposal-dot-blue.svg'
import dotPink from '../assets/proposal-dot-pink.svg'
import dotOrange from '../assets/proposal-dot-green.svg'
import dotGreen from '../assets/proposal-dot-who-1.svg'
import dotMagenta from '../assets/proposal-dot-who-2.svg'
import dotRed from '../assets/proposal-dot-who-3.svg'
import stepLine from '../assets/proposal-step-line.svg'
import footerLogo from '../assets/footer-logo.png'
import Footer from '../components/Footer.jsx'

const HOW_STEPS = [
  {
    title: 'Connect approved documents',
    body: 'Previous proposals, service descriptions, case studies, and compliance records.',
    dot: dotBlue,
  },
  {
    title: 'Describe the proposal',
    body: 'Provide the client, scope, and sections you need.',
    dot: dotPink,
  },
  {
    title: 'Generate a draft',
    body: 'Eveia.AI creates a proposal using your connected information and shows the sources behind it.',
    dot: dotOrange,
  },
]

const ACCURATE_POINTS = [
  'Uses approved organizational information',
  'Links content back to its source',
  'Respects user access permissions',
  'Helps avoid starting from a blank page',
  'Keeps people responsible for reviewing pricing, terms, and final content',
]

const WHO_PILLS = [
  { title: 'Sales and business development teams', dot: dotGreen },
  { title: 'Bid and proposal teams', dot: dotMagenta },
  { title: 'Consulting and professional services', dot: dotRed },
  { title: 'Grant and funding teams', dot: dotRed },
]

const WHO_FILES = [
  { label: 'PDF', pos: '0% 0%' },
  { label: 'Word', pos: '25% 0%' },
  { label: 'Excel', pos: '50% 0%' },
]

const BY_NEED = [
  {
    title: 'Decision-Ready Reports',
    body: 'Preparing a report often takes more time than writing it.',
    href: '/reports',
  },
  {
    title: 'Instant Answers from Data',
    body: 'Your organization already has the information people need.',
    href: '/search',
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

export default function ProposalPage() {
  const [stepsRef, stepsVisible] = useInView(0.15)
  const [stackRef, stackVisible] = useInView(0, '0px 0px 0px 0px')
  const [whoRef, whoVisible] = useInView(0.12)

  return (
    <main className="reports-page search-page proposal-page">
      <div className="reports-hero-wrap">
        <header className="reports-hero">
          <div className="reports-hero-inner">
            <div className="reports-hero-copy">
              <p className="reports-eyebrow">Proposal Drafting</p>
              <h1 className="reports-hero-title">
                Create Proposal <span className="reports-hero-grad">Faster</span>
              </h1>
              <p className="reports-hero-desc">
                Proposal writing often starts with gathering pricing, service
                information, company credentials, and other supporting
                documents.
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
                Eveia.AI helps teams create proposal drafts using approved
                company information.
              </p>
            </div>
            <div className="proposal-hero-visual">
              <span className="proposal-hero-paper proposal-hero-paper--back" />
              <span className="proposal-hero-paper proposal-hero-paper--mid" />
              <img
                src={heroVisual}
                alt="Sales improvement proposal generated by Eveia.AI"
              />
            </div>
          </div>
        </header>
      </div>

      <section className="reports-sources">
        <div className="reports-sources-glow reports-sources-glow--purple" aria-hidden="true" />
        <div className="reports-sources-glow reports-sources-glow--pink" aria-hidden="true" />
        <div className="reports-sources-inner">
          <h2 className="reports-sources-title">How it works</h2>
          <p className="reports-sources-desc">
            It finds relevant content across connected documents and uses it to
            build a structured draft, with sources linked to each section.
            <br />
            <br />
            Spend less time searching and more time reviewing the proposal.
          </p>
          <div
            ref={stepsRef}
            className={`proposal-steps ${stepsVisible ? 'is-visible' : ''}`}
          >
            {HOW_STEPS.map((step, index) => (
              <div className="proposal-step-wrap" key={step.title}>
                {index > 0 && (
                  <img
                    className="proposal-step-line"
                    src={stepLine}
                    alt=""
                    aria-hidden="true"
                  />
                )}
                <article className="proposal-step">
                  <span className="proposal-step-dot">
                    <img src={step.dot} alt="" />
                  </span>
                  <div className="proposal-step-copy">
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
          <div className={`proposal-bridge ${stepsVisible ? 'is-visible' : ''}`} aria-hidden="true">
            <div className="proposal-docs">
              <img className="proposal-docs-card proposal-docs-card--side" src={docLeft} alt="" />
              <img className="proposal-docs-card proposal-docs-card--center" src={docCenterLeft} alt="" />
              <img className="proposal-docs-card proposal-docs-card--center" src={docCenterRight} alt="" />
              <img className="proposal-docs-card proposal-docs-card--side" src={docRight} alt="" />
            </div>
            <div className="proposal-overlap">
              <img src={overlapVisual} alt="" />
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
                Built for Accurate <span>Proposals</span>
              </h2>
              <p className="reports-how-lead">
                Eveia.AI drafts the proposal. Your team reviews and approves it
                before submission.
              </p>
              <ul className="reports-how-list">
                {ACCURATE_POINTS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section
            ref={whoRef}
            className={`search-uses proposal-who ${whoVisible ? 'is-visible' : ''}`}
          >
            <div className="search-uses-glow" aria-hidden="true" />
            <div className="proposal-who-inner">
              <div className="proposal-who-copy">
                <h2 className="search-uses-heading">Who Can Use It?</h2>
                <p className="search-uses-desc">
                  Explore how organizations turn everyday documents and internal
                  knowledge into faster, more useful answers.
                </p>
                <div className="proposal-pills">
                  {WHO_PILLS.map((item) => (
                    <article className="search-pill" key={item.title}>
                      <span className="search-pill-dot">
                        <img src={item.dot} alt="" />
                      </span>
                      <p>{item.title}</p>
                    </article>
                  ))}
                </div>
              </div>
              <div className="proposal-who-visual">
                <img
                  className="proposal-who-laptop"
                  src={whoLaptop}
                  alt="Company files pulled into a proposal draft"
                />
                <div className="proposal-who-files" aria-hidden="true">
                  {WHO_FILES.map((file) => (
                    <span className="proposal-who-file" key={file.label}>
                      <span
                        className="proposal-who-file-icon"
                        style={{
                          backgroundImage: `url(${fileSprite})`,
                          backgroundPosition: file.pos,
                        }}
                      />
                    </span>
                  ))}
                </div>
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
            <h2 className="reports-cta-heading">Try It With a Real Proposal</h2>
            <p className="reports-cta-desc">
              See Eveia.AI With Your Proposal Process
              <br />
              If your team regularly prepares proposals, we’d be happy to show
              you how Eveia.AI can help reduce the time spent finding and
              bringing together the information you need.
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
