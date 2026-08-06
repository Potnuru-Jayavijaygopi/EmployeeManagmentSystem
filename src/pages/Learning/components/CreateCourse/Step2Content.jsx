import React from 'react';
import { BookOpen, Upload, X } from 'lucide-react';
import Button from '../../../../components/common/Button';

const Step2Content = ({ onNext, onPrev }) => {
  return (
    <div>
      <div className="d-flex align-items-center gap-2 mb-4">
        <BookOpen size={18} className="text-primary" />
        <h6 className="mb-0 fw-bold text-dark lms-font-md">Course Content</h6>
      </div>

      <form>
        <div className="mb-4">
          <label className="form-label small fw-bold text-muted text-uppercase mb-2 lms-font-xs lms-tracking-wide">Content Type</label>
          <input type="text" className="form-control text-dark lms-radius-md" defaultValue="Video + Text" />
        </div>

        <div className="mb-4">
          <label className="form-label small fw-bold text-muted text-uppercase mb-2 lms-font-xs lms-tracking-wide">Upload Content</label>
          <div className="rounded-4 p-5 d-flex flex-column align-items-center justify-content-center text-center lms-bg-gray lms-cursor-pointer lms-dropzone-blue lms-dropzone">
            <Upload size={24} className="text-muted mb-3" />
            <div className="text-secondary small mb-1">Drag and drop files here</div>
            <div className="text-muted lms-font-sm">MP4, PDF, ZIP up to 500MB</div>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label small fw-bold text-muted text-uppercase mb-2 lms-font-xs lms-tracking-wide">Learning Objectives</label>
          <textarea className="form-control text-dark lms-radius-md" rows="4" placeholder="After completing this course, learners will be able to..."></textarea>
        </div>

        <div className="mb-5">
          <label className="form-label small fw-bold text-muted text-uppercase mb-2 lms-font-xs lms-tracking-wide">Tags</label>
          <div className="form-control d-flex align-items-center flex-wrap gap-2 p-2 lms-radius-md">
            <span className="badge bg-primary bg-opacity-10 text-primary d-flex align-items-center gap-1">
              React <X size={12} className="lms-cursor-pointer" />
            </span>
            <span className="badge bg-primary bg-opacity-10 text-primary d-flex align-items-center gap-1">
              Frontend <X size={12} className="lms-cursor-pointer" />
            </span>
            <span className="badge bg-primary bg-opacity-10 text-primary d-flex align-items-center gap-1">
              JavaScript <X size={12} className="lms-cursor-pointer" />
            </span>
            <input type="text" className="border-0 flex-grow-1 shadow-none" placeholder="Add tag, press Enter..." />
          </div>
        </div>

        <div className="d-flex justify-content-between mt-4 pt-4 border-top">
          <Button variant="ghost" type="button" onClick={onPrev} className="btn-system btn-system-size-default btn-system-ghost bg-light text-dark">← Previous</Button>
          <Button type="button" onClick={onNext} className="btn-system btn-system-size-default btn-system-primary">Next: Assign Users →</Button>
        </div>
      </form>
    </div>
  );
};

export default Step2Content;
