import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../i18n';
import '../styles/About.css';
// Les imports d'images sont maintenant gérés par le module declaration

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <section className="hero-about">
        <div className="hero-content container">
          <h1>{t("about.title")}</h1>
          <p className="hero-subtitle">{t("about.subtitle")}</p>
        </div>
      </section>

      <section className="container section">
        <div className="section-header">
          <h2>{t("about.geography.title")}</h2>
          <p>{t("about.subtitle")}</p>
        </div>

        <div className="about-content">
          <div className="about-image-container">
            <img src="/images/kigali.jpg" alt="Panorama de Kigali" className="about-image" />
          </div>
          
          <div className="about-text">
            <h3>{t("about.geography.title")}</h3>
            <p>{t("about.geography.description")}</p>
            
            <h3>{t("about.culture.title")}</h3>
            <p>{t("about.culture.description")}</p>
            
            <h3>{t("about.language.title")}</h3>
            <p>{t("about.language.description")}</p>
          </div>
        </div>
      </section>

      <section className="facts-section section">
        <div className="container">
          <h2 className="text-center">{t("about.facts.title")}</h2>
          
          <div className="facts-grid">
            <div className="fact-card">
              <div className="fact-icon">🦍</div>
              <h3>{t("about.facts.gorillas.title")}</h3>
              <p>{t("about.facts.gorillas.description")}</p>
            </div>
            
            <div className="fact-card">
              <div className="fact-icon">♻️</div>
              <h3>{t("about.facts.ecology.title")}</h3>
              <p>{t("about.facts.ecology.description")}</p>
            </div>
            
            <div className="fact-card">
              <div className="fact-icon">👩‍💼</div>
              <h3>{t("about.facts.women.title")}</h3>
              <p>{t("about.facts.women.description")}</p>
            </div>
            
            <div className="fact-card">
              <div className="fact-icon">☕</div>
              <h3>{t("about.facts.coffee.title")}</h3>
              <p>{t("about.facts.coffee.description")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="visit-section section">
        <div className="container">
          <div className="visit-content">
            <h2>{t("about.visit.title")}</h2>
            <p>{t("about.visit.description1")}</p>
            <p>{t("about.visit.description2")}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 