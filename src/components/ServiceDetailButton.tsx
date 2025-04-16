import React from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '../utils/store';
import '../styles/ChatOrder.css';

interface ServiceDetailButtonProps {
  activityId: number;
  activityTitle: string;
  price: string;
  image: string;
  onClick: () => void;
}

const ServiceDetailButton: React.FC<ServiceDetailButtonProps> = ({
  activityId,
  activityTitle,
  price,
  image,
  onClick
}) => {
  const { addItem } = useCartStore();

  const handleClick = () => {
    // Ajouter automatiquement l'activité au panier avant d'ouvrir le chat
    addItem({
      activityId,
      activityTitle,
      price,
      image,
      numPersons: 1
    });
    
    // Ouvrir le chat
    onClick();
  };

  return (
    <motion.button 
      className="service-detail-chat-button"
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="chat-icon">💬</span>
      Commander avec conseiller
    </motion.button>
  );
};

export default ServiceDetailButton; 