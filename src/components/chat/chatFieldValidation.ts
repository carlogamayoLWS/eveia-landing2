export const REAL_NAME_ERROR =
  'Please provide your real full name. We will not process incorrect information to ensure we can provide a professional recommendation for your organization.'

export const UNSAFE_INPUT_ERROR =
  'That input looks unsafe or invalid. Please enter plain text without scripts or special markup.'

export const FOUL_INPUT_ERROR =
  "Sorry, I can't proceed with that information. Please try again with professional details, or tap Cancel if you'd like to stop."

const FOUL_WORDS = [
  'shit', 'shitty', 'shitting', 'bullshit', 'horseshit',
  'fuck', 'fucking', 'fucked', 'fucker', 'motherfuck', 'motherfucker',
  'bitch', 'bitches', 'bitching', 'sonofabitch',
  'asshole', 'assholes', 'asshat', 'dumbass', 'badass', 'jackass',
  'bastard', 'bastards',
  'damn', 'damned', 'dammit', 'goddamn', 'goddamnit',
  'crap', 'crappy',
  'dick', 'dicks', 'dickhead',
  'pussy', 'pussies',
  'cock', 'cocks', 'cocksucker',
  'piss', 'pissed', 'pissing',
  'slut', 'sluts', 'slutty',
  'whore', 'whores', 'whoring',
  'cunt', 'cunts',
  'fag', 'faggot', 'faggots',
  'nigger', 'nigga', 'niggas',
  'kike', 'spic', 'chink', 'wetback', 'towelhead', 'raghead',
  'retard', 'retarded', 'retards',
  'idiot', 'idiots', 'stupid', 'dumb', 'moron', 'morons',
  'putang', 'putangina', 'putang ina', 'putang-ina', 'putanginaa', 'potang', 'potangina',
  'gago', 'gaga', 'gagong', 'gagu',
  'tangina', 'tang ina', 'tang-ina', 'tanginamo', 'tanginamoka',
  'ulol', 'ulul', 'olol',
  'tanga', 'tangang',
  'baliw', 'baliws',
  'hudas', 'huwes', 'hayop',
  'punyeta', 'punyemas',
  'leche', 'lechugas',
  'buang', 'buangit',
  'kupal', 'kupals',
  'pakyu', 'pak yu', 'pakyew', 'pak you',
  'lintik', 'shet', 'puta', 'puke', 'pokpok',
  'hindot', 'hinayupak', 'hayupak', 'hayupaka',
  'demonyo', 'diyablo', 'satang', 'satanas',
  'kingina', 'king ina', 'kang ina',
  // Tagalog sexual slang / joke names frequently used in testing
  'salsal', 'salsalani', 'salsalin', 'jabol', 'jabolito', 'jakol', 'jakolin',
  'bayag', 'titi', 'puke', 'pepe', 'kantot', 'iyot', 'libog',
] as const

const KEYBOARD_SPAM = [
  'asdf', 'asdfg', 'asdfgh', 'qwer', 'qwert', 'qwerty', 'qwertyuiop',
  'zxcv', 'zxcvb', 'zxcvbn', 'ajsk', 'lorem', 'ipsum', 'asdfasdf',
  'abcabc', 'xyzxyz', 'aaaa', 'bbbb', 'xxxx', 'zzzz',
] as const

const PLACEHOLDER_NAMES = new Set([
  'test test',
  'test user',
  'testing testing',
  'foo bar',
  'foo foo',
  'bar bar',
  'john doe',
  'jane doe',
  'john smith',
  'asdf asdf',
  'aaa aaa',
  'xxx xxx',
  'n a',
  'na na',
  'first last',
  'fname lname',
  'your name',
  'full name',
  'sample name',
  'demo demo',
  'user user',
  'admin admin',
  'sorry boi',
  'sorry boy',
  'hey bro',
  'hi bro',
])

/** Words that are never valid human name parts in a professional lead form. */
const NON_NAME_TOKENS = new Set([
  'sorry', 'please', 'thanks', 'thank', 'hello', 'hi', 'hey', 'yo', 'sup',
  'boi', 'boy', 'bro', 'bruh', 'dude', 'guy', 'buddy', 'pal', 'homie',
  'yeah', 'yup', 'nah', 'nope', 'lol', 'lmao', 'haha', 'hehe', 'ok', 'okay',
  'none', 'nil', 'null', 'undefined', 'unknown', 'anonymous', 'someone',
  'asdf', 'qwerty', 'test', 'testing', 'sample', 'demo', 'fake', 'xxx',
  'name', 'firstname', 'lastname', 'fullname', 'lname',
])

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  'guerrillamail.org',
  'tempmail.com',
  'temp-mail.org',
  'trashmail.com',
  '10minutemail.com',
  'yopmail.com',
  'sharklasers.com',
  'getnada.com',
  'mailnesia.com',
  'maildrop.cc',
  'discard.email',
  'throwaway.email',
  'fakeinbox.com',
])

const FAKE_EMAIL_DOMAINS = new Set([
  'test.com',
  'testing.com',
  'example.com',
  'example.org',
  'example.net',
  'asdf.com',
  'asdfasdf.com',
  'fake.com',
  'xxx.com',
  'zzz.com',
  '123.com',
  'localhost',
  'local.dev',
])

const SPAM_LOCAL_PARTS = new Set([
  'test', 'testing', 'asdf', 'asdfg', 'qwerty', 'qwer', 'xxx', 'aaaa',
  'abc', 'abcd', 'admin', 'noreply', 'no-reply', 'fake', 'sample',
  'dummy', 'user', 'null', 'undefined', '12345', '123456', '00000',
])

function normalizeForMatch(value: string): string {
  return value
    .toLowerCase()
    .replace(/[\u2018\u2019']/g, '')
    .replace(/0/g, 'o')
    .replace(/1/g, 'i')
    .replace(/3/g, 'e')
    .replace(/4/g, 'a')
    .replace(/5/g, 's')
    .replace(/7/g, 't')
    .replace(/\$/g, 's')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function containsUnsafeInput(value: string): boolean {
  if (!value) return false
  if ((/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/).test(value)) return true
  if ((/<\s*\/?\s*[a-z!]/i).test(value)) return true
  if ((/javascript\s*:/i).test(value)) return true
  if ((/data\s*:\s*text\/html/i).test(value)) return true
  if ((/\bon\w+\s*=/i).test(value)) return true
  if ((/&#x?[0-9a-f]+;?/i).test(value)) return true
  if ((/%3c\s*script/i).test(value)) return true
  if ((/expression\s*\(/i).test(value)) return true
  return false
}

export function containsFoulOrSlang(value: string): boolean {
  const normalized = normalizeForMatch(value)
  if (!normalized) return false
  const compact = normalized.replace(/[\s-]/g, '')
  const tokens = new Set(normalized.split(' '))

  for (const word of FOUL_WORDS) {
    const w = word.replace(/\s+/g, ' ')
    if (tokens.has(w)) return true
    if (normalized.includes(w)) return true
    const compactWord = w.replace(/[\s-]/g, '')
    if (compactWord.length >= 4 && compact.includes(compactWord)) return true
  }
  return false
}

function looksLikeKeyboardSpam(value: string): boolean {
  const normalized = normalizeForMatch(value).replace(/\s+/g, '')
  if (!normalized) return false
  for (const spam of KEYBOARD_SPAM) {
    if (normalized === spam || normalized.includes(spam)) return true
  }
  if (/(.)\1{3,}/.test(normalized)) return true
  return false
}

function isPlaceholderName(fullName: string): boolean {
  const normalized = normalizeForMatch(fullName)
  if (PLACEHOLDER_NAMES.has(normalized)) return true
  const words = normalized.split(' ').filter(Boolean)
  if (words.length >= 2 && words.every((w) => w === words[0])) return true
  if (words.some((w) => NON_NAME_TOKENS.has(w))) return true
  if (words.some((w) => ['test', 'asdf', 'qwerty', 'xxx', 'foo', 'bar', 'sample', 'demo', 'fake'].includes(w))) {
    return true
  }
  return false
}

function namePartLooksImplausible(part: string): boolean {
  const lower = part.toLowerCase().replace(/['-]/g, '')
  if (part.length < 2 || part.length > 40) return true
  if (!/^[A-Za-z][A-Za-z'-]*$/.test(part)) return true
  if (NON_NAME_TOKENS.has(lower)) return true
  if (/(.)\1{2,}/.test(lower)) return true
  if (looksLikeKeyboardSpam(lower)) return true

  const letters = lower.replace(/[^a-z]/g, '')
  if (letters.length >= 3) {
    const vowels = (letters.match(/[aeiouy]/g) ?? []).length
    const ratio = vowels / letters.length
    // Catch meme/slang syllables like "boi" / ultra-short joke tokens
    if (letters.length <= 3 && ratio >= 0.66 && /^(boi|boy|bro|sup|lol|hey|yo)$/.test(letters)) {
      return true
    }
    if (letters.length >= 4 && (ratio < 0.15 || ratio > 0.85)) return true
  }
  return false
}

function domainLooksFake(domain: string): boolean {
  const labels = domain.toLowerCase().split('.').filter(Boolean)
  if (labels.length < 2) return true

  const tld = labels[labels.length - 1]
  const nameLabels = labels.slice(0, -1)

  if (tld.length < 2) return true

  for (const label of nameLabels) {
    if (!label || label.length < 2) return true
    if (looksLikeKeyboardSpam(label)) return true
    if (/(asdf|qwer|zxcv|aiueo|xxx|test|fake|sample|lorem)/i.test(label)) return true
    if (/(.)\1{3,}/.test(label)) return true

    // Long gibberish labels (e.g. gmasdfas)
    if (label.length >= 6) {
      const vowels = (label.match(/[aeiouy]/g) ?? []).length
      const ratio = vowels / label.length
      if (ratio < 0.22) return true
      // Mixed keyboard-spam chunks inside otherwise odd labels
      if (/[b-df-hj-np-tv-z]{5,}/i.test(label)) return true
    }
  }

  return false
}

export function validateFullName(value: string): string | null {
  const trimmed = value.trim().replace(/\s+/g, ' ')
  if (!trimmed) return 'Please enter your full name.'

  if (containsUnsafeInput(trimmed)) return UNSAFE_INPUT_ERROR
  // Match Eveia agent tone for fake / inappropriate names
  if (containsFoulOrSlang(trimmed)) return REAL_NAME_ERROR

  if (/[0-9@#$%^*=+[\]{}|\\/<>~`]/.test(trimmed)) {
    return REAL_NAME_ERROR
  }
  if (/[\u{1F300}-\u{1FAFF}]/u.test(trimmed)) {
    return REAL_NAME_ERROR
  }

  const words = trimmed.split(' ').filter(Boolean)
  if (words.length < 2) {
    return 'Please enter your full name (first and last name).'
  }
  if (words.length > 6) {
    return REAL_NAME_ERROR
  }

  if (isPlaceholderName(trimmed)) return REAL_NAME_ERROR
  if (looksLikeKeyboardSpam(trimmed)) return REAL_NAME_ERROR
  if (words.some(namePartLooksImplausible)) return REAL_NAME_ERROR

  return null
}

export function validateWorkEmail(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return 'Please enter a valid email address (e.g. you@company.com).'

  if (containsUnsafeInput(trimmed)) return UNSAFE_INPUT_ERROR
  if (containsFoulOrSlang(trimmed)) return FOUL_INPUT_ERROR

  if (trimmed.length > 254) {
    return 'That email address is too long. Please enter a valid work email.'
  }

  const emailRe = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/
  if (!emailRe.test(trimmed)) {
    return 'Please enter a valid email address (e.g. you@company.com).'
  }

  const [localRaw, domainRaw] = trimmed.split('@')
  const local = localRaw.toLowerCase()
  const domain = domainRaw.toLowerCase()
  const tld = domain.split('.').pop() ?? ''

  if (tld.length < 2) {
    return 'Please enter a valid email address (e.g. you@company.com).'
  }
  if (local.length < 2) {
    return 'Please enter a real work email address.'
  }
  if (SPAM_LOCAL_PARTS.has(local) || looksLikeKeyboardSpam(local) || /^(.)\1{3,}$/.test(local) || /^\d+$/.test(local)) {
    return 'Please enter a real work email address, not a placeholder or test email.'
  }
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain) || FAKE_EMAIL_DOMAINS.has(domain)) {
    return 'Please use a real work email address (temporary or placeholder domains are not accepted).'
  }
  if (domain === local || domain.startsWith('test.') || domain.startsWith('asdf.')) {
    return 'Please enter a real work email address, not a placeholder or test email.'
  }
  if (domainLooksFake(domain) || looksLikeKeyboardSpam(domain.replace(/\./g, ''))) {
    return 'Please enter a real work email address, not a placeholder or test email.'
  }

  return null
}

export function validatePhone(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return 'Please enter a valid phone number.'

  if (containsUnsafeInput(trimmed)) return UNSAFE_INPUT_ERROR
  if (containsFoulOrSlang(trimmed)) return FOUL_INPUT_ERROR

  if (!/^[+\d][\d\s().-]*$/.test(trimmed)) {
    return 'Please enter a valid phone number (digits only, with optional + or dashes).'
  }

  const digits = trimmed.replace(/\D/g, '')
  if (digits.length < 7) return 'Please enter a valid phone number.'
  if (digits.length > 15) return 'That phone number is too long. Please enter a valid phone number.'
  if (/^(\d)\1+$/.test(digits)) {
    return 'Please enter a real phone number, not a repeated sequence.'
  }
  if (/^(0123456789|1234567890|0987654321|9876543210)/.test(digits)) {
    return 'Please enter a real phone number, not a sequential number.'
  }
  if (/^(\d{2})\1{3,}$/.test(digits) || /^(\d{3})\1{2,}$/.test(digits)) {
    return 'Please enter a real phone number, not a repeated pattern.'
  }

  return null
}

export function validateCompany(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return 'Please enter your company name.'
  if (trimmed.length < 2) return 'Please enter your company name.'
  if (trimmed.length > 120) return 'That company name is too long. Please shorten it.'

  if (containsUnsafeInput(trimmed)) return UNSAFE_INPUT_ERROR
  if (containsFoulOrSlang(trimmed)) return FOUL_INPUT_ERROR
  if (looksLikeKeyboardSpam(trimmed)) {
    return 'Please enter a real company name.'
  }
  if (/^(test|asdf|xxx|n\/a|na|none|company|acme)$/i.test(trimmed)) {
    return 'Please enter a real company name.'
  }

  return null
}

export function validateRole(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return 'Please enter your role.'
  if (trimmed.length < 2) return 'Please enter your role.'
  if (trimmed.length > 80) return 'That role is too long. Please shorten it.'

  if (containsUnsafeInput(trimmed)) return UNSAFE_INPUT_ERROR
  if (containsFoulOrSlang(trimmed)) return FOUL_INPUT_ERROR
  if (looksLikeKeyboardSpam(trimmed)) {
    return 'Please enter a real role (e.g. CTO, Operations Manager).'
  }
  if (/^(test|asdf|xxx|n\/a|na|none|role|job)$/i.test(trimmed)) {
    return 'Please enter a real role (e.g. CTO, Operations Manager).'
  }

  return null
}

export function validateUsersOrDepartments(value: string, label = 'number'): string | null {
  const trimmed = value.trim()
  if (!trimmed) return `Please enter a valid ${label} greater than 0.`

  if (containsUnsafeInput(trimmed)) return UNSAFE_INPUT_ERROR
  if (containsFoulOrSlang(trimmed)) return FOUL_INPUT_ERROR

  if (!/^\d+(\.\d+)?$/.test(trimmed)) {
    return `Please enter a valid ${label} greater than 0.`
  }

  const num = Number(trimmed)
  if (!Number.isFinite(num) || num <= 0) {
    return `Please enter a valid ${label} greater than 0.`
  }
  if (num > 1_000_000) {
    return `That ${label} seems unrealistically high. Please enter a realistic value.`
  }

  return null
}

export function validateOptionalUseCase(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  if (/^(skip|none|n\/a|-)$/i.test(trimmed)) return null
  if (containsUnsafeInput(trimmed)) return UNSAFE_INPUT_ERROR
  if (containsFoulOrSlang(trimmed)) return FOUL_INPUT_ERROR
  if (trimmed.length > 2000) return 'Please keep your use case under 2000 characters.'
  return null
}

export type LeadValidationShape = {
  name: string
  email: string
  phone: string
  company: string
  role: string
  users: string
  industry: string
  org_size: string
  departments: string
  use_case: string
}

export type LeadFlowMode = 'idle' | 'demo' | 'pricing'

export function validateLeadForSubmit(
  lead: LeadValidationShape,
  flowMode: LeadFlowMode,
): string | null {
  if (flowMode !== 'demo' && flowMode !== 'pricing') {
    return 'Unable to submit right now. Please try again.'
  }

  const nameError = validateFullName(lead.name)
  if (nameError) return nameError

  const emailError = validateWorkEmail(lead.email)
  if (emailError) return emailError

  const phoneError = validatePhone(lead.phone)
  if (phoneError) return phoneError

  const companyError = validateCompany(lead.company)
  if (companyError) return companyError

  const roleError = validateRole(lead.role)
  if (roleError) return roleError

  if (flowMode === 'demo') {
    const usersError = validateUsersOrDepartments(lead.users, 'user count')
    if (usersError) return usersError
  }

  if (flowMode === 'pricing') {
    if (!lead.industry.trim()) return 'Please choose a valid industry.'
    if (!lead.org_size.trim()) return 'Please choose a valid organization size.'
    const useCaseError = validateOptionalUseCase(lead.use_case)
    if (useCaseError) return useCaseError
  }

  const departmentsError = validateUsersOrDepartments(lead.departments, 'department count')
  if (departmentsError) return departmentsError

  return null
}
