import React from 'react';
import './FeatureGridSection.css';

const FeatureGridSection = ({ 
  badgeText, 
  title, 
  description, 
  features = [], 
  bottomComponent 
}) => {
  return (
    <section className="feature-grid-section py-5 my-5">
      <div className="container-fluid px-4 px-md-5">

        <div className="row mb-5">
          <div className="col-lg-8">
            {badgeText && (
              <div className="feature-grid-badge mb-3">
                {badgeText}
              </div>
            )}
            <h2 className="feature-grid-title">{title}</h2>
            <p className="feature-grid-subtitle">{description}</p>
          </div>
        </div>

        {features.length > 0 && (
          <div className="row g-4 mb-5">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div className="col-lg-4 col-md-6" key={idx}>
                  <div className="feature-grid-card h-100">
                    <div className="feature-card-icon-wrapper mb-4">
                      {Icon && <Icon size={20} />}
                    </div>
                    <h4 className="feature-card-title">{feature.title}</h4>
                    <p className="feature-card-desc">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {bottomComponent && (
          <div className="feature-grid-bottom-wrapper mt-5">
            {bottomComponent}
          </div>
        )}

      </div>
    </section>
  );
};

export default FeatureGridSection;
