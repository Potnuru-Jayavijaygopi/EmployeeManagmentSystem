import { useState, useEffect } from 'react';

import Breadcrumb from '../../components/dashboard/Breadcrumb';
import Modal from '../../components/common/Modal';
import { Eye, Edit3, Clock, Plus, FileText, CheckCircle2, UserCheck } from 'lucide-react';
import './HROverview.css';
import Button from '../../components/common/Button';
import { employeeService } from '../../services';

const HROverview = ({ onTabChange, onNavigateHome }) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [showHistoryForm, setShowHistoryForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    const fetchHRData = async () => {
      try {
        const empData = await employeeService.getEmployees();
        const rawList = Array.isArray(empData) 
          ? empData 
          : Array.isArray(empData?.results) 
          ? empData.results 
          : Array.isArray(empData?.data) 
          ? empData.data 
          : [];
        setEmployees(rawList);
      } catch (err) {
        setEmployees([]);
      }
    };
    fetchHRData();
  }, []);

  const currentEmp = employees.length > 0 ? employees[selectedIndex] : null;
  const displayName = currentEmp
    ? (currentEmp.user?.first_name 
        ? `${currentEmp.user.first_name} ${currentEmp.user.last_name || ""}`.trim() 
        : currentEmp.user?.email || "Employee")
    : "No Employee Found";
  const initials = displayName ? displayName.substring(0, 2).toUpperCase() : "EM";

  return (
    <>
      <div className="hr-overview-container">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <Breadcrumb items={['Dashboard', 'HR Overview']} />
            <h1 className="page-title m-0">HR Overview</h1>
            <p className="text-muted small m-0 mt-1">Employee directory, documents, onboarding & history</p>
          </div>
          <div className="d-flex gap-2">
            {employees.length > 1 && (
              <select 
                className="form-select form-select-sm border-secondary-subtle"
                value={selectedIndex}
                onChange={(e) => setSelectedIndex(Number(e.target.value))}
                style={{ width: '220px' }}
              >
                {employees.map((emp, idx) => (
                  <option key={emp.id || idx} value={idx}>
                    {emp.user?.first_name ? `${emp.user.first_name} ${emp.user.last_name || ""}` : emp.user?.email || `Employee #${idx + 1}`} ({emp.employee_id || `EMP00${idx + 1}`})
                  </option>
                ))}
              </select>
            )}
            <Button className="btn btn-primary bg-blue border-0 px-4 py-2 fw-semibold d-flex align-items-center shadow-sm">
              <Plus size={18} className="me-2" /> Upload Documents
            </Button>
          </div>
        </div>

        {currentEmp ? (
          <>
            <div className="bg-white rounded border p-4 shadow-sm mb-4 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="avatar-lg rounded-circle bg-blue text-white d-flex justify-content-center align-items-center me-4" style={{ width: 70, height: 70, fontSize: '1.8rem', fontWeight: 'bold' }}>
                  {initials}
                </div>
                <div>
                  <h3 className="m-0 fw-bold text-dark mb-1">{displayName}</h3>
                  <p className="m-0 text-muted small mb-2">{currentEmp.designation || "Software Engineer"} &middot; {currentEmp.department || "Engineering"}</p>
                  <div className="d-flex gap-2">
                    <span className="badge rounded-pill bg-success-light text-success border border-success fw-medium px-3 py-1 d-inline-flex align-items-center gap-1">
                      <div className="status-dot bg-success"></div> Active
                    </span>
                    <span className="badge rounded-pill bg-blue-light text-blue fw-medium px-3 py-1">
                      {currentEmp.department || "Engineering"}
                    </span>
                    <span className="badge rounded-pill bg-light text-secondary border fw-medium px-3 py-1">
                      {currentEmp.employee_id || "EMP001"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-12 col-md-4">
                <div className="bg-white rounded border p-3">
                  <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>EMPLOYEE ID</div>
                  <div className="fw-semibold text-dark small">{currentEmp.employee_id || "EMP001"}</div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="bg-white rounded border p-3">
                  <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>DEPARTMENT</div>
                  <div className="fw-semibold text-dark small">{currentEmp.department || "Engineering"}</div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="bg-white rounded border p-3">
                  <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>DESIGNATION</div>
                  <div className="fw-semibold text-dark small">{currentEmp.designation || "Software Engineer"}</div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="bg-white rounded border p-3">
                  <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>JOINING DATE</div>
                  <div className="fw-semibold text-dark small">{currentEmp.joining_date || currentEmp.date_of_joining || "N/A"}</div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="bg-white rounded border p-3">
                  <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>DATE OF BIRTH</div>
                  <div className="fw-semibold text-dark small">{currentEmp.date_of_birth || "1995-12-10"}</div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="bg-white rounded border p-3">
                  <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>WORK EMAIL</div>
                  <div className="fw-semibold text-dark small">{currentEmp.user?.email || currentEmp.email || "N/A"}</div>
                </div>
              </div>
            </div>

            <div className="d-flex gap-3 mb-4">
              <Button className="btn btn-primary bg-blue border-0 px-4 py-2 fw-semibold d-flex align-items-center shadow-sm" onClick={() => setIsProfileModalOpen(true)}>
                <Eye size={16} className="me-2" /> View Profile
              </Button>
              <Button variant="secondary" className="btn btn-white border px-4 py-2 fw-semibold text-dark d-flex align-items-center shadow-sm" onClick={() => setIsProfileModalOpen(true)}>
                <Edit3 size={16} className="me-2 text-muted" /> Edit Profile
              </Button>
              <Button className="btn btn-blue-light border-blue text-blue px-4 py-2 fw-semibold d-flex align-items-center shadow-sm" onClick={() => setIsHistoryModalOpen(true)}>
                <Clock size={16} className="me-2" /> Employment History
              </Button>
            </div>

            <div className="bg-white rounded border p-4 shadow-sm mb-4">
              <h6 className="fw-bold text-dark mb-4">Contact Information</h6>
              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <div className="bg-light rounded border p-3">
                    <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>PERSONAL EMAIL</div>
                    <div className="fw-semibold text-dark small">{currentEmp.email_personal || currentEmp.user?.email || "N/A"}</div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="bg-light rounded border p-3">
                    <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>PRIMARY PHONE</div>
                    <div className="fw-semibold text-dark small">{currentEmp.phone_primary || currentEmp.phone || "N/A"}</div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="bg-light rounded border p-3">
                    <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>CURRENT ADDRESS</div>
                    <div className="fw-semibold text-dark small text-truncate">{currentEmp.current_address || "Hyderabad, Telangana"}</div>
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
                    <div className="fw-semibold text-dark small">{currentEmp.emergency_contact_name || "N/A"}</div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="bg-light rounded border p-3">
                    <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>CONTACT PHONE</div>
                    <div className="fw-semibold text-dark small">{currentEmp.emergency_contact_phone || "N/A"}</div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="bg-light rounded border p-3">
                    <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>RELATION</div>
                    <div className="fw-semibold text-dark small">{currentEmp.emergency_contact_relation || "N/A"}</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded border p-5 text-center text-muted shadow-sm mb-4">
            No employee records found in database.
          </div>
        )}

        {/* Profile Modal */}
        <Modal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          title={<h5 className="m-0 fw-bold text-dark">Employee Profile</h5>}
          maxWidth="700px"
          footer={
            <div className="d-flex w-100 gap-3 pt-2">
              <Button variant="secondary" className="btn btn-white border bg-light fw-semibold flex-grow-1 py-2 text-muted" onClick={() => setIsProfileModalOpen(false)}>Close</Button>
            </div>
          }
        >
          {currentEmp && (
            <div className="profile-modal-content pe-2" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              <div className="mb-4">
                <span className="small fw-bold text-muted text-uppercase tracking-wide d-block mb-3" style={{ fontSize: '0.7rem' }}>IDENTITY (READ-ONLY)</span>
                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>USER ID</label>
                    <input type="text" className="form-control form-control-sm py-2" value={currentEmp.user?.id || currentEmp.id || 1} readOnly />
                  </div>
                  <div className="col-6">
                    <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>EMPLOYEE ID</label>
                    <input type="text" className="form-control form-control-sm py-2" value={currentEmp.employee_id || "EMP001"} readOnly />
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-6">
                    <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>DESIGNATION</label>
                    <input type="text" className="form-control form-control-sm py-2" value={currentEmp.designation || "Software Engineer"} readOnly />
                  </div>
                  <div className="col-6">
                    <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>DEPARTMENT</label>
                    <input type="text" className="form-control form-control-sm py-2" value={currentEmp.department || "Engineering"} readOnly />
                  </div>
                </div>
              </div>

              <div className="mb-4 border-top pt-4">
                <span className="small fw-bold text-muted text-uppercase tracking-wide d-block mb-3" style={{ fontSize: '0.7rem' }}>PERSONAL DETAILS</span>
                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>FIRST NAME</label>
                    <input type="text" className="form-control form-control-sm py-2" value={currentEmp.user?.first_name || "N/A"} readOnly />
                  </div>
                  <div className="col-6">
                    <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>LAST NAME</label>
                    <input type="text" className="form-control form-control-sm py-2" value={currentEmp.user?.last_name || "N/A"} readOnly />
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-6">
                    <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>PRIMARY PHONE</label>
                    <input type="text" className="form-control form-control-sm py-2" value={currentEmp.phone_primary || "N/A"} readOnly />
                  </div>
                  <div className="col-6">
                    <label className="form-label small text-muted mb-1" style={{ fontSize: '0.75rem' }}>JOINING DATE</label>
                    <input type="text" className="form-control form-control-sm py-2" value={currentEmp.joining_date || "N/A"} readOnly />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* History Modal */}
        <Modal
          isOpen={isHistoryModalOpen}
          onClose={() => setIsHistoryModalOpen(false)}
          title={
            <div className="d-flex align-items-center gap-2">
              <h5 className="m-0 fw-bold text-dark">Employment History for</h5>
              <span className="badge rounded-pill bg-light text-secondary border fw-medium px-2 py-1" style={{ fontSize: '0.75rem' }}>{currentEmp?.employee_id || "EMP001"}</span>
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
            {historyList.length > 0 ? (
              <div className="history-list">
                {historyList.map((item, idx) => (
                  <div key={idx} className="border-bottom pb-4 mb-4">
                    <h6 className="m-0 fw-bold text-dark">{item.company_name}</h6>
                    <p className="text-muted small m-0">{item.designation} &middot; {item.start_date} to {item.end_date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-4 text-center text-muted small">
                No previous employment history recorded in database.
              </div>
            )}
          </div>
        </Modal>

      </div>
    </>
  );
};

export default HROverview;
