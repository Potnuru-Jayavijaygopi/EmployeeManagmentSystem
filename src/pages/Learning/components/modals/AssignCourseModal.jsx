import React, { useState } from 'react';
import { X, Users, Building2, User, Globe, Search, Calendar, CheckCircle } from 'lucide-react';
import Button from '../../../../components/common/Button';

const mockEmployees = [
  { id: 1, name: 'Riya Nair', initials: 'RN', color: '#14B8A6' },
  { id: 2, name: 'Arjun Kumar', initials: 'AK', color: '#E11D48' },
  { id: 3, name: 'Sneha Patel', initials: 'SP', color: '#3B82F6' },
  { id: 4, name: 'Kiran Rao', initials: 'KR', color: '#10B981' }
];

const AssignCourseModal = ({ isOpen, onClose }) => {
  const [assignType, setAssignType] = useState('project'); 

  if (!isOpen) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center lms-overlay">
      <div className="bg-white rounded-4 shadow-lg d-flex flex-column lms-modal-container">

        <div className="p-4 pb-3 d-flex justify-content-between align-items-center border-bottom">
          <div className="d-flex align-items-center gap-2">
            <Users size={18} className="text-primary" />
            <h5 className="mb-0 fw-bold lms-text-md">Assign Course</h5>
          </div>
          <Button variant="icon" onClick={onClose} className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center border-0 text-muted">
            <X size={20} />
          </Button>
        </div>

        <div className="p-4 flex-grow-1 overflow-auto">

          <div className="mb-4">
            <label className="form-label small fw-medium text-dark mb-3">Choose who should be assigned this course:</label>
            <div className="row g-3">
              <div className="col-4">
                <div 
                  className={`border rounded-4 p-3 d-flex flex-column align-items-center justify-content-center text-center h-100 lms-cursor-pointer ${assignType === 'project' ? 'border-primary bg-primary bg-opacity-10' : 'border-secondary-subtle'}`}
                  onClick={() => setAssignType('project')}
                >
                  <Building2 size={24} className={`mb-2 ${assignType === 'project' ? 'text-primary' : 'text-muted'}`} />
                  <div className={`fw-bold small ${assignType === 'project' ? 'text-primary' : 'text-dark'}`}>Project Team</div>
                  <div className="text-muted lms-text-xs">Assign to a specific team</div>
                </div>
              </div>
              <div className="col-4">
                <div 
                  className={`border rounded-4 p-3 d-flex flex-column align-items-center justify-content-center text-center h-100 lms-cursor-pointer ${assignType === 'specific' ? 'border-primary bg-primary bg-opacity-10' : 'border-secondary-subtle'}`}
                  onClick={() => setAssignType('specific')}
                >
                  <User size={24} className={`mb-2 ${assignType === 'specific' ? 'text-primary' : 'text-muted'}`} />
                  <div className={`fw-bold small ${assignType === 'specific' ? 'text-primary' : 'text-dark'}`}>Specific Employee</div>
                  <div className="text-muted lms-text-xs">Pick employees manually</div>
                </div>
              </div>
              <div className="col-4">
                <div 
                  className={`border rounded-4 p-3 d-flex flex-column align-items-center justify-content-center text-center h-100 lms-cursor-pointer ${assignType === 'entire' ? 'border-primary bg-primary bg-opacity-10' : 'border-secondary-subtle'}`}
                  onClick={() => setAssignType('entire')}
                >
                  <Globe size={24} className={`mb-2 ${assignType === 'entire' ? 'text-primary' : 'text-muted'}`} />
                  <div className={`fw-bold small ${assignType === 'entire' ? 'text-primary' : 'text-dark'}`}>Entire Company</div>
                  <div className="text-muted lms-text-xs">Assign to all employees</div>
                </div>
              </div>
            </div>
          </div>

          {assignType === 'project' && (
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted text-uppercase mb-2 lms-font-xs lms-tracking-wide">Select Team</label>
              <select className="form-select text-dark shadow-none lms-radius-md">
                <option>— Choose a team —</option>
              </select>
            </div>
          )}

          {assignType === 'specific' && (
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted text-uppercase mb-2 lms-font-xs lms-tracking-wide">Search Employees</label>
              <div className="position-relative mb-3">
                <Search className="position-absolute top-50 translate-middle-y text-muted ms-3" size={16} />
                <input 
                  type="text" 
                  className="form-control ps-5 text-dark shadow-none lms-radius-md" 
                  placeholder="Search by name or role..." 
                />
              </div>

              <div className="border rounded-4 overflow-hidden mb-3 lms-max-h-200">
                {mockEmployees.map((emp, idx) => (
                  <div key={emp.id} className={`p-2 px-3 d-flex justify-content-between align-items-center bg-white ${idx !== mockEmployees.length - 1 ? 'border-bottom' : ''}`}>
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold small lms-emp-initials" style={{ backgroundColor: emp.color }}>
                        {emp.initials}
                      </div>
                      <span className="fw-medium text-dark small">{emp.name}</span>
                    </div>
                    <Button variant="secondary" className="btn btn-sm btn-light border px-2 py-1 rounded fw-medium text-muted d-flex align-items-center gap-1 lms-text-xs bg-light">
                      <User size={12} /> Add
                    </Button>
                  </div>
                ))}
              </div>

              <label className="form-label small fw-bold text-muted text-uppercase mb-2 lms-font-xs lms-tracking-wide">Selected Employees</label>
              <div className="border rounded-4 p-3 bg-light lms-min-h-60"></div>
            </div>
          )}

          {assignType === 'entire' && (
            <div className="mb-4 border border-success rounded-4 p-3 bg-success bg-opacity-10 d-flex gap-3 align-items-start">
              <CheckCircle className="text-success mt-1" size={20} />
              <div>
                <div className="fw-bold text-success lms-text-sm">Assign to All Employees</div>
                <div className="text-success lms-text-xs">This course will be assigned to every active employee in the company.</div>
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="form-label small fw-bold text-muted text-uppercase mb-2 lms-font-xs lms-tracking-wide">Due Date</label>
            <div className="position-relative">
              <input type="text" className="form-control text-dark pe-5 lms-radius-md" placeholder="dd-mm-yyyy" />
              <Calendar className="position-absolute top-50 translate-middle-y end-0 me-3 text-muted" size={16} />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <div className="fw-medium text-dark small text-uppercase fw-bold lms-font-xs lms-tracking-wide">Send Notification</div>
              <div className="text-dark fw-medium small">Notify employees via email</div>
            </div>
            <div className="form-check form-switch mb-0">
              <input className="form-check-input lms-cursor-pointer" type="checkbox" role="switch" defaultChecked />
            </div>
          </div>

        </div>

        <div className="p-4 border-top d-flex justify-content-end gap-2 bg-white lms-radius-bottom">
          <Button variant="ghost" type="button" onClick={onClose} className="btn-system btn-system-size-default btn-system-ghost bg-light text-dark">Cancel</Button>
          <Button type="button" onClick={onClose} className="btn-system btn-system-size-default btn-system-primary d-flex align-items-center gap-2">
            <CheckCircle size={16} /> Confirm Assignment
          </Button>
        </div>

      </div>
    </div>
  );
};

export default AssignCourseModal;
