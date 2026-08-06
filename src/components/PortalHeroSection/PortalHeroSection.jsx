import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import './PortalHeroSection.css';
import Button from '../common/Button';

const PortalHeroSection = ({
  badge = "HR PORTAL",
  theme = "green",
  headingStart = "Manage Workforce Operations Through One ",
  headingHighlight = "Centralized HR Workspace",
  desc = "Streamline employee management, attendance, onboarding, compliance, and HR operations through a connected platform designed for growing organizations.",
  checklist = [
    "Faster HR operations",
    "Centralized employee management",
    "Real-time workforce visibility"
  ],
  primaryBtn = "Request Demo",
  secondaryBtn = "Explore Features",
  imageUrl = "https://placehold.co/800x600/FFFFFF/10B981?text=Dashboard"
}) => {
  return (
    <section className="portal-hero-section py-2">
      <div className="container-fluid px-4 px-md-5">
        <div className={`portal-hero-wrapper theme-${theme}`}>
          <div className="row g-5 align-items-center">

            <div className="col-lg-5 pe-lg-5">
              <div className={`portal-hero-badge badge-${theme} mb-4`}>
                <span className="dot"></span>
                {badge}
              </div>

              <h1 className="portal-hero-heading mb-4">
                {headingStart}
                <span className={`text-${theme}`}>
                  {headingHighlight}
                </span>
              </h1>

              <p className="portal-hero-desc mb-5">
                {desc}
              </p>

              <ul className="portal-hero-checklist list-unstyled mb-5">
                {checklist.map((item, idx) => (
                  <li key={idx} className="d-flex align-items-center mb-3">
                    <Check size={20} strokeWidth={3} className={`me-3 text-${theme}`} />
                    <span className="hero-checklist-text">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="d-flex gap-3 flex-wrap">
                <Button className={`btn hero-btn-primary btn-${theme} px-4 py-2`}>
                  {primaryBtn}
                </Button>
                <Button variant="outline" className={`btn hero-btn-outline outline-${theme} px-4 py-2`}>
                  {secondaryBtn} <ArrowRight size={16} className="ms-2" />
                </Button>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="portal-hero-image-showcase text-center">
                <img 
                  src={imageUrl} 
                  alt={badge} 
              
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalHeroSection;
