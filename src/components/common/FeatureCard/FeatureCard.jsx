import React from 'react';
import './FeatureCard.css';

const FeatureCard = ({ title, description, icon, benefitText }) => {
  return (
    <div className="feature-card">
      <div className="feature-icon-wrapper">
        {icon}
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>

      <div className="feature-divider"></div>

      <div className="feature-footer">
        <div className="feature-dots">
          <span className="dot dot-active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <span className="feature-benefit">{benefitText}</span>
      </div>
    </div>
  );
};

export default FeatureCard;
