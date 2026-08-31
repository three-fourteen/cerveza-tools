import { t, type Locale } from '../i18n'

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
export function numberWithCommas(x: number | string): string {
  return new Intl.NumberFormat('en-EN').format(Number(x))
}

// Unformat price from $ 50,000 -> 50000
export function numberWithoutCommas(x: string): string {
  return (x + '').replace(/(?:\$ )|,/g, '')
}

export function checkVal(val: string, fieldKey: string, locale: Locale = 'es'): true {
  if (val.length === 0 || isNaN(parseFloat(val.toString().replace(',', '.')))) {
    throw new Error(t(locale, 'errors.invalidField', { field: t(locale, `fields.${fieldKey}`) }))
  }
  return true
}

export function parseFloatEx(value: string | number): number {
  return parseFloat(value.toString().replace(',', '.'))
}

export function round(number: number, off: number): string {
  const i = Math.pow(10, off)
  return (Math.round(number * i) / i).toFixed(off).replace('.', ',')
}
