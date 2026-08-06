import React from "react";
import { headerLinks, logo } from "../../data/heroSectionData";
import Button from "../../components/common/Button";
import PortalHeroSection from "../../components/PortalHeroSection/PortalHeroSection";
import {
  employeePortalCheckList,
  managerFeaturesData,
  managerOperationalFlowData,
  managerPortalImpact,
} from "../../data/LandingPageFeaturesData";
import Header from "../../components/common/Header";
import "./ManagerPortal.css";
import FeatureShowcase from "../../components/FeatureShowcase/FeatureShowcase";
import ProvenImpact from "../../components/ProvenImpact";
import OperationalFlow from "../../components/OperationalFlow/OperationalFlow";
import FooterCTA from "../../components/FooterCTA";
function ManagerPortalLandingPage() {
  return (
    <div className="managerBg">
      <Header
        variant="light"
        logo={logo}
        links={headerLinks}
        activeLink="Home"
        featuresRedirectPath="/manager/dashboard"
        theme="purple"
      />
      <PortalHeroSection
        badge="MANAGER PORTAL"
        theme="purple"
        headingStart="Lead Teams with "
        headingHighlight="Real-Time Visibility and Operational Control"
        desc="Monitor team performance, manage approvals, track projects, and streamline team operations through a centralized management workspace."
        checklist={[
          "Real-time team visibility across all operations",
          "Faster approval workflows — one centralized queue",
          "Better productivity tracking & team analytics",
        ]}
        primaryBtn="Request Demo"
        secondaryBtn="Explore Features"
        imageUrl="/managerLandingPageImg.png"
      />

      <FeatureShowcase
        badge="CORE FEATURES"
        title="Everything managers need, in one control center."
        subtitle="Explore the full dashboard experience of our key modules built for real team management workflows."
        theme="purple"
        features={managerFeaturesData}
      />
    <OperationalFlow
        badge="MANAGER OPERATIONAL FLOW"
        title="The Manager's Daily Command Center"
        subtitle="From morning review to end-of-day reporting — every step of team management in one connected flow."
        theme="purple"
        steps={managerOperationalFlowData}
      />

      <ProvenImpact
        badge="PROVEN IMPACT"
        title="Measurable results from day one"
        subtitle="Enterprise teams see significant operational improvements within weeks of deploying the Manager Portal."
        theme="purple"
        metrics={managerPortalImpact}
      />
        <FooterCTA
        badge="GET STARTED TODAY"
        title="Empower Managers with Smarter Team Operations"
        subtitle="Track performance, manage projects, oversee approvals, and drive team productivity through one connected management platform."
        theme="purple"
        primaryBtnText="Start Free Trial"
        secondaryBtnText="Schedule a Demo"
      />
    </div>
  );
}

export default ManagerPortalLandingPage;
