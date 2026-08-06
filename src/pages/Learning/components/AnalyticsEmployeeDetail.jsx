import React from 'react';
import { ArrowLeft, Download, BookOpen, CheckCircle, Clock, AlertCircle, Star, Eye } from 'lucide-react';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';

const mockEnrolledCourses = [
  { id: 1, name: 'React Advanced Patterns', status: 'Completed', progress: 100, score: '94%', completedOn: 'Apr 22, 2026', progressColor: '#10B981' },
  { id: 2, name: 'Leadership Essentials', status: 'Completed', progress: 100, score: '88%', completedOn: 'Apr 18, 2026', progressColor: '#10B981' },
  { id: 3, name: 'Data Privacy & GDPR', status: 'In Progress', progress: 65, score: '—', completedOn: '—', progressColor: '#3B82F6' },
  { id: 4, name: 'Agile & Scrum Mastery', status: 'In Progress', progress: 40, score: '—', completedOn: '—', progressColor: '#3B82F6' },
  { id: 5, name: 'Design Systems at Scale', status: 'Not Started', progress: 0, score: '—', completedOn: '—', progressColor: '#E5E7EB' }
];

const StatCard = ({ icon: Icon, value, label, iconColorClass, iconBgClass }) => (
  <div className="bg-white border rounded-4 p-4 d-flex align-items-center gap-3 flex-grow-1" style={{ minWidth: '150px' }}>
    <div className={`d-flex align-items-center justify-content-center rounded-3 ${iconColorClass} ${iconBgClass} lms-icon-lg`}>
      <Icon size={24} />
    </div>
    <div>
      <div className={`fw-bold mb-1 ${iconColorClass} lms-font-2xl lh-1`}>{value}</div>
      <div className="text-muted small lms-font-sm">{label}</div>
    </div>
  </div>
);

const ProgressBar = ({ progress, color }) => (
  <div className="d-flex align-items-center gap-2">
    <div className="flex-grow-1 bg-light rounded-pill overflow-hidden lms-progress-track">
      <div className="h-100" style={{ width: `${progress}%`, backgroundColor: color }}></div>
    </div>
    <div className="small fw-bold text-dark lms-progress-label">{progress}%</div>
  </div>
);

const AnalyticsEmployeeDetail = ({ employee, onBack }) => {
  return (
    <div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-2 text-muted small fw-medium">
          <span className="cursor-pointer hover-text-primary" onClick={onBack}>Analytics</span>
          <span>/</span>
          <span className="text-dark">{employee.name}</span>
        </div>
        <Button variant="outline" 
          className="btn-system btn-system-size-default btn-system-outline bg-white text-dark border-secondary"
          onClick={onBack}
        >
          <ArrowLeft size={16} className="me-2" /> Back to Analytics
        </Button>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4 pb-4 border-bottom">
        <div className="d-flex align-items-center gap-3">
          <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold lms-icon-xl lms-font-xl" style={{ backgroundColor: employee.color }}>
            {employee.initials}
          </div>
          <div>
            <h4 className="fw-bold mb-1">{employee.name}</h4>
            <div className="text-muted small d-flex gap-3">
              <span>{employee.role} | {employee.team} Team</span>
              <span>Email: {employee.name.toLowerCase().replace(' ', '.')}@company.com</span>
              <span>Employee ID: EMP00{employee.id}</span>
            </div>
          </div>
        </div>
        <div>
          <label className="form-label small fw-bold text-muted text-uppercase mb-1 lms-font-xs">Select Employee</label>
          <select className="form-select form-select-sm text-dark shadow-none lms-radius-md" defaultValue={employee.name} style={{ width: '200px' }}>
            <option>{employee.name}</option>
            <option>Arjun Kumar</option>
            <option>Sneha Patel</option>
          </select>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-3 mb-5">
        <StatCard icon={BookOpen} value="5" label="Enrolled Courses" iconColorClass="text-primary" iconBgClass="bg-primary bg-opacity-10" />
        <StatCard icon={CheckCircle} value="2" label="Completed (40%)" iconColorClass="text-success" iconBgClass="bg-success bg-opacity-10" />
        <StatCard icon={Clock} value="2" label="In Progress (40%)" iconColorClass="text-primary" iconBgClass="bg-primary bg-opacity-10" />
        <StatCard icon={AlertCircle} value="1" label="Not Started (20%)" iconColorClass="text-warning" iconBgClass="bg-warning bg-opacity-10" />
        <StatCard icon={Star} value="91%" label="Average Score" iconColorClass="text-primary" iconBgClass="bg-primary bg-opacity-10" />
      </div>

      <div className="bg-white border rounded-4 overflow-hidden">
        <div className="p-4 d-flex justify-content-between align-items-center border-bottom">
          <div className="fw-medium text-muted small">5 Enrolled Courses</div>
          <Button variant="secondary" className="btn btn-white border d-flex align-items-center gap-2 text-dark shadow-sm hover-bg-light btn-sm" style={{ borderRadius: '6px' }}>
            <Download size={14} /> Export Report
          </Button>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="bg-light border-bottom">
              <tr>
                <th className="text-muted small fw-bold text-uppercase border-bottom-0 ps-4 py-3 lms-font-xs lms-tracking-wide" style={{ width: '50px' }}>#</th>
                <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide">Course Name</th>
                <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide">Status</th>
                <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide" style={{ width: '200px' }}>Progress</th>
                <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide">Score</th>
                <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide">Completed On</th>
                <th className="text-muted small fw-bold text-uppercase border-bottom-0 pe-4 py-3 text-end lms-font-xs lms-tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockEnrolledCourses.map((course, idx) => (
                <tr key={course.id}>
                  <td className="ps-4 py-3 text-muted small">{idx + 1}</td>
                  <td className="py-3 fw-bold text-dark small">{course.name}</td>
                  <td className="py-3">
                    <Badge variant={course.status === 'Completed' ? 'success' : course.status === 'In Progress' ? 'primary' : 'secondary'} className="bg-opacity-10 fw-medium">
                      {course.status}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <ProgressBar progress={course.progress} color={course.progressColor} />
                  </td>
                  <td className={`py-3 fw-bold small ${course.status === 'Completed' ? 'text-success' : 'text-dark'}`}>{course.score}</td>
                  <td className="py-3 text-muted small">{course.completedOn}</td>
                  <td className="pe-4 py-3 text-end">
                    <Button variant="icon" className="btn btn-sm btn-light border px-2 py-1 rounded d-inline-flex align-items-center justify-content-center text-muted lms-bg-gray" style={{ width: '28px', height: '28px' }}>
                      <Eye size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AnalyticsEmployeeDetail;
