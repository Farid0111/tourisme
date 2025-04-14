import React, { useState } from 'react';
import { useTranslation } from '../i18n';
import GoogleMapComponent from '../components/GoogleMap';
import '../styles/Contact.css';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  
  // État pour le formulaire de contact
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // État pour les messages du chat
  const [chatMessages, setChatMessages] = useState([
    { sender: 'system', text: t('contact.chat.welcome') }
  ]);
  
  // État pour l'input du chat
  const [chatInput, setChatInput] = useState('');
  
  // État pour indiquer si le formulaire a été soumis
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Gérer les changements dans le formulaire
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Gérer la soumission du formulaire
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous enverriez normalement les données à un serveur
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    // Réinitialiser le formulaire après 3 secondes
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 3000);
  };
  
  // Gérer l'envoi de messages dans le chat
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    // Ajouter le message de l'utilisateur
    const userMessage = { sender: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    
    // Simuler une réponse après un court délai
    setTimeout(() => {
      const responseMessage = { 
        sender: 'agent', 
        text: getAutomaticResponse(chatInput) 
      };
      setChatMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };
  
  // Générer une réponse automatique simple basée sur le message de l'utilisateur
  const getAutomaticResponse = (message: string): string => {
    const lowercaseMsg = message.toLowerCase();
    
    if (lowercaseMsg.includes('bonjour') || lowercaseMsg.includes('salut')) {
      return 'Bonjour! Comment puis-je vous aider pour votre voyage au Rwanda?';
    } else if (lowercaseMsg.includes('prix') || lowercaseMsg.includes('tarif') || lowercaseMsg.includes('coût')) {
      return 'Nos tarifs varient selon les activités et la saison. Pouvez-vous préciser quelle activité vous intéresse?';
    } else if (lowercaseMsg.includes('gorille') || lowercaseMsg.includes('trekking')) {
      return 'Le trekking des gorilles est notre activité phare. Le permis coûte 1500 USD par personne. Souhaitez-vous plus d\'informations à ce sujet?';
    } else if (lowercaseMsg.includes('réserv')) {
      return 'Pour effectuer une réservation, veuillez nous indiquer les dates de votre séjour, le nombre de personnes et les activités qui vous intéressent.';
    } else if (lowercaseMsg.includes('hôtel') || lowercaseMsg.includes('hotel') || lowercaseMsg.includes('logement') || lowercaseMsg.includes('hébergement')) {
      return 'Nous proposons différentes options d\'hébergement, du lodge confortable aux hôtels de luxe. Quel type d\'hébergement recherchez-vous?';
    } else if (lowercaseMsg.includes('merci')) {
      return 'Je vous en prie! N\'hésitez pas si vous avez d\'autres questions.';
    } else {
      return 'Merci pour votre message. Un conseiller va vous répondre dans les plus brefs délais. Avez-vous d\'autres questions?';
    }
  };
  
  // Coordonnées de Kigali pour la carte
  const kigaliLocation = {
    lat: -1.9403,
    lng: 30.0618
  };
  
  // Marqueur pour notre bureau à Kigali
  const officeMarker = [
    {
      position: kigaliLocation,
      title: 'Tourisme Rwanda - Bureau principal'
    }
  ];
  
  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1>{t('contact.title')}</h1>
          <p>{t('contact.subtitle')}</p>
        </div>
      </div>
      
      <div className="contact-content container section">
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">
              <span>📱</span>
            </div>
            <h3>{t('contact.info.phone.title')}</h3>
            <p>{t('contact.info.phone.number')}</p>
            <p>{t('contact.info.phone.hours')}</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">
              <span>✉️</span>
            </div>
            <h3>{t('contact.info.email.title')}</h3>
            <p>{t('contact.info.email.address')}</p>
            <p>{t('contact.info.email.response')}</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">
              <span>📍</span>
            </div>
            <h3>{t('contact.info.address.title')}</h3>
            <p>{t('contact.info.address.street')}</p>
            <p>{t('contact.info.address.city')}</p>
          </div>
        </div>
        
        <div className="contact-main">
          <div className="contact-form-container">
            <h2>{t('contact.form.title')}</h2>
            {isSubmitted ? (
              <div className="form-success">
                <p>{t('contact.form.success')}</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="name">{t('contact.form.name')} *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">{t('contact.form.email')} *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">{t('contact.form.subject')} *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">{t('contact.form.subjects.select')}</option>
                    <option value="reservation">{t('contact.form.subjects.reservation')}</option>
                    <option value="information">{t('contact.form.subjects.information')}</option>
                    <option value="feedback">{t('contact.form.subjects.feedback')}</option>
                    <option value="other">{t('contact.form.subjects.other')}</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">{t('contact.form.message')} *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows={5}
                  ></textarea>
                </div>
                
                <button type="submit" className="btn">{t('contact.form.submit')}</button>
              </form>
            )}
          </div>
          
          <div className="chat-container">
            <h2>{t('contact.chat.title')}</h2>
            <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.sender}`}>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="chat-input-container">
              <form onSubmit={handleChatSubmit}>
                <input
                  type="text"
                  value={chatInput}
                  placeholder={t('contact.chat.placeholder')}
                  onChange={(e) => setChatInput(e.target.value)}
                />
                <button type="submit" className="btn">{t('contact.chat.send')}</button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="map-container">
          <h2>{t('contact.map.title')}</h2>
          <GoogleMapComponent 
            center={kigaliLocation}
            zoom={14}
            markers={officeMarker}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact; 