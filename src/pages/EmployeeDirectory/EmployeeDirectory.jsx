import React, { useState, useEffect } from 'react';
import { 
  Download, Plus, Search, Users, CheckCircle, 
  Star, XCircle, MoreHorizontal, Eye, Edit,
  X, Check, ChevronRight, ArrowLeft
} from 'lucide-react';
import EmployeeDetails from '../../components/employees/EmployeeDetails';
import './EmployeeDirectory.css';
import Button from '../../components/common/Button';
import { employeeService } from '../../services';

const normalizeEmployee = (emp) => {
  const user = emp.user || {};
  const firstName = user.first_name || emp.first_name || '';
  const lastName = user.last_name || emp.last_name || '';
  const fullName = emp.name || `${firstName} ${lastName}`.trim() || 'Employee';
  const email = user.email || emp.email || emp.email_personal || '';
  const empId = emp.employee_id || emp.empId || `EMP${String(emp.id || '001').padStart(3, '0')}`;
  const role = emp.designation || user.role || emp.role || 'Staff';
  const dept = emp.department_name || emp.department || 'Engineering';
  const initials = (firstName ? `${firstName[0]}${lastName ? lastName[0] : ''}` : 'EM').toUpperCase();

  return {
    id: emp.id,
    empId,
    name: fullName,
    email,
    role,
    dept,
    status: emp.status || 'Active',
    statusColor: 'bg-green-subtle text-green',
    joinDate: emp.joining_date || emp.joinDate || '2023-01-15',
    tenure: emp.tenure || '1 year',
    attendance: emp.attendance || '95%',
    lms: emp.lms_progress || 85,
    lmsColor: 'bg-blue',
    avatarBg: 'bg-blue-light',
    avatarText: 'text-blue',
    initials
  };
};

const EmployeeDirectory = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalStep, setModalStep] = useState(2);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await employeeService.getEmployees();
        const rawList = Array.isArray(data) ? data : (data?.results && Array.isArray(data.results)) ? data.results : null;
        if (rawList && rawList.length > 0) {
          setEmployeeList(rawList.map(normalizeEmployee));
        }
      } catch (err) {
        console.error('API Error:', err);
      }
    };

    fetchEmployees();
  }, []);

  const employees = employeeList;

  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (selectedEmployee) {
    return <EmployeeDetails employee={selectedEmployee} onBack={() => setSelectedEmployee(null)} />;
  }

  return (
    <>
      <div className="emp-directory-container">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="page-title m-0">Employee List</h1>
            <p className="page-subtitle mt-1 mb-0 text-slate">{employees.length} employees across departments</p>
          </div>
          <div className="d-flex gap-2">
            <Button variant="secondary" className="btn btn-light bg-white border d-flex align-items-center fw-semibold text-dark shadow-sm">
              <Download size={16} className="me-2" /> Export
            </Button>
            <Button className="btn btn-primary bg-blue border-0 d-flex align-items-center fw-semibold text-white shadow-sm" onClick={() => setShowAddModal(true)}>
              <Plus size={16} className="me-2" /> Add Employee
            </Button>
          </div>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-12 col-md-6 col-xl-3">
            <div className="emp-kpi-card shadow-sm">
              <div className="emp-kpi-icon-box bg-blue-light text-blue">
                <Users size={24} />
              </div>
              <div className="emp-kpi-content">
                <div className="emp-kpi-value">{employees.length}</div>
                <div className="emp-kpi-label">Total</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <div className="emp-kpi-card shadow-sm">
              <div className="emp-kpi-icon-box bg-green-light text-green">
                <CheckCircle size={24} />
              </div>
              <div className="emp-kpi-content">
                <div className="emp-kpi-value text-green">{employees.filter(e => e.status === 'Active').length || employees.length}</div>
                <div className="emp-kpi-label">Active</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <div className="emp-kpi-card shadow-sm">
              <div className="emp-kpi-icon-box bg-yellow-light text-yellow">
                <Star size={24} />
              </div>
              <div className="emp-kpi-content">
                <div className="emp-kpi-value text-yellow">{employees.filter(e => e.status === 'On Probation').length}</div>
                <div className="emp-kpi-label">On Probation</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <div className="emp-kpi-card shadow-sm">
              <div className="emp-kpi-icon-box bg-red-light text-red">
                <XCircle size={24} />
              </div>
              <div className="emp-kpi-content">
                <div className="emp-kpi-value text-red">{employees.filter(e => e.status === 'On Notice').length}</div>
                <div className="emp-kpi-label">On Notice</div>
              </div>
            </div>
          </div>
        </div>

        <div className="emp-toolbar">
          <div className="emp-search-box">
            <Search size={18} className="icon" />
            <input type="text" className="emp-search-input bg-white" placeholder="Search by name, email or ID..." />
          </div>
          <div className="d-flex align-items-center gap-4">
            <div className="emp-filters">
              <select className="emp-filter-select">
                <option>All Departments</option>
                <option>Engineering</option>
                <option>HR</option>
                <option>Product</option>
              </select>
              <select className="emp-filter-select">
                <option>All Status</option>
                <option>Active</option>
                <option>On Probation</option>
              </select>
            </div>
            <div className="text-slate small">Showing {employees.length} employees</div>
          </div>
        </div>

        <div className="emp-table-container shadow-sm">
          <div className="emp-table-header">
            <span className="text-slate small fw-semibold">{employees.length} employees</span>
            <div className="emp-table-pills">
              <span className="emp-pill bg-green-light text-green">{employees.filter(e => e.status === 'Active').length || employees.length} Active</span>
              <span className="emp-pill bg-yellow-light text-yellow">{employees.filter(e => e.status === 'On Probation').length} Probation</span>
              <span className="emp-pill bg-red-light text-red">{employees.filter(e => e.status === 'On Notice').length} Notice</span>
            </div>
          </div>
          <div className="table-responsive">
            <table className="emp-table">
              <thead>
                <tr>
                  <th>EMPLOYEE</th>
                  <th>ROLE & DEPARTMENT</th>
                  <th>STATUS</th>
                  <th>JOINING DATE</th>
                  <th>ATTENDANCE</th>
                  <th>LMS PROGRESS</th>
                  <th width="50"></th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id} onClick={() => setSelectedEmployee(emp)} style={{cursor: 'pointer'}}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div className={`emp-cell-avatar ${emp.avatarBg} ${emp.avatarText}`}>
                          {emp.initials}
                        </div>
                        <div>
                          <div className="emp-name">{emp.name}</div>
                          <div className="emp-id-email">{emp.empId}<br/>{emp.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="emp-role">{emp.role}</div>
                      <div className="emp-dept">{emp.dept}</div>
                    </td>
                    <td>
                      <span className={`badge ${emp.statusColor} rounded-pill px-3 py-1 fw-bold`} style={{fontSize:'0.75rem'}}>
                        {emp.status}
                      </span>
                    </td>
                    <td>
                      <div className="emp-date">{emp.joinDate}</div>
                      <div className="emp-tenure">{emp.tenure}</div>
                    </td>
                    <td>
                      <div className="emp-stat-main text-green">{emp.attendance}</div>
                      <div className="emp-stat-sub">This Month</div>
                    </td>
                    <td>
                      <div className="lms-progress-wrapper">
                        <div className="lms-progress-bar">
                          <div className={`lms-progress-fill ${emp.lmsColor}`} style={{width: `${emp.lms}%`}}></div>
                        </div>
                        {emp.lms < 100 && <div className="lms-progress-text">{emp.lms}%</div>}
                      </div>
                    </td>
                    <td className="position-relative">
                      <Button variant="icon" 
                        className="btn btn-light rounded-circle p-2 border-0 bg-transparent text-slate"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenu(activeMenu === emp.id ? null : emp.id);
                        }}
                      >
                        <MoreHorizontal size={18} />
                      </Button>

                      {activeMenu === emp.id && (
                        <div className="dropdown-menu-custom show" style={{right: '30px', top: '40px'}} onClick={e => e.stopPropagation()}>
                          <div className="dropdown-item-custom" onClick={() => setSelectedEmployee(emp)}><Eye size={14} /> View Profile</div>
                          <div className="dropdown-item-custom" onClick={() => setSelectedEmployee(emp)}><Edit size={14} /> Edit Profile</div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {showAddModal && (
        <div className="ms-modal-overlay">
          <div className="ms-modal-content">

            <div className="ms-modal-header">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-blue-light text-blue p-2 rounded-lg d-flex align-items-center justify-content-center">
                    <Users size={20} />
                  </div>
                  <div>
                    <h3 className="m-0 fw-bold" style={{fontSize: '1.2rem', color: '#0f172a'}}>Create employee profile</h3>
                    <p className="m-0 text-slate mt-1" style={{fontSize: '0.85rem'}}>Add a new employee to the directory</p>
                  </div>
                </div>
                <Button variant="icon" className="btn btn-light rounded-circle p-2 border-0 bg-transparent" onClick={() => setShowAddModal(false)}>
                  <X size={20} className="text-slate" />
                </Button>
              </div>

              <div className="ms-stepper">
                <div className={`ms-step ${modalStep > 1 ? 'completed' : 'active'}`}>
                  <div className="ms-step-circle">
                    {modalStep > 1 ? <Check size={14} strokeWidth={3} /> : '1'}
                  </div>
                  <span className="ms-step-label">Personal Info</span>
                </div>
                <div className={`ms-step ${modalStep === 2 ? 'active' : modalStep > 2 ? 'completed' : ''}`}>
                  <div className="ms-step-circle">
                    {modalStep > 2 ? <Check size={14} strokeWidth={3} /> : '2'}
                  </div>
                  <span className="ms-step-label">Role & pay</span>
                </div>
                <div className={`ms-step ${modalStep === 3 ? 'active' : ''}`}>
                  <div className="ms-step-circle">3</div>
                  <span className="ms-step-label">Access</span>
                </div>
              </div>
            </div>

            <div className="ms-modal-body bg-white">

              {modalStep === 1 && (
                <div className="fade-in">
                  <div className="ms-section">
                    <h4 className="ms-section-title"><div className="ms-section-dot"></div> Basic Details</h4>
                    <div className="row g-3">
                      <div className="col-12 col-md-6 form-group">
                        <label className="form-label">First Name <span className="text-red">*</span></label>
                        <input type="text" className="form-control" placeholder="e.g. John" />
                      </div>
                      <div className="col-12 col-md-6 form-group">
                        <label className="form-label">Last Name <span className="text-red">*</span></label>
                        <input type="text" className="form-control" placeholder="e.g. Doe" />
                      </div>
                      <div className="col-12 col-md-6 form-group">
                        <label className="form-label">Email Address <span className="text-red">*</span></label>
                        <input type="email" className="form-control" placeholder="john.doe@company.com" />
                      </div>
                      <div className="col-12 col-md-6 form-group">
                        <label className="form-label">Phone Number <span className="text-red">*</span></label>
                        <input type="tel" className="form-control" placeholder="+91 98765 43210" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {modalStep === 2 && (
                <div className="fade-in">
                  <div className="ms-section">
                    <h4 className="ms-section-title"><div className="ms-section-dot"></div> Work Information</h4>
                    <div className="row g-3">
                      <div className="col-12 col-md-6 form-group">
                        <label className="form-label">Employee ID <span className="text-red">*</span></label>
                        <input type="text" className="form-control" defaultValue="EMP025" />
                      </div>
                      <div className="col-12 col-md-6 form-group">
                        <label className="form-label">Join date <span className="text-red">*</span></label>
                        <input type="date" className="form-control" />
                      </div>
                      <div className="col-12 col-md-6 form-group">
                        <label className="form-label">Department <span className="text-red">*</span></label>
                        <input type="text" className="form-control" defaultValue="Engineering" />
                      </div>
                      <div className="col-12 col-md-6 form-group">
                        <label className="form-label">Designation <span className="text-red">*</span></label>
                        <input type="text" className="form-control" placeholder="e.g. Software Engineer" />
                      </div>
                      <div className="col-12 col-md-6 form-group">
                        <label className="form-label">Employment type</label>
                        <select className="form-select">
                          <option>Full-time</option>
                          <option>Contract</option>
                          <option>Part-time</option>
                        </select>
                      </div>
                      <div className="col-12 col-md-6 form-group">
                        <label className="form-label">Reporting manager</label>
                        <input type="text" className="form-control" defaultValue="Ravi Kumar" />
                      </div>
                      <div className="col-12 col-md-6 form-group">
                        <label className="form-label">Probation Period</label>
                        <input type="text" className="form-control" defaultValue="3 Months" />
                      </div>
                      <div className="col-12 col-md-6 form-group">
                        <label className="form-label">Work location</label>
                        <input type="text" className="form-control" defaultValue="Hyderabad HQ" />
                      </div>
                    </div>
                  </div>

                  <div className="ms-section">
                    <h4 className="ms-section-title"><div className="ms-section-dot"></div> Compensation</h4>
                    <div className="row g-3">
                      <div className="col-12 col-md-6 form-group">
                        <label className="form-label">Annual CTC (₹)</label>
                        <input type="number" className="form-control" defaultValue="1200000" />
                        <div className="text-slate mt-1" style={{fontSize: '0.75rem'}}>Total cost to company per annum</div>
                      </div>
                      <div className="col-12 col-md-6 form-group">
                        <label className="form-label">Pay Frequency</label>
                        <select className="form-select">
                          <option>Monthly</option>
                          <option>Bi-weekly</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="ms-section">
                    <h4 className="ms-section-title"><div className="ms-section-dot"></div> Bank Details</h4>
                    <div className="row g-3">
                      <div className="col-12 col-md-6 form-group">
                        <label className="form-label">Account Name Holder <span className="text-red">*</span></label>
                        <input type="text" className="form-control" defaultValue="EMP025" />
                      </div>
                      <div className="col-12 col-md-6 form-group">
                        <label className="form-label">Bank Name <span className="text-red">*</span></label>
                        <input type="text" className="form-control" defaultValue="EMP025" />
                      </div>
                      <div className="col-12 col-md-6 form-group">
                        <label className="form-label">Account Number <span className="text-red">*</span></label>
                        <input type="text" className="form-control" defaultValue="XXXX XXXX 4321" />
                      </div>
                      <div className="col-12 col-md-6 form-group">
                        <label className="form-label">IFSC Code <span className="text-red">*</span></label>
                        <input type="text" className="form-control" defaultValue="HDFC0001234" />
                      </div>
                      <div className="col-12 form-group">
                        <label className="form-label">Branch Name</label>
                        <input type="text" className="form-control" defaultValue="Jubilee Hills, Hyderabad" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {modalStep === 3 && (
                <div className="fade-in">
                  <div className="ms-section">
                    <h4 className="ms-section-title"><div className="ms-section-dot"></div> System Access</h4>
                    <div className="row g-3">
                      <div className="col-12 form-group">
                        <label className="form-label">System Role <span className="text-red">*</span></label>
                        <select className="form-select">
                          <option>Employee</option>
                          <option>Manager</option>
                          <option>HR</option>
                          <option>Admin</option>
                        </select>
                      </div>
                      <div className="col-12 col-md-6 form-group">
                        <label className="form-label">Temporary Password <span className="text-red">*</span></label>
                        <input type="password" className="form-control" defaultValue="Password123!" />
                      </div>
                      <div className="col-12 col-md-6 form-group d-flex align-items-end">
                        <div className="form-check mb-2 pb-1">
                          <input className="form-check-input" type="checkbox" id="requireChange" defaultChecked />
                          <label className="form-check-label" htmlFor="requireChange">
                            Require password change on first login
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            <div className="ms-modal-footer">
              {modalStep > 1 ? (
                <Button variant="secondary" 
                  className="btn btn-light bg-white border fw-semibold d-flex align-items-center me-auto shadow-sm"
                  onClick={() => setModalStep(modalStep - 1)}
                >
                  <ArrowLeft size={16} className="me-2" /> Back
                </Button>
              ) : (
                <div className="me-auto"></div>
              )}

              <Button variant="secondary" 
                className="btn btn-light bg-white border fw-semibold shadow-sm"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>

              {modalStep < 3 ? (
                <Button 
                  className="btn btn-primary bg-blue border-0 d-flex align-items-center fw-semibold text-white shadow-sm"
                  onClick={() => setModalStep(modalStep + 1)}
                >
                  Next <ChevronRight size={16} className="ms-2" />
                </Button>
              ) : (
                <Button 
                  className="btn btn-primary bg-blue border-0 d-flex align-items-center fw-semibold text-white shadow-sm"
                  onClick={() => setShowAddModal(false)}
                >
                  Complete Setup
                </Button>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeDirectory;
