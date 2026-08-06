import React, { useState } from 'react';
import Badge from '../../../components/common/Badge';
import { Search, MoreHorizontal, Eye, Edit2, Download, Trash2, Star, Plus } from 'lucide-react';
import ReviewDetailDrawer from './ReviewDetailDrawer';
import DeleteConfirmModal from './modals/DeleteConfirmModal';
import Button from '../../../components/common/Button';

const mockReviews = [
  {
    id: 1,
    employeeName: 'John Doe',
    initials: 'JD',
    reviewedBy: 'Brahma Admin',
    cycle: 'Q1 2025',
    score: 4.4,
    promotion: 'Recommended',
    status: 'completed',
  },
  {
    id: 2,
    employeeName: 'Emp Test',
    initials: 'ET',
    reviewedBy: 'Ravi Kumar',
    cycle: 'Q1 2025',
    score: 4.4,
    promotion: null,
    status: 'completed',
  },
  {
    id: 3,
    employeeName: 'Priya Sharma',
    initials: 'PS',
    reviewedBy: 'Brahma Admin',
    cycle: 'Q1 2025',
    score: 4.4,
    promotion: 'Recommended',
    status: 'completed',
  },
  {
    id: 4,
    employeeName: 'Ravi Kumar',
    initials: 'RK',
    reviewedBy: 'Brahma Admin',
    cycle: 'Q1 2025',
    score: 4.4,
    promotion: null,
    status: 'completed',
  },
  {
    id: 5,
    employeeName: 'Ananya Reddy',
    initials: 'AR',
    reviewedBy: 'Brahma Admin',
    cycle: 'Dev Frontend',
    score: null,
    promotion: null,
    status: 'pending',
  },
];

const StarRating = ({ rating }) => {
  if (!rating) return <span className="text-muted">—</span>;

  return (
    <div className="d-flex align-items-center gap-1">
      {[1, 2, 3, 4].map((i) => (
        <Star key={i} size={14} className="text-warning" fill="currentColor" />
      ))}
      <Star size={14} className="text-muted" />
      <span className="ms-2 fw-medium">{rating}</span>
    </div>
  );
};

const ManagerReviewsTab = () => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleViewDetail = (review) => {
    setSelectedReview(review);
    setIsDrawerOpen(true);
  };

  const handleDeleteClick = (review) => {
    setSelectedReview(review);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="bg-white border rounded-4 mt-3">
      <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
        <div>
           <h6 className="fw-bold m-0 text-dark">Manager Reviews</h6>
           <div className="text-muted small">Evaluations submitted by managers</div>
        </div>
        <Button className="btn-system btn-system-primary">
          <Plus size={16} /> New Manager Review
        </Button>
      </div>

      <div className="p-4">

        <div className="d-flex gap-3 mb-4">
          <div className="position-relative flex-grow-1">
            <Search className="position-absolute top-50 translate-middle-y text-muted ms-3" size={16} />
            <input 
              type="text" 
              className="form-control ps-5 shadow-none border-secondary-subtle" 
              placeholder="Search reviews..." 
              style={{ borderRadius: 'var(--r-md)', padding: '0.5rem 0.75rem', fontSize: '0.875rem' }}
            />
          </div>
          <div className="filter-dropdown-btn">
            <span className="filter-dropdown-text">All cycles</span>
            <span className="filter-dropdown-chevron"><svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg></span>
          </div>
          <div className="filter-dropdown-btn">
            <span className="filter-dropdown-text">All types</span>
            <span className="filter-dropdown-chevron"><svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg></span>
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table w-100">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Reviewed by</th>
                <th>Cycle</th>
                <th>Score</th>
                <th>Promotion</th>
                <th>Status</th>
                <th className="text-end">...</th>
              </tr>
            </thead>
            <tbody>
              {mockReviews.map((review) => (
                <tr key={review.id} className="align-middle">
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center text-primary fw-medium"
                        style={{ width: '32px', height: '32px', backgroundColor: '#EFF6FF', fontSize: '0.75rem' }}
                      >
                        {review.initials}
                      </div>
                      <div className="fw-medium text-dark">{review.employeeName}</div>
                    </div>
                  </td>
                  <td className="text-muted small">{review.reviewedBy}</td>
                  <td className="text-muted small">{review.cycle}</td>
                  <td>
                    <StarRating rating={review.score} />
                  </td>
                  <td>
                    {review.promotion ? (
                      <span className="text-success small fw-medium text-uppercase" style={{ fontSize: '0.7rem', padding: '2px 8px', backgroundColor: '#DCFCE7', borderRadius: '10px' }}>
                        {review.promotion}
                      </span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td>
                    <Badge 
                      variant={review.status === 'completed' ? 'info' : review.status === 'pending' ? 'pending' : 'failed'}
                      size="default"
                    >
                      {review.status}
                    </Badge>
                  </td>
                  <td className="text-end">
                    <Button variant="icon" className="btn btn-action-icon dropdown-toggle-split" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ borderRadius: '6px' }}>
                      <MoreHorizontal size={14} />
                    </Button>
                    <ul className="dropdown-menu dropdown-menu-end shadow border-0" style={{ fontSize: '0.875rem', borderRadius: '8px' }}>
                      <li><Button variant="secondary" className="dropdown-item py-2 d-flex align-items-center gap-2 text-secondary" onClick={() => handleViewDetail(review)}><Eye size={14}/> View detail</Button></li>
                      <li><Button variant="secondary" className="dropdown-item py-2 d-flex align-items-center gap-2 text-secondary"><Edit2 size={14}/> Edit</Button></li>
                      <li><Button variant="secondary" className="dropdown-item py-2 d-flex align-items-center gap-2 text-secondary"><Download size={14}/> Export PDF</Button></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Button variant="destructive" className="dropdown-item py-2 d-flex align-items-center gap-2 text-danger" onClick={() => handleDeleteClick(review)}><Trash2 size={14}/> Delete</Button></li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-4 text-muted small px-1 pt-2">
          <div>Showing 1–8 of 10</div>
          <div className="d-flex gap-2">
            <Button className="btn-pagination">←</Button>
            <Button className="btn-pagination active">1</Button>
            <Button className="btn-pagination">2</Button>
            <Button className="btn-pagination">→</Button>
          </div>
        </div>

      </div>

      <ReviewDetailDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        review={selectedReview} 
      />

      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => setIsDeleteModalOpen(false)}
        itemName="Manager Review"
      />
    </div>
  );
};

export default ManagerReviewsTab;
