import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Button from "../common/Button";
import "./OnboardingSection.css";
import { steps } from "../../data/OnboardingSectionSteps";
import { cards } from "../../data/OnboardingSectionCards";
import { OnboardingMockup } from "./OnboardingMockup.jsx";

const OnboardingSection = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalScrollableDistance = rect.height - windowHeight;
      const scrolled = -rect.top;

      let progress = 0;
      if (totalScrollableDistance > 0) {
        progress = Math.max(0, Math.min(1, scrolled / totalScrollableDistance));
      }

      setScrollProgress(progress * 100);

      if (progress < 0.33) {
        setActiveStep(1);
      } else if (progress < 0.66) {
        setActiveStep(2);
      } else {
        setActiveStep(3);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="onboarding-section" ref={sectionRef}>
      <div className="onboarding-sticky-header pt-5 pb-3 px-4 px-md-5">
        <div className="container">
          <div className="row align-items-end mb-4">
            <div className="col-lg-6">
              <div className="onboarding-badge mb-3">SIMPLE SETUP</div>
              <h2 className="onboarding-title">
                Launch Your <span className="text-primary">Workforce</span>
                <br />
                <span className="text-primary">Operations</span> in Minutes
              </h2>
            </div>
            <div className="col-lg-6 text-lg-end mt-4 mt-lg-0">
              <p
                className="onboarding-header-desc mb-4 ms-auto text-lg-end"
                style={{ maxWidth: "450px" }}
              >
                Launch your organization and streamline workforce operations in
                three easy steps for faster setup and better control.
              </p>
              <div className="d-flex gap-3 justify-content-lg-end">
                <Button variant="primary" className="px-4 py-2">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="px-4 py-2 text-primary border-primary"
                >
                  Explore Features <ArrowRight size={16} className="ms-2" />
                </Button>
              </div>
            </div>
          </div>

          <div className="onboarding-progress-container">
            <div className="progress-bar-background"></div>
            <div
              className="progress-bar-fill"
              style={{ width: `${scrollProgress}%` }}
            ></div>

            <div className="progress-steps">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`progress-step-item ${
                    activeStep >= step.id ? "active" : ""
                  }`}
                  style={{
                    left:
                      step.id === 1 ? "16%" : step.id === 2 ? "50%" : "100%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="progress-step-circle">{step.id}</div>
                  <div className="progress-step-label">{step.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 px-md-5">
        <div className="onboarding-path-wrapper mt-5 pt-5 pb-5">
          {cards.map((card, index) => {
            const isRightSideDot = index % 2 === 0;
            const isPassed = activeStep > card.id;
            const isActive = activeStep >= card.id;
            const isCurrentlyActive = activeStep === card.id;

            const incomingLineActive = isActive;
            const outgoingLineActive = isPassed;

            return (
              <div
                key={card.id}
                className={`onboarding-step-row ${isActive ? "is-active" : ""}`}
                data-step={card.id}
              >

                <div
                  className={`onboarding-card shadow-sm w-100 ${
                    isCurrentlyActive ? "is-current" : ""
                  }`}
                >
                  <div className="row g-0 align-items-center">

                    <div className="col-lg-5 p-4 p-md-5">
                      <div
                        className={`onboarding-card-badge mb-4 ${
                          isCurrentlyActive ? "badge-active" : "badge-inactive"
                        }`}
                      >
                        {card.badge}
                      </div>
                      <p className="onboarding-card-desc mb-4">{card.desc}</p>

                      <ul className="onboarding-checklist list-unstyled mb-0">
                        {card.checklist.map((item, i) => (
                          <li
                            key={i}
                            className="d-flex align-items-center mb-3"
                          >
                            <CheckCircle2
                              size={18}
                              className="text-primary me-3 flex-shrink-0"
                            />
                            <span className="checklist-text">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="col-lg-7 p-4 p-md-5 text-center">
                      <div className="onboarding-mockup-wrapper d-inline-block w-100">
                        <OnboardingMockup stepId={card.id} />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`onboarding-connector-line ${
                    isRightSideDot ? "on-right" : "on-left"
                  } ${isActive ? "bg-path-active" : "bg-path-inactive"}`}
                ></div>

                {index > 0 && (
                  <div
                    className={`snake-line-vertical-in ${
                      isRightSideDot ? "on-right" : "on-left"
                    } ${
                      incomingLineActive ? "bg-path-active" : "bg-path-inactive"
                    }`}
                  ></div>
                )}

                {index < cards.length - 1 && (
                  <>
                    <div
                      className={`snake-line-vertical-out ${
                        isRightSideDot ? "on-right" : "on-left"
                      } ${
                        outgoingLineActive
                          ? "bg-path-active"
                          : "bg-path-inactive"
                      }`}
                    ></div>
                    <div
                      className={`snake-line-horizontal ${
                        outgoingLineActive
                          ? "bg-path-active"
                          : "bg-path-inactive"
                      }`}
                    ></div>
                  </>
                )}

                <div
                  className={`dot-container ${
                    isRightSideDot ? "on-right" : "on-left"
                  }`}
                >
                  <div
                    className={`dot-inner ${isActive ? "active" : ""}`}
                  ></div>
                </div>

                <div
                  className={`big-number-container ${
                    isRightSideDot ? "on-right" : "on-left"
                  }`}
                >
                  <div
                    className={`onboarding-big-number ${
                      isCurrentlyActive
                        ? "text-primary-active"
                        : "text-gray-inactive"
                    }`}
                  >
                    {card.id}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OnboardingSection;
