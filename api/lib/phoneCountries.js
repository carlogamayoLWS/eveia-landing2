export const PHONE_COUNTRIES = [
  { iso: 'PH', name: 'Philippines', dial: '63', min: 10, max: 10, placeholder: '917 123 4567', stripLeadingZero: true },
  { iso: 'US', name: 'United States', dial: '1', min: 10, max: 10, placeholder: '201 555 0123', stripLeadingZero: false },
  { iso: 'CA', name: 'Canada', dial: '1', min: 10, max: 10, placeholder: '416 555 0123', stripLeadingZero: false },
  { iso: 'GB', name: 'United Kingdom', dial: '44', min: 10, max: 10, placeholder: '7400 123456', stripLeadingZero: true },
  { iso: 'AU', name: 'Australia', dial: '61', min: 9, max: 9, placeholder: '412 345 678', stripLeadingZero: true },
  { iso: 'NZ', name: 'New Zealand', dial: '64', min: 8, max: 10, placeholder: '21 123 4567', stripLeadingZero: true },
  { iso: 'SG', name: 'Singapore', dial: '65', min: 8, max: 8, placeholder: '8123 4567', stripLeadingZero: false },
  { iso: 'MY', name: 'Malaysia', dial: '60', min: 9, max: 10, placeholder: '12 345 6789', stripLeadingZero: true },
  { iso: 'ID', name: 'Indonesia', dial: '62', min: 9, max: 12, placeholder: '812 3456 789', stripLeadingZero: true },
  { iso: 'TH', name: 'Thailand', dial: '66', min: 9, max: 9, placeholder: '81 234 5678', stripLeadingZero: true },
  { iso: 'VN', name: 'Vietnam', dial: '84', min: 9, max: 9, placeholder: '91 234 5678', stripLeadingZero: true },
  { iso: 'HK', name: 'Hong Kong', dial: '852', min: 8, max: 8, placeholder: '5123 4567', stripLeadingZero: false },
  { iso: 'TW', name: 'Taiwan', dial: '886', min: 9, max: 9, placeholder: '912 345 678', stripLeadingZero: true },
  { iso: 'JP', name: 'Japan', dial: '81', min: 10, max: 10, placeholder: '90 1234 5678', stripLeadingZero: true },
  { iso: 'KR', name: 'South Korea', dial: '82', min: 9, max: 10, placeholder: '10 1234 5678', stripLeadingZero: true },
  { iso: 'CN', name: 'China', dial: '86', min: 11, max: 11, placeholder: '131 2345 6789', stripLeadingZero: false },
  { iso: 'IN', name: 'India', dial: '91', min: 10, max: 10, placeholder: '98765 43210', stripLeadingZero: true },
  { iso: 'AE', name: 'United Arab Emirates', dial: '971', min: 9, max: 9, placeholder: '50 123 4567', stripLeadingZero: true },
  { iso: 'SA', name: 'Saudi Arabia', dial: '966', min: 9, max: 9, placeholder: '50 123 4567', stripLeadingZero: true },
  { iso: 'QA', name: 'Qatar', dial: '974', min: 8, max: 8, placeholder: '3312 3456', stripLeadingZero: false },
  { iso: 'DE', name: 'Germany', dial: '49', min: 10, max: 11, placeholder: '151 2345678', stripLeadingZero: true },
  { iso: 'FR', name: 'France', dial: '33', min: 9, max: 9, placeholder: '6 12 34 56 78', stripLeadingZero: true },
  { iso: 'NL', name: 'Netherlands', dial: '31', min: 9, max: 9, placeholder: '6 12345678', stripLeadingZero: true },
  { iso: 'ES', name: 'Spain', dial: '34', min: 9, max: 9, placeholder: '612 345 678', stripLeadingZero: false },
  { iso: 'IT', name: 'Italy', dial: '39', min: 9, max: 10, placeholder: '312 345 6789', stripLeadingZero: false },
  { iso: 'BR', name: 'Brazil', dial: '55', min: 10, max: 11, placeholder: '11 91234 5678', stripLeadingZero: true },
  { iso: 'MX', name: 'Mexico', dial: '52', min: 10, max: 10, placeholder: '55 1234 5678', stripLeadingZero: false },
  { iso: 'IE', name: 'Ireland', dial: '353', min: 9, max: 9, placeholder: '85 123 4567', stripLeadingZero: true },
]

const COUNTRY_BY_ISO = new Map(PHONE_COUNTRIES.map((country) => [country.iso, country]))

export const DEFAULT_PHONE_COUNTRY = 'PH'

export function getPhoneCountry(iso) {
  return COUNTRY_BY_ISO.get(iso) || COUNTRY_BY_ISO.get(DEFAULT_PHONE_COUNTRY)
}

function toNationalDigits(iso, raw) {
  const country = getPhoneCountry(iso)
  let digits = String(raw || '').replace(/\D/g, '')

  if (digits.startsWith(country.dial) && digits.length >= country.dial.length + country.min) {
    digits = digits.slice(country.dial.length)
  }
  if (country.stripLeadingZero && digits.startsWith('0')) {
    digits = digits.slice(1)
  }
  return digits
}

export function sanitizeNationalNumber(iso, raw) {
  const country = getPhoneCountry(iso)
  let digits = String(raw || '').replace(/\D/g, '')

  if (digits.startsWith(country.dial) && digits.length >= country.dial.length + country.min) {
    digits = digits.slice(country.dial.length)
  }

  const maxTyped = country.stripLeadingZero ? country.max + 1 : country.max
  return digits.slice(0, maxTyped)
}

export function formatInternationalPhone(iso, nationalNumber) {
  const country = getPhoneCountry(iso)
  const digits = toNationalDigits(iso, nationalNumber)
  return digits ? `+${country.dial} ${digits}` : ''
}

export function getPhoneError(iso, nationalNumber) {
  const country = getPhoneCountry(iso)
  const digits = toNationalDigits(iso, nationalNumber)

  if (!digits) return 'Please enter a contact number.'
  if (!/^\d+$/.test(digits)) return 'Please enter digits only for your contact number.'
  if (/^(\d)\1+$/.test(digits)) return 'Please enter a real contact number, not a repeated sequence.'
  if (/^(0123456789|1234567890|0987654321|9876543210)/.test(digits)) {
    return 'Please enter a real contact number, not a sequential number.'
  }
  if (digits.length < country.min || digits.length > country.max) {
    if (country.min === country.max) {
      return `Please enter a ${country.min}-digit ${country.name} number (without the +${country.dial} country code).`
    }
    return `Please enter a ${country.min}–${country.max} digit ${country.name} number (without the +${country.dial} country code).`
  }
  if (country.iso === 'PH' && !/^9\d{9}$/.test(digits) && !/^[2-8]\d{7,9}$/.test(digits)) {
    return 'Please enter a valid Philippine mobile number starting with 9, or a valid landline.'
  }
  return null
}
