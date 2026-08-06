import { useNavigate } from "react-router-dom";
import HeroSection from "../../components/HeroSection";
import OnboardingSection from "../../components/OnboardingSection";
import RoleBasedPortals from "../../components/RoleBasedPortals";
import Footer from "../../components/common/Footer";
import ComplianceSection from "../../components/ComplianceSection";
import AnalyticsSection from "../../components/AnalyticsSection";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <RoleBasedPortals />

      <ComplianceSection />
      <AnalyticsSection />
      <OnboardingSection />

      <Footer />
    </>
  );
};

export default LandingPage;
