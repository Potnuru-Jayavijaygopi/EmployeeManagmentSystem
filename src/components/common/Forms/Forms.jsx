import React from 'react';
import { Check } from 'lucide-react';

export const Input = ({ 
  label, 
  icon, 
  error, 
  success, 
  message, 
  className = '', 
  wrapperClassName = '',
  ...props 
}) => {
  const isError = error || props.isError;
  const isSuccess = success || props.isSuccess;

  return (
    <div className={`mb-3 ${wrapperClassName}`}>
      {label && <label className="form-label">{label}</label>}
      <div className="form-input-wrapper">
        {icon && (
          <span className="form-input-icon">
            {icon}
          </span>
        )}
        <input 
          className={`form-input ${icon ? 'has-icon' : ''} ${props.rightIcon ? 'has-right-icon' : ''} ${isError ? 'is-error' : ''} ${isSuccess ? 'is-success' : ''} ${className}`}
          {...props} 
        />
        {props.rightIcon && (
          <span 
            className={`form-input-icon-right ${props.onRightIconClick ? 'cursor-pointer' : ''}`}
            onClick={props.onRightIconClick}
          >
            {props.rightIcon}
          </span>
        )}
      </div>
      {(message || error || success) && (
        <div className={`form-message ${isError ? 'error' : isSuccess ? 'success' : 'muted'}`}>
          {isSuccess && (
            <Check size={12} strokeWidth={3} />
          )}
          {message || error || success}
        </div>
      )}
    </div>
  );
};

export const Textarea = ({ label, className = '', ...props }) => (
  <div className="mb-3">
    {label && <label className="form-label">{label}</label>}
    <textarea className={`form-input ${className}`} {...props}></textarea>
  </div>
);

export const Select = ({ label, options = [], className = '', ...props }) => (
  <div className="mb-3">
    {label && <label className="form-label">{label}</label>}
    <select className={`form-input ${className}`} {...props}>
      {options.map((opt, i) => (
        <option key={i} value={opt.value || opt}>{opt.label || opt}</option>
      ))}
    </select>
  </div>
);

export const Toggle = ({ label, checked, defaultChecked, onChange, name }) => (
  <label className="control-label">
    <div className="toggle-switch">
      <input type="checkbox" name={name} checked={checked} defaultChecked={defaultChecked} onChange={onChange} />
      <span className="toggle-slider"></span>
    </div>
    {label}
  </label>
);

export const Checkbox = ({ label, checked, defaultChecked, onChange, name }) => (
  <label className="control-label">
    <input type="checkbox" className="custom-control-input" name={name} checked={checked} defaultChecked={defaultChecked} onChange={onChange} />
    {label}
  </label>
);

export const Radio = ({ label, checked, defaultChecked, onChange, name, value }) => (
  <label className="control-label">
    <input type="radio" className="custom-control-input" name={name} value={value} checked={checked} defaultChecked={defaultChecked} onChange={onChange} />
    {label}
  </label>
);
