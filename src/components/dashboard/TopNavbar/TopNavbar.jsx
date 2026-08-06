import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import './TopNavbar.css';
import Button from '../../common/Button';

const TopNavbar = ({ activeTab = "Dashboard", onTabChange, role = 'employee' }) => {
  const getTabsByRole = (role) => {
    switch(role) {
      case 'admin':
      case 'hr':
        return ["Dashboard", "Projects", "Teams", "Employees", "Plans", "Logs", "Security"];
      case 'manager':
        return ["Dashboard", "Projects", "Teams", "Employees", "Plans"];
      case 'employee':
      default:
        return ["Dashboard", "Projects", "Teams"];
    }
  };

  const tabs = getTabsByRole(role);

  return (
    <header className="dashboard-topbar">
      <div className="topbar-tabs">
        {tabs.map((tab) => (
          <Button 
            key={tab} 
            className={`topbar-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => onTabChange && onTabChange(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="topbar-actions">

        <div className="topbar-notification">
          <Bell size={18} className="notification-icon" />
          <span className="notification-badge">19</span>
        </div>

        <div className="topbar-profile">
          <div className="profile-avatar">S</div>
          <div className="profile-info">
            <span className="profile-name">Sri Vishnu</span>
            <span className="profile-email">sri.vishnu@company.com</span>
          </div>
          <ChevronDown size={14} className="profile-chevron" />
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
