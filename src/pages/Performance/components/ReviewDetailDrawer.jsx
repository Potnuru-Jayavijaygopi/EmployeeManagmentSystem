import React from 'react';
import { X } from 'lucide-react';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';

const ScoreBar = ({ label, score, colorClass = 'bg-primary' }) => {
  const percentage = (score / 5) * 100;
  return (
    <div className="d-flex align-items-center justify-content-between mb-3">
      <div className="text-secondary small fw-medium" style={{ width: '120px' }}>{label}</div>
      <div className="flex-grow-1 mx-3 bg-light rounded-pill overflow-hidden" style={{ height: '6px' }}>
        <div className={`h-100 ${colorClass}`} style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="small fw-bold text-dark" style={{ width: '24px', textAlign: 'right' }}>{score}</div>
    </div>
  );
};

const ReviewDetailDrawer = ({ isOpen, onClose, review }) => {
  if (!isOpen) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-end" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1050 }}>
      <div className="bg-white h-100 shadow-lg animate-drawer-slide d-flex flex-column" style={{ width: '100%', maxWidth: '500px' }}>

        <div className="p-4 border-bottom d-flex justify-content-between align-items-start">
          <div>
            <h5 className="mb-1 fw-bold text-dark">{review?.employee || 'Emp Test'} — {review?.type || 'Self'} Review</h5>
            <p className="text-muted small mb-0">{review?.cycle || 'Q1 2025'} cycle</p>
          </div>
          <Button variant="icon" onClick={onClose} className="btn btn-light rounded-circle p-2 d-flex border-0 text-muted" style={{ backgroundColor: '#F9FAFB' }}>
            <X size={18} />
          </Button>
        </div>

        <div className="p-4 flex-grow-1 overflow-auto">

          <h6 className="text-uppercase text-muted fw-bold small mb-3" style={{ letterSpacing: '0.05em', fontSize: '0.7rem' }}>Reviewer</h6>
          <div className="p-3 bg-light rounded-4 d-flex align-items-center justify-content-between mb-4" style={{ backgroundColor: '#F9FAFB' }}>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center justify-content-center rounded-circle fw-bold text-danger bg-danger bg-opacity-10" style={{ width: '40px', height: '40px', fontSize: '0.875rem' }}>
                {review?.employee ? review.employee.split(' ').map(n => n[0]).join('') : 'ET'}
              </div>
              <div>
                <div className="fw-bold text-dark small">{review?.employee || 'Emp Test'}</div>
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>{review?.department || 'Engineering'}</div>
              </div>
            </div>
            <div className="text-primary fw-medium px-2 py-1 rounded-pill" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', fontSize: '0.75rem' }}>
              {review?.status || 'completed'}
            </div>
          </div>

          <h6 className="text-uppercase text-muted fw-bold small mb-3" style={{ letterSpacing: '0.05em', fontSize: '0.7rem' }}>Dimension Scores</h6>
          <div className="mb-4">
            <ScoreBar label="Quality of Work" score={4.2} />
            <ScoreBar label="Productivity" score={4.4} />
            <ScoreBar label="Communication" score={4.6} />
            <ScoreBar label="Teamwork" score={4.2} />
            <ScoreBar label="Leadership" score={4.4} />
            <ScoreBar label="Problem Solving" score={4.6} />
          </div>

          <h6 className="text-uppercase text-muted fw-bold small mb-3" style={{ letterSpacing: '0.05em', fontSize: '0.7rem' }}>Comments</h6>
          <div className="p-3 bg-light rounded-4 text-secondary small">
            Successfully completed major projects including system migration.
          </div>

        </div>

        <div className="p-4 border-top d-flex justify-content-between bg-white">
          <Button variant="destructive" type="button" className="btn-system btn-system-size-default btn-system-outline text-danger border-danger px-4" style={{ backgroundColor: 'rgba(220, 38, 38, 0.05)' }}>Delete</Button>
          <div className="d-flex gap-2">
            <Button variant="outline" type="button" onClick={onClose} className="btn-system btn-system-size-default btn-system-outline text-dark border-secondary px-4">Close</Button>
            <Button type="button" className="btn-system btn-system-size-default btn-system-primary px-4">Edit Review</Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReviewDetailDrawer;
