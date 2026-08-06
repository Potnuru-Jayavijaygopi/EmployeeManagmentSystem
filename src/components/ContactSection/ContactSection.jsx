import { useState } from "react";
import { Calendar, Send, Mail, Minus, Plus } from "lucide-react";
import "./ContactSection.css";
import { faqs } from "../../data/contactSectionFaqs";
import { renderDemoForm, renderEmailForm, renderQuoteForm } from "./formRender.jsx";

const ContactSection = () => {
  const [activeTab, setActiveTab] = useState("demo");
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="contact-section py-5 my-5">
      <div className="container-fluid px-4 px-md-5">
        <div className="text-center mb-5">
          <h2 className="contact-section-title">Connect With Us</h2>
          <p className="contact-section-subtitle">
            Need support, pricing details, or a personalized demo?
            <br />
            Connect with our team to explore EMS for your organization.
          </p>
        </div>

        <div className="contact-tabs-wrapper mb-5">
          <div
            className={`contact-tab-card ${
              activeTab === "demo" ? "active" : ""
            }`}
            onClick={() => setActiveTab("demo")}
          >
            <Calendar size={20} className="contact-tab-icon" />
            <h4 className="contact-tab-title">Request a demo</h4>
            <p className="contact-tab-desc">
              Schedule a personalized walkthrough to explore workforce
              management.
            </p>
          </div>
          <div
            className={`contact-tab-card ${
              activeTab === "quote" ? "active" : ""
            }`}
            onClick={() => setActiveTab("quote")}
          >
            <Send size={20} className="contact-tab-icon" />
            <h4 className="contact-tab-title">Get a quote</h4>
            <p className="contact-tab-desc">
              Share your use case and request a custom quote.
            </p>
          </div>
          <div
            className={`contact-tab-card ${
              activeTab === "email" ? "active" : ""
            }`}
            onClick={() => setActiveTab("email")}
          >
            <Mail size={20} className="contact-tab-icon" />
            <h4 className="contact-tab-title">Email Support</h4>
            <p className="contact-tab-desc">
              Reach out for general queries and technical assistance.
            </p>
          </div>
        </div>

        <div className="row g-5">
          <div className="col-lg-6">
            <div className="contact-form-wrapper shadow-sm">
              {activeTab === "demo" && renderDemoForm()}
              {activeTab === "quote" && renderQuoteForm()}
              {activeTab === "email" && renderEmailForm()}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="faq-wrapper shadow-sm">
              <div className="faq-badge mb-3">GOT QUESTIONS?</div>
              <h3 className="faq-title">Frequently Asked Questions</h3>
              <p className="faq-desc mb-4">
                Find answers to common questions about our platform, features,
                and capabilities.
              </p>

              <div className="faq-list">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className={`faq-item ${openFaq === idx ? "active" : ""}`}
                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  >
                    <div className="faq-question">
                      <span className="faq-q-text">{faq.q}</span>
                      <div
                        className={`faq-icon-wrapper ${
                          openFaq === idx ? "open" : ""
                        }`}
                      >
                        {openFaq === idx ? (
                          <Minus size={16} />
                        ) : (
                          <Plus size={16} />
                        )}
                      </div>
                    </div>
                    <div
                      className="faq-answer-wrapper"
                      style={{ maxHeight: openFaq === idx ? "200px" : "0" }}
                    >
                      <div className="faq-answer">{faq.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
