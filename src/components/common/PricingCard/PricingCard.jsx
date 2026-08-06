import React from "react";
import { User, Check, Star } from "lucide-react";
import Button from "../Button";
import "./PricingCard.css";

const PricingCard = ({
  title,
  description,
  price,
  billingText = "Billed monthly",
  employeeLimit,
  buttonText = "Start free trial",
  onButtonClick,
  featuresHeader = "WHAT'S INCLUDED",
  features = [],
  isPopular = false,
  icon,
  iconBgClass = "icon-bg-gray",
}) => {
  return (
    <div className={`pricing-card ${isPopular ? "pricing-card-popular" : ""}`}>
      {isPopular && (
        <div className="pricing-card-badge">
          <Star size={12} className="me-1" strokeWidth={3} /> Most popular
        </div>
      )}

      <div className={`pricing-icon-wrapper ${iconBgClass}`}>{icon}</div>

      <h3 className="pricing-title">{title}</h3>
      <p className="pricing-description">{description}</p>

      <div className="pricing-price-container">
        <span className="pricing-currency">$</span>
        <span className="pricing-amount">{price}</span>
        <span className="pricing-period">/mo</span>
      </div>
      <div className="pricing-billing">{billingText}</div>

      <div className="pricing-limit">
        <User size={16} strokeWidth={2} /> <span>{employeeLimit}</span>
      </div>

      <div className="pricing-divider"></div>

      <Button
        variant={isPopular ? "primary" : "outline"}
        className="w-100 mb-4"
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>

      <div className="pricing-features-header">{featuresHeader}</div>

      <ul className="pricing-features-list">
        {features.map((feature, idx) => (
          <li key={idx} className="pricing-feature-item">
            <Check
              size={16}
              className="pricing-feature-check"
              strokeWidth={3}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;
