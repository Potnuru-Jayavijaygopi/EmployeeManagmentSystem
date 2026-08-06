import React, { useState, useEffect } from 'react';
import { Check, User, Mail, Briefcase, Eye, EyeOff, AlertCircle, UserPlus } from 'lucide-react';
import { Input } from '../Forms';
import Button from '../Button';
import './SignUpForm.css';

const SignUpForm = ({ onSubmit, defaultError = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState(defaultError);

  useEffect(() => {
    const pwd = formData.password;
    if (!pwd) {
      setPasswordStrength(0);
    } else {
      let score = 0;
      if (pwd.length >= 8) score += 1;
      if (/[A-Z]/.test(pwd) || /[a-z]/.test(pwd)) score += 1;
      if (/[0-9]/.test(pwd)) score += 1;
      if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
      if (pwd.length < 6) score = 1;
      setPasswordStrength(Math.min(4, Math.max(1, score)));
    }
  }, [formData.password]);

  const getStrengthLabel = () => {
    switch (passwordStrength) {
      case 1: return { text: 'Weak', class: 'weak' };
      case 2: return { text: 'Fair — could be stronger', class: 'fair' };
      case 3: return { text: 'Good', class: 'good' };
      case 4: return { text: 'Strong', class: 'strong' };
      default: return { text: '', class: '' };
    }
  };

  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordStrength < 3) {
      setError('Your password is too weak. Please choose a stronger password.');
      return;
    }
    if (!passwordsMatch) {
      setError('Passwords do not match.');
      return;
    }
    if (!formData.agreeTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }
    setError('');
    if (onSubmit) onSubmit(formData);
  };

  const strength = getStrengthLabel();

  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="signup-header">
          <div className="signup-logo">E</div>
          <h1 className="signup-title">Create your account</h1>
          <p className="signup-subtitle">Start your free trial in minutes — no credit card required.</p>

          <div className="signup-benefits">
            <span className="signup-benefit-pill"><Check size={14} className="signup-benefit-icon" /> Cancel anytime</span>
            <span className="signup-benefit-pill"><Check size={14} className="signup-benefit-icon" /> 14-day free trial</span>
            <span className="signup-benefit-pill"><Check size={14} className="signup-benefit-icon" /> No credit card</span>
          </div>
        </div>

        {error && (
          <div className="signup-error-banner">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="signup-form-label">FULL NAME <span className="req">*</span></label>
          <Input 
            name="name"
            placeholder="Sanjay Mehta"
            icon={<User size={18} />}
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label className="signup-form-label">WORK EMAIL <span className="req">*</span></label>
          <Input 
            type="email"
            name="email"
            placeholder="you@company.com"
            icon={<Mail size={18} />}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className="signup-form-label">COMPANY NAME <span className="req">*</span></label>
          <Input 
            name="company"
            placeholder="Acme Corp"
            icon={<Briefcase size={18} />}
            value={formData.company}
            onChange={handleChange}
            required
          />

          <label className="signup-form-label">PASSWORD <span className="req">*</span></label>
          <Input 
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Dube@12"
            value={formData.password}
            onChange={handleChange}
            rightIcon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            onRightIconClick={() => setShowPassword(!showPassword)}
            required
            isError={passwordStrength > 0 && passwordStrength < 3}
          />

          {passwordStrength > 0 && (
            <div className="password-strength-container">
              <div className="password-strength-bars">
                {[1, 2, 3, 4].map(level => (
                  <div 
                    key={level} 
                    className={`strength-bar ${level <= passwordStrength ? 'active ' + strength.class : ''}`}
                  ></div>
                ))}
              </div>
              <div className={`password-strength-text ${strength.class}`}>
                {strength.text}
              </div>
            </div>
          )}

          <label className="signup-form-label" style={{ marginTop: '16px' }}>CONFIRM PASSWORD <span className="req">*</span></label>
          <Input 
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Dube@12"
            value={formData.confirmPassword}
            onChange={handleChange}
            rightIcon={
              passwordsMatch ? <Check size={18} color="#16A34A" /> : (showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />)
            }
            onRightIconClick={passwordsMatch ? undefined : () => setShowConfirmPassword(!showConfirmPassword)}
            required
            isSuccess={passwordsMatch}
            success={passwordsMatch ? "Passwords match." : undefined}
          />

          <div className="signup-terms">
            <input 
              type="checkbox" 
              name="agreeTerms" 
              checked={formData.agreeTerms} 
              onChange={handleChange} 
              style={{ width: '16px', height: '16px', accentColor: '#2563EB' }}
            />
            <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
          </div>

          <Button type="submit" variant="primary" className="w-100" style={{ width: '100%', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px' }}>
            <UserPlus size={18} /> Create Account
          </Button>
        </form>
      </div>

      <div className="signup-footer">
        Already have account? <a href="#">Sign in</a>
      </div>
    </div>
  );
};

export default SignUpForm;
