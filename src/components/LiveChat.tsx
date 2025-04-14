import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp, Timestamp, setDoc, doc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { ChatMessage } from '../utils/types';
import { useChat } from '../utils/ChatContext';
import '../styles/LiveChat.css';

const LiveChat: React.FC = () => {
  // Utilisation du contexte global du chat
  const { isChatOpen: isGlobalChatOpen, openChat, closeChat, activityToOrder, setActivityToOrder } = useChat();
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [sessionId, setSessionId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Helper function to log errors and messages for debugging
  const logDebug = (message: string, data?: any) => {
    console.log(`[LiveChat] ${message}`, data || '');
  };

  // Generate a session ID if not exists
  useEffect(() => {
    try {
      logDebug('Initializing LiveChat component');
      const storedSessionId = localStorage.getItem('chatSessionId');
      if (storedSessionId) {
        logDebug('Found existing session ID', storedSessionId);
        setSessionId(storedSessionId);
      } else {
        const newSessionId = `session_${Date.now()}`;
        logDebug('Creating new session ID', newSessionId);
        localStorage.setItem('chatSessionId', newSessionId);
        setSessionId(newSessionId);
      }
      
      // Check if user has provided name and email before
      const storedName = localStorage.getItem('chatUserName');
      const storedEmail = localStorage.getItem('chatUserEmail');
      
      if (storedName) setUserName(storedName);
      if (storedEmail) setUserEmail(storedEmail);
      
      setIsInitializing(false);
    } catch (err) {
      logDebug('Error in initialization', err);
      setError('Erreur d\'initialisation du chat');
      setIsInitializing(false);
    }
  }, []);

  // Subscribe to messages from this session
  useEffect(() => {
    if (!sessionId) return;
    
    logDebug('Setting up message subscription for session', sessionId);
    
    try {
      // Ensure the session document exists first
      const createSession = async () => {
        try {
          await setDoc(doc(db, 'chatSessions', sessionId), {
            sessionId,
            createdAt: serverTimestamp(),
            lastMessageAt: serverTimestamp(),
            isOpen: true
          }, { merge: true });
          logDebug('Session document created/updated successfully');
        } catch (err) {
          logDebug('Error creating session document', err);
          setError('Erreur de connexion à la base de données');
        }
      };
      
      createSession();
      
      // Now subscribe to messages
      const messagesRef = collection(db, 'chatSessions', sessionId, 'messages');
      const q = query(messagesRef, orderBy('timestamp', 'asc'), limit(100));
      
      logDebug('Setting up onSnapshot listener');
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        logDebug('Received snapshot with document count:', querySnapshot.size);
        const messagesList: ChatMessage[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          messagesList.push({
            id: doc.id,
            text: data.text,
            sender: data.sender,
            timestamp: data.timestamp?.toDate() || new Date(),
            read: data.read || false,
            userName: data.userName,
            userEmail: data.userEmail
          });
        });
        setMessages(messagesList);
        
        // Add welcome message if no messages and the user has provided their info
        if (messagesList.length === 0 && userName && userEmail) {
          logDebug('No messages found, adding welcome message');
          addWelcomeMessage();
        }
      }, (err) => {
        logDebug('Error in onSnapshot', err);
        setError('Erreur de récupération des messages');
      });
      
      return () => {
        logDebug('Unsubscribing from messages');
        unsubscribe();
      };
    } catch (err) {
      logDebug('Error setting up message subscription', err);
      setError('Erreur de connexion au chat');
    }
  }, [sessionId, userName, userEmail]);

  // Effet pour gérer l'activité à commander
  useEffect(() => {
    if (activityToOrder && userName && userEmail && sessionId) {
      const orderMessage = `Je souhaite commander l'activité : ${activityToOrder.activityTitle} (ID: ${activityToOrder.activityId})`;
      sendUserMessage(orderMessage);
      setActivityToOrder(null);
    }
  }, [activityToOrder, userName, userEmail, sessionId, setActivityToOrder]);

  // Add welcome message
  const addWelcomeMessage = async () => {
    if (!sessionId) return;
    logDebug('Adding welcome message');
    
    try {
      const messagesRef = collection(db, 'chatSessions', sessionId, 'messages');
      const messageDoc = await addDoc(messagesRef, {
        text: "Bonjour ! Comment puis-je vous aider pour votre voyage au Rwanda ?",
        sender: 'admin',
        timestamp: serverTimestamp(),
        read: false,
        userName: 'Support Rwanda Tourisme'
      });
      logDebug('Welcome message added', messageDoc.id);
    } catch (error) {
      logDebug("Error adding welcome message: ", error);
      setError("Erreur d'envoi du message d'accueil");
    }
  };

  // Send a message programmatically (for activity orders)
  const sendUserMessage = async (text: string) => {
    if (!sessionId) return;
    logDebug('Sending programmatic message', text);
    
    try {
      // Update session info first
      try {
        await setDoc(doc(db, 'chatSessions', sessionId), {
          sessionId,
          lastMessageAt: serverTimestamp(),
          userName: userName || 'Visiteur',
          userEmail: userEmail || '',
          isOpen: true
        }, { merge: true });
        logDebug('Session document updated');
      } catch (err) {
        logDebug('Error updating session document', err);
      }
      
      // Add message to Firestore
      const messagesRef = collection(db, 'chatSessions', sessionId, 'messages');
      const messageDoc = await addDoc(messagesRef, {
        text,
        sender: 'user',
        timestamp: serverTimestamp(),
        read: false,
        userName: userName || 'Visiteur',
        userEmail: userEmail || ''
      });
      
      logDebug('Message sent successfully', messageDoc.id);
      
      // Simulate admin response after a short delay
      setTimeout(simulateAdminResponseForOrder, 2000);
    } catch (error) {
      logDebug("Error sending message: ", error);
      setError("Erreur d'envoi du message");
    }
  };

  // Handle sending a new message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !sessionId) return;
    logDebug('Sending message', newMessage);
    
    try {
      // Save user info if provided
      if (userName && !localStorage.getItem('chatUserName')) {
        localStorage.setItem('chatUserName', userName);
      }
      if (userEmail && !localStorage.getItem('chatUserEmail')) {
        localStorage.setItem('chatUserEmail', userEmail);
      }
      
      // Update session info first
      try {
        await setDoc(doc(db, 'chatSessions', sessionId), {
          sessionId,
          lastMessageAt: serverTimestamp(),
          userName: userName || 'Visiteur',
          userEmail: userEmail || '',
          isOpen: true
        }, { merge: true });
        logDebug('Session document updated');
      } catch (err) {
        logDebug('Error updating session document', err);
      }
      
      // Add message to Firestore
      const messagesRef = collection(db, 'chatSessions', sessionId, 'messages');
      const messageDoc = await addDoc(messagesRef, {
        text: newMessage,
        sender: 'user',
        timestamp: serverTimestamp(),
        read: false,
        userName: userName || 'Visiteur',
        userEmail: userEmail || ''
      });
      
      logDebug('Message sent successfully', messageDoc.id);
      
      // Clear input
      setNewMessage('');
      
      // Simulate admin response after a short delay
      setTimeout(simulateAdminResponse, 2000);
    } catch (error) {
      logDebug("Error sending message: ", error);
      setError("Erreur d'envoi du message");
    }
  };

  // Simulate admin response (in a real app, this would be handled by the admin panel)
  const simulateAdminResponse = async () => {
    if (!sessionId) return;
    logDebug('Simulating admin response');
    
    const responses = [
      "Merci pour votre message ! Un conseiller va vous répondre dans les plus brefs délais.",
      "Votre demande est importante pour nous. Nous traitons votre message et revenons vers vous rapidement.",
      "Nous avons bien reçu votre message. Pour un traitement plus rapide, n'hésitez pas à préciser les dates de votre séjour.",
      "Merci de nous contacter ! Avez-vous déjà une idée des activités qui vous intéressent au Rwanda ?",
      "Nous sommes ravis de votre intérêt pour le Rwanda ! Un spécialiste va vous répondre très prochainement.",
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    try {
      const messagesRef = collection(db, 'chatSessions', sessionId, 'messages');
      const messageDoc = await addDoc(messagesRef, {
        text: randomResponse,
        sender: 'admin',
        timestamp: serverTimestamp(),
        read: false,
        userName: 'Support Rwanda Tourisme'
      });
      logDebug('Admin response sent', messageDoc.id);
    } catch (error) {
      logDebug("Error simulating admin response: ", error);
      setError("Erreur de réponse automatique");
    }
  };

  // Simulate admin response for order
  const simulateAdminResponseForOrder = async () => {
    if (!sessionId) return;
    logDebug('Simulating admin response for order');
    
    const response = "Merci pour votre commande ! Pourriez-vous nous préciser la date souhaitée et le nombre de personnes pour cette activité ? Un conseiller vous contactera ensuite pour finaliser votre réservation.";
    
    try {
      const messagesRef = collection(db, 'chatSessions', sessionId, 'messages');
      const messageDoc = await addDoc(messagesRef, {
        text: response,
        sender: 'admin',
        timestamp: serverTimestamp(),
        read: false,
        userName: 'Support Rwanda Tourisme'
      });
      logDebug('Admin order response sent', messageDoc.id);
    } catch (error) {
      logDebug("Error simulating admin response for order: ", error);
      setError("Erreur de réponse automatique");
    }
  };

  // Format timestamp
  const formatTime = (timestamp: Date | number) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (err) {
      logDebug('Error formatting time', err);
      return '00:00';
    }
  };

  // Toggle chat window
  const toggleChat = () => {
    if (isGlobalChatOpen) {
      closeChat();
    } else {
      openChat();
    }
    logDebug(`Chat window ${!isGlobalChatOpen ? 'opened' : 'closed'}`);
    // Clear any previous errors when opening chat
    if (!isGlobalChatOpen) {
      setError(null);
    }
  };

  // Reset session if needed
  const resetChat = () => {
    logDebug('Resetting chat session');
    localStorage.removeItem('chatSessionId');
    localStorage.removeItem('chatUserName');
    localStorage.removeItem('chatUserEmail');
    setSessionId(`session_${Date.now()}`);
    setUserName('');
    setUserEmail('');
    setMessages([]);
    setError(null);
  };

  // Render chat content
  const renderChatContent = () => {
    if (isInitializing) {
      return <div className="chat-loading">Chargement...</div>;
    }
    
    if (error) {
      return (
        <div className="chat-error">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Réessayer</button>
        </div>
      );
    }
    
    if (!userName || !userEmail) {
      return (
        <div className="chat-user-info">
          <h4>Avant de commencer...</h4>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (userName && userEmail) {
              // Start chat if both fields are filled
              logDebug('User info submitted', { userName, userEmail });
              // Update localStorage immediately
              localStorage.setItem('chatUserName', userName);
              localStorage.setItem('chatUserEmail', userEmail);
              
              // Si une activité est à commander, envoyer le message automatiquement
              if (activityToOrder) {
                const orderMessage = `Je souhaite commander l'activité : ${activityToOrder.activityTitle} (ID: ${activityToOrder.activityId})`;
                setTimeout(() => sendUserMessage(orderMessage), 1000);
                setActivityToOrder(null);
              }
            }
          }}>
            <div className="form-group">
              <label htmlFor="userName">Votre nom</label>
              <input 
                type="text" 
                id="userName" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="userEmail">Votre email</label>
              <input 
                type="email" 
                id="userEmail" 
                value={userEmail} 
                onChange={(e) => setUserEmail(e.target.value)} 
                required
              />
            </div>
            <button type="submit" className="btn-start-chat">Démarrer le chat</button>
          </form>
        </div>
      );
    }
    
    return (
      <>
        <div className="chat-content" ref={chatContentRef}>
          {messages.length === 0 ? (
            <div className="chat-no-messages">
              <p>Le chat est en cours d'initialisation...</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`chat-message ${message.sender}`}>
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  <div className="message-time">{formatTime(message.timestamp)}</div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <input 
            type="text" 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)} 
            placeholder="Tapez votre message ici..." 
            required
          />
          <button type="submit" className="send-button">
            <span>Envoyer</span>
          </button>
        </form>
      </>
    );
  };

  return (
    <div className="live-chat-container">
      {isGlobalChatOpen ? (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Chat en direct</h3>
            <div>
              <button className="reset-chat-btn" onClick={resetChat} title="Réinitialiser le chat">↻</button>
              <button className="close-chat-btn" onClick={toggleChat}>×</button>
            </div>
          </div>
          
          {renderChatContent()}
        </div>
      ) : (
        <button className="chat-toggle-btn" onClick={toggleChat}>
          <span className="chat-icon">💬</span>
          <span>Discuter avec nous</span>
        </button>
      )}
    </div>
  );
};

export default LiveChat; 