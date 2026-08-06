import React, { useEffect, useRef, useState } from "react";
import "./OperationalFlow.css";

const OperationalFlow = ({
  badge = "HR OPERATIONAL FLOW",
  title = "From Hire to Retire — The Complete HR Journey",
  subtitle = "See how HR operations flow through every stage of the employee lifecycle in a connected system.",
  theme = "green",
  steps = [],
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalScroll = rect.height - windowHeight;

      const scrolled = -rect.top;

      let progress = scrolled / totalScroll;

      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="operational-flow-section" ref={sectionRef}>
      <div className="operational-sticky-wrapper">
        <div className="container-fluid px-4 px-md-5 w-100">
          <div className="text-center mb-5 pb-4">
            <div className={`flow-badge text-${theme} mb-3`}>{badge}</div>
            <h2 className="flow-title text-white mb-3">{title}</h2>
            <p className="flow-subtitle">{subtitle}</p>
          </div>

          <div className="flow-steps-wrapper">
            <div className="flow-line-bg"></div>

            <div
              className={`flow-line-active bg-${theme}`}
              style={{ width: `${scrollProgress * 80}%` }}
            ></div>

            <div className="row g-0 position-relative z-2">
              {steps.map((step, index) => {
                const Icon = step.icon;

                const threshold = index * 0.25;
                const isActive = scrollProgress >= threshold - 0.05;

                return (
                  <div key={index} className="col flow-step-col text-center">
                    <div className="flow-icon-container mx-auto mb-4">
                      <div
                        className={`flow-icon-box theme-${theme} ${
                          isActive ? "is-active" : ""
                        }`}
                      >
                        {Icon && <Icon size={24} className="flow-icon" />}
                      </div>
                    </div>

                    <div
                      className={`flow-text-content ${
                        isActive ? "fade-in" : ""
                      }`}
                    >
                      <div className={`flow-step-num text-${theme} mb-2`}>
                        STEP {step.id}
                      </div>
                      <h4 className="flow-step-title text-white mb-2">
                        {step.title}
                      </h4>
                      <p className="flow-step-desc mb-0">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OperationalFlow;
