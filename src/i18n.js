import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import sq from './locales/sq.json';

i18n
  .use(initReactI18next) 
  .init({
    compatibilityJSON: 'v3', // <--- add this line
    resources: {
      en: { translation: en },
      sq: { translation: sq },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
