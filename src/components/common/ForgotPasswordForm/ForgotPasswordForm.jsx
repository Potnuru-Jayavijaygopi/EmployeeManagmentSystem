import React, { useState } from 'react';
import { Lock, Mail, Send, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { Input } from '../Forms';
import Button from '../Button';
import './ForgotPasswordForm.css';

const ForgotPasswordForm = ({ onSubmit, onBackToSignIn }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); 
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setStatus('invalid');
      return;
    }

    setStatus('idle');
    if (onSubmit) {
      try {
        const result = await onSubmit(email);
        if (result === false) {
           setStatus('error');
        } else {
           setStatus('success');
        }
      } catch (err) {
        setStatus('error');
      }
    } else {

      if (email === 'you@company.com' || email === 'Xyzz@company.com') {
        setStatus('success');
      } else {
        setStatus('error');
      }
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-content">
        <div className="forgot-password-header">
          <div className="forgot-password-logo">
            <Lock size={24} />
          </div>
          <h1 className="forgot-password-title">Reset your password</h1>
          <p className="forgot-password-subtitle">
            Enter your work email and we'll send password reset instructions.
          </p>
        </div>

        {status === 'success' && (
          <div className="forgot-password-banner success">
            <Check size={16} className="icon" strokeWidth={3} />
            <div>
              <strong>Reset link sent!</strong> Check your inbox at <br/>
              {email}. Link expires in 15 minutes.
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="forgot-password-banner error">
            <AlertCircle size={16} className="icon" strokeWidth={2.5} />
            <div>
              No account found with this email address. Please check and try again.
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="forgot-password-form-label">WORK EMAIL</label>
          <Input 
            type="email"
            placeholder="you@company.com"
            icon={<Mail size={18} />}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'invalid' || status === 'error') {
                setStatus('idle');
              }
            }}
            isError={status === 'invalid'}
            error={status === 'invalid' ? <><AlertCircle size={14} /> Please enter a valid email address.</> : undefined}
          />

          <Button 
            type="submit" 
            variant="primary" 
            className="w-100" 
            style={{ width: '100%', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px' }}
          >
            <Send size={18} /> Send reset link
          </Button>
        </form>
      </div>

      <div className="forgot-password-footer">
        <Button type="button" onClick={onBackToSignIn}>
          <ArrowLeft size={16} /> Back to sign in
        </Button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
