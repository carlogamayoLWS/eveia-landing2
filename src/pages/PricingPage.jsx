import Footer from '../components/Footer.jsx'
import heroBg from '../assets/pricing-hero-bg.png'
import logomark from '../assets/pricing-included-mark.png'
import footerLogo from '../assets/footer-logo.png'

const FACTORS = [
  {
    title: 'Deployment',
    body: 'Cloud or on-premise deployment.',
    accent: 'cyan',
  },
  {
    title: 'Users',
    body: 'The number of teams who need access.',
    accent: 'orange',
  },
  {
    title: 'Connected Sources',
    body: 'The volume of documents and systems you connect.',
    accent: 'green',
  },
  {
    title: 'Initial Setup',
    body: 'Configuration, access rules, and team onboarding.',
    accent: 'red',
  },
]

const INCLUDED = [
  'Private environment for your organization',
  'Role-based access',
  'Source-supported answers',
  'Document and access configuration',
  'Team onboarding',
  'Ongoing support and platform updates',
]

const STEPS_TOP = [
  '1. Discuss your needs',
  '2. Demo with your documents',
  '3. Receive a scoped proposal',
]

const STEPS_BOTTOM = ['4. Start with a defined', '5. Review and expand']

const FAQS = [
  {
    q: 'Is there a free tier?',
    a: 'No. Eveia.AI requires setup and configuration for your organization.',
    accent: 'cyan',
  },
  {
    q: 'Can we start small?',
    a: 'Yes. We usually recommend starting with one department or document set.',
    accent: 'orange',
  },
  {
    q: 'Is on-premise priced differently?',
    a: 'Yes. On-premise deployments generally include implementation and ongoing maintenance.',
    accent: 'green',
  },
  {
    q: 'What is not included?',
    a: 'Significant document cleanup or reorganization may require additional work. We identify this early.',
    accent: 'red',
  },
]

export default function PricingPage() {
  return (
    <main className="pricing-page reports-page">
      <section className="pricing-hero">
        <img className="pricing-hero-bg" src={heroBg} alt="" aria-hidden="true" />
        <div className="pricing-hero-inner">
          <h1 className="pricing-hero-title">
            Pricing Built Around Your{' '}
            <span className="reports-hero-grad">Organization</span>
          </h1>
          <p className="pricing-hero-desc">
            Eveia.AI does not have a fixed price list because each organization
            has different deployment, user, document, and setup requirements.
            <br />
            <br />
            We explain what affects pricing so you can understand the cost
            before speaking with us
          </p>
          <div className="pricing-factors">
            <h2 className="pricing-factors-title">What Pricing Is Based On</h2>
            <div className="pricing-factor-grid">
              {FACTORS.map((item) => (
                <article
                  className={`pricing-factor pricing-factor--${item.accent}`}
                  key={item.title}
                >
                  <span className="pricing-dot" aria-hidden="true" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="pricing-body-wrap">
        <section className="pricing-sheet">
          <div className="pricing-included-mark" aria-hidden="true">
            <img src={logomark} alt="" />
          </div>
          <div className="pricing-included">
            <h2 className="pricing-included-title">
              What’s <span className="reports-hero-grad">Included</span>
            </h2>
            <p className="pricing-included-lead">
              Every Eveia.AI engagement includes:
            </p>
            <ul className="pricing-included-list">
              {INCLUDED.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="pricing-expand">
            <h2 className="pricing-expand-title">
              <span className="reports-hero-grad">Start</span> Small, Then{' '}
              <span className="reports-hero-grad">Expand</span>
            </h2>
            <p className="pricing-expand-desc">
              You can start with one department, document set, or use case
              before expanding across the organization.
            </p>
            <p className="pricing-expand-label">A typical process is:</p>
            <div className="pricing-steps">
              <div className="pricing-steps-row">
                {STEPS_TOP.map((step) => (
                  <div className="pricing-step" key={step}>
                    {step}
                  </div>
                ))}
              </div>
              <div className="pricing-steps-row pricing-steps-row--center">
                {STEPS_BOTTOM.map((step) => (
                  <div className="pricing-step" key={step}>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pricing-faq">
            <h2 className="pricing-faq-title">Frequently Asked Questions</h2>
            <div className="pricing-faq-list">
              {FAQS.map((item) => (
                <article
                  className={`pricing-faq-item pricing-faq-item--${item.accent}`}
                  key={item.q}
                >
                  <span className="pricing-dot" aria-hidden="true" />
                  <div>
                    <h3>{item.q}</h3>
                    <p>{item.a}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="reports-cta-wrap" id="request-demo">
        <div className="reports-cta">
          <div className="reports-cta-bg" aria-hidden="true">
            <img src={footerLogo} alt="" />
          </div>
          <div className="reports-cta-content">
            <h2 className="reports-cta-heading">Get a Pricing Estimate</h2>
            <p className="reports-cta-desc">
              Tell us how you plan to deploy Eveia.AI, how many people need
              access, and what you want to connect first. We can then provide an
              estimate based on your requirements.
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
