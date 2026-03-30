import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ptTranslations from './pt.json';
import enTranslations from './en.json';

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      pt: { translation: ptTranslations },
      en: { translation: enTranslations },
    },
    lng: 'pt', 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;