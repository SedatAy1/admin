import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'
import de from './locales/de.json'

export default createI18n({
  legacy: false,
  locale: 'en', // veya 'tr'
  fallbackLocale: 'en',
  messages: {
    en,
    fr,
    de
  }
})