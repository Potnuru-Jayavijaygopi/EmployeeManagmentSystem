import React, { useState, useRef, useEffect } from 'react';
import { Smartphone, Mail, Phone, Shield, ArrowLeft, AlertCircle } from 'lucide-react';
import Button from '../Button';
import './TwoFactorAuthForm.css';

const TwoFactorAuthForm = ({ 
  onSubmit, 
  onResend, 
  onBackToSignIn,
  email = 's••••ay@company.com'
}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [method, setMethod] = useState('email'); 
  const [status, setStatus] = useState('idle'); 
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [resendTimer, setResendTimer] = useState(0);

  const inputRefs = useRef([]);

  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleInputChange = (index, value) => {
    if (status !== 'idle') {
      setStatus('idle');
    }

    if (value.length > 1) {
      const pasted = value.replace(/\D/g, '').slice(0, 6).split('');
      const newCode = [...code];
      pasted.forEach((char, i) => {
        if (index + i < 6) newCode[index + i] = char;
      });
      setCode(newCode);
      const nextIndex = Math.min(index + pasted.length, 5);
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
      return;
    }

    const digit = value.replace(/\D/g, '');
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    if (digit && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length < 6) return;

    if (onSubmit) {
      try {
        await onSubmit(fullCode);
      } catch (err) {

      }
    } else {

      if (fullCode === '892034') {
        alert("Success! Identity verified.");
      } else if (fullCode === '000000') {
        setStatus('error_expired');
      } else {
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);
        if (newAttempts >= 5) {
          setStatus('locked');
        } else {
          setStatus('error_incorrect');
        }
      }
    }
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setResendTimer(4); 
    if (onResend) onResend();
  };

  const isError = status === 'error_incorrect' || status === 'error_expired' || status === 'locked';

  return (
    <div className="two-factor-container">
      <div className="two-factor-content">
        <div className="two-factor-header">
          <div className="two-factor-logo">
            <Smartphone size={24} />
          </div>
          <h1 className="two-factor-title">Verify your identity</h1>
          <p className="two-factor-subtitle">
            Two-factor authentication is enabled on your account.
          </p>
        </div>

        {status === 'error_expired' && (
          <div className="two-factor-banner error">
            <AlertCircle size={16} className="icon" strokeWidth={2.5} />
            <div>Your code has expired. Request a new one below.</div>
          </div>
        )}

        {status === 'error_incorrect' && (
          <div className="two-factor-banner error">
            <AlertCircle size={16} className="icon" strokeWidth={2.5} />
            <div>Incorrect verification code. Please check and try again.</div>
          </div>
        )}

        {status === 'locked' && (
          <div className="two-factor-banner error">
            <AlertCircle size={16} className="icon" strokeWidth={2.5} />
            <div>Too many failed attempts. 2FA has been locked for 10 minutes.</div>
          </div>
        )}

        <div className="two-factor-methods">
          <Button 
            type="button" 
            className={`method-btn ${method === 'email' ? 'active' : ''}`}
            onClick={() => setMethod('email')}
          >
            <Mail size={18} />
            <span>Email OTP</span>
          </Button>
          <Button 
            type="button" 
            className={`method-btn ${method === 'authenticator' ? 'active' : ''}`}
            onClick={() => setMethod('authenticator')}
          >
            <Smartphone size={18} />
            <span>Authenticator</span>
          </Button>
          <Button 
            type="button" 
            className={`method-btn ${method === 'sms' ? 'active' : ''}`}
            onClick={() => setMethod('sms')}
          >
            <Phone size={18} />
            <span>SMS</span>
          </Button>
        </div>

        {method === 'email' && (
          <div className="two-factor-info">
            A 6-digit code was sent to <strong>{email}</strong>.<br/>
            Codes expire after 10 minutes.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength={1}
                className={`otp-input ${digit ? 'has-value' : ''} ${isError ? 'is-error' : ''}`}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={status === 'locked'}
              />
            ))}
          </div>

          <div className="attempts-container">
            <div className="attempts-text">Attempts remaining</div>
            <div className="attempts-dots">
              {[0, 1, 2, 3, 4].map(idx => (
                <div key={idx} className={`attempt-dot ${idx < failedAttempts ? 'failed' : ''}`}></div>
              ))}
            </div>
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            className="w-100" 
            disabled={status === 'locked' || code.join('').length < 6}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px' }}
          >
            <Shield size={18} /> Verify code
          </Button>

          <div className="resend-text">
            Didn't get the code?{' '}
            {resendTimer > 0 ? (
              <span className="resend-link disabled">Resend code in {resendTimer}s</span>
            ) : (
              <Button type="button" className="resend-link" onClick={handleResend}>Resend code</Button>
            )}
          </div>
        </form>
      </div>

      <div className="two-factor-footer">
        <Button type="button" onClick={onBackToSignIn}>
          <ArrowLeft size={16} /> Back to sign in
        </Button>
      </div>
    </div>
  );
};

export default TwoFactorAuthForm;
