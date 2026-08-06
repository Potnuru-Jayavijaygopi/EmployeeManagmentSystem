import React from 'react';

const Badge = ({ status, variant, size = 'default', children, showDot, className = '' }) => {
  const isVariant = Boolean(variant);
  
  // If variant is provided, map it directly to badge-{variant}
  const resolvedStatus = variant ? variant : (status || 'active');
  const shouldShowDot = showDot !== undefined ? showDot : !isVariant;

  const baseClass = `badge badge-${resolvedStatus}`;

  return (
    <span className={`${baseClass} badge-${size} ${className}`}>
      {shouldShowDot && <span className="badge-dot"></span>}
      {children}
    </span>
  );
};

export default Badge;
