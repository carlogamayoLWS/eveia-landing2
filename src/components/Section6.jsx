import { useEffect, useRef, useState } from 'react'
import decisionReportImg from '../assets/decision-ready-report.png'
import instantAnswersImg from '../assets/istant-answers.png'
import proposalDraftImg from '../assets/proposal-draft.png'
import execSummaryImg from '../assets/executive-summary.png'

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
            <a href="#secure-ai" className="sec6-link">
              secure AI for company documents
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
            <div className="sec6-card slide-in-card">
              <img
                src={decisionReportImg}
                alt="Decision-Ready Reports"
                className="sec6-card-img"
              />
            </div>

            <div className="sec6-card slide-in-card">
              <img
                src={instantAnswersImg}
                alt="Instant Answers"
                className="sec6-card-img"
              />
            </div>
          </div>

          <div
            ref={row2Ref}
            className={`sec6-row sec6-row--wide-right ${row2Visible ? 'is-inview' : ''}`}
          >
            <div className="sec6-card slide-in-card">
              <img
                src={proposalDraftImg}
                alt="Proposal Drafting"
                className="sec6-card-img"
              />
            </div>

            <div className="sec6-card slide-in-card">
              <img
                src={execSummaryImg}
                alt="Executive Summaries"
                className="sec6-card-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
