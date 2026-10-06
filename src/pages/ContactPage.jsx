import { useEffect, useRef, useState } from 'react'
import footerLogo from '../assets/footer-logo.png'
import contactPhoto from '../assets/contact-photo.png'
import contactIconMobile from '../assets/contact-icon-mobile.svg'
import contactIconEmail from '../assets/contact-icon-email.svg'
import contactIconPhone from '../assets/contact-icon-phone.svg'
import Footer from '../components/Footer.jsx'
import { isValidEmail } from '../lib/contactValidation'
import {
  CONTACT_SEND_ERROR,
  CONTACT_SUCCESS_MESSAGE,
  ContactSubmissionError,
  submitContactForm,
} from '../lib/contactApi'

const REACH = [
  {
    icon: contactIconMobile,
    label: '+63 917 597 4975',
    href: 'tel:+639175974975',
    iconClass: 'contact-reach-icon--mobile',
  },
  {
    icon: contactIconEmail,
    label: 'inquiry@eveia.ai',
    href: 'mailto:inquiry@eveia.ai',
    iconClass: 'contact-reach-icon--email',
  },
  {
    icon: contactIconPhone,
    label: '(02) 7007 1075',
    href: 'tel:0270071075',
    iconClass: 'contact-reach-icon--phone',
  },
]

const initialForm = {
  name: '',
  company: '',
  email: '',
  phone: '',
  message: '',
  website: '',
}

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

export default function ContactPage() {
  const [stackRef, stackVisible] = useInView(0, '0px 0px 0px 0px')
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (error) setError(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const name = form.name.trim()
    const email = form.email.trim()
    const company = form.company.trim()
    const phone = form.phone.trim()
    const message = form.message.trim()

    if (!name || !email || !company || !phone || !message) {
      setError('All fields are required.')
      return
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid work email address.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      await submitContactForm({
        name,
        email,
        company,
        message: phone ? `${message}\n\nContact Number: ${phone}` : message,
        website: form.website,
      })
      setSuccess(true)
      setForm(initialForm)
    } catch (submissionError) {
      const messageText = submissionError instanceof ContactSubmissionError
        ? submissionError.message
        : CONTACT_SEND_ERROR
      setError(messageText)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="reports-page contact-page">
      <section className="contact-hero">
        <div className="contact-hero-glow contact-hero-glow--right" aria-hidden="true" />
        <div className="contact-hero-glow contact-hero-glow--left" aria-hidden="true" />

        <div className="contact-hero-inner">
          <h1 className="contact-hero-title">
            Let’s Talk About Your <span>Organization</span>
          </h1>
          <p className="contact-hero-desc">
            Have questions about Eveia.AI or want to see how private enterprise AI
            can support your team? Choose how you’d like to connect with us.
          </p>
          <h2 className="contact-hero-sub">Book a Demo</h2>
          <p className="contact-hero-lead">
            See Eveia.AI using your own documents, questions, or reports. We’ll
            show you how it can help your team find information, prepare reports,
            create summaries, and complete work faster.
          </p>
          <a className="contact-hero-cta" href="#request-demo">
            Request for a Private Demo
          </a>
        </div>
      </section>

      <div
        ref={stackRef}
        className={`reports-stack-wrap ${stackVisible ? 'is-visible' : ''}`}
      >
        <div className="reports-stack contact-sheet">
          <div className="contact-sheet-row">
            <div className="contact-photo">
              <img src={contactPhoto} alt="" />
              <div className="contact-photo-copy">
                <p className="contact-photo-eyebrow">YOUR PRIVATE ENTERPRISE AI</p>
                <p className="contact-photo-brand">Eveia.AI</p>
                <p className="contact-photo-tag">MOVE YOUR TEAM FORWARD</p>
              </div>
            </div>

            <form
              className="contact-form"
              id="send-message"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="contact-form-head">
                <h2>Send Us a Message</h2>
                <p className="contact-form-lead">
                  Have questions about Eveia.AI, pricing, privacy, security, or
                  deployment? Send us a message and tell us what your organization
                  needs.
                </p>
              </div>

              <label className="contact-field">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Juan dela Cruz"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  required
                />
              </label>

              <label className="contact-field">
                <span>Organization</span>
                <input
                  type="text"
                  name="company"
                  autoComplete="organization"
                  placeholder="My Company"
                  value={form.company}
                  onChange={(e) => updateField('company', e.target.value)}
                  required
                />
              </label>

              <label className="contact-field">
                <span>Work Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  required
                />
              </label>

              <label className="contact-field">
                <span>Contact Number</span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder="+63 9XX XXX XXXX"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  required
                />
              </label>

              <label className="contact-field">
                <span>How Can We Help?</span>
                <textarea
                  name="message"
                  placeholder="Type here"
                  rows="6"
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  required
                />
              </label>

              <label className="contact-honeypot" aria-hidden="true">
                Website
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => updateField('website', e.target.value)}
                />
              </label>

              {error ? <p className="contact-form-status contact-form-status--error">{error}</p> : null}
              {success ? (
                <p className="contact-form-status contact-form-status--success">
                  {CONTACT_SUCCESS_MESSAGE}
                </p>
              ) : null}

              <button className="contact-form-submit" type="submit" disabled={submitting}>
                {submitting ? 'Sending…' : 'Send'}
              </button>
            </form>
          </div>

          <div className="contact-reach">
            <p>Other Ways to Reach Us</p>
            <div className="contact-reach-list">
              {REACH.map((item) => (
                <a className="contact-reach-item" href={item.href} key={item.label}>
                  <span className={`contact-reach-icon ${item.iconClass}`}>
                    <img src={item.icon} alt="" width="32" height="32" />
                  </span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="reports-cta-wrap" id="request-demo">
        <div className="reports-cta">
          <div className="reports-cta-bg" aria-hidden="true">
            <img src={footerLogo} alt="" />
          </div>
          <div className="reports-cta-content">
            <h2 className="reports-cta-heading">What Happens Next</h2>
            <p className="reports-cta-desc">
              We aim to reply within one business day. We’ll discuss your needs
              and help you determine the right starting point for Eveia.AI.
            </p>
            <div className="reports-cta-actions">
              <a className="reports-cta-btn reports-cta-btn--primary" href="#request-demo">
                Request Demo
              </a>
              <a className="reports-cta-btn" href="#send-message">
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
