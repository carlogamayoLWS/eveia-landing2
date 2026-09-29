import {
  CONTACT_SEND_ERROR,
  ContactSubmissionError,
  handleContactSubmission,
} from './api/lib/contactSubmission.js'

async function readJsonBody(req) {
  const chunks = []
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }

  if (chunks.length === 0) return {}
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

function readPayload(body) {
  if (!body || typeof body !== 'object') {
    return { name: '', email: '', company: '', message: '' }
  }

  return {
    name: typeof body.name === 'string' ? body.name : '',
    email: typeof body.email === 'string' ? body.email : '',
    company: typeof body.company === 'string' ? body.company : '',
    message: typeof body.message === 'string' ? body.message : '',
    website: typeof body.website === 'string' ? body.website : undefined,
  }
}

function sendJson(res, status, payload) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

export function contactApiDevPlugin() {
  return {
    name: 'contact-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res, next) => {
        if (req.method !== 'POST') {
          return next()
        }

        try {
          const body = await readJsonBody(req)
          const result = await handleContactSubmission(readPayload(body))
          sendJson(res, 200, { ok: true, sent: result === 'sent' })
        } catch (error) {
          if (error instanceof ContactSubmissionError) {
            sendJson(res, error.status, { error: error.message })
            return
          }

          console.error('Contact submission failed:', error)
          sendJson(res, 500, { error: CONTACT_SEND_ERROR })
        }
      })
    },
  }
}
