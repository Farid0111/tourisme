import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../utils/store';
import { useChat } from '../utils/ChatContext';
import '../styles/Cart.css';

const Cart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateItemCount, clearCart, getTotal } = useCartStore();
  const { openChat, setActivityToOrder } = useChat();
  
  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleQuantityChange = (activityId: number, numPersons: number) => {
    if (numPersons <= 0) {
      removeItem(activityId);
    } else {
      updateItemCount(activityId, numPersons);
    }
  };

  const handleRemoveItem = (activityId: number) => {
    removeItem(activityId);
  };

  const handleCommanderTout = () => {
    if (items.length === 0) return;
    
    // Construire un message pour toutes les activités
    const activitiesList = items.map(item => 
      `${item.activityTitle} (${item.numPersons || 1} personne${(item.numPersons || 1) > 1 ? 's' : ''})`
    ).join(', ');
    
    // Utilisez le premier élément pour démarrer le chat
    setActivityToOrder({
      activityId: items[0].activityId,
      activityTitle: `Réservation multiple: ${activitiesList}`,
      numPersons: getTotal().count,
      specialRequests: `Je souhaite réserver les activités suivantes: ${activitiesList}. Merci!`
    });
    
    // Ouvrir le chat
    openChat();
    
    // Fermer le panier
    setIsOpen(false);
  };

  const total = getTotal();
  const hasItems = items.length > 0;
  
  return (
    <div className="cart-container">
      <motion.button 
        className="cart-toggle"
        onClick={toggleCart}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
      >
        <span className="cart-icon">🛒</span>
        {hasItems && (
          <motion.span 
            className="cart-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            {total.count}
          </motion.span>
        )}
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="cart-panel"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="cart-header">
              <h3>Votre Panier</h3>
              <button className="cart-close-btn" onClick={toggleCart}>×</button>
            </div>
            
            <div className="cart-content">
              {hasItems ? (
                <>
                  <div className="cart-items">
                    {items.map((item) => (
                      <motion.div 
                        key={item.activityId} 
                        className="cart-item"
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      >
                        <div className="cart-item-image">
                          <img src={item.image} alt={item.activityTitle} />
                        </div>
                        <div className="cart-item-info">
                          <h4>{item.activityTitle}</h4>
                          <p className="cart-item-price">{item.price}</p>
                          <div className="cart-item-quantity">
                            <button 
                              onClick={() => handleQuantityChange(item.activityId, (item.numPersons || 1) - 1)}
                            >
                              -
                            </button>
                            <span>{item.numPersons || 1}</span>
                            <button 
                              onClick={() => handleQuantityChange(item.activityId, (item.numPersons || 1) + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button 
                          className="cart-item-remove"
                          onClick={() => handleRemoveItem(item.activityId)}
                        >
                          ×
                        </button>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="cart-footer">
                    <div className="cart-total">
                      <span>Total:</span>
                      <span>{total.price}</span>
                    </div>
                    <div className="cart-actions">
                      <motion.button 
                        className="cart-clear-btn"
                        onClick={clearCart}
                        whileTap={{ scale: 0.95 }}
                      >
                        Vider le panier
                      </motion.button>
                      <motion.button 
                        className="cart-checkout-btn"
                        onClick={handleCommanderTout}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Commander tout
                      </motion.button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="cart-empty">
                  <p>Votre panier est vide</p>
                  <p>Ajoutez des activités pour les réserver</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart; 