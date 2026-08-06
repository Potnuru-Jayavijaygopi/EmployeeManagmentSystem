import React from 'react';
import { Users, Search, X } from 'lucide-react';
import Button from '../../../../components/common/Button';

const mockEmployees = [
  { id: 1, name: 'Riya Nair', initials: 'RN', color: '#14B8A6' },
  { id: 2, name: 'Arjun Kumar', initials: 'AK', color: '#E11D48' },
  { id: 3, name: 'Sneha Patel', initials: 'SP', color: '#3B82F6' },
  { id: 4, name: 'Kiran Rao', initials: 'KR', color: '#10B981' },
  { id: 5, name: 'Priya Mehta', initials: 'PM', color: '#8B5CF6' },
  { id: 6, name: 'Devraj Singh', initials: 'DS', color: '#3B82F6' },
  { id: 7, name: 'Meena HR', initials: 'MH', color: '#3B82F6' }
];

const selectedUsers = [
  { id: 1, name: 'Riya Nair', initials: 'RN', color: '#8B5CF6' },
  { id: 2, name: 'Arjun Kumar', initials: 'AK', color: '#0EA5E9' },
  { id: 3, name: 'Sneha P', initials: 'SP', color: '#10B981' },
  { id: 4, name: 'Kiran Rao', initials: 'KR', color: '#EF4444' }
];

const Step3Assign = ({ onNext, onPrev }) => {
  return (
    <div>
      <div className="d-flex align-items-center gap-2 mb-4">
        <Users size={18} className="text-primary" />
        <h6 className="mb-0 fw-bold text-dark lms-font-md">Assign Users</h6>
      </div>

      <div className="mb-4">
        <label className="form-label small fw-bold text-muted text-uppercase mb-2 lms-font-xs lms-tracking-wide">Search & Select Employees</label>
        <div className="position-relative">
          <Search className="position-absolute top-50 translate-middle-y text-muted ms-3" size={16} />
          <input 
            type="text" 
            className="form-control ps-5 text-dark border-secondary-subtle shadow-none lms-radius-md"
            placeholder="Search employees by name, team, role..." 
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label small fw-bold text-muted text-uppercase mb-2 lms-font-xs lms-tracking-wide">Selected (4)</label>
        <div className="border rounded-4 p-3 d-flex flex-wrap gap-2">
          {selectedUsers.map(user => (
            <div key={user.id} className="badge bg-light text-dark border d-flex align-items-center gap-2 p-1 pe-2 rounded-pill fw-normal shadow-sm">
              <div className="rounded-circle d-flex align-items-center justify-content-center text-white small" style={{ width: '20px', height: '20px', backgroundColor: user.color, fontSize: '0.6rem' }}>
                {user.initials}
              </div>
              <span className="lms-font-sm">{user.name}</span>
              <X size={14} className="text-muted ms-1 lms-cursor-pointer" />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label small fw-bold text-muted text-uppercase mb-2 lms-font-xs lms-tracking-wide">OR ASSIGN BY TEAM / ROLE</label>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <select className="form-select text-muted lms-radius-md">
              <option>Select Team</option>
            </select>
          </div>
          <div className="col-12 col-md-6">
            <select className="form-select text-muted lms-radius-md">
              <option>Select Role</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-5 border rounded-4 overflow-hidden">
        {mockEmployees.map((emp, idx) => (
          <div key={emp.id} className={`p-3 d-flex justify-content-between align-items-center bg-white ${idx !== mockEmployees.length - 1 ? 'border-bottom' : ''}`}>
            <div className="d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold lms-icon-md lms-font-sm" style={{ backgroundColor: emp.color }}>
                {emp.initials}
              </div>
              <span className="fw-medium text-dark">{emp.name}</span>
            </div>
            <Button variant="secondary" className="btn btn-sm btn-light border px-3 rounded-pill fw-medium text-muted lms-font-sm lms-bg-gray">
              Add
            </Button>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between mt-4 pt-4 border-top">
        <Button variant="ghost" type="button" onClick={onPrev} className="btn-system btn-system-size-default btn-system-ghost bg-light text-dark">← Previous</Button>
        <Button type="button" onClick={onNext} className="btn-system btn-system-size-default btn-system-primary">Next: Completion Rules →</Button>
      </div>
    </div>
  );
};

export default Step3Assign;
