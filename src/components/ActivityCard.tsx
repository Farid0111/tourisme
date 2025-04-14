import { Activity } from '../utils/types';
import { useTranslation } from '../i18n';
import '../styles/ActivityList.css';

const ActivityCard = ({ activity }) => {
  const { t } = useTranslation();

  return (
    <div className={`activity-card ${activity.featured ? 'featured' : ''}`}>
      <div className="activity-image">
        <img src={activity.image} alt={activity.title} />
        {activity.featured && (
          <div className="activity-featured">{t("activities.featured")}</div>
        )}
        <div className="activity-price">{activity.price}</div>
      </div>
      
      <div className="activity-content">
        <h3 className="activity-title">{activity.title}</h3>
        
        <div className="activity-meta">
          <div className="activity-duration">
            <span className="duration-icon"></span>
            {activity.duration}
          </div>
          <div className="activity-region">
            <span className="region-icon"></span>
            {activity.region}
          </div>
        </div>
        
        <p className="activity-description">
          {activity.id === 1 ? t("activities.trek.description") : activity.shortDescription}
        </p>
      </div>
    </div>
  );
};

export default ActivityCard; 