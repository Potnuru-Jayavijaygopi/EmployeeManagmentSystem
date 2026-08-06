import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  ...props 
}) => {
  const baseClass = 'btn-system';
  const variantClass = `btn-system-${variant}`;

  const sizeClass = `btn-system-size-${size === 'md' ? 'default' : size}`;
  const stateClass = (isLoading || disabled) ? 'btn-system-disabled' : '';

  return (
    <button 
      className={`${baseClass} ${variantClass} ${sizeClass} ${stateClass} ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="btn-spinner" size={16} />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
