import React from "react";
import FeatureGridSection from "../common/FeatureGridSection";
import { features } from "../../data/complianceSectionData";
import { dashboardMockup } from "./dashboardMockup.jsx";

const ComplianceSection = () => {
  return (
    <FeatureGridSection
      badgeText="COMPLIANCE MANAGEMENT"
      title="Policy & Compliance Tracking Made Simple"
      description="Ensure 100% adherence to company policies. Automate reminders, track reading progress, and maintain a complete audit log of employee acknowledgments."
      features={features}
      bottomComponent={dashboardMockup}
    />
  );
};

export default ComplianceSection;
