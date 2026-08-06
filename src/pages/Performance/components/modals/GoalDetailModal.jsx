import React from 'react';
import { X, Calendar } from 'lucide-react';
import Button from '../../../../components/common/Button';

const GoalDetailModal = ({ isOpen, onClose, goal, mode = 'view' }) => {
  if (!isOpen) return null;

  const isEdit = mode === 'edit';

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}>
      <div className="bg-white rounded-4 shadow-lg animate-modal-in d-flex flex-column" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflow: 'hidden' }}>

        <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
          <h5 className="mb-0 fw-bold text-dark">{isEdit ? 'Edit Goal' : 'View Goal'}</h5>
          <Button variant="icon" onClick={onClose} className="btn btn-light rounded-circle p-2 d-flex border-0 text-muted" style={{ backgroundColor: '#F9FAFB' }}>
            <X size={18} />
          </Button>
        </div>

        <div className="p-4 flex-grow-1" style={{ overflowY: 'auto' }}>

          <div className="mb-4">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted small fw-medium">Progress</span>
              <span className="text-primary fw-bold">0%</span>
            </div>
            <div className="progress mb-2" style={{ height: '8px', backgroundColor: '#F3F4F6' }}>
              <div className="progress-bar bg-primary rounded-pill" role="progressbar" style={{ width: '0%' }}></div>
            </div>
            <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.75rem' }}>
              <span>Current: 0</span>
              <span>Target: —</span>
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-6">
              <label className="form-label text-muted small fw-bold text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>Category</label>
              <div className="text-dark">—</div>
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label text-muted small fw-bold text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>Owner</label>
              <div className="text-dark">—</div>
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label text-muted small fw-bold text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>Due Date</label>
              <div className="text-dark">—</div>
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label text-muted small fw-bold text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>Priority</label>
              <div className="text-dark">—</div>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>Description</label>
            <div className="text-dark">—</div>
          </div>

          <hr className="my-4 text-secondary opacity-25" />

          <div className="mb-4">
            <label className="form-label text-muted small fw-bold text-uppercase mb-3" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>Add Progress Update</label>
            <div className="row g-3 mb-3">
              <div className="col-12 col-sm-4">
                <label className="form-label small text-muted">% Complete</label>
                <input type="text" className="form-control" placeholder="0-100" />
              </div>
              <div className="col-12 col-sm-4">
                <label className="form-label small text-muted">Current Value</label>
                <input type="text" className="form-control" placeholder="0" />
              </div>
              <div className="col-12 col-sm-4">
                <label className="form-label small text-muted">Title</label>
                <input type="text" className="form-control" placeholder="Update note" />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label small text-muted">Description</label>
              <textarea className="form-control" rows="3" placeholder="What did you accomplish?"></textarea>
            </div>
            <Button className="btn-system btn-system-primary">Post Update</Button>
          </div>

          <hr className="my-4 text-secondary opacity-25" />

          <div className="mb-4">
            <label className="form-label text-muted small fw-bold text-uppercase mb-3" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>Milestones</label>
            <div className="d-flex gap-2">
              <input type="text" className="form-control flex-grow-1" placeholder="Milestone title" />
              <div className="position-relative" style={{ width: '150px' }}>
                <input type="text" className="form-control ps-3 pe-5" placeholder="dd - mm - yyyy" />
                <Calendar size={16} className="position-absolute text-muted" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
              <Button className="btn-system btn-system-primary">Add</Button>
            </div>
          </div>

          <hr className="my-4 text-secondary opacity-25" />

          <div className="mb-4">
            <label className="form-label text-muted small fw-bold text-uppercase mb-3" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>Comments</label>
            <textarea className="form-control mb-3" rows="3" placeholder="Add a comment..."></textarea>
            <Button className="btn-system btn-system-primary">Post Comment</Button>
          </div>

        </div>

        <div className="p-4 border-top d-flex justify-content-end bg-white">
          <Button variant="outline" type="button" onClick={onClose} className="btn-system btn-system-size-default btn-system-outline text-dark border-secondary">Close</Button>
        </div>

      </div>
    </div>
  );
};

export default GoalDetailModal;
