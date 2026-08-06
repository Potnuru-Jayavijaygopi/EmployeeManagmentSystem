import React from "react";
import { Mail, Phone, Globe } from "lucide-react";
import { FiLinkedin, FiGithub } from "react-icons/fi";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container pt-0">
      <div className="container-fluid px-4 px-md-5 py-5">
        <div className="row g-4 mb-4">
          <div className="col-lg-4 col-md-12 pe-lg-5">
            <div className="footer-logo mb-4">
              <div className="footer-logo-icon">
                <div className="footer-logo-inner-dot"></div>
              </div>
              <span className="footer-logo-text">EMS Platform</span>
            </div>
            <p className="footer-description">
              A modern Employee Management System built for growing
              organizations to streamline workforce operations, learning, and
              compliance.
            </p>
          </div>

          <div className="col-lg-2 col-md-4 col-6">
            <h5 className="footer-heading">Product</h5>
            <ul className="footer-links">
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">Use Cases</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Start free trial</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-4 col-6">
            <h5 className="footer-heading">Company</h5>
            <ul className="footer-links">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Projects</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-4">
            <h5 className="footer-heading">Get in Touch</h5>
            <ul className="footer-contact">
              <li>
                <Mail size={16} className="contact-icon" />
                <span>contact@pegorion.com</span>
              </li>
              <li>
                <Phone size={16} className="contact-icon" />
                <span>+91 XXXXX XXXXX</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom mt-5">
          <div className="footer-copyright">
            © 2026 Pegorion Software Solutions Pvt. Ltd. All rights reserved.
          </div>
          <div className="footer-social">
            <a href="#" aria-label="Website">
              <Globe size={18} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FiLinkedin size={18} />
            </a>
            <a href="#" aria-label="GitHub">
              <FiGithub size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
