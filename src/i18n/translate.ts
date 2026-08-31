import { es } from './dictionaries/es'
import { en } from './dictionaries/en'

export type Locale = 'es' | 'en'

const dictionaries = { es, en }

function lookup(dict: unknown, path: string[]): unknown {
  return path.reduce<unknown>((acc, key) => (acc as Record<string, unknown> | undefined)?.[key], dict)
}

export function t(locale: Locale, path: string, params?: Record<string, string>): string {
  const parts = path.split('.')
  let value = lookup(dictionaries[locale], parts)
  if (typeof value !== 'string') value = lookup(es, parts)
  let result = typeof value === 'string' ? value : path

  if (params) {
    for (const [key, replacement] of Object.entries(params)) {
      result = result.replace(`{${key}}`, replacement)
    }
  }

  return result
}
