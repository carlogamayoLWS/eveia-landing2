import { useEffect, useRef, useState } from 'react'
import footerLogo from '../assets/footer-logo.png'
import securityPlus from '../assets/security-plus.svg'
import securityDotFaq from '../assets/security-dot-faq.svg'
import securityDotCard from '../assets/security-dot-card.svg'
import Footer from '../components/Footer.jsx'

const DATA_CARDS = [
  {
    title: 'Separate environment',
    body: 'Your documents are held in an environment configured for your organization.',
  },
  {
    title: 'No external AI training',
    body: 'Connected material is not used to train or improve AI models by default.',
  },
  {
    title: 'Relevant context only',
    body: 'Only relevant information is retrieved, not your entire library.',
  },
  {
    title: 'Controlled sources',
    body: 'You decide which documents and sources are connected.',
  },
  {
    title: 'Disconnect anytime',
    body: 'Connected documents or sources can be removed from the platform.',
  },
]

const CLAIMS = [
  {
    title: 'No zero-exposure claim',
    body: 'Information must be processed to generate answers, although Eveia.AI limits the context used for each request.',
  },
  {
    title: 'No unsupported certifications',
    body: 'Ask us about specific certifications or security standards required by your organization.',
  },
  {
    title: 'No guarantee of perfect answers',
    body: 'Responses are based on connected organizational information and may include sources, but human review is still required.',
  },
  {
    title: 'Shared responsibility',
    body: 'We manage the platform and its configured controls. Your organization manages user access and the accuracy and currency of connected documents.',
  },
]

const QUESTIONS = [
  {
    q: 'Where is our data stored and processed?',
    a: 'Eveia.AI can be deployed in a private cloud environment or on-premise, so storage and processing stay aligned with your organization’s infrastructure requirements.',
  },
  {
    q: 'Can data remain within our own infrastructure?',
    a: 'Yes. Eveia.AI supports on-premise deployment when your organization requires data and processing to remain within its own environment.',
  },
  {
    q: 'Is our data used to train AI models?',
    a: 'Connected material is not used to train or improve AI models by default. Your organizational knowledge stays yours.',
  },
  {
    q: 'What information is processed for each question?',
    a: 'Only relevant information is retrieved for each request, not your entire document library.',
  },
  {
    q: 'Does the platform respect existing user permissions?',
    a: 'Eveia.AI uses role-based access controls so users only receive information they are authorized to access.',
  },
  {
    q: 'Can answers be traced to their source documents?',
    a: 'Yes. Responses can include source links so your team can verify information against the original documents.',
  },
  {
    q: 'What happens to our data when we stop using the platform?',
    a: 'Connected documents and sources can be removed from the platform, and your organization remains in control of its information.',
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

export default function SecurityPage() {
  const [stackRef, stackVisible] = useInView(0, '0px 0px 0px 0px')
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <main className="reports-page security-page">
      <section className="security-hero">
        <div className="security-hero-glow security-hero-glow--right" aria-hidden="true" />
        <div className="security-hero-glow security-hero-glow--left" aria-hidden="true" />

        <div className="security-hero-inner">
          <h1 className="security-hero-title">
            Private Enterprise AI, Built With <span>Security</span> in Mind
          </h1>
          <p className="security-hero-desc">
            Before connecting internal documents to an AI platform, organizations
            need clear answers about data privacy, access, storage, and processing.
            <br />
            <br />
            Eveia.AI is designed to keep your organizational knowledge private,
            controlled, and accessible only to authorized users. Security and
            deployment can be configured based on your organization’s requirements.
          </p>

          <h2 className="security-data-title">Your Data Stays Yours</h2>
          <div className="security-data-grid">
            <div className="security-data-row">
              {DATA_CARDS.slice(0, 3).map((card) => (
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
              {DATA_CARDS.slice(3).map((card) => (
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

          <div className="security-policy">
            <div className="security-policy-block">
              <h2>Access Based on Your Roles</h2>
              <p>
                Eveia.AI uses <strong>role-based</strong> access controls to help
                ensure users only receive information they are authorized to access.
              </p>
              <p>
                Access rules are configured around your organization’s existing
                structure during setup, helping prevent users from accessing
                documents outside their role.
              </p>
            </div>
            <div className="security-policy-block">
              <h2>Cloud or On-Premise Deployment</h2>
              <p>
                Organizations in government, healthcare, finance, and other
                regulated industries may have specific data residency or
                infrastructure requirements.
              </p>
              <p>
                Eveia.AI supports <strong>on-premise</strong>{' '}
                <strong>deployment</strong> when your organization requires data
                and processing to remain within its own environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        ref={stackRef}
        className={`reports-stack-wrap ${stackVisible ? 'is-visible' : ''}`}
      >
        <div className="reports-stack security-sheet">
          <section className="security-claims">
            <h2>What We Do Not Claim</h2>
            <p className="security-claims-lead">
              We believe security should be explained clearly, including its limits.
            </p>
            <ul>
              {CLAIMS.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong> – {item.body}
                </li>
              ))}
            </ul>
          </section>

          <hr className="security-divider" />

          <section className="security-faq">
            <h2>Questions to Ask About Enterprise AI Security</h2>
            <p className="security-faq-lead">
              When evaluating an enterprise AI platform, ask:
            </p>
            <div className="security-faq-list">
              {QUESTIONS.map((item, index) => {
                const open = openFaq === index
                return (
                  <article
                    className={`security-faq-item${open ? ' is-open' : ''}`}
                    key={item.q}
                  >
                    <button
                      type="button"
                      className="security-faq-trigger"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? null : index)}
                    >
                      <img
                        className="security-faq-dot"
                        src={securityDotFaq}
                        alt=""
                        width="13"
                        height="13"
                      />
                      <span>{item.q}</span>
                      <img
                        className="security-faq-plus"
                        src={securityPlus}
                        alt=""
                        width="19"
                        height="19"
                      />
                    </button>
                    <div className="security-faq-answer" hidden={!open}>
                      <p>{item.a}</p>
                    </div>
                  </article>
                )
              })}
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
            <h2 className="reports-cta-heading">
              Bring Your Security Team to the Demo
            </h2>
            <p className="reports-cta-desc">
              Have questions about AI data privacy, access controls, deployment,
              or security requirements? Bring your IT, security, or data privacy
              team to the conversation.
              <br />
              <br />
              We can discuss your requirements and show how Eveia.AI can fit your
              organization.
            </p>
            <div className="reports-cta-actions">
              <a className="reports-cta-btn reports-cta-btn--primary" href="#request-demo">
                Request Demo
              </a>
              <a className="reports-cta-btn" href="mailto:inquiry@eveia.ai">
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
