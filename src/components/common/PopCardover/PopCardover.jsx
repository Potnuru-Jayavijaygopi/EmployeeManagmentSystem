import React from 'react';
import Button from '../Button';

const PopCardover = ({ items }) => {
  return (
    <div className="pop-cardover">
      {items.map((item, idx) => {
        if (item.type === 'divider') {
          return <div key={idx} className="pop-cardover-divider"></div>;
        }

        return (
          <Button variant="destructive" 
            key={idx} 
            className={`pop-cardover-item ${item.danger ? 'text-danger' : ''}`}
            onClick={item.onClick}
          >
            {item.icon}
            {item.label}
          </Button>
        );
      })}
    </div>
  );
};

export default PopCardover;
