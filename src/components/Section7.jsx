import { useEffect, useRef, useState } from 'react'
import GradientLine from './GradientLine.jsx'

const BADGES = [
  'Private AI Environment',
  'Role-based Access',
  'Source-supported Answers',
  'Enterprise-ready Security',
]

export default function Section7() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -40px 0px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`sec7 ${isVisible ? 'is-visible' : ''}`}
      id="section-7"
    >
      {/* Top Gradient Line drawn left to right */}
      <GradientLine />

      {/* Top Ambient Glow */}
      <div className="sec7-ambient-left" aria-hidden="true" />
      <div className="sec7-ambient-right" aria-hidden="true" />

      <div className="sec7-container">
        <div className="sec7-header">
          <h2 className="sec7-heading">
            Turn Hours of Work into
            <br />
            <span className="sec7-heading__grad">Minutes.</span>
          </h2>

          <p className="sec7-desc">
            Eveia.AI is designed for organizations that manage important
            knowledge, sensitive information and critical workflows. Access
            follows role, answers are drawn only from the documents you approve,
            and every answer links back to its source.
          </p>

          <a href="#handle-data" className="sec7-link">
            Read how we handle data →
          </a>
        </div>

        {/* 4 Feature / Security Pills */}
        <div className="sec7-pills">
          {BADGES.map((badge, idx) => (
            <div key={idx} className="sec7-pill">
              <span className="sec7-pill-dot" />
              <span className="sec7-pill-text">{badge}</span>
            </div>
          ))}
        </div>

        {/* Ideal for section */}
        <div className="sec7-ideal">
          <p className="sec7-ideal-label">Ideal for:</p>
          <p className="sec7-ideal-list">
            Enterprise, Government, Healthcare, Manufacturing, Education, Legal,
            Financial Services and Corporate Organizations.
          </p>
        </div>
      </div>
    </section>
  )
}
