import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import Button from "../Button";

const Header = ({
  logo,
  links = [],
  activeLink = "",
  featuresRedirectPath,
  rightContent,
  variant = "light",
  theme = "blue",
}) => {
  const navigate = useNavigate();

  return (
    <header className={`navbar-header navbar-${variant}`}>
      <div className="navbar-logo-section">{logo}</div>

      {links && links.length > 0 && (
        <nav className="navbar-links">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.href || "#"}
              className={`navbar-link ${
                activeLink === link.label ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                if (link.label === "Features" && featuresRedirectPath) {
                  navigate(featuresRedirectPath);
                } else if (link.href && link.href !== "#") {
                  navigate(link.href);
                }
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}

      <div className="navbar-actions">
        {rightContent ? (
          rightContent
        ) : (
          <div className="d-flex align-items-center gap-3">
            <Button variant="outline" className={`hero-login-btn`} onClick={() => navigate("/auth/login")}>
              Login
            </Button>
            <Button variant="primary" className={`hero-get-started-btn theme-${theme}`} onClick={() => navigate(featuresRedirectPath || "/auth/login")}>
              Get Started
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
