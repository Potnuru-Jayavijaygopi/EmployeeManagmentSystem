import React from 'react';
import Sidebar from '../Sidebar';
import TopNavbar from '../TopNavbar';
import './DashboardLayout.css';

const DashboardLayout = ({ children, activeSidebarItem = "Projects", activeTopTab = "Projects", onTabChange, onNavigateHome }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar activeItem={activeSidebarItem} onNavigateHome={onNavigateHome} onTabChange={onTabChange} />
      <div className="dashboard-main">
        <TopNavbar activeTab={activeTopTab} onTabChange={onTabChange} />
        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
