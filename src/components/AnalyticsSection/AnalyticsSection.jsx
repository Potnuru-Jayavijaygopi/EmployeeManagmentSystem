import { useState } from "react";
import "./AnalyticsSection.css";
import { features } from "../../data/analyticsSectionFeatures";

const AnalyticsSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="analytics-section py-5 my-5">
      <div className="container-fluid px-4 px-md-5">
        <div className="row g-5 align-items-center">
          <div className="col-lg-8">
            <div className="analytics-header ">
              <div className="analytics-badge">ANALYTICS & REPORTING</div>
              <h2 className="analytics-title">Real-Time Workforce Insights</h2>
              <p className="analytics-subtitle">
                Track employee learning progress, quiz performance, course
                completion, and compliance status in real-time. Make data-driven
                decisions to improve your operational efficiency.
              </p>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="analytics-features-list">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                const isActive = activeFeature === idx;

                return (
                  <div
                    key={idx}
                    className={`analytics-feature-card ${
                      isActive ? "active" : ""
                    }`}
                    onClick={() => setActiveFeature(idx)}
                  >
                    <div
                      className={`analytics-icon-wrapper bg-light-${feature.iconColor}`}
                    >
                      <Icon size={20} className={`text-${feature.iconColor}`} />
                    </div>
                    <div className="analytics-feature-text">
                      <h4 className="analytics-feature-title">
                        {feature.title}
                      </h4>
                      <p className="analytics-feature-desc">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-lg-7">
            <div className="analytics-image-wrapper ps-lg-4">
              <img
                src={features[activeFeature].image}
                alt={features[activeFeature].title}
                className="img-flui rounded-4 shadow-lg w-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;
