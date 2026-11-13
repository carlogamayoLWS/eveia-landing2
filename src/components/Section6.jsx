import { useEffect, useRef, useState } from 'react'
import { useIsMobile } from '../hooks/useIsMobile.js'
import decisionReportImg from '../assets/decision-ready-report3.webp'
import instantAnswersImg from '../assets/instant-answer2.webp'
import proposalDraftImg from '../assets/proposal-draft2.webp'
import execSummaryImg from '../assets/executive-summary.webp'

const ROW1 = [
  {
    title: 'Decision-Ready Reports',
    from: 'From Days',
    to: 'Minutes',
    body: "Generate executive reports using your organization's trusted knowledge, reducing hours of preparation into minutes.",
    img: decisionReportImg,
    alt: 'Q2 business report overlay on an Eveia.AI laptop workspace',
    tone: 'blush',
    visual: 'laptop',
  },
  {
    title: 'Instant Answers',
    from: 'From Hours of Searching',
    to: 'Seconds',
    body: "Ask questions in natural language and receive source-backed answers from your organization's trusted knowledge.",
    img: instantAnswersImg,
    alt: 'Chat asking for a Q2 board summary with a source-backed answer',
    tone: 'lavender',
    visual: 'chat',
  },
]

const ROW2 = [
  {
    title: 'Proposal Drafting',
    from: 'From Hours of Writing',
    to: 'Minutes',
    body: 'Create proposals using previous work and approved material, rather than starting from a blank page.',
    img: proposalDraftImg,
    alt: 'Operations improvement proposal generated in Eveia.AI',
    tone: 'lavender',
    visual: 'document',
  },
  {
    title: 'Executive Summaries',
    from: 'From Hours of Reading',
    to: 'Minutes',
    body: 'Transform large volumes of internal material into concise summaries, each linked back to its source.',
    img: execSummaryImg,
    alt: 'Q2 sales performance question connected to a source database',
    tone: 'blush',
    visual: 'summary',
  },
]

function FeatureCard({ title, from, to, body, img, alt, tone, visual }) {
  return (
    <article className={`sec6-card sec6-card--${tone} slide-in-card`}>
      <div className="sec6-card-copy">
        <h3 className="sec6-card-title">{title}</h3>
        <p className="sec6-card-accent">
          <span className="sec6-card-from">{from}</span>
          <span className="sec6-card-arrow"> → </span>
          <span className="sec6-card-to">{to}</span>
        </p>
        <p className="sec6-card-body">{body}</p>
      </div>
      <div className={`sec6-card-visual sec6-card-visual--${visual}`}>
        <img src={img} alt={alt} />
      </div>
    </article>
  )
}

const CARD_COUNT = ROW1.length + ROW2.length

// Phone-only carousel dots for the snap row of use-case cards.
function useSnapIndex(gridRef, enabled) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const grid = gridRef.current
    if (!enabled || !grid) return undefined
    const onScroll = () => {
      const card = grid.querySelector('.sec6-card')
      const step = card ? card.getBoundingClientRect().width + 14 : grid.clientWidth
      setIndex(Math.min(CARD_COUNT - 1, Math.round(grid.scrollLeft / step)))
    }
    grid.addEventListener('scroll', onScroll, { passive: true })
    return () => grid.removeEventListener('scroll', onScroll)
  }, [gridRef, enabled])
  return index
}

export default function Section6() {
  const isMobile = useIsMobile()
  const gridRef = useRef(null)
  const snapIndex = useSnapIndex(gridRef, isMobile)
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
    <section className="sec6" id="how-it-works">
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
            See how Eveia.AI helps your team complete work faster.
          </p>
        </div>

        <div className="sec6-grid" ref={gridRef}>
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

        {isMobile && (
          <div className="m-dots" aria-hidden="true">
            {Array.from({ length: CARD_COUNT }, (_, i) => (
              <i key={i} className={i === snapIndex ? 'is-on' : ''} />
            ))}
          </div>
        )}

        <p className="sec6-footnote">
          For more detail, read about
          <br />
          <a href="/security" className="sec6-link">
            secure AI for company documents
          </a>{' '}
          or{' '}
          <a href="/enterprise" className="sec6-link">
            view all solutions
          </a>
          .
        </p>
      </div>
    </section>
  )
}
