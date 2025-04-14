import React from 'react';
import { useTranslation } from '../i18n';
import '../styles/LanguageSelector.css';

// Liste des langues disponibles
const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' }
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  
  // Changer la langue
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  // Langue actuellement sélectionnée
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  
  return (
    <div className="language-selector">
      <div className="language-selector-current">
        <span className="language-flag">{currentLanguage.flag}</span>
        <span className="language-name">{currentLanguage.name}</span>
      </div>
      <div className="language-selector-dropdown">
        {languages.map(language => (
          <button
            key={language.code}
            className={`language-option ${language.code === i18n.language ? 'active' : ''}`}
            onClick={() => changeLanguage(language.code)}
          >
            <span className="language-flag">{language.flag}</span>
            <span className="language-name">{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector; 