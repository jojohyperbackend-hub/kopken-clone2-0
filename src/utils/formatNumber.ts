export type SupportedLocale = 'id-ID'

export const formatNumber = (
  value: number,
  locale: SupportedLocale = 'id-ID',
): string => new Intl.NumberFormat(locale).format(value)

export const formatPhoneDisplay = (rawPhone: string): string => {
  const digitsOnly = rawPhone.replace(/\D/g, '')

  if (digitsOnly.length === 0) {
    return rawPhone
  }

  const normalizedDigits = digitsOnly.startsWith('0')
    ? `62${digitsOnly.slice(1)}`
    : digitsOnly

  const countryCode = normalizedDigits.slice(0, 2)
  const remainder = normalizedDigits.slice(2)
  const groups: string[] = []

  for (let index = 0; index < remainder.length; index += 4) {
    groups.push(remainder.slice(index, index + 4))
  }

  return `+${countryCode} ${groups.join('-')}`
}

export const formatWhatsappHref = (rawPhone: string): string => {
  const digitsOnly = rawPhone.replace(/\D/g, '')
  const normalizedDigits = digitsOnly.startsWith('0')
    ? `62${digitsOnly.slice(1)}`
    : digitsOnly

  return `https://wa.me/${normalizedDigits}`
}

export const formatOperatingHoursRange = (
  openTime: string,
  closeTime: string,
): string => `${openTime} – ${closeTime}`

export const formatOrdinalSectionIndex = (index: number): string =>
  String(index).padStart(2, '0')
