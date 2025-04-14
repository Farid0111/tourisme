import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ChatContextType, ActivityOrder } from './types';

// Création du contexte avec une valeur par défaut
const ChatContext = createContext<ChatContextType | null>(null);

// Hook personnalisé pour utiliser le contexte
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat doit être utilisé à l'intérieur de ChatProvider");
  }
  return context;
};

// Props pour le Provider
interface ChatProviderProps {
  children: ReactNode;
}

// Provider qui enveloppera notre application
export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [activityToOrder, setActivityToOrder] = useState<ActivityOrder | null>(null);

  // Ouverture du chat
  const openChat = () => {
    setIsChatOpen(true);
  };

  // Fermeture du chat
  const closeChat = () => {
    setIsChatOpen(false);
  };

  // Fonction pour envoyer un message (sera implémentée par le composant LiveChat)
  const sendMessage = async (message: string): Promise<void> => {
    // Cette fonction sera remplacée par l'implémentation réelle dans LiveChat
    console.log('Message à envoyer:', message);
    return Promise.resolve();
  };

  // Valeur du contexte que nous allons fournir
  const value: ChatContextType = {
    isChatOpen,
    openChat,
    closeChat,
    activityToOrder,
    setActivityToOrder,
    sendMessage
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext; 