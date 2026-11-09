export {
  CONTACT_REQUIRED_ERROR,
  EMAIL_FORMAT_ERROR,
  PROFANITY_ERROR,
  UNSAFE_INPUT_ERROR,
  WORK_EMAIL_ERROR,
  containsFoulLanguage,
  containsUnsafeInput,
  getWorkEmailError,
  isValidEmail,
  validateContactFields,
} from '../../api/lib/contactValidation.js'

export {
  DEFAULT_PHONE_COUNTRY,
  PHONE_COUNTRIES,
  formatInternationalPhone,
  getPhoneCountry,
  getPhoneError,
  sanitizeNationalNumber,
} from '../../api/lib/phoneCountries.js'
