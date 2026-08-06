import React from 'react';
import { ChevronRight } from 'lucide-react';
import './Breadcrumb.css';

const Breadcrumb = ({ items = [] }) => {
  return (
    <div className="dashboard-breadcrumb">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <span className={`breadcrumb-item ${idx === items.length - 1 ? 'active' : ''}`}>
            {item}
          </span>
          {idx < items.length - 1 && (
            <ChevronRight size={14} className="breadcrumb-separator" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
