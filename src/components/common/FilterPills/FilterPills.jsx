import React from 'react';
import Button from '../Button';

const FilterPills = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <div className="filter-pills d-flex gap-2">
      {filters.map(filter => {
        const isObject = typeof filter === 'object' && filter !== null;
        const id = isObject ? filter.id : filter;
        const label = isObject ? filter.label : filter;
        const count = isObject ? filter.count : null;

        return (
          <Button 
            key={id}
            className={`filter-pill ${activeFilter === id ? 'active bg-blue text-white' : ''} d-flex align-items-center`}
            onClick={() => onFilterChange(id)}
          >
            {label}
            {count !== undefined && count !== null && (
              <span className={`badge rounded-pill ms-2 ${activeFilter === id ? 'bg-white text-blue' : 'bg-light text-secondary'}`} style={{ fontSize: '0.65rem' }}>
                {count}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default FilterPills;
