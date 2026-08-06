import React from 'react';
import { Upload, MonitorPlay } from 'lucide-react';
import Button from '../../../../components/common/Button';

const Step1Basics = ({ onNext, onCancel }) => {
  return (
    <div>
      <div className="d-flex align-items-center gap-2 mb-4">
        <MonitorPlay size={18} className="text-primary" />
        <h6 className="mb-0 fw-bold text-dark lms-font-md">Course Basics</h6>
      </div>

      <form>
        <div className="mb-4">
          <label className="form-label small fw-bold text-muted text-uppercase mb-2 lms-font-xs lms-tracking-wide">Course Title <span className="text-primary">*</span></label>
          <input type="text" className="form-control text-dark lms-radius-md" placeholder="e.g. React Advanced Patterns" />
        </div>

        <div className="mb-4">
          <label className="form-label small fw-bold text-muted text-uppercase mb-2 lms-font-xs lms-tracking-wide">Short Description <span className="text-primary">*</span></label>
          <textarea className="form-control text-dark lms-radius-md" rows="4" placeholder="Brief overview of what learners will achieve..."></textarea>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-12 col-md-6">
            <label className="form-label small fw-bold text-muted text-uppercase mb-2 lms-font-xs lms-tracking-wide">Category <span className="text-primary">*</span></label>
            <input type="text" className="form-control text-dark lms-radius-md" defaultValue="Technical" />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label small fw-bold text-muted text-uppercase mb-2 lms-font-xs lms-tracking-wide">Difficulty Level</label>
            <input type="text" className="form-control text-dark lms-radius-md" defaultValue="Beginner" />
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-12 col-md-6">
            <label className="form-label small fw-bold text-muted text-uppercase mb-2 lms-font-xs lms-tracking-wide">Duration (Hours)</label>
            <input type="text" className="form-control text-dark lms-radius-md" placeholder="e.g. 8" />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label small fw-bold text-muted text-uppercase mb-2 lms-font-xs lms-tracking-wide">Deadline</label>
            <input type="text" className="form-control text-dark lms-radius-md" />
          </div>
        </div>

        <div className="mb-5">
          <label className="form-label small fw-bold text-muted text-uppercase mb-2 lms-font-xs lms-tracking-wide">Course Thumbnail</label>
          <div className="border border-dashed rounded-4 p-5 d-flex flex-column align-items-center justify-content-center text-center border-secondary-subtle lms-bg-gray lms-cursor-pointer">
            <Upload size={24} className="text-muted mb-2" />
            <div className="text-secondary small fw-medium mb-1">Click to upload or drag and drop</div>
            <div className="text-muted lms-font-sm">PNG, JPG up to 5MB</div>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-3 mt-4 pt-4 border-top">
          <Button variant="ghost" type="button" onClick={onCancel} className="btn-system btn-system-size-default btn-system-ghost bg-light text-dark">Cancel</Button>
          <Button type="button" onClick={onNext} className="btn-system btn-system-size-default btn-system-primary">Next: Content →</Button>
        </div>
      </form>
    </div>
  );
};

export default Step1Basics;
