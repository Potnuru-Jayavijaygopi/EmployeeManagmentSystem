import React from 'react';
import { X, Calendar, ArrowDown, ArrowRight, ArrowUp } from 'lucide-react';
import Button from '../../../../components/common/Button';

const CreateKPIModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}>
      <div className="bg-white rounded-4 shadow-lg animate-modal-in d-flex flex-column" style={{ width: '100%', maxWidth: '700px', maxHeight: '90vh', overflow: 'hidden' }}>

        <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
          <div>
            <h5 className="mb-0 fw-bold">Create KPI</h5>
            <p className="text-muted small mb-0">Define a measurable performance indicator</p>
          </div>
          <Button variant="icon" onClick={onClose} className="btn btn-light rounded-circle p-2 d-flex border-0 text-muted" style={{ backgroundColor: '#F9FAFB' }}>
            <X size={18} />
          </Button>
        </div>

        <div className="p-4 flex-grow-1" style={{ overflowY: 'auto' }}>
          <form>
            <div className="row g-3 mb-3">
              <div className="col-sm-6">
                <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ letterSpacing: '0.05em', fontSize: '0.7rem' }}>Name <span className="text-primary">*</span></label>
                <input type="text" className="form-control" placeholder="e.g. Sales Conversion Rate" style={{ borderRadius: 'var(--r-md)' }} />
              </div>
              <div className="col-sm-6">
                <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ letterSpacing: '0.05em', fontSize: '0.7rem' }}>Unit <span className="text-primary">*</span></label>
                <input type="text" className="form-control" placeholder="e.g. %, units, sales" style={{ borderRadius: 'var(--r-md)' }} />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ letterSpacing: '0.05em', fontSize: '0.7rem' }}>Description</label>
              <textarea className="form-control" rows="3" placeholder="Describe what this KPI measures..." style={{ borderRadius: 'var(--r-md)' }}></textarea>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-sm-6">
                <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ letterSpacing: '0.05em', fontSize: '0.7rem' }}>Target value <span className="text-primary">*</span></label>
                <input type="text" className="form-control" placeholder="e.g. 100" style={{ borderRadius: 'var(--r-md)' }} />
              </div>
              <div className="col-sm-6">
                <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ letterSpacing: '0.05em', fontSize: '0.7rem' }}>Current value</label>
                <input type="text" className="form-control" defaultValue="0" style={{ borderRadius: 'var(--r-md)' }} />
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-sm-6">
                <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ letterSpacing: '0.05em', fontSize: '0.7rem' }}>Period start <span className="text-primary">*</span></label>
                <div className="position-relative">
                  <input type="text" className="form-control" placeholder="dd - mm - yyyy" style={{ borderRadius: 'var(--r-md)' }} />
                  <Calendar size={16} className="position-absolute text-muted" style={{ right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
              <div className="col-sm-6">
                <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ letterSpacing: '0.05em', fontSize: '0.7rem' }}>Period end <span className="text-primary">*</span></label>
                <div className="position-relative">
                  <input type="text" className="form-control" placeholder="dd - mm - yyyy" style={{ borderRadius: 'var(--r-md)' }} />
                  <Calendar size={16} className="position-absolute text-muted" style={{ right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>

            <h6 className="text-uppercase text-muted fw-bold small mb-2" style={{ letterSpacing: '0.05em', fontSize: '0.7rem' }}>Performance Thresholds</h6>
            <div className="row g-3 mb-4">
              <div className="col-sm-4">
                <label className="form-label small fw-bold text-danger text-uppercase mb-1" style={{ letterSpacing: '0.05em', fontSize: '0.65rem' }}>Threshold Low <span className="text-primary">*</span></label>
                <input type="text" className="form-control border-danger-subtle text-danger mb-2" placeholder="Poor below this" style={{ borderRadius: 'var(--r-md)' }} />
                <div className="w-100 text-center py-2 rounded-3 text-danger fw-medium" style={{ backgroundColor: '#FEE2E2', fontSize: '0.875rem' }}>
                  <ArrowDown size={14} className="me-1" /> Poor
                </div>
              </div>
              <div className="col-sm-4">
                <label className="form-label small fw-bold text-warning text-uppercase mb-1" style={{ letterSpacing: '0.05em', fontSize: '0.65rem' }}>Threshold Medium <span className="text-primary">*</span></label>
                <input type="text" className="form-control border-warning-subtle text-warning mb-2" placeholder="Good above this" style={{ borderRadius: 'var(--r-md)' }} />
                <div className="w-100 text-center py-2 rounded-3 text-warning fw-medium" style={{ backgroundColor: '#FEF3C7', fontSize: '0.875rem' }}>
                  <ArrowRight size={14} className="me-1" /> Good
                </div>
              </div>
              <div className="col-sm-4">
                <label className="form-label small fw-bold text-success text-uppercase mb-1" style={{ letterSpacing: '0.05em', fontSize: '0.65rem' }}>Threshold High <span className="text-primary">*</span></label>
                <input type="text" className="form-control border-success-subtle text-success mb-2" placeholder="Excellent above this" style={{ borderRadius: 'var(--r-md)' }} />
                <div className="w-100 text-center py-2 rounded-3 text-success fw-medium" style={{ backgroundColor: '#DCFCE7', fontSize: '0.875rem' }}>
                  <ArrowUp size={14} className="me-1" /> Excellent
                </div>
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-sm-6">
                <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ letterSpacing: '0.05em', fontSize: '0.7rem' }}>Frequency</label>
                <select className="form-select" style={{ borderRadius: 'var(--r-md)' }}>
                  <option>Monthly</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ letterSpacing: '0.05em', fontSize: '0.7rem' }}>Category</label>
                <select className="form-select text-muted" style={{ borderRadius: 'var(--r-md)' }}>
                  <option>— Select Category —</option>
                </select>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2 mb-2">
              <div className="form-check form-switch mb-0">
                <input className="form-check-input" type="checkbox" role="switch" defaultChecked style={{ width: '2.5rem', height: '1.25rem' }} />
              </div>
              <span className="fw-medium text-dark small ms-2">Active</span>
              <span className="text-muted small"> — KPI will be tracked immediately</span>
            </div>

          </form>
        </div>

        <div className="p-4 border-top d-flex justify-content-end gap-2 bg-white">
          <Button variant="outline" type="button" onClick={onClose} className="btn-system btn-system-size-default btn-system-outline text-dark border-secondary">Close</Button>
          <Button type="button" className="btn-system btn-system-size-default btn-system-primary">Create KPI</Button>
        </div>

      </div>
    </div>
  );
};

export default CreateKPIModal;
