import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo-container">
            <img src="/images/logo.png" alt="Visit Rwanda Logo" className="logo" />
          </Link>
          
          <div className={`navigation ${isMenuOpen ? 'open' : ''}`}>
            <motion.nav 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                Home
              </NavLink>
              <NavLink to="/activities" className={({ isActive }) => isActive ? 'active' : ''}>
                Activities
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                About
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
                Contact
              </NavLink>
            </motion.nav>
          </div>

          <div className="menu-icon" onClick={toggleMenu}>
            <div className={`menu-line ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`menu-line ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`menu-line ${isMenuOpen ? 'open' : ''}`}></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 