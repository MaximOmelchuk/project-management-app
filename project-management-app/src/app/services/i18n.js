import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { HeaderText, searchPageText, WelcomePageText } from '../constants/translation';
import { RegistrationText, AuthText, EditUser } from '../components/AuthForm/content'
import { messageValidation } from '../utils/validation'
import { confirmModalContent } from '../components/ConfirmModal/content'

const DETECTION_OPTIONS = {
  order: ['localStorage']
};

const resources = {
  en: {
    translation: {
      header: HeaderText.en,
      welcome: WelcomePageText.en,
      search: searchPageText.en,
      authorization: AuthText.en,
      registration: RegistrationText.en,
      editUser: EditUser.en,
      errorsForm: messageValidation.en,
      confirmModalContent: confirmModalContent.en,
    }
  },
  ru: {
    translation: {
      header: HeaderText.ru,
      welcome: WelcomePageText.ru,
      search: searchPageText.ru,
      authorization: AuthText.ru,
      registration: RegistrationText.ru,
      editUser: EditUser.ru,
      errorsForm: messageValidation.ru,
      confirmModalContent: confirmModalContent.ru,
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
