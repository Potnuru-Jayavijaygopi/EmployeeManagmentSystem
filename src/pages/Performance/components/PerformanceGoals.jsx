import React, { useState } from 'react';
import { Search, Edit2, Settings, List, CheckCircle, BarChart2, Folder, Filter, ArrowUpDown, Lightbulb, MoreHorizontal } from 'lucide-react';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';

const PerformanceGoals = () => {
  const [activeTab, setActiveTab] = useState('goals');

  return (
    <div className="d-flex flex-column gap-4">

      <div className="d-flex justify-content-end gap-2">
        <Button variant="outline" className="btn-system btn-system-size-sm btn-system-outline bg-white text-dark border-secondary">
          <Settings size={14} className="me-2" /> Manage Categories
        </Button>
        <Button variant="outline" className="btn-system btn-system-size-sm btn-system-outline bg-white text-dark border-secondary">
          + KPI
        </Button>
        <Button className="btn-system btn-system-size-sm btn-system-primary">
          + Goal
        </Button>
      </div>

      <div className="row g-3">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="bg-white rounded-3 p-3 border position-relative overflow-hidden h-100">
            <div className="position-absolute top-0 start-0 w-100 bg-warning" style={{ height: '4px' }}></div>
            <div className="text-muted small fw-bold text-uppercase mb-2 mt-1" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>Goals</div>
            <div className="fs-2 fw-bold text-warning lh-1 mb-1">5</div>
            <div className="text-muted" style={{ fontSize: '0.75rem' }}>Active Goals</div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="bg-white rounded-3 p-3 border position-relative overflow-hidden h-100">
            <div className="position-absolute top-0 start-0 w-100 bg-success" style={{ height: '4px' }}></div>
            <div className="text-muted small fw-bold text-uppercase mb-2 mt-1" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>KPIs</div>
            <div className="fs-2 fw-bold text-success lh-1 mb-1">5</div>
            <div className="text-muted" style={{ fontSize: '0.75rem' }}>Tracked KPIs</div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="bg-white rounded-3 p-3 border position-relative overflow-hidden h-100">
            <div className="position-absolute top-0 start-0 w-100" style={{ height: '4px', backgroundColor: '#EC4899' }}></div>
            <div className="text-muted small fw-bold text-uppercase mb-2 mt-1" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>Updates</div>
            <div className="fs-2 fw-bold lh-1 mb-1" style={{ color: '#EC4899' }}>5</div>
            <div className="text-muted" style={{ fontSize: '0.75rem' }}>Progress Updates</div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="bg-white rounded-3 p-3 border position-relative overflow-hidden h-100">
            <div className="position-absolute top-0 start-0 w-100 bg-primary" style={{ height: '4px' }}></div>
            <div className="text-muted small fw-bold text-uppercase mb-2 mt-1" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>Categories</div>
            <div className="fs-2 fw-bold text-primary lh-1 mb-1">7</div>
            <div className="text-muted" style={{ fontSize: '0.75rem' }}>Goal Categories</div>
          </div>
        </div>
      </div>

      <div className="border-bottom d-flex gap-4">
        {[
          { id: 'goals', label: 'Goals' },
          { id: 'kpis', label: 'KPI Tracking' },
          { id: 'updates', label: 'Progress Updates' },
          { id: 'categories', label: 'Categories' }
        ].map(tab => (
          <div 
            key={tab.id}
            className={`pb-2 fw-medium ${activeTab === tab.id ? 'text-primary border-bottom border-primary border-2' : 'text-muted cursor-pointer'}`}
            style={{ fontSize: '0.875rem', cursor: 'pointer' }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {activeTab === 'goals' && (
        <div className="d-flex flex-column gap-4">

          <div>
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px' }}>
                <CheckCircle size={14} />
              </div>
              <h6 className="fw-bold m-0 text-dark">My Goals</h6>
              <span className="badge bg-secondary bg-opacity-10 text-secondary rounded-pill">5</span>
            </div>

            <div className="d-flex flex-column gap-3">

              <div className="bg-white border rounded-3 p-4 position-relative">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="fw-bold mb-0 text-dark">Reduce Department Costs by 30%</h6>
                  <span className="bg-danger bg-opacity-10 text-danger fw-bold rounded px-2 py-1" style={{ fontSize: '0.65rem' }}>High</span>
                </div>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span className="text-muted small">Due: Feb 28, 2026</span>
                  <span className="bg-success text-white fw-medium rounded px-2" style={{ fontSize: '0.65rem', padding: '2px 0' }}>Costing</span>
                </div>

                <div className="progress mb-2" style={{ height: '6px', backgroundColor: '#F3F4F6' }}>
                  <div className="progress-bar bg-success rounded-pill" role="progressbar" style={{ width: '88%' }}></div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2">
                    <Button variant="outline" className="btn-system btn-system-size-xs btn-system-outline border-secondary text-secondary">View</Button>
                    <Button variant="outline" className="btn-system btn-system-size-xs btn-system-outline border-secondary text-secondary">Update</Button>
                  </div>
                  <span className="text-dark small fw-bold">88%</span>
                </div>
              </div>

              <div className="bg-white border rounded-3 p-4 position-relative">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="fw-bold mb-0 text-dark">Achieve 50% Market Share</h6>
                  <span className="bg-warning bg-opacity-10 text-warning fw-bold rounded px-2 py-1" style={{ fontSize: '0.65rem' }}>Medium</span>
                </div>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span className="text-muted small">Due: Feb 28, 2026</span>
                  <span className="bg-danger text-white fw-medium rounded px-2" style={{ fontSize: '0.65rem', padding: '2px 0' }}>Growth</span>
                </div>

                <div className="progress mb-2" style={{ height: '6px', backgroundColor: '#F3F4F6' }}>
                  <div className="progress-bar bg-danger rounded-pill" role="progressbar" style={{ width: '15%' }}></div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2">
                    <Button variant="outline" className="btn-system btn-system-size-xs btn-system-outline border-secondary text-secondary">View</Button>
                    <Button variant="outline" className="btn-system btn-system-size-xs btn-system-outline border-secondary text-secondary">Update</Button>
                  </div>
                  <span className="text-dark small fw-bold">15%</span>
                </div>
              </div>

              <div className="bg-white border rounded-3 p-4 position-relative">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="fw-bold mb-0 text-dark">Improve Customer Satisfaction</h6>
                  <span className="bg-danger bg-opacity-10 text-danger fw-bold rounded px-2 py-1" style={{ fontSize: '0.65rem' }}>High</span>
                </div>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span className="text-muted small">Due: Mar 31, 2026</span>
                  <span className="bg-info text-white fw-medium rounded px-2" style={{ fontSize: '0.65rem', padding: '2px 0' }}>Customer Success</span>
                </div>

                <div className="progress mb-2" style={{ height: '6px', backgroundColor: '#F3F4F6' }}>
                  <div className="progress-bar bg-warning rounded-pill" role="progressbar" style={{ width: '40%' }}></div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2">
                    <Button variant="outline" className="btn-system btn-system-size-xs btn-system-outline border-secondary text-secondary">View</Button>
                    <Button variant="outline" className="btn-system btn-system-size-xs btn-system-outline border-secondary text-secondary">Update</Button>
                  </div>
                  <span className="text-dark small fw-bold">40%</span>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-white border rounded-3 mt-2">
            <div className="p-3 border-bottom d-flex flex-wrap justify-content-between align-items-center gap-3">
              <h6 className="fw-bold m-0 text-dark">Goals Summary Table</h6>
              <div className="d-flex flex-wrap gap-2 align-items-center">
                <div className="d-flex rounded" style={{ backgroundColor: '#F3F4F6', padding: '2px' }}>
                  <button className="btn btn-sm btn-primary border-0 rounded px-3" style={{ fontSize: '0.75rem' }}>All</button>
                  <button className="btn btn-sm btn-light border-0 rounded px-3 text-muted bg-transparent" style={{ fontSize: '0.75rem' }}>Individual</button>
                  <button className="btn btn-sm btn-light border-0 rounded px-3 text-muted bg-transparent" style={{ fontSize: '0.75rem' }}>Team</button>
                </div>
                <div className="position-relative ms-2">
                  <Search size={14} className="position-absolute text-muted" style={{ top: '50%', transform: 'translateY(-50%)', left: '10px' }} />
                  <input type="text" className="form-control form-control-sm ps-4" placeholder="Search goals..." style={{ width: '150px' }} />
                </div>
                <Button variant="outline" className="btn-system btn-system-size-sm btn-system-outline d-flex align-items-center gap-2">
                  <List size={14} /> All Priority
                </Button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table border-0 table-hover align-middle mb-0 custom-table">
                <thead>
                  <tr>
                    <th className="border-0 text-muted fw-semibold small pb-2">Goal</th>
                    <th className="border-0 text-muted fw-semibold small pb-2">Type</th>
                    <th className="border-0 text-muted fw-semibold small pb-2">Category</th>
                    <th className="border-0 text-muted fw-semibold small pb-2">Priority</th>
                    <th className="border-0 text-muted fw-semibold small pb-2">Target</th>
                    <th className="border-0 text-muted fw-semibold small pb-2">Start</th>
                    <th className="border-0 text-muted fw-semibold small pb-2">Due</th>
                    <th className="border-0 text-muted fw-semibold small pb-2">Progress</th>
                    <th className="border-0 text-muted fw-semibold small pb-2">Status</th>
                    <th className="border-0 text-muted fw-semibold small pb-2 text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { title: 'Increase Q2 Revenue', subtitle: 'Sales', type: 'Team', category: 'Sales', priority: 'High', priorityColor: 'danger', target: '₹50L', start: '1 Apr 2025', due: '30 Jun 2025', progress: 72, progressColor: 'warning', status: 'In Progress' },
                    { title: 'Increase Q2 Revenue', subtitle: 'Sales', type: 'Team', category: 'Engineering', priority: 'High', priorityColor: 'danger', target: '30%', start: '1 Apr 2025', due: '30 Jun 2025', progress: 85, progressColor: 'success', status: 'In Progress' },
                    { title: 'Increase Q2 Revenue', subtitle: 'Sales', type: 'Individual', category: 'HR', priority: 'Medium', priorityColor: 'warning', target: '5 hires', start: '1 Apr 2025', due: '30 Jun 2025', progress: 60, progressColor: 'warning', status: 'At Risk' },
                    { title: 'Increase Q2 Revenue', subtitle: 'Sales', type: 'Team', category: 'Engineering', priority: 'High', priorityColor: 'danger', target: 'Live', start: '1 Apr 2025', due: '30 Jun 2025', progress: 22, progressColor: 'danger', status: 'In Progress' },
                    { title: 'Increase Q2 Revenue', subtitle: 'Sales', type: 'Individual', category: 'HR', priority: 'Medium', priorityColor: 'warning', target: 'Certified', start: '1 Apr 2025', due: '30 Jun 2025', progress: 100, progressColor: 'success', status: 'Completed' },
                    { title: 'Increase Q2 Revenue', subtitle: 'Sales', type: 'Team', category: 'Marketing', priority: 'Medium', priorityColor: 'warning', target: '60', start: '1 Apr 2025', due: '30 Jun 2025', progress: 40, progressColor: 'danger', status: 'At Risk' },
                  ].map((g, i) => (
                    <tr key={i}>
                      <td className="py-3">
                        <div className="fw-bold text-dark" style={{ fontSize: '0.8rem' }}>{g.title}</div>
                        <div className="text-muted" style={{ fontSize: '0.7rem' }}>{g.subtitle}</div>
                      </td>
                      <td className="py-3">
                        <span className="bg-secondary bg-opacity-10 text-secondary fw-medium px-2 py-1 rounded-pill" style={{ fontSize: '0.65rem' }}>{g.type}</span>
                      </td>
                      <td className="py-3 text-muted small">{g.category}</td>
                      <td className="py-3">
                        <span className={`text-${g.priorityColor} fw-bold`} style={{ fontSize: '0.75rem' }}>{g.priority}</span>
                      </td>
                      <td className="py-3 fw-bold text-dark small">{g.target}</td>
                      <td className="py-3 text-muted small">{g.start}</td>
                      <td className="py-3 text-muted small">{g.due}</td>
                      <td className="py-3">
                        <div className="d-flex align-items-center gap-2">
                          <div className="progress flex-grow-1" style={{ height: '4px', minWidth: '40px' }}>
                            <div className={`progress-bar bg-${g.progressColor}`} style={{ width: `${g.progress}%` }}></div>
                          </div>
                          <span className="small text-muted" style={{ fontSize: '0.7rem' }}>{g.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="d-flex align-items-center gap-1">
                          <div className={`rounded-circle bg-${g.status === 'Completed' ? 'success' : g.status === 'At Risk' ? 'danger' : 'warning'}`} style={{ width: '6px', height: '6px' }}></div>
                          <span className="small fw-medium">{g.status}</span>
                        </div>
                      </td>
                      <td className="py-3 text-end">
                        <Button variant="icon" className="btn btn-action-icon rounded">
                          <Edit2 size={14} />
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

      {activeTab === 'categories' && (
        <div className="d-flex flex-column gap-4 mt-2">

          <div className="bg-white border rounded-3 p-4 d-flex align-items-start gap-3 border-warning border-opacity-25" style={{ backgroundColor: '#FEFCE8' }}>
            <div className="rounded-3 d-flex justify-content-center align-items-center" style={{ width: '40px', height: '40px', backgroundColor: '#FEF9C3', color: '#CA8A04', border: '1px solid #FEF08A' }}>
              <Lightbulb size={20} />
            </div>
            <div>
              <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: '0.875rem' }}>Category Insights</h6>
              <div className="text-muted" style={{ fontSize: '0.875rem' }}>
                The <span className="text-dark fw-bold">Sales</span> category is your top performer this quarter with 92% average progress.
                <br />
                Conversely, <span className="text-dark fw-bold">HR</span> is currently behind schedule at 45% and requires attention.
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-3">
            <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
              <h6 className="fw-bold m-0 text-dark">All Categories</h6>
              <div className="d-flex gap-2">
                <Button variant="outline" className="btn-system btn-system-size-sm btn-system-outline border-secondary text-dark d-flex align-items-center gap-2">
                  <Filter size={14} /> Filter
                </Button>
                <Button variant="outline" className="btn-system btn-system-size-sm btn-system-outline border-secondary text-dark d-flex align-items-center gap-2">
                  <ArrowUpDown size={14} /> Sort
                </Button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table border-0 table-hover align-middle mb-0 custom-table">
                <thead>
                  <tr>
                    <th className="border-0 text-muted fw-semibold small pb-3 pt-4 px-4 text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>Category Name</th>
                    <th className="border-0 text-muted fw-semibold small pb-3 pt-4 text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>Description</th>
                    <th className="border-0 text-muted fw-semibold small pb-3 pt-4 text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>Goals</th>
                    <th className="border-0 text-muted fw-semibold small pb-3 pt-4 text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>Avg Progress</th>
                    <th className="border-0 text-muted fw-semibold small pb-3 pt-4 text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>Status</th>
                    <th className="border-0 pb-3 pt-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Engineering', desc: 'Core product and platform development', goals: 24, progress: 88, status: 'Good', statusColor: 'success', iconColor: 'bg-primary' },
                    { name: 'Human Resources', desc: 'Recruiting, onboarding, and employee success', goals: 8, progress: 45, status: 'Needs Attention', statusColor: 'danger', iconColor: 'bg-danger' },
                    { name: 'Sales', desc: 'Outbound sales, revenue, and client relations', goals: 15, progress: 92, status: 'Good', statusColor: 'success', iconColor: 'bg-success' },
                    { name: 'Marketing', desc: 'Brand management, events, and content', goals: 12, progress: 65, status: 'Active', statusColor: 'secondary', iconColor: 'bg-purple' },
                  ].map((cat, i) => (
                    <tr key={i}>
                      <td className="py-4 px-4">
                        <div className="d-flex align-items-center gap-2">
                          <div className={`rounded ${cat.iconColor}`} style={{ width: '12px', height: '12px' }}></div>
                          <span className="fw-bold text-dark">{cat.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-muted" style={{ fontSize: '0.875rem' }}>{cat.desc}</td>
                      <td className="py-4 fw-bold text-dark">{cat.goals}</td>
                      <td className="py-4" style={{ minWidth: '150px' }}>
                        <div className="d-flex align-items-center gap-3">
                          <div className="progress flex-grow-1" style={{ height: '6px' }}>
                            <div className={`progress-bar ${cat.iconColor} rounded-pill`} style={{ width: `${cat.progress}%` }}></div>
                          </div>
                          <span className="fw-bold text-dark" style={{ fontSize: '0.875rem', width: '30px' }}>{cat.progress}%</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`badge rounded-pill bg-${cat.statusColor === 'secondary' ? 'light text-dark border' : cat.statusColor} px-3 py-2 fw-medium`} style={{ fontSize: '0.75rem' }}>
                          {cat.status}
                        </span>
                      </td>
                      <td className="py-4 text-end px-4">
                        <Button variant="icon" className="btn btn-action-icon rounded border-0 text-muted">
                          <MoreHorizontal size={18} />
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

      {activeTab !== 'goals' && activeTab !== 'categories' && (
        <div className="p-5 text-center text-muted bg-white border rounded mt-2">
          {activeTab} content coming soon...
        </div>
      )}
    </div>
  );
};

export default PerformanceGoals;
