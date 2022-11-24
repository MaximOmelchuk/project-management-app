import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { HeaderText, searchPageText, WelcomePageText } from '../constants/translation';

const DETECTION_OPTIONS = {
  order: ['localStorage']
};

const resources = {
  en: {
    translation: {
      header: HeaderText.en,
      welcome: WelcomePageText.en,
      search: searchPageText.en,
    }
  },
  ru: {
    translation: {
      header: HeaderText.ru,
      welcome: WelcomePageText.ru,
      search: searchPageText.ru,
    }
  }
};

i18n.use(LanguageDetector)
.use(initReactI18next)
.init({
  detection: DETECTION_OPTIONS,
  resources,
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false
  }
});

export default i18n;
