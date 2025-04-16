import React from 'react';
import ActivityList from '../components/ActivityList';
import '../styles/Activities.css';

const Activities: React.FC = () => {
  return (
    <div className="activities-page">
      <div className="container">
        <div className="activities-header">
          <h1>Nos Activités au Rwanda</h1>
          <p>
            Découvrez notre sélection d'expériences uniques pour explorer le Rwanda.
            Des treks de gorilles aux safaris, en passant par les immersions culturelles,
            trouvez l'aventure qui vous correspond.
          </p>
        </div>
        
        <section className="activities-content">
          <ActivityList />
        </section>
      </div>
    </div>
  );
};

export default Activities; 