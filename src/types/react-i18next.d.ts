import 'react-i18next';
import { i18n as I18nInstance, Resource } from 'i18next';

// Étend la définition de react-i18next
declare module 'react-i18next' {
  // Étend les options de i18next
  interface CustomTypeOptions {
    // Retourne la clé au lieu de null
    returnNull: false;
  }

  // Étend la réponse de useTranslation pour définir t comme acceptant une chaîne simple
  export interface UseTranslationResponse {
    t: (key: string) => string;
    i18n: {
      language: string;
      changeLanguage: (lang: string) => Promise<Function>;
    };
    ready: boolean;
  }

  export function useTranslation(): UseTranslationResponse;

  export interface WithTranslationProps {
    i18n?: I18nInstance;
    tReady?: boolean;
  }
} 