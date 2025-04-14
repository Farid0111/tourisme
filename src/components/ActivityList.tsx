import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from '../utils/types';
import { useChat } from '../utils/ChatContext';
import { useCartStore } from '../utils/store';
import { useTranslation } from '../i18n';
import '../styles/ActivityList.css';

interface ActivityListProps {
  activities: Activity[];
}

interface ActivityFilters {
  duration: string;
  region: string;
  searchQuery: string;
}

interface ActivityCardProps {
  activity: Activity;
  transition?: any;
}

// Animations
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  const { t } = useTranslation();
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>(activities);
  const [filters, setFilters] = useState<ActivityFilters>({
    duration: 'Tous',
    region: 'Toutes',
    searchQuery: ''
  });
  
  useEffect(() => {
    let result = [...activities];
    
    if (filters.duration && filters.duration !== 'Tous') {
      result = result.filter(activity => activity.duration === filters.duration);
    }
    
    if (filters.region && filters.region !== 'Toutes') {
      result = result.filter(activity => activity.region === filters.region);
    }
    
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        activity => 
          activity.title.toLowerCase().includes(query) || 
          activity.description.toLowerCase().includes(query) ||
          (activity.shortDescription && activity.shortDescription.toLowerCase().includes(query))
      );
    }
    
    setFilteredActivities(result);
  }, [activities, filters]);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const uniqueDurations = ['Tous', ...Array.from(new Set(activities.map(a => a.duration)))];
  const uniqueRegions = ['Toutes', ...Array.from(new Set(activities.map(a => a.region)))];
  
  const renderHighlightedDescription = (activity: Activity) => {
    if (activity.id === 1) {
      return t("activities.trek.description");
    }
    return activity.shortDescription;
  };
  
  return (
    <div className="activities-list-container">
      <motion.div 
        className="filters-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="filters-inner">
          <motion.div 
            className="filter-group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <label htmlFor="duration">{t("activities.filters.duration")}</label>
            <select 
              id="duration" 
              name="duration" 
              value={filters.duration} 
              onChange={handleFilterChange}
            >
              {uniqueDurations.map(duration => (
                <option key={duration} value={duration}>{duration}</option>
              ))}
            </select>
          </motion.div>
          
          <motion.div 
            className="filter-group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="region">{t("activities.filters.region")}</label>
            <select 
              id="region" 
              name="region" 
              value={filters.region} 
              onChange={handleFilterChange}
            >
              {uniqueRegions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </motion.div>
          
          <motion.div 
            className="filter-group search-group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="searchQuery">{t("activities.filters.search")}</label>
            <input 
              type="text" 
              id="searchQuery" 
              name="searchQuery" 
              value={filters.searchQuery} 
              onChange={handleFilterChange} 
              placeholder={t("activities.filters.searchPlaceholder")}
            />
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        className="activities-count"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {filteredActivities.length} activités trouvées
      </motion.div>
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={`${filters.duration}-${filters.region}-${filters.searchQuery}`}
          className="activities-grid"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          exit={{ opacity: 0 }}
        >
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity, index) => (
              <ActivityCard 
                key={activity.id} 
                activity={activity} 
                transition={{ delay: index * 0.05 }}
              />
            ))
          ) : (
            <motion.div 
              className="no-activities" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p>{t("activities.noResults")}</p>
              <motion.button 
                className="btn btn-secondary" 
                onClick={() => setFilters({ duration: 'Tous', region: 'Toutes', searchQuery: '' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("activities.resetFilters")}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, transition }) => {
  const { t } = useTranslation();
  const { openChat, setActivityToOrder } = useChat();
  const { addItem } = useCartStore();
  
  const renderHighlightedDescription = (activity: Activity) => {
    if (activity.id === 1) {
      return t("activities.trek.description");
    }
    return activity.shortDescription;
  };
  
  const handleOrder = () => {
    setActivityToOrder({
      activityId: activity.id,
      activityTitle: activity.title
    });
    openChat();
  };
  
  const handleAddToCart = () => {
    addItem({
      activityId: activity.id,
      activityTitle: activity.title,
      price: activity.price,
      image: activity.image,
      numPersons: 1
    });
  };
  
  return (
    <Link to={`/activities/${activity.id}`} className="activity-card-link">
      <motion.div 
        className="activity-card"
        variants={fadeInUp}
        transition={transition || { duration: 0.4 }}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
      >
        <div className="activity-image">
          <img src={activity.image} alt={activity.title} />
          <div className="activity-price">{activity.price}</div>
          {activity.featured && <div className="activity-featured">Populaire</div>}
        </div>
        
        <div className="activity-content">
          <h3 className="activity-title">{activity.title}</h3>
          
          <div className="activity-meta">
            <span className="activity-duration">
              <i className="duration-icon"></i> {activity.duration}
            </span>
            <span className="activity-region">
              <i className="region-icon"></i> {activity.region}
            </span>
          </div>
          
          <p className="activity-description">
            {renderHighlightedDescription(activity)}
          </p>
          
          <div className="activity-amenities">
            {activity.transportIncluded && (
              <span className="amenity transport" title="Transport inclus">
                <i className="amenity-icon transport-icon"></i>
              </span>
            )}
            {activity.accommodationIncluded && (
              <span className="amenity accommodation" title="Hébergement inclus">
                <i className="amenity-icon accommodation-icon"></i>
              </span>
            )}
            {activity.mealsIncluded && (
              <span className="amenity meals" title="Repas inclus">
                <i className="amenity-icon meals-icon"></i>
              </span>
            )}
          </div>
          
          <div className="activity-actions">
            <button 
              onClick={(e) => {
                e.preventDefault();
                handleOrder();
              }} 
              className="btn btn-primary"
            >
              Commander
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart();
              }} 
              className="btn btn-secondary"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ActivityList;