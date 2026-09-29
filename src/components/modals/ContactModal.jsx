import { useEffect, useRef, useState } from 'react'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import { isValidEmail } from '../../lib/contactValidation'
import {
  CONTACT_SEND_ERROR,
  CONTACT_SUCCESS_MESSAGE,
  ContactSubmissionError,
  submitContactForm,
} from '../../lib/contactApi'

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'inquiry@eveia.ai'
const CONTACT_MOBILE = import.meta.env.VITE_CONTACT_MOBILE || '+63 917 597 4975'
const CONTACT_LANDLINE = import.meta.env.VITE_CONTACT_LANDLINE || '(02) 7007 1075'
const CONTACT_HR_ADMIN = import.meta.env.VITE_CONTACT_HR_ADMIN || '(02) 8822 6138'

const contactItems = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
      </svg>
    ),
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
      </svg>
    ),
    label: 'Mobile',
    value: CONTACT_MOBILE,
    href: `tel:${String(CONTACT_MOBILE).replace(/\s+/g, '')}`,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M10.5 18.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
        <path fillRule="evenodd" d="M8.625.75A3.375 3.375 0 005.25 4.125v15.75a3.375 3.375 0 003.375 3.375h6.75a3.375 3.375 0 003.375-3.375V4.125A3.375 3.375 0 0015.375.75h-6.75zM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 017.5 19.875V4.125z" clipRule="evenodd" />
      </svg>
    ),
    label: 'Landline',
    value: CONTACT_LANDLINE,
    href: `tel:${String(CONTACT_LANDLINE).replace(/\D+/g, '')}`,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
      </svg>
    ),
    label: 'HR & Admin',
    value: CONTACT_HR_ADMIN,
    href: `tel:${String(CONTACT_HR_ADMIN).replace(/\D+/g, '')}`,
  },
]

const initialForm = {
  name: '',
  email: '',
  company: '',
  message: '',
  website: '',
}

export function ContactModal({ open, onClose }) {
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useBodyScrollLock(open)

  useEffect(() => {
    if (!open) return
    setSuccess(false)
    setError(null)
    setSubmitting(false)
    setForm(initialForm)
  }, [open])

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (error) setError(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const name = form.name.trim()
    const email = form.email.trim()
    const company = form.company.trim()
    const message = form.message.trim()

    if (!name || !email || !company || !message) {
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
        message,
        website: form.website,
      })
      setSuccess(true)
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
    <div
      ref={overlayRef}
      className={`form-overlay${open ? ' open' : ''}`}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div
        className="form-modal contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
      >
        <button type="button" className="form-close contact-modal-close" aria-label="Close" onClick={onClose}>&times;</button>

        <div className="contact-modal-grid">
          <div className="contact-modal-left">
            <div className="contact-modal-left-bg contact-modal-left-bg--glow" />
            <div className="contact-modal-left-bg contact-modal-left-bg--blob" />

            <div className="contact-modal-intro">
              <div className="contact-modal-eyebrow">Get in Touch</div>
              <h2 id="contact-title" className="contact-modal-title">
                Let's talk about<br />your organization
              </h2>
              <p className="contact-modal-desc">
                Reach out to our team - we're happy to answer questions about Eveia.AI, or how we can help your organization.
              </p>
            </div>

            <div className="contact-modal-contacts">
              {contactItems.map((item) => (
                <a key={item.label} href={item.href} className="contact-modal-contact">
                  <div className="contact-modal-contact-icon">
                    {item.icon}
                  </div>
                  <div>
                    <div className="contact-modal-contact-label">{item.label}</div>
                    <div className="contact-modal-contact-value">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="contact-modal-right">
            <div className="contact-modal-form-header">
              <div className="form-title contact-modal-form-title">Send us a message</div>
              <p className="form-subtitle">Our team will get in touch shortly.</p>
            </div>

            {success ? (
              <div className="contact-modal-success" role="status">
                <p>{CONTACT_SUCCESS_MESSAGE}</p>
              </div>
            ) : (
              <form className="contact-modal-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="ct-name">Name *</label>
                  <input
                    type="text"
                    id="ct-name"
                    name="name"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="ct-email">Work Email *</label>
                  <input
                    type="email"
                    id="ct-email"
                    name="email"
                    required
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="ct-company">Company *</label>
                  <input
                    type="text"
                    id="ct-company"
                    name="company"
                    required
                    placeholder="Your organization"
                    value={form.company}
                    onChange={(e) => updateField('company', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="ct-message">Message *</label>
                  <textarea
                    id="ct-message"
                    name="message"
                    required
                    placeholder="Tell us more about your inquiry…"
                    rows={4}
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    className="contact-modal-textarea"
                  />
                </div>

                <div
                  className="form-honeypot"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}
                >
                  <label htmlFor="ct-website">Website</label>
                  <input
                    type="text"
                    id="ct-website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => updateField('website', e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gradient form-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>

                <p className="contact-modal-privacy">
                  We use your details only to respond to your inquiry.
                </p>

                {error && (
                  <p className="form-validation-error" role="alert">{error}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
