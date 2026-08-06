import React from "react";
import { ArrowUp } from "lucide-react";
import "./ProvenImpact.css";

const ProvenImpact = ({
  badge = "PROVEN IMPACT",
  title = "Measurable results from day one",
  subtitle = "",
  theme = "blue",
  metrics = [],
}) => {
  return (
    <section className="proven-impact-section py-5 my-5">
      <div className="container-fluid px-4 px-md-5">
        <div className="text-center mb-5 pb-3">
          <div className={`impact-badge text-${theme} mb-3`}>{badge}</div>
          <h2 className="impact-title mb-3">{title}</h2>
          <p className="impact-subtitle">{subtitle}</p>
        </div>

        <div className="row g-4">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;

            return (
              <div key={idx} className="col-12 col-md-6 col-xl-3">
                <div className="impact-card">
                  <div
                    className={`impact-icon-box bg-${metric.color}-light text-${metric.color} mb-4`}
                  >
                    {Icon && <Icon size={22} strokeWidth={2.5} />}
                  </div>

                  <div
                    className={`impact-metric-value text-${metric.color} mb-3`}
                  >
                    {metric.value}
                  </div>

                  <h4 className="impact-card-title mb-3">{metric.title}</h4>
                  <p className="impact-card-desc mb-4">{metric.desc}</p>

                  <div className="impact-trend-pill">
                    <ArrowUp size={14} strokeWidth={3} className="me-1" />
                    {metric.trend}
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

export default ProvenImpact;
