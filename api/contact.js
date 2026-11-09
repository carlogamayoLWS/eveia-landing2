import {
  CONTACT_SEND_ERROR,
  ContactSubmissionError,
  handleContactSubmission,
} from './lib/contactSubmission.js'

function readPayload(body) {
  if (!body || typeof body !== 'object') {
    return { name: '', email: '', company: '', phone: '', message: '', website: undefined }
  }

  return {
    name: typeof body.name === 'string' ? body.name : '',
    email: typeof body.email === 'string' ? body.email : '',
    company: typeof body.company === 'string' ? body.company : '',
    phone: typeof body.phone === 'string' ? body.phone : '',
    message: typeof body.message === 'string' ? body.message : '',
    website: typeof body.website === 'string' ? body.website : undefined,
    phoneCountry: typeof body.phoneCountry === 'string' ? body.phoneCountry : undefined,
    phoneNational: typeof body.phoneNational === 'string' ? body.phoneNational : undefined,
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const result = await handleContactSubmission(readPayload(req.body))
    return res.status(200).json({ ok: true, sent: result === 'sent' })
  } catch (error) {
    console.error('Contact submission failed:', error)
    if (error instanceof ContactSubmissionError) {
      return res.status(error.status).json({ error: error.message })
    }
    const detail = error instanceof Error ? error.message : CONTACT_SEND_ERROR
    return res.status(500).json({ error: detail })
  }
}
