import React from 'react';
import Button from '../Button';

const Chip = ({ label, active = false, onClick, className = '' }) => {
  return (
    <Button 
      className={`chip ${active ? 'active' : ''} ${className}`}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default Chip;
