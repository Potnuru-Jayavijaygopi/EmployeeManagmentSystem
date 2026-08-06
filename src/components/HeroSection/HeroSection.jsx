import React from "react";
import { ChevronRight } from "lucide-react";
import Header from "../common/Header";
import Button from "../common/Button";
import "./HeroSection.css";
import { headerLinks, logo } from "../../data/heroSectionData.jsx";

const HeroSection = () => {
  return (
    <div className="new-hero-section">
      <Header
        variant="dark"
        logo={logo}
        links={headerLinks}
        activeLink="Home"
        featuresRedirectPath="/admin/dashboard"
      />

      <div className="new-hero-content container text-center">
        <div className="new-hero-badge">
          Integrated LMS System <ChevronRight size={14} />
        </div>

        <h1 className="new-hero-title">
          Simplify Learning, HR &<br />
          Operations Together
        </h1>

        <p className="new-hero-subtitle">
          A unified LMS platform to manage employee learning, HR operations,
          <br />
          and workforce growth in one place efficiently and seamlessly.
        </p>

        <div className="new-hero-actions">
          <Button variant="outline" className="new-hero-btn-white">
            Try a demo
          </Button>
          <Button variant="primary" className="new-hero-btn-blue">
            Getting Started &rarr;
          </Button>
        </div>

        <div className="new-hero-image-wrapper">
          <img
            src="/HeroLandingPage.png"
            alt="EMS Platform Dashboard"
            className="new-hero-image"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
