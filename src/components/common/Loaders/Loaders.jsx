import React from 'react';

export const Spinner = ({ size = 'md', className = '' }) => {
  return (
    <div className={`spinner-ring spinner-ring-${size} ${className}`}></div>
  );
};

export const DotsLoader = ({ className = '' }) => {
  return (
    <div className={`dots-loader ${className}`}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export const SkeletonRow = () => {
  return (
    <div className="skeleton-row">
      <div className="skeleton skeleton-avatar"></div>
      <div className="skeleton-content">
        <div className="skeleton skeleton-text-lg"></div>
        <div className="skeleton skeleton-text-sm"></div>
      </div>
      <div className="skeleton skeleton-btn"></div>
    </div>
  );
};
