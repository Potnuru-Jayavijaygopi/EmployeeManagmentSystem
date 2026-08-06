import React, { useState } from 'react';
import { X, Upload, FileText, MonitorPlay } from 'lucide-react';
import Button from '../../../../components/common/Button';

const EditCourseModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('module'); 
  const [contentType, setContentType] = useState('Link'); 

  if (!isOpen) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1050 }}>
      <div className="bg-white rounded-4 shadow-lg d-flex flex-column lms-modal-container" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh' }}>

        <div className="p-4 d-flex justify-content-between align-items-start">
          <h5 className="mb-0 fw-bold">Edit Course</h5>
          <Button variant="icon" onClick={onClose} className="btn btn-light rounded-circle p-2 d-flex align-items-start justify-content-start border-0 text-muted">
            <X size={20} />
          </Button>
        </div>

        <div className="p-4 pt-0 flex-grow-1 overflow-auto">

          <div className="d-flex bg-light p-1 rounded-3 mb-4">
            <Button 
              className={`flex-grow-1 btn btn-sm fw-medium ${activeTab === 'module' ? 'btn-primary shadow-sm' : 'text-muted'}`}
              onClick={() => setActiveTab('module')}
            >
              Add Module
            </Button>
            <Button 
              className={`flex-grow-1 btn btn-sm fw-medium ${activeTab === 'quiz' ? 'btn-primary shadow-sm' : 'text-muted'}`}
              onClick={() => setActiveTab('quiz')}
            >
              Create Quiz
            </Button>
          </div>

          {activeTab === 'module' && (
            <div>
              <div className="mb-4">
                <label className="form-label small fw-bold text-muted text-uppercase mb-2">Module Title</label>
                <input type="text" className="form-control text-dark" placeholder="e.g. Introduction to Hooks" />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-muted text-uppercase mb-2">Content Type</label>
                <div className="d-flex border rounded-3 p-1">
                  <Button variant="secondary" 
                    className={`flex-grow-1 btn btn-sm fw-medium ${contentType === 'PDF' ? 'btn-primary' : 'text-muted bg-white'}`}
                    onClick={() => setContentType('PDF')}
                  >
                    PDF
                  </Button>
                  <Button variant="secondary" 
                    className={`flex-grow-1 btn btn-sm fw-medium ${contentType === 'Video' ? 'btn-primary' : 'text-muted bg-white'}`}
                    onClick={() => setContentType('Video')}
                  >
                    Video
                  </Button>
                  <Button variant="secondary" 
                    className={`flex-grow-1 btn btn-sm fw-medium ${contentType === 'Link' ? 'btn-primary' : 'text-muted bg-white'}`}
                    onClick={() => setContentType('Link')}
                  >
                    Link
                  </Button>
                </div>
              </div>

              {contentType === 'Link' && (
                <>
                  <div className="mb-4">
                    <label className="form-label small fw-bold text-muted text-uppercase mb-2">External URL</label>
                    <input type="text" className="form-control text-dark" placeholder="https://..." />
                  </div>
                  <div className="mb-4">
                    <label className="form-label small fw-bold text-muted text-uppercase mb-2">Link Label (Optional)</label>
                    <input type="text" className="form-control text-dark" placeholder="e.g. Watch on YouTube" />
                  </div>
                </>
              )}

              {contentType === 'Video' && (
                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted text-uppercase mb-2">Upload Video</label>
                  <div className="rounded-4 p-5 d-flex flex-column align-items-center justify-content-center text-center" style={{ backgroundColor: '#F9FAFB', cursor: 'pointer', border: '2px dashed #3B82F6' }}>
                    <MonitorPlay size={24} className="text-muted mb-3" />
                    <div className="text-secondary small mb-1">Drop MP4/MOV here or click to browse</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>MP4, MOV up to 500MB</div>
                  </div>
                </div>
              )}

              {contentType === 'PDF' && (
                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted text-uppercase mb-2">Upload PDF</label>
                  <div className="rounded-4 p-5 d-flex flex-column align-items-center justify-content-center text-center" style={{ backgroundColor: '#F9FAFB', cursor: 'pointer', border: '2px dashed #3B82F6' }}>
                    <Upload size={24} className="text-muted mb-3" />
                    <div className="text-secondary small mb-1">Drop PDF here or click to browse</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>PDF up to 50MB</div>
                  </div>
                </div>
              )}

              <div className="mb-2">
                <label className="form-label small fw-bold text-muted text-uppercase mb-2">Module Description (Optional)</label>
                <textarea className="form-control text-dark" rows="3" placeholder="Brief summary of this module..."></textarea>
              </div>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div>
              <div className="mb-4">
                <label className="form-label small fw-bold text-muted text-uppercase mb-2">Quiz Title</label>
                <input type="text" className="form-control text-dark" placeholder="e.g. Module 1 Assessment" />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-muted text-uppercase mb-2">Upload Quiz (CSV)</label>
                <div className="border rounded-4 p-4 d-flex flex-column align-items-center justify-content-center text-center" style={{ backgroundColor: '#F9FAFB', cursor: 'pointer', border: '2px dashed #D1D5DB' }}>
                  <FileText size={24} className="text-muted mb-3" />
                  <div className="text-secondary small mb-1">Upload Questions CSV</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Format: question, optionA, optionB, optionC, optionD, correct</div>
                </div>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold text-muted text-uppercase mb-2">Passing Score (%)</label>
                  <input type="text" className="form-control text-dark" defaultValue="70" />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold text-muted text-uppercase mb-2">Time Limit (Min)</label>
                  <input type="text" className="form-control text-dark" defaultValue="30" />
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <div className="fw-medium text-dark" style={{ fontSize: '0.875rem' }}>Shuffle Questions</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Randomise question order for each attempt</div>
                </div>
                <div className="form-check form-switch mb-0">
                  <input className="form-check-input" type="checkbox" role="switch" defaultChecked style={{ width: '2.5rem', height: '1.25rem', cursor: 'pointer' }} />
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <div className="fw-medium text-dark" style={{ fontSize: '0.875rem' }}>Allow Retakes</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Learner can re-attempt if they fail</div>
                </div>
                <div className="form-check form-switch mb-0">
                  <input className="form-check-input" type="checkbox" role="switch" style={{ width: '2.5rem', height: '1.25rem', cursor: 'pointer' }} />
                </div>
              </div>

            </div>
          )}
        </div>

        <div className="p-4 border-top d-flex justify-content-end gap-2 bg-white" style={{ borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}>
          <Button variant="secondary" type="button" onClick={onClose} className="btn btn-light text-dark">Cancel</Button>
          <Button type="button" onClick={onClose} className="btn btn-primary">Save Changes</Button>
        </div>

      </div>
    </div>
  );
};

export default EditCourseModal;
