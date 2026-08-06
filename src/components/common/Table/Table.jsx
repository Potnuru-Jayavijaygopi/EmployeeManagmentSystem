import React from "react";
import Pagination from '../Pagination';
import FilterDropdown from '../FilterDropdown';
import { Search } from 'lucide-react';
import './Table.css';

const Table = ({
  columns,
  data,
  title,
  badgeCount,
  searchPlaceholder = "Search...",
  filters,
  totalRecords = 0,
  currentPage = 1,
  recordsPerPage = 5,
  onPageChange,
}) => {
  return (
    <div className="table-container">
      <div className="d-flex justify-content-between align-items-center p-4 border-bottom table-header">
        <div className="d-flex align-items-center gap-2">
          <h5 className="mb-0 fw-bold">{title}</h5>
          {badgeCount !== undefined && (
            <span className="badge badge-default bg-light text-dark rounded-circle px-2 table-badge">
              {badgeCount}
            </span>
          )}
        </div>
        <div className="d-flex gap-3">
          <div className="position-relative">
            <Search className="position-absolute icon table-search-icon" />
            <input
              type="text"
              className="form-control table-search-input"
              placeholder={searchPlaceholder}
            />
          </div>

          {filters && filters}
        </div>
      </div>

      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} style={col.bold ? { fontWeight: 500 } : {}}>
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {totalRecords > 0 && (
        <Pagination
          totalRecords={totalRecords}
          recordsPerPage={recordsPerPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default Table;
