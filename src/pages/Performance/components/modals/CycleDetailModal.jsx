import React from 'react';
import { X, BarChart2 } from 'lucide-react';
import Button from '../../../../components/common/Button';

const CycleDetailModal = ({ isOpen, onClose, cycle }) => {
  if (!isOpen || !cycle) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}>
      <div className="bg-white rounded-4 shadow-lg animate-modal-in d-flex flex-column" style={{ width: '100%', maxWidth: '700px', maxHeight: '90vh', overflow: 'hidden' }}>

        <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: '40px', height: '40px', backgroundColor: '#EFF6FF', color: 'var(--primary-blue)' }}>
              <BarChart2 size={20} />
            </div>
            <div>
              <h5 className="mb-0 fw-bold">{cycle.title || 'Development of Frontend'}</h5>
              <p className="text-muted small mb-0">{cycle.type || 'semi_annual'} · {cycle.startDate} → {cycle.endDate}</p>
            </div>
          </div>
          <Button variant="icon" onClick={onClose} className="btn btn-light rounded-circle p-2 d-flex border-0 text-muted" style={{ backgroundColor: '#F9FAFB' }}>
            <X size={18} />
          </Button>
        </div>

        <div className="p-4 flex-grow-1" style={{ overflowY: 'auto' }}>

          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-4">
              <div className="p-3 border rounded-3 text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100px' }}>
                <div className="text-muted text-uppercase small fw-bold mb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>Total Participants</div>
                <div className="fs-3 fw-bold text-dark">{cycle.participants || '8'}</div>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="p-3 border rounded-3 text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100px' }}>
                <div className="text-muted text-uppercase small fw-bold mb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>Completed</div>
                <div className="fs-3 fw-bold text-success">5</div>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="p-3 border rounded-3 text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100px' }}>
                <div className="text-muted text-uppercase small fw-bold mb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>Avg Score</div>
                <div className="fs-3 fw-bold text-primary">4.2</div>
              </div>
            </div>
          </div>

          <h6 className="text-uppercase text-muted fw-bold small mb-4" style={{ letterSpacing: '0.05em', fontSize: '0.7rem' }}>Participation by Assessment Type</h6>

          <div className="mb-4">
            <div className="d-flex justify-content-between mb-1">
              <span className="text-dark small fw-medium">Self Assessments</span>
              <span className="text-dark fw-bold small">60%</span>
            </div>
            <div className="progress" style={{ height: '8px' }}>
              <div className="progress-bar bg-primary" role="progressbar" style={{ width: '60%' }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>

          <div className="mb-4">
            <div className="d-flex justify-content-between mb-1">
              <span className="text-dark small fw-medium">Manager Reviews</span>
              <span className="text-dark fw-bold small">48%</span>
            </div>
            <div className="progress" style={{ height: '8px' }}>
              <div className="progress-bar bg-primary" role="progressbar" style={{ width: '48%' }} aria-valuenow="48" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>

          <div className="mb-2">
            <div className="d-flex justify-content-between mb-1">
              <span className="text-dark small fw-medium">Peer Feedback</span>
              <span className="text-dark fw-bold small">36%</span>
            </div>
            <div className="progress" style={{ height: '8px' }}>
              <div className="progress-bar bg-primary" role="progressbar" style={{ width: '36%' }} aria-valuenow="36" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>

        </div>

        <div className="p-4 border-top d-flex justify-content-end gap-2 bg-white">
          <Button variant="outline" type="button" onClick={onClose} className="btn-system btn-system-size-default btn-system-outline text-dark border-secondary">Close</Button>
          <Button type="button" className="btn-system btn-system-size-default btn-system-primary">Export Report</Button>
        </div>

      </div>
    </div>
  );
};

export default CycleDetailModal;
