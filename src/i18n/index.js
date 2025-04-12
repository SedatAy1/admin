import { createI18n } from 'vue-i18n'
import tr from './locales/tr.json'
import en from './locales/en.json'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'tr', // varsayılan dil
  fallbackLocale: 'tr',
  messages: {
    tr,
    en
  }
})

export default i18n