import { useState, useEffect } from 'react';
import Breadcrumb from '../../components/dashboard/Breadcrumb';
import DevicesAndSessions from '../../components/dashboard/DevicesAndSessions';
import './Dashboard.css';
import { 
  CheckCircle, Clock, CheckCheck, Edit, Trash2, XCircle, Briefcase, 
  List, Eye, Users, Calendar, Monitor, UserPlus, CheckSquare, BookOpen, Megaphone, AlertCircle
} from 'lucide-react';
import Button from '../../components/common/Button';
import { dashboardService, employeeService, securityService } from '../../services';

const Dashboard = ({ onTabChange, onNavigateHome, role }) => {
  const [announcementsData, setAnnouncementsData] = useState([]);
  const [summaryData, setSummaryData] = useState(null);
  const [employeesCount, setEmployeesCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [activityLogsCount, setActivityLogsCount] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const summary = await dashboardService.getSummary();
        if (summary) setSummaryData(summary);
      } catch (err) {
        setSummaryData(null);
      }

      try {
        const announcementsList = await dashboardService.getAnnouncements();
        const rawAnn = Array.isArray(announcementsList)
          ? announcementsList
          : Array.isArray(announcementsList?.data?.results)
          ? announcementsList.data.results
          : Array.isArray(announcementsList?.results)
          ? announcementsList.results
          : Array.isArray(announcementsList?.data)
          ? announcementsList.data
          : [];
        setAnnouncementsData(rawAnn);
      } catch (err) {
        setAnnouncementsData([]);
      }

      try {
        const empRes = await employeeService.getEmployees();
        const rawEmp = Array.isArray(empRes)
          ? empRes
          : Array.isArray(empRes?.data?.results)
          ? empRes.data.results
          : Array.isArray(empRes?.results)
          ? empRes.results
          : Array.isArray(empRes?.data)
          ? empRes.data
          : [];
        setEmployeesCount(rawEmp.length);
      } catch (err) {
        setEmployeesCount(0);
      }

      try {
        const projRes = await dashboardService.getProjects();
        const rawProj = Array.isArray(projRes)
          ? projRes
          : Array.isArray(projRes?.data?.results)
          ? projRes.data.results
          : Array.isArray(projRes?.results)
          ? projRes.results
          : Array.isArray(projRes?.data)
          ? projRes.data
          : [];
        setProjectsCount(rawProj.length);
      } catch (err) {
        setProjectsCount(0);
      }

      try {
        const logsRes = await securityService.getActivityLogs();
        const rawLogs = Array.isArray(logsRes)
          ? logsRes
          : Array.isArray(logsRes?.data?.results)
          ? logsRes.data.results
          : Array.isArray(logsRes?.results)
          ? logsRes.results
          : Array.isArray(logsRes?.data)
          ? logsRes.data
          : [];
        setActivityLogsCount(rawLogs.length);
      } catch (err) {
        setActivityLogsCount(0);
      }
    };

    fetchDashboardData();
  }, []);

  const renderAnnouncements = () => {
    return (
      <div className="bg-white border rounded shadow-sm mb-5 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="fw-bold m-0">Announcements</h5>
            <p className="text-muted small m-0 mt-1">Stay updated with company news</p>
          </div>
          <Button variant="secondary" className="btn btn-light border text-dark fw-medium d-flex align-items-center gap-2 px-3 small rounded-pill">
            <CheckCheck size={16} /> Mark All Read
          </Button>
        </div>

        <div className="d-flex flex-column gap-3">
          {announcementsData.length > 0 ? (
            announcementsData.map((item, idx) => (
              <div key={item.id || idx} className="bg-white border rounded position-relative d-flex align-items-center p-3 transition-all hover-shadow">
                <div className={`position-absolute top-0 bottom-0 start-0 ${item.priority === 'High' ? 'bg-danger' : 'bg-primary'}`} style={{ width: '4px', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px' }}></div>
                <div className={`ms-3 rounded d-flex justify-content-center align-items-center flex-shrink-0 ${item.priority === 'High' ? 'bg-danger-light text-danger' : 'bg-primary-light text-primary'}`} style={{width: 40, height: 40}}>
                  {item.priority === 'High' ? <AlertCircle size={20} /> : <Megaphone size={20} />}
                </div>
                <div className="ms-4 flex-grow-1">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <h6 className="m-0 fw-bold text-dark">{item.title}</h6>
                  </div>
                  <p className="text-muted small m-0 mb-1">{item.content || item.desc}</p>
                  <div className="text-muted" style={{fontSize: '0.7rem'}}>
                    By {item.created_by_name || 'Admin'} {item.created_at && <><span className="mx-1">•</span>Created: {item.created_at}</>}
                  </div>
                </div>
                <div className="d-flex flex-column align-items-end justify-content-between h-100 ms-3 gap-3">
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-muted" style={{fontSize: '0.7rem'}}>{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Today'}</span>
                    <div className="rounded-circle bg-primary" style={{ width: '8px', height: '8px' }}></div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    {role === 'admin' ? (
                      <>
                        <Button variant="outline" className="btn btn-sm btn-white border text-muted shadow-sm p-1 rounded">
                          <Edit size={14} />
                        </Button>
                        <Button variant="outline" className="btn btn-sm btn-white border text-muted shadow-sm p-1 rounded">
                          <Trash2 size={14} />
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" className="btn btn-sm btn-white border text-muted shadow-sm p-1 rounded">
                        <Eye size={14} />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-slate">No announcements found.</div>
          )}
        </div>
      </div>
    );
  };

  const renderAdminDashboard = () => (
    <>
      <div className="mb-4">
        <Breadcrumb items={['Dashboard', 'Overview']} />
        <h1 className="page-title m-0">Welcome back, Brahma! 👋</h1>
      </div>

      <div className="row g-4 mb-5">
        {[
          { icon: Users, count: summaryData?.total_employees ?? employeesCount, label: 'Active Workforce', subtext: 'Employees active today', bg: 'bg-primary', color: 'text-white' },
          { icon: Users, count: summaryData?.total_employees ?? employeesCount, label: 'Workforce Overview', subtext: 'Total employees registered', bg: 'bg-primary', color: 'text-white' },
          { icon: Briefcase, count: projectsCount, label: 'Pending Projects', subtext: 'Total active projects in database', bg: 'bg-primary', color: 'text-white' },
          { icon: Megaphone, count: activityLogsCount, label: 'System Activity', subtext: 'Total activity logs recorded', bg: 'bg-primary', color: 'text-white' }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
          <div key={idx} className="col-12 col-md-3">
            <div className="bg-white border rounded-3 p-4 d-flex flex-column h-100 shadow-sm position-relative">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="text-dark small fw-medium">{stat.label}</div>
                <div className={`rounded-circle d-flex justify-content-center align-items-center ${stat.bg} ${stat.color}`} style={{ width: '32px', height: '32px' }}>
                  <Icon size={16} />
                </div>
              </div>
              <h2 className="fw-bold mb-2 text-success" style={idx > 0 ? { color: '#000' } : {}}>{stat.count}</h2>
              <div className="text-muted mt-auto" style={{ fontSize: '0.75rem' }}>{stat.subtext}</div>
            </div>
          </div>
        )})}
      </div>

      {renderAnnouncements()}

      <DevicesAndSessions />
    </>
  );

  const renderHRDashboard = () => (
    <>
      <div className="mb-4">
        <Breadcrumb items={['Dashboard', 'Overview']} />
        <h1 className="page-title m-0">Welcome back, Moon!</h1>
      </div>

      <div className="row g-4 mb-5">
        {[
          { icon: Users, count: summaryData?.total_employees ?? employeesCount, label: 'Total Employees', subtext: 'Registered workforce', subtextColor: 'text-muted', bg: 'bg-blue-light', color: 'text-blue' },
          { icon: CheckCircle, count: '100%', label: 'Attendance Today', subtext: `${summaryData?.total_employees ?? employeesCount} / ${summaryData?.total_employees ?? employeesCount} present`, subtextColor: 'text-muted', bg: 'bg-success-light', color: 'text-success' },
          { icon: Calendar, count: '0', label: 'Pending Leave Requests', subtext: 'No pending requests', subtextColor: 'text-muted', bg: 'bg-warning-light', color: 'text-warning-dark' },
          { icon: Monitor, count: '100%', label: 'LMS Completion Rate', subtext: 'System up to date', subtextColor: 'text-muted', bg: 'bg-purple-light', color: 'text-purple' }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
          <div key={idx} className="col-12 col-md-3">
            <div className="bg-white border rounded-3 p-4 d-flex gap-3 align-items-start h-100 shadow-sm">
              <div className={`rounded-3 d-flex justify-content-center align-items-center ${stat.bg} ${stat.color}`} style={{ width: '48px', height: '48px' }}>
                <Icon size={24} />
              </div>
              <div>
                <h3 className="fw-bold mb-1 text-blue">{stat.count}</h3>
                <div className="text-dark small fw-medium">{stat.label}</div>
                <div className={`small ${stat.subtextColor}`} style={{ fontSize: '0.75rem' }}>{stat.subtext}</div>
              </div>
            </div>
          </div>
        )})}
      </div>

      <div className="dashboard-section-header">
        <div>
          <h3 className="section-title">Announcements & Notifications</h3>
          <p className="section-subtitle">Stay updated with company news</p>
        </div>
        <Button className="mark-all-read-btn bg-white border text-dark fw-medium shadow-sm">
          <CheckCheck size={16} className="me-2" /> Mark All Read
        </Button>
      </div>

      <div className="announcements-list mb-5">
        {announcementsData.length > 0 ? (
          announcementsData.map((item, idx) => (
            <div key={item.id || idx} className="announcement-list-item bg-white border rounded mb-3 position-relative d-flex align-items-center p-3 shadow-sm">
              <div
                className="bg-blue"
                style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", borderTopLeftRadius: "4px", borderBottomLeftRadius: "4px" }}
              ></div>
              <div className={`item-icon-box ms-3 bg-blue text-white rounded-circle d-flex justify-content-center align-items-center fw-bold`} style={{width: 40, height: 40, fontSize: '0.85rem'}}>
                <Megaphone size={18} />
              </div>
              <div className="item-content ms-4 flex-grow-1">
                <h6 className="mb-1 fw-bold text-dark">{item.title}</h6>
                <p className="text-muted mb-1 small">{item.content || item.desc}</p>
                <div className="text-muted small" style={{fontSize: '0.75rem'}}>
                  By {item.created_by_name || 'Admin'} {item.created_at && <><span className="mx-1">•</span>Created: {item.created_at}</>}
                </div>
              </div>
              <div className="d-flex flex-column align-items-end justify-content-between h-100 gap-2">
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted small" style={{fontSize: '0.75rem'}}>{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Today'}</span>
                  <div className="rounded-circle bg-blue" style={{ width: '6px', height: '6px' }}></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4 text-slate bg-white border rounded">No announcements or notifications found.</div>
        )}
      </div>

      <div className="mb-3">
        <h6 className="fw-bold text-dark m-0" style={{fontSize: '0.9rem'}}>Quick Actions</h6>
      </div>

      <div className="row g-4 mb-4">
        {[
          { icon: UserPlus, label: 'Add Employee', subtext: 'Onboard new hire', color: 'text-blue', bg: 'bg-blue-light' },
          { icon: CheckSquare, label: 'Approve Leave', subtext: '7 requests pending', color: 'text-success', bg: 'bg-success-light' },
          { icon: BookOpen, label: 'Assign Course', subtext: 'LMS management', color: 'text-purple', bg: 'bg-purple-light' },
          { icon: Megaphone, label: 'Announcement', subtext: 'Create & broadcast', color: 'text-warning-dark', bg: 'bg-warning-light' }
        ].map((action, idx) => {
          const Icon = action.icon;
          return (
          <div key={idx} className="col-12 col-md-3">
            <div className="bg-white border rounded-3 p-4 d-flex flex-column align-items-center justify-content-center text-center shadow-sm" style={{cursor: 'pointer', transition: 'all 0.2s'}}>
              <div className={`rounded-3 d-flex justify-content-center align-items-center ${action.bg} ${action.color} mb-3`} style={{ width: '48px', height: '48px' }}>
                <Icon size={24} />
              </div>
              <div className="fw-bold text-dark small">{action.label}</div>
              <div className="text-muted" style={{ fontSize: '0.7rem' }}>{action.subtext}</div>
            </div>
          </div>
        )})}
      </div>
    </>
  );

  return (
    <>
      <div className="dashboard-container">
        {role === 'admin' ? renderAdminDashboard() : role === 'hr' ? renderHRDashboard() : (
          <>
            <div className="mb-4">
              <Breadcrumb items={['Dashboard', 'Overview']} />
              <h1 className="page-title m-0">Welcome back, Brahma! 👋</h1>
            </div>

            <div className="mb-4 d-flex align-items-center gap-2">
              <Clock size={16} className="text-dark" />
              <h5 className="m-0 fw-bold text-dark" style={{ fontSize: '1rem' }}>Team Attendance — Today</h5>
            </div>

            <div className="row g-4 mb-5">
              {[
                { icon: CheckCircle, count: '10', label: 'Present', subtext: '↑ 83% rate', bg: 'bg-success-light', color: 'text-success' },
                { icon: XCircle, count: '1', label: 'Absent', subtext: '1 unexcused', bg: 'bg-danger-light', color: 'text-danger' },
                { icon: Clock, count: '2', label: 'Late Arrivals', subtext: 'After 9:30 AM', bg: 'bg-warning-light', color: 'text-warning' },
                { icon: Briefcase, count: '1', label: 'Work From Home', subtext: 'Approved WFH', bg: 'bg-primary-light', color: 'text-primary' }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                <div key={idx} className="col-12 col-md-3">
                  <div className="bg-white border rounded-3 p-4 d-flex gap-4 align-items-center h-100 shadow-sm transition-all hover-shadow">
                    <div className={`rounded-3 d-flex justify-content-center align-items-center flex-shrink-0 ${stat.bg} ${stat.color}`} style={{ width: '56px', height: '56px' }}>
                      <Icon size={28} />
                    </div>
                    <div>
                      <h2 className="fw-bold mb-0 text-dark lh-1" style={idx === 0 ? { color: '#198754' } : idx === 1 ? { color: '#dc3545' } : idx === 2 ? { color: '#fd7e14' } : { color: '#0d6efd' }}>{stat.count}</h2>
                      <div className="text-dark small fw-medium mt-1">{stat.label}</div>
                      <div className={`small mt-1`} style={{ fontSize: '0.75rem', color: idx === 0 ? '#198754' : idx === 1 ? '#6c757d' : idx === 2 ? '#fd7e14' : '#6c757d' }}>{stat.subtext}</div>
                    </div>
                  </div>
                </div>
              )})}
            </div>

            <div className="mb-4 d-flex align-items-center gap-2">
              <List size={16} className="text-dark" />
              <h5 className="m-0 fw-bold text-dark" style={{ fontSize: '1rem' }}>Task Summary — This Month</h5>
            </div>

            <div className="row g-4 mb-5">
              {[
                { icon: List, count: '48', label: 'Tasks Assigned', subtext: 'Across 12 members', bg: 'bg-primary-light', color: 'text-primary' },
                { icon: CheckCircle, count: '31', label: 'Completed', subtext: '64.5% rate', bg: 'bg-success-light', color: 'text-success' },
                { icon: Clock, count: '12', label: 'In Progress', subtext: '5 near deadline', bg: 'bg-warning-light', color: 'text-warning' }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                <div key={idx} className="col-12 col-md-4">
                  <div className="bg-white border rounded-3 p-4 d-flex gap-4 align-items-center h-100 shadow-sm transition-all hover-shadow">
                    <div className={`rounded-3 d-flex justify-content-center align-items-center flex-shrink-0 ${stat.bg} ${stat.color}`} style={{ width: '56px', height: '56px' }}>
                      <Icon size={28} />
                    </div>
                    <div>
                      <h2 className="fw-bold mb-0 text-dark lh-1" style={idx === 1 ? { color: '#198754' } : idx === 2 ? { color: '#fd7e14' } : {}}>{stat.count}</h2>
                      <div className="text-dark small fw-medium mt-1">{stat.label}</div>
                      <div className={`small mt-1`} style={{ fontSize: '0.75rem', color: idx === 1 ? '#198754' : idx === 2 ? '#fd7e14' : '#6c757d' }}>{stat.subtext}</div>
                    </div>
                  </div>
                </div>
              )})}
            </div>

            {renderAnnouncements()}
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
