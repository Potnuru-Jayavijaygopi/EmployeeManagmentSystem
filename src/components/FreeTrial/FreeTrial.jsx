import React from 'react';
import { Hexagon, EyeOff, ShieldCheck } from 'lucide-react';
import Button from '../common/Button';
import './FreeTrial.css';

const FreeTrial = () => {
  return (
    <div className="hero-section">

      <div className="hero-content container-fluid px-4">
        <h1 className="hero-title">Start Managing Your<br/>Workforce Smarter</h1>
        <p className="hero-subtitle">
          Launch your organization in minutes with EMS, LMS, compliance<br/>
          tracking, and role-based management.
        </p>

        <div className="hero-form-card">
          <div className="mb-3">
            <label className="hero-form-label">Company Name</label>
            <input type="text" className="hero-form-input" placeholder="ABCdD Co" />
          </div>
          <div className="mb-3">
            <label className="hero-form-label">Work Email</label>
            <input type="email" className="hero-form-input" placeholder="you@company.com" />
          </div>
          <div className="mb-4 position-relative">
            <label className="hero-form-label">Password <span className="text-muted">(Optional)</span></label>
            <input type="password" className="hero-form-input pe-5" placeholder="••••••••" />
            <EyeOff size={16} className="hero-form-eye" />
          </div>

          <Button variant="primary" className="w-100 py-2 mb-3 hero-submit-btn">
            Start Free Trial &rarr;
          </Button>

          <div className="hero-form-footer">
            <ShieldCheck size={14} className="text-success me-1" /> No credit card required
          </div>
        </div>

        <div className="hero-operations-divider"></div>

        <div className="hero-operations-title">
          BUILT FOR MODERN WORKFORCE OPERATIONS
        </div>

        <div className="hero-operations-tags">
          <div className="hero-tag"><Hexagon size={14} /> Enterprise Administration</div>
          <div className="hero-tag"><Hexagon size={14} /> HR Teams</div>
          <div className="hero-tag"><Hexagon size={14} /> Managers</div>
          <div className="hero-tag"><Hexagon size={14} /> Operations</div>
          <div className="hero-tag"><Hexagon size={14} /> Learning & Development</div>
        </div>
      </div>
    </div>
  );
};

export default FreeTrial;
