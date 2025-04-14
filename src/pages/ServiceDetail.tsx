import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from '../i18n';
import { BsCalendarWeek, BsGeoAlt, BsCashCoin, BsCheck, BsX } from 'react-icons/bs';
import { FaShoppingCart, FaChevronRight, FaUtensils, FaBed, FaBus } from 'react-icons/fa';

import Reviews from '../components/Reviews';
import { activitiesData } from '../utils/activitiesData';
import ImageGallery from '../components/ImageGallery';
import '../styles/ServiceDetail.css';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const reviewsRef = useRef<HTMLDivElement>(null);
  
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [showAddToCartConfirmation, setShowAddToCartConfirmation] = useState(false);
  
  // Find the activity with the given ID
  const activity = activitiesData.find(a => a.id === Number(id));
  
  // If activity not found, redirect to activities page
  useEffect(() => {
    if (!activity) {
      navigate('/activities');
    }
  }, [activity, navigate]);
  
  // If activity is undefined, don't render anything
  if (!activity) return null;
  
  // Prepare images for gallery
  const galleryImages = activity.images
    .filter(img => img)
    .map(img => ({
      original: `/images/${img}`,
      thumbnail: `/images/${img}`,
    }));
  
  // Function to scroll to reviews section
  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Function to order activity
  const handleOrder = () => {
    setShowOrderConfirmation(true);
    
    // Hide order confirmation after 3 seconds
    setTimeout(() => {
      setShowOrderConfirmation(false);
    }, 3000);
  };
  
  // Function to add to cart
  const handleAddToCart = () => {
    setShowAddToCartConfirmation(true);
    
    // Hide cart confirmation after 3 seconds
    setTimeout(() => {
      setShowAddToCartConfirmation(false);
    }, 3000);
  };

  return (
    <motion.div 
      className="service-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="service-detail-container">
        <motion.div 
          className="service-header"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>{activity.title}</h1>
          <div className="activity-meta">
            <div className="meta-item">
              <span>📅</span>
              <span>{activity.duration}</span>
            </div>
            <div className="meta-item">
              <span>📍</span>
              <span>{activity.region}</span>
            </div>
            <div className="meta-item">
              <span>💰</span>
              <span>{activity.price}</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="service-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Main column with gallery and info */}
          <div className="main-column">
            {/* Image gallery */}
            <motion.div 
              className="image-gallery-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ImageGallery images={galleryImages} />
            </motion.div>
            
            {/* Description */}
            <motion.div 
              className="description-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2>{t("activities.description")}</h2>
              <p>{activity.description}</p>
            </motion.div>
            
            {/* Included in activity */}
            <motion.div 
              className="included-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2>{t("activities.included")}</h2>
              <ul className="included-list">
                {activity.included.map((item, index) => (
                  <li key={index}>
                    <span className="icon-check">✓</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Not included */}
            {activity.notIncluded && activity.notIncluded.length > 0 && (
              <motion.div 
                className="not-included-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2>{t("activities.notIncluded")}</h2>
                <ul className="not-included-list">
                  {activity.notIncluded.map((item, index) => (
                    <li key={index}>
                      <span className="icon-x">✗</span> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
            
            {/* Accommodation and logistics */}
            <motion.div 
              className="logistics-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2>{t("activities.logistics.title")}</h2>
              
              {activity.accommodationIncluded && (
                <div className="logistics-item">
                  <span className="logistics-icon">🛏️</span>
                  <div>
                    <h3>{t("activities.logistics.accommodation.title")}</h3>
                    <p>{t("activities.logistics.accommodation.description")}</p>
                  </div>
                </div>
              )}
              
              {activity.mealsIncluded && (
                <div className="logistics-item">
                  <span className="logistics-icon">🍽️</span>
                  <div>
                    <h3>{t("activities.logistics.meals.title")}</h3>
                    <p>{t("activities.logistics.meals.description")}</p>
                  </div>
                </div>
              )}
              
              {activity.transportIncluded && (
                <div className="logistics-item">
                  <span className="logistics-icon">🚌</span>
                  <div>
                    <h3>{t("activities.logistics.transport.title")}</h3>
                    <p>{t("activities.logistics.transport.description")}</p>
                  </div>
                </div>
              )}
              
              {!activity.accommodationIncluded && !activity.mealsIncluded && !activity.transportIncluded && (
                <p>{t("activities.logistics.noServices")}</p>
              )}
            </motion.div>
            
            {/* Client reviews */}
            <div ref={reviewsRef}>
              <Reviews activityId={activity.id} />
            </div>
          </div>
          
          {/* Sidebar for booking */}
          <div className="sidebar-column">
            <motion.div 
              className="booking-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="price-container">
                <span className="price">{activity.price}</span>
                <span className="per-person">{t("activities.perPerson")}</span>
              </div>
              
              <button className="book-button" onClick={handleOrder}>
                {t("activities.booking.orderNow")}
                <span>→</span>
              </button>
              
              <button className="cart-button" onClick={handleAddToCart}>
                <span>🛒</span>
                {t("activities.booking.addToCart")}
              </button>
              
              <button className="review-button" onClick={scrollToReviews}>
                {t("activities.readReviews")}
              </button>
              
              {showOrderConfirmation && (
                <motion.div 
                  className="confirmation-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {t("activities.booking.orderConfirmation")}
                </motion.div>
              )}
              
              {showAddToCartConfirmation && (
                <motion.div 
                  className="confirmation-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {t("activities.booking.addedToCart")}
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceDetail; 