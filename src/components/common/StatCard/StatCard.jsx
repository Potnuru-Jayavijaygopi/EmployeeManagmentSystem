import React from 'react';

const StatCard = ({ 
  title, 
  icon, 
  colorTheme = 'primary', 
  mainValue,
  secondaryValue,
  subtitle,
  subtitleColor = 'sub-text', 
  mainValueColorClass = '',
  progressValue, 
  footerText
}) => {
  return (
    <div className="stat-card card-hover h-100">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <h6 className="stat-card-title">{title}</h6>
        <div className={`stat-card-icon bg-${colorTheme}-light text-${colorTheme}`}>
          {icon}
        </div>
      </div>

      <div className="mb-2">
        <span className={`stat-card-main-value ${mainValueColorClass}`}>{mainValue}</span>
        {secondaryValue && (
          <span className="stat-card-secondary-value"> {secondaryValue}</span>
        )}
      </div>

      {subtitle && (
        <div className={`stat-card-subtitle text-${subtitleColor === 'sub-text' ? 'muted' : subtitleColor} fw-${subtitleColor !== 'sub-text' ? 'medium' : 'normal'} mb-4`}>
          {subtitle}
        </div>
      )}

      {progressValue !== undefined && (
        <div className="stat-progress-container mb-2">
          <div 
            className={`stat-progress-bar bg-${colorTheme}`} 
            style={{ width: `${Math.min(100, Math.max(0, progressValue))}%` }}
          ></div>
        </div>
      )}

      {footerText && (
        <div className="stat-card-footer">
          {footerText}
        </div>
      )}
    </div>
  );
};

export default StatCard;
