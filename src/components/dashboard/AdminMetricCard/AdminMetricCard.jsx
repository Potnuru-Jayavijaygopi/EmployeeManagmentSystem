import React from 'react';
import './AdminMetricCard.css';

const AdminMetricCard = ({ title, value, subtitle, icon: Icon, valueColor = "dark-main" }) => {
  return (
    <div className="admin-metric-card">
      <div className="amc-header">
        <h4 className="amc-title">{title}</h4>
        <div className="amc-icon-box">
          <Icon size={20} strokeWidth={2} />
        </div>
      </div>
      <div className={`amc-value text-${valueColor}`}>
        {value}
      </div>
      <div className="amc-subtitle">
        {subtitle}
      </div>
    </div>
  );
};

export default AdminMetricCard;
