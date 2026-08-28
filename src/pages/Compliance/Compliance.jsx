import { useState, useEffect } from 'react';

import Breadcrumb from '../../components/dashboard/Breadcrumb';
import Modal from '../../components/common/Modal';
import FilterPills from '../../components/common/FilterPills';
import {
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Home,
  Search,
  Download,
  Send,
  RefreshCw,
  FileText,
  Users,
  X,
} from 'lucide-react';
import './Compliance.css';
import Button from '../../components/common/Button';
import { filters } from '../../data/complianceFiltersData';
import { complianceService, withFallback } from '../../services';

const Compliance = ({ onTabChange, onNavigateHome }) => {
  const [activeFilter, setActiveFilter] = useState('Policies');
  const [activeSubTab, setActiveSubTab] = useState('By Policies'); 
  const [isAckModalOpen, setIsAckModalOpen] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null); 
  const [selectedEmployee, setSelectedEmployee] = useState(null); 
  const [policies, setPolicies] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCompliance = async () => {
      const polData = await withFallback(complianceService.getPolicies(), []);
      const catData = await withFallback(complianceService.getCategories(), []);
      setPolicies(polData);
      setCategories(catData);
    };
    fetchCompliance();
  }, []);

  const handleFilterChange = (id) => {
    setActiveFilter(id);
    setSelectedPolicy(null);
    setSelectedEmployee(null);
  };

  const renderPolicyCard = () => (
    <div className="bg-white rounded border p-4 shadow-sm h-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div className="bg-blue-light text-blue rounded p-2 d-inline-flex">
          <Home size={20} />
        </div>
        <span className="badge bg-warning-light text-warning-dark rounded-pill px-2 py-1 fw-semibold" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
          PENDING
        </span>
      </div>
      <h5 className="fw-bold text-dark mb-2">Remote Work Policy</h5>
      <div className="d-flex gap-3 text-muted small mb-3" style={{ fontSize: '0.75rem' }}>
        <span className="d-flex align-items-center gap-1"><Clock size={12} /> Version 2.4</span>
        <span className="d-flex align-items-center gap-1"><Calendar size={12} /> Oct 24, 2023</span>
      </div>
      <p className="text-muted small mb-4 flex-grow-1" style={{ fontSize: '0.85rem' }}>
        Guidelines for maintaining operational security and productivity while working from non-traditional locations. Includes VPN requirements.
      </p>
      <div className="d-flex gap-2">
        <Button variant="secondary" className="btn btn-white border flex-grow-1 text-blue fw-medium" style={{ fontSize: '0.8rem' }} onClick={() => setIsPolicyModalOpen(true)}>
          Read Full Policy
        </Button>
        <Button className="btn btn-primary bg-blue border-0 flex-grow-1 fw-medium" style={{ fontSize: '0.8rem' }} onClick={() => setIsAckModalOpen(true)}>
          Acknowledge
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="dashboard-container">

        <div className="mb-4">
          <Breadcrumb items={['Dashboard', 'Compliance']} />
          <h1 className="page-title m-0">Compliance & Policy Management</h1>
          <p className="text-muted small m-0 mt-1">Review, acknowledge, and track company policies</p>
        </div>

        <div className="d-flex align-items-center mb-4 gap-3">
          <div className="btn-group bg-white rounded-pill p-1 shadow-sm border">
            <Button 
              variant="ghost" 
              className={`btn btn-sm rounded-pill px-4 fw-medium ${activeSubTab === 'By Employees' ? 'bg-blue-light text-blue' : 'text-muted'}`}
              onClick={() => { setActiveSubTab('By Employees'); setSelectedPolicy(null); setSelectedEmployee(null); }}
            >
              By Employees
            </Button>
            <Button 
              variant="ghost" 
              className={`btn btn-sm rounded-pill px-4 fw-medium ${activeSubTab === 'By Policies' ? 'bg-blue-light text-blue' : 'text-muted'}`}
              onClick={() => { setActiveSubTab('By Policies'); setSelectedPolicy(null); setSelectedEmployee(null); }}
            >
              By Policies
            </Button>
          </div>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-12 col-md-3">
            <div className="bg-white border rounded-3 p-4 d-flex gap-3 align-items-start h-100 shadow-sm">
              <div className={`rounded-3 d-flex justify-content-center align-items-center bg-blue-light text-blue`} style={{ width: '48px', height: '48px' }}>
                <Users size={24} />
              </div>
              <div>
                <h3 className="fw-bold mb-1 text-blue">142</h3>
                <div className="text-dark small fw-medium">Total Employees</div>
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>Across all departments</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="bg-white border rounded-3 p-4 d-flex gap-3 align-items-start h-100 shadow-sm">
              <div className={`rounded-3 d-flex justify-content-center align-items-center bg-purple-light text-purple`} style={{ width: '48px', height: '48px' }}>
                <FileText size={24} />
              </div>
              <div>
                <h3 className="fw-bold mb-1 text-purple">8</h3>
                <div className="text-dark small fw-medium">Policies Assigned</div>
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>Active company policies</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="bg-white border rounded-3 p-4 d-flex gap-3 align-items-start h-100 shadow-sm">
              <div className={`rounded-3 d-flex justify-content-center align-items-center bg-success-light text-success`} style={{ width: '48px', height: '48px' }}>
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 className="fw-bold mb-1 text-success">1,024</h3>
                <div className="text-dark small fw-medium">Acknowledged</div>
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>86% acknowledgment rate</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="bg-white border border-warning rounded-3 p-4 d-flex gap-3 align-items-start h-100 shadow-sm">
              <div className={`rounded-3 d-flex justify-content-center align-items-center bg-warning-light text-warning-dark`} style={{ width: '48px', height: '48px' }}>
                <AlertCircle size={24} />
              </div>
              <div>
                <h3 className="fw-bold mb-1 text-warning-dark">168</h3>
                <div className="text-dark small fw-medium">Pending Acknowledgment</div>
                <div className="text-warning-dark d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
                  <AlertCircle size={12} /> Needs attention
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 d-flex justify-content-between align-items-center">
          <FilterPills 
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
          {activeFilter === 'Acknowledgments' && (
            <div className="d-flex gap-2">
              <div className="position-relative">
                <Search size={14} className="position-absolute text-muted" style={{left: 10, top: 10}} />
                <input type="text" className="form-control form-control-sm text-muted ps-4" placeholder="Search policy or user..." style={{width: 200}} />
              </div>
              <select className="form-select form-select-sm text-muted" style={{width: 150}}>
                <option>All Policies</option>
              </select>
            </div>
          )}
        </div>

        {activeFilter === 'Categories' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold text-dark m-0">Policy Categories</h6>
              <Button className="btn btn-sm btn-primary bg-blue border-0 px-3 fw-medium shadow-sm d-flex align-items-center">+ Add Category</Button>
            </div>

            <div className="bg-white rounded border overflow-hidden shadow-sm">
              <div className="table-responsive">
                <table className="table mb-0 align-middle">
                  <thead>
                    <tr className="bg-light">
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 ps-4" style={{ fontSize: '0.65rem' }}>NAME</th>
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>DESCRIPTION</th>
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>POLICIES</th>
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 text-end pe-4" style={{ fontSize: '0.65rem' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {n: 'Health & Safety', d: 'Workplace health, safety regulations, and emergency procedures', p: 2},
                      {n: 'HR & Benefits', d: 'Human resources policies, benefits, and employee programs', p: 3},
                      {n: 'IT & Technology', d: 'IT usage policies, software guidelines, and technology standards', p: 2},
                      {n: 'Security & Privacy', d: 'Updated: Policies related to data security, privacy, and information protection', p: 1},
                      {n: 'Workplace Conduct', d: 'Guidelines for professional behavior and workplace ethics', p: 2}
                    ].map((row, index) => (
                      <tr key={index}>
                        <td className="text-dark small fw-bold py-3 border-bottom-0 ps-4">{row.n}</td>
                        <td className="text-muted small py-3 border-bottom-0">{row.d}</td>
                        <td className="py-3 border-bottom-0">
                          <span className="badge bg-blue-light text-blue rounded-pill px-2 py-1" style={{ fontSize: '0.7rem' }}>{row.p}</span>
                        </td>
                        <td className="py-3 border-bottom-0 text-end pe-4">
                          <Button variant="icon" className="btn btn-light rounded border px-2 py-1 bg-white shadow-sm text-muted">
                            <span style={{lineHeight: 1}}>...</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeFilter === 'Acknowledgments' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-2">
                <h6 className="fw-bold text-dark m-0">All Acknowledgments</h6>
                <span className="text-muted small">Showing 10 records</span>
              </div>
              <div className="d-flex gap-2">
                <Button variant="outline" className="btn btn-sm btn-white border px-3 fw-medium text-dark d-flex align-items-center shadow-sm">
                  <Clock size={14} className="me-2" /> History
                </Button>
                <Button className="btn btn-sm btn-primary bg-blue border-0 px-3 fw-medium shadow-sm d-flex align-items-center">
                  <Download size={14} className="me-2" /> Export Report
                </Button>
              </div>
            </div>

            <div className="bg-white rounded border overflow-hidden shadow-sm">
              <div className="table-responsive">
                <table className="table mb-0 align-middle">
                  <thead>
                    <tr className="bg-light">
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 ps-4" style={{ fontSize: '0.65rem' }}>POLICY</th>
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>USER</th>
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>ACKNOWLEDGED AT</th>
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>IP ADDRESS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {p: 'Social Media Policy', u: 'Admin User', d: '1/1/1970, 5:30:00 AM'},
                      {p: 'Social Media Policy', u: 'John Doe', d: '1/1/1970, 5:30:00 AM'},
                      {p: 'Social Media Policy', u: 'Jane Doe sr.', d: '1/1/1970, 5:30:00 AM'},
                      {p: 'Social Media Policy', u: 'Srinivas Kandagatla', d: '1/1/1970, 5:30:00 AM'},
                      {p: 'Social Media Policy', u: 'Emp Test', d: '1/1/1970, 5:30:00 AM'},
                      {p: 'Acceptable Use of Technology Policy', u: 'Admin User', d: '1/1/1970, 5:30:00 AM'},
                      {p: 'Remote Work Policy', u: 'Srinivas Kandagatla', d: '1/1/1970, 5:30:00 AM'}
                    ].map((row, index) => (
                      <tr key={index}>
                        <td className="text-dark small fw-medium py-3 border-bottom-0 ps-4">{row.p}</td>
                        <td className="text-dark small py-3 border-bottom-0">{row.u}</td>
                        <td className="text-muted small py-3 border-bottom-0">{row.d}</td>
                        <td className="text-muted small py-3 border-bottom-0">&mdash;</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeFilter === 'Policies' && activeSubTab === 'By Policies' && (
          <div className="position-relative">
            <div className="bg-white rounded border d-flex align-items-center justify-content-between p-1 mb-3 shadow-sm">
              <div className="position-relative flex-grow-1">
                <Search size={16} className="position-absolute text-muted" style={{left: 12, top: 8}} />
                <input type="text" className="form-control form-control-sm border-0 bg-transparent ps-5 py-2 shadow-none" placeholder="Search policy name..." />
              </div>
              <div style={{width: '120px', borderLeft: '1px solid #dee2e6'}} className="ps-2">
                <select className="form-select form-select-sm border-0 bg-transparent text-dark fw-medium shadow-none">
                  <option>All Status</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded border overflow-hidden shadow-sm">
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead>
                    <tr className="bg-light">
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 ps-4" style={{ fontSize: '0.65rem' }}>POLICY NAME</th>
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>TOTAL ASSIGNED</th>
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>ACKNOWLEDGED</th>
                      {selectedPolicy ? (
                        <>
                          <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>PROGRESS</th>
                        </>
                      ) : (
                        <>
                          <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>PENDING</th>
                          <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>COVERAGE</th>
                          <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>STATUS</th>
                          <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 text-end" style={{ fontSize: '0.65rem' }}>ACTION</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {n: 'Code of Conduct', a: 142, ac: 138, p: 4, pct: 97, stat: 'Partial'},
                      {n: 'Data Privacy & GDPR Policy', a: 142, ac: 121, p: 21, pct: 85, stat: 'Partial'},
                      {n: 'Remote Work Policy', a: 98, ac: 85, p: 13, pct: 87, stat: 'Partial'},
                      {n: 'Anti-Harassment Policy', a: 142, ac: 140, p: 2, pct: 99, stat: 'Partial'},
                      {n: 'IT Security Policy', a: 142, ac: 110, p: 32, pct: 77, stat: 'Partial'},
                      {n: 'Leave & Attendance Policy', a: 142, ac: 136, p: 6, pct: 96, stat: 'Partial'},
                      {n: 'Expense Reimbursement Policy', a: 87, ac: 72, p: 15, pct: 83, stat: 'Partial'},
                      {n: 'Grievance Redressal Policy', a: 142, ac: 122, p: 20, pct: 86, stat: 'Partial'}
                    ].map((row, index) => (
                      <tr key={index} style={{cursor: 'pointer'}} onClick={() => setSelectedPolicy(row.n)}>
                        <td className="py-3 border-bottom-0 ps-4">
                          <div className="d-flex align-items-center gap-2">
                            <div className="bg-purple-light text-purple rounded p-1"><FileText size={14} /></div>
                            <span className="text-dark small fw-medium">{row.n}</span>
                          </div>
                        </td>
                        <td className="text-dark small fw-bold py-3 border-bottom-0">{row.a}</td>
                        <td className="text-success small fw-bold py-3 border-bottom-0">{row.ac}</td>
                        {selectedPolicy ? (
                          <td className="py-3 border-bottom-0" style={{width: '200px'}}>
                            <div className="progress bg-light rounded-pill" style={{ height: '4px' }}>
                              <div className="progress-bar bg-success rounded-pill" role="progressbar" style={{ width: `${row.pct}%` }}></div>
                            </div>
                          </td>
                        ) : (
                          <>
                            <td className="text-warning-dark small fw-bold py-3 border-bottom-0">{row.p}</td>
                            <td className="py-3 border-bottom-0" style={{width: '200px'}}>
                              <div className="d-flex align-items-center gap-2">
                                <div className="progress bg-light rounded-pill flex-grow-1" style={{ height: '4px' }}>
                                  <div className={`progress-bar ${row.pct > 90 ? 'bg-success' : 'bg-warning'}`} role="progressbar" style={{ width: `${row.pct}%` }}></div>
                                </div>
                                <span className="small text-muted" style={{fontSize: '0.7rem'}}>{row.pct}%</span>
                              </div>
                            </td>
                            <td className="py-3 border-bottom-0">
                              <span className="badge bg-warning-light text-warning-dark rounded-pill px-2 py-1 d-inline-flex align-items-center gap-1" style={{ fontSize: '0.65rem' }}>
                                <div className="rounded-circle bg-warning-dark" style={{width: 4, height: 4}}></div>
                                {row.stat}
                              </span>
                            </td>
                            <td className="py-3 border-bottom-0 text-end">
                              <Button variant="outline" className="btn btn-sm btn-white border px-3 fw-medium text-dark shadow-sm">View</Button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeFilter === 'Policies' && activeSubTab === 'By Employees' && (
          <div className="position-relative">
            <div className="bg-white rounded border d-flex align-items-center justify-content-between p-1 mb-3 shadow-sm">
              <div className="position-relative flex-grow-1">
                <Search size={16} className="position-absolute text-muted" style={{left: 12, top: 8}} />
                <input type="text" className="form-control form-control-sm border-0 bg-transparent ps-5 py-2 shadow-none" placeholder="Search employee name or ID..." />
              </div>
              <div className="d-flex align-items-center border-start ps-2 gap-2">
                <div style={{width: '130px'}}>
                  <select className="form-select form-select-sm border-0 bg-transparent text-dark fw-medium shadow-none">
                    <option>All Departments</option>
                  </select>
                </div>
                <div style={{width: '120px', borderLeft: '1px solid #dee2e6'}} className="ps-2">
                  <select className="form-select form-select-sm border-0 bg-transparent text-dark fw-medium shadow-none">
                    <option>All Status</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded border overflow-hidden shadow-sm">
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead>
                    <tr className="bg-light">
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 ps-4" style={{ fontSize: '0.65rem' }}>EMPLOYEE</th>
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>ASSIGNED</th>
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>ACKNOWLEDGED</th>
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>PENDING</th>
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>PROGRESS</th>
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>STATUS</th>
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 text-end pe-4" style={{ fontSize: '0.65rem' }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {n: 'Srinivas Kandagatla', d: 'EMP011 • Engineering', a: 8, ac: 8, p: 0, pct: 100, initials: 'SK', color: 'success', stat: 'Compliant'},
                      {n: 'Rahul Sharma', d: 'EMP002 • Engineering', a: 8, ac: 6, p: 2, pct: 75, initials: 'RS', color: 'warning-dark', stat: 'Non-Compliant'},
                      {n: 'Priya Nair', d: 'EMP001 • Management', a: 8, ac: 8, p: 0, pct: 100, initials: 'PN', color: 'success', stat: 'Compliant'},
                      {n: 'Ananya Reddy', d: 'EMP007 • Design', a: 8, ac: 5, p: 3, pct: 63, initials: 'AR', color: 'warning-dark', stat: 'Non-Compliant'},
                      {n: 'Emp Test', d: 'EMP003 • HR', a: 8, ac: 8, p: 0, pct: 100, initials: 'ET', color: 'success', stat: 'Compliant'},
                      {n: 'Kiran Patel', d: 'EMP014 • Finance', a: 8, ac: 7, p: 1, pct: 88, initials: 'KP', color: 'warning-dark', stat: 'Non-Compliant'},
                      {n: 'Divya Menon', d: 'EMP019 • Marketing', a: 8, ac: 4, p: 4, pct: 50, initials: 'DM', color: 'warning-dark', stat: 'Non-Compliant'},
                      {n: 'Arjun Varma', d: 'EMP023 • Engineering', a: 8, ac: 8, p: 0, pct: 100, initials: 'AV', color: 'success', stat: 'Compliant'}
                    ].map((row, index) => (
                      <tr key={index} style={{cursor: 'pointer'}} onClick={() => setSelectedEmployee(row.n)}>
                        <td className="py-3 border-bottom-0 ps-4">
                          <div className="d-flex align-items-center gap-3">
                            <div className={`avatar-sm rounded-circle d-flex align-items-center justify-content-center bg-light text-${row.color} fw-bold`} style={{width: 32, height: 32, fontSize: '0.75rem'}}>{row.initials}</div>
                            <div>
                              <div className="fw-bold text-dark small">{row.n}</div>
                              <div className="text-muted" style={{fontSize: '0.65rem'}}>{row.d}</div>
                            </div>
                          </div>
                        </td>
                        <td className="text-dark small fw-bold py-3 border-bottom-0">{row.a}</td>
                        <td className="text-success small fw-bold py-3 border-bottom-0">{row.ac}</td>
                        <td className="text-warning-dark small fw-bold py-3 border-bottom-0">{row.p}</td>
                        <td className="py-3 border-bottom-0" style={{width: '180px'}}>
                          <div className="d-flex align-items-center gap-2">
                            <div className="progress bg-light rounded-pill flex-grow-1" style={{ height: '4px' }}>
                              <div className={`progress-bar bg-${row.color === 'success' ? 'success' : 'warning'}`} role="progressbar" style={{ width: `${row.pct}%` }}></div>
                            </div>
                            <span className="small text-muted" style={{fontSize: '0.7rem'}}>{row.pct}%</span>
                          </div>
                        </td>
                        <td className="py-3 border-bottom-0">
                          <span className={`badge bg-${row.color === 'success' ? 'success' : 'danger'}-light text-${row.color === 'success' ? 'success' : 'danger'} rounded-pill px-2 py-1 d-inline-flex align-items-center gap-1`} style={{ fontSize: '0.65rem' }}>
                            <div className={`rounded-circle bg-${row.color === 'success' ? 'success' : 'danger'}`} style={{width: 4, height: 4}}></div>
                            {row.stat}
                          </span>
                        </td>
                        <td className="py-3 border-bottom-0 text-end pe-4">
                          <Button variant="outline" className="btn btn-sm btn-white border px-3 fw-medium text-dark shadow-sm" style={{ fontSize: '0.7rem' }}>View Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-3 border-top bg-white d-flex align-items-center justify-content-between">
                <div className="small text-muted">Showing 1-8 of 142 employees</div>
                <div className="d-flex gap-1">
                  <Button variant="outline" className="btn btn-sm btn-white border text-muted px-2">&lsaquo;</Button>
                  <Button className="btn btn-sm btn-primary bg-blue border-0 px-3">1</Button>
                  <Button variant="outline" className="btn btn-sm btn-white border text-muted px-3">2</Button>
                  <Button variant="outline" className="btn btn-sm btn-white border text-muted px-3">3</Button>
                  <Button variant="outline" className="btn btn-sm btn-white border text-muted px-2">&rsaquo;</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeFilter === 'Pending' && (
          <div>
            <h6 className="fw-bold text-dark mb-3">Policies Requiring your Acknowledgement</h6>
            <div className="row g-4">
              <div className="col-12 col-md-6 col-lg-4">{renderPolicyCard()}</div>
              <div className="col-12 col-md-6 col-lg-4">{renderPolicyCard()}</div>
              <div className="col-12 col-md-6 col-lg-4">{renderPolicyCard()}</div>
            </div>
          </div>
        )}

        {activeFilter === 'My Compliance' && (
          <div>
            <h6 className="fw-bold text-dark mb-3">My Compliance Status</h6>
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-3">
                <div className="bg-white rounded border p-3 shadow-sm">
                  <div className="small text-muted mb-1" style={{ fontSize: '0.75rem' }}>Total Policies</div>
                  <h3 className="fw-bold text-blue m-0">4</h3>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="bg-white rounded border p-3 shadow-sm">
                  <div className="small text-muted mb-1" style={{ fontSize: '0.75rem' }}>Acknowledged</div>
                  <h3 className="fw-bold text-success m-0">3</h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedPolicy && (
          <div 
            className="position-fixed top-0 start-0 w-100 h-100" 
            style={{ backgroundColor: 'rgba(0,0,0,0.2)', zIndex: 1050 }}
            onClick={() => setSelectedPolicy(null)}
          >
            <div 
              className="position-absolute top-0 end-0 h-100 bg-white shadow-lg overflow-auto" 
              style={{ width: '450px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-bottom d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="fw-bold text-dark mb-1">Acknowledgment History</h5>
                  <div className="text-muted small">Complete audit trail of policy acknowledgments</div>
                </div>
                <Button variant="icon" className="btn btn-light rounded-circle p-1 border-0 bg-light" onClick={() => setSelectedPolicy(null)}>
                  <X size={18} className="text-muted" />
                </Button>
              </div>
              <div className="p-4 bg-light border-bottom d-flex gap-2">
                <div className="position-relative flex-grow-1">
                  <Search size={14} className="position-absolute text-muted" style={{left: 10, top: 10}} />
                  <input type="text" className="form-control form-control-sm text-muted ps-4" placeholder="Search policy or employee..." />
                </div>
                <Button variant="outline" className="btn btn-sm btn-white border fw-medium text-dark px-3">All Actions</Button>
              </div>
              <div className="p-4">
                {[
                  {n: 'Code of Conduct', u: 'Srinivas Kandagatla • EMP011', s: 'Acknowledged', d: '2025-12-01 09:15', c: 'success'},
                  {n: 'Anti-Harassment Policy', u: 'Srinivas Kandagatla • EMP011', s: 'Acknowledged', d: '2025-12-01 09:18', c: 'success'},
                  {n: 'Data Privacy & GDPR Policy', u: 'Rahul Sharma • EMP002', s: 'Acknowledged', d: '2025-12-02 14:33', c: 'success'},
                  {n: 'IT Security Policy', u: 'Ananya Reddy • EMP007', s: 'Pending', d: '—', c: 'warning'}
                ].map((item, idx) => (
                  <div key={idx} className="d-flex align-items-start gap-3 mb-4 border-bottom pb-4">
                    <div className={`rounded-circle bg-${item.c} mt-1`} style={{width: 8, height: 8}}></div>
                    <div className="flex-grow-1">
                      <div className="fw-bold text-dark small mb-1">{item.n}</div>
                      <div className="text-muted d-flex align-items-center gap-1" style={{fontSize: '0.7rem'}}>
                        {item.u} • <span className={`text-${item.c === 'success' ? 'dark' : 'muted'} fw-medium`}>{item.s}</span>
                      </div>
                    </div>
                    <div className="text-muted" style={{fontSize: '0.65rem'}}>{item.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedEmployee && (
          <div 
            className="position-fixed top-0 start-0 w-100 h-100" 
            style={{ backgroundColor: 'rgba(0,0,0,0.2)', zIndex: 1050 }}
            onClick={() => setSelectedEmployee(null)}
          >
            <div 
              className="position-absolute top-0 end-0 h-100 bg-white shadow-lg overflow-auto" 
              style={{ width: '450px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-bottom d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="fw-bold text-dark mb-1">{selectedEmployee}</h5>
                  <div className="text-muted small" style={{fontSize: '0.7rem'}}>EMP011 • Junior Developer L1</div>
                </div>
                <Button variant="icon" className="btn btn-light rounded-circle p-1 border-0 bg-light" onClick={() => setSelectedEmployee(null)}>
                  <X size={18} className="text-muted" />
                </Button>
              </div>
              <div className="p-4">
                <div className="bg-light rounded-3 p-3 mb-3 d-flex align-items-center gap-3">
                  <div className="avatar-md rounded bg-blue text-white fw-bold d-flex align-items-center justify-content-center" style={{width: 48, height: 48}}>SK</div>
                  <div>
                    <div className="fw-bold text-dark small">{selectedEmployee}</div>
                    <div className="text-muted" style={{fontSize: '0.7rem'}}>EMP011 • Engineering • Junior Developer L1</div>
                  </div>
                </div>
                <div className="bg-white border rounded-3 p-4 mb-4 d-flex align-items-center gap-4 border-success">
                  <div className="position-relative rounded-circle d-flex align-items-center justify-content-center" style={{width: 60, height: 60, border: '4px solid #f8f9fa', borderTopColor: '#f59e0b', borderRightColor: '#f59e0b', borderBottomColor: '#f59e0b'}}>
                    <span className="fw-bold text-warning-dark" style={{fontSize: '0.85rem'}}>63%</span>
                  </div>
                  <div>
                    <div className="fw-bold text-dark mb-1">Partially Compliant</div>
                    <div className="text-muted" style={{fontSize: '0.75rem'}}>5 of 8 policies acknowledged - 3 pending</div>
                  </div>
                </div>

                <div className="d-flex gap-4 border-bottom mb-4">
                  <div className="text-blue fw-semibold pb-2 border-bottom border-blue border-2" style={{fontSize: '0.8rem', cursor: 'pointer'}}>Policies</div>
                  <div className="text-muted pb-2" style={{fontSize: '0.8rem', cursor: 'pointer'}}>History</div>
                </div>

                <div className="text-muted fw-bold text-uppercase tracking-wide mb-3" style={{fontSize: '0.65rem'}}>ASSIGNED POLICIES (8)</div>
                <div className="d-flex flex-column gap-3 mb-4">
                  {[
                    {n: 'Code of Conduct', d: '2025-12-01 09:15', s: 'Acknowledged', c: 'success'},
                    {n: 'Remote Work Policy', d: 'Not yet acknowledged', s: 'Pending', c: 'warning'},
                    {n: 'IT Security Policy', d: 'Not yet acknowledged', s: 'Pending', c: 'warning'}
                  ].map((pol, i) => (
                    <div key={i} className={`bg-white border rounded-3 p-3 d-flex justify-content-between align-items-center ${pol.c === 'warning' ? 'border-warning' : ''}`}>
                      <div className="d-flex gap-3 align-items-start">
                        {pol.c === 'warning' && <AlertCircle size={16} className="text-warning-dark mt-1" />}
                        <div>
                          <div className="fw-bold text-dark small mb-1">{pol.n}</div>
                          <div className="text-muted" style={{fontSize: '0.7rem'}}>{pol.c === 'success' ? 'Acknowledged: ' : ''}{pol.d}</div>
                        </div>
                      </div>
                      <div className={`badge bg-${pol.c}-light text-${pol.c === 'warning' ? 'warning-dark' : 'success'} rounded-pill d-flex align-items-center gap-1 px-2`}>
                        <div className={`rounded-circle bg-${pol.c === 'warning' ? 'warning-dark' : 'success'}`} style={{width: 4, height: 4}}></div>
                        {pol.s}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-top bg-white d-flex gap-2 sticky-bottom">
                <Button className="btn btn-warning-light text-warning-dark border border-warning flex-grow-1 fw-medium d-flex justify-content-center align-items-center gap-2">
                  <Send size={14} /> Send Reminder
                </Button>
                <Button className="btn btn-white border text-dark flex-grow-1 fw-medium d-flex justify-content-center align-items-center gap-2">
                  <RefreshCw size={14} /> Reassign Policy
                </Button>
              </div>
            </div>
          </div>
        )}

        <Modal
          isOpen={isAckModalOpen}
          onClose={() => setIsAckModalOpen(false)}
          maxWidth="450px"
        >
          <div className="d-flex flex-column align-items-center text-center p-2">
            <div className="d-flex align-items-center gap-2 mb-4 w-100 justify-content-center">
              <div className="bg-blue-light text-blue rounded p-1 d-inline-flex border border-blue">
                <Home size={16} />
              </div>
              <span className="small fw-bold text-dark text-uppercase tracking-wide" style={{ fontSize: '0.75rem' }}>REMOTE WORK POLICY</span>
            </div>

            <h4 className="fw-bold text-dark mb-4">Confirm Acknowledgment</h4>

            <p className="text-dark mb-4 px-2" style={{ fontSize: '0.95rem' }}>
              By clicking confirm, you certify that you have read and understood the <span className="fw-bold">Data Integrity &amp; Ethical Governance Protocol</span>.
            </p>

            <div className="bg-light border rounded p-3 mb-4 d-flex align-items-start text-start mx-2">
              <AlertCircle size={16} className="text-muted mt-1 me-2 flex-shrink-0" />
              <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                This action will be permanently recorded in the <span className="fw-bold text-dark">Audit Trail</span> and associated with your employee record for compliance verification.
              </span>
            </div>

            <Button className="btn btn-primary bg-blue border-0 w-100 py-2 mb-3 fw-semibold d-flex justify-content-center align-items-center gap-2" onClick={() => setIsAckModalOpen(false)}>
              Confirm &amp; Acknowledged <CheckCircle2 size={16} />
            </Button>
            <Button variant="secondary" className="btn btn-white border w-100 py-2 fw-semibold text-dark" onClick={() => setIsAckModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </Modal>

        <Modal
          isOpen={isPolicyModalOpen}
          onClose={() => setIsPolicyModalOpen(false)}
          title={<span className="fw-bold text-dark">Policy Details</span>}
          maxWidth="700px"
        >
          <div className="position-relative" style={{ minHeight: '500px' }}>
            <div className="d-flex align-items-center gap-3 mb-4 mt-2">
              <h2 className="fw-bold text-dark m-0">Social Media Policy</h2>
              <span className="badge bg-light text-secondary border rounded-pill px-2 py-1 fw-semibold tracking-wide" style={{ fontSize: '0.65rem' }}>ARCHIVED</span>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-3">
                <div className="small text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>CATEGORY</div>
                <div className="text-dark small">Communications</div>
              </div>
              <div className="col-3">
                <div className="small text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>VERSION</div>
                <div className="text-dark small">2.4.1</div>
              </div>
              <div className="col-3">
                <div className="small text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>EFFECTIVE DATE</div>
                <div className="text-dark small">Jan 12, 2023</div>
              </div>
              <div className="col-3">
                <div className="small text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>CREATED DATE</div>
                <div className="text-dark small">Oct 05, 2022 &bull; 14:32</div>
              </div>
            </div>

            <div className="bg-white border shadow-sm rounded-4 p-5 mb-5" style={{ height: '350px', overflowY: 'hidden', position: 'relative' }}>
              <h4 className="fw-bold text-dark mb-4"># Social Media Policy</h4>
              <p className="text-dark mb-4" style={{ fontSize: '0.95rem' }}>
                This policy outlines the standards of conduct expected of all employees when using social media platforms, whether for professional or personal use.
              </p>
              <h6 className="fw-bold text-dark mb-3">## Guidelines</h6>

              <div className="d-flex align-items-start mb-3">
                <span className="fw-bold text-dark me-3">01.</span>
                <span className="text-dark" style={{ fontSize: '0.9rem' }}>Maintain professional integrity and transparency in all digital interactions representing the organization.</span>
              </div>
              <div className="d-flex align-items-start mb-3">
                <span className="fw-bold text-dark me-3">02.</span>
                <span className="text-dark" style={{ fontSize: '0.9rem' }}>Confidential information, including trade secrets and client data, must never be shared on public platforms.</span>
              </div>
              <div className="d-flex align-items-start mb-3">
                <span className="fw-bold text-dark me-3">03.</span>
                <span className="text-dark" style={{ fontSize: '0.9rem' }}>Personal opinions should be clearly labeled as such and not attributed to the company's official stance.</span>
              </div>

              <div className="position-absolute bottom-0 start-0 w-100" style={{ height: '150px', background: 'linear-gradient(transparent, white)' }}></div>
            </div>

            <div className="position-absolute w-100 d-flex justify-content-center" style={{ bottom: '20px' }}>
              <Button className="btn btn-primary bg-blue border-0 px-5 py-2 rounded-pill fw-medium shadow-sm" onClick={() => setIsPolicyModalOpen(false)}>Close</Button>
            </div>
          </div>
        </Modal>

      </div>
    </>
  );
};

export default Compliance;
