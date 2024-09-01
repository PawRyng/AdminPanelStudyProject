import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './Languages/en/translation.json';
import plTranslations from './Languages/pl/translation.json';

const setLanguageFromLocalStorage = () => {
  const storedLanguage = localStorage.getItem('language') || 'en'; 
  return storedLanguage;
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      pl: {
        translation: plTranslations
      }
    },
    lng: setLanguageFromLocalStorage(), 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
