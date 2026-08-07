import React, { useState } from 'react';
import { 
  Download, RefreshCw, ChevronDown, Calendar, Search, Search as SearchIcon, 
  ClipboardList, ChevronLeft, ChevronRight,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Logs.css';
import { activityLogsData, auditTrailData, userSessionsData, recentErrorsData } from '../../data/logsConstants';
import Button from '../../components/common/Button';

const Logs = () => {
  const [activeTab, setActiveTab] = useState('Activity Logs');
  const getActionBadgeClass = (action) => {
    switch (action) {
      case 'READ': return 'read';
      case 'CREATE': return 'create';
      case 'UPDATE': return 'update';
      case 'DELETE': return 'delete';
      case 'LOGIN_SUCCESS': return 'login-success';
      case 'LOGIN_FAILED': return 'login-failed';
      default: return 'read';
    }
  };

  const getModelBadgeClass = (model) => {
    switch (model) {
      case 'Auth': return 'auth';
      case 'Compliance': return 'compliance';
      case 'Attendance': return 'attendance';
      case 'Policy': return 'policy';
      case 'Employee': return 'employee';
      case 'Payroll': return 'payroll';
      case 'Task': return 'task';
      case 'Deduction': return 'deduction';
      default: return 'auth';
    }
  };

  const getStatusBadge = (status) => {
    if (status >= 200 && status < 300) return <span className="status-code success">{status}</span>;
    if (status >= 400 && status < 500) return <span className="status-code warning">{status}</span>;
    if (status >= 500) return <span className="status-code error">{status}</span>;
    return <span className="status-code">{status}</span>;
  };

  const getResponseTimeClass = (timeStr) => {
    const ms = parseInt(timeStr.replace('ms', ''));
    if (ms < 50) return 'fast';
    if (ms < 100) return 'med';
    return 'slow';
  };

  return (
    <div className="logs-container fade-in p-4">

      <div className="logs-breadcrumb">
        <Link to="/admin/dashboard">Logs</Link> <span className="mx-1">›</span> <span>{activeTab}</span>
      </div>

      <div className="logs-header">
        <div>
          <h1 className="logs-title">Activity Logs & Audit Trail</h1>
          <p className="logs-subtitle">Monitor all system activity, API calls, user sessions, and security events.</p>
        </div>
        <div className="logs-actions">
          <Button variant="secondary" className="btn btn-light bg-white border fw-semibold shadow-sm px-3 d-flex align-items-center gap-2">
            <Download size={14} className="text-slate" /> Export
          </Button>
          <Button variant="secondary" className="btn btn-light bg-white border fw-semibold shadow-sm px-3 d-flex align-items-center gap-2">
            <RefreshCw size={14} className="text-slate" /> Refresh
          </Button>
        </div>
      </div>

      <div className="logs-tabs">
        <Button className={`logs-tab ${activeTab === 'Activity Logs' ? 'active' : ''}`} onClick={() => setActiveTab('Activity Logs')}>
          Activity Logs <span className="tab-badge">22,664</span>
        </Button>
        <Button className={`logs-tab ${activeTab === 'Search' ? 'active' : ''}`} onClick={() => setActiveTab('Search')}>
          Search
        </Button>
        <Button className={`logs-tab ${activeTab === 'Analytics' ? 'active' : ''}`} onClick={() => setActiveTab('Analytics')}>
          Analytics
        </Button>
        <Button className={`logs-tab ${activeTab === 'Audit Trail' ? 'active' : ''}`} onClick={() => setActiveTab('Audit Trail')}>
          Audit Trail
        </Button>
        <Button className={`logs-tab ${activeTab === 'User Sessions' ? 'active' : ''}`} onClick={() => setActiveTab('User Sessions')}>
          User Sessions <span className="tab-badge">447</span>
        </Button>
      </div>

      <div className="logs-content">

        {activeTab === 'Activity Logs' && (
          <div className="fade-in">
            <div className="logs-filters-card">
              <div className="logs-filters-title">Filters</div>
              <div className="logs-filter-grid">
                <div className="logs-filter-group">
                  <label className="logs-filter-label">User / ID</label>
                  <input type="text" className="logs-input text-slate" placeholder="User ID or email" />
                </div>
                <div className="logs-filter-group">
                  <label className="logs-filter-label">Action</label>
                  <div className="position-relative">
                    <select className="logs-select text-slate" style={{appearance: 'none'}}>
                      <option>All Actions</option>
                    </select>
                    <ChevronDown size={14} className="text-slate position-absolute" style={{right: '12px', top: '10px', pointerEvents: 'none'}} />
                  </div>
                </div>
                <div className="logs-filter-group">
                  <label className="logs-filter-label">Method</label>
                  <div className="position-relative">
                    <select className="logs-select text-slate" style={{appearance: 'none'}}>
                      <option>All Methods</option>
                    </select>
                    <ChevronDown size={14} className="text-slate position-absolute" style={{right: '12px', top: '10px', pointerEvents: 'none'}} />
                  </div>
                </div>
                <div className="logs-filter-group">
                  <label className="logs-filter-label">Model</label>
                  <input type="text" className="logs-input text-slate" placeholder="e.g. Employee" />
                </div>
                <div className="logs-filter-group">
                  <label className="logs-filter-label">Status Code</label>
                  <input type="text" className="logs-input text-slate" placeholder="e.g. 200" />
                </div>
                <div className="logs-filter-group">
                  <label className="logs-filter-label">From Date</label>
                  <div className="position-relative">
                    <input type="text" className="logs-input text-slate" placeholder="dd - mm - yyyy" />
                    <Calendar size={14} className="text-slate position-absolute" style={{right: '12px', top: '10px', pointerEvents: 'none'}} />
                  </div>
                </div>
                <div className="logs-filter-group">
                  <label className="logs-filter-label">To Date</label>
                  <div className="position-relative">
                    <input type="text" className="logs-input text-slate" placeholder="dd - mm - yyyy" />
                    <Calendar size={14} className="text-slate position-absolute" style={{right: '12px', top: '10px', pointerEvents: 'none'}} />
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2">
                <Button className="btn btn-primary bg-blue border-0 px-4 fw-semibold shadow-sm d-flex align-items-center gap-2">
                  <SearchIcon size={14} /> Apply
                </Button>
                <Button variant="secondary" className="btn btn-secondary text-white border-0 px-4 fw-semibold shadow-sm" style={{background: '#64748b'}}>Clear</Button>
              </div>
            </div>

            <div className="logs-table-wrapper">
              <div className="logs-table-header bg-light">
                <div className="logs-table-count">Showing <strong>25</strong> of <strong>22,664</strong> logs</div>
                <div className="d-flex align-items-center gap-3">
                  <Button variant="secondary" className="btn btn-light bg-white border btn-sm text-slate px-3 d-flex align-items-center gap-1" disabled>
                    <ChevronLeft size={14} /> Prev
                  </Button>
                  <span className="text-slate" style={{fontSize: '0.85rem'}}>Page 1 of 907</span>
                  <Button variant="secondary" className="btn btn-light bg-white border btn-sm text-dark px-3 d-flex align-items-center gap-1">
                    Next <ChevronRight size={14} />
                  </Button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="logs-table">
                  <thead>
                    <tr>
                      <th>TIMESTAMP</th>
                      <th>USER</th>
                      <th>ACTION</th>
                      <th>METHOD</th>
                      <th>ENDPOINT</th>
                      <th>STATUS</th>
                      <th>RESPONSE</th>
                      <th>MODEL</th>
                      <th>IP</th>
                      <th>DETAIL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activityLogsData.map((log, idx) => (
                      <tr key={idx}>
                        <td className="timestamp">{log.time}</td>
                        <td className="fw-bold-dark">{log.user}</td>
                        <td><span className={`log-badge ${getActionBadgeClass(log.action)}`}>{log.action}</span></td>
                        <td><span className={`method-badge ${log.method.toLowerCase()}`}>{log.method}</span></td>
                        <td className="text-slate" style={{fontSize: '0.8rem'}}>{log.endpoint}</td>
                        <td>{getStatusBadge(log.status)}</td>
                        <td className={`response-time ${getResponseTimeClass(log.res)}`}>{log.res}</td>
                        <td><span className="text-slate">{log.model}</span></td>
                        <td className="ip-address">{log.ip}</td>
                        <td>
                          <Button variant="secondary" className="btn btn-light bg-white border btn-sm text-slate px-3 py-1 fw-medium" style={{fontSize:'0.75rem'}}>Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Search' && (
          <div className="fade-in">
            <div className="search-full-card shadow-sm">
              <div className="logs-filters-title">Full-Text Search</div>
              <div className="search-input-wrapper">
                <input type="text" className="logs-input text-slate" placeholder="Search logs... (user, endpoint, model, action)" />
                <Button className="btn btn-primary bg-blue border-0 px-4 fw-semibold shadow-sm d-flex align-items-center gap-2">
                  <SearchIcon size={16} /> Search
                </Button>
              </div>
            </div>

            <div className="logs-filters-card">
              <div className="logs-filters-title">Filters</div>
              <div className="logs-filter-grid">
                <div className="logs-filter-group">
                  <label className="logs-filter-label">User / ID</label>
                  <input type="text" className="logs-input text-slate" placeholder="User ID or email" />
                </div>
                <div className="logs-filter-group">
                  <label className="logs-filter-label">Action</label>
                  <div className="position-relative">
                    <select className="logs-select text-slate" style={{appearance: 'none'}}>
                      <option>All Actions</option>
                    </select>
                    <ChevronDown size={14} className="text-slate position-absolute" style={{right: '12px', top: '10px', pointerEvents: 'none'}} />
                  </div>
                </div>
                <div className="logs-filter-group">
                  <label className="logs-filter-label">Method</label>
                  <div className="position-relative">
                    <select className="logs-select text-slate" style={{appearance: 'none'}}>
                      <option>All Methods</option>
                    </select>
                    <ChevronDown size={14} className="text-slate position-absolute" style={{right: '12px', top: '10px', pointerEvents: 'none'}} />
                  </div>
                </div>
                <div className="logs-filter-group">
                  <label className="logs-filter-label">Model</label>
                  <input type="text" className="logs-input text-slate" placeholder="e.g. Employee" />
                </div>
                <div className="logs-filter-group">
                  <label className="logs-filter-label">Status Code</label>
                  <input type="text" className="logs-input text-slate" placeholder="e.g. 200" />
                </div>
                <div className="logs-filter-group">
                  <label className="logs-filter-label">From Date</label>
                  <div className="position-relative">
                    <input type="text" className="logs-input text-slate" placeholder="dd - mm - yyyy" />
                    <Calendar size={14} className="text-slate position-absolute" style={{right: '12px', top: '10px', pointerEvents: 'none'}} />
                  </div>
                </div>
                <div className="logs-filter-group">
                  <label className="logs-filter-label">To Date</label>
                  <div className="position-relative">
                    <input type="text" className="logs-input text-slate" placeholder="dd - mm - yyyy" />
                    <Calendar size={14} className="text-slate position-absolute" style={{right: '12px', top: '10px', pointerEvents: 'none'}} />
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2">
                <Button className="btn btn-primary bg-blue border-0 px-4 fw-semibold shadow-sm d-flex align-items-center gap-2">
                  <SearchIcon size={14} /> Apply
                </Button>
                <Button variant="secondary" className="btn btn-secondary text-white border-0 px-4 fw-semibold shadow-sm" style={{background: '#64748b'}}>Clear</Button>
              </div>
            </div>

            <div className="logs-empty-state">
              <SearchIcon size={48} className="logs-empty-icon text-slate opacity-75" />
              <div className="logs-empty-title">Search across all logs</div>
              <div className="logs-empty-desc">Enter a keyword above — search by user, endpoint, model, or action.</div>
            </div>
          </div>
        )}

        {activeTab === 'Analytics' && (
          <div className="fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="fw-bold text-dark" style={{fontSize: '1.1rem'}}>Usage Statistics</div>
              <div className="d-flex gap-2">
                <Button className="btn btn-primary bg-blue border-0 px-3 fw-semibold text-white shadow-sm" style={{fontSize: '0.85rem'}}>Last 7 Days</Button>
                <Button variant="secondary" className="btn btn-light bg-white border px-3 fw-medium text-slate shadow-sm" style={{fontSize: '0.85rem'}}>Last 14 Days</Button>
                <Button variant="secondary" className="btn btn-light bg-white border px-3 fw-medium text-slate shadow-sm" style={{fontSize: '0.85rem'}}>Last 30 Days</Button>
              </div>
            </div>

            <div className="analytics-metrics-grid">
              <div className="analytics-metric-card shadow-sm">
                <div className="am-value">3,008</div>
                <div className="am-label">Total Logs</div>
              </div>
              <div className="analytics-metric-card shadow-sm">
                <div className="am-value green">3</div>
                <div className="am-label">Active Users</div>
              </div>
              <div className="analytics-metric-card shadow-sm">
                <div className="am-value teal">69.41ms</div>
                <div className="am-label">Avg Response Time</div>
              </div>
              <div className="analytics-metric-card shadow-sm">
                <div className="am-value red">10</div>
                <div className="am-label">Recent Errors</div>
              </div>
            </div>

            <div className="analytics-charts-grid">
              <div className="chart-card shadow-sm">
                <div className="chart-title">Actions Breakdown</div>

                <div className="chart-row">
                  <div className="chart-label"><span className="log-badge read">READ</span></div>
                  <div className="chart-bar-container">
                    <div className="chart-bar-fill" style={{width: '90%', background: '#0ea5e9'}}></div>
                  </div>
                  <div className="chart-value">2,743</div>
                </div>
                <div className="chart-row">
                  <div className="chart-label"><span className="log-badge create">CREATE</span></div>
                  <div className="chart-bar-container">
                    <div className="chart-bar-fill" style={{width: '15%', background: '#10b981'}}></div>
                  </div>
                  <div className="chart-value">129</div>
                </div>
                <div className="chart-row">
                  <div className="chart-label"><span className="log-badge login-success">LOGIN_SUCCESS</span></div>
                  <div className="chart-bar-container">
                    <div className="chart-bar-fill" style={{width: '8%', background: '#3b82f6'}}></div>
                  </div>
                  <div className="chart-value">66</div>
                </div>
                <div className="chart-row">
                  <div className="chart-label"><span className="log-badge" style={{background:'#f1f5f9', color:'#64748b'}}>OPTIONS</span></div>
                  <div className="chart-bar-container">
                    <div className="chart-bar-fill" style={{width: '7%', background: '#94a3b8'}}></div>
                  </div>
                  <div className="chart-value">60</div>
                </div>
                <div className="chart-row">
                  <div className="chart-label"><span className="log-badge" style={{background:'#ffedd5', color:'#ea580c'}}>SENSITIVE_DATA</span></div>
                  <div className="chart-bar-container">
                    <div className="chart-bar-fill" style={{width: '3%', background: '#f59e0b'}}></div>
                  </div>
                  <div className="chart-value">7</div>
                </div>
                <div className="chart-row">
                  <div className="chart-label"><span className="log-badge login-failed">LOGIN_FAILED</span></div>
                  <div className="chart-bar-container">
                    <div className="chart-bar-fill" style={{width: '2%', background: '#ef4444'}}></div>
                  </div>
                  <div className="chart-value">3</div>
                </div>
              </div>

              <div className="chart-card shadow-sm">
                <div className="chart-title">Status Codes Breakdown</div>

                <div className="chart-row">
                  <div className="chart-label"><span className="status-code success">200</span></div>
                  <div className="chart-bar-container">
                    <div className="chart-bar-fill" style={{width: '95%', background: '#10b981'}}></div>
                  </div>
                  <div className="chart-value">2,962</div>
                </div>
                <div className="chart-row">
                  <div className="chart-label"><span className="status-code warning">404</span></div>
                  <div className="chart-bar-container">
                    <div className="chart-bar-fill" style={{width: '10%', background: '#f59e0b'}}></div>
                  </div>
                  <div className="chart-value">27</div>
                </div>
                <div className="chart-row">
                  <div className="chart-label"><span className="status-code warning" style={{background:'#ffedd5', color:'#ea580c'}}>401</span></div>
                  <div className="chart-bar-container">
                    <div className="chart-bar-fill" style={{width: '5%', background: '#ea580c'}}></div>
                  </div>
                  <div className="chart-value">13</div>
                </div>
                <div className="chart-row">
                  <div className="chart-label"><span className="status-code warning">400</span></div>
                  <div className="chart-bar-container">
                    <div className="chart-bar-fill" style={{width: '2%', background: '#f59e0b'}}></div>
                  </div>
                  <div className="chart-value">3</div>
                </div>
                <div className="chart-row">
                  <div className="chart-label"><span className="status-code warning">403</span></div>
                  <div className="chart-bar-container">
                    <div className="chart-bar-fill" style={{width: '2%', background: '#f59e0b'}}></div>
                  </div>
                  <div className="chart-value">3</div>
                </div>
              </div>
            </div>

            <div className="logs-table-wrapper shadow-sm mt-4">
              <div className="logs-table-header bg-light">
                <div className="fw-bold-dark">Recent Errors</div>
                <div className="text-red fw-semibold" style={{fontSize: '0.85rem'}}>10 errors</div>
              </div>
              <div className="table-responsive">
                <table className="logs-table">
                  <thead>
                    <tr>
                      <th>TIMESTAMP</th>
                      <th>USER</th>
                      <th>ENDPOINT</th>
                      <th>STATUS</th>
                      <th>ERROR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentErrorsData.map((err, idx) => (
                      <tr key={idx}>
                        <td className="timestamp">{err.time}</td>
                        <td className="fw-bold-dark" style={{color: err.user === 'Unknown' ? '#94a3b8' : '#0f172a'}}>{err.user}</td>
                        <td className="text-slate text-truncate" style={{maxWidth: '200px', fontSize: '0.8rem'}}>{err.endpoint}</td>
                        <td>{getStatusBadge(err.status)}</td>
                        <td className="text-slate" style={{fontSize: '0.85rem'}}>{err.error}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Audit Trail' && (
          <div className="fade-in">
            <div className="logs-filters-card">
              <div className="logs-filters-title">Filters</div>
              <div className="d-flex gap-3 mb-4">
                <div className="logs-filter-group flex-grow-1">
                  <label className="logs-filter-label">Model Name</label>
                  <input type="text" className="logs-input text-slate" placeholder="e.g. Employee, Payroll" />
                </div>
                <div className="logs-filter-group" style={{minWidth: '250px'}}>
                  <label className="logs-filter-label">Action</label>
                  <div className="position-relative">
                    <select className="logs-select text-slate" style={{appearance: 'none'}}>
                      <option>All Actions</option>
                    </select>
                    <ChevronDown size={14} className="text-slate position-absolute" style={{right: '12px', top: '10px', pointerEvents: 'none'}} />
                  </div>
                </div>
                <div className="d-flex align-items-end gap-2">
                  <Button className="btn btn-primary bg-blue border-0 px-4 fw-semibold shadow-sm d-flex align-items-center gap-2">
                    <SearchIcon size={14} /> Apply
                  </Button>
                  <Button variant="secondary" className="btn btn-secondary text-white border-0 px-4 fw-semibold shadow-sm" style={{background: '#64748b'}}>Clear</Button>
                </div>
              </div>

              <hr className="my-4 border-slate-200" />

              <div className="logs-filters-title mt-2">Object History Lookup</div>
              <div className="d-flex gap-3">
                <div className="logs-filter-group flex-grow-1">
                  <label className="logs-filter-label">Model Name</label>
                  <input type="text" className="logs-input text-slate" placeholder="e.g. Employee, Leave, Payroll" />
                </div>
                <div className="logs-filter-group flex-grow-1">
                  <label className="logs-filter-label">Object ID</label>
                  <input type="text" className="logs-input text-slate" placeholder="e.g. 42" />
                </div>
                <div className="d-flex align-items-end">
                  <Button className="btn btn-primary bg-blue border-0 px-4 fw-semibold shadow-sm d-flex align-items-center gap-2">
                    <Clock size={14} /> View History
                  </Button>
                </div>
              </div>
            </div>

            <div className="logs-table-wrapper">
              <div className="logs-table-header bg-light">
                <div className="logs-table-count">Showing <strong>10</strong> of <strong>10</strong> audit records</div>
                <div className="d-flex align-items-center gap-3">
                  <Button variant="secondary" className="btn btn-light bg-white border btn-sm text-slate px-3 d-flex align-items-center gap-1" disabled>
                    <ChevronLeft size={14} /> Previous
                  </Button>
                  <span className="text-slate" style={{fontSize: '0.85rem'}}>Page 1 of 1</span>
                  <Button variant="secondary" className="btn btn-light bg-white border btn-sm text-slate px-3 d-flex align-items-center gap-1" disabled>
                    Next <ChevronRight size={14} />
                  </Button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="logs-table">
                  <thead>
                    <tr>
                      <th>TIMESTAMP</th>
                      <th>USER</th>
                      <th>ACTION</th>
                      <th>MODEL</th>
                      <th>OBJECT ID</th>
                      <th>CHANGES</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditTrailData.map((trail, idx) => (
                      <tr key={idx}>
                        <td className="timestamp">{trail.time}</td>
                        <td className="fw-bold-dark">{trail.user}</td>
                        <td><span className={`log-badge ${getActionBadgeClass(trail.action)}`}>{trail.action}</span></td>
                        <td><span className={`log-badge ${getModelBadgeClass(trail.model)}`}>{trail.model}</span></td>
                        <td className="fw-semibold text-slate">{trail.objId}</td>
                        <td className="text-slate" style={{fontFamily: 'monospace', fontSize: '0.8rem'}}>{trail.changes}</td>
                        <td>
                          <Button variant="secondary" className="btn btn-light bg-white border btn-sm text-slate px-3 py-1 fw-medium" style={{fontSize:'0.75rem'}}>View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'User Sessions' && (
          <div className="fade-in">
            <div className="logs-filters-card">
              <div className="logs-filters-title">Session Filters</div>
              <div className="logs-filter-grid">
                <div className="logs-filter-group">
                  <label className="logs-filter-label">User</label>
                  <div className="position-relative">
                    <select className="logs-select text-slate" style={{appearance: 'none'}}>
                      <option>All Users</option>
                    </select>
                    <ChevronDown size={14} className="text-slate position-absolute" style={{right: '12px', top: '10px', pointerEvents: 'none'}} />
                  </div>
                </div>
                <div className="logs-filter-group">
                  <label className="logs-filter-label">Session Status</label>
                  <div className="position-relative">
                    <select className="logs-select text-slate" style={{appearance: 'none'}}>
                      <option>All Sessions</option>
                    </select>
                    <ChevronDown size={14} className="text-slate position-absolute" style={{right: '12px', top: '10px', pointerEvents: 'none'}} />
                  </div>
                </div>
                <div className="logs-filter-group">
                  <label className="logs-filter-label">From Date</label>
                  <div className="position-relative">
                    <input type="text" className="logs-input text-slate" placeholder="dd - mm - yyyy" />
                    <Calendar size={14} className="text-slate position-absolute" style={{right: '12px', top: '10px', pointerEvents: 'none'}} />
                  </div>
                </div>
                <div className="logs-filter-group">
                  <label className="logs-filter-label">To Date</label>
                  <div className="position-relative">
                    <input type="text" className="logs-input text-slate" placeholder="dd - mm - yyyy" />
                    <Calendar size={14} className="text-slate position-absolute" style={{right: '12px', top: '10px', pointerEvents: 'none'}} />
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2">
                <Button className="btn btn-primary bg-blue border-0 px-4 fw-semibold shadow-sm d-flex align-items-center gap-2">
                  <SearchIcon size={14} /> Apply
                </Button>
                <Button variant="secondary" className="btn btn-secondary text-white border-0 px-4 fw-semibold shadow-sm" style={{background: '#64748b'}}>Clear</Button>
              </div>
            </div>

            <div className="logs-table-wrapper">
              <div className="logs-table-header bg-light">
                <div className="logs-table-count">Showing <strong>25</strong> of <strong>447</strong> user sessions</div>
                <div className="d-flex align-items-center gap-3">
                  <Button variant="secondary" className="btn btn-light bg-white border btn-sm text-slate px-3 d-flex align-items-center gap-1" disabled>
                    <ChevronLeft size={14} /> Prev
                  </Button>
                  <span className="text-slate" style={{fontSize: '0.85rem'}}>Page 1 of 18</span>
                  <Button variant="secondary" className="btn btn-light bg-white border btn-sm text-dark px-3 d-flex align-items-center gap-1">
                    Next <ChevronRight size={14} />
                  </Button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="logs-table">
                  <thead>
                    <tr>
                      <th>USER</th>
                      <th>EMAIL</th>
                      <th>LOGIN TIME</th>
                      <th>LOGOUT TIME</th>
                      <th>DURATION</th>
                      <th>STATUS</th>
                      <th>DEVICE</th>
                      <th>IP ADDRESS</th>
                      <th>LOCATION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userSessionsData.map((session, idx) => (
                      <tr key={idx}>
                        <td className="fw-bold-dark">{session.user}</td>
                        <td className="text-slate">{session.email}</td>
                        <td className="text-slate" style={{fontSize: '0.8rem'}}>{session.login}</td>
                        <td className="text-slate" style={{fontSize: '0.8rem'}}>{session.logout}</td>
                        <td className="fw-semibold text-dark">{session.duration}</td>
                        <td>
                          <span className={`session-status ${session.status.toLowerCase()}`}>{session.status}</span>
                        </td>
                        <td>
                          <div className="device-info">{session.device}</div>
                          <div className="device-badge">desktop</div>
                        </td>
                        <td className="ip-address text-slate">{session.ip}</td>
                        <td className="text-slate">{session.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Logs;
