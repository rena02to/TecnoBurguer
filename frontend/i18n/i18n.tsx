import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptBRTranslation from './languages/pt.json';
import enTranslation from './languages/en.json';
import esTranslation from './languages/es.json';

i18n.use(initReactI18next).init({
    resources: {
        pt: { translation: ptBRTranslation },
        en: { translation: enTranslation },
        es: { translation: esTranslation },
    },
    lng: 'en'
});

export default i18n;