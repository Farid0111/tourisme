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
            <h3>Tourism Rwanda</h3>
            <p>Discover the exceptional beauty of Rwanda, land of a thousand hills.</p>
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
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/activities">Activities</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact</h3>
            <address>
              <p>Kigali, Rwanda</p>
              <p>Email: info@tourism-rwanda.com</p>
              <p>Phone: +250 123 456 789</p>
            </address>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="legal-links">
            <Link to="/legal/terms">Terms of Use</Link>
            <Link to="/legal/privacy">Privacy Policy</Link>
          </div>
          <p className="copyright">
            &copy; {currentYear} Tourism Rwanda. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 