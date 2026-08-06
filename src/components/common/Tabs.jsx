import React from 'react';
import Button from './Button';

const Tabs = ({ tabs, activeTab, onTabChange, variant = 'pills' }) => {
  return (
    <div className={`d-flex align-items-center gap-2 ${variant === 'underline' ? 'border-bottom pb-2' : ''}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        if (variant === 'underline') {
          return (
            <Button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`btn btn-sm ${isActive ? 'fw-bold text-primary' : 'text-muted'}`}
              style={{ 
                paddingBottom: '0.5rem', 
                marginBottom: '-0.5rem', 
                border: 'none', 
                borderBottom: isActive ? '2px solid var(--primary-blue)' : '2px solid transparent',
                background: 'transparent',
                borderRadius: 0
              }}
            >
              {tab.label}
              {tab.badge && <span className="ms-2 badge bg-secondary">{tab.badge}</span>}
            </Button>
          );
        }

        return (
          <Button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`d-flex align-items-center gap-2 px-3 py-2 ${
              isActive 
                ? 'bg-primary text-white border-primary' 
                : 'bg-white text-secondary border-secondary-subtle'
            }`}
            style={{ 
              borderRadius: '8px', 
              border: '1px solid',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderColor: isActive ? 'var(--primary-blue)' : 'var(--border-color)',
              backgroundColor: isActive ? 'var(--primary-blue)' : '#fff',
              color: isActive ? '#fff' : 'var(--sub-text-color)'
            }}
          >
            {tab.icon && <span className="d-flex align-items-center opacity-75">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="badge rounded-pill" style={{ 
                backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'var(--page-color)', 
                color: isActive ? '#fff' : 'var(--sub-text-color)',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>
                {tab.badge}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default Tabs;
