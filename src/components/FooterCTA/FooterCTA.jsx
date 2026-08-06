import React from 'react';
import { Check } from 'lucide-react';
import './FooterCTA.css';
import Button from '../common/Button';

const FooterCTA = ({
  badge = "GET STARTED TODAY",
  title = "Empower Managers with Smarter Team Operations",
  subtitle = "Track performance, manage projects, oversee approvals, and drive team productivity through one connected management platform.",
  primaryBtnText = "Start Free Trial",
  secondaryBtnText = "Schedule a Demo",
  theme = "purple"
}) => {
  return (
    <section className="footer-cta-section py-5">
      <div className="container-fluid px-4 px-md-5 py-5 text-center">

        <div className={`cta-badge text-${theme} mb-3`}>{badge}</div>

        <h2 className="cta-title text-white mb-4 mx-auto">{title}</h2>

        <p className="cta-subtitle mx-auto mb-5">{subtitle}</p>

        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mb-5">
          <Button className={`btn cta-btn-primary btn-theme-${theme}`}>
            {primaryBtnText}
          </Button>
          <Button variant="secondary" className="btn cta-btn-secondary">
            {secondaryBtnText}
          </Button>
        </div>

        <div className="cta-checklist d-flex flex-column flex-md-row justify-content-center gap-4">
          <div className="cta-check-item">
            <Check size={16} className="text-green me-2" strokeWidth={3} />
            <span>No credit card required</span>
          </div>
          <div className="cta-check-item">
            <Check size={16} className="text-green me-2" strokeWidth={3} />
            <span>14-day free trial</span>
          </div>
          <div className="cta-check-item">
            <Check size={16} className="text-green me-2" strokeWidth={3} />
            <span>Enterprise SLA included</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FooterCTA;
