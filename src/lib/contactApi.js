export const CONTACT_ENDPOINT = '/api/contact'
export const CONTACT_SUCCESS_MESSAGE =
  'Thank you, your message has been sent. Someone from our team will get back to you shortly.'
export const CONTACT_SEND_ERROR =
  'Something went wrong while sending your message. Please try again.'

export class ContactSubmissionError extends Error {
  constructor(status, message) {
    super(message)
    this.name = 'ContactSubmissionError'
    this.status = status
  }
}

export async function submitContactForm(data) {
  const response = await fetch(CONTACT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new ContactSubmissionError(
      response.status,
      payload.error || CONTACT_SEND_ERROR,
    )
  }
}
