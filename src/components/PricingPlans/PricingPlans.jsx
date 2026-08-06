import React from "react";
import PricingCard from "../common/PricingCard";
import { Award, Briefcase, Star } from "lucide-react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { headerLinks, logo } from "../../data/heroSectionData";
import "./PricingPlan.css";
import OrganizationSection from "../OrganizationSection";
function PricingPlans() {
  return (
    <div className="pricingPlansBg">
      <Header
        logo={logo}
        links={headerLinks}
        activeLink="Pricing"
        variant="light"
      />

      <h1 className="text-center mt-5 pt-3 mb-3 fw-semibold">Pricing Plans</h1>
      <p className="text-center text-muted ">
        Simple, transparent pricing designed for teams of all sizes to <br />
        manage employees, learning, and operations efficiently.
      </p>
      <div className="row mb-5 px-5 justiufy-content-center align-items-center">
        <div className="col-lg-4 col-md-6 mb-4">
          <PricingCard
            title="Base"
            description="Perfect for small teams — basic HR tracking and attendance."
            price="19"
            employeeLimit="Up to 10 employees"
            featuresHeader="WHAT'S INCLUDED"
            icon={<Briefcase size={20} />}
            iconBgClass="icon-bg-gray"
            features={[
              "Attendance tracking",
              "Basic tracking",
              "Employee Management",
            ]}
          />
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <PricingCard
            title="Pro"
            description="Complete HR solution for growing teams with payroll & leaves."
            price="49"
            employeeLimit="Up to 50 employees"
            isPopular={true}
            featuresHeader="EVERYTHING IN BASE, PLUS"
            icon={<Award size={20} />}
            iconBgClass="icon-bg-blue"
            features={[
              "Leave management",
              "Payroll Management",
              "Attendance Tracking",
              "Basic Tracking",
              "Employee Management",
            ]}
          />
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <PricingCard
            title="Premium"
            description="Enterprise solution — unlimited employees, AI analytics & chat."
            price="99"
            employeeLimit="Unlimited employees"
            featuresHeader="EVERYTHING IN PRO, PLUS"
            icon={<Star size={20} />}
            iconBgClass="icon-bg-yellow"
            features={[
              "Leave management",
              "Payroll Management",
              "Attendance Tracking",
              "Basic Tracking",
              "Employee Management",
              "Team Chat",
              "AI Analytics",
            ]}
          />
        </div>
      </div>
      <OrganizationSection/>
      <Footer />
    </div>
  );
}

export default PricingPlans;
