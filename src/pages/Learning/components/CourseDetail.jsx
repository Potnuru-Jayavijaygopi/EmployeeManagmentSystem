import React, { useState } from 'react';
import { ArrowLeft, Edit2, Users, Bell, Download, CheckSquare, Clock, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import Badge from '../../../components/common/Badge';
import EditCourseModal from './modals/EditCourseModal';
import AssignCourseModal from './modals/AssignCourseModal';
import SendReminderModal from './modals/SendReminderModal';
import Button from '../../../components/common/Button';

const enrolledEmployees = [
  { id: 1, name: 'Riya Nair', initials: 'RN', color: '#14B8A6', status: 'Completed', progress: 100, score: '94%', lastActive: 'Today' },
  { id: 2, name: 'Arjun Kumar', initials: 'AK', color: '#E11D48', status: 'In Progress', progress: 72, score: '-', lastActive: 'Yesterday' },
  { id: 3, name: 'Sneha Patel', initials: 'SP', color: '#3B82F6', status: 'Completed', progress: 100, score: '88%', lastActive: 'Apr 20' },
  { id: 4, name: 'Kiran Rao', initials: 'KR', color: '#10B981', status: 'In Progress', progress: 45, score: '-', lastActive: 'Apr 19' },
  { id: 5, name: 'Priya Mehta', initials: 'PM', color: '#8B5CF6', status: 'Not Started', progress: 0, score: '-', lastActive: '—' },
  { id: 6, name: 'Devraj Singh', initials: 'DS', color: '#3B82F6', status: 'Completed', progress: 100, score: '91%', lastActive: 'Apr 18' }
];

const StatCard = ({ icon: Icon, value, label, iconColorClass, iconBgClass }) => (
  <div className="bg-white border rounded-4 p-4 d-flex align-items-center gap-3 flex-grow-1 lms-stat-card">
    <div className={`d-flex align-items-center justify-content-center rounded-3 ${iconColorClass} ${iconBgClass} lms-icon-lg`}>
      <Icon size={24} />
    </div>
    <div>
      <div className={`fw-bold mb-1 ${iconColorClass} lms-font-2xl lh-1`}>{value}</div>
      <div className="text-muted small lms-font-sm">{label}</div>
    </div>
  </div>
);

const CourseDetail = ({ courseTitle, onBackToCourses }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

  return (
    <div className="p-4 lms-bg-gray lms-min-h-screen">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-2 text-muted small fw-medium">
          <span className="cursor-pointer hover-text-primary" onClick={onBackToCourses}>Courses</span>
          <span>/</span>
          <span className="text-dark">{courseTitle || 'React Advanced Patterns'}</span>
        </div>
        <Button variant="outline" 
          className="btn-system btn-system-size-default btn-system-outline bg-white text-dark border-secondary"
          onClick={onBackToCourses}
        >
          <ArrowLeft size={16} className="me-2" /> Back to Courses
        </Button>
      </div>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start mb-4 pb-4 border-bottom gap-3">
        <div>
          <h2 className="fw-bold mb-3">{courseTitle || 'React Advanced Patterns'}</h2>
          <div className="d-flex align-items-center flex-wrap gap-3 text-muted small">
            <div className="d-flex align-items-center gap-1"><CheckSquare size={14} /> Technical</div>
            <div className="d-flex align-items-center gap-1"><Clock size={14} /> 12h</div>
            <div className="d-flex align-items-center gap-1"><Calendar size={14} /> Due: Jun 30, 2026</div>
            <Badge variant="success" className="bg-opacity-10 fw-medium">Published</Badge>
          </div>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <Button variant="outline" className="btn-system btn-system-size-default btn-system-outline bg-white text-dark border-secondary" onClick={() => setIsEditModalOpen(true)}>
            <Edit2 size={16} className="me-2" /> Edit
          </Button>
          <Button variant="outline" className="btn-system btn-system-size-default btn-system-outline bg-white text-dark border-secondary" onClick={() => setIsAssignModalOpen(true)}>
            <Users size={16} className="me-2" /> Assign Course
          </Button>
          <Button variant="outline" className="btn-system btn-system-size-default btn-system-outline bg-white text-dark border-secondary" onClick={() => setIsReminderModalOpen(true)}>
            <Bell size={16} className="me-2" /> Send Reminder
          </Button>
          <Button className="btn-system btn-system-size-default btn-system-primary">
            <Download size={16} className="me-2" /> Export Report
          </Button>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-3 mb-5">
        <StatCard icon={Users} value="42" label="Total Assigned" iconColorClass="text-primary" iconBgClass="bg-primary bg-opacity-10" />
        <StatCard icon={CheckCircle} value="28" label="Completed" iconColorClass="text-success" iconBgClass="bg-success bg-opacity-10" />
        <StatCard icon={Clock} value="10" label="In Progress" iconColorClass="text-primary" iconBgClass="bg-primary bg-opacity-10" />
        <StatCard icon={AlertCircle} value="4" label="Not Started" iconColorClass="text-warning" iconBgClass="bg-warning bg-opacity-10" />
        <div className="bg-white border rounded-4 p-4 d-flex align-items-center gap-3 flex-grow-1 lms-stat-card">
          <div className="position-relative d-flex align-items-center justify-content-center rounded-circle lms-icon-xl lms-border-success-top">
            <div className="d-flex flex-column align-items-center">
              <span className="fw-bold lms-font-md">67%</span>
              <span className="text-muted lms-font-xs">Done</span>
            </div>
          </div>
          <div>
            <div className="fw-bold text-success mb-1 lms-font-xl lh-1">67%</div>
            <div className="text-muted small lms-font-sm">Completion Rate</div>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-4 overflow-hidden">
        <div className="p-4 d-flex justify-content-between align-items-center border-bottom">
          <div className="fw-medium text-muted small">42 enrolled employees</div>
          <div className="d-flex align-items-center gap-3">
            <input type="text" className="form-control form-control-sm text-dark shadow-none lms-radius-md" placeholder="Search..." style={{ width: '200px' }} />
            <select className="form-select form-select-sm text-dark shadow-none lms-radius-md" style={{ width: '120px' }}>
              <option>All Status</option>
            </select>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="text-muted small fw-bold text-uppercase border-bottom-0 ps-4 py-3 lms-font-xs lms-tracking-wide">Employee</th>
                <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide">Status</th>
                <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide" style={{ width: '200px' }}>Progress</th>
                <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide">Score</th>
                <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide">Last Active</th>
                <th className="text-muted small fw-bold text-uppercase border-bottom-0 pe-4 py-3 text-end lms-font-xs lms-tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrolledEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td className="ps-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold lms-font-sm lms-icon-md" style={{ backgroundColor: emp.color }}>
                        {emp.initials}
                      </div>
                      <span className="fw-bold text-dark small">{emp.name}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <Badge variant={emp.status === 'Completed' ? 'success' : emp.status === 'In Progress' ? 'primary' : 'secondary'} className="bg-opacity-10 fw-medium">
                      {emp.status}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <div className="d-flex align-items-center gap-2">
                      <div className="flex-grow-1 bg-light rounded-pill overflow-hidden lms-progress-track">
                        <div className="h-100" style={{ width: `${emp.progress}%`, backgroundColor: emp.progress === 100 ? '#10B981' : emp.progress > 0 ? '#3B82F6' : '#E5E7EB' }}></div>
                      </div>
                      <div className="small fw-bold text-dark lms-progress-label">{emp.progress}%</div>
                    </div>
                  </td>
                  <td className="py-3 fw-bold text-dark small">{emp.score}</td>
                  <td className="py-3 text-muted small">{emp.lastActive}</td>
                  <td className="pe-4 py-3 text-end">
                    <Button variant="secondary" className="btn btn-sm btn-light border px-3 rounded fw-medium text-muted lms-font-sm lms-bg-gray" onClick={() => setIsReminderModalOpen(true)}>
                      Remind
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditCourseModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      <AssignCourseModal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} />
      <SendReminderModal isOpen={isReminderModalOpen} onClose={() => setIsReminderModalOpen(false)} />

    </div>
  );
};

export default CourseDetail;
