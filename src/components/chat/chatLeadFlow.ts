import {
  validateCompany,
  validateFullName,
  validateLeadForSubmit,
  validateOptionalUseCase,
  validatePhone,
  validateRole,
  validateUsersOrDepartments,
  validateWorkEmail,
} from './chatFieldValidation'
import { getInquiryErrorMessage, submitInquiryPayload } from './inquiryApi'

export const WELCOME_MESSAGE = "Hi, I'm Eve. Ask me what Eveia.AI can do for your team."
export const CHAT_LEAD_STATE_KEY = 'eveia:chat-lead-state'

export type FlowMode = 'idle' | 'demo' | 'pricing'

export interface PersistedChatMsg {
  role: 'assistant' | 'user'
  text: string
  /** lead = local form flow (not sent to Eveia chat API); chat = free AI conversation */
  source?: 'lead' | 'chat'
}

export interface PersistedChatState {
  msgs: PersistedChatMsg[]
  phase: LeadPhase
  lead: LeadData
  flowMode: FlowMode
  hasSubmittedDemo?: boolean
}

export type LeadPhase =
  | 'idle'
  | 'collecting_name'
  | 'collecting_email'
  | 'collecting_phone'
  | 'collecting_company'
  | 'collecting_role'
  | 'collecting_users'
  | 'collecting_industry'
  | 'collecting_org_size'
  | 'collecting_departments'
  | 'collecting_use_case'
  | 'submitting'
  | 'submit_failed'
  | 'done'

export interface LeadData {
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

export const EMPTY_LEAD_DATA: LeadData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  role: '',
  users: '',
  industry: '',
  org_size: '',
  departments: '',
  use_case: '',
}

export const INDUSTRY_OPTIONS = [
  'Technology',
  'Healthcare',
  'Government / Public Sector',
  'Finance & Banking',
  'Manufacturing',
  'Education',
  'Retail & Consumer',
  'Legal',
  'Energy & Utilities',
  'Other',
] as const

export const ORG_SIZE_OPTIONS = [
  'Under 50',
  '50 – 100',
  '100 – 250',
  '250 – 500',
  '500 – 1,000',
  '1,000+',
] as const

type FieldDef = {
  phase: LeadPhase
  key: keyof LeadData
  prompt: string
  error?: string
  optional?: boolean
  options?: readonly string[]
}

const DEMO_FIELD_ORDER: FieldDef[] = [
  { phase: 'collecting_name', key: 'name', prompt: "Great! What's your full name?" },
  {
    phase: 'collecting_email',
    key: 'email',
    prompt: 'Thanks. What email should our team use to reach you?',
    error: 'Please enter a valid email address (e.g. you@company.com).',
  },
  { phase: 'collecting_phone', key: 'phone', prompt: "What's your phone number?" },
  { phase: 'collecting_company', key: 'company', prompt: "What's your company name?" },
  { phase: 'collecting_role', key: 'role', prompt: "What's your role?" },
  {
    phase: 'collecting_users',
    key: 'users',
    prompt: 'How many possible users would Eveia.AI have in your organization?',
  },
  {
    phase: 'collecting_departments',
    key: 'departments',
    prompt: 'How many departments would be involved?',
  },
]

const PRICING_FIELD_ORDER: FieldDef[] = [
  { phase: 'collecting_name', key: 'name', prompt: "Great! What's your full name?" },
  {
    phase: 'collecting_email',
    key: 'email',
    prompt: 'Thanks. What work email should our team use?',
    error: 'Please enter a valid email address (e.g. you@company.com).',
  },
  { phase: 'collecting_phone', key: 'phone', prompt: "What's your phone number?" },
  { phase: 'collecting_company', key: 'company', prompt: "What's your company name?" },
  { phase: 'collecting_role', key: 'role', prompt: "What's your role? (e.g. CTO, VP of Operations)" },
  {
    phase: 'collecting_industry',
    key: 'industry',
    prompt: 'What industry are you in?',
  },
  {
    phase: 'collecting_org_size',
    key: 'org_size',
    prompt: `What's your organization size? Choose one: ${ORG_SIZE_OPTIONS.join(', ')}`,
    error: `Please choose one of: ${ORG_SIZE_OPTIONS.join(', ')}`,
    options: ORG_SIZE_OPTIONS,
  },
  {
    phase: 'collecting_departments',
    key: 'departments',
    prompt: 'How many departments would be involved?',
  },
  {
    phase: 'collecting_use_case',
    key: 'use_case',
    prompt:
      "What's your primary use case? (optional: describe workflows or data challenges, or type skip)",
    optional: true,
  },
]

export function getFieldForPhase(mode: FlowMode, phase: LeadPhase): FieldDef | null {
  return fieldOrderFor(mode).find((f) => f.phase === phase) ?? null
}

const NO_RE = /^(no|n|hindi|not right now|not now|no thanks|maybe later|skip|none|n\/a|-)$/i

function fieldOrderFor(mode: FlowMode): FieldDef[] {
  if (mode === 'demo') return DEMO_FIELD_ORDER
  if (mode === 'pricing') return PRICING_FIELD_ORDER
  return []
}

function normalizeChoice(value: string, options: readonly string[]): string | null {
  const trimmed = value.trim().toLowerCase()
  const exact = options.find((o) => o.toLowerCase() === trimmed)
  if (exact) return exact

  const partial = options.find(
    (o) => o.toLowerCase().includes(trimmed) || trimmed.includes(o.toLowerCase()),
  )
  return partial ?? null
}

export function resetChatLeadStorage(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(CHAT_LEAD_STATE_KEY)
  } catch {
    // ignore
  }
}

export function createInitialMessages(): PersistedChatMsg[] {
  return [{ role: 'assistant', text: WELCOME_MESSAGE, source: 'chat' }]
}

export function createFreshChatState(): PersistedChatState {
  return {
    msgs: createInitialMessages(),
    phase: 'idle',
    lead: EMPTY_LEAD_DATA,
    flowMode: 'idle',
  }
}

export function loadChatState(): PersistedChatState {
  if (typeof window === 'undefined') return createFreshChatState()
  try {
    const raw = window.localStorage.getItem(CHAT_LEAD_STATE_KEY)
    if (!raw) return createFreshChatState()
    const parsed = JSON.parse(raw) as Partial<PersistedChatState>
    if (!Array.isArray(parsed.msgs) || parsed.msgs.length === 0) return createFreshChatState()
    return {
      msgs: parsed.msgs.filter(
        (m): m is PersistedChatMsg =>
          !!m && (m.role === 'assistant' || m.role === 'user') && typeof m.text === 'string',
      ),
      phase: typeof parsed.phase === 'string' ? (parsed.phase as LeadPhase) : 'idle',
      lead: { ...EMPTY_LEAD_DATA, ...(parsed.lead ?? {}) },
      flowMode:
        parsed.flowMode === 'demo' || parsed.flowMode === 'pricing' || parsed.flowMode === 'idle'
          ? parsed.flowMode
          : 'idle',
      hasSubmittedDemo: parsed.hasSubmittedDemo === true,
    }
  } catch {
    return createFreshChatState()
  }
}

export function saveChatState(state: PersistedChatState): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(CHAT_LEAD_STATE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

export function parsePricingIntent(text: string): boolean {
  const normalized = text.trim()
  if (!normalized) return false
  return /\b(pric(e|ing)|cost|rate|rates|how\s+much|quote|quotation|plan\s+cost|subscription)\b/i.test(
    normalized,
  )
}

export function parseBookingIntent(text: string): boolean {
  const normalized = text.trim()
  if (!normalized) return false
  if (NO_RE.test(normalized)) return false

  return (
    /\b(book\s+again|book\s+a?\s*(?:private\s+)?demo|booking|private\s+demo|schedule\s+a?\s*demo|request\s+a?\s*demo)\b/i.test(
      normalized,
    ) ||
    /\b(where|how)\s+(?:can|do)\s+i\s+book\b/i.test(normalized) ||
    /\bcan\s+i\s+book\b/i.test(normalized)
  )
}

function validateField(mode: FlowMode, phase: LeadPhase, value: string): string | null {
  const fields = fieldOrderFor(mode)
  const field = fields.find((f) => f.phase === phase)
  if (!field) return 'Please enter a value to continue.'

  const trimmed = value.trim()
  if (!trimmed) {
    if (field.optional) return null
    return 'Please enter a value to continue.'
  }

  if (field.optional && NO_RE.test(trimmed)) return null

  switch (phase) {
    case 'collecting_name':
      return validateFullName(trimmed)
    case 'collecting_email':
      return validateWorkEmail(trimmed)
    case 'collecting_phone':
      return validatePhone(trimmed)
    case 'collecting_company':
      return validateCompany(trimmed)
    case 'collecting_role':
      return validateRole(trimmed)
    case 'collecting_users':
      return validateUsersOrDepartments(trimmed, 'user count')
    case 'collecting_departments':
      return validateUsersOrDepartments(trimmed, 'department count')
    case 'collecting_org_size':
      if (!normalizeChoice(trimmed, ORG_SIZE_OPTIONS)) {
        return field.error ?? 'Please choose a valid organization size.'
      }
      return null
    case 'collecting_use_case':
      return validateOptionalUseCase(trimmed)
    case 'collecting_industry':
      return null
    default:
      return null
  }
}

function normalizeFieldValue(phase: LeadPhase, value: string, optional?: boolean): string {
  const trimmed = value.trim()
  if (optional && (!trimmed || NO_RE.test(trimmed))) return ''

  if (phase === 'collecting_industry') {
    return normalizeChoice(trimmed, INDUSTRY_OPTIONS) ?? trimmed
  }
  if (phase === 'collecting_org_size') {
    return normalizeChoice(trimmed, ORG_SIZE_OPTIONS) ?? trimmed
  }
  return trimmed
}

function nextCollectingPhase(mode: FlowMode, current: LeadPhase, lead: LeadData): LeadPhase {
  const fields = fieldOrderFor(mode)
  const idx = fields.findIndex((f) => f.phase === current)
  if (idx < 0) return 'submitting'
  for (let i = idx + 1; i < fields.length; i++) {
    if (!lead[fields[i].key].trim()) {
      return fields[i].phase
    }
  }
  return 'submitting'
}

function promptForPhase(mode: FlowMode, phase: LeadPhase): string | null {
  return fieldOrderFor(mode).find((f) => f.phase === phase)?.prompt ?? null
}

export interface LeadFlowResult {
  phase: LeadPhase
  lead: LeadData
  flowMode: FlowMode
  assistantMessages: string[]
  userEcho?: string
}

function findFirstMissing(mode: FlowMode, lead: LeadData): { phase: LeadPhase; prompt: string } | null {
  const fields = fieldOrderFor(mode)
  for (const field of fields) {
    if (!lead[field.key].trim()) {
      return { phase: field.phase, prompt: field.prompt }
    }
  }
  return null
}

export function startDemoFlow(existingLead: LeadData = EMPTY_LEAD_DATA): { phase: LeadPhase; lead: LeadData; flowMode: FlowMode; assistantMessages: string[] } {
  const firstMissing = findFirstMissing('demo', existingLead)
  if (!firstMissing) {
    return {
      phase: 'submitting',
      lead: { ...existingLead },
      flowMode: 'demo',
      assistantMessages: ["Sending your details to our team now..."],
    }
  }
  return {
    phase: firstMissing.phase,
    lead: { ...existingLead },
    flowMode: 'demo',
    assistantMessages: [
      "Let's book a private demo. I'll ask a few quick questions.",
      firstMissing.prompt,
    ],
  }
}

export function startPricingFlow(existingLead: LeadData = EMPTY_LEAD_DATA): {
  phase: LeadPhase
  lead: LeadData
  flowMode: FlowMode
  assistantMessages: string[]
} {
  const firstMissing = findFirstMissing('pricing', existingLead)
  if (!firstMissing) {
    return {
      phase: 'submitting',
      lead: { ...existingLead },
      flowMode: 'pricing',
      assistantMessages: ["Sending your details to our team now..."],
    }
  }
  return {
    phase: firstMissing.phase,
    lead: { ...existingLead },
    flowMode: 'pricing',
    assistantMessages: [
      "I'd be happy to help with pricing. I'll collect a few details and a member of our team will get back to you with the appropriate pricing for your organization.",
      firstMissing.prompt,
    ],
  }
}

export function cancelActiveFlow(flowMode: FlowMode): {
  phase: LeadPhase
  lead: LeadData
  flowMode: FlowMode
  assistantMessages: string[]
} {
  const label = flowMode === 'pricing' ? 'pricing request' : 'private demo'
  return {
    phase: 'idle',
    lead: EMPTY_LEAD_DATA,
    flowMode: 'idle',
    assistantMessages: [`Okay, I cancelled the ${label}. Feel free to keep chatting anytime.`],
  }
}

export function handleLeadInput(
  phase: LeadPhase,
  lead: LeadData,
  flowMode: FlowMode,
  userText: string,
): LeadFlowResult {
  const trimmed = userText.trim()
  if (flowMode === 'idle') {
    return { phase, lead, flowMode, assistantMessages: [] }
  }

  const fields = fieldOrderFor(flowMode)
  const field = fields.find((f) => f.phase === phase)
  if (!field) {
    return { phase, lead, flowMode, assistantMessages: [] }
  }

  const validationError = validateField(flowMode, phase, trimmed)
  if (validationError) {
    return {
      phase,
      lead,
      flowMode,
      userEcho: trimmed,
      assistantMessages: [validationError, field.prompt],
    }
  }

  const updatedLead = {
    ...lead,
    [field.key]: normalizeFieldValue(phase, trimmed, field.optional),
  }
  const nextPhase = nextCollectingPhase(flowMode, phase, updatedLead)

  if (nextPhase === 'submitting') {
    return {
      phase: 'submitting',
      lead: updatedLead,
      flowMode,
      userEcho: trimmed,
      assistantMessages: ['Thanks! Sending your details to our team now...'],
    }
  }

  return {
    phase: nextPhase,
    lead: updatedLead,
    flowMode,
    userEcho: trimmed,
    assistantMessages: [promptForPhase(flowMode, nextPhase)!],
  }
}

export async function submitLead(
  lead: LeadData,
  flowMode: FlowMode,
): Promise<{ success: boolean; message: string }> {
  const guardError = validateLeadForSubmit(lead, flowMode)
  if (guardError) {
    return { success: false, message: guardError }
  }

  try {
    if (flowMode === 'pricing') {
      const extras = [
        `Industry: ${lead.industry}`,
        `Organization size: ${lead.org_size}`,
        lead.use_case ? `Primary use case: ${lead.use_case}` : null,
      ]
        .filter(Boolean)
        .join('\n')

      await submitInquiryPayload({
        form_type: 'pricing',
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        role: lead.role,
        departments: lead.departments,
        message: `Pricing request via chat assistant.\n\n${extras}`,
      })
      return {
        success: true,
        message:
          "Thank you for requesting pricing information. We'll prepare the best pricing options for your organization and reach out soon. Feel free to keep chatting anytime.",
      }
    }

    await submitInquiryPayload({
      form_type: 'demo',
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      role: lead.role,
      users: lead.users,
      departments: lead.departments,
      message: 'Private demo booking requested via chat assistant.',
    })
    return {
      success: true,
      message:
        'Thank you! Your private demo request has been received. Our team will contact you shortly to schedule a session. In the meantime, feel free to ask me anything.',
    }
  } catch (error) {
    return {
      success: false,
      message: getInquiryErrorMessage(error),
    }
  }
}

export function isLeadFlowActive(flowMode: FlowMode, phase: LeadPhase): boolean {
  return (
    (flowMode === 'demo' || flowMode === 'pricing') &&
    phase !== 'idle' &&
    phase !== 'done'
  )
}

export function isCollectingDetails(flowMode: FlowMode, phase: LeadPhase): boolean {
  return isLeadFlowActive(flowMode, phase) && phase !== 'submitting'
}

export function shouldRetrySubmit(phase: LeadPhase): boolean {
  return phase === 'submit_failed'
}
