import { useEffect, useRef, useState } from 'react'
import chatFrame from '../assets/sec8-chatframe.png'
import productStrategy from '../assets/sec8-product-strategy.png'
import userChat from '../assets/sec8-userchat.png'
import latestReport from '../assets/sec8-latest-report.png'
import chatBox from '../assets/sec8-chatbox.png'
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
      {/* Soft Ambient Background Glows */}
      <div className="sec8-ambient-left" aria-hidden="true" />
      <div className="sec8-ambient-right" aria-hidden="true" />

      <div className="sec8-container">
        {/* Top Split Area: Left Copy & CTAs, Right Animated Chat Mockup */}
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
              <button className="btn btn-primary sec8-btn-primary">
                Request Pricing
              </button>
              <button className="btn btn-secondary sec8-btn-secondary">
                Request Private Demo
              </button>
            </div>
          </div>

          <div className="sec8-right">
            <div className="sec8-mockup-wrapper">
              {/* Base Chat Frame (Static) */}
              <div className="sec8-chatframe-wrap">
                <img
                  src={chatFrame}
                  alt="Eveia Chat Interface Frame"
                  className="sec8-base-frame"
                />

                {/* User Chat Message (Fade In Animation) */}
                <div className="sec8-userchat-anim">
                  <img
                    src={userChat}
                    alt="User prompt message"
                    className="sec8-userchat-img"
                  />
                </div>

                {/* AI Latest Report Card (Slide Down-to-Up Animation) */}
                <div className="sec8-report-anim">
                  <img
                    src={latestReport}
                    alt="Latest generated report summary"
                    className="sec8-report-img"
                  />
                </div>

                {/* Chatbox sits above the report so overlap tucks behind it */}
                <div className="sec8-chatbox" aria-hidden="true">
                  <img
                    src={chatBox}
                    alt=""
                    className="sec8-chatbox-img"
                  />
                </div>
              </div>

              {/* Product Strategy Document Floating Card (Static) */}
              <div className="sec8-strategy-card">
                <img
                  src={productStrategy}
                  alt="Product Strategy document card"
                  className="sec8-strategy-img"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner Card (Dark Gradient Banner) */}
        <div className="sec8-banner">
          <div className="sec8-banner-bg" aria-hidden="true">
            <img
              src={footerLogo}
              alt=""
              className="sec8-banner-spiral"
            />
          </div>

          <div className="sec8-banner-content">
            <h3 className="sec8-banner-heading">
              Pricing available upon request
            </h3>
            <p className="sec8-banner-desc">
              Contact us to learn more about plans built for your organization’s
              scale, security requirements and data governance needs.
            </p>
            <button className="sec8-banner-btn">
              Send us a message
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
