import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Reviews from '../components/Reviews';
import { activitiesData } from '../utils/activitiesData';
import ImageGallery from '../components/ImageGallery';
import '../styles/ServiceDetail.css';
import ChatOrder, { ChatOrderHandle } from '../components/ChatOrder';
import ServiceDetailButton from '../components/ServiceDetailButton';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const reviewsRef = useRef<HTMLDivElement>(null);
  const chatOrderRef = useRef<ChatOrderHandle>(null);
  
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  
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
      original: img.startsWith('/') ? img : `/images/${img}`,
      thumbnail: img.startsWith('/') ? img : `/images/${img}`,
    }));
  
  // Function to scroll to reviews section
  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to open chat
  const handleOpenChat = () => {
    chatOrderRef.current?.openChat();
  };

  // Sample FAQ data - can be moved to the activity data in a real application
  const faqItems = [
    {
      question: "Quelle est la meilleure période pour visiter ?",
      answer: "La meilleure période pour cette activité est de juin à septembre et de décembre à février, pendant les saisons sèches. La visibilité est meilleure et les chemins sont moins boueux."
    },
    {
      question: "Cette activité convient-elle aux enfants ?",
      answer: "Cette activité est recommandée pour les enfants de plus de 12 ans en raison de sa nature physique. Veuillez nous consulter pour des options adaptées aux familles avec de jeunes enfants."
    },
    {
      question: "Que dois-je apporter ?",
      answer: "Nous recommandons d'apporter des vêtements confortables, des chaussures de randonnée, une veste imperméable, une protection solaire et une bouteille d'eau réutilisable."
    },
    {
      question: "Quelle est la politique d'annulation ?",
      answer: "Une annulation jusqu'à 72 heures avant le départ vous donne droit à un remboursement complet. Une annulation entre 24 et 72 heures avant le départ vous donne droit à un remboursement de 50%. Aucun remboursement n'est accordé pour les annulations dans les 24 heures précédant le départ."
    }
  ];

  return (
    <motion.div 
      className="service-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero section with title and image */}
      <div 
        className="service-hero" 
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${activity.image})` }}
      >
        <div className="container">
          <h1>{activity.title}</h1>
          <div className="service-meta">
            <div className="service-meta-item">
              <span className="meta-icon">📅</span>
              <span>{activity.duration}</span>
            </div>
            <div className="service-meta-item">
              <span className="meta-icon">📍</span>
              <span>{activity.region}</span>
            </div>
            <div className="service-meta-item">
              <span className="meta-icon">💰</span>
              <span>{activity.price}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container">
        <div className="service-content">
          {/* Left column: Content */}
          <div className="service-main">
            {/* Gallery */}
            <div className="service-gallery">
              <ImageGallery images={galleryImages} />
            </div>
            
            {/* Navigation tabs */}
            <div className="service-tabs">
              <button 
                className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={`tab-button ${activeTab === 'itinerary' ? 'active' : ''}`}
                onClick={() => setActiveTab('itinerary')}
              >
                Itinéraire
              </button>
              <button 
                className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Détails
              </button>
              <button 
                className={`tab-button ${activeTab === 'faq' ? 'active' : ''}`}
                onClick={() => setActiveTab('faq')}
              >
                FAQ
              </button>
              <button 
                className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('reviews');
                  scrollToReviews();
                }}
              >
                Avis
              </button>
            </div>
            
            {/* Tab content */}
            <div className="tab-content">
              {/* Description Tab */}
              {activeTab === 'description' && (
                <div className="description-tab">
                  <h2>À propos de cette activité</h2>
                  <p>{activity.description}</p>
                  
                  {activity.highlights && (
                    <div className="highlights">
                      <h3>Points forts</h3>
                      <ul className="highlights-list">
                        {activity.highlights.map((highlight, index) => (
                          <li key={index}>
                            <span className="highlight-icon">➤</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              {/* Itinerary Tab */}
              {activeTab === 'itinerary' && (
                <div className="itinerary-tab">
                  <h2>Itinéraire détaillé</h2>
                  {activity.itinerary ? (
                    <div className="itinerary-timeline">
                      {activity.itinerary.map((day, index) => (
                        <div key={index} className="itinerary-day">
                          <div className="day-header">
                            <h3>Jour {index + 1}</h3>
                            {day.title && <span className="day-title">{day.title}</span>}
                          </div>
                          <p>{day.description}</p>
                          {day.activities && (
                            <ul className="day-activities">
                              {day.activities.map((activity, actIndex) => (
                                <li key={actIndex}>{activity}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>Aucun itinéraire détaillé disponible pour cette activité. Veuillez nous contacter pour plus d'informations.</p>
                  )}
                </div>
              )}
              
              {/* Details Tab */}
              {activeTab === 'details' && (
                <div className="details-tab">
                  <h2>Détails</h2>
                  
                  <div className="included-section">
                    <h3>Inclus</h3>
                    <ul className="included-list">
                      {activity.included.map((item, index) => (
                        <li key={index} className="included-item">
                          <span className="included-icon">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="not-included-section">
                    <h3>Non inclus</h3>
                    <ul className="not-included-list">
                      {activity.notIncluded.map((item, index) => (
                        <li key={index} className="not-included-item">
                          <span className="not-included-icon">✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="logistics-section">
                    <h3>Logistique</h3>
                    <div className="logistics-cards">
                      {activity.accommodation && (
                        <div className="logistics-card">
                          <div className="logistics-icon">
                            <span>🏨</span>
                          </div>
                          <div className="logistics-details">
                            <h4>Hébergement</h4>
                            <p>{activity.accommodation}</p>
                          </div>
                        </div>
                      )}
                      
                      {activity.transport && (
                        <div className="logistics-card">
                          <div className="logistics-icon">
                            <span>🚌</span>
                          </div>
                          <div className="logistics-details">
                            <h4>Transport</h4>
                            <p>{activity.transport}</p>
                          </div>
                        </div>
                      )}
                      
                      {activity.meals && (
                        <div className="logistics-card">
                          <div className="logistics-icon">
                            <span>🍽️</span>
                          </div>
                          <div className="logistics-details">
                            <h4>Repas</h4>
                            <p>{activity.meals}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* FAQ Tab */}
              {activeTab === 'faq' && (
                <div className="faq-tab">
                  <h2>Questions fréquemment posées</h2>
                  <div className="faq-accordion">
                    {faqItems.map((faq, index) => (
                      <div key={index} className="faq-item">
                        <h3 className="faq-question">{faq.question}</h3>
                        <p className="faq-answer">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="reviews-tab" ref={reviewsRef}>
                  <h2>Avis clients</h2>
                  <Reviews activityId={Number(id)} />
                </div>
              )}
            </div>
          </div>
          
          {/* Right column: Booking widget */}
          <div className="service-sidebar">
            <motion.div 
              className="booking-widget"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3>Réserver cette activité</h3>
              <p className="widget-price">À partir de {activity.price}</p>
              <p className="widget-duration">Durée: {activity.duration}</p>
              
              <div className="booking-actions">
                <ServiceDetailButton
                  activityId={activity.id}
                  activityTitle={activity.title}
                  price={activity.price}
                  image={activity.image}
                  onClick={handleOpenChat}
                />
              </div>
              
              {showOrderConfirmation && (
                <motion.div 
                  className="confirmation-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Commande confirmée
                </motion.div>
              )}
              
              <div className="contact-help">
                <span className="contact-icon">📞</span>
                <div>
                  <p className="contact-title">Besoin d'aide ?</p>
                  <p className="contact-info">+250 788 123 456</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* The invisible global chat that will be displayed when handleOpenChat is called */}
      <ChatOrder ref={chatOrderRef} />
    </motion.div>
  );
};

export default ServiceDetail; 