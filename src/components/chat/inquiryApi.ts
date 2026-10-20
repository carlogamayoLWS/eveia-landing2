const INQUIRY_ENDPOINT =
  import.meta.env.VITE_INQUIRY_ENDPOINT?.trim() || '/eveia-api/api/v1/public/inquiries'
export const DEFAULT_INQUIRY_ERROR_MESSAGE = 'Something went wrong while submitting your request. Please try again.'
export const RATE_LIMIT_INQUIRY_ERROR_MESSAGE = 'Too many submissions were sent from this connection. Please wait a minute, then try again.'

export class InquirySubmissionError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'InquirySubmissionError'
    this.status = status
  }
}

export function getInquiryErrorMessage(error: unknown): string {
  if (error instanceof InquirySubmissionError) return error.message
  return DEFAULT_INQUIRY_ERROR_MESSAGE
}

const FIELD_LABELS: Record<string, string> = {
  org_size: 'Organization Size',
  industry: 'Industry',
  use_case: 'Primary Use Case',
  subject: 'Subject',
  source: 'Where They Found Us',
  source_other: 'Where They Found Us - Other',
}

function valueAsString(value: FormDataEntryValue | undefined): string {
  return typeof value === 'string' ? value.trim() : ''
}

function buildMessage(formData: FormData, extraKeys: string[]): string | undefined {
  const directMessage = valueAsString(formData.get('message') ?? undefined)
  const extraLines = extraKeys
    .map((key) => {
      const value = valueAsString(formData.get(key) ?? undefined)
      return value ? `${FIELD_LABELS[key] ?? key}: ${value}` : ''
    })
    .filter(Boolean)

  if (!directMessage && extraLines.length === 0) return undefined
  if (!directMessage) return extraLines.join('\n')
  if (extraLines.length === 0) return directMessage
  return `${directMessage}\n\n${extraLines.join('\n')}`
}

export interface InquiryPayload {
  form_type: string
  name: string
  email: string
  phone?: string
  company?: string
  role?: string
  users?: string
  departments?: string
  message?: string
}

async function postInquiry(payload: InquiryPayload) {
  const response = await fetch(INQUIRY_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    if (response.status === 429) {
      throw new InquirySubmissionError(response.status, RATE_LIMIT_INQUIRY_ERROR_MESSAGE)
    }
    throw new InquirySubmissionError(response.status, DEFAULT_INQUIRY_ERROR_MESSAGE)
  }
}

export async function submitInquiryPayload(payload: InquiryPayload) {
  await postInquiry(payload)
}

export async function submitInquiry(form: HTMLFormElement, formType: string, extraMessageKeys: string[] = []) {
  const formData = new FormData(form)
  const payload: InquiryPayload = {
    form_type: formType,
    name: valueAsString(formData.get('name') ?? undefined),
    email: valueAsString(formData.get('email') ?? undefined),
    phone: valueAsString(formData.get('phone') ?? undefined) || undefined,
    company: valueAsString(formData.get('company') ?? undefined) || undefined,
    role: valueAsString(formData.get('role') ?? undefined) || undefined,
    users: valueAsString(formData.get('users') ?? undefined) || valueAsString(formData.get('org_size') ?? undefined) || undefined,
    departments: valueAsString(formData.get('departments') ?? undefined) || undefined,
    message: buildMessage(formData, extraMessageKeys),
  }

  await postInquiry(payload)
}
