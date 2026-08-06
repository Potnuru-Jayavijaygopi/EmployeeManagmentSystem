import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';

export const renderDemoForm = () => (
    <div className="contact-form-container fade-in">
      <h3 className="contact-form-title">Request a Demo</h3>
      <p className="contact-form-desc">Schedule a personalized walkthrough to explore workforce management, employee operations, learning workflows, and organizational tools tailored to your business needs.</p>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="contact-form-label">Full Name</label>
          <input type="text" className="contact-form-input" placeholder="Alex Rivera" />
        </div>
        <div className="col-md-6">
          <label className="contact-form-label">Work Email</label>
          <input type="email" className="contact-form-input" placeholder="alex@company.com" />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="contact-form-label">Company Name</label>
          <input type="text" className="contact-form-input" placeholder="Nexus Global" />
        </div>
        <div className="col-md-6">
          <label className="contact-form-label">Job Title</label>
          <input type="text" className="contact-form-input" placeholder="Operations Director" />
        </div>
      </div>

      <div className="mb-4">
        <label className="contact-form-label">Tell us about your needs</label>
        <textarea className="contact-form-input" rows="4" placeholder="Briefly describe your current operational challenges..."></textarea>
      </div>

      <div className="mb-4 d-flex align-items-start gap-2">
        <input type="checkbox" className="contact-form-checkbox mt-1" id="demoCheck" />
        <label className="contact-form-check-label" htmlFor="demoCheck">
          I agree to the processing of my data in accordance with the Privacy Policy. We may contact you about our services.
        </label>
      </div>

      <Button variant="primary" className="w-100 py-2 contact-submit-btn">
        Schedule Demo <ArrowRight size={16} className="ms-2" />
      </Button>
    </div>
  );

 export const renderQuoteForm = () => (
    <div className="contact-form-container fade-in">
      <h3 className="contact-form-title">Get a Quote</h3>
      <p className="contact-form-desc">Share your use case and request a customized quote tailored to your needs</p>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <label className="contact-form-label">Full Name</label>
          <input type="text" className="contact-form-input" placeholder="Alex Johnson" />
        </div>
        <div className="col-md-6">
          <label className="contact-form-label">Work Email</label>
          <input type="email" className="contact-form-input" placeholder="alex@company.com" />
        </div>
      </div>

      <div className="mb-4">
        <label className="contact-form-label">Quotation Module</label>
        <div className="row g-3">
          {['HR Management', 'LMS & Training', 'Admin Controls', 'Data Analytics'].map(mod => (
            <div className="col-md-6" key={mod}>
              <label className="module-checkbox-card">
                <input type="checkbox" className="module-checkbox-input" />
                <span className="module-checkbox-text">{mod}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="contact-form-label">Short Description</label>
        <textarea className="contact-form-input" rows="4" placeholder="Tell us about your specific goals, timelines, or integration requirements..."></textarea>
      </div>

      <Button variant="primary" className="w-100 py-2 mb-3 contact-submit-btn">
        Get My Quote <ArrowRight size={16} className="ms-2" />
      </Button>
      <div className="text-center contact-form-footer-links">
        By submitting, you agree to our <a href="#">Privacy Policy</a> and <a href="#">Terms</a>.
      </div>
    </div>
  );

 export const renderEmailForm = () => (
    <div className="contact-form-container fade-in">
      <h3 className="contact-form-title">Email Support</h3>
      <p className="contact-form-desc">Have a question or need technical assistance? Our executive support team is here to help you resolve any issues with Nexus EMS.</p>

      <div className="mb-4">
        <label className="contact-form-label">Full Name</label>
        <input type="text" className="contact-form-input" placeholder="Enter your full name" />
      </div>

      <div className="mb-4">
        <label className="contact-form-label">Registered Email</label>
        <input type="email" className="contact-form-input" placeholder="name@company.com" />
      </div>

      <div className="mb-4">
        <label className="contact-form-label">Message</label>
        <textarea className="contact-form-input" rows="4" placeholder="How can we help you today?"></textarea>
      </div>

      <div className="support-alert mb-4">
        <CheckCircle2 size={18} className="support-alert-icon" />
        <p className="support-alert-text">Your inquiry is processed via our secure executive support channel. We typically respond within 2-4 business hours during market operation times.</p>
      </div>

      <Button variant="primary" className="w-100 py-2 contact-submit-btn">
        Send Message <Send size={16} className="ms-2" />
      </Button>
    </div>
  );