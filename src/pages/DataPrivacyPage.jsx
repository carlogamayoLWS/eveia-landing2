import { useEffect, useRef, useState } from 'react'
import footerLogo from '../assets/footer-logo.png'
import securityDotCard from '../assets/security-dot-card.svg'
import Footer from '../components/Footer.jsx'

const QUESTIONS = [
  'Is our data used to train AI models?',
  'Where is our data processed and stored?',
  'How long is information retained?',
  'Who can access our content?',
  'Can access be limited based on user roles?',
  'Can answers be traced back to their sources?',
]

const APPROACH = [
  {
    title: 'Approved documents',
    body: 'Connect only the information your organization chooses to use.',
  },
  {
    title: 'Role-based access',
    body: 'Give users access based on their responsibilities.',
  },
  {
    title: 'Source-supported answers',
    body: 'Let employees review the documents behind an answer.',
  },
  {
    title: 'Private environment',
    body: 'Keep organizational information separate and controlled.',
  },
  {
    title: 'Flexible deployment',
    body: 'Choose cloud or on-premise deployment based on your requirements.',
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

export default function DataPrivacyPage() {
  const [stackRef, stackVisible] = useInView(0, '0px 0px 0px 0px')

  return (
    <main className="reports-page privacy-page">
      <section className="security-hero privacy-hero">
        <div className="security-hero-glow security-hero-glow--right" aria-hidden="true" />
        <div className="security-hero-glow security-hero-glow--left" aria-hidden="true" />

        <div className="security-hero-inner">
          <h1 className="security-hero-title">
            Data Privacy and <span>AI at Work</span>
          </h1>
          <p className="security-hero-desc">
            Employees are already using AI for reports, documents, research, and
            everyday tasks. The important question is not only whether employees
            use AI, but what happens to company information when they do.
            <br />
            <br />
            Organizations need practical ways to use AI while keeping sensitive
            information protected and access controlled.
          </p>
          <h2 className="security-data-title">Why Blocking AI Is Not Always Enough</h2>
          <p className="ph-hero-lead">
            Blocking public AI tools on company devices may reduce access, but it
            does not necessarily stop employees from using AI elsewhere.
            <br />
            <br />
            A better approach is to provide an approved AI option with clear
            boundaries around what information can be used, who can access it,
            and how it is handled.
          </p>
        </div>
      </section>

      <div
        ref={stackRef}
        className={`reports-stack-wrap ${stackVisible ? 'is-visible' : ''}`}
      >
        <div className="reports-stack privacy-sheet">
          <section className="privacy-ask">
            <h2>What Happens to Your Data When You Use AI?</h2>
            <p>
              The answer depends on the AI provider, service, and settings.
              Before using an AI tool with company information, ask:
            </p>
            <ul>
              {QUESTIONS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              These questions help organizations determine which information is
              appropriate to use and what controls are needed.
            </p>
          </section>

          <section className="privacy-approach">
            <div className="privacy-approach-inner">
              <h2>What a Private Enterprise AI Approach Looks Like</h2>
              <p>
                A practical enterprise AI setup should give teams useful AI tools
                without giving unrestricted access to company information.
              </p>
              <div className="security-data-grid privacy-approach-grid">
                <div className="security-data-row">
                  {APPROACH.slice(0, 3).map((card) => (
                    <article className="security-data-card" key={card.title}>
                      <img src={securityDotCard} alt="" width="13" height="13" />
                      <div>
                        <h3>{card.title}</h3>
                        <p>{card.body}</p>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="security-data-row security-data-row--center">
                  {APPROACH.slice(3).map((card) => (
                    <article className="security-data-card" key={card.title}>
                      <img src={securityDotCard} alt="" width="13" height="13" />
                      <div>
                        <h3>{card.title}</h3>
                        <p>{card.body}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="privacy-compliance">
            <h2>
              Data <span className="privacy-compliance-pink">Privacy</span> and{' '}
              <span className="privacy-compliance-indigo">Compliance</span>
            </h2>
            <p>
              The Data Privacy Act applies to personal data handled by Philippine
              organizations. Using AI does not remove an organization's existing
              privacy responsibilities.
            </p>
            <p>
              Eveia.AI is not a legal or compliance adviser. We can provide
              technical information about data handling, access controls,
              connected sources, and deployment so your IT or data protection
              team can make its own assessment.
            </p>
          </section>
        </div>
      </div>

      <section className="reports-cta-wrap" id="request-demo">
        <div className="reports-cta">
          <div className="reports-cta-bg" aria-hidden="true">
            <img src={footerLogo} alt="" />
          </div>
          <div className="reports-cta-content">
            <h2 className="reports-cta-heading privacy-cta-heading">
              Ask the Right Questions Before Choosing an AI Tool
            </h2>
            <p className="reports-cta-desc">
              Whether you are evaluating Eveia.AI or another AI platform, ask how
              your data is processed, stored, accessed, and protected.
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
