import React from 'react';

const OTPInput = ({ length = 6, value = '', onChange }) => {
  const digits = value.split('').slice(0, length);
  while (digits.length < length) {
    digits.push('');
  }

  return (
    <div className="mb-3">
      <div className="form-label mb-2">Verification Code</div>
      <div className="otp-input-container">
        {digits.map((digit, i) => (
          <input 
            key={i}
            type="text"
            className="otp-input"
            maxLength={1}
            value={digit}
            onChange={(e) => {
              const newDigits = [...digits];
              newDigits[i] = e.target.value;
              if (onChange) onChange(newDigits.join(''));
            }}
          />
        ))}
      </div>
      <div className="form-message muted mt-2">
        Enter the 6-digit code sent to your email
      </div>
    </div>
  );
};

export default OTPInput;
