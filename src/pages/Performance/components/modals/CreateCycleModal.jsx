import React from 'react';
import { X, Calendar } from 'lucide-react';
import Button from '../../../../components/common/Button';

const CreateCycleModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}>
      <div className="bg-white rounded-4 shadow-lg animate-modal-in d-flex flex-column" style={{ width: '100%', maxWidth: '700px', maxHeight: '90vh', overflow: 'hidden' }}>

        <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: '40px', height: '40px', backgroundColor: '#EFF6FF', color: 'var(--primary-blue)' }}>
              <Calendar size={20} />
            </div>
            <div>
              <h5 className="mb-0 fw-bold">Create review cycle</h5>
              <p className="text-muted small mb-0">Set up a new performance review period</p>
            </div>
          </div>
          <Button variant="icon" onClick={onClose} className="btn btn-light rounded-circle p-2 d-flex border-0 text-muted" style={{ backgroundColor: '#F9FAFB' }}>
            <X size={18} />
          </Button>
        </div>

        <div className="p-4 flex-grow-1" style={{ overflowY: 'auto' }}>
          <form>
            <div className="mb-3">
              <label className="form-label small fw-bold text-dark">Cycle name <span className="text-danger">*</span></label>
              <input type="text" className="form-control" placeholder="e.g. Q2 2025 Performance Review" style={{ borderRadius: 'var(--r-md)' }} />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-sm-6">
                <label className="form-label small fw-bold text-dark">Type <span className="text-danger">*</span></label>
                <select className="form-select" style={{ borderRadius: 'var(--r-md)' }}>
                  <option>quarterly</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label small fw-bold text-dark">Status</label>
                <select className="form-select" style={{ borderRadius: 'var(--r-md)' }}>
                  <option>active</option>
                </select>
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-sm-6">
                <label className="form-label small fw-bold text-dark">Start date <span className="text-danger">*</span></label>
                <div className="position-relative">
                  <input type="text" className="form-control" placeholder="dd - mm - yyyy" style={{ borderRadius: 'var(--r-md)' }} />
                  <Calendar size={16} className="position-absolute text-muted" style={{ right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
              <div className="col-sm-6">
                <label className="form-label small fw-bold text-dark">End date <span className="text-danger">*</span></label>
                <div className="position-relative">
                  <input type="text" className="form-control" placeholder="dd - mm - yyyy" style={{ borderRadius: 'var(--r-md)' }} />
                  <Calendar size={16} className="position-absolute text-muted" style={{ right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>

            <h6 className="text-uppercase text-muted fw-bold small mb-3 mt-2" style={{ letterSpacing: '0.05em' }}>Participants</h6>
            <div className="mb-4">
              <label className="form-label small fw-bold text-dark mb-2">Assign employees</label>
              <div className="d-flex gap-2 flex-wrap">
                <Button type="button" className="btn btn-sm px-3 py-1 bg-primary bg-opacity-10 text-primary border-primary border-opacity-25" style={{ borderRadius: '20px' }}>All employees</Button>
                <Button variant="secondary" type="button" className="btn btn-sm px-3 py-1 bg-white text-secondary border border-secondary-subtle" style={{ borderRadius: '20px' }}>Engineering</Button>
                <Button variant="secondary" type="button" className="btn btn-sm px-3 py-1 bg-white text-secondary border border-secondary-subtle" style={{ borderRadius: '20px' }}>Product</Button>
                <Button variant="secondary" type="button" className="btn btn-sm px-3 py-1 bg-white text-secondary border border-secondary-subtle" style={{ borderRadius: '20px' }}>HR</Button>
                <Button variant="secondary" type="button" className="btn btn-sm px-3 py-1 bg-white text-secondary border border-secondary-subtle" style={{ borderRadius: '20px' }}>Design</Button>
              </div>
            </div>

            <h6 className="text-uppercase text-muted fw-bold small mb-3 mt-2" style={{ letterSpacing: '0.05em' }}>Assessment Types</h6>
            <div className="d-flex flex-column gap-3">
              <label className="d-flex align-items-start gap-3 p-3 border rounded-3 bg-white" style={{ cursor: 'pointer' }}>
                <input type="checkbox" className="form-check-input mt-1" defaultChecked />
                <div>
                  <div className="fw-bold text-dark" style={{ fontSize: '0.875rem' }}>Self assessment</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Employee evaluates their own performance</div>
                </div>
              </label>

              <label className="d-flex align-items-start gap-3 p-3 border rounded-3 bg-white" style={{ cursor: 'pointer' }}>
                <input type="checkbox" className="form-check-input mt-1" defaultChecked />
                <div>
                  <div className="fw-bold text-dark" style={{ fontSize: '0.875rem' }}>Manager evaluation</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Direct manager provides ratings and recommendations</div>
                </div>
              </label>

              <label className="d-flex align-items-start gap-3 p-3 border rounded-3 bg-white" style={{ cursor: 'pointer' }}>
                <input type="checkbox" className="form-check-input mt-1" />
                <div>
                  <div className="fw-bold text-dark" style={{ fontSize: '0.875rem' }}>Peer feedback</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Anonymous feedback from colleagues</div>
                </div>
              </label>
            </div>

          </form>
        </div>

        <div className="p-4 border-top d-flex justify-content-end gap-2 bg-white">
          <Button variant="outline" type="button" onClick={onClose} className="btn-system btn-system-size-default btn-system-outline text-dark border-secondary">Cancel</Button>
          <Button variant="outline" type="button" className="btn-system btn-system-size-default btn-system-outline text-dark border-secondary">Save draft</Button>
          <Button type="button" className="btn-system btn-system-size-default btn-system-primary">Create Cycle</Button>
        </div>

      </div>
    </div>
  );
};

export default CreateCycleModal;
