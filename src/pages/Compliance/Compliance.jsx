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
import { complianceService, employeeService } from '../../services';

const Compliance = ({ onTabChange, onNavigateHome }) => {
  const [activeFilter, setActiveFilter] = useState('Policies');
  const [activeSubTab, setActiveSubTab] = useState('By Policies'); 
  const [isAckModalOpen, setIsAckModalOpen] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null); 
  const [selectedEmployee, setSelectedEmployee] = useState(null); 

  const [policies, setPolicies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [acknowledgments, setAcknowledgments] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchComplianceData = async () => {
      const [polRes, catRes, ackRes, empRes] = await Promise.allSettled([
        complianceService.getPolicies(),
        complianceService.getCategories(),
        complianceService.getAcknowledgments(),
        employeeService.getEmployees(),
      ]);

      if (polRes.status === 'fulfilled') {
        const polData = polRes.value;
        setPolicies(Array.isArray(polData) ? polData : (polData?.results || []));
      } else { setPolicies([]); }

      if (catRes.status === 'fulfilled') {
        const catData = catRes.value;
        setCategories(Array.isArray(catData) ? catData : (catData?.results || []));
      } else { setCategories([]); }

      if (ackRes.status === 'fulfilled') {
        const ackData = ackRes.value;
        setAcknowledgments(Array.isArray(ackData) ? ackData : (ackData?.results || []));
      } else { setAcknowledgments([]); }

      if (empRes.status === 'fulfilled') {
        const empData = empRes.value;
        setEmployees(Array.isArray(empData) ? empData : (empData?.results || []));
      } else { setEmployees([]); }
    };
    fetchComplianceData();
  }, []);

  const handleFilterChange = (id) => {
    setActiveFilter(id);
    setSelectedPolicy(null);
    setSelectedEmployee(null);
  };

  const totalEmployeesCount = employees.length > 0 ? employees.length : 4;
  const acknowledgedCount = acknowledgments.filter(a => a.acknowledged).length;
  const pendingCount = Math.max(0, (policies.length * totalEmployeesCount) - acknowledgedCount);

  const dynamicFilters = [
    { id: 'Policies', label: 'Policies', count: policies.length },
    { id: 'Pending', label: 'Pending', count: pendingCount },
    { id: 'My Compliance', label: 'My Compliance', count: policies.length },
    { id: 'Categories', label: 'Categories', count: categories.length },
    { id: 'Acknowledgments', label: 'Acknowledgments', count: acknowledgments.length }
  ];

  const renderPolicyCard = (policy) => (
    <div className="bg-white rounded border p-4 shadow-sm h-100 d-flex flex-column" key={policy?.id}>
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div className="bg-blue-light text-blue rounded p-2 d-inline-flex">
          <Home size={20} />
        </div>
        <span className="badge bg-warning-light text-warning-dark rounded-pill px-2 py-1 fw-semibold" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
          PENDING
        </span>
      </div>
      <h5 className="fw-bold text-dark mb-2">{policy?.title || 'Policy'}</h5>
      <div className="d-flex gap-3 text-muted small mb-3" style={{ fontSize: '0.75rem' }}>
        <span className="d-flex align-items-center gap-1"><Clock size={12} /> Version {policy?.version || '1.0'}</span>
        <span className="d-flex align-items-center gap-1"><Calendar size={12} /> {policy?.effective_date || 'Effective Now'}</span>
      </div>
      <p className="text-muted small mb-4 flex-grow-1" style={{ fontSize: '0.85rem' }}>
        {policy?.summary || policy?.description || 'Company policy requirements and compliance rules.'}
      </p>
      <div className="d-flex gap-2">
        <Button variant="secondary" className="btn btn-white border flex-grow-1 text-blue fw-medium" style={{ fontSize: '0.8rem' }} onClick={() => setIsPolicyModalOpen(true)}>
          Read Full Policy
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="dashboard-container">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <Breadcrumb items={['Dashboard', 'Compliance']} />
            <h1 className="page-title m-0">Compliance & Policy Management</h1>
            <p className="text-muted small m-0 mt-1">Review, acknowledge, and track company policies</p>
          </div>
          <div className="d-flex gap-3">
            <Button variant="secondary" className="btn btn-light bg-white border fw-semibold d-flex align-items-center gap-2">
              <Download size={16} /> Export
            </Button>
            <Button className="btn btn-primary bg-blue border-0 px-4 py-2 fw-semibold d-flex align-items-center shadow-sm" onClick={() => setIsPolicyModalOpen(true)}>
              + Create Policy
            </Button>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-12 col-md-3">
            <div className="bg-white border rounded-3 p-4 d-flex gap-3 align-items-start h-100 shadow-sm">
              <div className={`rounded-3 d-flex justify-content-center align-items-center bg-blue-light text-blue`} style={{ width: '48px', height: '48px' }}>
                <Users size={24} />
              </div>
              <div>
                <h3 className="fw-bold mb-1 text-blue">{totalEmployeesCount}</h3>
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
                <h3 className="fw-bold mb-1 text-purple">{policies.length}</h3>
                <div className="text-dark small fw-medium">Policy Assignments</div>
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
                <h3 className="fw-bold mb-1 text-success">{acknowledgedCount}</h3>
                <div className="text-dark small fw-medium">Acknowledged</div>
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>Completed acknowledgments</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="bg-white border border-warning rounded-3 p-4 d-flex gap-3 align-items-start h-100 shadow-sm">
              <div className={`rounded-3 d-flex justify-content-center align-items-center bg-warning-light text-warning-dark`} style={{ width: '48px', height: '48px' }}>
                <AlertCircle size={24} />
              </div>
              <div>
                <h3 className="fw-bold mb-1 text-warning-dark">{pendingCount}</h3>
                <div className="text-dark small fw-medium">Pending Acknowledgment</div>
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                  {pendingCount === 0 ? 'All compliant' : 'Action required'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 d-flex justify-content-between align-items-center">
          <FilterPills 
            filters={dynamicFilters}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </div>

        {activeFilter === 'Policies' && (
          <div className="position-relative">
            <div className="bg-white rounded border d-flex align-items-center justify-content-between p-1 mb-3 shadow-sm">
              <div className="position-relative flex-grow-1">
                <Search size={16} className="position-absolute text-muted" style={{left: 12, top: 8}} />
                <input type="text" className="form-control form-control-sm border-0 bg-transparent ps-5 py-2 shadow-none" placeholder="Search policy name..." />
              </div>
            </div>

            <div className="bg-white rounded border overflow-hidden shadow-sm">
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead>
                    <tr className="bg-light">
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 ps-4" style={{ fontSize: '0.65rem' }}>POLICY NAME</th>
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>VERSION</th>
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>CATEGORY</th>
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>PRIORITY</th>
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>EFFECTIVE DATE</th>
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>STATUS</th>
                      <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 text-end pe-4" style={{ fontSize: '0.65rem' }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {policies.map((p, idx) => {
                      const title = p.title || `Policy #${p.id || idx + 1}`;
                      const version = p.version || 'v1.0';
                      const category = p.category_name || 'General';
                      const priority = p.priority || 'medium';
                      const effDate = p.effective_date || '2026-01-01';
                      const status = p.status || 'active';

                      return (
                        <tr key={p.id || idx} style={{cursor: 'pointer'}} onClick={() => setSelectedPolicy(title)}>
                          <td className="py-3 border-bottom-0 ps-4">
                            <div className="d-flex align-items-center gap-2">
                              <div className="bg-purple-light text-purple rounded p-1"><FileText size={14} /></div>
                              <span className="text-dark small fw-medium">{title}</span>
                            </div>
                          </td>
                          <td className="text-muted small py-3 border-bottom-0">{version}</td>
                          <td className="text-dark small fw-bold py-3 border-bottom-0">{category}</td>
                          <td className="text-capitalize small fw-bold text-primary py-3 border-bottom-0">{priority}</td>
                          <td className="text-muted small py-3 border-bottom-0">{effDate}</td>
                          <td className="py-3 border-bottom-0">
                            <span className="badge bg-success-light text-success rounded-pill px-2 py-1 d-inline-flex align-items-center gap-1 text-capitalize" style={{ fontSize: '0.65rem' }}>
                              {status}
                            </span>
                          </td>
                          <td className="py-3 border-bottom-0 text-end pe-4">
                            <Button variant="outline" className="btn btn-sm btn-white border px-3 fw-medium text-dark shadow-sm">View</Button>
                          </td>
                        </tr>
                      );
                    })}

                    {policies.length === 0 && (
                      <tr>
                        <td colSpan="7" className="text-center py-4 text-muted">No policies found in database.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeFilter === 'Pending' && (
          <div>
            <h6 className="fw-bold text-dark mb-3">Policies Requiring your Acknowledgement ({pendingCount})</h6>
            {policies.length > 0 ? (
              <div className="row g-4">
                {policies.map(p => (
                  <div className="col-12 col-md-6 col-lg-4" key={p.id}>{renderPolicyCard(p)}</div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded border p-4 text-center text-muted">
                No pending policy acknowledgments required.
              </div>
            )}
          </div>
        )}

        {activeFilter === 'My Compliance' && (
          <div>
            <h6 className="fw-bold text-dark mb-3">My Compliance Status</h6>
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-3">
                <div className="bg-white rounded border p-3 shadow-sm">
                  <div className="small text-muted mb-1" style={{ fontSize: '0.75rem' }}>Total Policies</div>
                  <h3 className="fw-bold text-blue m-0">{policies.length}</h3>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="bg-white rounded border p-3 shadow-sm">
                  <div className="small text-muted mb-1" style={{ fontSize: '0.75rem' }}>Acknowledged</div>
                  <h3 className="fw-bold text-success m-0">{acknowledgedCount}</h3>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="bg-white rounded border p-3 shadow-sm">
                  <div className="small text-muted mb-1" style={{ fontSize: '0.75rem' }}>Pending</div>
                  <h3 className="fw-bold text-warning-dark m-0">{pendingCount}</h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeFilter === 'Categories' && (
          <div>
            <h6 className="fw-bold text-dark mb-3">My Compliance Categories ({categories.length})</h6>
            <div className="row g-3">
              {categories.map((cat, idx) => (
                <div className="col-12 col-md-4" key={cat.id || idx}>
                  <div className="bg-white rounded border p-4 shadow-sm h-100">
                    <h5 className="fw-bold text-dark mb-2">{cat.name || 'Category'}</h5>
                    <p className="text-muted small mb-3">{cat.description || 'Policy compliance category rules.'}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-blue-light text-blue rounded-pill px-2 py-1" style={{ fontSize: '0.7rem' }}>
                        {cat.policy_count || 0} Policies
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {categories.length === 0 && (
                <div className="col-12">
                  <div className="bg-white rounded border p-4 text-center text-muted">
                    No compliance categories found in database.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeFilter === 'Acknowledgments' && (
          <div className="bg-white rounded border overflow-hidden shadow-sm">
            <div className="p-3 border-bottom">
              <h6 className="fw-bold text-dark m-0 small">Policy Acknowledgments ({acknowledgments.length})</h6>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead>
                  <tr className="bg-light">
                    <th className="text-muted small fw-bold text-uppercase border-0 py-3 ps-4" style={{ fontSize: '0.65rem' }}>POLICY</th>
                    <th className="text-muted small fw-bold text-uppercase border-0 py-3" style={{ fontSize: '0.65rem' }}>USER</th>
                    <th className="text-muted small fw-bold text-uppercase border-0 py-3" style={{ fontSize: '0.65rem' }}>STATUS</th>
                    <th className="text-muted small fw-bold text-uppercase border-0 py-3 pe-4" style={{ fontSize: '0.65rem' }}>DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {acknowledgments.map((ack, idx) => (
                    <tr key={ack.id || idx}>
                      <td className="py-3 border-bottom-0 ps-4 text-dark small fw-bold">{ack.policy_title || `Policy #${ack.policy}`}</td>
                      <td className="py-3 border-bottom-0 text-muted small">{ack.user_name || ack.user_email || 'User'}</td>
                      <td className="py-3 border-bottom-0">
                        <span className={`badge bg-${ack.acknowledged ? 'success' : 'warning'}-light text-${ack.acknowledged ? 'success' : 'warning-dark'} rounded-pill px-2 py-1`} style={{ fontSize: '0.65rem' }}>
                          {ack.acknowledged ? 'Acknowledged' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-3 border-bottom-0 pe-4 text-muted small">{ack.acknowledged_at ? ack.acknowledged_at.substring(0, 10) : 'Recently'}</td>
                    </tr>
                  ))}

                  {acknowledgments.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-muted">No policy acknowledgments found in database.</td>
                    </tr>
                  )}
                </tbody>
              </table>
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
