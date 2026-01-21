import { createIsomorphicFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import enTranslations from '../locales/en.json'
import thTranslations from '../locales/th.json'

export const resources = {
  en: {
    translation: enTranslations,
  },
  th: {
    translation: thTranslations,
  },
} as const

const i18nCookieName = 'OPH68CULng'

const isServer = typeof window === 'undefined'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'th'],
    detection: {
      order: ['cookie'],
      lookupCookie: i18nCookieName,
      caches: ['cookie'],
      cookieMinutes: 60 * 24 * 365,
    },
    interpolation: { escapeValue: false },
    react: {
      useSuspense: false,
    },
  })

export const setSSRLanguage = createIsomorphicFn().server(async () => {
  const language = getCookie(i18nCookieName)
  await i18n.changeLanguage(language || 'en')
})

if (!isServer) {
  const browserLanguage = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${i18nCookieName}=`))
    ?.split('=')[1]

  if (browserLanguage) {
    i18n.changeLanguage(browserLanguage)
  }
}

export default i18n
