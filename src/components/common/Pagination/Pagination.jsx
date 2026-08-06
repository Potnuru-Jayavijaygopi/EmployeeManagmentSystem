import React from 'react';
import Button from '../Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pagination.css';

const Pagination = ({ 
  totalRecords = 0, 
  recordsPerPage = 5, 
  currentPage = 1, 
  onPageChange 
}) => {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage + 1;
  const endIndex = Math.min(currentPage * recordsPerPage, totalRecords);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="d-flex justify-content-between align-items-center p-3 border-top pagination-container">
      <div className="text-muted pagination-info">
        Showing {startIndex} to {endIndex} of {totalRecords} entries
      </div>
      <div className="d-flex gap-2">
        <Button 
          variant="icon" 
          size="sm" 
          disabled={currentPage === 1} 
          onClick={handlePrev}
          className="d-flex align-items-center justify-content-center p-1 pagination-btn"
        >
          <ChevronLeft size={16} />
        </Button>
        <div className="d-flex align-items-center px-2 pagination-current">
          {currentPage} / {totalPages || 1}
        </div>
        <Button 
          variant="icon" 
          size="sm" 
          disabled={currentPage === totalPages || totalPages === 0} 
          onClick={handleNext}
          className="d-flex align-items-center justify-content-center p-1 pagination-btn"
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
