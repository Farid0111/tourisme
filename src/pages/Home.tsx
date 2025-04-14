import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/Home.css';

const Home: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content container">
          <h1>{t('home.hero.title')}</h1>
          <p className="hero-subtitle">{t('home.hero.subtitle')}</p>
          <Link to="/activities" className="btn btn-primary hero-cta">{t('home.hero.cta')}</Link>
        </div>
      </section>
      
      <section className="highlights container section">
        <div className="section-header">
          <h2>{t('home.highlights.title')}</h2>
          <p>{t('home.highlights.subtitle')}</p>
        </div>
        
        <div className="grid highlights-grid">
          <div className="card highlight-card">
            <div className="card-image-container">
              <img src="/images/gorilla.jpg" alt="Gorilles des montagnes" className="card-image" />
            </div>
            <div className="card-content">
              <h3>Gorilles des Montagnes</h3>
              <p>Partez à la rencontre des gorilles des montagnes dans le parc national des volcans.</p>
              <Link to="/activities" className="btn btn-secondary">{t('activities.learnMore')}</Link>
            </div>
          </div>
          
          <div className="card highlight-card">
            <div className="card-image-container">
              <img src="/images/lake.jpg" alt="Lac Kivu" className="card-image" />
            </div>
            <div className="card-content">
              <h3>Lac Kivu</h3>
              <p>Détendez-vous sur les plages du magnifique lac Kivu et profitez de ses eaux paisibles.</p>
              <Link to="/activities" className="btn btn-secondary">{t('activities.learnMore')}</Link>
            </div>
          </div>
          
          <div className="card highlight-card">
            <div className="card-image-container">
              <img src="/images/kigali.jpg" alt="Culture rwandaise" className="card-image" />
            </div>
            <div className="card-content">
              <h3>Culture et Tradition</h3>
              <p>Immergez-vous dans la riche culture rwandaise à travers ses danses, sa musique et son artisanat.</p>
              <Link to="/activities" className="btn btn-secondary">{t('activities.learnMore')}</Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="why-rwanda section">
        <div className="container">
          <div className="section-header text-center">
            <h2>{t('home.whyRwanda.title')}</h2>
            <p>{t('home.whyRwanda.subtitle')}</p>
          </div>
          
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">
                <span>🦍</span>
              </div>
              <h3>{t('home.features.biodiversity.title')}</h3>
              <p>{t('home.features.biodiversity.description')}</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <span>🏞️</span>
              </div>
              <h3>{t('home.features.landscapes.title')}</h3>
              <p>{t('home.features.landscapes.description')}</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <span>🏙️</span>
              </div>
              <h3>{t('home.features.kigali.title')}</h3>
              <p>{t('home.features.kigali.description')}</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <span>🧑‍🤝‍🧑</span>
              </div>
              <h3>{t('home.features.people.title')}</h3>
              <p>{t('home.features.people.description')}</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="cta-section section">
        <div className="container">
          <div className="cta-content">
            <h2>{t('home.cta.title')}</h2>
            <p>{t('home.cta.subtitle')}</p>
            <Link to="/contact" className="btn btn-primary cta-button">{t('home.cta.button')}</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 