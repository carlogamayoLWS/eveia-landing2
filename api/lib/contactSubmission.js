import { isValidEmail } from './contactValidation.js'

export const EMAIL_FORMAT_ERROR = 'Please enter a valid work email address.'
export const CONTACT_REQUIRED_ERROR = 'All fields are required.'
export const CONTACT_SEND_ERROR = 'Something went wrong while sending your message. Please try again.'

function parseCc(value) {
  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function getContactTo() {
  return process.env.CONTACT_TO?.trim() || 'inquiry@eveia.ai'
}

export function getContactCc() {
  const fromEnv = parseCc(process.env.CONTACT_CC)
  return fromEnv.length ? fromEnv : ['rowe.s@eveia.ai', 'mgm@eveia.ai']
}

export function getContactFrom() {
  return process.env.CONTACT_FROM?.trim() || 'Eveia.AI Website <noreply@eveia.ai>'
}

export function validateContactPayload(payload) {
  if (payload.website?.trim()) return null

  const name = payload.name.trim()
  const email = payload.email.trim()
  const company = payload.company.trim()
  const message = payload.message.trim()

  if (!name || !email || !company || !message) return CONTACT_REQUIRED_ERROR
  if (!isValidEmail(email)) return EMAIL_FORMAT_ERROR
  return null
}

export function formatPhilippineDateTime(date) {
  return new Intl.DateTimeFormat('en-PH', {
    timeZone: 'Asia/Manila',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  }).format(date)
}

export function buildContactSubject(company) {
  return `Eveia.AI website inquiry from ${company.trim()}`
}

export function buildContactEmailBody(payload, submittedAt) {
  return [
    `Name: ${payload.name.trim()}`,
    `Work Email: ${payload.email.trim()}`,
    `Company: ${payload.company.trim()}`,
    `Message: ${payload.message.trim()}`,
    '',
    `Submitted: ${formatPhilippineDateTime(submittedAt)}`,
  ].join('\n')
}

export async function sendContactEmail(payload, submittedAt = new Date()) {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: getContactFrom(),
      to: [getContactTo()],
      cc: getContactCc(),
      reply_to: payload.email.trim(),
      subject: buildContactSubject(payload.company),
      text: buildContactEmailBody(payload, submittedAt),
    }),
  })

  const result = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(result.message || result.name || `Resend API error (${response.status})`)
  }
}

export async function handleContactSubmission(payload) {
  if (payload.website?.trim()) return 'ignored'

  const validationError = validateContactPayload(payload)
  if (validationError) {
    throw new ContactSubmissionError(400, validationError)
  }

  await sendContactEmail(payload)
  return 'sent'
}

export class ContactSubmissionError extends Error {
  constructor(status, message) {
    super(message)
    this.name = 'ContactSubmissionError'
    this.status = status
  }
}
