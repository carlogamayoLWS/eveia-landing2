import { useEffect, useRef, useState } from 'react'
import footerLogo from '../assets/footer-logo.png'
import philippinesPhoto from '../assets/philippines-photo.png'
import securityDotCard from '../assets/security-dot-card.svg'
import Footer from '../components/Footer.jsx'

const AUDIENCE = [
  'Government agencies and local government units',
  'Hospitals and healthcare organizations',
  'Banks and financial institutions',
  'Electric cooperatives and utility providers',
  'Schools, colleges, and universities',
  'Manufacturers and large enterprises',
]

const STEPS = [
  'Discuss privacy and deployment requirements with your IT or data protection team',
  'See Eveia.AI using your own documents to evaluate how it fits your work.',
  'Start with one department or document set and evaluate the results.',
  "Expand based on your organization's needs and procurement process.",
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

export default function PhilippinesPage() {
  const [stackRef, stackVisible] = useInView(0, '0px 0px 0px 0px')

  return (
    <main className="reports-page ph-page">
      <section className="security-hero ph-hero">
        <div className="security-hero-glow security-hero-glow--right" aria-hidden="true" />
        <div className="security-hero-glow security-hero-glow--left" aria-hidden="true" />

        <div className="security-hero-inner">
          <h1 className="security-hero-title">
            Private Enterprise<span> AI in the Philippines</span>
          </h1>
          <p className="security-hero-desc">
            Eveia.AI is a private enterprise AI platform built for organizations
            that need to work with their own documents and internal knowledge.
            Built and supported in the Philippines by Lightweight Solutions,
            Eveia.AI helps teams prepare reports, summaries, drafts, and
            source-supported answers while keeping information controlled.
          </p>
          <h2 className="security-data-title">What Is Eveia.AI</h2>
          <p className="ph-hero-lead">
            Eveia.AI works with your organization's approved documents and data.
            Teams can ask questions in plain language or request reports,
            summaries, and drafts based on connected source material.
          </p>
        </div>
      </section>

      <div
        ref={stackRef}
        className={`reports-stack-wrap ${stackVisible ? 'is-visible' : ''}`}
      >
        <div className="reports-stack ph-sheet">
          <section className="ph-choose">
            <h2>Why Choose a Local Enterprise AI Provider?</h2>
            <p>
              For Philippine organizations, working with a local team can make
              deployment and support more straightforward
            </p>
            <ul>
              <li>
                <strong>Data Residency</strong> – On-premise deployment is
                available for organizations with specific infrastructure or data
                residency requirements.
              </li>
              <li>
                <strong>Data Privacy</strong> – Work with your IT or data
                protection team to address deployment and privacy requirements.
              </li>
              <li>
                <strong>Government Procurement</strong> – Support for the
                documentation and processes required by public sector
                organizations.
              </li>
              <li>
                <strong>Local Support</strong> – Work with a team in the
                Philippine timezone.
              </li>
              <li>
                <strong>Direct Implementation</strong> – Setup and onboarding can
                be handled directly with your team when needed.
              </li>
            </ul>
          </section>

          <section className="ph-audience">
            <div className="ph-audience-inner">
              <h2>Who Is Eveia.AI For?</h2>
              <p>
                Eveia.AI is built for organizations that manage significant
                amounts of internal information.
              </p>
              <div className="ph-audience-grid">
                {AUDIENCE.map((item) => (
                  <article className="ph-pill" key={item}>
                    <img src={securityDotCard} alt="" width="13" height="13" />
                    <p>{item}</p>
                  </article>
                ))}
              </div>

              <h3>Cloud or On-Premise Deployment</h3>
              <p className="ph-audience-deploy">
                Choose the deployment option that fits your organization's
                requirements.
                <br />
                <br />
                <strong>Cloud</strong> provides a faster setup without requiring
                your own infrastructure.
                <br />
                <strong>On-Premise</strong> runs within your own infrastructure
                and can support specific data residency, security, or
                infrastructure requirements.
              </p>
              <p className="ph-audience-note">
                Our team can help determine which option fits your needs.
              </p>
            </div>
          </section>

          <section className="ph-built">
            <div className="ph-built-photo">
              <img src={philippinesPhoto} alt="Built in the Philippines, available across Southeast Asia" />
            </div>
            <div className="ph-built-copy">
              <h2>Built in the Philippines, Available Across Southeast Asia</h2>
              <p>
                Eveia.AI is built and supported in the Philippines but can serve
                organizations across Southeast Asia. Local expertise shapes how we
                build and support the platform without limiting where
                organizations can use it.
              </p>
              <h3>A Practical Way to Get Started</h3>
              <p>
                Start with a focused use case instead of connecting everything at
                once.
              </p>
              <div className="ph-steps">
                {STEPS.map((step) => (
                  <article className="ph-step" key={step}>
                    <img src={securityDotCard} alt="" width="13" height="13" />
                    <p>{step}</p>
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
            <h2 className="reports-cta-heading">Talk to Our Team</h2>
            <p className="reports-cta-desc">
              Want to explore private enterprise AI with a team based in the
              Philippines? Let's discuss your documents, requirements, and
              deployment options.
            </p>
            <div className="reports-cta-actions">
              <a className="reports-cta-btn reports-cta-btn--primary" href="#request-demo">
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
