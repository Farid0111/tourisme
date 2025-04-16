import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, DurationOption, RegionOption } from '../utils/types';
import { activitiesData } from '../utils/activitiesData';
import '../styles/ActivityList.css';

// Composant de carte d'activité individuelle
interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <motion.div 
      className="activity-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="activity-image-container">
        <img src={activity.image} alt={activity.title} className="activity-image" />
        <div className="activity-duration">
          <span>{activity.duration}</span>
        </div>
      </div>
      <div className="activity-content">
        <h3 className="activity-title">{activity.title}</h3>
        <p className="activity-description">{activity.shortDescription}</p>
        <div className="activity-footer">
          <span className="activity-price">{activity.price}</span>
          <span className="activity-region">{activity.region}</span>
        </div>
        <div className="activity-actions">
          <Link to={`/activities/${activity.id}`} className="btn btn-details">
            Voir détails
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Composant principal de liste d'activités
const ActivityList: React.FC = () => {
  // État pour les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedTagName, setSelectedTagName] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState<string>('');
  
  // État pour la liste des activités filtrée
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>(activitiesData);
  
  // Options pour les filtres select
  const durationOptions: DurationOption[] = [
    { value: '', label: 'Toutes les durées' },
    { value: '1 jour', label: '1 jour' },
    { value: '2 jours', label: '2 jours' },
    { value: '3 jours', label: '3 jours' },
    { value: '4 jours', label: '4 jours' },
    { value: '5 jours', label: '5 jours' },
    { value: '6 jours', label: '6 jours' },
    { value: '1 semaine', label: '1 semaine' },
    { value: '2 semaines', label: '2 semaines' },
  ];
  
  const regionOptions: RegionOption[] = [
    { value: '', label: 'Toutes les régions' },
    { value: 'Kigali', label: 'Kigali' },
    { value: 'Parc National des Volcans', label: 'Parc National des Volcans' },
    { value: 'Parc National Akagera', label: 'Parc National Akagera' },
    { value: 'Parc National Nyungwe', label: 'Parc National Nyungwe' },
    { value: 'Lac Kivu', label: 'Lac Kivu' },
    { value: 'Musanze', label: 'Musanze' },
    { value: 'Gisenyi', label: 'Gisenyi' },
  ];
  
  const tagOptions = [
    { value: '', label: 'Tous les tags' },
    { value: 'Aventure', label: 'Aventure' },
    { value: 'Nature', label: 'Nature' },
    { value: 'Culture', label: 'Culture' },
    { value: 'Safari', label: 'Safari' },
    { value: 'Trekking', label: 'Trekking' },
    { value: 'Gastronomie', label: 'Gastronomie' },
    { value: 'Détente', label: 'Détente' },
    { value: 'Photographie', label: 'Photographie' },
  ];
  
  const sortOptions = [
    { value: '', label: 'Tri par défaut' },
    { value: 'price-asc', label: 'Prix (croissant)' },
    { value: 'price-desc', label: 'Prix (décroissant)' },
    { value: 'duration-asc', label: 'Durée (courte à longue)' },
    { value: 'duration-desc', label: 'Durée (longue à courte)' },
  ];
  
  // Fonction pour extraire le nombre d'une chaîne de prix (ex: "100 EUR" -> 100)
  const extractPrice = (priceString: string): number => {
    const match = priceString.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };
  
  // Fonction pour trier les activités
  const sortActivities = (activities: Activity[], sortType: string): Activity[] => {
    const sortedActivities = [...activities];
    
    switch (sortType) {
      case 'price-asc':
        return sortedActivities.sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
      case 'price-desc':
        return sortedActivities.sort((a, b) => extractPrice(b.price) - extractPrice(a.price));
      case 'duration-asc':
        return sortedActivities.sort((a, b) => {
          const durationA = a.duration.includes('jour') ? parseInt(a.duration.split(' ')[0], 10) : 0;
          const durationB = b.duration.includes('jour') ? parseInt(b.duration.split(' ')[0], 10) : 0;
          return durationA - durationB;
        });
      case 'duration-desc':
        return sortedActivities.sort((a, b) => {
          const durationA = a.duration.includes('jour') ? parseInt(a.duration.split(' ')[0], 10) : 0;
          const durationB = b.duration.includes('jour') ? parseInt(b.duration.split(' ')[0], 10) : 0;
          return durationB - durationA;
        });
      default:
        return sortedActivities;
    }
  };
  
  // Effet pour filtrer les activités lorsque les filtres changent
  useEffect(() => {
    let filtered = activitiesData.filter((activity) => {
      // Filtre par terme de recherche
      const matchSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        activity.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtre par durée
      const matchDuration = selectedDuration ? activity.duration === selectedDuration : true;
      
      // Filtre par région
      const matchRegion = selectedRegion ? activity.region === selectedRegion : true;
      
      // Filtre par tag
      const matchTag = selectedTagName
        ? activity.tags && activity.tags.includes(selectedTagName)
        : true;
      
      // Filtre par prix
      const price = extractPrice(activity.price);
      const matchMinPrice = minPrice !== '' ? price >= minPrice : true;
      const matchMaxPrice = maxPrice !== '' ? price <= maxPrice : true;
      
      return matchSearch && matchDuration && matchRegion && matchTag && matchMinPrice && matchMaxPrice;
    });
    
    // Tri des activités
    filtered = sortActivities(filtered, sortBy);
    
    setFilteredActivities(filtered);
  }, [searchTerm, selectedDuration, selectedRegion, selectedTagName, minPrice, maxPrice, sortBy]);
  
  // Fonction pour réinitialiser tous les filtres
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedDuration('');
    setSelectedRegion('');
    setSelectedTagName('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('');
  };

  return (
    <div className="activities-container">
      <h1 className="activities-title">Discover Our Activities</h1>
      
      {/* Section des filtres */}
      <div className="filter-section">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filters-container">
          <div className="filter-group">
            <select 
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="filter-select"
            >
              {durationOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="filter-select"
            >
              {regionOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <select 
              value={selectedTagName}
              onChange={(e) => setSelectedTagName(e.target.value)}
              className="filter-select"
            >
              {tagOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group price-filter">
            <input
              type="number"
              placeholder="Min €"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : '')}
              className="price-input"
              min="0"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max €"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
              className="price-input"
              min="0"
            />
          </div>
          
          <div className="filter-group">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <button 
            className="reset-filters-btn"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
      </div>
      
      {/* Affichage des résultats */}
      <div className="results-section">
        <h2 className="results-count">{filteredActivities.length} activités trouvées</h2>
        
        <div className="activities-grid">
          <AnimatePresence>
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))
            ) : (
              <motion.div 
                className="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p>Aucune activité ne correspond à vos critères de recherche.</p>
                <button onClick={resetFilters} className="reset-btn">
                  Réinitialiser les filtres
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ActivityList;