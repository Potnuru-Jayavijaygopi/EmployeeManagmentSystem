import React from 'react';
import { X, Calendar } from 'lucide-react';
import Button from '../../../../components/common/Button';

const CreateReviewModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}>
      <div className="bg-white rounded-4 shadow-lg animate-modal-in" style={{ width: '100%', maxWidth: '600px', overflow: 'hidden' }}>

        <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: '40px', height: '40px', backgroundColor: '#EFF6FF', color: 'var(--primary-blue)' }}>
              <Calendar size={20} />
            </div>
            <div>
              <h5 className="mb-0 fw-bold">Create review</h5>
              <p className="text-muted small mb-0">Add a review for a specific employee</p>
            </div>
          </div>
          <Button variant="icon" onClick={onClose} className="btn btn-light rounded-circle p-2 d-flex border-0 text-muted" style={{ backgroundColor: '#F9FAFB' }}>
            <X size={18} />
          </Button>
        </div>

        <div className="p-4">
          <form>
            <div className="mb-3">
              <label className="form-label small fw-bold text-dark">Employee <span className="text-danger">*</span></label>
              <input type="text" className="form-control" defaultValue="Emp Test" style={{ borderRadius: 'var(--r-md)' }} />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold text-dark">Review cycle <span className="text-danger">*</span></label>
              <input type="text" className="form-control" defaultValue="Q1 2025 Performance Review" style={{ borderRadius: 'var(--r-md)' }} />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold text-dark mb-2 d-block">Review type <span className="text-danger">*</span></label>
              <div className="d-flex gap-2">
                <Button type="button" className="btn btn-sm px-3 py-1 bg-primary bg-opacity-10 text-primary border-primary border-opacity-25" style={{ borderRadius: '20px' }}>Self</Button>
                <Button variant="secondary" type="button" className="btn btn-sm px-3 py-1 bg-white text-secondary border border-secondary-subtle" style={{ borderRadius: '20px' }}>Peer</Button>
                <Button variant="secondary" type="button" className="btn btn-sm px-3 py-1 bg-white text-secondary border border-secondary-subtle" style={{ borderRadius: '20px' }}>Manager</Button>
                <Button variant="secondary" type="button" className="btn btn-sm px-3 py-1 bg-white text-secondary border border-secondary-subtle" style={{ borderRadius: '20px' }}>360°</Button>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold text-dark">Reviewer (if not self)</label>
              <select className="form-select text-muted" style={{ borderRadius: 'var(--r-md)' }}>
                <option>— Select reviewer —</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label small fw-bold text-dark">Due date</label>
              <div className="position-relative">
                <input type="text" className="form-control" placeholder="dd - mm - yyyy" style={{ borderRadius: 'var(--r-md)' }} />
                <Calendar size={16} className="position-absolute text-muted" style={{ right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>
          </form>
        </div>

        <div className="p-4 border-top d-flex justify-content-end gap-2">
          <Button variant="outline" type="button" onClick={onClose} className="btn-system btn-system-size-default btn-system-outline text-dark border-secondary">Cancel</Button>
          <Button type="button" className="btn-system btn-system-size-default btn-system-primary">Create Review</Button>
        </div>

      </div>
    </div>
  );
};

export default CreateReviewModal;
