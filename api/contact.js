function parseCc(value) {
  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidEmail(value) {
  return EMAIL_RE.test(String(value).trim())
}

function formatPhilippineDateTime(date) {
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

function validatePayload(payload) {
  if (payload.website && payload.website.trim()) return { ok: false, ignored: true }

  const name = payload.name.trim()
  const email = payload.email.trim()
  const company = payload.company.trim()
  const message = payload.message.trim()

  if (!name || !email || !company || !message) {
    return { ok: false, status: 400, error: 'All fields are required.' }
  }

  if (!isValidEmail(email)) {
    return { ok: false, status: 400, error: 'Please enter a valid work email address.' }
  }

  return { ok: true, payload: { name, email, company, message } }
}

async function sendContactEmail(payload) {
  const apiKey = process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim()
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }

  const submittedAt = new Date()
  const text = [
    `Name: ${payload.name}`,
    `Work Email: ${payload.email}`,
    `Company: ${payload.company}`,
    `Message: ${payload.message}`,
    '',
    `Submitted: ${formatPhilippineDateTime(submittedAt)}`,
  ].join('\n')

  const to = (process.env.CONTACT_TO && process.env.CONTACT_TO.trim()) || 'inquiry@eveia.ai'
  const cc = parseCc(process.env.CONTACT_CC)
  const from = (process.env.CONTACT_FROM && process.env.CONTACT_FROM.trim()) || 'Eveia.AI Website <noreply@eveia.ai>'

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      cc: cc.length ? cc : ['rowe.s@eveia.ai', 'mgm@eveia.ai'],
      reply_to: payload.email,
      subject: `Eveia.AI website inquiry from ${payload.company}`,
      text,
    }),
  })

  const result = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(result.message || result.name || `Resend API error (${response.status})`)
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const payload = readPayload(req.body)
    const validation = validatePayload(payload)

    if (!validation.ok) {
      if (validation.ignored) {
        return res.status(200).json({ ok: true, sent: false })
      }
      return res.status(validation.status).json({ error: validation.error })
    }

    await sendContactEmail(validation.payload)
    return res.status(200).json({ ok: true, sent: true })
  } catch (error) {
    console.error('Contact submission failed:', error)
    const detail = error instanceof Error ? error.message : 'Something went wrong while sending your message. Please try again.'
    return res.status(500).json({ error: detail })
  }
}
