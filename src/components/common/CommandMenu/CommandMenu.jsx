import React from 'react';
import { Search, User } from 'lucide-react';

const CommandMenu = ({ 
  searchQuery, 
  onSearchChange, 
  results, 
  placeholder = "Search...", 
  resultsLabel = "RESULTS" 
}) => {
  return (
    <div className="command-menu">
      <div className="command-menu-search">
        <Search size={16} strokeWidth={2} />
        <input 
          type="text" 
          placeholder={placeholder} 
          value={searchQuery}
          onChange={onSearchChange}
          autoFocus
        />
      </div>

      {results && results.length > 0 && (
        <div className="command-menu-section">
          {resultsLabel && <div className="command-menu-label">{resultsLabel}</div>}
          {results.map((result, idx) => (
            <div key={idx} className={`command-menu-item ${result.active ? 'active' : ''}`}>
              {result.icon || (
                <User size={16} strokeWidth={2} />
              )}
              <span>{result.label} — {result.subLabel}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommandMenu;
