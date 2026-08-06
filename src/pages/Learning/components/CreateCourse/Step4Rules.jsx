import React from 'react';
import { Shield } from 'lucide-react';
import Button from '../../../../components/common/Button';

const Step4Rules = ({ onNext, onPrev }) => {
  return (
    <div>
      <div className="d-flex align-items-center gap-2 mb-4 pb-3 border-bottom">
        <Shield size={18} className="text-primary" />
        <h6 className="mb-0 fw-bold text-dark lms-font-md">Completion Rules</h6>
      </div>

      <form>
        <div className="d-flex flex-column gap-4 mb-5">

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="fw-medium text-dark lms-font-md">Require quiz to complete</div>
              <div className="text-muted lms-font-sm">Learner must pass the assessment to mark course complete</div>
            </div>
            <div className="form-check form-switch mb-0">
              <input className="form-check-input lms-cursor-pointer" type="checkbox" role="switch" defaultChecked style={{ width: '2.5rem', height: '1.25rem' }} />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="fw-medium text-dark lms-font-md">Minimum passing score</div>
              <div className="text-muted lms-font-sm">Set minimum score threshold for passing</div>
            </div>
            <div>
              <input type="text" className="form-control form-control-sm text-center lms-radius-md" defaultValue="70" style={{ width: '60px' }} />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="fw-medium text-dark lms-font-md">Certificate on completion</div>
              <div className="text-muted lms-font-sm">Auto-generate and send certificate when learner completes</div>
            </div>
            <div className="form-check form-switch mb-0">
              <input className="form-check-input lms-cursor-pointer" type="checkbox" role="switch" defaultChecked style={{ width: '2.5rem', height: '1.25rem' }} />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="fw-medium text-dark lms-font-md">Send reminder notifications</div>
              <div className="text-muted lms-font-sm">Notify learners before deadline</div>
            </div>
            <div className="form-check form-switch mb-0">
              <input className="form-check-input lms-cursor-pointer" type="checkbox" role="switch" defaultChecked style={{ width: '2.5rem', height: '1.25rem' }} />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="fw-medium text-dark lms-font-md">Allow retakes</div>
              <div className="text-muted lms-font-sm">Learners can retake the quiz multiple times</div>
            </div>
            <div className="form-check form-switch mb-0">
              <input className="form-check-input lms-cursor-pointer" type="checkbox" role="switch" style={{ width: '2.5rem', height: '1.25rem' }} />
            </div>
          </div>

        </div>

        <div className="mb-5">
          <label className="form-label small fw-bold text-muted text-uppercase mb-2 lms-font-xs lms-tracking-wide">Reminder Days Before Deadline</label>
          <input type="text" className="form-control text-dark lms-radius-md" defaultValue="3" style={{ width: '100px' }} />
        </div>

        <div className="d-flex justify-content-between mt-4 pt-4 border-top">
          <Button variant="secondary" type="button" onClick={onPrev} className="btn btn-light text-dark lms-radius-md">← Previous</Button>
          <Button type="button" onClick={onNext} className="btn btn-primary lms-radius-md">Next: Review & Publish →</Button>
        </div>
      </form>
    </div>
  );
};

export default Step4Rules;
