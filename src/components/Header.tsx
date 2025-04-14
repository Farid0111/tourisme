import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from '../i18n';
import LanguageSelector from './LanguageSelector';
import '../styles/Header.css';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container container">
        <Link to="/" className="logo">
          <span className="logo-icon">🌍</span>
          <span>Découvrez Rwanda</span>
        </Link>

        <div className="nav-container">
          <button 
            className={`menu-toggle ${isOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <nav className={`nav ${isOpen ? 'open' : ''}`}>
            <div className="nav-item">
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                {t("general.home")}
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/activities" className={location.pathname === '/activities' ? 'active' : ''}>
                {t("general.activities")}
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                {t("general.about")}
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                {t("general.contact")}
              </Link>
            </div>
            <div className="nav-item language-selector-container">
              <LanguageSelector />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 