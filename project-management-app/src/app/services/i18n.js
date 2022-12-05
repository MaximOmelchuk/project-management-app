import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { HeaderText, searchPageText, WelcomePageText } from '../constants/translation';
import { RegistrationText, AuthText, EditUser } from '../components/AuthForm/content'
import { messageValidation } from '../utils/validation'
import { confirmModalContent } from '../components/ConfirmModal/content'
import { mainPageContent } from '../components/MainPage/content';
import { inputModalContent } from '../components/InputModal/content';
import { boardPageContent } from '../components/BoardPage/content';
import { boardContent } from '../components/Board/content';
import { columnContent } from '../components/Column/content';
import { taskContent } from '../components/Task/content';
import { editTaskContent } from '../components/EditTaskModal/content';
import { actionMessage } from '../constants/errorTranslate'

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
      mainPageContent: mainPageContent.en,
      inputModalContent: inputModalContent.en,
      boardPageContent: boardPageContent.en,
      boardContent: boardContent.en,
      columnContent: columnContent.en,
      taskContent: taskContent.en,
      editTaskContent: editTaskContent.en,
      actionMessage: actionMessage.en,
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
      mainPageContent: mainPageContent.ru,
      inputModalContent: inputModalContent.ru,
      boardPageContent: boardPageContent.ru,
      boardContent: boardContent.ru,
      columnContent: columnContent.ru,
      taskContent: taskContent.ru,
      editTaskContent: editTaskContent.ru,
      actionMessage: actionMessage.ru,
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
