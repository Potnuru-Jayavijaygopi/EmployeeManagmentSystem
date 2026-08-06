import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../dashboard/Sidebar';
import TopNavbar from '../../dashboard/TopNavbar';
import "../../dashboard/DashboardLayout/DashboardLayout.css";

const PortalLayout = ({ role = 'employee' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentPath = pathParts[1] || 'dashboard'; 

  const pathToSidebarMap = {
    'dashboard': 'Overview',
    'announcements': 'Announcements',
    'tasks': 'Tasks',
    'attendance': 'Attendance',
    'leave': 'Leave',
    'chat': 'Chat',
    'hr-overview': 'HR Overview',
    'payroll': 'Payroll',
    'expenses': 'Expenses',
    'performance': 'Performance',
    'learning': 'Learning',
    'documents': 'Documents',
    'analytics': 'Analytics',
    'compliance': 'Compliance'
  };

  const activeSidebarItem = pathToSidebarMap[currentPath] || 'Overview';

  const pathToTopTabMap = {
    'projects': 'Projects',
    'teams': 'Teams',
    'employees': 'Employees',
    'plans': 'Plans',
    'logs': 'Logs',
    'security': 'Security',
    'dashboard': 'Dashboard'
  };

  const activeTopTab = pathToTopTabMap[currentPath] || 'Dashboard';

  useEffect(() => {
    const pageName = pathToSidebarMap[currentPath] || pathToTopTabMap[currentPath] || 'Overview';
    document.title = `${pageName} | Employee Management System`;
  }, [currentPath]);

  const handleTabChange = (tabName) => {
    const tabToPathMap = {
      'Overview': `/${role}/dashboard`,
      'Dashboard': `/${role}/dashboard`,
      'Announcements': `/${role}/announcements`,
      'Tasks': `/${role}/tasks`,
      'Attendance': `/${role}/attendance`,
      'Leave': `/${role}/leave`,
      'Chat': `/${role}/chat`,
      'HR Overview': `/${role}/hr-overview`,
      'Payroll': `/${role}/payroll`,
      'Expenses': `/${role}/expenses`,
      'Performance': `/${role}/performance`,
      'Learning': `/${role}/learning`,
      'Documents': `/${role}/documents`,
      'Analytics': `/${role}/analytics`,
      'Compliance': `/${role}/compliance`,
      'Projects': `/${role}/projects`,
      'Teams': `/${role}/teams`,
      'Employees': `/${role}/employees`,
      'Plans': `/${role}/plans`,
      'Logs': `/${role}/logs`,
      'Security': `/${role}/security`
    };

    const targetPath = tabToPathMap[tabName];
    if (targetPath) {
      navigate(targetPath);
    }
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-layout">
      <Sidebar 
        activeItem={activeSidebarItem} 
        onNavigateHome={handleNavigateHome} 
        onTabChange={handleTabChange} 
        role={role}
      />
      <div className="dashboard-main">
        <TopNavbar 
          activeTab={activeTopTab} 
          onTabChange={handleTabChange} 
          role={role}
        />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PortalLayout;
