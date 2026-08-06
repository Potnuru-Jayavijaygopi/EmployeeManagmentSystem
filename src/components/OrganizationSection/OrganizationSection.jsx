import React from 'react';
import FeatureCard from '../common/FeatureCard';
import { Users, Globe, Code2, Building2 } from 'lucide-react';
import './OrganizationSection.css';

const OrganizationSection = () => {
  return (
    <section className="org-section py-5 my-5">
      <div className="container-fluid px-4 px-md-5">
        <div className="text-center mb-5">
          <h2 className="org-section-title">Built for Every Organisation</h2>
          <p className="org-section-subtitle">
            A flexible workforce platform that scales from small teams to enterprise-level operations.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          <div className="col-lg-5 col-md-6">
            <FeatureCard 
              title="Small Teams"
              description="Manage workforce operations with simple tools designed for small growing teams."
              icon={<Users size={20} strokeWidth={2.5} />}
              benefitText="Increase operational efficiency by 25%"
            />
          </div>
          <div className="col-lg-5 col-md-6">
            <FeatureCard 
              title="Remote Teams"
              description="Coordinate distributed workforces with seamless sync and localized compliance tools."
              icon={<Globe size={20} strokeWidth={2.5} />}
              benefitText="Connect teams across 50+ timezones"
            />
          </div>
          <div className="col-lg-5 col-md-6">
            <FeatureCard 
              title="Software Teams"
              description="High-velocity resource planning and project integration for agile engineering orgs."
              icon={<Code2 size={20} strokeWidth={2.5} />}
              benefitText="Optimize workforce visibility across teams"
            />
          </div>
          <div className="col-lg-5 col-md-6">
            <FeatureCard 
              title="Enterprise Organizations"
              description="Deep control, advanced security, and cross-departmental analytics for global scale."
              icon={<Building2 size={20} strokeWidth={2.5} />}
              benefitText="Scale seamlessly with enterprise-grade control"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganizationSection;
