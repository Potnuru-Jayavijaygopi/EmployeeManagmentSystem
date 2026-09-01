import React, { useState, useEffect } from 'react';
import Badge from '../../../components/common/Badge';
import Tabs from '../../../components/common/Tabs';
import { Search, MoreHorizontal, Eye, Edit2, Download, Trash2, Star } from 'lucide-react';
import ReviewDetailDrawer from './ReviewDetailDrawer';
import DeleteConfirmModal from './modals/DeleteConfirmModal';
import Button from '../../../components/common/Button';
import { performanceService } from '../../../services';

const innerTabs = [
  { id: 'all', label: 'All' },
  { id: 'completed', label: 'Completed' },
  { id: 'pending', label: 'Pending' },
  { id: 'overdue', label: 'Overdue' },
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

const AllReviewsTab = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await performanceService.getReviews();
        const list = Array.isArray(data) ? data : (data?.results || []);
        setReviews(list);
      } catch (err) {
        setReviews([]);
      }
    };
    fetchReviews();
  }, []);

  const innerTabs = [
    { id: 'all', label: `All (${reviews.length})` },
    { id: 'completed', label: `Completed (${reviews.filter(r => String(r.status).toLowerCase() === 'completed').length})` },
    { id: 'pending', label: `Pending (${reviews.filter(r => ['pending', 'in_progress', 'draft'].includes(String(r.status).toLowerCase())).length})` },
    { id: 'overdue', label: `Overdue (${reviews.filter(r => String(r.status).toLowerCase() === 'overdue').length})` },
  ];

  const handleViewDetail = (review) => {
    setSelectedReview(review);
    setIsDrawerOpen(true);
  };

  const handleDeleteClick = (review) => {
    setSelectedReview(review);
    setIsDeleteModalOpen(true);
  };

  const filteredReviews = reviews.filter(review => {
    const statusStr = String(review.status || '').toLowerCase();
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return statusStr === 'pending' || statusStr === 'in_progress' || statusStr === 'draft';
    return statusStr === activeTab;
  });

  return (
    <div className="bg-white border rounded-4 mt-3">
      <div className="p-4 border-bottom">
        <Tabs 
          tabs={innerTabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          variant="underline"
        />
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
                <th style={{ width: '40px' }}>
                  <input type="checkbox" className="form-check-input" />
                </th>
                <th>Employee</th>
                <th>Cycle</th>
                <th>Type</th>
                <th>Score</th>
                <th>Status</th>
                <th className="text-end">...</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map((review, idx) => {
                const empName = review.employee_name || review.employeeName || 'Employee';
                const initials = empName.split(' ').map(n => n[0]).join('').substring(0, 2);
                const role = review.employee_role || review.employeeRole || 'Member';
                const cycleName = review.cycle_name || review.cycle || 'Quarterly';
                const type = review.review_type || review.type || 'Performance';
                const score = review.overall_rating || review.score || null;
                const status = review.status || 'completed';

                return (
                  <tr key={review.id || idx} className="align-middle">
                    <td>
                      <input type="checkbox" className="form-check-input" />
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center text-primary fw-medium"
                          style={{ width: '32px', height: '32px', backgroundColor: '#EFF6FF', fontSize: '0.75rem' }}
                        >
                          {initials}
                        </div>
                        <div>
                          <div className="fw-medium text-dark">{empName}</div>
                          <div className="text-muted" style={{ fontSize: '0.75rem' }}>{role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-muted small">{cycleName}</td>
                    <td>
                      <Badge 
                        variant={type === 'Manager' ? 'active' : type === 'Peer' ? 'completed' : 'info'} 
                        size="default"
                      >
                        {type}
                      </Badge>
                    </td>
                    <td>
                      <StarRating rating={score} />
                    </td>
                    <td>
                      <Badge 
                        variant={status === 'completed' ? 'info' : status === 'pending' ? 'pending' : 'failed'}
                        size="default"
                      >
                        {status}
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
                );
              })}

              {filteredReviews.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">
                    No reviews found for selected status filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-4 text-muted small px-1 border-top pt-4">
          <div>Showing 1–{filteredReviews.length} of {reviews.length} reviews</div>
          <div className="d-flex gap-2">
            <Button className="btn-pagination">←</Button>
            <Button className="btn-pagination active">1</Button>
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
        itemName="Assessment"
      />
    </div>
  );
};

export default AllReviewsTab;
