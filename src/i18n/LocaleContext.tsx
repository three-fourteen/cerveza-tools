import React, { createContext, useContext } from 'react'
import type { Locale } from './translate'

const LocaleContext = createContext<Locale>('es')

interface LocaleProviderProps {
  locale: Locale
  children: React.ReactNode
}

export function LocaleProvider({ locale, children }: LocaleProviderProps) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

export function useLocale(): Locale {
  return useContext(LocaleContext)
}
