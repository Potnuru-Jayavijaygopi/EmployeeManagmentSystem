import React, { useState, useEffect } from "react";   
import Breadcrumb from "../../components/dashboard/Breadcrumb";
import Button from "../../components/common/Button";
import {
  Download,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  Briefcase,
  BarChart2,
  History,
  FileText,
  CalendarDays,
  MoreHorizontal,
  X,
} from "lucide-react";
import "./AdminLeave.css";

import { leaveService } from "../../services";

const AdminLeave = () => {
  const [activeTab, setActiveTab] = useState("Applications");
  const [activeSubTab, setActiveSubTab] = useState("All Pending");
  const [activeActionMenu, setActiveActionMenu] = useState(null);
  const [adminLeaves, setAdminLeaves] = useState([]);

  useEffect(() => {
    const fetchAdminLeaves = async () => {
      try {
        const leavesData = await leaveService.getLeaves();
        const rawList = Array.isArray(leavesData) 
          ? leavesData 
          : Array.isArray(leavesData?.data?.results) 
          ? leavesData.data.results 
          : Array.isArray(leavesData?.results) 
          ? leavesData.results 
          : Array.isArray(leavesData?.data) 
          ? leavesData.data 
          : [];
        setAdminLeaves(rawList);
      } catch (err) {
        setAdminLeaves([]);
      }
    };
    fetchAdminLeaves();
  }, []);

  const mappedAdminLeaves = adminLeaves.map((l, idx) => ({
    id: l.id || idx + 1,
    name: l.user_name || l.user_email || `User #${l.user}`,
    dept: 'Engineering',
    initials: (l.user_name || 'EM').substring(0, 2).toUpperCase(),
    color: 'blue',
    type: l.leave_type_name || 'Annual Leave',
    from: l.start_date || '2026-06-01',
    to: l.end_date || '2026-06-02',
    days: `${l.total_days || 1}d`,
    reason: l.reason || '',
    status: l.status === 'approved' ? 'Approved' : (l.status === 'rejected' ? 'Rejected' : (l.status === 'cancelled' ? 'Cancelled' : 'Pending')),
    appliedOn: l.created_at ? l.created_at.split('T')[0] : 'Today'
  }));

  const pendingLeaves = mappedAdminLeaves.filter(l => l.status === 'Pending');
  const approvedLeaves = mappedAdminLeaves.filter(l => l.status === 'Approved');
  const rejectedLeaves = mappedAdminLeaves.filter(l => l.status === 'Rejected');
  const cancelledLeaves = mappedAdminLeaves.filter(l => l.status === 'Cancelled');

  const pendingCount = pendingLeaves.length;
  const approvedCount = approvedLeaves.length;
  const rejectedCount = rejectedLeaves.length;
  const cancelledCount = cancelledLeaves.length;

  const todayStr = new Date().toISOString().split('T')[0];
  const onLeaveTodayCount = adminLeaves.filter(l => l.status === 'approved' && l.start_date <= todayStr && l.end_date >= todayStr).length;

  const displayedLeaves = activeSubTab === 'All Pending' 
    ? pendingLeaves 
    : (activeSubTab === 'Approved' 
      ? approvedLeaves 
      : (activeSubTab === 'Rejected' 
        ? rejectedLeaves 
        : (activeSubTab === 'Cancelled' 
          ? cancelledLeaves 
          : mappedAdminLeaves)));

  const leaveHistory = mappedAdminLeaves;

  const leaveBalances = {
    annual: { 
      total: 20, 
      used: adminLeaves.filter(l => l.status === 'approved' && (l.leave_type_name === 'Annual Leave' || l.leave_type === 1)).reduce((acc, c) => acc + parseFloat(c.total_days || 0), 0), 
      remaining: Math.max(0, 20 - adminLeaves.filter(l => l.status === 'approved' && (l.leave_type_name === 'Annual Leave' || l.leave_type === 1)).reduce((acc, c) => acc + parseFloat(c.total_days || 0), 0)), 
      percentage: Math.min(100, Math.round((adminLeaves.filter(l => l.status === 'approved' && (l.leave_type_name === 'Annual Leave' || l.leave_type === 1)).reduce((acc, c) => acc + parseFloat(c.total_days || 0), 0) / 20) * 100)) 
    },
    sick: { 
      total: 10, 
      used: adminLeaves.filter(l => l.status === 'approved' && (l.leave_type_name === 'Sick Leave' || l.leave_type === 2)).reduce((acc, c) => acc + parseFloat(c.total_days || 0), 0), 
      remaining: Math.max(0, 10 - adminLeaves.filter(l => l.status === 'approved' && (l.leave_type_name === 'Sick Leave' || l.leave_type === 2)).reduce((acc, c) => acc + parseFloat(c.total_days || 0), 0)), 
      percentage: Math.min(100, Math.round((adminLeaves.filter(l => l.status === 'approved' && (l.leave_type_name === 'Sick Leave' || l.leave_type === 2)).reduce((acc, c) => acc + parseFloat(c.total_days || 0), 0) / 10) * 100)) 
    },
    casual: { 
      total: 5, 
      used: adminLeaves.filter(l => l.status === 'approved' && (l.leave_type_name === 'Casual Leave' || l.leave_type === 3)).reduce((acc, c) => acc + parseFloat(c.total_days || 0), 0), 
      remaining: Math.max(0, 5 - adminLeaves.filter(l => l.status === 'approved' && (l.leave_type_name === 'Casual Leave' || l.leave_type === 3)).reduce((acc, c) => acc + parseFloat(c.total_days || 0), 0)), 
      percentage: Math.min(100, Math.round((adminLeaves.filter(l => l.status === 'approved' && (l.leave_type_name === 'Casual Leave' || l.leave_type === 3)).reduce((acc, c) => acc + parseFloat(c.total_days || 0), 0) / 5) * 100)) 
    },
    paid: { 
      total: 15, 
      used: adminLeaves.filter(l => l.status === 'approved' && (l.leave_type_name === 'Paid Leave' || l.leave_type === 4)).reduce((acc, c) => acc + parseFloat(c.total_days || 0), 0), 
      remaining: Math.max(0, 15 - adminLeaves.filter(l => l.status === 'approved' && (l.leave_type_name === 'Paid Leave' || l.leave_type === 4)).reduce((acc, c) => acc + parseFloat(c.total_days || 0), 0)), 
      percentage: Math.min(100, Math.round((adminLeaves.filter(l => l.status === 'approved' && (l.leave_type_name === 'Paid Leave' || l.leave_type === 4)).reduce((acc, c) => acc + parseFloat(c.total_days || 0), 0) / 15) * 100)) 
    }
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedLeaveDetail, setSelectedLeaveDetail] = useState(null);

  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const openDrawer = (leave) => {
    setSelectedLeaveDetail(leave);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedLeaveDetail(null), 300);
  };

  const getLeaveTypeClass = (type) => {
    if (type.includes("Annual")) return "annual";
    if (type.includes("Sick")) return "sick";
    if (type.includes("Casual")) return "casual";
    return "annual";
  };

  return (
    <div className="admin-leave-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Breadcrumb items={["Dashboard", "Leave"]} />
          <h1 className="page-title m-0">Leave Management</h1>
          <p className="text-muted small m-0 mt-1">
            Applications, approvals, balances and leave history
          </p>
        </div>
        <div className="d-flex gap-3">
          <Button
            variant="secondary"
            className="btn btn-light bg-white border fw-semibold d-flex align-items-center gap-2"
          >
            <Download size={16} /> Export
          </Button>
          <Button className="btn btn-primary bg-blue border-0 px-4 py-2 fw-semibold d-flex align-items-center shadow-sm">
            <Plus size={18} className="me-2" /> Add Leave
          </Button>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-3">
          <div className="summary-card">
            <div className="summary-card-title">PENDING APPROVALS</div>
            <div className="summary-card-value pending">{pendingCount}</div>
            <div className="summary-card-subtext">awaiting review</div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="summary-card">
            <div className="summary-card-title">APPROVED THIS MONTH</div>
            <div className="summary-card-value approved">{approvedCount}</div>
            <div className="summary-card-subtext">across all types</div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="summary-card">
            <div className="summary-card-title">ON LEAVE TODAY</div>
            <div className="summary-card-value on-leave">{onLeaveTodayCount}</div>
            <div className="summary-card-subtext">approved leave</div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="summary-card">
            <div className="summary-card-title">REJECTED</div>
            <div className="summary-card-value rejected">{rejectedCount}</div>
            <div className="summary-card-subtext">this month</div>
          </div>
        </div>
      </div>

      <div className="admin-leave-tabs mt-2">
        <div
          className={`admin-leave-tab ${
            activeTab === "Applications" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Applications")}
        >
          <Briefcase size={16} /> Applications{" "}
          {activeTab === "Applications" && <span className="tab-badge">6</span>}
        </div>
        <div
          className={`admin-leave-tab ${
            activeTab === "Balances" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Balances")}
        >
          <BarChart2 size={16} /> Leave Balances
        </div>
        <div
          className={`admin-leave-tab ${
            activeTab === "History" ? "active" : ""
          }`}
          onClick={() => setActiveTab("History")}
        >
          <History size={16} /> History
        </div>
        <div
          className={`admin-leave-tab ${
            activeTab === "Policy" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Policy")}
        >
          <FileText size={16} /> Leave Policy
        </div>
        <div
          className={`admin-leave-tab ${
            activeTab === "Calendar" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Calendar")}
        >
          <CalendarDays size={16} /> Leave Calendar
        </div>
      </div>

      <div
        className="bg-white border rounded shadow-sm overflow-hidden position-relative p-4"
        onClick={() => setActiveActionMenu(null)}
      >
        {activeTab === "Applications" && (
          <div>
            <div className="inner-tabs">
              <div
                className={`inner-tab ${
                  activeSubTab === "All Pending" ? "active-warning" : ""
                }`}
                onClick={() => setActiveSubTab("All Pending")}
              >
                All Pending ({pendingCount})
              </div>
              <div
                className={`inner-tab ${
                  activeSubTab === "All" ? "active" : ""
                }`}
                onClick={() => setActiveSubTab("All")}
              >
                All ({mappedAdminLeaves.length})
              </div>
              <div
                className={`inner-tab ${
                  activeSubTab === "Approved" ? "active" : ""
                }`}
                onClick={() => setActiveSubTab("Approved")}
              >
                Approved ({approvedCount})
              </div>
              <div
                className={`inner-tab ${
                  activeSubTab === "Rejected" ? "active" : ""
                }`}
                onClick={() => setActiveSubTab("Rejected")}
              >
                Rejected ({rejectedCount})
              </div>
              <div
                className={`inner-tab ${
                  activeSubTab === "Cancelled" ? "active" : ""
                }`}
                onClick={() => setActiveSubTab("Cancelled")}
              >
                Cancelled ({cancelledCount})
              </div>
            </div>

            <div className="d-flex mb-4 gap-3">
              <div className="position-relative flex-grow-1">
                <Search
                  className="position-absolute text-muted"
                  size={16}
                  style={{ left: "12px", top: "10px" }}
                />
                <input
                  type="text"
                  className="form-control ps-5 bg-light border-0"
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="position-relative" style={{ width: "160px" }}>
                <input
                  type="date"
                  className="form-control border bg-white"
                  defaultValue="2026-04-22"
                />
              </div>
              <select
                className="form-select border bg-white w-auto"
                style={{ minWidth: "130px" }}
              >
                <option>All status</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
              <select
                className="form-select border bg-white w-auto"
                style={{ minWidth: "150px" }}
              >
                <option>All departments</option>
                <option>Engineering</option>
                <option>Design</option>
                <option>HR</option>
              </select>
            </div>

            <div className="table-responsive">
              <table className="table mb-0 align-middle">
                <thead>
                  <tr>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">
                      Employee
                    </th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">
                      Leave type
                    </th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">
                      From
                    </th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">
                      To
                    </th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">
                      Days
                    </th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">
                      Reason
                    </th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">
                      Status
                    </th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 text-end pe-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayedLeaves.length > 0 ? (
                    displayedLeaves.map((leave) => (
                      <tr key={leave.id}>
                        <td className="py-3">
                          <div className="d-flex align-items-center gap-3">
                            <div
                              className={`avatar-circle avatar-bg-${leave.color}`}
                            >
                              {leave.initials}
                            </div>
                            <div>
                              <div className="fw-semibold text-dark">
                                {leave.name}
                              </div>
                              <div className="small text-muted">{leave.dept}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <span
                            className={`leave-type-badge ${getLeaveTypeClass(
                              leave.type
                            )}`}
                          >
                            {leave.type}
                          </span>
                        </td>
                        <td className="py-3 fw-medium text-dark">{leave.from}</td>
                        <td className="py-3 text-muted">{leave.to}</td>
                        <td className="py-3 fw-bold text-dark">{leave.days}</td>
                        <td className="py-3 text-muted small">{leave.reason}</td>
                        <td className="py-3">
                          <span
                            className={`status-badge ${leave.status.toLowerCase()}`}
                          >
                            {leave.status}
                          </span>
                        </td>
                        <td className="py-3 text-end position-relative">
                          <div className="d-flex justify-content-end align-items-center gap-2 pe-2">
                            {leave.status === "Pending" ? (
                              <>
                                <Button
                                  variant="secondary"
                                  className="btn btn-sm btn-light border text-success fw-semibold bg-success-light px-3"
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="secondary"
                                  className="btn btn-sm btn-light border text-danger fw-semibold bg-danger-light px-3"
                                >
                                  Reject
                                </Button>
                                <Button
                                  variant="icon"
                                  className="btn btn-sm btn-light border p-1 rounded text-muted"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveActionMenu(
                                      activeActionMenu === leave.id
                                        ? null
                                        : leave.id
                                    );
                                  }}
                                >
                                  <MoreHorizontal size={16} />
                                </Button>
                              </>
                            ) : (
                              <Button
                                variant="secondary"
                                className="btn btn-sm btn-light border text-blue fw-semibold px-4"
                              >
                                View
                              </Button>
                            )}
                          </div>
                          {activeActionMenu === leave.id &&
                            leave.status === "Pending" && (
                              <div
                                className="dropdown-menu show position-absolute"
                                style={{
                                  right: "30px",
                                  top: "40px",
                                  zIndex: 1000,
                                  minWidth: "150px",
                                  textAlign: "left",
                                }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  className="dropdown-item d-flex align-items-center gap-2 small py-2"
                                  onClick={() => {
                                    openDrawer(leave);
                                    setActiveActionMenu(null);
                                  }}
                                >
                                  <Eye size={14} className="text-muted" /> View
                                  detail
                                </button>
                                <button className="dropdown-item d-flex align-items-center gap-2 small py-2 text-danger">
                                  <Trash2 size={14} /> Delete
                                </button>
                              </div>
                            )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-muted">No leave applications found in database.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {activeSubTab !== "All Pending" && (
              <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                <span className="small text-muted">Showing 1-8 of 32</span>
                <div className="d-flex gap-1">
                  <Button
                    variant="ghost"
                    className="btn btn-sm btn-light border px-2"
                  >
                    <ChevronLeft size={14} />
                  </Button>
                  <Button className="btn btn-sm btn-primary px-3">1</Button>
                  <Button
                    variant="ghost"
                    className="btn btn-sm btn-light border px-3"
                  >
                    2
                  </Button>
                  <Button
                    variant="ghost"
                    className="btn btn-sm btn-light border px-2"
                  >
                    <ChevronRight size={14} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "Balances" && (
          <div>
            <div className="d-flex mb-4 gap-3">
              <div
                className="position-relative flex-grow-1"
                style={{ maxWidth: "400px" }}
              >
                <Search
                  className="position-absolute text-muted"
                  size={16}
                  style={{ left: "12px", top: "10px" }}
                />
                <input
                  type="text"
                  className="form-control ps-5 bg-white border"
                  placeholder="Ravi Kumar"
                  defaultValue="Ravi Kumar"
                />
              </div>
              <div className="position-relative" style={{ width: "160px" }}>
                <input
                  type="text"
                  className="form-control border bg-white text-muted"
                  defaultValue="FY 2025-26"
                  readOnly
                />
              </div>
            </div>

            <div className="row g-4">
              <div className="col-12 col-md-6 col-lg-4">
                <div className="balance-card blue">
                  <div className="mb-4">
                    <h6 className="fw-bold m-0 text-dark">Annual Leave</h6>
                    <div className="small text-muted mt-1">Ravi Kumar</div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-2 small text-muted">
                    <span>Total</span>
                    <span className="fw-bold text-blue fs-6">
                      {leaveBalances.annual.total}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2 small text-muted">
                    <span>Used</span>
                    <span className="fw-bold text-dark fs-6">
                      {leaveBalances.annual.used}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4 small text-muted">
                    <span>Remaining</span>
                    <span className="fw-bold text-dark fs-6">
                      {leaveBalances.annual.remaining}
                    </span>
                  </div>

                  <div className="balance-progress-bg mb-1">
                    <div
                      className="balance-progress-bar"
                      style={{ width: `${leaveBalances.annual.percentage}%` }}
                    ></div>
                  </div>
                  <div
                    className="text-end small text-muted"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {leaveBalances.annual.percentage}% used
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="balance-card red">
                  <div className="mb-4">
                    <h6 className="fw-bold m-0 text-dark">Sick Leave</h6>
                    <div className="small text-muted mt-1">Ravi Kumar</div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-2 small text-muted">
                    <span>Total</span>
                    <span className="fw-bold text-danger fs-6">
                      {leaveBalances.sick.total}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2 small text-muted">
                    <span>Used</span>
                    <span className="fw-bold text-dark fs-6">
                      {leaveBalances.sick.used}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4 small text-muted">
                    <span>Remaining</span>
                    <span className="fw-bold text-dark fs-6">
                      {leaveBalances.sick.remaining}
                    </span>
                  </div>

                  <div className="balance-progress-bg mb-1">
                    <div
                      className="balance-progress-bar"
                      style={{ width: `${leaveBalances.sick.percentage}%` }}
                    ></div>
                  </div>
                  <div
                    className="text-end small text-muted"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {leaveBalances.sick.percentage}% used
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="balance-card orange">
                  <div className="mb-4">
                    <h6 className="fw-bold m-0 text-dark">Casual Leave</h6>
                    <div className="small text-muted mt-1">Ravi Kumar</div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-2 small text-muted">
                    <span>Total</span>
                    <span className="fw-bold text-warning-dark fs-6">
                      {leaveBalances.casual.total}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2 small text-muted">
                    <span>Used</span>
                    <span className="fw-bold text-dark fs-6">
                      {leaveBalances.casual.used}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4 small text-muted">
                    <span>Remaining</span>
                    <span className="fw-bold text-dark fs-6">
                      {leaveBalances.casual.remaining}
                    </span>
                  </div>

                  <div className="balance-progress-bg mb-1">
                    <div
                      className="balance-progress-bar"
                      style={{ width: `${leaveBalances.casual.percentage}%` }}
                    ></div>
                  </div>
                  <div
                    className="text-end small text-muted"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {leaveBalances.casual.percentage}% used
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="balance-card purple">
                  <div className="mb-4">
                    <h6 className="fw-bold m-0 text-dark">Paid Leave</h6>
                    <div className="small text-muted mt-1">Ravi Kumar</div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-2 small text-muted">
                    <span>Total</span>
                    <span
                      className="fw-bold text-purple fs-6"
                      style={{ color: "#8b5cf6" }}
                    >
                      {leaveBalances.paid.total}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2 small text-muted">
                    <span>Used</span>
                    <span className="fw-bold text-dark fs-6">
                      {leaveBalances.paid.used}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4 small text-muted">
                    <span>Remaining</span>
                    <span className="fw-bold text-dark fs-6">
                      {leaveBalances.paid.remaining}
                    </span>
                  </div>

                  <div className="balance-progress-bg mb-1">
                    <div
                      className="balance-progress-bar"
                      style={{ width: `${leaveBalances.paid.percentage}%` }}
                    ></div>
                  </div>
                  <div
                    className="text-end small text-muted"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {leaveBalances.paid.percentage}% used
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "History" && (
          <div>
            <div className="d-flex mb-4 gap-3">
              <div className="position-relative flex-grow-1">
                <Search
                  className="position-absolute text-muted"
                  size={16}
                  style={{ left: "12px", top: "10px" }}
                />
                <input
                  type="text"
                  className="form-control ps-5 bg-light border-0"
                  placeholder="Search employees..."
                />
              </div>
              <div className="position-relative" style={{ width: "160px" }}>
                <input
                  type="date"
                  className="form-control border bg-white"
                  defaultValue="2026-04-22"
                />
              </div>
              <select
                className="form-select border bg-white w-auto"
                style={{ minWidth: "130px" }}
              >
                <option>All status</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
              <select
                className="form-select border bg-white w-auto"
                style={{ minWidth: "150px" }}
              >
                <option>All departments</option>
                <option>Engineering</option>
                <option>Design</option>
                <option>HR</option>
              </select>
            </div>

            <div className="table-responsive">
              <table className="table mb-0 align-middle">
                <thead>
                  <tr>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">
                      Employee
                    </th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">
                      Type
                    </th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">
                      Dates
                    </th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">
                      Days
                    </th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">
                      Reason
                    </th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">
                      Applied on
                    </th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3">
                      Status
                    </th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 text-end pe-4">
                      ...
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaveHistory.length > 0 ? (
                    leaveHistory.map((leave) => (
                      <tr key={leave.id}>
                        <td className="py-3">
                          <div className="d-flex align-items-center gap-3">
                            <div
                              className={`avatar-circle avatar-bg-${leave.color}`}
                            >
                              {leave.initials}
                            </div>
                            <div>
                              <div className="fw-semibold text-dark">
                                {leave.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <span
                            className={`leave-type-badge ${getLeaveTypeClass(
                              leave.type
                            )}`}
                          >
                            {leave.type}
                          </span>
                        </td>
                        <td className="py-3 fw-bold text-dark">{leave.from} - {leave.to}</td>
                        <td className="py-3 fw-bold text-dark">{leave.days}</td>
                        <td className="py-3 text-muted small">{leave.reason}</td>
                        <td className="py-3 text-muted">{leave.appliedOn}</td>
                        <td className="py-3">
                          <span
                            className={`status-badge ${leave.status.toLowerCase()}`}
                          >
                            {leave.status}
                          </span>
                        </td>
                        <td className="py-3 text-end pe-2">
                          <Button
                            variant="icon"
                            className="btn btn-sm btn-light border p-1 rounded text-muted"
                          >
                            <Eye size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-muted">No leave history found in database.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
              <span className="small text-muted">Showing 1-8 of 32</span>
              <div className="d-flex gap-1">
                <Button
                  variant="ghost"
                  className="btn btn-sm btn-light border px-2"
                >
                  <ChevronLeft size={14} />
                </Button>
                <Button className="btn btn-sm btn-primary px-3">1</Button>
                <Button
                  variant="ghost"
                  className="btn btn-sm btn-light border px-3"
                >
                  2
                </Button>
                <Button
                  variant="ghost"
                  className="btn btn-sm btn-light border px-2"
                >
                  <ChevronRight size={14} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {activeTab === "Policy" && (
        <div className="row g-4 mt-1">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="policy-card blue">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold m-0 text-dark">Annual Leave</h6>
                <span className="policy-badge blue">18 days</span>
              </div>
              <ul>
                <li>Accrues at 1.5 days/month</li>
                <li>Min 3 days notice required</li>
                <li>Can be carried forward (max 5 days)</li>
                <li>Approved by direct manager</li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="policy-card red">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold m-0 text-dark">Sick Leave</h6>
                <span className="policy-badge red">12 days</span>
              </div>
              <ul>
                <li>No prior notice required</li>
                <li>Medical certificate for {">"}3 days</li>
                <li>Not encashable</li>
                <li>Cannot be carried forward</li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="policy-card purple">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold m-0 text-dark">Maternity Leave</h6>
                <span className="policy-badge purple">180 days</span>
              </div>
              <ul>
                <li>26 weeks for first 2 children</li>
                <li>Medical documentation required</li>
                <li>Fully paid per government norms</li>
                <li>Applicable only to female employees</li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="policy-card orange">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold m-0 text-dark">Casual Leave</h6>
                <span className="policy-badge orange">6 days</span>
              </div>
              <ul>
                <li>Minimum 1 day advance notice</li>
                <li>Maximum 2 consecutive days</li>
                <li>Not encashable</li>
                <li>Cannot be carried forward</li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="policy-card teal">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold m-0 text-dark">Paternity Leave</h6>
                <span className="policy-badge teal">7 days</span>
              </div>
              <ul>
                <li>Within 15 days of child's birth</li>
                <li>Proof of birth required</li>
                <li>Fully paid</li>
                <li>One-time benefit</li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="policy-card green">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold m-0 text-dark">Compensatory Off</h6>
                <span className="policy-badge green">Earned days</span>
              </div>
              <ul>
                <li>Granted for working on holidays</li>
                <li>Must be availed within 30 days</li>
                <li>Applied after approval of OT</li>
                <li>Tracked in attendance system</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Calendar" && (
        <div className="row g-4 mt-1">
          <div className={`col-12 ${selectedCalendarDate ? "col-lg-8" : ""}`}>
            <div className="bg-white border rounded p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex gap-2 align-items-center">
                  <Button
                    variant="ghost"
                    className="btn btn-sm btn-light border p-1"
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  <h5 className="m-0 fw-bold mx-2">April 2026</h5>
                  <Button
                    variant="ghost"
                    className="btn btn-sm btn-light border p-1"
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
                <div className="small text-muted">
                  Click any date to view details
                </div>
              </div>

              <div className="d-flex gap-4 mb-4 small fw-semibold">
                <span className="d-flex align-items-center gap-2">
                  <div className="cal-dot approved"></div> Approved Leave
                </span>
                <span className="d-flex align-items-center gap-2">
                  <div className="cal-dot pending"></div> Pending Leave
                </span>
                <span className="d-flex align-items-center gap-2">
                  <div className="cal-dot holiday"></div> Holiday
                </span>
                <span className="d-flex align-items-center gap-2">
                  <div className="cal-dot weekend"></div> Weekend
                </span>
              </div>

              <div className="leave-calendar-grid">
                <div className="leave-calendar-header">SUN</div>
                <div className="leave-calendar-header">MON</div>
                <div className="leave-calendar-header">TUE</div>
                <div className="leave-calendar-header">WED</div>
                <div className="leave-calendar-header">THU</div>
                <div className="leave-calendar-header">FRI</div>
                <div className="leave-calendar-header">SAT</div>

                <div className="leave-calendar-day empty"></div>
                <div className="leave-calendar-day empty"></div>
                <div className="leave-calendar-day empty"></div>

                <div
                  className="leave-calendar-day"
                  onClick={() => setSelectedCalendarDate("1")}
                >
                  <div className="cal-date">1</div>
                  <div className="cal-dots">
                    <div className="cal-dot pending"></div>
                    <div className="cal-dot approved"></div>
                  </div>
                  <div className="cal-subtext">2 on leave</div>
                </div>

                <div
                  className="leave-calendar-day"
                  onClick={() => setSelectedCalendarDate("2")}
                >
                  <div className="cal-date text-blue">2</div>
                  <div className="cal-dots">
                    <div className="cal-dot holiday"></div>
                  </div>
                  <div className="cal-subtext text-blue">Holiday</div>
                </div>

                <div
                  className="leave-calendar-day"
                  onClick={() => setSelectedCalendarDate("3")}
                >
                  <div className="cal-date">3</div>
                </div>

                <div className="leave-calendar-day weekend">
                  <div className="cal-date">4</div>
                  <div className="cal-subtext">Weekend</div>
                </div>

                <div className="leave-calendar-day weekend">
                  <div className="cal-date">5</div>
                  <div className="cal-subtext">Weekend</div>
                </div>

                <div
                  className="leave-calendar-day"
                  onClick={() => setSelectedCalendarDate("6")}
                >
                  <div className="cal-date">6</div>
                  <div className="cal-dots">
                    <div className="cal-dot pending"></div>
                    <div className="cal-dot approved"></div>
                  </div>
                  <div className="cal-subtext">2 on leave</div>
                </div>
                <div className="leave-calendar-day">
                  <div className="cal-date">7</div>
                </div>
                <div className="leave-calendar-day">
                  <div className="cal-date">8</div>
                </div>
                <div className="leave-calendar-day">
                  <div className="cal-date">9</div>
                </div>
                <div className="leave-calendar-day">
                  <div className="cal-date">10</div>
                </div>
                <div className="leave-calendar-day weekend">
                  <div className="cal-date">11</div>
                  <div className="cal-subtext">Weekend</div>
                </div>

                <div className="leave-calendar-day weekend">
                  <div className="cal-date">12</div>
                  <div className="cal-subtext">Weekend</div>
                </div>
                <div className="leave-calendar-day">
                  <div className="cal-date">13</div>
                </div>
                <div
                  className="leave-calendar-day"
                  onClick={() => setSelectedCalendarDate("14")}
                >
                  <div className="cal-date">14</div>
                  <div className="cal-dots">
                    <div className="cal-dot pending"></div>
                    <div className="cal-dot approved"></div>
                  </div>
                  <div className="cal-subtext">2 on leave</div>
                </div>
                <div className="leave-calendar-day">
                  <div className="cal-date">15</div>
                </div>

                <div
                  className={`leave-calendar-day ${
                    selectedCalendarDate === "16" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedCalendarDate("16")}
                >
                  <div className="cal-date">16</div>
                  <div className="cal-dots">
                    <div className="cal-dot pending"></div>
                    <div className="cal-dot approved"></div>
                  </div>
                  <div className="cal-subtext text-blue">2 on leave</div>
                </div>

                <div
                  className="leave-calendar-day"
                  onClick={() => setSelectedCalendarDate("17")}
                >
                  <div className="cal-date text-blue">17</div>
                  <div className="cal-dots">
                    <div className="cal-dot holiday"></div>
                  </div>
                  <div className="cal-subtext text-blue">Holiday</div>
                </div>
                <div className="leave-calendar-day weekend">
                  <div className="cal-date">18</div>
                  <div className="cal-subtext">Weekend</div>
                </div>

                <div className="leave-calendar-day weekend">
                  <div className="cal-date">19</div>
                  <div className="cal-subtext">Weekend</div>
                </div>
                <div className="leave-calendar-day">
                  <div className="cal-date">20</div>
                </div>
                <div className="leave-calendar-day">
                  <div className="cal-date">21</div>
                </div>
                <div
                  className="leave-calendar-day"
                  onClick={() => setSelectedCalendarDate("22")}
                >
                  <div className="cal-date">22</div>
                  <div className="cal-dots">
                    <div className="cal-dot pending"></div>
                    <div className="cal-dot approved"></div>
                  </div>
                  <div className="cal-subtext">2 on leave</div>
                </div>
                <div className="leave-calendar-day">
                  <div className="cal-date">23</div>
                </div>
                <div className="leave-calendar-day">
                  <div className="cal-date">24</div>
                </div>
                <div className="leave-calendar-day weekend">
                  <div className="cal-date">25</div>
                  <div className="cal-subtext">Weekend</div>
                </div>

                <div className="leave-calendar-day weekend">
                  <div className="cal-date">26</div>
                  <div className="cal-subtext">Weekend</div>
                </div>

                <div
                  className="leave-calendar-day"
                  onClick={() => setSelectedCalendarDate("27")}
                >
                  <div className="cal-date text-blue">27</div>
                  <div className="cal-dots">
                    <div className="cal-dot holiday"></div>
                  </div>
                  <div className="cal-subtext text-blue">Holiday</div>
                </div>
                <div className="leave-calendar-day">
                  <div className="cal-date">28</div>
                </div>
                <div className="leave-calendar-day">
                  <div className="cal-date">29</div>
                </div>
                <div className="leave-calendar-day">
                  <div className="cal-date">30</div>
                </div>
              </div>
            </div>
          </div>

          {selectedCalendarDate && (
            <div className="col-12 col-lg-4">
              <div className="calendar-side-panel">
                <div className="calendar-side-panel-header">
                  April {selectedCalendarDate}, 2026
                </div>
                {selectedCalendarDate === "16" ? (
                  <>
                    <div className="small fw-bold text-muted text-uppercase tracking-wide mb-3">
                      APPROVED LEAVES
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="avatar-circle avatar-bg-primary text-white bg-primary"
                          style={{ width: 32, height: 32, fontSize: "0.8rem" }}
                        >
                          AN
                        </div>
                        <div>
                          <div className="fw-semibold text-dark lh-1 mb-1">
                            Arjun Nair
                          </div>
                          <div
                            className="small text-muted lh-1"
                            style={{ fontSize: "0.75rem" }}
                          >
                            Engineering
                          </div>
                        </div>
                      </div>
                      <span
                        className="status-badge approved"
                        style={{
                          fontSize: "0.7rem",
                          padding: "0.15rem 0.6rem",
                        }}
                      >
                        Approved
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="avatar-circle avatar-bg-success text-white"
                          style={{
                            width: 32,
                            height: 32,
                            fontSize: "0.8rem",
                            backgroundColor: "#0ea5e9",
                          }}
                        >
                          RS
                        </div>
                        <div>
                          <div className="fw-semibold text-dark lh-1 mb-1">
                            Riya Sharma
                          </div>
                          <div
                            className="small text-muted lh-1"
                            style={{ fontSize: "0.75rem" }}
                          >
                            Design
                          </div>
                        </div>
                      </div>
                      <span
                        className="status-badge approved"
                        style={{
                          fontSize: "0.7rem",
                          padding: "0.15rem 0.6rem",
                        }}
                      >
                        Approved
                      </span>
                    </div>

                    <div className="small fw-bold text-muted text-uppercase tracking-wide mb-3">
                      PENDING LEAVES
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="avatar-circle avatar-bg-info text-white"
                          style={{
                            width: 32,
                            height: 32,
                            fontSize: "0.8rem",
                            backgroundColor: "#0d9488",
                          }}
                        >
                          PG
                        </div>
                        <div>
                          <div className="fw-semibold text-dark lh-1 mb-1">
                            Preethi G
                          </div>
                          <div
                            className="small text-muted lh-1"
                            style={{ fontSize: "0.75rem" }}
                          >
                            After 9:30 AM
                          </div>
                        </div>
                      </div>
                      <span
                        className="status-badge pending"
                        style={{
                          fontSize: "0.7rem",
                          padding: "0.15rem 0.6rem",
                        }}
                      >
                        Pending
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-muted text-center mt-5">
                    No leaves for this date.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {isDrawerOpen && (
        <div
          className="modal-overlay"
          style={{ zIndex: 1040 }}
          onClick={closeDrawer}
        ></div>
      )}
      <div className={`leave-drawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="leave-drawer-header">
          <h5 className="m-0 fw-bold">Leave Request Details</h5>
          <Button
            variant="ghost"
            className="btn btn-sm btn-light border-0 p-1 rounded-circle"
            onClick={closeDrawer}
          >
            <X size={18} />
          </Button>
        </div>
        <div className="leave-drawer-content">
          {selectedLeaveDetail && (
            <>
              <div className="d-flex justify-content-between align-items-start mb-4 bg-light p-3 rounded border">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className={`avatar-circle avatar-bg-${selectedLeaveDetail.color}`}
                    style={{ width: 40, height: 40, fontSize: "1rem" }}
                  >
                    {selectedLeaveDetail.initials}
                  </div>
                  <div>
                    <h6 className="m-0 fw-bold text-dark">
                      {selectedLeaveDetail.name}
                    </h6>
                    <p className="m-0 text-muted small mt-1">
                      EMP008 · {selectedLeaveDetail.dept}
                    </p>
                  </div>
                </div>
                <span
                  className={`status-badge ${selectedLeaveDetail.status.toLowerCase()}`}
                >
                  {selectedLeaveDetail.status}
                </span>
              </div>

              <div className="mb-4">
                <div className="d-flex mb-3 align-items-center">
                  <div
                    className="text-muted small fw-medium"
                    style={{ width: "120px" }}
                  >
                    Leave Type
                  </div>
                  <div>
                    <span
                      className={`leave-type-badge ${getLeaveTypeClass(
                        selectedLeaveDetail.type
                      )}`}
                    >
                      {selectedLeaveDetail.type}
                    </span>
                  </div>
                </div>
                <div className="d-flex mb-3 align-items-center">
                  <div
                    className="text-muted small fw-medium"
                    style={{ width: "120px" }}
                  >
                    Start Date
                  </div>
                  <div className="fw-medium text-dark">
                    {selectedLeaveDetail.from}, 2026
                  </div>
                </div>
                <div className="d-flex mb-3 align-items-center">
                  <div
                    className="text-muted small fw-medium"
                    style={{ width: "120px" }}
                  >
                    End Date
                  </div>
                  <div className="fw-medium text-dark">
                    {selectedLeaveDetail.to}, 2026
                  </div>
                </div>
                <div className="d-flex mb-3 align-items-center">
                  <div
                    className="text-muted small fw-medium"
                    style={{ width: "120px" }}
                  >
                    Duration
                  </div>
                  <div className="fw-bold text-dark">
                    {selectedLeaveDetail.days}
                  </div>
                </div>
                <div className="d-flex mb-3 align-items-center">
                  <div
                    className="text-muted small fw-medium"
                    style={{ width: "120px" }}
                  >
                    Applied On
                  </div>
                  <div className="fw-medium text-dark">Apr 21, 2026</div>
                </div>
              </div>

              <div className="small fw-bold text-muted text-uppercase tracking-wide mb-2">
                REASON
              </div>
              <div
                className="bg-blue-light border border-blue rounded p-3 text-blue"
                style={{ fontSize: "0.9rem" }}
              >
                {selectedLeaveDetail.reason ||
                  "Family function — attending sister's wedding ceremony in hometown. Will ensure all tasks are handed over before departure."}
              </div>
            </>
          )}
        </div>
        <div className="leave-drawer-footer d-flex justify-content-between gap-3">
          <Button
            variant="secondary"
            className="btn btn-light bg-white border fw-semibold px-4"
            onClick={closeDrawer}
          >
            Close
          </Button>
          <div className="d-flex gap-2">
            <Button
              variant="secondary"
              className="btn btn-light border text-success fw-semibold bg-success-light px-4"
            >
              Approve
            </Button>
            <Button
              variant="secondary"
              className="btn btn-light border text-danger fw-semibold bg-danger-light px-4"
            >
              Reject
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLeave;
