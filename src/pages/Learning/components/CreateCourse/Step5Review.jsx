import React from 'react';
import { AlignLeft } from 'lucide-react';
import Button from '../../../../components/common/Button';

const Step5Review = ({ onFinish, onPrev }) => {
  return (
    <div>
      <div className="d-flex align-items-center gap-2 mb-4 pb-3 border-bottom">
        <AlignLeft size={18} className="text-primary" />
        <h6 className="mb-0 fw-bold text-dark lms-font-md">Review & Publish</h6>
      </div>

      <div className="row g-5 mb-5">

        <div className="col-12 col-md-6">
          <h6 className="text-muted small fw-bold text-uppercase mb-4 lms-font-xs lms-tracking-wide">Course Details</h6>

          <div className="d-flex mb-3">
            <div className="text-secondary small fw-medium" style={{ width: '120px' }}>Title</div>
            <div className="fw-bold text-dark small flex-grow-1">React Advanced Patterns</div>
          </div>
          <div className="d-flex mb-3">
            <div className="text-secondary small fw-medium" style={{ width: '120px' }}>Category</div>
            <div className="text-dark small flex-grow-1">Technical</div>
          </div>
          <div className="d-flex mb-3">
            <div className="text-secondary small fw-medium" style={{ width: '120px' }}>Difficulty</div>
            <div className="flex-grow-1">
              <span className="badge bg-warning bg-opacity-10 text-warning px-2 py-1 rounded">Intermediate</span>
            </div>
          </div>
          <div className="d-flex mb-3">
            <div className="text-secondary small fw-medium" style={{ width: '120px' }}>Duration</div>
            <div className="text-dark small flex-grow-1">12 hours</div>
          </div>
          <div className="d-flex mb-3">
            <div className="text-secondary small fw-medium" style={{ width: '120px' }}>Deadline</div>
            <div className="text-dark small flex-grow-1">Jun 30, 2026</div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <h6 className="text-muted small fw-bold text-uppercase mb-4 lms-font-xs lms-tracking-wide">Assignment</h6>

          <div className="d-flex mb-3">
            <div className="text-secondary small fw-medium" style={{ width: '120px' }}>Assigned to</div>
            <div className="fw-bold text-dark small flex-grow-1">4 employees</div>
          </div>
          <div className="d-flex mb-3">
            <div className="text-secondary small fw-medium" style={{ width: '120px' }}>Quiz required</div>
            <div className="flex-grow-1">
              <span className="badge bg-success bg-opacity-10 text-success px-2 py-1 rounded">Yes</span>
            </div>
          </div>
          <div className="d-flex mb-3">
            <div className="text-secondary small fw-medium" style={{ width: '120px' }}>Pass score</div>
            <div className="text-dark small flex-grow-1">70%</div>
          </div>
          <div className="d-flex mb-3">
            <div className="text-secondary small fw-medium" style={{ width: '120px' }}>Certificate</div>
            <div className="flex-grow-1">
              <span className="badge bg-success bg-opacity-10 text-success px-2 py-1 rounded">Enabled</span>
            </div>
          </div>
          <div className="d-flex mb-3">
            <div className="text-secondary small fw-medium" style={{ width: '120px' }}>Reminders</div>
            <div className="text-dark small flex-grow-1">3 days before</div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between mt-4 pt-4 border-top">
        <Button variant="secondary" type="button" onClick={onPrev} className="btn btn-light text-dark lms-radius-md">← Previous</Button>
        <div className="d-flex gap-3">
          <Button variant="secondary" type="button" className="btn btn-light border text-dark lms-radius-md">Save as Draft</Button>
          <Button type="button" onClick={onFinish} className="btn btn-primary lms-radius-md">Publish Course</Button>
        </div>
      </div>
    </div>
  );
};

export default Step5Review;
