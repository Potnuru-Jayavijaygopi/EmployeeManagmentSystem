import React from 'react';

const StatCard = ({ title, mainValue, mainValueColorClass = 'text-primary', footer }) => {
  return (
    <div className="stat-card">
      <h3 className="stat-card-title mb-3">{title}</h3>
      <div className="d-flex flex-column gap-2">
        <div className={`stat-card-main-value ${mainValueColorClass}`}>
          {mainValue}
        </div>
        {footer && <div className="stat-card-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default StatCard;
