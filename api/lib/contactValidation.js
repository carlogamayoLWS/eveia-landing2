import { containsFoulLanguage, containsUnsafeInput, PROFANITY_ERROR, UNSAFE_INPUT_ERROR } from './profanity.js'
import { getPhoneError } from './phoneCountries.js'

const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/

const PERSONAL_EMAIL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com',
  'yahoo.com', 'yahoo.com.ph', 'yahoo.co.uk', 'ymail.com', 'rocketmail.com',
  'hotmail.com', 'hotmail.co.uk', 'outlook.com', 'outlook.ph', 'live.com', 'msn.com',
  'icloud.com', 'me.com', 'mac.com',
  'aol.com', 'protonmail.com', 'proton.me', 'pm.me',
  'gmx.com', 'gmx.net', 'mail.com', 'zoho.com',
  'yandex.com', 'yandex.ru', 'inbox.com',
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.org',
  'tempmail.com', 'temp-mail.org', 'trashmail.com', '10minutemail.com',
  'yopmail.com', 'sharklasers.com', 'getnada.com', 'mailnesia.com',
  'maildrop.cc', 'discard.email', 'throwaway.email', 'fakeinbox.com',
])

const FAKE_EMAIL_DOMAINS = new Set([
  'test.com', 'testing.com', 'example.com', 'example.org', 'example.net',
  'asdf.com', 'fake.com', 'xxx.com', 'zzz.com', '123.com', 'localhost', 'local.dev',
])

const SPAM_LOCAL_PARTS = new Set([
  'test', 'testing', 'asdf', 'asdfg', 'qwerty', 'qwer', 'xxx', 'aaaa',
  'abc', 'abcd', 'admin', 'noreply', 'no-reply', 'fake', 'sample',
  'dummy', 'user', 'null', 'undefined', '12345', '123456', '00000',
])

const COMMON_TLDS = new Set([
  'com', 'org', 'net', 'edu', 'gov', 'mil', 'int', 'io', 'ai', 'co',
  'app', 'dev', 'cloud', 'tech', 'online', 'site', 'store', 'shop',
  'agency', 'solutions', 'consulting', 'company', 'group', 'global',
  'digital', 'software', 'systems', 'health', 'energy', 'legal',
  'info', 'biz', 'pro', 'name', 'asia', 'email', 'news', 'media',
])

const PLACEHOLDER_EMAIL_ERROR =
  'Please enter a real work email address, not a placeholder or test email.'

function looksLikeGibberishLabel(label) {
  const value = String(label || '').toLowerCase()
  if (!value || value.length < 5) return false
  if (/(.)\1{3,}/.test(value)) return true
  if (/(asdf|qwer|zxcv|qwerty|aiueo|xxxx|zzzz)/.test(value)) return true
  const letters = value.replace(/[^a-z]/g, '')
  if (letters.length < 5) return false
  const vowels = (letters.match(/[aeiouy]/g) || []).length
  if (vowels === 0) return true
  if (letters.length >= 6 && vowels / letters.length < 0.18) return true
  if (/[b-df-hj-np-tv-z]{5,}/.test(letters)) return true
  return false
}

function isAllowedTld(tld) {
  if (!tld) return false
  if (/^[a-z]{2}$/.test(tld)) return true
  return COMMON_TLDS.has(tld)
}

export const EMAIL_FORMAT_ERROR = 'Please enter a valid work email address.'
export const WORK_EMAIL_ERROR =
  'Please use a valid work email address. Personal emails (Gmail, Yahoo, Hotmail, Outlook, and similar) are not accepted.'
export const CONTACT_REQUIRED_ERROR = 'All fields are required.'

export function isValidEmail(value) {
  return EMAIL_RE.test(String(value).trim())
}

export function getWorkEmailError(value) {
  const trimmed = String(value || '').trim()
  if (!trimmed) return 'Please enter a work email address.'
  if (containsUnsafeInput(trimmed)) return UNSAFE_INPUT_ERROR
  if (containsFoulLanguage(trimmed)) return PROFANITY_ERROR
  if (trimmed.length > 254) return 'That email address is too long. Please enter a valid work email.'
  if ((trimmed.match(/@/g) || []).length !== 1 || !isValidEmail(trimmed)) {
    return EMAIL_FORMAT_ERROR
  }

  const [localRaw, domainRaw] = trimmed.split('@')
  const local = localRaw.toLowerCase()
  const domain = domainRaw.toLowerCase()
  const labels = domain.split('.').filter(Boolean)
  const tld = labels[labels.length - 1] || ''

  if (local.length < 2 || /^\d+$/.test(local) || SPAM_LOCAL_PARTS.has(local)) {
    return PLACEHOLDER_EMAIL_ERROR
  }
  if (PERSONAL_EMAIL_DOMAINS.has(domain) || FAKE_EMAIL_DOMAINS.has(domain)) {
    return WORK_EMAIL_ERROR
  }
  if (domain.startsWith('test.') || domain.startsWith('asdf.') || domain === local) {
    return PLACEHOLDER_EMAIL_ERROR
  }
  if (!isAllowedTld(tld)) {
    return PLACEHOLDER_EMAIL_ERROR
  }
  if (looksLikeGibberishLabel(local.replace(/\./g, '')) || local.split('.').some(looksLikeGibberishLabel)) {
    return PLACEHOLDER_EMAIL_ERROR
  }
  if (labels.slice(0, -1).some(looksLikeGibberishLabel)) {
    return PLACEHOLDER_EMAIL_ERROR
  }
  return null
}

function getPlainTextError(value, label, { min = 2, max = 2000 } = {}) {
  const trimmed = String(value || '').trim()
  if (!trimmed) return `${label} is required.`
  if (trimmed.length < min) return `Please enter a valid ${label.toLowerCase()}.`
  if (trimmed.length > max) return `${label} is too long. Please shorten it.`
  if (containsUnsafeInput(trimmed)) return UNSAFE_INPUT_ERROR
  if (containsFoulLanguage(trimmed)) return PROFANITY_ERROR
  return null
}

export function validateContactFields(payload) {
  const name = String(payload?.name || '').trim()
  const email = String(payload?.email || '').trim()
  const company = String(payload?.company || '').trim()
  const phone = String(payload?.phone || '').trim()
  const message = String(payload?.message || '').trim()
  const phoneCountry = payload?.phoneCountry
  const phoneNational = payload?.phoneNational

  const fieldErrors = {}

  const nameError = getPlainTextError(name, 'Name', { min: 2, max: 80 })
  if (nameError) fieldErrors.name = nameError

  const emailError = getWorkEmailError(email)
  if (emailError) fieldErrors.email = emailError

  const companyError = getPlainTextError(company, 'Organization', { min: 2, max: 120 })
  if (companyError) fieldErrors.company = companyError

  if (phoneCountry != null || phoneNational != null) {
    const phoneError = getPhoneError(phoneCountry, phoneNational)
    if (phoneError) fieldErrors.phone = phoneError
  } else if (!phone) {
    fieldErrors.phone = 'Please enter a contact number.'
  } else {
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 8 || digits.length > 15) {
      fieldErrors.phone = 'Please enter a valid contact number.'
    }
    if (containsFoulLanguage(phone) || containsUnsafeInput(phone)) {
      fieldErrors.phone = PROFANITY_ERROR
    }
  }

  const messageError = getPlainTextError(message, 'Message', { min: 8, max: 4000 })
  if (messageError) fieldErrors.message = messageError

  const fields = Object.keys(fieldErrors)
  if (!fields.length) return { ok: true, fieldErrors: {} }

  return {
    ok: false,
    fieldErrors,
    error: fieldErrors[fields[0]],
  }
}

export { containsFoulLanguage, containsUnsafeInput, PROFANITY_ERROR, UNSAFE_INPUT_ERROR }
