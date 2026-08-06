import { Search, LogOut, Command } from "lucide-react";
import "./Sidebar.css";
import { navigation } from "../../../data/sidenavbarNavigationData";

const Sidebar = ({ activeItem = "Projects", onNavigateHome, onTabChange, role = 'employee' }) => {
  const filteredNavigation = navigation.map(group => {
    let filteredItems = group.items;

    if (role === 'hr') {
      filteredItems = filteredItems.filter(item => 
        item.name !== 'Tasks' && 
        item.name !== 'Learning' && 
        item.name !== 'HR Overview'
      );
    } else if (role === 'manager') {
      filteredItems = filteredItems.filter(item => 
        item.name !== 'HR Overview'
      );
    }

    return { ...group, items: filteredItems };
  }).filter(group => group.items.length > 0);

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-logo-container">
        <div
          className="sidebar-logo"
          onClick={() => onNavigateHome && onNavigateHome()}
          style={{ cursor: "pointer" }}
        >
          <div className="logo-icon-blue"></div>
          <span className="logo-text">EMS</span>
        </div>
        <div className="sidebar-collapse-icon">
          <div className="collapse-bars"></div>
        </div>
      </div>

      <div className="sidebar-search-container">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          placeholder="Search"
          className="sidebar-search-input"
        />
        <div className="search-shortcut">
          <Command size={12} className="me-1" />K
        </div>
      </div>

      <div className="sidebar-nav-scroll">
        {filteredNavigation.map((group, gIdx) => (
          <div key={gIdx} className="sidebar-nav-group">
            <h6 className="sidebar-group-title">{group.group}</h6>
            <ul className="sidebar-nav-list">
              {group.items.map((item, iIdx) => {
                const Icon = item.icon;
                const isActive =
                  activeItem === item.name ||
                  (activeItem === "Projects" && item.name === "Overview");
                return (
                  <li
                    key={iIdx}
                    className={`sidebar-nav-item ${isActive ? "active" : ""}`}
                    onClick={() => onTabChange && onTabChange(item.name)}
                    style={{ cursor: "pointer" }}
                  >
                    <Icon size={18} className="nav-item-icon" />
                    <span>{item.name}</span>
                    {isActive && <div className="active-indicator"></div>}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="sidebar-logout">
        <div className="sidebar-nav-item">
          <LogOut size={18} className="nav-item-icon" />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
