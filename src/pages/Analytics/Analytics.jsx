import React, { useState } from 'react';
import Breadcrumb from '../../components/dashboard/Breadcrumb';
import Button from '../../components/common/Button';
import { 
  Download, AlertCircle, AlertTriangle, FileText, CheckCircle2, Star, Eye, ChevronDown, 
  ArrowLeft, Clock, Activity, CheckCircle, Mail, User, BookOpen
} from 'lucide-react';
import './Analytics.css';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('Quizzes'); 
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const resetDrillDowns = () => {
    setSelectedEmployee(null);
    setSelectedCourse(null);
    setSelectedQuiz(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetDrillDowns();
  };

  const renderTopAlerts = () => (
    <div className="row g-3 mb-4">
      <div className="col-12 col-md-4">
        <div className="bg-danger-light text-danger rounded p-3 d-flex align-items-center gap-3 border border-danger">
          <div className="bg-white rounded-circle p-2 shadow-sm flex-shrink-0 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
            <AlertCircle size={20} className="text-danger" />
          </div>
          <div>
            <div className="fw-bold mb-1" style={{ fontSize: '0.9rem' }}>12 Employees Not Started</div>
            <div className="small text-danger opacity-75" style={{ fontSize: '0.75rem' }}>Courses assigned but not begun</div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4">
        <div className="bg-warning-light text-warning-dark rounded p-3 d-flex align-items-center gap-3 border border-warning">
          <div className="bg-white rounded-circle p-2 shadow-sm flex-shrink-0 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
            <AlertTriangle size={20} className="text-warning-dark" />
          </div>
          <div>
            <div className="fw-bold mb-1" style={{ fontSize: '0.9rem' }}>3 Low Completion Courses</div>
            <div className="small text-warning-dark opacity-75" style={{ fontSize: '0.75rem' }}>Below 40% completion rate</div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4">
        <div className="bg-blue-light text-blue rounded p-3 d-flex align-items-center gap-3 border border-blue">
          <div className="bg-white rounded-circle p-2 shadow-sm flex-shrink-0 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
            <FileText size={20} className="text-blue" />
          </div>
          <div>
            <div className="fw-bold mb-1" style={{ fontSize: '0.9rem' }}>8 Recent Quiz Failures</div>
            <div className="small text-blue opacity-75" style={{ fontSize: '0.75rem' }}>Scored below passing threshold</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTopMetrics = () => (
    <div className="row g-3 mb-5">
      <div className="col-12 col-md-3">
        <div className="bg-white rounded border p-3 d-flex align-items-center gap-3 shadow-sm h-100">
          <div className="bg-blue-light text-blue rounded p-2 d-flex align-items-center justify-content-center" style={{ width: 42, height: 42 }}>
            <FileText size={20} />
          </div>
          <div>
            <h3 className="fw-bold text-dark m-0">186</h3>
            <div className="small text-muted" style={{ fontSize: '0.75rem' }}>Total Enrollments</div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-3">
        <div className="bg-white rounded border p-3 d-flex align-items-center gap-3 shadow-sm h-100">
          <div className="bg-success-light text-success rounded p-2 d-flex align-items-center justify-content-center" style={{ width: 42, height: 42 }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <h3 className="fw-bold text-dark m-0">78%</h3>
            <div className="small text-muted" style={{ fontSize: '0.75rem' }}>Avg Completion</div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-3">
        <div className="bg-white rounded border p-3 d-flex align-items-center gap-3 shadow-sm h-100">
          <div className="bg-warning-light text-warning-dark rounded p-2 d-flex align-items-center justify-content-center" style={{ width: 42, height: 42 }}>
            <Star size={20} />
          </div>
          <div>
            <h3 className="fw-bold text-dark m-0">82%</h3>
            <div className="small text-muted" style={{ fontSize: '0.75rem' }}>Avg Quiz Score</div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-3">
        <div className="bg-white rounded border p-3 d-flex align-items-center gap-3 shadow-sm h-100">
          <div className="bg-purple-light text-purple rounded p-2 d-flex align-items-center justify-content-center" style={{ width: 42, height: 42 }}>
            <Star size={20} />
          </div>
          <div>
            <h3 className="fw-bold text-dark m-0">94%</h3>
            <div className="small text-muted" style={{ fontSize: '0.75rem' }}>Quiz Pass Rate</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderToggles = () => (
    <div className="d-flex gap-2 mb-4">
      <Button 
        className={`btn px-4 py-2 rounded-pill fw-medium ${activeTab === 'Employees' ? 'btn-primary bg-blue border-0' : 'btn-white border text-muted'}`}
        onClick={() => handleTabChange('Employees')}
        style={{ fontSize: '0.85rem' }}
      >
        Employees
      </Button>
      <Button 
        className={`btn px-4 py-2 rounded-pill fw-medium ${activeTab === 'Courses' ? 'btn-primary bg-blue border-0' : 'btn-white border text-muted'}`}
        onClick={() => handleTabChange('Courses')}
        style={{ fontSize: '0.85rem' }}
      >
        Courses
      </Button>
      <Button 
        className={`btn px-4 py-2 rounded-pill fw-medium ${activeTab === 'Quizzes' ? 'btn-primary bg-blue border-0' : 'btn-white border text-muted'}`}
        onClick={() => handleTabChange('Quizzes')}
        style={{ fontSize: '0.85rem' }}
      >
        Quizzes
      </Button>
    </div>
  );

  const renderQuizzesTable = () => (
    <div>
      <h6 className="fw-bold text-muted mb-3" style={{ fontSize: '0.75rem' }}>Quiz Results</h6>
      <div className="bg-white border rounded overflow-hidden shadow-sm">
        <div className="table-responsive">
          <table className="table mb-0 align-middle">
            <thead>
              <tr className="bg-light">
                <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 ps-4" style={{ fontSize: '0.65rem' }}>QUIZ NAME</th>
                <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>COURSE</th>
                <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>SCORE</th>
                <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>RESULT</th>
                <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>ATTEMPTS</th>
                <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 pe-4" style={{ fontSize: '0.65rem' }}>LAST ATTEMPT</th>
              </tr>
            </thead>
            <tbody>
              {[
                { n: 'GDPR Compliance Quiz', c: 'Data Privacy & GDPR', s: '2', rp: 100, rc: 'success', att: '80%', last: 'Active', lc: 'success' },
                { n: 'Leadership Fundamentals', c: 'Leadership Essentials', s: '1', rp: 0, rc: 'light', att: '48%', last: 'Active', lc: 'success' },
                { n: 'Scrum Ceremonies Quiz', c: 'Agile & Scrum Mastery', s: '0', rp: 0, rc: 'light', att: '0%', last: 'Draft', lc: 'secondary' },
                { n: 'GDPR Compliance Quiz', c: 'Data Privacy & GDPR', s: '2', rp: 100, rc: 'success', att: '80%', last: 'Active', lc: 'success' },
                { n: 'Leadership Fundamentals', c: 'Leadership Essentials', s: '1', rp: 0, rc: 'light', att: '48%', last: 'Active', lc: 'success' },
                { n: 'Scrum Ceremonies Quiz', c: 'Agile & Scrum Mastery', s: '0', rp: 0, rc: 'light', att: '0%', last: 'Draft', lc: 'secondary' },
              ].map((row, idx) => (
                <tr key={idx} style={{ cursor: 'pointer' }} onClick={() => setSelectedQuiz(row.n)}>
                  <td className="text-dark small fw-bold py-3 border-bottom-0 ps-4">{row.n}</td>
                  <td className="text-muted small py-3 border-bottom-0">{row.c}</td>
                  <td className="text-dark small fw-bold py-3 border-bottom-0">{row.s}</td>
                  <td className="py-3 border-bottom-0" style={{ width: '150px' }}>
                    <div className="d-flex align-items-center gap-2">
                      <div className="progress bg-light rounded-pill flex-grow-1" style={{ height: '4px' }}>
                        <div className={`progress-bar bg-${row.rc}`} role="progressbar" style={{ width: `${row.rp}%` }}></div>
                      </div>
                      <span className={`small fw-bold text-${row.rp > 0 ? 'success' : 'muted'}`} style={{ fontSize: '0.7rem' }}>{row.rp}%</span>
                    </div>
                  </td>
                  <td className={`small fw-bold text-${row.att === '80%' ? 'warning-dark' : (row.att === '0%' ? 'danger' : 'danger')} py-3 border-bottom-0`}>{row.att}</td>
                  <td className="py-3 border-bottom-0 pe-4">
                    <span className={`badge bg-${row.lc === 'success' ? 'success-light' : 'light'} text-${row.lc === 'success' ? 'success' : 'secondary'} rounded px-2 py-1`} style={{ fontSize: '0.65rem' }}>{row.last}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCoursesTable = () => (
    <div>
      <h6 className="fw-bold text-muted mb-3" style={{ fontSize: '0.75rem' }}>All courses — 24 total</h6>
      <div className="bg-white border rounded overflow-hidden shadow-sm">
        <div className="table-responsive">
          <table className="table mb-0 align-middle">
            <thead>
              <tr className="bg-light">
                <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 ps-4" style={{ fontSize: '0.65rem' }}>COURSE</th>
                <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>CATEGORY</th>
                <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>ASSIGNED</th>
                <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>COMPLETED</th>
                <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>COMPLETION %</th>
                <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>AVG SCORE</th>
                <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 pe-4" style={{ fontSize: '0.65rem' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {[
                { n: 'React Advanced Patterns', dot: 'blue', cat: 'Technical', catC: 'blue', a: '5', c: '4', p: 80, s: '89%', st: 'Published', stC: 'success' },
                { n: 'Leadership Essentials', dot: 'purple', cat: 'Leadership', catC: 'blue', a: '3', c: '3', p: 100, s: '93%', st: 'Published', stC: 'success' },
                { n: 'Data Privacy & GDPR', dot: 'success', cat: 'Compliance', catC: 'blue', a: '4', c: '3', p: 65, s: '92%', st: 'Published', stC: 'success' },
                { n: 'Design Systems at Scale', dot: 'warning-dark', cat: 'Design', catC: 'blue', a: '2', c: '1', p: 30, s: '86%', st: 'Draft', stC: 'secondary' },
                { n: 'Agile & Scrum Mastery', dot: 'blue', cat: 'Leadership', catC: 'blue', a: '3', c: '1', p: 45, s: '94%', st: 'Published', stC: 'success' },
                { n: 'SQL & Data Analytics', dot: 'danger', cat: 'Technical', catC: 'blue', a: '3', c: '2', p: 55, s: '90%', st: 'Archived', stC: 'blue' },
              ].map((row, idx) => (
                <tr key={idx}>
                  <td className="py-3 border-bottom-0 ps-4">
                    <div className="d-flex align-items-center gap-2">
                      <div className={`rounded-circle bg-${row.dot}`} style={{ width: 6, height: 6 }}></div>
                      <span className="text-dark small fw-bold">{row.n}</span>
                    </div>
                  </td>
                  <td className="py-3 border-bottom-0">
                    <span className={`badge bg-${row.catC}-light text-${row.catC} rounded-pill px-2 py-1 fw-medium`} style={{ fontSize: '0.65rem' }}>{row.cat}</span>
                  </td>
                  <td className="text-dark small fw-bold py-3 border-bottom-0">{row.a}</td>
                  <td className="text-success small fw-bold py-3 border-bottom-0">{row.c}</td>
                  <td className="py-3 border-bottom-0" style={{ width: '120px' }}>
                    <div className="d-flex align-items-center gap-2">
                      <div className="progress bg-light rounded-pill flex-grow-1" style={{ height: '4px' }}>
                        <div className={`progress-bar bg-${row.p > 70 ? 'success' : (row.p > 40 ? 'warning' : 'danger')}`} role="progressbar" style={{ width: `${row.p}%` }}></div>
                      </div>
                      <span className="small text-muted" style={{ fontSize: '0.7rem' }}>{row.p}%</span>
                    </div>
                  </td>
                  <td className="text-dark small fw-bold py-3 border-bottom-0">{row.s}</td>
                  <td className="py-3 border-bottom-0 pe-4">
                    <span className={`badge bg-${row.stC === 'success' ? 'success-light' : (row.stC === 'blue' ? 'blue-light' : 'light')} text-${row.stC === 'secondary' ? 'secondary' : (row.stC === 'success' ? 'success' : 'blue')} rounded-pill px-2 py-1 fw-medium`} style={{ fontSize: '0.65rem' }}>{row.st}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderEmployeesTable = () => (
    <div>
      <h6 className="fw-bold text-muted mb-3" style={{ fontSize: '0.75rem' }}>Employee Progress — 142 total</h6>
      <div className="bg-white border rounded overflow-hidden shadow-sm">
        <div className="table-responsive">
          <table className="table mb-0 align-middle">
            <thead>
              <tr className="bg-light">
                <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 ps-4" style={{ fontSize: '0.65rem' }}>EMPLOYEE</th>
                <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>ENROLLED</th>
                <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>COMPLETED</th>
                <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>OVERALL PROGRESS</th>
                <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>AVG SCORE</th>
                <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 pe-4 text-end" style={{ fontSize: '0.65rem' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {[
                { n: 'Riya Nair', ini: 'RN', d: 'EMP001 • Engineering', e: 5, c: 2, p: 40, s: '91%' },
                { n: 'Arjun Kumar', ini: 'AK', d: 'EMP042 • Design', e: 4, c: 4, p: 100, s: '88%' },
                { n: 'Devraj Singh', ini: 'DS', d: 'EMP019 • Management', e: 3, c: 1, p: 33, s: '95%' },
              ].map((row, idx) => (
                <tr key={idx} style={{ cursor: 'pointer' }} onClick={() => setSelectedEmployee(row.n)}>
                  <td className="py-3 border-bottom-0 ps-4">
                    <div className="d-flex align-items-center gap-3">
                      <div className="avatar-sm rounded-circle d-flex align-items-center justify-content-center bg-blue text-white fw-bold" style={{ width: 32, height: 32, fontSize: '0.75rem' }}>{row.ini}</div>
                      <div>
                        <div className="fw-bold text-dark small">{row.n}</div>
                        <div className="text-muted" style={{ fontSize: '0.65rem' }}>{row.d}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-dark small fw-bold py-3 border-bottom-0">{row.e}</td>
                  <td className="text-success small fw-bold py-3 border-bottom-0">{row.c}</td>
                  <td className="py-3 border-bottom-0" style={{ width: '150px' }}>
                    <div className="d-flex align-items-center gap-2">
                      <div className="progress bg-light rounded-pill flex-grow-1" style={{ height: '4px' }}>
                        <div className={`progress-bar bg-${row.p === 100 ? 'success' : 'blue'}`} role="progressbar" style={{ width: `${row.p}%` }}></div>
                      </div>
                      <span className="small text-muted" style={{ fontSize: '0.7rem' }}>{row.p}%</span>
                    </div>
                  </td>
                  <td className="text-dark small fw-bold py-3 border-bottom-0">{row.s}</td>
                  <td className="py-3 border-bottom-0 pe-4 text-end">
                    <Button variant="outline" className="btn btn-sm btn-white border px-3 fw-medium text-dark shadow-sm" style={{ fontSize: '0.7rem' }}>View Profile</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {(!selectedEmployee && !selectedQuiz) ? (

        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <Breadcrumb items={['Dashboard', 'Analytics']} />
              <h1 className="page-title m-0">Analytics & Reports</h1>
              <p className="text-muted small m-0 mt-1">Learning insights, completion trends and performance data</p>
            </div>
            <div className="d-flex gap-2">
              <Button variant="secondary" className="btn btn-white border text-dark fw-medium d-flex align-items-center gap-2 px-3">
                Last 30 days <ChevronDown size={14} />
              </Button>
              <Button variant="secondary" className="btn btn-white border text-dark fw-medium d-flex align-items-center gap-2 px-3">
                <Download size={14} /> Export
              </Button>
            </div>
          </div>

          {renderTopAlerts()}
          {renderTopMetrics()}
          {renderToggles()}

          {activeTab === 'Employees' && renderEmployeesTable()}
          {activeTab === 'Courses' && renderCoursesTable()}
          {activeTab === 'Quizzes' && renderQuizzesTable()}
        </>
      ) : selectedQuiz ? (

        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <Breadcrumb items={['Analytics', selectedQuiz]} />
              <h1 className="page-title m-0">{selectedQuiz}</h1>
              <p className="text-muted small m-0 mt-1">Data Privacy & GDPR</p>
            </div>
            <Button variant="secondary" className="btn btn-white border text-dark fw-medium d-flex align-items-center gap-2 px-3">
              <Download size={14} /> Export Quiz Data
            </Button>
          </div>

          {renderToggles()}

          <div className="d-flex justify-content-end mb-4">
             <Button variant="secondary" className="btn btn-white border text-dark fw-medium d-flex align-items-center gap-2 px-3" onClick={resetDrillDowns}>
                <ArrowLeft size={14} /> Back to Analytics
             </Button>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-12 col-md-3">
              <div className="bg-white rounded border p-3 d-flex flex-column h-100 shadow-sm">
                <div className="text-muted small fw-bold text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>TOTAL ATTEMPTS</div>
                <h3 className="fw-bold text-dark m-0">5</h3>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="bg-white rounded border p-3 d-flex flex-column h-100 shadow-sm">
                <div className="text-muted small fw-bold text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>PASS RATE</div>
                <h3 className="fw-bold text-success m-0">60%</h3>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="bg-white rounded border p-3 d-flex flex-column h-100 shadow-sm">
                <div className="text-muted small fw-bold text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>AVG SCORE</div>
                <h3 className="fw-bold text-dark m-0">82%</h3>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="bg-white rounded border p-3 d-flex flex-column h-100 shadow-sm">
                <div className="text-muted small fw-bold text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>TOP SCORE</div>
                <h3 className="fw-bold text-dark m-0">99%</h3>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-12 col-lg-8">
              <div className="bg-white border rounded overflow-hidden shadow-sm h-100">
                <div className="table-responsive">
                  <table className="table mb-0 align-middle">
                    <thead>
                      <tr className="bg-light">
                        <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 ps-4" style={{ fontSize: '0.65rem' }}>EMPLOYEE</th>
                        <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>SCORE</th>
                        <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>RESULT</th>
                        <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>ATTEMPTS</th>
                        <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 pe-4" style={{ fontSize: '0.65rem' }}>LAST ATTEMPT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { n: 'Riya Nair', ini: 'RN', d: 'RNair@company.com', s: '99%', r: 'Pass', rc: 'success', a: '1', l: 'Oct 24, 2023' },
                        { n: 'Arjun Kumar', ini: 'AK', d: 'AKumar@company.com', s: '84%', r: 'Pass', rc: 'success', a: '2', l: 'Oct 23, 2023' },
                        { n: 'Devraj Singh', ini: 'DS', d: 'DSingh@company.com', s: '72%', r: 'Fail', rc: 'danger', a: '1', l: 'Oct 20, 2023' },
                        { n: 'Neha Patel', ini: 'NP', d: 'NPatel@company.com', s: '65%', r: 'Fail', rc: 'danger', a: '3', l: 'Oct 19, 2023' },
                        { n: 'Priya Sharma', ini: 'PS', d: 'PSharma@company.com', s: '88%', r: 'Pass', rc: 'success', a: '1', l: 'Oct 18, 2023' },
                      ].map((row, idx) => (
                        <tr key={idx}>
                          <td className="py-3 border-bottom-0 ps-4">
                            <div className="d-flex align-items-center gap-3">
                              <div className="avatar-sm rounded-circle d-flex align-items-center justify-content-center bg-blue text-white fw-bold" style={{ width: 32, height: 32, fontSize: '0.75rem' }}>{row.ini}</div>
                              <div>
                                <div className="fw-bold text-dark small">{row.n}</div>
                                <div className="text-muted" style={{ fontSize: '0.65rem' }}>{row.d}</div>
                              </div>
                            </div>
                          </td>
                          <td className="text-dark small fw-bold py-3 border-bottom-0">{row.s}</td>
                          <td className="py-3 border-bottom-0">
                            <span className={`badge bg-${row.rc}-light text-${row.rc} rounded px-2 py-1 fw-bold`} style={{ fontSize: '0.65rem' }}>{row.r}</span>
                          </td>
                          <td className="text-dark small fw-bold py-3 border-bottom-0">{row.a}</td>
                          <td className="text-muted small py-3 border-bottom-0 pe-4">{row.l}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="bg-white border rounded p-4 shadow-sm h-100">
                <h6 className="fw-bold text-dark mb-4">Score Distribution</h6>
                <div className="d-flex align-items-end gap-2 mb-2" style={{ height: '200px' }}>
                  <div className="flex-grow-1 bg-light rounded-top position-relative" style={{ height: '10%' }}>
                    <div className="position-absolute w-100 text-center small text-muted" style={{ top: '-20px', fontSize: '0.7rem' }}>1</div>
                  </div>
                  <div className="flex-grow-1 bg-light rounded-top position-relative" style={{ height: '20%' }}>
                    <div className="position-absolute w-100 text-center small text-muted" style={{ top: '-20px', fontSize: '0.7rem' }}>2</div>
                  </div>
                  <div className="flex-grow-1 bg-light rounded-top position-relative" style={{ height: '40%' }}>
                    <div className="position-absolute w-100 text-center small text-muted" style={{ top: '-20px', fontSize: '0.7rem' }}>4</div>
                  </div>
                  <div className="flex-grow-1 bg-blue rounded-top position-relative" style={{ height: '80%' }}>
                    <div className="position-absolute w-100 text-center small fw-bold text-dark" style={{ top: '-20px', fontSize: '0.7rem' }}>8</div>
                  </div>
                  <div className="flex-grow-1 bg-light rounded-top position-relative" style={{ height: '50%' }}>
                    <div className="position-absolute w-100 text-center small text-muted" style={{ top: '-20px', fontSize: '0.7rem' }}>5</div>
                  </div>
                  <div className="flex-grow-1 bg-light rounded-top position-relative" style={{ height: '20%' }}>
                    <div className="position-absolute w-100 text-center small text-muted" style={{ top: '-20px', fontSize: '0.7rem' }}>2</div>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between text-muted mt-2 border-top pt-2" style={{ fontSize: '0.65rem' }}>
                  <span>&lt;50</span>
                  <span>50-60</span>
                  <span>60-70</span>
                  <span>70-80</span>
                  <span>80-90</span>
                  <span>90-100</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : selectedEmployeeCourse ? (

        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <Breadcrumb items={['Analytics', selectedEmployee, selectedCourse || 'Course']} />
              <div className="d-flex align-items-center gap-3">
                <h1 className="page-title m-0">{selectedCourse || 'React Advanced Patterns'}</h1>
                <span className="badge bg-success-light text-success rounded px-2 py-1 fw-bold" style={{ fontSize: '0.65rem' }}>Completed</span>
              </div>
              <p className="text-muted small m-0 mt-1 d-flex align-items-center gap-2">
                <span>Technical</span> <span className="text-muted opacity-50">|</span> <span>12h total</span>
              </p>
            </div>
            <div className="text-end">
              <Button variant="secondary" className="btn btn-white border text-dark fw-medium d-flex align-items-center gap-2 px-3 mb-2" onClick={() => setSelectedCourse(null)}>
                <ArrowLeft size={14} /> Back to Employee
              </Button>
              <div className="small text-muted" style={{ fontSize: '0.7rem' }}>Completed on Apr 22, 2026</div>
            </div>
          </div>

          {renderToggles()}

          <div className="row g-4 mt-2">
            <div className="col-12 col-lg-8">
              <div className="bg-white border rounded shadow-sm h-100 p-4">
                <h6 className="fw-bold text-dark mb-4">Course Modules & Progress</h6>

                <div className="position-relative ms-2">

                  <div className="position-absolute bg-success" style={{ left: '11px', top: '24px', bottom: '24px', width: '2px', zIndex: 0 }}></div>

                  {[
                    { t: 'Introduction to React Patterns', d: '1h 15m', s: '100%', v: 'Completed', c: 'success' },
                    { t: 'Higher-Order Components (HOCs)', d: '2h 30m', s: '100%', v: 'Completed', c: 'success' },
                    { t: 'Render Props and Context API', d: '3h 45m', s: '100%', v: 'Completed', c: 'success' },
                    { t: 'Custom Hooks Architecture', d: '2h 30m', s: '100%', v: 'Completed', c: 'success' },
                    { t: 'Performance Optimization', d: '1h 45m', s: '100%', v: 'Completed', c: 'success' },
                  ].map((mod, idx) => (
                    <div key={idx} className="d-flex gap-3 mb-4 position-relative" style={{ zIndex: 1 }}>
                      <div className={`rounded-circle bg-${mod.c} d-flex align-items-center justify-content-center flex-shrink-0 mt-1`} style={{ width: 24, height: 24 }}>
                        <Check size={14} className="text-white" />
                      </div>
                      <div className="flex-grow-1 bg-light rounded p-3 border">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <div className="fw-bold text-dark small">{mod.t}</div>
                          <span className={`badge bg-${mod.c}-light text-${mod.c} rounded px-2 py-1 fw-bold`} style={{ fontSize: '0.65rem' }}>{mod.s}</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between text-muted" style={{ fontSize: '0.75rem' }}>
                          <div className="d-flex align-items-center gap-1">
                            <Clock size={12} /> {mod.d}
                          </div>
                          <div>{mod.v}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="d-flex flex-column gap-4">
                <div className="bg-white border rounded p-4 shadow-sm">
                  <h6 className="fw-bold text-dark mb-4">Overall Performance</h6>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted small">Final Score</span>
                      <span className="fw-bold text-dark small">94%</span>
                    </div>
                    <div className="progress bg-light rounded-pill" style={{ height: '6px' }}>
                      <div className="progress-bar bg-success" role="progressbar" style={{ width: '94%' }}></div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted small">Time Spent</span>
                      <span className="fw-bold text-dark small">11h 45m</span>
                    </div>
                    <div className="progress bg-light rounded-pill" style={{ height: '6px' }}>
                      <div className="progress-bar bg-blue" role="progressbar" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div className="bg-blue-light text-blue rounded p-3 d-flex align-items-center gap-3 border border-blue">
                    <Activity size={20} className="flex-shrink-0" />
                    <span className="small">Completed <span className="fw-bold">5% faster</span> than company average</span>
                  </div>
                </div>

                <div className="bg-white border rounded p-4 shadow-sm">
                  <h6 className="fw-bold text-dark mb-4">Quiz Results</h6>

                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex align-items-center justify-content-between p-2 rounded bg-light border">
                      <div className="small fw-medium text-dark">HOCs Quiz</div>
                      <span className="badge bg-success-light text-success fw-bold rounded px-2 py-1" style={{ fontSize: '0.7rem' }}>92%</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between p-2 rounded bg-light border">
                      <div className="small fw-medium text-dark">Render Props Quiz</div>
                      <span className="badge bg-success-light text-success fw-bold rounded px-2 py-1" style={{ fontSize: '0.7rem' }}>88%</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between p-2 rounded bg-light border">
                      <div className="small fw-medium text-dark">Custom Hooks Architecture</div>
                      <span className="badge bg-success-light text-success fw-bold rounded px-2 py-1" style={{ fontSize: '0.7rem' }}>100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (

        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Breadcrumb items={['Analytics', selectedEmployee]} />
            <Button variant="secondary" className="btn btn-white border text-dark fw-medium d-flex align-items-center gap-2 px-3" onClick={resetDrillDowns}>
              <ArrowLeft size={14} /> Back to Analytics
            </Button>
          </div>

          {renderToggles()}

          <div className="bg-white border rounded p-4 shadow-sm mb-4 mt-2">
            <div className="d-flex justify-content-between align-items-start">
              <div className="d-flex gap-4 align-items-center">
                <div className="avatar rounded-circle bg-blue text-white d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{ width: 80, height: 80, fontSize: '2rem' }}>
                  {selectedEmployee.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="fw-bold text-dark mb-1">{selectedEmployee}</h3>
                  <div className="d-flex align-items-center gap-3 text-muted small">
                    <span className="d-flex align-items-center gap-1"><User size={14} /> Senior Developer | Engineering</span>
                    <span className="d-flex align-items-center gap-1"><Mail size={14} /> RNair@company.com</span>
                    <span className="badge bg-light text-secondary border">EMP001</span>
                  </div>
                </div>
              </div>
              <div>
                <select className="form-select border-0 bg-light text-dark fw-medium shadow-sm">
                  <option>Select Employee</option>
                  <option>Arjun Kumar</option>
                  <option>Devraj Singh</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-12 col-md-3">
              <div className="bg-white rounded border p-3 d-flex flex-column h-100 shadow-sm">
                <div className="text-muted small fw-bold text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>ENROLLED COURSES</div>
                <h3 className="fw-bold text-dark m-0">5</h3>
              </div>
            </div>
            <div className="col-12 col-md-2">
              <div className="bg-white rounded border p-3 d-flex flex-column h-100 shadow-sm">
                <div className="text-muted small fw-bold text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>COMPLETED</div>
                <h3 className="fw-bold text-success m-0">2</h3>
              </div>
            </div>
            <div className="col-12 col-md-2">
              <div className="bg-white rounded border p-3 d-flex flex-column h-100 shadow-sm">
                <div className="text-muted small fw-bold text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>IN PROGRESS</div>
                <h3 className="fw-bold text-blue m-0">2</h3>
              </div>
            </div>
            <div className="col-12 col-md-2">
              <div className="bg-white rounded border p-3 d-flex flex-column h-100 shadow-sm">
                <div className="text-muted small fw-bold text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>NOT STARTED</div>
                <h3 className="fw-bold text-warning-dark m-0">1</h3>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="bg-white rounded border p-3 d-flex flex-column h-100 shadow-sm">
                <div className="text-muted small fw-bold text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>AVERAGE SCORE</div>
                <h3 className="fw-bold text-dark m-0">91%</h3>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded overflow-hidden shadow-sm">
            <div className="table-responsive">
              <table className="table mb-0 align-middle">
                <thead>
                  <tr className="bg-light">
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 ps-4" style={{ fontSize: '0.65rem', width: '50px' }}>#</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>COURSE NAME</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>STATUS</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>PROGRESS</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>SCORE</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>COMPLETED ON</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 pe-4 text-center" style={{ fontSize: '0.65rem' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { n: 'React Advanced Patterns', st: 'Completed', stC: 'success', p: 100, pC: 'success', s: '94%', c: 'Apr 22, 2026' },
                    { n: 'TypeScript for Frontend', st: 'In Progress', stC: 'blue', p: 65, pC: 'blue', s: '-', c: '-' },
                    { n: 'Micro-frontend Architecture', st: 'In Progress', stC: 'blue', p: 30, pC: 'blue', s: '-', c: '-' },
                    { n: 'State Management with Redux', st: 'Not Started', stC: 'secondary', p: 0, pC: 'light', s: '-', c: '-' },
                    { n: 'Leadership Essentials', st: 'Completed', stC: 'success', p: 100, pC: 'success', s: '88%', c: 'Jan 10, 2026' },
                  ].map((row, idx) => (
                    <tr key={idx}>
                      <td className="text-muted small py-3 border-bottom-0 ps-4">{idx + 1}</td>
                      <td className="text-dark small fw-bold py-3 border-bottom-0">{row.n}</td>
                      <td className="py-3 border-bottom-0">
                        <span className={`badge bg-${row.stC === 'success' ? 'success-light' : (row.stC === 'blue' ? 'blue-light' : 'light')} text-${row.stC === 'secondary' ? 'secondary' : row.stC} rounded-pill px-2 py-1 fw-medium`} style={{ fontSize: '0.65rem' }}>{row.st}</span>
                      </td>
                      <td className="py-3 border-bottom-0" style={{ width: '150px' }}>
                        <div className="d-flex align-items-center gap-2">
                          <div className="progress bg-light rounded-pill flex-grow-1" style={{ height: '4px' }}>
                            <div className={`progress-bar bg-${row.pC}`} role="progressbar" style={{ width: `${row.p}%` }}></div>
                          </div>
                          <span className="small text-muted" style={{ fontSize: '0.7rem' }}>{row.p}%</span>
                        </div>
                      </td>
                      <td className="text-dark small fw-bold py-3 border-bottom-0">{row.s}</td>
                      <td className="text-muted small py-3 border-bottom-0">{row.c}</td>
                      <td className="py-3 border-bottom-0 pe-4 text-center">
                        <Button variant="outline" className="btn btn-sm btn-white border-0 text-muted shadow-none" onClick={() => setSelectedCourse(row.n)}>
                          <Eye size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
