import { useEffect, useRef, useState } from 'react'
import handshakeImg from '../assets/sec8-handshake.png'
import footerLogo from '../assets/footer-logo.png'

export default function Section8() {
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
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`sec8 ${isVisible ? 'is-visible' : ''}`}
      id="pricing"
    >
      <div className="sec8-ambient-left" aria-hidden="true" />
      <div className="sec8-ambient-right" aria-hidden="true" />

      <div className="sec8-container">
        <div className="sec8-split">
          <div className="sec8-left">
            <h2 className="sec8-heading">
              Pricing available
              <br />
              upon request
            </h2>

            <p className="sec8-desc">
              Contact us to learn more about plans built for your organization’s
              scale, security requirements and data governance needs.
            </p>

            <div className="sec8-actions">
              <a href="mailto:inquiry@eveia.ai" className="btn btn-primary sec8-btn-primary">
                Request Pricing
              </a>
              <a href="/contact#send-message" className="btn btn-secondary sec8-btn-secondary">
                Send us a message
              </a>
            </div>
          </div>

          <div className="sec8-right">
            <img
              src={handshakeImg}
              alt="Handshake over business reports"
              className="sec8-handshake"
            />
          </div>
        </div>

        <div className="sec8-banner">
          <div className="sec8-banner-bg" aria-hidden="true">
            <img
              src={footerLogo}
              alt=""
              className="sec8-banner-spiral"
            />
          </div>

          <div className="sec8-banner-content">
            <p className="sec8-banner-kicker">Start today</p>
            <h3 className="sec8-banner-heading">
              See how Eveia.AI helps your team complete
              <span className="sec8-banner-accent">work faster.</span>
            </h3>
            <p className="sec8-banner-desc">
              Contact us to learn more about plans built for your organization’s
              scale, security requirements and data governance needs.
            </p>
            <a href="/contact#send-message" className="sec8-banner-btn">
              Send us a message
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
