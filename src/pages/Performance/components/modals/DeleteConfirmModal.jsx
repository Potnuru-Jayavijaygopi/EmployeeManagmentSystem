import React from 'react';
import { X, Trash2, AlertTriangle } from 'lucide-react';
import Button from '../../../../components/common/Button';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, itemName = 'Assessment' }) => {
  if (!isOpen) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}>
      <div className="bg-white rounded-4 shadow-lg animate-modal-in d-flex flex-column" style={{ width: '100%', maxWidth: '500px', overflow: 'hidden' }}>

        <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(220, 38, 38, 0.1)', color: 'var(--danger)' }}>
              <Trash2 size={20} />
            </div>
            <div>
              <h5 className="mb-0 fw-bold">Delete {itemName}</h5>
              <p className="text-muted small mb-0">This action cannot be undone</p>
            </div>
          </div>
          <Button variant="icon" onClick={onClose} className="btn btn-light rounded-circle p-2 d-flex border-0 text-muted" style={{ backgroundColor: '#F9FAFB' }}>
            <X size={18} />
          </Button>
        </div>

        <div className="p-4 d-flex flex-column align-items-center text-center">

          <div className="d-flex align-items-center justify-content-center rounded-circle mb-4" style={{ width: '64px', height: '64px', backgroundColor: 'rgba(220, 38, 38, 0.1)', color: 'var(--danger)' }}>
            <Trash2 size={28} />
          </div>

          <p className="text-secondary mb-4">
            This will remove the {itemName.toLowerCase()} permanently.
          </p>

          <div className="w-100 p-3 rounded-3 d-flex align-items-center gap-3 mb-2" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <AlertTriangle className="text-warning flex-shrink-0" size={20} />
            <div className="text-warning small text-start">
              All related reviews and assessment data will also be removed.
            </div>
          </div>

        </div>

        <div className="p-4 d-flex justify-content-center gap-3 pb-5">
          <Button variant="outline" type="button" onClick={onClose} className="btn-system btn-system-size-default btn-system-outline text-dark border-secondary px-4">Cancel</Button>
          <Button variant="destructive" type="button" onClick={onConfirm} className="btn-system btn-system-size-default btn-system-outline text-danger border-danger px-4" style={{ backgroundColor: 'rgba(220, 38, 38, 0.05)' }}>Delete</Button>
        </div>

      </div>
    </div>
  );
};

export default DeleteConfirmModal;
