import { useEffect, useRef, useState } from 'react'
import decisionReportImg from '../assets/decision-ready-report2.png'
import instantAnswersImg from '../assets/instant-answer2.png'
import proposalDraftImg from '../assets/proposal-draft2.png'
import execSummaryImg from '../assets/executive-summary2.png'

const ROW1 = [
  {
    title: 'Decision-Ready Reports',
    from: 'From Days',
    to: 'Minutes',
    body: "Generate executive reports using your organization's trusted knowledge, reducing hours of preparation into minutes.",
    img: decisionReportImg,
    alt: 'Q2 business report on a laptop with a customer contact card',
    tone: 'blush',
    visual: 'laptop',
  },
  {
    title: 'Instant Answers',
    from: 'From Hours of Searching',
    to: 'Seconds',
    body: "Ask questions in natural language and receive source-backed answers from your organization's trusted knowledge.",
    img: instantAnswersImg,
    alt: 'Q2 business report with floating knowledge source icons',
    tone: 'lavender',
    visual: 'report',
  },
]

const ROW2 = [
  {
    title: 'Proposal Drafting',
    from: 'From Hours of Writing',
    to: 'Minutes',
    body: 'Create proposals using previous work and approved material, rather than starting from a blank page.',
    img: proposalDraftImg,
    alt: 'Document files being pulled together into a proposal',
    tone: 'lavender',
    visual: 'icons',
  },
  {
    title: 'Executive Summaries',
    from: 'From Hours of Reading',
    to: 'Minutes',
    body: 'Transform large volumes of internal material into concise summaries, each linked back to its source.',
    img: execSummaryImg,
    alt: 'Q3 2026 board report with financial performance and key highlights',
    tone: 'blush',
    visual: 'dashboard',
  },
]

function FeatureCard({ title, from, to, body, img, alt, tone, visual }) {
  return (
    <article className={`sec6-card sec6-card--${tone} slide-in-card`}>
      <div className="sec6-card-copy">
        <h3 className="sec6-card-title">{title}</h3>
        <p className="sec6-card-accent">
          {from} <span>→ {to}</span>
        </p>
        <p className="sec6-card-body">{body}</p>
      </div>
      <div className={`sec6-card-visual sec6-card-visual--${visual}`}>
        <img src={img} alt={alt} />
      </div>
    </article>
  )
}

export default function Section6() {
  const row1Ref = useRef(null)
  const row2Ref = useRef(null)
  const [row1Visible, setRow1Visible] = useState(false)
  const [row2Visible, setRow2Visible] = useState(false)

  useEffect(() => {
    const observer1 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRow1Visible(true)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    )

    const observer2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRow2Visible(true)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    )

    if (row1Ref.current) observer1.observe(row1Ref.current)
    if (row2Ref.current) observer2.observe(row2Ref.current)

    return () => {
      observer1.disconnect()
      observer2.disconnect()
    }
  }, [])

  return (
    <section className="sec6" id="section-6">
      <div className="sec6-ambient-left" aria-hidden="true" />
      <div className="sec6-ambient-right" aria-hidden="true" />

      <div className="sec6-container">
        <div className="sec6-header">
          <h2 className="sec6-heading">
            Turn Hours of Work
            <br />
            into <span className="sec6-heading__grad">Minutes.</span>
          </h2>

          <p className="sec6-desc">
            See how Eveia.AI helps your team complete work faster. For more
            detail, read about{' '}
            <a href="/reports" className="sec6-link">
              AI report generation
            </a>{' '}
            or{' '}
            <a href="#solutions" className="sec6-link">
              view all solutions
            </a>
            .
          </p>
        </div>

        <div className="sec6-grid">
          <div
            ref={row1Ref}
            className={`sec6-row sec6-row--wide-left ${row1Visible ? 'is-inview' : ''}`}
          >
            {ROW1.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>

          <div
            ref={row2Ref}
            className={`sec6-row sec6-row--wide-right ${row2Visible ? 'is-inview' : ''}`}
          >
            {ROW2.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
