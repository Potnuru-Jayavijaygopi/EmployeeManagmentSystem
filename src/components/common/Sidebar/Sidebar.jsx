import React from 'react';
import Button from '../Button';

export const SidebarSection = ({ title }) => (
  <div className="sidebar-section-title">
    {title}
  </div>
);

export const SidebarItem = ({ icon, label, active, hasBadge, disabled, onClick }) => {
  return (
    <Button 
      className={`sidebar-item ${active ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="sidebar-item-icon">{icon}</span>}
      <span className="sidebar-item-label">{label}</span>
      {hasBadge && <span className="sidebar-item-badge"></span>}
    </Button>
  );
};

export const Sidebar = ({ children }) => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-content w-100">
        {children}
      </div>
    </div>
  );
};
