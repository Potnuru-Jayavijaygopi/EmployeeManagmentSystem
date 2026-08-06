import React from 'react';
import { ChevronDown } from 'lucide-react';
import './UserProfile.css';

const UserProfile = ({ name, role, email, initials, onClick, className = '' }) => {
  return (
    <div className={`user-profile-card ${className}`} onClick={onClick}>
      <div className="user-profile-avatar">
        {initials || (name ? name.charAt(0).toUpperCase() : 'U')}
      </div>
      <div className="user-profile-info">
        <div className="user-profile-name">
          {name} {role && <span className="user-profile-role">({role})</span>}
        </div>
        <div className="user-profile-email">{email}</div>
      </div>
      <div className="user-profile-chevron">
        <ChevronDown size={14} />
      </div>
    </div>
  );
};

export default UserProfile;
