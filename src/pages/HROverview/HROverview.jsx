import { useState } from 'react';

import Breadcrumb from '../../components/dashboard/Breadcrumb';
import Modal from '../../components/common/Modal';
import { Eye, Edit3, Clock, Plus, FileText, CheckCircle2 } from 'lucide-react';
import './HROverview.css';
import Button from '../../components/common/Button';

const HROverview = ({ onTabChange, onNavigateHome }) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [showHistoryForm, setShowHistoryForm] = useState(true);

  return (
    <>
      <div className="hr-overview-container">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <Breadcrumb items={['Dashboard', 'HR Overview']} />
            <h1 className="page-title m-0">HR Overview</h1>
            <p className="text-muted small m-0 mt-1">Employee directory, documents, onboarding & history</p>
          </div>
          <Button className="btn btn-primary bg-blue border-0 px-4 py-2 fw-semibold d-flex align-items-center shadow-sm">
            <Plus size={18} className="me-2" /> Upload Documents
          </Button>
        </div>

        <div className="bg-white rounded border p-4 shadow-sm mb-4 d-flex align-items-center">
          <div className="avatar-lg rounded-circle bg-blue text-white d-flex justify-content-center align-items-center me-4" style={{ width: 70, height: 70, fontSize: '2rem', fontWeight: 'bold' }}>
            S
          </div>
          <div>
            <h3 className="m-0 fw-bold text-dark mb-1">Sri Vishnu</h3>
            <p className="m-0 text-muted small mb-2">Software Engineer &middot; Engineering</p>
            <div className="d-flex gap-2">
              <span className="badge rounded-pill bg-success-light text-success border border-success fw-medium px-3 py-1 d-inline-flex align-items-center gap-1">
                <div className="status-dot bg-success"></div> Active
              </span>
              <span className="badge rounded-pill bg-blue-light text-blue fw-medium px-3 py-1">
                Engineering
              </span>
              <span className="badge rounded-pill bg-light text-secondary border fw-medium px-3 py-1">
                EMP003
              </span>
            </div>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-12 col-md-4">
            <div className="bg-white rounded border p-3">
              <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>EMPLOYEE ID</div>
              <div className="fw-semibold text-dark small">EMP003</div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="bg-white rounded border p-3">
              <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>DEPARTMENT</div>
              <div className="fw-semibold text-dark small">Engineering</div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="bg-white rounded border p-3">
              <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>DESIGNATION</div>
              <div className="fw-semibold text-dark small">Software Engineer</div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="bg-white rounded border p-3">
              <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>JOINING DATE</div>
              <div className="fw-semibold text-dark small">04/11/2025</div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="bg-white rounded border p-3">
              <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>DATE OF BIRTH</div>
              <div className="fw-semibold text-dark small">10/12/1995</div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="bg-white rounded border p-3">
              <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>WORK EMAIL</div>
              <div className="fw-semibold text-dark small">sri.vishnu@example.com</div>
            </div>
          </div>
        </div>

        <div className="d-flex gap-3 mb-4">
          <Button className="btn btn-primary bg-blue border-0 px-4 py-2 fw-semibold d-flex align-items-center shadow-sm" onClick={() => setIsProfileModalOpen(true)}>
            <Eye size={16} className="me-2" /> View
          </Button>
          <Button variant="secondary" className="btn btn-white border px-4 py-2 fw-semibold text-dark d-flex align-items-center shadow-sm" onClick={() => setIsProfileModalOpen(true)}>
            <Edit3 size={16} className="me-2 text-muted" /> Edit
          </Button>
          <Button className="btn btn-blue-light border-blue text-blue px-4 py-2 fw-semibold d-flex align-items-center shadow-sm" onClick={() => setIsHistoryModalOpen(true)}>
            <Clock size={16} className="me-2" /> History
          </Button>
        </div>

        <div className="bg-white rounded border p-4 shadow-sm mb-4">
          <h6 className="fw-bold text-dark mb-4">Contact Information</h6>
          <div className="row g-3">
            <div className="col-12 col-md-4">
              <div className="bg-light rounded border p-3">
                <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>PERSONAL EMAIL</div>
                <div className="fw-semibold text-dark small">Sri.vish231e@example.com</div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="bg-light rounded border p-3">
                <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>PRIMARY PHONE</div>
                <div className="fw-semibold text-dark small">+919876543230</div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="bg-light rounded border p-3">
                <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>CURRENT ADDRESS</div>
                <div className="fw-semibold text-dark small text-truncate">456 MG Road, Hyderabad, Telangana - 560001</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded border p-4 shadow-sm mb-4">
          <h6 className="fw-bold text-dark mb-4">Emergency Contact</h6>
          <div className="row g-3">
            <div className="col-12 col-md-4">
              <div className="bg-light rounded border p-3">
                <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>CONTACT NAME</div>
                <div className="fw-semibold text-dark small">Durga</div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="bg-light rounded border p-3">
                <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>CONTACT PHONE</div>
                <div className="fw-semibold text-dark small">+919876543231</div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="bg-light rounded border p-3">
                <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>RELATION</div>
                <div className="fw-semibold text-dark small">Mother</div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          title={<h5 className="m-0 fw-bold text-dark">Employee Profile</h5>}
          maxWidth="700px"
          footer={
            <div className="d-flex w-100 gap-3 pt-2">
              <Button variant="secondary" className="btn btn-white border bg-light fw-semibold flex-grow-1 py-2 text-muted" onClick={() => setIsProfileModalOpen(false)}>Close</Button>
              <Button className="btn btn-primary bg-blue border-0 fw-semibold flex-grow-1 py-2" onClick={() => setIsProfileModalOpen(false)}>Edit Profile</Button>
            </div>
          }
        >
          <div className="profile-modal-content pe-2" style={{ maxHeight: '60vh', overflowY: 'auto' }}>

            <div className="mb-4">
              <span className="small fw-bold text-muted text-uppercase tracking-wide d-block mb-3" style={{ fontSize: '0.7rem' }}>IDENTITY (READ-ONLY)</span>
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>USER ID</label>
                  <input type="text" className="form-control form-control-sm py-2" value="6" readOnly />
                </div>
                <div className="col-6">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>EMPLOYEE ID</label>
                  <input type="text" className="form-control form-control-sm py-2" value="EMP003" readOnly />
                </div>
              </div>
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>DESIGNATION</label>
                  <input type="text" className="form-control form-control-sm py-2" value="Software Engineer" readOnly />
                </div>
                <div className="col-6">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>DEPARTMENT</label>
                  <input type="text" className="form-control form-control-sm py-2" value="Engineering" readOnly />
                </div>
              </div>
            </div>

            <div className="mb-4 border-top pt-4">
              <span className="small fw-bold text-muted text-uppercase tracking-wide d-block mb-3" style={{ fontSize: '0.7rem' }}>PERSONAL DETAILS</span>
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>FIRST NAME</label>
                  <input type="text" className="form-control form-control-sm py-2" value="Sri" readOnly />
                </div>
                <div className="col-6">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>LAST NAME</label>
                  <input type="text" className="form-control form-control-sm py-2" value="Vishnu" readOnly />
                </div>
              </div>
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>GENDER</label>
                  <input type="text" className="form-control form-control-sm py-2" value="Male" readOnly />
                </div>
                <div className="col-6">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>MARITAL STATUS</label>
                  <input type="text" className="form-control form-control-sm py-2" value="Married" readOnly />
                </div>
              </div>
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>PRIMARY PHONE</label>
                  <input type="text" className="form-control form-control-sm py-2" value="+919876543230" readOnly />
                </div>
                <div className="col-6">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>DATE OF BIRTH</label>
                  <input type="date" className="form-control form-control-sm py-2" value="1995-12-10" readOnly />
                </div>
              </div>
            </div>

            <div className="mb-4 border-top pt-4">
              <span className="small fw-bold text-muted text-uppercase tracking-wide d-block mb-3" style={{ fontSize: '0.7rem' }}>BANK DETAILS</span>
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>Account Name Holder <span className="text-danger">*</span></label>
                  <input type="text" className="form-control form-control-sm py-2" value="EMP025" readOnly />
                </div>
                <div className="col-6">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>Bank Name <span className="text-danger">*</span></label>
                  <input type="text" className="form-control form-control-sm py-2" value="EMP025" readOnly />
                </div>
              </div>
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>Account Number <span className="text-danger">*</span></label>
                  <input type="text" className="form-control form-control-sm py-2" value="XXXX XXXX 4321" readOnly />
                </div>
                <div className="col-6">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>IFSC Code <span className="text-danger">*</span></label>
                  <input type="text" className="form-control form-control-sm py-2" value="HDFC0001234" readOnly />
                </div>
              </div>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>Branch Name</label>
                  <input type="text" className="form-control form-control-sm py-2" value="Jubilee Hills, Hyderabad" readOnly />
                </div>
              </div>
            </div>

            <div className="mb-4 border-top pt-4">
              <span className="small fw-bold text-muted text-uppercase tracking-wide d-block mb-3" style={{ fontSize: '0.7rem' }}>CONTACT INFORMATION</span>
              <div className="border rounded p-3 bg-light">
                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>PERSONAL EMAIL</div>
                    <div className="fw-semibold text-dark small">Sri.vish231e@example.com</div>
                  </div>
                  <div className="col-6">
                    <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>PRIMARY PHONE</div>
                    <div className="fw-semibold text-dark small">+919876543230</div>
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-12">
                    <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>CURRENT ADDRESS</div>
                    <div className="fw-semibold text-dark small">456 MG Road, Hyderabad, Telangana - 560001</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4 border-top pt-4">
              <span className="small fw-bold text-muted text-uppercase tracking-wide d-block mb-3" style={{ fontSize: '0.7rem' }}>EMERGENCY CONTACT</span>
              <div className="row g-3">
                <div className="col-4">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>NAME</label>
                  <input type="text" className="form-control form-control-sm py-2" value="Durga" readOnly />
                </div>
                <div className="col-4">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>PHONE NO.</label>
                  <input type="text" className="form-control form-control-sm py-2" value="+919876543231" readOnly />
                </div>
                <div className="col-4">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>RELATION</label>
                  <input type="text" className="form-control form-control-sm py-2" value="Mother" readOnly />
                </div>
              </div>
            </div>

            <div className="mb-4 border-top pt-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="small fw-bold text-muted text-uppercase tracking-wide" style={{ fontSize: '0.7rem' }}>DOCUMENTS</span>
                <span className="small fw-medium text-blue d-flex align-items-center"><CheckCircle2 size={14} className="me-1" /> Verified</span>
              </div>
              <div className="d-flex align-items-start border rounded p-3 bg-light">
                <div className="bg-danger-light text-danger p-2 rounded d-flex justify-content-center align-items-center me-3">
                  <FileText size={20} />
                </div>
                <div>
                  <h6 className="m-0 fw-bold text-dark small mb-1">AADHAAR</h6>
                  <p className="m-0 text-muted small text-truncate" style={{ fontSize: '0.7rem', maxWidth: '400px' }}>C:\folder\media\employee_documents Employee_login_pannel.pdf</p>
                  <p className="m-0 text-muted small mt-1" style={{ fontSize: '0.65rem' }}>Uploaded: 2025-11-11 15:52:20</p>
                  <Button variant="secondary" className="btn btn-sm btn-white border px-3 mt-2 text-dark" style={{ fontSize: '0.75rem' }}>View</Button>
                </div>
              </div>
            </div>

          </div>
        </Modal>

        <Modal
          isOpen={isHistoryModalOpen}
          onClose={() => setIsHistoryModalOpen(false)}
          title={
            <div className="d-flex align-items-center gap-2">
              <h5 className="m-0 fw-bold text-dark">Employment History for</h5>
              <span className="badge rounded-pill bg-light text-secondary border fw-medium px-2 py-1" style={{ fontSize: '0.75rem' }}>EMP003</span>
            </div>
          }
          maxWidth="700px"
          footer={
            <div className="d-flex w-100 gap-3 pt-2">
              <Button variant="secondary" className="btn btn-white border bg-light fw-semibold flex-grow-1 py-2 text-muted" onClick={() => setIsHistoryModalOpen(false)}>Close</Button>
            </div>
          }
        >
          <div className="history-modal-content pe-2" style={{ maxHeight: '60vh', overflowY: 'auto' }}>

            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
              <span className="small text-muted">Add a previous employment record</span>
              <Button className="btn btn-primary bg-blue border-0 px-3 py-1 fw-medium text-white d-flex align-items-center rounded-pill" onClick={() => setShowHistoryForm(true)}>
                <Plus size={16} className="me-1" /> Add
              </Button>
            </div>

            {showHistoryForm && (
              <div className="mb-5">
                <span className="small fw-bold text-blue text-uppercase tracking-wide d-block mb-3" style={{ fontSize: '0.7rem' }}>NEW ENTRY</span>

                <div className="row g-3 mb-3">
                  <div className="col-4">
                    <label className="form-label small text-muted mb-1 text-uppercase tracking-wide" style={{ fontSize: '0.7rem' }}>COMPANY</label>
                    <input type="text" className="form-control form-control-sm py-2" placeholder="Company name" />
                  </div>
                  <div className="col-4">
                    <label className="form-label small text-muted mb-1 text-uppercase tracking-wide" style={{ fontSize: '0.7rem' }}>DESIGNATION</label>
                    <input type="text" className="form-control form-control-sm py-2" placeholder="Your role" />
                  </div>
                  <div className="col-4">
                    <label className="form-label small text-muted mb-1 text-uppercase tracking-wide" style={{ fontSize: '0.7rem' }}>START DATE</label>
                    <input type="date" className="form-control form-control-sm py-2" />
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-4">
                    <label className="form-label small text-muted mb-1 text-uppercase tracking-wide" style={{ fontSize: '0.7rem' }}>END DATE</label>
                    <input type="date" className="form-control form-control-sm py-2" />
                  </div>
                  <div className="col-8">
                    <label className="form-label small text-muted mb-1 text-uppercase tracking-wide" style={{ fontSize: '0.7rem' }}>JOB DESCRIPTION</label>
                    <input type="text" className="form-control form-control-sm py-2" placeholder="Brief description.." />
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <Button variant="secondary" className="btn btn-white border px-4 py-1 fw-medium text-muted rounded-pill" onClick={() => setShowHistoryForm(false)}>Cancel</Button>
                  <Button className="btn btn-primary bg-blue border-0 px-4 py-1 fw-medium text-white rounded-pill" onClick={() => setShowHistoryForm(false)}>Add</Button>
                </div>
              </div>
            )}

            <div className="history-list">
              <div className="border-bottom pb-4 mb-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="m-0 fw-bold text-dark d-inline-block me-2">Digital Innovations Inc</h6>
                    <span className="text-muted d-inline-block">&mdash; Software Developer</span>
                  </div>
                  <div className="d-flex gap-2">
                    <Button variant="secondary" className="btn btn-sm btn-white border px-3 text-dark" style={{ fontSize: '0.75rem' }}>Edit</Button>
                    <Button variant="secondary" className="btn btn-sm btn-white border px-3 text-dark" style={{ fontSize: '0.75rem' }}>Delete</Button>
                  </div>
                </div>
                <div className="text-muted small mb-3" style={{ fontSize: '0.75rem' }}>2022-07-01 to 2024-10-31</div>
                <p className="m-0 text-muted small" style={{ fontSize: '0.8rem' }}>Full-stack development with Python and JavaScript. Led team of 3 developers.</p>
              </div>

              <div className="pb-2">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="m-0 fw-bold text-dark d-inline-block me-2">Tech Solutions Pvt Ltd</h6>
                    <span className="text-muted d-inline-block">&mdash; Junior Developer</span>
                  </div>
                  <div className="d-flex gap-2">
                    <Button variant="secondary" className="btn btn-sm btn-white border px-3 text-dark" style={{ fontSize: '0.75rem' }}>Edit</Button>
                    <Button variant="secondary" className="btn btn-sm btn-white border px-3 text-dark" style={{ fontSize: '0.75rem' }}>Delete</Button>
                  </div>
                </div>
                <div className="text-muted small mb-3" style={{ fontSize: '0.75rem' }}>2020-06-01 to 2022-05-31</div>
                <p className="m-0 text-muted small" style={{ fontSize: '0.8rem' }}>Developed web applications using Django and React. Worked on e-commerce platform.</p>
              </div>
            </div>

          </div>
        </Modal>

      </div>
    </>
  );
};

export default HROverview;
