import { useEffect, useRef, useState } from 'react'
import sec4Img from '../assets/section4-img.png'
import salesDeckMini from '../assets/sec4-salesdeckmini.png'
import pricingMini from '../assets/sec4-pricingmini.png'
import csMini from '../assets/sec4-csmini.png'

const BULLETS = [
  'Information is spread across teams and systems.',
  'Work takes longer to prepare.',
  'Leaders wait for updates.',
  'Teams wait for approvals.',
  'Important decisions are delayed.',
]

export default function Section4() {
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
      { threshold: 0.25, rootMargin: '0px 0px -50px 0px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`sec4 ${isVisible ? 'is-visible' : ''}`}
      id="section-4"
    >
      <div className="sec4-container">
        {/* Left Column: Heading, Bullets, and Callout */}
        <div className="sec4-left">
          <div className="sec4-fade-block">
            <h2 className="sec4-heading">
              What Slows Down
              <span className="sec4-heading__grad">Organizations?</span>
            </h2>

            <ul className="sec4-bullets">
              {BULLETS.map((bullet, idx) => (
                <li key={idx} className="sec4-bullet-item" style={{ '--bullet-idx': idx }}>
                  <span className="sec4-bullet-dot" />
                  <span className="sec4-bullet-text">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="sec4-callout-block">
            <p className="sec4-callout">
              It’s not a lack of effort.
              <br />
              It’s the time it takes to get work done.
            </p>
          </div>
        </div>

        {/* Right Column: Hero Image + 3 Pop-up Mini Cards */}
        <div className="sec4-right">
          <div className="sec4-media-wrap">
            <div className="sec4-image-card">
              <img
                src={sec4Img}
                alt="Working late in office"
                className="sec4-main-img"
              />
            </div>

            <div className="sec4-mini-cards">
              <div className="sec4-mini-card mini-card-1">
                <img src={salesDeckMini} alt="Sales Deck badge" />
              </div>
              <div className="sec4-mini-card mini-card-2">
                <img src={pricingMini} alt="Pricing Guide badge" />
              </div>
              <div className="sec4-mini-card mini-card-3">
                <img src={csMini} alt="Case Study badge" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
