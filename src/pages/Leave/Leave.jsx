import { useState, useEffect } from 'react';  

import Breadcrumb from '../../components/dashboard/Breadcrumb';
import FilterPills from '../../components/common/FilterPills';
import Modal from '../../components/common/Modal';
import { 
  Plus, Search, ChevronLeft, ChevronRight, 
  Heart, Thermometer, Briefcase, Baby, User, CheckCircle2, X
} from 'lucide-react';
import './Leave.css';
import Button from '../../components/common/Button';
import { leaveService } from '../../services';

const Leave = ({ onTabChange, onNavigateHome }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [leaveForm, setLeaveForm] = useState({ type: '', fromDate: '', toDate: '', reason: '' });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [leaveList, setLeaveList] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState(null);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const leaves = await leaveService.getLeaves();
        const balance = await leaveService.getLeaveBalance();
        const rawList = Array.isArray(leaves) 
          ? leaves 
          : Array.isArray(leaves?.data?.results) 
          ? leaves.data.results 
          : Array.isArray(leaves?.results) 
          ? leaves.results 
          : Array.isArray(leaves?.data) 
          ? leaves.data 
          : [];
        setLeaveList(rawList);
        if (balance) setLeaveBalance(balance);
      } catch (err) {
        setLeaveList([]);
      }
    };

    fetchLeaves();
  }, []);

  const mappedLeaves = leaveList.map((item, idx) => ({
    id: item.id || idx + 1,
    dateRange: item.start_date && item.end_date ? `${item.start_date} - ${item.end_date}` : '2026-06-01',
    days: `${item.total_days || 1} day${parseFloat(item.total_days) > 1 ? 's' : ''}`,
    type: item.leave_type_name || item.leave_type || 'Annual Leave',
    typeColor: item.leave_type_name === 'Sick Leave' ? 'danger' : (item.leave_type_name === 'Casual Leave' ? 'warning' : 'primary'),
    reason: item.reason || '',
    applied: item.created_at ? item.created_at.split('T')[0] : '2026-05-20',
    status: item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'Pending'
  }));

  const filteredData = mappedLeaves.filter(row => {
    if (activeFilter === 'All') return true;
    return row.status.toLowerCase() === activeFilter.toLowerCase();
  });

  const handleSubmitLeave = async () => {
    try {
      await leaveService.submitLeaveRequest(leaveForm);
    } catch (e) {
      console.warn('Leave submission API fallback:', e);
    }
    setIsApplyModalOpen(false);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);
  };

  return (
    <>
      <div className="dashboard-container">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <Breadcrumb items={['Dashboard', 'Leave']} />
            <h1 className="page-title m-0">Leave Management</h1>
            <p className="text-muted small m-0 mt-1">Track your leave balances and request time off</p>
          </div>
          <Button 
            className="btn btn-primary bg-blue border-0 px-4 py-2 fw-semibold d-flex align-items-center shadow-sm"
            onClick={() => setIsApplyModalOpen(true)}
          >
            <Plus size={18} className="me-2" /> Apply for Leave
          </Button>
        </div>

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="small fw-bold text-muted text-uppercase tracking-wide">LEAVE BALANCES</span>
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex gap-1 me-3">
                <div className="bg-blue rounded-pill" style={{ width: 16, height: 4 }}></div>
                <div className="bg-light rounded-circle" style={{ width: 4, height: 4 }}></div>
                <div className="bg-light rounded-circle" style={{ width: 4, height: 4 }}></div>
              </div>
              <Button variant="icon" className="btn btn-sm btn-light border p-1 text-muted rounded"><ChevronLeft size={16} /></Button>
              <Button variant="icon" className="btn btn-sm btn-light border p-1 text-muted rounded"><ChevronRight size={16} /></Button>
            </div>
          </div>

          <div className="row g-4 flex-nowrap overflow-auto hide-scrollbar pb-2">

            <div className="col-12 col-md-4 min-w-300">
              <div className="bg-white rounded border p-4 shadow-sm h-100">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="small fw-bold text-muted text-uppercase tracking-wide">CASUAL LEAVE</span>
                  <div className="bg-warning-light text-warning-dark p-2 rounded">
                    <Heart size={16} />
                  </div>
                </div>
                <div className="d-flex align-items-baseline mb-1">
                  <h1 className="display-4 fw-bold text-dark m-0 me-2 lh-1">5</h1>
                  <span className="text-muted fw-semibold">/ 10</span>
                </div>
                <p className="text-muted small mb-4">Days remaining this year</p>
                <div className="progress bg-light rounded-pill mb-2" style={{ height: '4px' }}>
                  <div className="progress-bar bg-warning rounded-pill" style={{ width: '50%' }}></div>
                </div>
                <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.7rem' }}>
                  <span>5 used</span>
                  <span>10 total</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4 min-w-300">
              <div className="bg-white rounded border p-4 shadow-sm h-100">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="small fw-bold text-muted text-uppercase tracking-wide">SICK LEAVE</span>
                  <div className="bg-danger-light text-danger p-2 rounded">
                    <Thermometer size={16} />
                  </div>
                </div>
                <div className="d-flex align-items-baseline mb-1">
                  <h1 className="display-4 fw-bold text-dark m-0 me-2 lh-1">4</h1>
                  <span className="text-muted fw-semibold">/ 12</span>
                </div>
                <p className="text-danger fw-semibold small mb-4">Low balance &mdash; plan ahead</p>
                <div className="progress bg-light rounded-pill mb-2" style={{ height: '4px' }}>
                  <div className="progress-bar bg-danger rounded-pill" style={{ width: '66%' }}></div>
                </div>
                <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.7rem' }}>
                  <span>8 used</span>
                  <span>12 total</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4 min-w-300">
              <div className="bg-white rounded border p-4 shadow-sm h-100">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="small fw-bold text-muted text-uppercase tracking-wide">PAID LEAVE</span>
                  <div className="bg-blue-light text-blue p-2 rounded">
                    <Briefcase size={16} />
                  </div>
                </div>
                <div className="d-flex align-items-baseline mb-1">
                  <h1 className="display-4 fw-bold text-dark m-0 me-2 lh-1">15</h1>
                  <span className="text-muted fw-semibold">/ 20</span>
                </div>
                <p className="text-muted small mb-4">Days remaining this year</p>
                <div className="progress bg-light rounded-pill mb-2" style={{ height: '4px' }}>
                  <div className="progress-bar bg-blue rounded-pill" style={{ width: '25%' }}></div>
                </div>
                <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.7rem' }}>
                  <span>5 used</span>
                  <span>20 total</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4 min-w-300">
              <div className="bg-white rounded border p-4 shadow-sm h-100">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="small fw-bold text-muted text-uppercase tracking-wide">MATERNITY LEAVE</span>
                  <div className="bg-pink-light text-pink p-2 rounded" style={{ backgroundColor: '#fdf2f8', color: '#db2777' }}>
                    <Baby size={16} />
                  </div>
                </div>
                <div className="mb-4">
                  <span className="badge rounded-pill border fw-medium px-2 py-1" style={{ color: '#db2777', borderColor: '#fbcfe8', backgroundColor: '#fdf2f8' }}>
                    <div className="status-dot me-1" style={{ backgroundColor: '#db2777' }}></div> For Women only
                  </span>
                </div>
                <div className="d-flex align-items-baseline mb-1">
                  <h1 className="display-4 fw-bold text-dark m-0 me-2 lh-1">84</h1>
                  <span className="text-muted fw-semibold">/ 84</span>
                </div>
                <p className="text-muted small mb-4">Days available (not yet used)</p>
                <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.7rem' }}>
                  <span>0 used</span>
                  <span>84 total</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4 min-w-300">
              <div className="bg-white rounded border p-4 shadow-sm h-100">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="small fw-bold text-muted text-uppercase tracking-wide">PATERNITY LEAVE</span>
                  <div className="bg-purple-light text-purple p-2 rounded" style={{ backgroundColor: '#f3e8ff', color: '#9333ea' }}>
                    <User size={16} />
                  </div>
                </div>
                <div className="mb-4">
                  <span className="badge rounded-pill border fw-medium px-2 py-1" style={{ color: '#9333ea', borderColor: '#e9d5ff', backgroundColor: '#f3e8ff' }}>
                    <div className="status-dot me-1" style={{ backgroundColor: '#9333ea' }}></div> For Men only
                  </span>
                </div>
                <div className="d-flex align-items-baseline mb-1">
                  <h1 className="display-4 fw-bold text-dark m-0 me-2 lh-1">15</h1>
                  <span className="text-muted fw-semibold">/ 15</span>
                </div>
                <p className="text-muted small mb-4">Days available (not yet used)</p>
                <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.7rem' }}>
                  <span>0 used</span>
                  <span>15 total</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="bg-white rounded border shadow-sm mt-4">
          <div className="d-flex justify-content-between align-items-center p-3 border-bottom flex-wrap gap-3">
            <FilterPills 
              filters={['All', 'Approved', 'Pending', 'Rejected']} 
              activeFilter={activeFilter} 
              onFilterChange={setActiveFilter} 
            />
            <div className="position-relative">
              <Search size={16} className="position-absolute text-muted" style={{ top: '10px', left: '12px' }} />
              <input 
                type="text" 
                className="form-control bg-light border-0 ps-5 py-2" 
                placeholder="Search leave history..." 
                style={{ width: '250px' }}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="bg-white border-bottom">
                <tr>
                  <th className="text-muted small fw-bold text-uppercase tracking-wide py-3 px-4 border-0">DATE RANGE</th>
                  <th className="text-muted small fw-bold text-uppercase tracking-wide py-3 px-4 border-0">TYPE</th>
                  <th className="text-muted small fw-bold text-uppercase tracking-wide py-3 px-4 border-0">REASON</th>
                  <th className="text-muted small fw-bold text-uppercase tracking-wide py-3 px-4 border-0">APPLIED DATE</th>
                  <th className="text-muted small fw-bold text-uppercase tracking-wide py-3 px-4 border-0">STATUS</th>
                  <th className="text-muted small fw-bold text-uppercase tracking-wide py-3 px-4 border-0 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3">
                        <div className="fw-bold text-dark mb-1">{row.dateRange}</div>
                        <div className="text-muted small">{row.days}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`badge rounded-pill bg-${row.typeColor}-light border border-${row.typeColor} text-${row.typeColor === 'warning' ? 'warning-dark' : row.typeColor} fw-medium px-3 py-1`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted small">{row.reason}</td>
                      <td className="px-4 py-3 text-muted small">{row.applied}</td>
                      <td className="px-4 py-3">
                        {row.status === 'Approved' && (
                          <span className="badge rounded-pill bg-success-light border border-success text-success fw-medium px-3 py-1 d-inline-flex align-items-center gap-1">
                            <div className="status-dot bg-success"></div> {row.status}
                          </span>
                        )}
                        {row.status === 'Pending' && (
                          <span className="badge rounded-pill bg-warning-light border border-warning text-warning-dark fw-medium px-3 py-1 d-inline-flex align-items-center gap-1">
                            <div className="status-dot bg-warning"></div> {row.status}
                          </span>
                        )}
                        {row.status === 'Rejected' && (
                          <span className="badge rounded-pill bg-danger-light border border-danger text-danger fw-medium px-3 py-1 d-inline-flex align-items-center gap-1">
                            <div className="status-dot bg-danger"></div> {row.status}
                          </span>
                        )}
                        {row.status === 'Cancelled' && (
                          <span className="badge rounded-pill bg-secondary-light border border-secondary text-secondary fw-medium px-3 py-1 d-inline-flex align-items-center gap-1">
                            <div className="status-dot bg-secondary"></div> {row.status}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <Button variant="secondary" className="btn btn-sm btn-light border px-3 fw-medium text-muted" onClick={() => setSelectedLeave(row)}>View</Button>
                          {row.status === 'Pending' && (
                            <Button variant="destructive" className="btn btn-sm btn-light border px-3 fw-medium text-danger">Cancel</Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">No leave records found in database.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center p-3 border-top">
            <div className="text-muted small">Showing {filteredData.length} records</div>
            <div className="d-flex gap-1">
              <Button variant="icon" className="btn btn-sm btn-light border px-2 py-1 text-muted"><ChevronLeft size={16}/></Button>
              <Button className="btn btn-sm btn-primary bg-blue border-0 px-3 py-1 fw-medium">1</Button>
              <Button variant="secondary" className="btn btn-sm btn-light border px-3 py-1 text-muted">2</Button>
              <Button variant="secondary" className="btn btn-sm btn-light border px-3 py-1 text-muted">3</Button>
              <Button variant="icon" className="btn btn-sm btn-light border px-2 py-1 text-muted"><ChevronRight size={16}/></Button>
            </div>
          </div>
        </div>

        <Modal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          title={<>
            <h4 className="m-0 fw-bold text-dark">Apply for Leave</h4>
            <p className="text-muted small m-0 mt-1" style={{ fontSize: '0.85rem' }}>Submit a new leave request for manager approval</p>
          </>}
          maxWidth="550px"
          footer={
            <div className="d-flex w-100 gap-3 pt-2">
              <Button variant="secondary" className="btn btn-white border fw-semibold flex-grow-1 py-2 text-muted" onClick={() => setIsApplyModalOpen(false)}>Cancel</Button>
              <Button className="btn btn-primary bg-blue border-0 fw-semibold flex-grow-1 py-2" onClick={handleSubmitLeave}>Submit Request</Button>
            </div>
          }
        >

          <div className="form-group mb-4 mt-2 position-relative">
            <label className="small fw-bold text-muted text-uppercase tracking-wide mb-2">LEAVE TYPE</label>
            <div 
              className="form-control py-2 d-flex justify-content-between align-items-center cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className={leaveForm.type ? 'text-dark' : 'text-muted'}>
                {leaveForm.type ? `${leaveTypes.find(t => t.id === leaveForm.type)?.name} (${leaveTypes.find(t => t.id === leaveForm.type)?.remaining} days remaining)` : 'Select type...'}
              </span>
              <ChevronRight size={16} className="text-muted" style={{ transform: isDropdownOpen ? 'rotate(270deg)' : 'rotate(90deg)', transition: 'transform 0.2s' }} />
            </div>

            {isDropdownOpen && (
              <div className="position-absolute w-100 bg-white border rounded mt-1 shadow-sm z-3" style={{ top: '100%', zIndex: 1000 }}>
                {leaveTypes.map(type => (
                  <div 
                    key={type.id}
                    className="p-3 border-bottom cursor-pointer dropdown-item-hover d-flex align-items-center justify-content-between"
                    onClick={() => {
                      setLeaveForm({...leaveForm, type: type.id});
                      setIsDropdownOpen(false);
                    }}
                  >
                    <span>{type.name} &nbsp;<span className="text-muted small">({type.remaining} days remaining)</span></span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="row g-3 mb-4">
            <div className="col-6">
              <label className="small fw-bold text-muted text-uppercase tracking-wide mb-2">FROM DATE</label>
              <input 
                type="date" 
                className="form-control py-2" 
                value={leaveForm.fromDate}
                onChange={e => setLeaveForm({...leaveForm, fromDate: e.target.value})}
              />
            </div>
            <div className="col-6">
              <label className="small fw-bold text-muted text-uppercase tracking-wide mb-2">TO DATE</label>
              <input 
                type="date" 
                className="form-control py-2" 
                value={leaveForm.toDate}
                onChange={e => setLeaveForm({...leaveForm, toDate: e.target.value})}
              />
            </div>
          </div>

          <div className="bg-light rounded p-3 d-flex align-items-center mb-4 border">
            <div className="text-center border-end pe-3 me-3">
              <h3 className="m-0 fw-bold text-blue lh-1">03</h3>
              <span className="small text-muted" style={{ fontSize: '0.65rem' }}>working days</span>
            </div>
            <div className="small text-muted">
              After approval: <span className="text-blue fw-semibold">1 day</span> remaining
            </div>
          </div>

          <div className="form-group mb-2">
            <label className="small fw-bold text-muted text-uppercase tracking-wide mb-2">REASON</label>
            <textarea 
              className="form-control" 
              rows="4" 
              placeholder="Briefly describe the reason for your leave..."
              value={leaveForm.reason}
              onChange={e => setLeaveForm({...leaveForm, reason: e.target.value})}
            ></textarea>
          </div>
        </Modal>

        {isToastVisible && (
          <div className="position-fixed bottom-0 start-50 translate-middle-x mb-4 z-3" style={{ zIndex: 1060 }}>
            <div className="bg-dark text-white rounded px-4 py-3 d-flex align-items-center shadow-lg">
              <CheckCircle2 className="text-success me-3" size={20} />
              <span className="fw-medium">Leave request submitted - Pending approval</span>
            </div>
          </div>
        )}

        {selectedLeave && (
          <>
            <div className="modal-overlay" style={{ zIndex: 1040 }} onClick={() => setSelectedLeave(null)}></div>
            <div className="position-fixed top-0 end-0 h-100 bg-white shadow-lg d-flex flex-column" style={{ width: '400px', zIndex: 1050, transition: 'transform 0.3s ease-in-out' }}>
              <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
                <h5 className="m-0 fw-bold">Leave Request Details</h5>
                <Button className="btn-close text-muted" onClick={() => setSelectedLeave(null)}></Button>
              </div>
              <div className="p-4 flex-grow-1 overflow-auto">
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div className="d-flex align-items-center">
                    <div className="text-white rounded-circle d-flex justify-content-center align-items-center me-3" style={{ width: 40, height: 40, backgroundColor: '#8b5cf6' }}>
                      <span className="fw-bold">J</span>
                    </div>
                    <div>
                      <h6 className="m-0 fw-bold">John Doe</h6>
                      <p className="m-0 text-muted small">EMP008 &middot; Engineering</p>
                    </div>
                  </div>
                  <span className={`badge rounded-pill fw-medium px-3 py-1 ${
                    selectedLeave.status === 'Approved' ? 'bg-success-light text-success border border-success' :
                    selectedLeave.status === 'Pending' ? 'bg-warning-light text-warning-dark border border-warning' :
                    'bg-danger-light text-danger border border-danger'
                  }`}>
                    {selectedLeave.status}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="d-flex mb-3 align-items-center">
                    <div className="text-muted small fw-medium" style={{ width: '100px' }}>Leave Type</div>
                    <div><span className={`badge rounded-pill bg-${selectedLeave.typeColor}-light text-${selectedLeave.typeColor === 'warning' ? 'warning-dark' : selectedLeave.typeColor} border border-${selectedLeave.typeColor} px-2 py-1`}>{selectedLeave.type} Leave</span></div>
                  </div>
                  <div className="d-flex mb-3">
                    <div className="text-muted small fw-medium" style={{ width: '100px' }}>Start Date</div>
                    <div className="fw-medium text-dark">Apr 24, 2026</div>
                  </div>
                  <div className="d-flex mb-3">
                    <div className="text-muted small fw-medium" style={{ width: '100px' }}>End Date</div>
                    <div className="fw-medium text-dark">Apr 25, 2026</div>
                  </div>
                  <div className="d-flex mb-3">
                    <div className="text-muted small fw-medium" style={{ width: '100px' }}>Duration</div>
                    <div className="fw-bold text-dark">2 days</div>
                  </div>
                  <div className="d-flex mb-3">
                    <div className="text-muted small fw-medium" style={{ width: '100px' }}>Applied On</div>
                    <div className="fw-medium text-dark">{selectedLeave.applied}</div>
                  </div>
                </div>

                <div className="small fw-bold text-muted text-uppercase tracking-wide mb-2">REASON</div>
                <div className="bg-blue-light border border-blue rounded p-3 text-blue" style={{ fontSize: '0.9rem' }}>
                  {selectedLeave.reason || "Family function — attending sister's wedding ceremony in hometown. Will ensure all tasks are handed over before departure."}
                </div>
              </div>
              <div className="p-4 border-top">
                <Button variant="secondary" className="btn btn-white border w-100 fw-semibold text-muted py-2" onClick={() => setSelectedLeave(null)}>Close</Button>
              </div>
            </div>
          </>
        )}

      </div>
    </>
  );
};

export default Leave;
