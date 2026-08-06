import { useState } from "react";
import { ArrowRight } from "lucide-react";
import "./RoleBasedPortals.css";
import Button from "../common/Button";
import { portals } from "../../data/roleBasedPortals";

const RoleBasedPortals = () => {
  const [activeTab, setActiveTab] = useState("hr");

  const activePortal = portals.find((p) => p.id === activeTab);

  return (
    <section className="role-portals-section py-5 my-5">
      <div className="container-fluid px-4 px-md-5">
        <div className="text-left mb-5">
          <div className="system-structure-badge">SYSTEM STRUCTURE</div>
          <h2 className="role-portals-title">Role-Based Portal Overview</h2>
          <p className="role-portals-subtitle">
            A unified platform offering specialized workspaces designed to
            optimize
            <br />
            workflows for every level of your organization.
          </p>
        </div>

        <div className="portal-tabs-wrapper mb-5">
          {portals.map((portal) => {
            const Icon = portal.icon;
            const isActive = activeTab === portal.id;
            return (
              <div
                key={portal.id}
                className={`portal-tab ${
                  isActive ? `active active-${portal.theme}` : ""
                }`}
                onClick={() => setActiveTab(portal.id)}
              >
                <Icon size={16} />
                <span>{portal.title}</span>
              </div>
            );
          })}
        </div>

        <div
          className={`portal-content-card theme-${activePortal.theme} fade-in-up`}
          key={activePortal.id}
        >
          <div className="portal-card-grid-bg"></div>
          <div className="row g-5 align-items-center p-4 p-lg-5 position-relative z-1">
            <div className="col-lg-5">
              <div className="portal-text-content">
                <div
                  className={`portal-icon-badge badge-${activePortal.theme} mb-4`}
                >
                  <activePortal.icon size={18} />
                  <span>{activePortal.shortTitle}</span>
                </div>

                <h3 className="portal-card-title mb-4">
                  {activePortal.heading}
                </h3>
                <p className="portal-card-desc mb-5">{activePortal.desc}</p>

                <Button
                  className={`btn portal-btn btn-${activePortal.theme} mb-5`}
                >
                  View Core Insights <ArrowRight size={16} className="ms-2" />
                </Button>

                <div className="portal-features-grid">
                  {activePortal.features.map((feature, idx) => (
                    <div className="portal-feature-item" key={idx}>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="portal-image-wrapper">
                <img
                  src={activePortal.imageUrl}
                  alt={activePortal.title}
           
                />
              </div>
            </div>
          </div>

          <div
            className={`portal-impact-banner banner-${activePortal.theme} position-relative z-1`}
          >
            <span className="impact-label">IMPACT METRICS</span>
            <span className="impact-text">{activePortal.impact}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleBasedPortals;
