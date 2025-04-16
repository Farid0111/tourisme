import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useCartStore } from '../utils/store';
import '../styles/ChatOrder.css';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  isInput?: boolean;
  inputType?: 'text' | 'number' | 'email';
  inputName?: string;
  required?: boolean;
}

interface OrderData {
  fullName: string;
  email: string;
  numPersons: number;
  numDays: number;
  specialRequests?: string;
  items: any[];
  totalPrice: string;
  timestamp: any;
}

export interface ChatOrderHandle {
  openChat: () => void;
}

const ChatOrder = forwardRef<ChatOrderHandle, {}>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [orderData, setOrderData] = useState<Partial<OrderData>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { items, clearCart, getTotal } = useCartStore();
  
  // Exposer la fonction openChat via ref
  useImperativeHandle(ref, () => ({
    openChat: () => {
      openChat();
    }
  }));
  
  // Questions à poser dans l'ordre
  const questions: Message[] = [
    {
      id: 'q1',
      text: "Hello! I'm your travel assistant. To get started, what is your full name?",
      isBot: true,
      isInput: true,
      inputType: 'text',
      inputName: 'fullName',
      required: true
    },
    {
      id: 'q2',
      text: "Thank you! And your email address so we can send you information?",
      isBot: true,
      isInput: true,
      inputType: 'email',
      inputName: 'email',
      required: true
    },
    {
      id: 'q3',
      text: "How many people are you planning this trip for?",
      isBot: true,
      isInput: true,
      inputType: 'number',
      inputName: 'numPersons',
      required: true
    },
    {
      id: 'q4',
      text: "And how many days would you like to stay?",
      isBot: true,
      isInput: true,
      inputType: 'number',
      inputName: 'numDays',
      required: true
    },
    {
      id: 'q5',
      text: "Do you have any special requests or specific needs? (optional)",
      isBot: true,
      isInput: true,
      inputType: 'text',
      inputName: 'specialRequests',
      required: false
    }
  ];
  
  const openChat = () => {
    setIsOpen(true);
    
    // Réinitialiser le chat si nécessaire
    if (messages.length === 0) {
      initChat();
    }
  };
  
  const closeChat = () => {
    if (orderComplete) {
      setMessages([]);
      setCurrentQuestion(0);
      setOrderData({});
      setOrderComplete(false);
    }
    setIsOpen(false);
  };
  
  const initChat = () => {
    // Message d'accueil
    const welcomeMessage: Message = {
      id: 'welcome',
      text: "Welcome! I'm your assistant to help plan your trip to Rwanda.",
      isBot: true
    };
    
    // Afficher le récapitulatif du panier si des articles sont présents
    let initialMessages = [welcomeMessage];
    
    if (items.length > 0) {
      const cartSummary: Message = {
        id: 'cart-summary',
        text: `You have ${items.length} activity(ies) in your cart for a total of ${getTotal().price}.`,
        isBot: true
      };
      initialMessages.push(cartSummary);
    } else {
      const infoMessage: Message = {
        id: 'info-message',
        text: "I'll help you plan your stay and answer your questions about our activities in Rwanda.",
        isBot: true
      };
      initialMessages.push(infoMessage);
    }
    
    initialMessages.push(questions[0]);
    setMessages(initialMessages);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentInput(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentInput && questions[currentQuestion].required) {
      alert("This field is required.");
      return;
    }
    
    // Ajouter la réponse de l'utilisateur
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: currentInput,
      isBot: false
    };
    
    // Mettre à jour les données de commande
    const fieldName = questions[currentQuestion].inputName;
    if (!fieldName) return;
    
    const newOrderData = { ...orderData } as Record<string, any>;
    
    // Convertir en nombre si nécessaire
    if (questions[currentQuestion].inputType === 'number') {
      newOrderData[fieldName] = Number(currentInput);
    } else {
      newOrderData[fieldName] = currentInput;
    }
    
    setOrderData(newOrderData as Partial<OrderData>);
    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');
    
    // Passer à la question suivante ou finaliser
    const nextQuestionIndex = currentQuestion + 1;
    
    if (nextQuestionIndex < questions.length) {
      setMessages(prev => [...prev, questions[nextQuestionIndex]]);
      setCurrentQuestion(nextQuestionIndex);
    } else {
      // Toutes les questions ont été posées, afficher la confirmation
      finalizeChatAndOrder(newOrderData as Partial<OrderData>);
    }
  };
  
  const finalizeChatAndOrder = async (data: Partial<OrderData>) => {
    // Message de confirmation
    const confirmationMessage: Message = {
      id: 'confirmation',
      text: "Perfect! Here's a summary of your information:",
      isBot: true
    };
    
    const summaryMessage: Message = {
      id: 'summary',
      text: `
        Name: ${data.fullName}
        Email: ${data.email}
        Number of people: ${data.numPersons}
        Number of days: ${data.numDays}
        ${data.specialRequests ? `Special requests: ${data.specialRequests}` : ''}
        
        ${items.length > 0 ? `Total for selected activities: ${getTotal().price}` : 'No activities selected yet.'}
      `,
      isBot: true
    };
    
    const processingMessage: Message = {
      id: 'processing',
      text: "Processing your request...",
      isBot: true
    };
    
    setMessages(prev => [...prev, confirmationMessage, summaryMessage, processingMessage]);
    
    // Préparer les données pour Firebase
    const orderToSave: OrderData = {
      ...data as OrderData,
      items: items,
      totalPrice: items.length > 0 ? getTotal().price : "0 EUR",
      timestamp: serverTimestamp()
    };
    
    try {
      setIsSubmitting(true);
      
      // Sauvegarder dans Firebase
      const docRef = await addDoc(collection(db, "inquiries"), orderToSave);
      
      // Message de succès
      const successMessage: Message = {
        id: 'success',
        text: `Your request has been successfully recorded! Reference: ${docRef.id}. We'll contact you soon at ${data.email}.`,
        isBot: true
      };
      
      const thankYouMessage: Message = {
        id: 'thank-you',
        text: items.length > 0 
          ? "Thank you for your order! We'll contact you soon to confirm the details." 
          : "Thank you for your interest! A consultant will contact you within 24 hours to propose activities adapted to your needs.",
        isBot: true
      };
      
      setMessages(prev => [...prev, successMessage, thankYouMessage]);
      setOrderComplete(true);
      
      // Vider le panier après commande réussie si des articles sont présents
      if (items.length > 0) {
        setTimeout(() => {
          clearCart();
        }, 3000);
      }
      
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la demande:", error);
      
      const errorMessage: Message = {
        id: 'error',
        text: "An error occurred while recording your request. Please try again or contact us directly.",
        isBot: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Faire défiler vers le bas après l'ajout de nouveaux messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  return (
    <>
      <motion.button 
        className="chat-order-button"
        onClick={openChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="chat-icon">💬</span>
        Need help?
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chat-order-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="chat-order-panel"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 30 }}
            >
              <div className="chat-order-header">
                <h3>Rwanda Travel Assistant</h3>
                <button 
                  className="chat-close-btn" 
                  onClick={closeChat}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              
              <div className="chat-order-messages">
                {messages.map((message) => (
                  <motion.div 
                    key={message.id}
                    className={`chat-message ${message.isBot ? 'bot-message' : 'user-message'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="message-bubble">
                      <p>{message.text}</p>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {!orderComplete && currentQuestion < questions.length && (
                <form onSubmit={handleSubmit} className="chat-order-input">
                  {questions[currentQuestion].inputType === 'text' ? (
                    <input 
                      type="text" 
                      value={currentInput} 
                      onChange={handleInputChange} 
                      placeholder={`Enter your ${questions[currentQuestion].inputName}`}
                      disabled={isSubmitting}
                      required={questions[currentQuestion].required}
                      autoFocus
                    />
                  ) : questions[currentQuestion].inputType === 'email' ? (
                    <input 
                      type="email" 
                      value={currentInput} 
                      onChange={handleInputChange} 
                      placeholder="Enter your email"
                      disabled={isSubmitting}
                      required={questions[currentQuestion].required}
                      autoFocus
                    />
                  ) : (
                    <input 
                      type="number" 
                      value={currentInput} 
                      onChange={handleInputChange} 
                      placeholder={`Enter a number`}
                      min="1"
                      disabled={isSubmitting}
                      required={questions[currentQuestion].required}
                      autoFocus
                    />
                  )}
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="send-button"
                  >
                    <span>Send</span>
                    <i className="send-icon">➤</i>
                  </button>
                </form>
              )}
              
              {orderComplete && (
                <div className="chat-order-complete">
                  <button 
                    onClick={closeChat}
                    className="close-chat-button"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default ChatOrder; 