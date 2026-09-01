import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, X, RefreshCw, CheckCircle2, ShieldBan, ShieldAlert,
  ChevronDown, Calendar, Lock, Shield, Server, FileText, Check, XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Security.css';
import Button from '../../components/common/Button';
import { securityService } from '../../services';

const Security = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [showAlert, setShowAlert] = useState(false);
  const [securityStatus, setSecurityStatus] = useState(null);
  const [securitySummary, setSecuritySummary] = useState(null);
  const [rateLimits, setRateLimits] = useState(null);
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    const fetchSecurityData = async () => {
      try {
        const status = await securityService.getSecurityStatus();
        if (status) setSecurityStatus(status);
      } catch (err) {
        setSecurityStatus(null);
      }

      try {
        const summary = await securityService.getSecuritySummary();
        if (summary) setSecuritySummary(summary);
      } catch (err) {
        setSecuritySummary(null);
      }

      try {
        const limits = await securityService.getRateLimitStatus();
        if (limits) setRateLimits(limits);
      } catch (err) {
        setRateLimits(null);
      }

      try {
        const logs = await securityService.getActivityLogs();
        const rawLogs = Array.isArray(logs)
          ? logs
          : Array.isArray(logs?.data?.results)
          ? logs.data.results
          : Array.isArray(logs?.results)
          ? logs.results
          : Array.isArray(logs?.data)
          ? logs.data
          : [];
        setEventsList(rawLogs);
      } catch (err) {
        setEventsList([]);
      }
    };
    fetchSecurityData();
  }, []);

  const tabs = ['Dashboard', 'Rate Limits', 'Events', 'Encryption', 'IP Blocklist', 'Configuration'];

  const mappedEvents = eventsList.map((evt, idx) => ({
    id: evt.id || idx,
    time: evt.timestamp || evt.time || '2026-08-31 22:33:33',
    type: evt.action || evt.event_type || 'READ',
    severity: evt.metadata?.severity || evt.severity || ((evt.status_code && evt.status_code >= 400) ? 'Warning' : 'Info'),
    user: evt.user_name || evt.user_email || (evt.user_id ? `User #${evt.user_id}` : 'System Admin'),
    ip: evt.ip_address || evt.ip || '127.0.0.1',
    details: evt.endpoint ? `${evt.method || 'GET'} ${evt.endpoint}` : (evt.details || 'System Security Access'),
  }));

  const last24h = securitySummary?.last_24_hours || {};
  const last7d = securitySummary?.last_7_days || {};

  const getEventIcon = (type) => {
    if (type === 'SENSITIVE DATA ACCESS' || type === 'PERMISSION_DENIED') return <div className="red-dot"></div>;
    if (type === 'LOGIN SUCCESS' || type === 'LOGIN_SUCCESS' || type === 'READ') return <Check size={16} strokeWidth={3} className="green-check" />;
    if (type === 'LOGIN FAILED' || type === 'LOGIN_FAILED') return <X size={16} strokeWidth={3} className="grey-x" />;
    return <Check size={16} strokeWidth={3} className="green-check" />;
  };

  const getSeverityBadge = (severity) => {
    if (severity === 'Info' || severity === 'INFO') return <span className="sec-badge info">Info</span>;
    if (severity === 'Warning' || severity === 'WARNING') return <span className="sec-badge warning">Warning</span>;
    return <span className="sec-badge">{severity}</span>;
  };

  return (
    <div className="security-container fade-in p-4">

      <div className="security-breadcrumb">
        <Link to="/admin/dashboard">Security</Link> <span className="mx-1">›</span> <span>{activeTab}</span>
      </div>

      <div className="security-header">
        <div>
          <h1 className="sec-title">Security Dashboard</h1>
          <p className="sec-subtitle">Monitor security status and events across your organization.</p>
        </div>
        <div className="sec-actions">
          <div className="d-flex align-items-center gap-2">
            <label className="toggle-switch" style={{transform: 'scale(0.8)'}}>
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
            </label>
            <span className="text-slate fw-semibold" style={{fontSize: '0.85rem'}}>Auto-refresh</span>
          </div>
          <Button variant="secondary" className="btn btn-light bg-white border fw-semibold shadow-sm px-3 d-flex align-items-center gap-2">
            <RefreshCw size={14} className="text-slate" /> Refresh
          </Button>
        </div>
      </div>

      {showAlert && (
        <div className="sec-alert-banner fade-in">
          <div className="sec-alert-content">
            <AlertTriangle size={18} /> High number of failed login attempts detected — 21 failed logins in the last 24 hours
          </div>
          <Button variant="destructive" className="btn p-0 border-0 bg-transparent text-danger opacity-75 hover-opacity-100" onClick={() => setShowAlert(false)}>
            <X size={16} />
          </Button>
        </div>
      )}

      <div className="sec-tabs">
        {tabs.map(tab => (
          <Button 
            key={tab}
            className={`sec-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="sec-content">

        {activeTab === 'Dashboard' && (
          <div className="fade-in">
            <div className="sec-dashboard-grid">

              <div className="sec-summary-card">
                <div className="sec-summary-title">Security Summary — Last 24 Hours</div>
                <div className="sec-metrics-grid-4x2">
                  <div className="sec-metric-box">
                    <div className="sm-value green">{last24h.login_success ?? 0}</div>
                    <div className="sm-label">Successful Logins</div>
                  </div>
                  <div className="sec-metric-box">
                    <div className="sm-value orange">{last24h.login_failed ?? 0}</div>
                    <div className="sm-label">Failed Logins</div>
                  </div>
                  <div className="sec-metric-box">
                    <div className="sm-value red">{last24h.login_blocked ?? 0}</div>
                    <div className="sm-label">Blocked Logins</div>
                  </div>
                  <div className="sec-metric-box">
                    <div className="sm-value blue">{last24h.rate_limit_exceeded ?? 0}</div>
                    <div className="sm-label">Rate Limits Hit</div>
                  </div>

                  <div className="sec-metric-box">
                    <div className="sm-value dark">{last24h.password_changes ?? 0}</div>
                    <div className="sm-label">Password Changes</div>
                  </div>
                  <div className="sec-metric-box">
                    <div className="sm-value red">{last24h.permission_denied ?? 0}</div>
                    <div className="sm-label">Permission Denied</div>
                  </div>
                  <div className="sec-metric-box">
                    <div className="sm-value dark">{last24h.suspicious_activity ?? 0}</div>
                    <div className="sm-label">Suspicious Activity</div>
                  </div>
                  <div className="sec-metric-box">
                    <div className="sm-value teal">{last24h.total_events ?? eventsList.length}</div>
                    <div className="sm-label">Total Events</div>
                  </div>
                </div>
              </div>

              <div className="sec-features-card">
                <div className="sec-summary-title">Security Features</div>
                <div className="feature-list">
                  <div className="feature-list-item">
                    <span>Rate Limiting</span>
                    <span className="badge-status enabled"><Check size={12} strokeWidth={3}/> Enabled</span>
                  </div>
                  <div className="feature-list-item">
                    <span>Field Encryption</span>
                    <span className="badge-status enabled"><Check size={12} strokeWidth={3}/> Enabled</span>
                  </div>
                  <div className="feature-list-item">
                    <span>Security Headers</span>
                    <span className="badge-status enabled"><Check size={12} strokeWidth={3}/> Enabled</span>
                  </div>
                  <div className="feature-list-item">
                    <span>Audit Logging</span>
                    <span className="badge-status enabled"><Check size={12} strokeWidth={3}/> Enabled</span>
                  </div>
                  <div className="feature-list-item">
                    <span>2FA / MFA</span>
                    <span className="badge-status disabled"><X size={12} strokeWidth={3}/> Disabled</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="sec-stats-card">
              <div className="sec-summary-title">7-Day Statistics</div>
              <div className="sec-metrics-grid-6x1">
                <div className="sec-metric-box">
                  <div className="sm-value green">{last7d.login_success ?? 0}</div>
                  <div className="sm-label">Successful Logins</div>
                </div>
                <div className="sec-metric-box">
                  <div className="sm-value orange">{last7d.login_failed ?? 0}</div>
                  <div className="sm-label">Failed Logins</div>
                </div>
                <div className="sec-metric-box">
                  <div className="sm-value red">{last7d.login_blocked ?? 0}</div>
                  <div className="sm-label">Blocked Logins</div>
                </div>
                <div className="sec-metric-box">
                  <div className="sm-value blue">{last7d.rate_limit_exceeded ?? 0}</div>
                  <div className="sm-label">Rate Limits</div>
                </div>
                <div className="sec-metric-box">
                  <div className="sm-value dark">{last7d.suspicious_activity ?? 0}</div>
                  <div className="sm-label">Suspicious</div>
                </div>
                <div className="sec-metric-box">
                  <div className="sm-value teal">{last7d.total_events ?? eventsList.length}</div>
                  <div className="sm-label">Total Events</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Rate Limits' && (
          <div className="fade-in">
            <div className="rate-limit-info">
              User ID: <strong>{rateLimits?.user_id || 'System Admin'}</strong> — Your current API rate limit status
            </div>

            <div className="rate-limits-grid">

              <div className="rl-card shadow-sm">
                <div className="rl-header">
                  <div className="rl-title m-0">Default API</div>
                  <div className="rl-count">{rateLimits?.remaining_requests?.general ?? 100} / {rateLimits?.limits?.default?.limit ?? 100}</div>
                </div>
                <div className="rl-remaining">Remaining</div>
                <div className="rl-progress-bar mt-2">
                  <div className="rl-progress-fill green" style={{width: `${((rateLimits?.remaining_requests?.general ?? 100) / (rateLimits?.limits?.default?.limit ?? 100)) * 100}%`}}></div>
                </div>
                <div className="rl-footer mt-2">Resets every 60 seconds</div>
              </div>

              <div className="rl-card shadow-sm">
                <div className="rl-header">
                  <div className="rl-title m-0">Search API</div>
                  <div className="rl-count">{rateLimits?.remaining_requests?.search ?? 30} / {rateLimits?.limits?.search?.limit ?? 30}</div>
                </div>
                <div className="rl-remaining">Remaining</div>
                <div className="rl-progress-bar mt-2">
                  <div className="rl-progress-fill green" style={{width: `${((rateLimits?.remaining_requests?.search ?? 30) / (rateLimits?.limits?.search?.limit ?? 30)) * 100}%`}}></div>
                </div>
                <div className="rl-footer mt-2">Resets every 60 seconds</div>
              </div>

              <div className="rl-card shadow-sm">
                <div className="rl-header">
                  <div className="rl-title m-0">Export API</div>
                  <div className="rl-count">{rateLimits?.remaining_requests?.export ?? 10} / {rateLimits?.limits?.export?.limit ?? 10}</div>
                </div>
                <div className="rl-remaining">Remaining</div>
                <div className="rl-progress-bar mt-2">
                  <div className="rl-progress-fill orange" style={{width: `${((rateLimits?.remaining_requests?.export ?? 10) / (rateLimits?.limits?.export?.limit ?? 10)) * 100}%`}}></div>
                </div>
                <div className="rl-footer mt-2">Resets every 60 seconds</div>
              </div>

              <div className="rl-card shadow-sm">
                <div className="rl-header">
                  <div className="rl-title m-0">Upload API</div>
                  <div className="rl-count">{rateLimits?.remaining_requests?.export ?? 20} / {rateLimits?.limits?.upload?.limit ?? 20}</div>
                </div>
                <div className="rl-remaining">Remaining</div>
                <div className="rl-progress-bar mt-2">
                  <div className="rl-progress-fill green" style={{width: '100%'}}></div>
                </div>
                <div className="rl-footer mt-2">Resets every 60 seconds</div>
              </div>

              <div className="rl-card shadow-sm">
                <div className="rl-header">
                  <div className="rl-title m-0">Auth — Login</div>
                  <div className="rl-count">5 / 5</div>
                </div>
                <div className="rl-remaining">Remaining</div>
                <div className="rl-progress-bar mt-2">
                  <div className="rl-progress-fill green" style={{width: '100%'}}></div>
                </div>
                <div className="rl-footer mt-2">Resets every 60 seconds</div>
              </div>

              <div className="rl-card shadow-sm">
                <div className="rl-header">
                  <div className="rl-title m-0">Auth — Register</div>
                  <div className="rl-count">1 / 3</div>
                </div>
                <div className="rl-remaining">Remaining</div>
                <div className="rl-progress-bar mt-2">
                  <div className="rl-progress-fill red" style={{width: '33%'}}></div>
                </div>
                <div className="rl-footer mt-2">Resets every 60 seconds</div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'Events' && (
          <div className="fade-in">
            <div className="events-filter-bar">
              <div className="filter-group">
                <label className="filter-label">Event Type</label>
                <div className="position-relative">
                  <select className="sec-select text-slate" style={{appearance: 'none'}}>
                    <option>All Event Types</option>
                  </select>
                  <ChevronDown size={14} className="text-slate position-absolute" style={{right: '12px', top: '10px', pointerEvents: 'none'}} />
                </div>
              </div>
              <div className="filter-group">
                <label className="filter-label">Severity</label>
                <div className="position-relative">
                  <select className="sec-select text-slate" style={{appearance: 'none'}}>
                    <option>All Severities</option>
                  </select>
                  <ChevronDown size={14} className="text-slate position-absolute" style={{right: '12px', top: '10px', pointerEvents: 'none'}} />
                </div>
              </div>
              <div className="filter-group">
                <label className="filter-label">From Date</label>
                <div className="position-relative">
                  <input type="text" className="sec-input text-slate" placeholder="dd - mm - yyyy" />
                  <Calendar size={14} className="text-slate position-absolute" style={{right: '12px', top: '10px', pointerEvents: 'none'}} />
                </div>
              </div>
              <div className="filter-group">
                <label className="filter-label">To Date</label>
                <div className="position-relative">
                  <input type="text" className="sec-input text-slate" placeholder="dd - mm - yyyy" />
                  <Calendar size={14} className="text-slate position-absolute" style={{right: '12px', top: '10px', pointerEvents: 'none'}} />
                </div>
              </div>
              <div className="d-flex gap-2 ms-auto">
                <Button className="btn btn-primary bg-blue border-0 px-4 fw-semibold shadow-sm">Apply</Button>
                <Button variant="secondary" className="btn btn-secondary text-white border-0 px-4 fw-semibold shadow-sm" style={{background: '#64748b'}}>Clear</Button>
              </div>
            </div>

            <div className="sec-events-table-wrapper border">
              <div className="sec-table-header bg-light">
                <div className="sec-table-title">Security Events</div>
                <div className="sec-table-count">{mappedEvents.length} events</div>
              </div>
              <div className="table-responsive">
                <table className="sec-table">
                  <thead>
                    <tr>
                      <th>TIME</th>
                      <th>EVENT</th>
                      <th>SEVERITY</th>
                      <th>USER</th>
                      <th>IP ADDRESS</th>
                      <th>DETAILS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mappedEvents.length > 0 ? (
                      mappedEvents.map((event, idx) => (
                        <tr key={event.id || idx}>
                          <td>{event.time}</td>
                          <td>
                            <div className="event-type">
                              {getEventIcon(event.type)} {event.type}
                            </div>
                          </td>
                          <td>{getSeverityBadge(event.severity)}</td>
                          <td>{event.user}</td>
                          <td className="ip-address">{event.ip}</td>
                          <td className="text-truncate-custom">{event.details}</td>
                          <td>
                            <Button variant="ghost" className="btn btn-link p-0 text-blue text-decoration-none fw-semibold" style={{fontSize: '0.85rem'}}>
                              View
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center p-4 text-slate">No security events found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Encryption' && (
          <div className="fade-in">
            <div className="enc-card shadow-sm">
              <div className="enc-title">
                <Lock size={18} className="text-slate" /> Encryption Test
              </div>
              <div className="enc-desc">
                Test the field encryption functionality. Enter sensitive data below to see how it gets encrypted and decrypted using Fernet (AES-128-CBC + HMAC).
              </div>

              <div className="enc-input-group">
                <label className="fw-semibold text-dark mb-1" style={{fontSize: '0.85rem'}}>Text to Encrypt</label>
                <div className="enc-input-row">
                  <input type="text" className="sec-input" placeholder="Enter sensitive data (e.g., SSN-123-45-6789)" />
                  <Button className="btn btn-primary bg-blue border-0 fw-semibold px-4 shadow-sm">Test Encryption</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'IP Blocklist' && (
          <div className="fade-in">
            <div className="enc-card shadow-sm">
              <div className="blocklist-header">
                <div className="blocklist-title">IP Blocklist</div>
                <div className="blocklist-count">0 blocked</div>
              </div>
              <div className="blocklist-desc">Block malicious or unauthorized IP addresses.</div>

              <div className="blocklist-input-row">
                <input type="text" className="sec-input w-50" placeholder="IP Address (e.g., 192.168.1.100)" />
                <input type="text" className="sec-input w-50" placeholder="Reason (optional)" />
                <Button variant="destructive" className="btn btn-danger border-0 fw-semibold px-4 shadow-sm d-flex align-items-center gap-2">
                  <ShieldBan size={16} /> Block IP
                </Button>
              </div>

              <div className="blocklist-empty">
                <ShieldBan size={48} className="text-red opacity-75" />
                <p><strong>No blocked IPs</strong></p>
                <span style={{fontSize: '0.85rem'}}>The blocklist is empty. Add IPs above to block them.</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Configuration' && (
          <div className="fade-in">
            <div className="config-grid">

              <div className="config-card shadow-sm">
                <div className="config-title">Rate Limiting Configuration</div>

                <div className="config-section-title">AUTHENTICATION</div>
                <div className="config-row">
                  <span className="config-label blue">login</span>
                  <span className="config-value">5 requests / 60s</span>
                </div>
                <div className="config-row">
                  <span className="config-label blue">register</span>
                  <span className="config-value">3 requests / 60s</span>
                </div>
                <div className="config-row">
                  <span className="config-label blue">password_reset</span>
                  <span className="config-value">3 requests / 300s</span>
                </div>
                <div className="config-row">
                  <span className="config-label blue">otp</span>
                  <span className="config-value">5 requests / 60s</span>
                </div>

                <div className="config-section-title mt-4">API</div>
                <div className="config-row">
                  <span className="config-label blue">default</span>
                  <span className="config-value">100 requests / 60s</span>
                </div>
                <div className="config-row">
                  <span className="config-label blue">search</span>
                  <span className="config-value">30 requests / 60s</span>
                </div>
                <div className="config-row">
                  <span className="config-label blue">export</span>
                  <span className="config-value">10 requests / 60s</span>
                </div>
                <div className="config-row">
                  <span className="config-label blue">upload</span>
                  <span className="config-value">20 requests / 60s</span>
                </div>
              </div>

              <div className="config-card shadow-sm">
                <div className="config-title">Security Headers</div>
                <div className="header-badges">
                  <span className="header-badge">X-Content-Type-Options</span>
                  <span className="header-badge">X-Frame-Options</span>
                  <span className="header-badge">X-XSS-Protection</span>
                  <span className="header-badge">Referrer-Policy</span>
                  <span className="header-badge">Permissions-Policy</span>
                  <span className="header-badge">Content-Security-Policy</span>
                </div>
              </div>

              <div className="config-card shadow-sm">
                <div className="config-title">Encryption</div>
                <div className="config-row">
                  <span className="config-label blue">Algorithm</span>
                  <span className="config-value">Fernet (AES-128-CBC + HMAC)</span>
                </div>
                <div className="config-row">
                  <span className="config-label blue">Status</span>
                  <span className="config-value badge">Enabled</span>
                </div>
              </div>

              <div className="config-card shadow-sm">
                <div className="config-title">Environment</div>
                <div className="config-row">
                  <span className="config-label text-dark fw-medium">Debug Mode</span>
                  <span className="config-value fw-bold text-orange" style={{fontSize: '0.85rem'}}>ON</span>
                </div>
                <div className="config-row">
                  <span className="config-label text-dark fw-medium">CORS</span>
                  <span className="config-value fw-bold text-green" style={{fontSize: '0.85rem'}}>Enabled</span>
                </div>
                <div className="config-row">
                  <span className="config-label text-dark fw-medium">HTTPS Enforced</span>
                  <span className="config-value fw-bold text-green" style={{fontSize: '0.85rem'}}>Enabled</span>
                </div>
                <div className="config-row">
                  <span className="config-label text-dark fw-medium">Session Timeout</span>
                  <span className="config-value text-slate" style={{fontSize: '0.85rem'}}>30 minutes</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Security;
