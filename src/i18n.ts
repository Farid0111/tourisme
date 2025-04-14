// Ce fichier sert de point d'entrée/wrapper pour les traductions
// Il corrige les problèmes de TypeScript liés à useTranslation

import 'react-i18next';
import i18n from './utils/i18n';

// Créer un wrapper qui contourne les problèmes de typage TypeScript
export function useTranslation() {
  return {
    t: (key: any) => {
      try {
        // @ts-ignore - Ignorer les erreurs de type, car on veut permettre l'utilisation simple
        return i18n.t(key) || key;
      } catch (error) {
        console.error('Error in translation:', error);
        return key; // Fallback à la clé elle-même
      }
    },
    i18n
  };
}

export default i18n; 