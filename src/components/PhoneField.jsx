import { PHONE_COUNTRIES, getPhoneCountry, sanitizeNationalNumber } from '../lib/contactValidation'

export function PhoneField({
  id = 'contact-phone',
  country,
  nationalNumber,
  onCountryChange,
  onNumberChange,
  disabled = false,
  className = '',
}) {
  const meta = getPhoneCountry(country)

  return (
    <div className={`phone-field ${className}`.trim()}>
      <label className="phone-field__country-label" htmlFor={`${id}-country`}>
        <span className="sr-only">Country code</span>
        <select
          id={`${id}-country`}
          name="phoneCountry"
          className="phone-field__country"
          value={country}
          disabled={disabled}
          onChange={(event) => {
            onCountryChange(event.target.value)
            onNumberChange(sanitizeNationalNumber(event.target.value, nationalNumber))
          }}
          aria-label="Country code"
        >
          {PHONE_COUNTRIES.map((item) => (
            <option key={item.iso} value={item.iso}>
              {item.iso} +{item.dial}
            </option>
          ))}
        </select>
      </label>
      <input
        id={id}
        type="tel"
        name="phone"
        inputMode="numeric"
        autoComplete="tel-national"
        className="phone-field__number"
        placeholder={meta.placeholder}
        maxLength={meta.stripLeadingZero ? meta.max + 1 : meta.max}
        value={nationalNumber}
        disabled={disabled}
        onChange={(event) => onNumberChange(sanitizeNationalNumber(country, event.target.value))}
        required
        aria-label="Contact number"
      />
    </div>
  )
}
