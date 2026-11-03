import { DOCUMENT_GENERATION_REFUSAL } from '../../lib/eveiaChatPrompt'

const FILE_KIND_RE =
  /\b(pptx?|powerpoint|slides?|presentations?|decks?|reports?|proposals?|summar(?:y|ies)|documents?|memos?|briefs?|papers?|spreadsheets?|pdfs?|essays?|letters?|white\s*papers?|templates?|contracts?|policies|policy|minutes|briefings?|files?|write-?ups?|docx?|xlsx?|xls|csv|excel)\b/i

const GENERATION_VERB_RE =
  /\b(generat(?:e|ing)|creat(?:e|ing)|writ(?:e|ing)|draft(?:ing)?|mak(?:e|ing)|produc(?:e|ing)|prepar(?:e|ing)|compil(?:e|ing)|export(?:ing)?|download(?:ing)?|isulat|gumawa|gawan|gawa)\b/i

function isEveiaCapabilityQuestion(text: string): boolean {
  return (
    /\b(can|does|do|will|how|what)\b[\s\S]{0,80}\b(eveia(?:\.ai)?|the platform|the product)\b[\s\S]{0,80}\b(generat|creat|draft|writ|prepar|produc|summar|pptx|powerpoint|slide)/i.test(
      text,
    ) ||
    /\b(how does eveia|how can eveia|how do(?:es)? eveia|can eveia|does eveia|what (?:reports?|proposals?|summar(?:y|ies))|eveia(?:\.ai)? (?:can|does|will))\b/i.test(
      text,
    )
  )
}

/** True when the visitor is asking this website chat to produce a document or file. */
export function parseDocumentGenerationIntent(text: string): boolean {
  const normalized = text.trim()
  if (!normalized) return false
  if (isEveiaCapabilityQuestion(normalized)) return false

  if (/\b(pptx?|powerpoint|slides?|presentation|deck)\b/i.test(normalized) && GENERATION_VERB_RE.test(normalized)) {
    return true
  }

  if (
    /\b(generate|create|write|draft|make|produce|prepare|compile|export|download)\b[\s\S]{0,100}\b(report|proposal|summar|document|memo|brief|paper|presentation|slide|spreadsheet|pdf|pptx?|ppt|powerpoint|deck|essay|letter|white\s*paper|template|contract|file|minutes|policy|policies|docx?|xlsx?|csv|excel)\b/i.test(
      normalized,
    )
  ) {
    return true
  }

  if (/\b(sample|example|mock|dummy|fake)\s+(report|proposal|summary|document|pdf|pptx?|powerpoint|deck|slides?)\b/i.test(normalized)) {
    return true
  }

  if (
    /\b(give me|gimme|send me|paste|output)\b[\s\S]{0,40}\b(a |an )?(sample |example )?(report|proposal|summar|document|pdf|pptx?|powerpoint|deck|slides?)\b/i.test(
      normalized,
    ) ||
    /\bshow me\b[\s\S]{0,20}\b(a |an )(sample |example )?(report|proposal|summar|document|pdf|pptx?|powerpoint|deck|slides?)\b/i.test(
      normalized,
    )
  ) {
    return true
  }

  if (
    /\b(gawa(?:n)?|gumawa|isulat|i-?generate|generate mo|create mo|write mo|draft mo|gawa ka)\b/i.test(normalized) &&
    FILE_KIND_RE.test(normalized)
  ) {
    return true
  }

  return (
    GENERATION_VERB_RE.test(normalized) &&
    FILE_KIND_RE.test(normalized) &&
    /\b(for me|para sa akin|sakin|please|paki)\b/i.test(normalized)
  )
}

/** True when the hosted agent already produced a downloadable file. */
export function containsGeneratedFileOutput(text: string): boolean {
  const value = text.trim()
  if (!value) return false

  return (
    /uploads\/generated/i.test(value) ||
    /\/api\/v1\/.*\/(?:files?|uploads|generated)\//i.test(value) ||
    /\b(your\s+)?(pptx?|ppt|pdf|docx?|xlsx?|csv|powerpoint|slide deck)\b[\s\S]{0,120}\bis ready\b/i.test(value) ||
    /\bis ready\b[\s\S]{0,80}\.(pptx?|pdf|docx?|xlsx?|csv)\b/i.test(value) ||
    /\[(?:[^\]]+\.)?(pptx?|pdf|docx?|xlsx?|csv)\]\(/i.test(value) ||
    /https?:\/\/[^\s)\]]+\.(pptx?|pdf|docx?|xlsx?|csv)(\?|$)/i.test(value) ||
    /\bdownload\s*:\s*\[[^\]]+\]\(/i.test(value) ||
    /\bdownload(?:_name)?=/i.test(value)
  )
}

export function replaceGeneratedFileReply(text: string): string {
  return containsGeneratedFileOutput(text) ? DOCUMENT_GENERATION_REFUSAL : text
}
