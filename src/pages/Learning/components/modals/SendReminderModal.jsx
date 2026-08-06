import React from 'react';
import { X, Megaphone, Bell } from 'lucide-react';
import Button from '../../../../components/common/Button';

const SendReminderModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1050 }}>
      <div className="bg-white rounded-4 shadow-lg d-flex flex-column" style={{ width: '100%', maxWidth: '500px' }}>

        <div className="p-4 pb-3 d-flex justify-content-between align-items-center border-bottom">
          <div className="d-flex align-items-center gap-2">
            <Megaphone size={18} className="text-primary" />
            <h5 className="mb-0 fw-bold" style={{ fontSize: '1.1rem' }}>Send Reminder</h5>
          </div>
          <Button variant="icon" onClick={onClose} className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center border-0 text-muted" style={{ backgroundColor: 'transparent' }}>
            <X size={20} />
          </Button>
        </div>

        <div className="p-4 text-center">

          <div className="d-flex justify-content-center mb-4">
            <div className="rounded-circle d-flex align-items-center justify-content-center bg-primary bg-opacity-10" style={{ width: '80px', height: '80px' }}>
              <div className="rounded-circle d-flex align-items-center justify-content-center bg-white shadow-sm" style={{ width: '56px', height: '56px' }}>
                <Bell size={28} className="text-primary" />
              </div>
            </div>
          </div>

          <h5 className="fw-bold text-dark mb-2">Push Notifications & Emails</h5>
          <p className="text-muted small px-3 mb-4">
            You are about to send a reminder to learners who haven't completed this course yet.
          </p>

          <div className="text-start mb-4">
            <label className="form-label small fw-bold text-muted text-uppercase mb-2" style={{ letterSpacing: '0.05em', fontSize: '0.7rem' }}>Target Audience</label>
            <select className="form-select text-dark shadow-none" style={{ borderRadius: 'var(--r-md)' }}>
              <option>All Incomplete Learners (14)</option>
            </select>
          </div>

          <div className="text-start mb-2">
            <label className="form-label small fw-bold text-muted text-uppercase mb-2" style={{ letterSpacing: '0.05em', fontSize: '0.7rem' }}>Message Preview</label>
            <div className="border rounded-4 p-3 bg-white text-muted small" style={{ minHeight: '100px' }}>
              <div className="mb-3 text-dark">
                <strong>Subject:</strong> Course Reminder: React Advanced Patterns
              </div>
              <div>
                Hi [Learner Name], this is a friendly reminder to complete your assigned course before the deadline (Jun 30, 2026).
              </div>
            </div>
          </div>

        </div>

        <div className="p-4 border-top d-flex justify-content-end gap-2 bg-white" style={{ borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}>
          <Button variant="ghost" type="button" onClick={onClose} className="btn-system btn-system-size-default btn-system-ghost bg-light text-dark">Cancel</Button>
          <Button type="button" onClick={onClose} className="btn-system btn-system-size-default btn-system-primary">Send Now</Button>
        </div>

      </div>
    </div>
  );
};

export default SendReminderModal;
