import React from 'react';

const Badge = ({ variant = 'default', dot = false, size = 'default', children, className = '' }) => {
  const baseClasses = 'badge';
  const sizeClasses = `badge-${size}`;
  const variantClasses = `badge-${variant}`;

  return (
    <span className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}>
      {dot && <span className="badge-dot"></span>}
      {children}
    </span>
  );
};

export default Badge;
