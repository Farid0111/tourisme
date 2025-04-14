import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Tourisme Rwanda</h3>
            <p>Découvrez la beauté exceptionnelle du Rwanda, terre des mille collines.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <i className="social-icon facebook">FB</i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="social-icon twitter">TW</i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="social-icon instagram">IG</i>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Liens Rapides</h3>
            <ul className="footer-links">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/activities">Activités</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact</h3>
            <address>
              <p>Kigali, Rwanda</p>
              <p>Email: info@tourisme-rwanda.com</p>
              <p>Téléphone: +250 123 456 789</p>
            </address>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="legal-links">
            <Link to="/legal/terms">Conditions d'utilisation</Link>
            <Link to="/legal/privacy">Politique de confidentialité</Link>
          </div>
          <p className="copyright">
            &copy; {currentYear} Tourisme Rwanda. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 