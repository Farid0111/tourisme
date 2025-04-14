import React from 'react';
import ActivityList from '../components/ActivityList';
import { activitiesData } from '../utils/activitiesData';
import '../styles/Activities.css';

const Activities: React.FC = () => {
  return (
    <div className="activities-page">
      <div className="activities-hero">
        <div className="container">
          <h1>Activités et excursions au Rwanda</h1>
          <p>Découvrez les meilleures expériences à vivre lors de votre voyage au pays des mille collines</p>
        </div>
      </div>

      <div className="container">
        <div className="intro-text">
          <h2>Explorez le Rwanda à votre rythme</h2>
          <p>
            Le Rwanda offre une grande variété d'activités pour tous les types de voyageurs, 
            des amateurs de nature aux passionnés de culture. Découvrez notre sélection d'expériences 
            uniques et créez l'itinéraire qui vous ressemble.
          </p>
        </div>

        <ActivityList activities={activitiesData} />
      </div>
    </div>
  );
};

export default Activities; 