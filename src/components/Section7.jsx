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

      <div className="sec7-container">
        <div className="sec7-header">
          <h2 className="sec7-heading">
            <span className="sec7-heading__line">
              <span className="sec7-heading__accent">Built</span> for Organizations That Value
            </span>
            <span className="sec7-heading__line">Privacy and Security.</span>
          </h2>

          <p className="sec7-desc">
            <span>Eveia.AI is designed for organizations that manage important knowledge, sensitive</span>
            <span>information, and critical workflows. Your data remains private, secure, and accessible</span>
            <span>only to authorized users.</span>
            <a href="/data-privacy" className="sec7-link">
              Read how we handle data →
            </a>
          </p>
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
            <span>Enterprise, Government, Healthcare, Manufacturing, Education,</span>
            <span>Legal, Financial Services and Corporate Organizations.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
