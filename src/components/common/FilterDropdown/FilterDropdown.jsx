import React from 'react';
import { ChevronDown } from 'lucide-react';
import Button from '../Button';

const FilterDropdown = ({ label, value, icon, onClick }) => {
  return (
    <Button className="filter-dropdown-btn" onClick={onClick}>
      {icon && <span className="filter-dropdown-icon">{icon}</span>}
      <span className="filter-dropdown-content">
        {label && <span className="filter-dropdown-label">{label}</span>}
        <span className="filter-dropdown-value">{value}</span>
      </span>
      <ChevronDown size={14} className="filter-dropdown-chevron" />
    </Button>
  );
};

export default FilterDropdown;
