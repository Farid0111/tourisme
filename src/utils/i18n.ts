import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import des fichiers de traduction
import translationEN from '../translations/en.json';
import translationFR from '../translations/fr.json';

// Les ressources contenant les traductions
const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  }
};

// Déclaration pour autoriser l'utilisation des clés de traduction
declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
    resources: {
      translation: {
        [key: string]: any;
      };
    };
  }
}

// Déterminer si nous sommes en mode développement
const isDevelopment = typeof window !== 'undefined' && 
                      window.location.hostname === 'localhost';

i18n
  // Détecter la langue du navigateur
  .use(LanguageDetector)
  // Passer le module i18n à react-i18next
  .use(initReactI18next)
  // Initialiser i18next
  .init({
    resources,
    fallbackLng: 'fr', // Langue par défaut
    defaultNS: 'translation',
    ns: ['translation'],
    debug: isDevelopment, // Activer le débogage en mode développement uniquement
    interpolation: {
      escapeValue: false // Pas besoin d'échapper les valeurs avec React
    },
    detection: {
      order: ['localStorage', 'navigator'], // Ordre de détection
      caches: ['localStorage'] // Stockage de la langue choisie
    },
    react: {
      useSuspense: false
    }
  });

export default i18n; 