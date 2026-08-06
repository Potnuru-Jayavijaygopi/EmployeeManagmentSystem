import React from "react";
import "./FeatureShowcase.css";

const FeatureShowcase = ({
  badge = "CORE FEATURES",
  title = "",
  subtitle = "",
  theme = "blue",
  features = [],
}) => {
  return (
    <section className="feature-showcase-section py-5">
      <div className="container-fluid px-4 px-md-5">
        <div className="feature-showcase-header mb-5 pb-4">
          <div className={`showcase-badge text-${theme} mb-3`}>{badge}</div>
          <h2 className="showcase-title mb-3">{title}</h2>
          <p className="showcase-subtitle">{subtitle}</p>
        </div>

        <div className="feature-blocks-container">
          {features.map((feature, idx) => {
            const isImageRight = idx % 2 === 0;
            const Icon = feature.icon;

            return (
              <div
                key={idx}
                className={`feature-block theme-${theme} mb-5 pb-5`}
              >
                <div className="row g-5 align-items-center">
                  <div
                    className={`col-lg-6 ${
                      isImageRight ? "order-2" : "order-1"
                    }`}
                  >
                    <div className="feature-image-wrapper text-center">
                      <img
                        src={feature.imageUrl}
                        alt={feature.title}
                        className="img-flui w-100 rounded-4 shadow-l"
                      />
                    </div>
                  </div>

                  <div
                    className={`col-lg-6 ${
                      isImageRight ? "order-1 pe-lg-5" : "order-2 ps-lg-5"
                    }`}
                  >
                    <div className="feature-text-content">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div
                          className={`feature-icon-box bg-${theme}-light text-${theme}`}
                        >
                          {Icon && <Icon size={20} strokeWidth={2.5} />}
                        </div>
                        <h3 className="feature-block-title mb-0">
                          {feature.title}
                        </h3>
                      </div>

                      <p className="feature-block-desc mb-4">{feature.desc}</p>

                      <ul className="feature-list list-unstyled mb-5">
                        {feature.list.map((item, i) => (
                          <li key={i} className="feature-list-item">
                            {item}
                          </li>
                        ))}
                      </ul>

                      {feature.metricLabel && feature.metricValue && (
                        <div className="feature-metric">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="metric-label">
                              {feature.metricLabel}
                            </span>
                            <span className="metric-value">
                              {feature.metricValue}
                            </span>
                          </div>
                          <div className="metric-progress-bg">
                            <div
                              className={`metric-progress-bar bg-${theme}`}
                              style={{
                                width:
                                  feature.metricValue.replace(/\D/g, "") + "%",
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
