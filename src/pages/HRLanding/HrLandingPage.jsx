import React from "react";
import PortalHeroSection from "../../components/PortalHeroSection/PortalHeroSection";
import Header from "../../components/common/Header";
import { headerLinks, logo } from "../../data/heroSectionData";
import Button from "../../components/common/Button";
import ProvenImpact from "../../components/ProvenImpact";
import "./HrLandingPage.css";
import {
  featuresData,
  hrFeaturesData,
  hrProvenImpact,
} from "../../data/LandingPageFeaturesData";
import FeatureShowcase from "../../components/FeatureShowcase/FeatureShowcase";
import OperationalFlow from "../../components/OperationalFlow/OperationalFlow";
import FooterCTA from "../../components/FooterCTA";
function HrLandingPage() {
  return (
    <div className="hrBg">
      <Header
        variant="light"
        logo={logo}
        links={headerLinks}
        activeLink="Home"
        featuresRedirectPath="/hr/dashboard"
        theme="green"
      />
      <PortalHeroSection
        badge="HR PORTAL"
        theme="green"
        headingStart="Manage Workforce Operations Through One "
        headingHighlight="Centralized HR Workspace"
        desc="Streamline employee management, attendance, onboarding, compliance, and HR operations through a connected platform designed for growing organizations."
        checklist={[
          "Faster HR operations",
          "Centralized employee management",
          "Real-time workforce visibility",
        ]}
        primaryBtn="Request Demo"
        secondaryBtn="Explore Features"
        imageUrl="/heroImage.png"
      />

      <FeatureShowcase
        badge="CORE FEATURES"
        title="Everything your employees need, in one place"
        subtitle="Hover each feature to explore the full dashboard experience. Every module is built for real operational workflows."
        theme="green"
        features={featuresData}
      />
      <OperationalFlow
        badge="HR OPERATIONAL FLOW"
        title="From Hire to Retire — The Complete HR Journey"
        subtitle="See how HR operations flow through every stage of the employee lifecycle in a connected system."
        theme="green"
        steps={hrFeaturesData}
      />

      <ProvenImpact
        badge="PROVEN IMPACT"
        title="Measurable results from day one"
        subtitle="Enterprise HR teams see significant operational improvements within weeks of deploying the HR Portal."
        theme="green"
        metrics={hrProvenImpact}
      />

      <FooterCTA
        badge="GET STARTED TODAY"
        title="Transform HR Operations Through One Unified Platform"
        subtitle="Manage employees, compliance, attendance, and workforce operations through a connected HR experience designed for modern organizations."
        theme="green"
        primaryBtnText="Start a free Trail"
        secondaryBtnText="Schedule Demo"
      />
    </div>
  );
}

export default HrLandingPage;
