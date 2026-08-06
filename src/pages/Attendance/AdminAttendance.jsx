import React, { useState } from 'react';
import Breadcrumb from '../../components/dashboard/Breadcrumb';
import Button from '../../components/common/Button';
import { 
  Calendar as CalendarIcon, Clock, Edit3, History, CalendarDays, Search,
  X, MapPin, Home, MoreHorizontal, ChevronLeft, ChevronRight, Eye, Trash2
} from 'lucide-react';
import './AdminAttendance.css';

import { 
  todaysRecords, overtimeRecords, regularizationRequests, 
  historyRecords, generateCalendarData, absentEmployees, lateArrivals
} from '../../data/adminAttendanceData';

const AdminAttendance = () => {
  const [activeTab, setActiveTab] = useState('Today'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null); 
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [calendarData] = useState(generateCalendarData());
  const [activeActionMenu, setActiveActionMenu] = useState(null); 
  const openDrawer = (employee) => {
    setSelectedEmployee(employee);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedEmployee(null), 300);
  };

  const renderTabBadge = (count) => {
    return <span className="tab-badge">{count}</span>;
  };

  return (
    <div className="admin-attendance-container">

      <div>
        <Breadcrumb items={['Dashboard', 'Attendance']} />
        <h1 className="page-title m-0">Attendance Overview</h1>
        <p className="text-muted small m-0 mt-1">Daily check-ins, overtime, regularization and monthly summaries</p>
      </div>

      <div className="row g-3">
        <div className="col-12 col-md-3">
          <div className="summary-card">
            <div>
              <div className="summary-card-title">PRESENT TODAY</div>
              <div className="summary-card-value present">18</div>
            </div>
            <div className="summary-card-subtext">of 24 employees</div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="summary-card">
            <div>
              <div className="summary-card-title">ABSENT TODAY</div>
              <div className="summary-card-value absent">3</div>
            </div>
            <div className="summary-card-subtext">2 on approved leave</div>
          </div>
        </div>
        <div className="col-12 col-md-2">
          <div className="summary-card">
            <div>
              <div className="summary-card-title">LATE ARRIVALS</div>
              <div className="summary-card-value late">2</div>
            </div>
            <div className="summary-card-subtext">after 9:30 AM</div>
          </div>
        </div>
        <div className="col-12 col-md-2">
          <div className="summary-card">
            <div>
              <div className="summary-card-title">WORK FROM HOME</div>
              <div className="summary-card-value wfh">5</div>
            </div>
            <div className="summary-card-subtext">remote today</div>
          </div>
        </div>
        <div className="col-12 col-md-2">
          <div className="summary-card">
            <div>
              <div className="summary-card-title">OVERTIME (HRS)</div>
              <div className="summary-card-value overtime">14</div>
            </div>
            <div className="summary-card-subtext">this week</div>
          </div>
        </div>
      </div>

      <div className="admin-attendance-tabs mt-2">
        <div className={`admin-attendance-tab ${activeTab === 'Today' ? 'active' : ''}`} onClick={() => setActiveTab('Today')}>
          <CalendarIcon size={16} /> Today's Records {renderTabBadge(18)}
        </div>
        <div className={`admin-attendance-tab ${activeTab === 'Overtime' ? 'active' : ''}`} onClick={() => setActiveTab('Overtime')}>
          <Clock size={16} /> Overtime {renderTabBadge(8)}
        </div>
        <div className={`admin-attendance-tab ${activeTab === 'Regularization' ? 'active' : ''}`} onClick={() => setActiveTab('Regularization')}>
          <Edit3 size={16} /> Regularization {renderTabBadge(5)}
        </div>
        <div className={`admin-attendance-tab ${activeTab === 'History' ? 'active' : ''}`} onClick={() => setActiveTab('History')}>
          <History size={16} /> History
        </div>
        <div className={`admin-attendance-tab ${activeTab === 'Monthly' ? 'active' : ''}`} onClick={() => setActiveTab('Monthly')}>
          <CalendarDays size={16} /> Monthly Summary
        </div>
      </div>

      <div className="bg-white border rounded shadow-sm overflow-hidden position-relative p-4">

        {activeTab === 'Today' && (
          <div onClick={() => setActiveActionMenu(null)}>
            <div className="d-flex mb-4 gap-3">
              <div className="position-relative flex-grow-1">
                <Search className="position-absolute text-muted" size={16} style={{left: '12px', top: '10px'}} />
                <input 
                  type="text" 
                  className="form-control ps-5 bg-light border-0" 
                  placeholder="Search employees..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="position-relative" style={{width: '160px'}}>
                <input type="date" className="form-control border bg-white" defaultValue="2026-04-22" />
              </div>
              <select className="form-select border bg-white w-auto" style={{minWidth: '130px'}}>
                <option>All status</option>
                <option>Present</option>
                <option>Absent</option>
                <option>Late</option>
                <option>Work From Home</option>
              </select>
              <select className="form-select border bg-white w-auto" style={{minWidth: '150px'}}>
                <option>All departments</option>
                <option>All Employees</option>
                <option>Engineer Team</option>
                <option>Development Team</option>
              </select>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead>
                  <tr>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Employee</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Check-in</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Check-out</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Location</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Working hrs</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Status</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {todaysRecords.map(rec => (
                    <tr key={rec.id}>
                      <td className="py-3 cursor-pointer" onClick={() => openDrawer(rec)}>
                        <div className="d-flex align-items-center gap-3">
                          <div className={`avatar-circle avatar-bg-${rec.color}`}>{rec.initials}</div>
                          <div>
                            <div className="fw-semibold text-dark">{rec.name}</div>
                            <div className="small text-muted">{rec.dept}</div>
                          </div>
                        </div>
                      </td>
                      <td className={`py-3 fw-medium ${rec.status === 'Late' ? 'text-warning-dark' : rec.status === 'Absent' ? 'text-muted' : 'text-success'}`}>{rec.checkIn}</td>
                      <td className="py-3 fw-medium text-dark">{rec.checkOut}</td>
                      <td className="py-3">
                        {rec.location === 'Office' ? (
                          <div className="location-text"><MapPin size={14} /> Office</div>
                        ) : rec.location === 'WFH' ? (
                          <div className="location-text wfh"><Home size={14} /> WFH</div>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td className="py-3 fw-bold text-dark">{rec.status === 'Absent' ? '—' : '9h 10m'}</td>
                      <td className="py-3">
                        <span className={`status-badge ${rec.status.toLowerCase()}`}>{rec.status}</span>
                      </td>
                      <td className="py-3 position-relative">
                        <Button 
                          variant="icon" 
                          className="btn btn-sm btn-light border-0 rounded-circle text-muted p-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveActionMenu(activeActionMenu === rec.id ? null : rec.id);
                          }}
                        >
                          <MoreHorizontal size={16} />
                        </Button>
                        {activeActionMenu === rec.id && (
                          <div className="dropdown-menu show position-absolute" style={{right: '30px', top: '40px', zIndex: 1000, minWidth: '150px'}} onClick={e => e.stopPropagation()}>
                            <button className="dropdown-item d-flex align-items-center gap-2 small py-2" onClick={() => { openDrawer(rec); setActiveActionMenu(null); }}>
                              <Eye size={14} className="text-muted" /> View detail
                            </button>
                            <button className="dropdown-item d-flex align-items-center gap-2 small py-2 text-danger">
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
              <span className="small text-muted">Showing 1-8 of 48</span>
              <div className="d-flex gap-1">
                <Button variant="ghost" className="btn btn-sm btn-light border px-2"><ChevronLeft size={14}/></Button>
                <Button className="btn btn-sm btn-primary px-3">1</Button>
                <Button variant="ghost" className="btn btn-sm btn-light border px-3">2</Button>
                <Button variant="ghost" className="btn btn-sm btn-light border px-2"><ChevronRight size={14}/></Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Overtime' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="m-0 fw-bold">Overtime records</h5>
              <span className="badge bg-light text-dark border px-3 py-2">8 employees</span>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead>
                  <tr>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Employee</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Date</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Regular hrs</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Overtime hrs</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Total hrs</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Reason</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {overtimeRecords.map(rec => (
                    <tr key={rec.id}>
                      <td className="py-3">
                        <div className="d-flex align-items-center gap-3">
                          <div className={`avatar-circle avatar-bg-${rec.color}`}>{rec.initials}</div>
                          <div>
                            <div className="fw-semibold text-dark">{rec.name}</div>
                            <div className="small text-muted">{rec.dept}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 fw-medium text-dark">{rec.date}</td>
                      <td className="py-3 fw-medium text-dark">{rec.regularHrs}</td>
                      <td className="py-3 fw-semibold overtime-text">{rec.overtimeHrs}</td>
                      <td className="py-3 fw-bold text-dark">{rec.totalHrs}</td>
                      <td className="py-3 text-muted small">{rec.reason}</td>
                      <td className="py-3">
                        <Button variant="secondary" className="btn btn-sm btn-light border text-blue fw-semibold">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
              <span className="small text-muted">Showing 1-8 of 48</span>
              <div className="d-flex gap-1">
                <Button variant="ghost" className="btn btn-sm btn-light border px-2"><ChevronLeft size={14}/></Button>
                <Button className="btn btn-sm btn-primary px-3">1</Button>
                <Button variant="ghost" className="btn btn-sm btn-light border px-3">2</Button>
                <Button variant="ghost" className="btn btn-sm btn-light border px-2"><ChevronRight size={14}/></Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Regularization' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="m-0 fw-bold">Regularization requests</h5>
              <span className="badge bg-light text-dark border px-3 py-2">5 pending</span>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead>
                  <tr>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Employee</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Date</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Missed</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Reason</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Requested on</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Status</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {regularizationRequests.map(rec => (
                    <tr key={rec.id}>
                      <td className="py-3">
                        <div className="d-flex align-items-center gap-3">
                          <div className={`avatar-circle avatar-bg-${rec.color}`}>{rec.initials}</div>
                          <div>
                            <div className="fw-semibold text-dark">{rec.name}</div>
                            <div className="small text-muted">{rec.dept}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-muted">{rec.date}</td>
                      <td className="py-3"><span className="missed-text">{rec.missed}</span></td>
                      <td className="py-3 text-dark">{rec.reason}</td>
                      <td className="py-3 text-muted">{rec.requestedOn}</td>
                      <td className="py-3">
                        <span className={`status-badge ${rec.status.toLowerCase()}`}>{rec.status}</span>
                      </td>
                      <td className="py-3">
                        {rec.status === 'Pending' ? (
                          <div className="d-flex gap-2">
                            <Button variant="secondary" className="btn btn-sm btn-light border text-success fw-semibold bg-success-light">Approve</Button>
                            <Button variant="secondary" className="btn btn-sm btn-light border text-danger fw-semibold bg-danger-light">Reject</Button>
                          </div>
                        ) : (
                          <Button variant="secondary" className="btn btn-sm btn-light border text-blue fw-semibold">View</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
              <span className="small text-muted">Showing 1-8 of 48</span>
              <div className="d-flex gap-1">
                <Button variant="ghost" className="btn btn-sm btn-light border px-2"><ChevronLeft size={14}/></Button>
                <Button className="btn btn-sm btn-primary px-3">1</Button>
                <Button variant="ghost" className="btn btn-sm btn-light border px-3">2</Button>
                <Button variant="ghost" className="btn btn-sm btn-light border px-2"><ChevronRight size={14}/></Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'History' && (
          <div>
            <div className="d-flex mb-4 gap-3">
              <div className="position-relative flex-grow-1" style={{maxWidth: '500px'}}>
                <Search className="position-absolute text-muted" size={16} style={{left: '12px', top: '10px'}} />
                <input type="text" className="form-control ps-5 bg-white border" placeholder="Search by employee..." />
              </div>
              <select className="form-select w-auto bg-white border">
                <option>All employees</option>
              </select>
              <div className="position-relative">
                <input type="date" className="form-control bg-white border" defaultValue="2026-04-22" />
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead>
                  <tr>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Employee</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Check-in</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Check-out</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Location</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Working hrs</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Status</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {historyRecords.map(rec => (
                    <tr key={rec.id}>
                      <td className="py-3">
                        <div className="d-flex align-items-center gap-3">
                          <div className={`avatar-circle avatar-bg-${rec.color}`}>{rec.initials}</div>
                          <div>
                            <div className="fw-semibold text-dark">{rec.name}</div>
                            <div className="small text-muted">{rec.dept}</div>
                          </div>
                        </div>
                      </td>
                      <td className={`py-3 fw-medium ${rec.status === 'Late' ? 'text-warning-dark' : rec.status === 'Absent' ? 'text-muted' : 'text-success'}`}>{rec.checkIn}</td>
                      <td className="py-3 fw-medium text-dark">{rec.checkOut}</td>
                      <td className="py-3">
                        {rec.location === 'Office' ? (
                          <div className="location-text"><MapPin size={14} /> Office</div>
                        ) : rec.location === 'WFH' ? (
                          <div className="location-text wfh"><Home size={14} /> WFH</div>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td className="py-3 fw-bold text-dark">{rec.workingHrs}</td>
                      <td className="py-3">
                        <span className={`status-badge ${rec.status.toLowerCase()}`}>{rec.status}</span>
                      </td>
                      <td className="py-3">
                        <Button variant="icon" className="btn btn-sm btn-light border-0 rounded-circle text-muted p-1">
                          <MoreHorizontal size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
              <span className="small text-muted">Showing 1-8 of 48</span>
              <div className="d-flex gap-1">
                <Button variant="ghost" className="btn btn-sm btn-light border px-2"><ChevronLeft size={14}/></Button>
                <Button className="btn btn-sm btn-primary px-3">1</Button>
                <Button variant="ghost" className="btn btn-sm btn-light border px-3">2</Button>
                <Button variant="ghost" className="btn btn-sm btn-light border px-2"><ChevronRight size={14}/></Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Monthly' && (
          <div>
            <div className="row g-4">
              <div className="col-12 col-xl-8">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <Button variant="ghost" className="btn btn-sm btn-light border"><ChevronLeft size={16}/></Button>
                    <h5 className="m-0 fw-bold mx-2">April 2026</h5>
                    <Button variant="ghost" className="btn btn-sm btn-light border"><ChevronRight size={16}/></Button>
                  </div>
                  <div className="small text-muted">Click any date to view details</div>
                </div>

                <div className="d-flex gap-3 my-3 small text-muted fw-semibold">
                  <span className="d-flex align-items-center gap-1"><div className="timeline-dot green" style={{width:8, height:8}}></div> Present</span>
                  <span className="d-flex align-items-center gap-1"><div className="timeline-dot" style={{width:8, height:8, background: '#ef4444'}}></div> Absent</span>
                  <span className="d-flex align-items-center gap-1"><div className="timeline-dot orange" style={{width:8, height:8}}></div> Late</span>
                  <span className="d-flex align-items-center gap-1"><div className="timeline-dot blue" style={{width:8, height:8}}></div> WFH</span>
                </div>

                <div className="calendar-grid mt-4">
                  <div className="calendar-header">Sun</div>
                  <div className="calendar-header">Mon</div>
                  <div className="calendar-header">Tue</div>
                  <div className="calendar-header">Wed</div>
                  <div className="calendar-header">Thu</div>
                  <div className="calendar-header">Fri</div>
                  <div className="calendar-header">Sat</div>

                  {calendarData.map((day, idx) => (
                    <div key={idx} className={`calendar-day ${day.empty ? 'empty' : ''} ${day.type || ''} ${day.date === 30 ? 'border-primary' : ''}`}>
                      {!day.empty && (
                        <>
                          <div className="calendar-day-date">{day.date}</div>
                          {day.type === 'weekend' && <div className="text-center small mt-auto pb-2">Weekend</div>}
                          {day.type === 'holiday' && <div className="text-center small mt-auto pb-2 text-blue fw-semibold">{day.title}</div>}
                          {day.type === 'workday' && day.stats && (
                            <div className="mt-auto w-100">
                              <div className="calendar-day-dots">
                                {day.stats.absent > 0 && (
                                  <div className="calendar-dot-item">
                                    <div className="cal-dot absent">{day.stats.absent}</div>
                                  </div>
                                )}
                                {day.stats.late > 0 && (
                                  <div className="calendar-dot-item">
                                    <div className="cal-dot late">{day.stats.late}</div>
                                  </div>
                                )}
                              </div>
                              <div className="text-center text-muted mt-2" style={{fontSize: '0.65rem'}}>{day.stats.presentPercentage}%</div>
                            </div>
                          )}
                          {day.date === 30 && <div className="bg-primary position-absolute rounded-pill" style={{height: 4, width: 30, bottom: 5, left: '50%', transform: 'translateX(-50%)'}}></div>}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-12 col-xl-4">
                <div className="monthly-side-panel h-100">
                  <h5 className="fw-bold mb-4">April 30, 2026</h5>
                  <div className="d-flex gap-2 mb-4">
                    <div className="bg-success-light text-success text-center rounded p-2 flex-grow-1">
                      <div className="fs-3 fw-bold lh-1">130</div>
                      <div className="small">Present</div>
                    </div>
                    <div className="bg-danger-light text-danger text-center rounded p-2 flex-grow-1">
                      <div className="fs-3 fw-bold lh-1">7</div>
                      <div className="small">Absent</div>
                    </div>
                    <div className="bg-warning-light text-warning-dark text-center rounded p-2 flex-grow-1">
                      <div className="fs-3 fw-bold lh-1">5</div>
                      <div className="small">Late</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="small fw-bold text-muted text-uppercase tracking-wide mb-3">ABSENT EMPLOYEES</div>
                    <div className="d-flex flex-column gap-3">
                      {absentEmployees.map(emp => (
                        <div key={emp.id} className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center gap-2">
                            <div className={`avatar-circle avatar-bg-${emp.color}`} style={{width:24, height:24, fontSize:'0.65rem'}}>{emp.initials}</div>
                            <div className="lh-1">
                              <div className="fw-semibold text-dark text-sm">{emp.name}</div>
                              <div className="text-muted" style={{fontSize: '0.75rem'}}>{emp.dept}</div>
                            </div>
                          </div>
                          <span className="badge bg-danger-light text-danger border-0">Absent</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="small fw-bold text-muted text-uppercase tracking-wide mb-3">LATE ARRIVALS</div>
                    <div className="d-flex flex-column gap-3">
                      {lateArrivals.map(emp => (
                        <div key={emp.id} className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center gap-2">
                            <div className={`avatar-circle avatar-bg-${emp.color}`} style={{width:24, height:24, fontSize:'0.65rem'}}>{emp.initials}</div>
                            <div className="lh-1">
                              <div className="fw-semibold text-dark text-sm">{emp.name}</div>
                            </div>
                          </div>
                          <span className="badge bg-warning-light text-warning-dark border-0">{emp.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="mt-5">
              <h6 className="fw-bold mb-4">Monthly Attendance Trend</h6>
              <div className="position-relative bg-light rounded border p-4" style={{height: '250px'}}>
                <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="none">

                  <path d="M 0,200 L 0,40 C 100,60 200,30 300,40 C 400,50 500,20 600,40 C 700,60 800,40 800,40 L 800,200 Z" fill="#ecfdf5" opacity="0.5" />

                  <path d="M 0,40 C 100,60 200,30 300,40 C 400,50 500,20 600,40 C 700,60 800,40 800,40" fill="none" stroke="#10b981" strokeWidth="4" />

                  <circle cx="0" cy="40" r="4" fill="#10b981" />
                  <circle cx="150" cy="45" r="4" fill="#10b981" />
                  <circle cx="300" cy="40" r="4" fill="#10b981" />
                  <circle cx="500" cy="20" r="4" fill="#10b981" />
                  <circle cx="650" cy="45" r="4" fill="#10b981" />
                  <circle cx="800" cy="40" r="4" fill="#10b981" />

                  <path d="M 0,180 C 100,175 200,185 300,180 C 400,190 500,170 600,180 C 700,185 800,180 800,180" fill="none" stroke="#ef4444" strokeWidth="3" />

                  <circle cx="0" cy="180" r="3" fill="#ef4444" />
                  <circle cx="150" cy="178" r="3" fill="#ef4444" />
                  <circle cx="300" cy="180" r="3" fill="#ef4444" />
                  <circle cx="500" cy="170" r="3" fill="#ef4444" />
                  <circle cx="650" cy="182" r="3" fill="#ef4444" />
                  <circle cx="800" cy="180" r="3" fill="#ef4444" />
                </svg>

                <div className="d-flex justify-content-between position-absolute text-muted small" style={{bottom: '10px', left: '20px', right: '20px'}}>
                  <span>Apr 1</span>
                  <span>Apr 5</span>
                  <span>Apr 10</span>
                  <span>Apr 15</span>
                  <span>Apr 20</span>
                  <span>Apr 25</span>
                  <span>Apr 30</span>
                </div>
                <div className="d-flex flex-column justify-content-between position-absolute text-muted small" style={{top: '20px', bottom: '30px', left: '-25px'}}>
                  <span>150</span>
                  <span>120</span>
                  <span>90</span>
                  <span>60</span>
                  <span>30</span>
                  <span>0</span>
                </div>
              </div>
              <div className="d-flex justify-content-center gap-4 mt-3">
                <span className="d-flex align-items-center gap-2 small fw-semibold"><div className="border border-2 border-success px-2 py-1"></div> Present</span>
                <span className="d-flex align-items-center gap-2 small fw-semibold"><div className="border border-2 border-danger px-2 py-1"></div> Absent</span>
              </div>
            </div>
          </div>
        )}

      </div>

      <div className={`attendance-drawer ${isDrawerOpen ? 'open' : ''}`}>
        {selectedEmployee && (
          <>
            <div className="drawer-header">
              <div>
                <h5 className="m-0 fw-bold">{selectedEmployee.name}</h5>
                <p className="text-muted small m-0 mt-1">April 22, 2026 · {selectedEmployee.status.toLowerCase()}</p>
              </div>
              <Button variant="ghost" className="btn btn-sm btn-light border-0 p-1 rounded-circle" onClick={closeDrawer}>
                <X size={18} />
              </Button>
            </div>
            <div className="drawer-content">
              <div className="small fw-bold text-muted text-uppercase tracking-wide mb-3">RECORD</div>
              <div className="d-flex flex-column gap-3 mb-5">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted small">Status</span>
                  <span className={`status-badge ${selectedEmployee.status.toLowerCase()}`}>{selectedEmployee.status}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted small">Check-in</span>
                  <span className="fw-medium text-dark">{selectedEmployee.checkIn}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted small">Check-out</span>
                  <span className="fw-medium text-dark">{selectedEmployee.checkOut}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted small">Location</span>
                  <span className="fw-medium text-dark">{selectedEmployee.location}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted small">Working hours</span>
                  <span className="fw-bold text-blue">8h 45m</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted small">Department</span>
                  <span className="fw-medium text-dark">{selectedEmployee.dept}</span>
                </div>
              </div>

              <div className="small fw-bold text-muted text-uppercase tracking-wide mb-4">TIMELINE</div>
              <div className="timeline-container ps-2">
                <div className="timeline-event">
                  <div className="timeline-dot-wrapper">
                    <div className="timeline-dot green border border-2 border-white shadow-sm" style={{width: 12, height: 12}}></div>
                  </div>
                  <div>
                    <div className="text-dark fw-semibold lh-1 mb-1">Checked in at {selectedEmployee.checkIn}</div>
                    <div className="text-muted small">Office · April 22, 2026</div>
                  </div>
                </div>
                <div className="timeline-event">
                  <div className="timeline-dot-wrapper">
                    <div className="timeline-dot blue border border-2 border-white shadow-sm" style={{width: 12, height: 12}}></div>
                  </div>
                  <div>
                    <div className="text-dark fw-semibold lh-1 mb-1">Checked out at {selectedEmployee.checkOut}</div>
                    <div className="text-muted small">Office · April 22, 2026</div>
                  </div>
                </div>
                {selectedEmployee.status === 'Late' && (
                  <div className="timeline-event">
                    <div className="timeline-dot-wrapper">
                      <div className="timeline-dot orange border border-2 border-white shadow-sm" style={{width: 12, height: 12}}></div>
                    </div>
                    <div>
                      <div className="text-dark fw-semibold lh-1 mb-1">Marked as late arrival</div>
                      <div className="text-muted small">Expected by 09:30 AM</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="drawer-footer d-flex justify-content-end">
              <Button variant="secondary" className="btn btn-light bg-white border fw-semibold px-4" onClick={closeDrawer}>Close</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminAttendance;
