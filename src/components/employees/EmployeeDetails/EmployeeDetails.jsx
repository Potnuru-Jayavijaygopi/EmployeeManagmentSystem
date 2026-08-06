import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Edit,
  Download,
  MoreHorizontal,
  User,
  Key,
  UserMinus,
  Trash2,
  X,
  FileText,
  CheckCircle2,
  Copy,
  AlertTriangle,
  AlertCircle,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  CalendarDays,
  BookOpen,
  Award,
  Eye as EyeIcon,
  Plus,
  Bookmark,
} from "lucide-react";
import "./EmployeeDetails.css";
import Button from "../../common/Button";

const EmployeeDetails = ({ employee, onBack }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [leaveDrawer, setLeaveDrawer] = useState(null);

  useEffect(() => {
    const handleClickOutside = () => setShowActionMenu(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const getAttendanceData = () => {
    return [
      { week: "W1", present: 80, absent: 0 },
      { week: "W2", present: 80, absent: 0 },
      { week: "W3", present: 60, absent: 20 },
      { week: "W4", present: 80, absent: 0 },
    ];
  };

  const renderModal = () => {
    if (!modalType && !leaveDrawer) return null;

    if (modalType === "assignCourse") {
      return (
        <div className="ms-modal-overlay">
          <div className="ms-modal-content role-modal-content">
            <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
              <div>
                <h4 className="m-0 fw-bold">Assign Course</h4>
                <p className="m-0 text-slate small mt-1">
                  Enhance employee skills with new learning modules
                </p>
              </div>
              <Button
                variant="icon"
                className="btn btn-light rounded-circle p-2 border-0 bg-transparent"
                onClick={() => setModalType(null)}
              >
                <X size={20} className="text-slate" />
              </Button>
            </div>

            <div className="p-4">
              <div className="emp-summary-box mb-4">
                <div
                  className={`emp-cell-avatar ${employee.avatarBg} ${employee.avatarText} shadow-sm`}
                >
                  {employee.initials}
                </div>
                <div>
                  <div className="fw-bold text-dark">{employee.name}</div>
                  <div className="text-slate small">ID: {employee.empId}</div>
                </div>
              </div>

              <div className="form-group mb-3">
                <label
                  className="form-label fw-semibold mb-2"
                  style={{ fontSize: "0.85rem" }}
                >
                  SELECT COURSE
                </label>
                <select className="form-select border-slate">
                  <option>Advanced React Patterns</option>
                  <option>Leadership Essentials</option>
                  <option>Data Privacy & GDPR</option>
                </select>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-6 form-group">
                  <label
                    className="form-label fw-semibold mb-2"
                    style={{ fontSize: "0.85rem" }}
                  >
                    PRIORITY
                  </label>
                  <select className="form-select border-slate">
                    <option>Medium</option>
                    <option>High</option>
                    <option>Low</option>
                  </select>
                </div>
                <div className="col-6 form-group">
                  <label
                    className="form-label fw-semibold mb-2"
                    style={{ fontSize: "0.85rem" }}
                  >
                    DUE DATE
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    defaultValue="2026-06-30"
                  />
                </div>
              </div>

              <div className="form-group mb-3">
                <label
                  className="form-label fw-semibold mb-2"
                  style={{ fontSize: "0.85rem" }}
                >
                  NOTE TO EMPLOYEE
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="e.g. Please complete this by the end of the quarter to prepare for your next project."
                ></textarea>
              </div>

              <div className="d-flex align-items-center gap-2 text-slate small">
                <AlertCircle size={14} /> Employee will receive an email
                notification
              </div>
            </div>

            <div className="p-4 border-top bg-light d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                className="btn btn-light border bg-white fw-semibold"
                onClick={() => setModalType(null)}
              >
                Cancel
              </Button>
              <Button className="btn btn-primary bg-blue border-0 fw-semibold">
                Assign Course
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (leaveDrawer) {
      return (
        <div className="leave-drawer-overlay">
          <div className="leave-drawer-content">
            <div className="drawer-header">
              <div>
                <div
                  className="text-slate fw-bold"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}
                >
                  LEAVE REQUEST
                </div>
                <h4 className="m-0 fw-bold mt-1">LR-8790</h4>
              </div>
              <Button
                variant="icon"
                className="btn btn-light rounded-circle p-2 border-0 bg-transparent"
                onClick={() => setLeaveDrawer(null)}
              >
                <X size={20} className="text-slate" />
              </Button>
            </div>

            <div className="drawer-body">
              <div className="d-flex gap-2 justify-content-between align-items-center mb-4">
                <span className="badge bg-green-light text-green rounded-pill px-3 py-1">
                  Approved
                </span>
                <span
                  className="text-blue fw-semibold"
                  style={{ fontSize: "0.85rem" }}
                >
                  Paternity Leave
                </span>
              </div>

              <div className="leave-dates-box">
                <div className="d-flex justify-content-between mb-4">
                  <div>
                    <div
                      className="text-slate mb-1"
                      style={{ fontSize: "0.75rem" }}
                    >
                      FROM
                    </div>
                    <div className="fw-bold text-dark">Feb 1, 2026</div>
                  </div>
                  <div>
                    <div
                      className="text-slate mb-1"
                      style={{ fontSize: "0.75rem" }}
                    >
                      TO
                    </div>
                    <div className="fw-bold text-dark">Apr 30, 2026</div>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                  <div className="text-slate" style={{ fontSize: "0.85rem" }}>
                    Total Duration
                  </div>
                  <div className="fw-bold text-blue">15 Days</div>
                </div>
              </div>

              <div
                className="text-slate fw-bold mb-2"
                style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}
              >
                REASON FOR LEAVE
              </div>
              <div className="leave-reason-box">Maternity</div>

              <div
                className="text-slate fw-bold mb-4 mt-5"
                style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}
              >
                APPROVAL TIMELINE
              </div>
              <div className="timeline-stepper">
                <div className="timeline-step">
                  <div className="timeline-dot active"></div>
                  <div
                    className="fw-bold text-dark"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Approved by HR Manager
                  </div>
                  <div
                    className="text-slate mt-1"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Priya Sharma · 2 days ago
                  </div>
                </div>
                <div className="timeline-step">
                  <div className="timeline-dot"></div>
                  <div
                    className="fw-bold text-dark"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Submitted by Employee
                  </div>
                  <div
                    className="text-slate mt-1"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Arjun Nair · 3 days ago
                  </div>
                </div>
              </div>
            </div>

            <div className="drawer-footer">
              <Button
                variant="secondary"
                className="btn btn-light bg-white border w-100 fw-semibold py-2"
                onClick={() => setLeaveDrawer(null)}
              >
                Close Drawer
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (modalType === "role") {
      return (
        <div className="ms-modal-overlay">
          <div className="ms-modal-content role-modal-content">
            <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
              <div>
                <h4 className="m-0 fw-bold">Change Role</h4>
                <p className="m-0 text-slate small mt-1">
                  Update employee access and permissions
                </p>
              </div>
              <Button
                variant="icon"
                className="btn btn-light rounded-circle p-2 border-0 bg-transparent"
                onClick={() => setModalType(null)}
              >
                <X size={20} className="text-slate" />
              </Button>
            </div>

            <div className="p-4">
              <div className="emp-summary-box mb-4">
                <div
                  className={`emp-cell-avatar ${employee.avatarBg} ${employee.avatarText} shadow-sm`}
                >
                  {employee.initials}
                </div>
                <div>
                  <div className="fw-bold text-dark">{employee.name}</div>
                  <div className="text-blue small mt-1 fw-semibold">
                    ID: {employee.empId} · {employee.role}
                  </div>
                </div>
              </div>

              <div className="form-group mb-3">
                <label
                  className="form-label fw-semibold mb-2"
                  style={{ fontSize: "0.85rem" }}
                >
                  SELECT NEW ROLE
                </label>
                <select className="form-select border-slate">
                  <option>Senior Engineer</option>
                  <option>Engineering Manager</option>
                  <option>Software Engineer</option>
                </select>
              </div>

              <div className="form-group mb-4">
                <label
                  className="form-label fw-semibold mb-2"
                  style={{ fontSize: "0.85rem" }}
                >
                  DEPARTMENT
                </label>
                <select className="form-select border-slate">
                  <option>Engineering</option>
                  <option>Design</option>
                  <option>HR</option>
                </select>
              </div>

              <div className="permissions-preview bg-blue-light bg-opacity-10 border border-primary rounded-3 p-3">
                <div
                  className="permissions-title text-blue fw-bold"
                  style={{ fontSize: "0.75rem" }}
                >
                  PERMISSIONS PREVIEW
                </div>
                <div
                  className="permissions-desc text-blue mt-2"
                  style={{ fontSize: "0.85rem" }}
                >
                  Standard employee access with additional permissions to mentor
                  junior staff and view project repos.
                </div>
              </div>

              <div className="d-flex align-items-center gap-2 mt-4 text-slate small">
                <AlertCircle size={14} /> Changes will take effect instantly
              </div>
            </div>

            <div className="p-4 border-top bg-light d-flex justify-content-center gap-2">
              <Button
                variant="secondary"
                className="btn btn-light border bg-white fw-semibold px-4"
                onClick={() => setModalType(null)}
              >
                Cancel
              </Button>
              <Button className="btn btn-primary bg-blue border-0 fw-semibold px-4">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (modalType === "password") {
      return (
        <div className="ms-modal-overlay">
          <div className="ms-modal-content role-modal-content">
            <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
              <div>
                <h4 className="m-0 fw-bold">Reset Password</h4>
                <p className="m-0 text-slate small mt-1">
                  Securely reset employee login credentials
                </p>
              </div>
              <Button
                variant="icon"
                className="btn btn-light rounded-circle p-2 border-0 bg-transparent"
                onClick={() => setModalType(null)}
              >
                <X size={20} className="text-slate" />
              </Button>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <div className="fw-bold text-dark">{employee.name}</div>
                <div className="text-slate small">{employee.email}</div>
              </div>

              <div className="form-check mb-3 p-3 border rounded-3 d-flex align-items-start gap-2">
                <input
                  className="form-check-input mt-1 ms-1"
                  type="radio"
                  name="resetMethod"
                  id="methodEmail"
                />
                <label className="form-check-label ms-2" htmlFor="methodEmail">
                  <div
                    className="fw-bold text-dark"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Send reset link via Email
                  </div>
                  <div className="text-slate" style={{ fontSize: "0.8rem" }}>
                    A secure one-time link will be sent to the employee.
                  </div>
                </label>
              </div>

              <div className="form-check mb-4 p-3 border border-primary bg-blue-light bg-opacity-10 rounded-3 d-flex align-items-start gap-2">
                <input
                  className="form-check-input mt-1 ms-1"
                  type="radio"
                  name="resetMethod"
                  id="methodManual"
                  defaultChecked
                />
                <label
                  className="form-check-label ms-2 w-100"
                  htmlFor="methodManual"
                >
                  <div
                    className="fw-bold text-dark"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Generate temporary password
                  </div>
                  <div
                    className="text-slate mb-3"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Create a password to share with the employee manually.
                  </div>

                  <div className="copy-input-group bg-white">
                    <input
                      type="text"
                      value="BEI6SWOQ@2026"
                      readOnly
                      className="text-blue fw-bold"
                    />
                    <Button variant="icon">
                      <Copy size={16} className="text-slate" />
                    </Button>
                  </div>
                </label>
              </div>

              <div className="security-note bg-orange-light bg-opacity-10 border border-warning rounded-3 p-3 d-flex gap-2">
                <AlertTriangle
                  size={16}
                  className="text-orange mt-1 flex-shrink-0"
                />
                <div className="text-orange" style={{ fontSize: "0.85rem" }}>
                  <strong>Security Note:</strong> The employee will be required
                  to change their password immediately upon their next
                  successful login.
                </div>
              </div>
            </div>

            <div className="p-4 border-top bg-light d-flex justify-content-center gap-2">
              <Button
                variant="secondary"
                className="btn btn-light border bg-white fw-semibold px-4"
                onClick={() => setModalType(null)}
              >
                Cancel
              </Button>
              <Button className="btn btn-primary bg-blue border-0 fw-semibold px-4">
                Generate & Save
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (modalType === "deactivate") {
      return (
        <div className="ms-modal-overlay">
          <div
            className="ms-modal-content text-center p-4"
            style={{ maxWidth: "400px" }}
          >
            <div className="d-flex justify-content-end mb-2">
              <Button
                variant="icon"
                className="btn btn-light rounded-circle p-2 border-0 bg-transparent"
                onClick={() => setModalType(null)}
              >
                <X size={20} className="text-slate" />
              </Button>
            </div>

            <div className="mb-4">
              <AlertTriangle size={48} className="text-orange mb-3 mx-auto" />
              <h3 className="fw-bold mb-3">Deactivate Employee</h3>
              <p className="text-slate" style={{ fontSize: "0.9rem" }}>
                Are you sure you want to deactivate this employee?
                <br />
                They will be removed from active operations immediately.
              </p>
            </div>

            <div className="d-flex justify-content-center gap-3">
              <Button
                variant="secondary"
                className="btn btn-light border bg-white fw-semibold px-4 py-2"
                onClick={() => setModalType(null)}
              >
                Cancel
              </Button>
              <Button
                className="btn btn-warning text-white fw-semibold px-4 py-2"
                style={{ background: "#f59e0b", borderColor: "#f59e0b" }}
              >
                Confirm Deactivation
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (modalType === "delete") {
      return (
        <div className="ms-modal-overlay">
          <div
            className="ms-modal-content text-center p-4"
            style={{ maxWidth: "450px" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center gap-2">
                <div className="bg-red-light text-red p-2 rounded-circle">
                  <Trash2 size={16} />
                </div>
                <div className="text-start">
                  <div
                    className="fw-bold text-dark"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Delete employee
                  </div>
                  <div className="text-slate" style={{ fontSize: "0.75rem" }}>
                    This action cannot be undone
                  </div>
                </div>
              </div>
              <Button
                variant="icon"
                className="btn btn-light rounded-circle p-2 border-0 bg-transparent"
                onClick={() => setModalType(null)}
              >
                <X size={20} className="text-slate" />
              </Button>
            </div>

            <div className="mb-4 d-flex flex-column align-items-center">
              <div className="bg-red-light text-red p-3 rounded-circle mb-3 d-inline-flex">
                <Trash2 size={24} />
              </div>
              <h5 className="fw-bold mb-3">Delete {employee.name} ?</h5>
              <p className="text-slate" style={{ fontSize: "0.9rem" }}>
                This will permanently remove {employee.name}'s profile,
                attendance records, documents, payroll data, and all associated
                data. This cannot be recovered.
              </p>
            </div>

            <div className="bg-orange-light bg-opacity-10 border border-warning rounded-3 p-3 text-start mb-4 d-flex gap-2">
              <AlertTriangle
                size={16}
                className="text-orange mt-1 flex-shrink-0"
              />
              <div className="text-orange" style={{ fontSize: "0.85rem" }}>
                Type <strong>DELETE</strong> in the field below to confirm this
                action.
              </div>
            </div>

            <input
              type="text"
              className="form-control text-center mb-4"
              placeholder="Type DELETE to confirm"
            />

            <div className="d-flex justify-content-center gap-3">
              <Button
                variant="secondary"
                className="btn btn-light border bg-white fw-semibold px-4 py-2 w-50"
                onClick={() => setModalType(null)}
              >
                Cancel
              </Button>
              <Button
                variant="outline-destructive"
                className="btn btn-outline-danger fw-semibold px-4 py-2 w-50"
              >
                Permanently delete
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (modalType === "edit") {
      return (
        <div className="ms-modal-overlay">
          <div className="ms-modal-content" style={{ maxWidth: "800px" }}>
            <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
              <h3 className="m-0 fw-bold" style={{ fontSize: "1.2rem" }}>
                Employee Profile
              </h3>
              <Button
                variant="icon"
                className="btn btn-light rounded-circle p-2 border-0 bg-transparent"
                onClick={() => setModalType(null)}
              >
                <X size={20} className="text-slate" />
              </Button>
            </div>

            <div className="ms-modal-body bg-white p-4">
              <div className="ms-section">
                <h4 className="info-label mb-3">IDENTITY (READ-ONLY)</h4>
                <div className="row g-3">
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label">USER ID</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="6"
                      disabled
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label">EMPLOYEE ID</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="EMP003"
                      disabled
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label">DESIGNATION</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Software Engineer"
                      disabled
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label">DEPARTMENT</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Engineering"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="ms-section">
                <h4 className="info-label mb-3">PERSONAL DETAILS</h4>
                <div className="row g-3">
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label">FIRST NAME</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Sri"
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label">LAST NAME</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Vishnu"
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label">GENDER</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Male"
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label">MARITAL STATUS</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Married"
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label">PRIMARY PHONE</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="+919876543230"
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label">DATE OF BIRTH</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="12 - 10 - 1995"
                    />
                  </div>
                </div>
              </div>

              <div className="ms-section">
                <h4 className="info-label mb-3">BANK DETAILS</h4>
                <div className="row g-3">
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label">
                      Account Name Holder <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="EMP025"
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label">
                      Bank Name <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="EMP025"
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label">
                      Account Number <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="XXXX XXXX 4321"
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label">
                      IFSC Code <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="HDFC0001234"
                    />
                  </div>
                  <div className="col-12 form-group">
                    <label className="form-label">Branch Name</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Jubilee Hills, Hyderabad"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-top bg-light d-flex justify-content-center gap-3">
              <Button
                variant="secondary"
                className="btn btn-light border bg-white fw-semibold px-4"
                onClick={() => setModalType(null)}
              >
                Close
              </Button>
              <Button className="btn btn-primary bg-blue border-0 fw-semibold px-4 text-white">
                Update Profile
              </Button>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="emp-details-container fade-in">
      <div className="mb-4 d-flex align-items-center">
        <Button
          variant="ghost"
          className="btn btn-link text-slate text-decoration-none p-0 d-flex align-items-center"
          onClick={onBack}
        >
          <ArrowLeft size={16} className="me-2" /> Back to Directory
        </Button>
      </div>

      <div className="emp-details-header">
        <div className="emp-header-info">
          <div
            className={`emp-header-avatar ${employee.avatarBg} ${employee.avatarText}`}
          >
            {employee.initials}
          </div>
          <div>
            <div className="d-flex align-items-center gap-3 mb-1">
              <h2 className="emp-header-name">{employee.name}</h2>
              <span
                className={`badge ${employee.statusColor} rounded-pill px-3 py-1 fw-bold`}
                style={{ fontSize: "0.75rem" }}
              >
                {employee.status}
              </span>
            </div>
            <div className="emp-header-role">
              {employee.role} · {employee.dept}
            </div>
            <div className="emp-header-meta">
              <span>{employee.empId}</span>
              <span>{employee.email}</span>
            </div>
          </div>
        </div>

        <div className="emp-header-actions position-relative">
          <Button
            variant="secondary"
            className="btn btn-light bg-white border d-flex align-items-center fw-semibold text-dark shadow-sm"
            onClick={() => setModalType("edit")}
          >
            <Edit size={16} className="me-2 text-slate" /> Edit Profile
          </Button>
          <Button className="btn btn-primary bg-blue border-0 d-flex align-items-center fw-semibold text-white shadow-sm">
            <Download size={16} className="me-2" /> Export Report
          </Button>
          <Button
            variant="secondary"
            className="btn btn-light bg-white border rounded-circle p-2 shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowActionMenu(!showActionMenu);
            }}
          >
            <MoreHorizontal size={16} className="text-slate" />
          </Button>

          {showActionMenu && (
            <div
              className="dropdown-menu-custom show"
              style={{ right: 0, top: "45px", width: "220px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="dropdown-item-custom"
                onClick={() => {
                  setModalType("role");
                  setShowActionMenu(false);
                }}
              >
                <User size={16} className="me-2" /> Change Role
              </div>
              <div
                className="dropdown-item-custom"
                onClick={() => {
                  setModalType("password");
                  setShowActionMenu(false);
                }}
              >
                <Key size={16} className="me-2" /> Reset Password
              </div>
              <div className="dropdown-divider my-2 border-slate-200"></div>
              <div
                className="dropdown-item-custom text-orange fw-semibold"
                onClick={() => {
                  setModalType("deactivate");
                  setShowActionMenu(false);
                }}
              >
                <UserMinus size={16} className="me-2" /> Deactivate Employee
              </div>
              <div
                className="dropdown-item-custom text-red fw-semibold"
                onClick={() => {
                  setModalType("delete");
                  setShowActionMenu(false);
                }}
              >
                <Trash2 size={16} className="me-2" /> Delete Employee
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="emp-tabs">
        <Button
          className={`emp-tab ${activeTab === "Overview" ? "active" : ""}`}
          onClick={() => setActiveTab("Overview")}
        >
          Overview
        </Button>
        <Button
          className={`emp-tab ${activeTab === "Attendance" ? "active" : ""}`}
          onClick={() => setActiveTab("Attendance")}
        >
          Attendance
        </Button>
        <Button
          className={`emp-tab ${activeTab === "Leave History" ? "active" : ""}`}
          onClick={() => setActiveTab("Leave History")}
        >
          Leave History
        </Button>
        <Button
          className={`emp-tab ${activeTab === "LMS Activity" ? "active" : ""}`}
          onClick={() => setActiveTab("LMS Activity")}
        >
          LMS Activity
        </Button>
      </div>

      {activeTab === "Overview" && (
        <div className="emp-overview-grid fade-in">
          <div>
            <div className="emp-info-card shadow-sm">
              <h3 className="emp-info-title">Employee Information</h3>

              <div className="info-section">
                <div className="info-section-title">IDENTITY (READ-ONLY)</div>
                <div className="info-grid">
                  <div>
                    <div className="info-label">USER ID</div>
                    <div className="info-value-box">6</div>
                  </div>
                  <div>
                    <div className="info-label">EMPLOYEE ID</div>
                    <div className="info-value-box">EMP003</div>
                  </div>
                  <div>
                    <div className="info-label">DESIGNATION</div>
                    <div className="info-value-box">Software Engineer</div>
                  </div>
                  <div>
                    <div className="info-label">DEPARTMENT</div>
                    <div className="info-value-box">Engineering</div>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <div className="info-section-title">PERSONAL DETAILS</div>
                <div className="info-grid">
                  <div>
                    <div className="info-label">FIRST NAME</div>
                    <div className="info-value-box">Sri</div>
                  </div>
                  <div>
                    <div className="info-label">LAST NAME</div>
                    <div className="info-value-box">Vishnu</div>
                  </div>
                  <div>
                    <div className="info-label">GENDER</div>
                    <div className="info-value-box">Male</div>
                  </div>
                  <div>
                    <div className="info-label">MARITAL STATUS</div>
                    <div className="info-value-box">Married</div>
                  </div>
                  <div>
                    <div className="info-label">PRIMARY PHONE</div>
                    <div className="info-value-box">+919876543230</div>
                  </div>
                  <div>
                    <div className="info-label">DATE OF BIRTH</div>
                    <div className="info-value-box bg-white d-flex justify-content-between align-items-center">
                      12 - 10 - 1995{" "}
                      <Calendar size={16} className="text-slate" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <div className="info-section-title">CONTACT INFORMATION</div>
                <div className="info-grid">
                  <div>
                    <div className="info-label">PERSONAL EMAIL</div>
                    <div className="info-value-box">
                      Sri.vish231e@example.com
                    </div>
                  </div>
                  <div>
                    <div className="info-label">PRIMARY PHONE</div>
                    <div className="info-value-box">+919876543230</div>
                  </div>
                  <div className="info-field-full">
                    <div className="info-label">CURRENT ADDRESS</div>
                    <div className="info-value-box">
                      456 MG Road, Hyderabad, Telangana - 560001
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <div className="info-section-title">EMERGENCY CONTACT</div>
                <div
                  className="info-grid"
                  style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
                >
                  <div>
                    <div className="info-label">NAME</div>
                    <div className="info-value-box bg-white">Durga</div>
                  </div>
                  <div>
                    <div className="info-label">PHONE NO.</div>
                    <div className="info-value-box bg-white">+919876543231</div>
                  </div>
                  <div>
                    <div className="info-label">RELATION</div>
                    <div className="info-value-box bg-white">Mother</div>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <div className="info-section-title">
                  <span>DOCUMENTS</span>
                  <span className="text-blue" style={{ textTransform: "none" }}>
                    <CheckCircle2 size={12} /> Verified
                  </span>
                </div>
                <div className="document-item">
                  <div className="doc-icon">
                    <FileText size={20} />
                  </div>
                  <div className="doc-info">
                    <div className="doc-title">AADHAAR</div>
                    <div className="doc-meta">
                      C:\Folder\media\employee_documents
                      Employee_login_pannel.pdf
                      <br />
                      Uploaded: 2025-11-11 19:52:20
                    </div>
                    <Button
                      variant="secondary"
                      className="btn btn-sm btn-light border bg-white text-dark mt-2 fw-semibold px-3 py-1"
                      style={{ fontSize: "0.75rem" }}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="emp-metrics-row">
              <div className="emp-metric-sm">
                <div className="metric-val text-green">96%</div>
                <div className="metric-lbl">Attendance Rate</div>
              </div>
              <div className="emp-metric-sm">
                <div className="metric-val text-blue">2</div>
                <div className="metric-lbl">Leaves Taken</div>
              </div>
              <div className="emp-metric-sm">
                <div className="metric-val text-purple">88%</div>
                <div className="metric-lbl">LMS Score Avg</div>
              </div>
            </div>

            <div className="chart-card shadow-sm">
              <h4 className="chart-header">Attendance This Month</h4>

              <div className="bar-chart-container">
                <div className="y-axis">
                  <span>6</span>
                  <span>4</span>
                  <span>2</span>
                  <span>0</span>
                </div>

                {getAttendanceData().map((data, idx) => (
                  <div className="bar-group" key={idx}>
                    <div
                      className="bar present"
                      style={{ height: `${data.present}%` }}
                    ></div>
                    {data.absent > 0 && (
                      <div
                        className="bar absent"
                        style={{ height: `${data.absent}%` }}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="x-axis">
                <span>W1</span>
                <span>W2</span>
                <span>W3</span>
                <span>W4</span>
              </div>

              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-dot bg-green"></div> Present
                </div>
                <div className="legend-item">
                  <div className="legend-dot bg-red-light"></div> Absent
                </div>
              </div>
            </div>

            <div className="chart-card shadow-sm">
              <h4 className="chart-header">Recent Leave Activity</h4>
              <div className="activity-list">
                <div className="activity-item">
                  <div>
                    <div className="activity-title">Casual Leave</div>
                    <div className="activity-time">Apr 10, 2026 · 1 day</div>
                  </div>
                  <span className="badge bg-green-light text-green rounded-pill px-3 py-1">
                    Approved
                  </span>
                </div>
                <div className="activity-item">
                  <div>
                    <div className="activity-title">Sick Leave</div>
                    <div className="activity-time">Mar 5, 2026 · 1 day</div>
                  </div>
                  <span className="badge bg-green-light text-green rounded-pill px-3 py-1">
                    Approved
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Attendance" && (
        <div className="fade-in">
          <div className="emp-metrics-5">
            <div className="emp-metric-card">
              <div className="emp-metric-icon bg-green-light text-green">
                <CheckCircle size={24} />
              </div>
              <div>
                <div className="emp-metric-val text-green">96%</div>
                <div className="emp-metric-lbl">Attendance Rate</div>
              </div>
            </div>
            <div className="emp-metric-card">
              <div className="emp-metric-icon bg-blue-light text-blue">
                <Clock size={24} />
              </div>
              <div>
                <div className="emp-metric-val">22</div>
                <div className="emp-metric-lbl">Days Present</div>
              </div>
            </div>
            <div className="emp-metric-card">
              <div className="emp-metric-icon bg-red-light text-red">
                <XCircle size={24} />
              </div>
              <div>
                <div className="emp-metric-val text-red">1</div>
                <div className="emp-metric-lbl">Days Absent</div>
              </div>
            </div>
            <div className="emp-metric-card">
              <div className="emp-metric-icon bg-orange-light text-orange">
                <AlertCircle size={24} />
              </div>
              <div>
                <div className="emp-metric-val text-orange">2</div>
                <div className="emp-metric-lbl">Late Arrivals</div>
              </div>
            </div>
            <div className="emp-metric-card">
              <div className="emp-metric-icon bg-blue-light text-blue">
                <Clock size={24} />
              </div>
              <div>
                <div className="emp-metric-val text-blue">4h 31m</div>
                <div className="emp-metric-lbl">Total Overtime Hours</div>
              </div>
            </div>
          </div>

          <div className="chart-card shadow-sm mb-4">
            <h4 className="chart-header mb-1">Monthly Attendance Trend</h4>

            <div className="trend-chart-container">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 1000 200"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="trendGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.15)" />
                    <stop offset="100%" stopColor="rgba(59, 130, 246, 0.01)" />
                  </linearGradient>
                </defs>

                <line
                  x1="40"
                  y1="20"
                  x2="1000"
                  y2="20"
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
                <line
                  x1="40"
                  y1="70"
                  x2="1000"
                  y2="70"
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
                <line
                  x1="40"
                  y1="120"
                  x2="1000"
                  y2="120"
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
                <line
                  x1="40"
                  y1="170"
                  x2="1000"
                  y2="170"
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />

                <text
                  x="30"
                  y="25"
                  fill="#94a3b8"
                  fontSize="12"
                  textAnchor="end"
                >
                  100
                </text>
                <text
                  x="30"
                  y="75"
                  fill="#94a3b8"
                  fontSize="12"
                  textAnchor="end"
                >
                  95
                </text>
                <text
                  x="30"
                  y="125"
                  fill="#94a3b8"
                  fontSize="12"
                  textAnchor="end"
                >
                  85
                </text>
                <text
                  x="30"
                  y="175"
                  fill="#94a3b8"
                  fontSize="12"
                  textAnchor="end"
                >
                  75
                </text>

                <path
                  d="M 40 100 Q 250 80 500 100 T 1000 90"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                <path
                  d="M 40 70 L 250 50 L 500 60 L 750 40 L 1000 50 L 1000 170 L 40 170 Z"
                  fill="url(#trendGradient)"
                />

                <path
                  d="M 40 70 L 250 50 L 500 60 L 750 40 L 1000 50"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                />

                <circle cx="40" cy="70" r="4" fill="#3b82f6" />
                <circle cx="250" cy="50" r="4" fill="#3b82f6" />
                <circle cx="500" cy="60" r="4" fill="#3b82f6" />
                <circle cx="750" cy="40" r="4" fill="#3b82f6" />
                <circle cx="1000" cy="50" r="4" fill="#3b82f6" />
              </svg>

              <div
                className="x-axis mt-2"
                style={{ marginLeft: "40px", justifyContent: "space-between" }}
              >
                <span>Nov</span>
                <span>Dec</span>
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
              </div>
            </div>

            <div className="chart-legend mt-0">
              <div className="legend-item">
                <div className="legend-dot border border-primary bg-white"></div>{" "}
                Attendance %
              </div>
              <div className="legend-item">
                <div className="legend-dot bg-slate-200"></div> Team Avg
              </div>
            </div>
          </div>

          <div className="chart-card shadow-sm p-0 overflow-hidden">
            <div className="p-4 border-bottom">
              <div className="text-slate small fw-semibold">
                This month's records
              </div>
            </div>
            <div className="table-responsive">
              <table className="emp-data-table">
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>CHECK-IN</th>
                    <th>CHECK-OUT</th>
                    <th>TOTAL HOURS</th>
                    <th>OVERTIME</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Apr 22, 2026</td>
                    <td className="text-green fw-semibold">9:02 AM</td>
                    <td>6:10 PM</td>
                    <td className="fw-bold">9h 8m</td>
                    <td className="text-overtime">+1h 8m</td>
                    <td>
                      <span className="badge bg-green-light text-green rounded-pill px-3 py-1">
                        Present
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Apr 21, 2026</td>
                    <td className="text-green fw-semibold">9:05 AM</td>
                    <td>6:05 PM</td>
                    <td className="fw-bold">9h 0m</td>
                    <td className="text-overtime">+1h 0m</td>
                    <td>
                      <span className="badge bg-green-light text-green rounded-pill px-3 py-1">
                        Present
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Apr 18, 2026</td>
                    <td className="text-orange fw-semibold">9:45 AM</td>
                    <td>6:00 PM</td>
                    <td className="fw-bold">8h 15m</td>
                    <td className="text-overtime">+0h 15m</td>
                    <td>
                      <span className="badge bg-yellow-light text-yellow rounded-pill px-3 py-1">
                        Late
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Apr 17, 2026</td>
                    <td className="text-green fw-semibold">9:00 AM</td>
                    <td>6:00 PM</td>
                    <td className="fw-bold">9h 0m</td>
                    <td className="text-overtime">+1h 0m</td>
                    <td>
                      <span className="badge bg-green-light text-green rounded-pill px-3 py-1">
                        Present
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Apr 16, 2026</td>
                    <td className="text-slate">—</td>
                    <td className="text-slate">—</td>
                    <td className="text-slate fw-bold">—</td>
                    <td className="text-overtime">—</td>
                    <td>
                      <span className="badge bg-red-light text-red rounded-pill px-3 py-1">
                        Absent
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Apr 15, 2026</td>
                    <td className="text-green fw-semibold">9:02 AM</td>
                    <td>6:10 PM</td>
                    <td className="fw-bold">9h 8m</td>
                    <td className="text-overtime">+1h 8m</td>
                    <td>
                      <span className="badge bg-green-light text-green rounded-pill px-3 py-1">
                        Present
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Leave History" && (
        <div className="fade-in">

          <div className="emp-metrics-4">
            <div className="emp-metric-card">
              <div className="emp-metric-icon bg-blue-light text-blue">
                <CalendarDays size={24} />
              </div>
              <div>
                <div className="emp-metric-val">21</div>
                <div className="emp-metric-lbl">
                  Total Leave Days
                  <br />
                  <span className="text-slate" style={{ fontSize: "0.7rem" }}>
                    Allotted this year
                  </span>
                </div>
              </div>
            </div>
            <div className="emp-metric-card">
              <div className="emp-metric-icon bg-green-light text-green">
                <CheckCircle size={24} />
              </div>
              <div>
                <div className="emp-metric-val text-green">2</div>
                <div className="emp-metric-lbl">Used</div>
              </div>
            </div>
            <div className="emp-metric-card">
              <div className="emp-metric-icon bg-orange-light text-orange">
                <Clock size={24} />
              </div>
              <div>
                <div className="emp-metric-val text-orange">0</div>
                <div className="emp-metric-lbl">Pending</div>
              </div>
            </div>
            <div className="emp-metric-card">
              <div
                className="emp-metric-icon bg-purple-light text-purple"
                style={{ background: "#f3e8ff", color: "#9333ea" }}
              >
                <Bookmark size={24} />
              </div>
              <div>
                <div
                  className="emp-metric-val text-purple"
                  style={{ color: "#9333ea" }}
                >
                  19
                </div>
                <div className="emp-metric-lbl">Balance</div>
              </div>
            </div>
          </div>

          <div className="chart-card shadow-sm p-0 overflow-hidden">
            <div className="p-4 border-bottom">
              <div className="text-slate small fw-semibold">
                All leave requests
              </div>
            </div>
            <div className="table-responsive">
              <table className="emp-data-table">
                <thead>
                  <tr>
                    <th>TYPE</th>
                    <th>FROM</th>
                    <th>TO</th>
                    <th>DAYS</th>
                    <th>REASON</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="badge bg-blue-light text-blue rounded-pill px-3 py-1">
                        Casual Leave
                      </span>
                    </td>
                    <td>Apr 10, 2026</td>
                    <td>Apr 10, 2026</td>
                    <td className="fw-bold">1</td>
                    <td className="text-slate">Personal work</td>
                    <td>
                      <span className="badge bg-green-light text-green rounded-pill px-3 py-1">
                        Approved
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="secondary"
                        className="btn btn-sm btn-light border bg-white text-dark d-flex align-items-center"
                        onClick={() => setLeaveDrawer("LR-8790")}
                      >
                        <EyeIcon size={14} className="me-2" /> View
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="badge bg-yellow-light text-yellow rounded-pill px-3 py-1">
                        Sick Leave
                      </span>
                    </td>
                    <td>Mar 5, 2026</td>
                    <td>Mar 5, 2026</td>
                    <td className="fw-bold">1</td>
                    <td className="text-slate">Fever</td>
                    <td>
                      <span className="badge bg-green-light text-green rounded-pill px-3 py-1">
                        Approved
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="secondary"
                        className="btn btn-sm btn-light border bg-white text-dark d-flex align-items-center"
                        onClick={() => setLeaveDrawer("LR-8790")}
                      >
                        <EyeIcon size={14} className="me-2" /> View
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        className="badge bg-purple-light text-purple rounded-pill px-3 py-1"
                        style={{ background: "#f3e8ff", color: "#9333ea" }}
                      >
                        Maternity Leave
                      </span>
                    </td>
                    <td>Feb 1, 2026</td>
                    <td>Apr 30, 2026</td>
                    <td className="fw-bold">90</td>
                    <td className="text-slate">Maternity</td>
                    <td>
                      <span className="badge bg-green-light text-green rounded-pill px-3 py-1">
                        Approved
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="secondary"
                        className="btn btn-sm btn-light border bg-white text-dark d-flex align-items-center"
                        onClick={() => setLeaveDrawer("LR-8790")}
                      >
                        <EyeIcon size={14} className="me-2" /> View
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="badge bg-blue-light text-blue rounded-pill px-3 py-1">
                        Paternity Leave
                      </span>
                    </td>
                    <td>Jan 15, 2026</td>
                    <td>Jan 29, 2026</td>
                    <td className="fw-bold">14</td>
                    <td className="text-slate">Paternity</td>
                    <td>
                      <span className="badge bg-green-light text-green rounded-pill px-3 py-1">
                        Approved
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="secondary"
                        className="btn btn-sm btn-light border bg-white text-dark d-flex align-items-center"
                        onClick={() => setLeaveDrawer("LR-8790")}
                      >
                        <EyeIcon size={14} className="me-2" /> View
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "LMS Activity" && (
        <div className="fade-in">

          <div className="emp-metrics-4">
            <div className="emp-metric-card">
              <div className="emp-metric-icon bg-blue-light text-blue">
                <BookOpen size={24} />
              </div>
              <div>
                <div className="emp-metric-val">5</div>
                <div className="emp-metric-lbl">Enrolled Courses</div>
              </div>
            </div>
            <div className="emp-metric-card">
              <div className="emp-metric-icon bg-green-light text-green">
                <CheckCircle size={24} />
              </div>
              <div>
                <div className="emp-metric-val text-green">3</div>
                <div className="emp-metric-lbl">Completed</div>
              </div>
            </div>
            <div className="emp-metric-card">
              <div className="emp-metric-icon bg-orange-light text-orange">
                <AlertCircle size={24} />
              </div>
              <div>
                <div className="emp-metric-val text-orange">88%</div>
                <div className="emp-metric-lbl">Avg Quiz Score</div>
              </div>
            </div>
            <div className="emp-metric-card">
              <div
                className="emp-metric-icon bg-purple-light text-purple"
                style={{ background: "#f3e8ff", color: "#9333ea" }}
              >
                <Award size={24} />
              </div>
              <div>
                <div
                  className="emp-metric-val text-purple"
                  style={{ color: "#9333ea" }}
                >
                  3
                </div>
                <div className="emp-metric-lbl">Certificates</div>
              </div>
            </div>
          </div>

          <div className="chart-card shadow-sm p-0 overflow-hidden">
            <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
              <div className="text-slate small fw-semibold">
                Assigned courses
              </div>
              <Button
                className="btn btn-primary bg-blue border-0 d-flex align-items-center fw-semibold text-white shadow-sm btn-sm"
                onClick={() => setModalType("assignCourse")}
              >
                <Plus size={14} className="me-1" /> Assign Course
              </Button>
            </div>
            <div className="table-responsive">
              <table className="emp-data-table">
                <thead>
                  <tr>
                    <th>COURSE</th>
                    <th>CATEGORY</th>
                    <th>STATUS</th>
                    <th>PROGRESS</th>
                    <th>SCORE</th>
                    <th>DEADLINE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-bold">
                      <span className="course-dot bg-blue"></span> React
                      Advanced Patterns
                    </td>
                    <td>
                      <span className="badge bg-blue-light text-blue rounded-pill px-3 py-1">
                        Technical
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-blue-light text-blue rounded-pill px-3 py-1">
                        In Progress
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="lms-progress-bar flex-grow-1"
                          style={{ width: "80px" }}
                        >
                          <div
                            className="lms-progress-fill bg-green"
                            style={{ width: "80%" }}
                          ></div>
                        </div>
                        <span className="small text-slate">80%</span>
                      </div>
                    </td>
                    <td className="fw-bold text-green">94%</td>
                    <td className="text-slate">Jun 30, 2026</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">
                      <span className="course-dot bg-purple"></span> Leadership
                      Essentials
                    </td>
                    <td>
                      <span
                        className="badge bg-purple-light text-purple rounded-pill px-3 py-1"
                        style={{ background: "#e0e7ff", color: "#4f46e5" }}
                      >
                        Leadership
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-green-light text-green rounded-pill px-3 py-1">
                        Completed
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="lms-progress-bar flex-grow-1"
                          style={{ width: "80px" }}
                        >
                          <div
                            className="lms-progress-fill bg-green"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                        <span className="small text-slate">100%</span>
                      </div>
                    </td>
                    <td className="fw-bold text-green">88%</td>
                    <td className="text-slate">Completed Apr 14</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">
                      <span className="course-dot bg-green"></span> Data Privacy
                      & GDPR
                    </td>
                    <td>
                      <span
                        className="badge bg-blue-light text-blue rounded-pill px-3 py-1"
                        style={{ background: "#dbeafe", color: "#2563eb" }}
                      >
                        Compliance
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-green-light text-green rounded-pill px-3 py-1">
                        Completed
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="lms-progress-bar flex-grow-1"
                          style={{ width: "80px" }}
                        >
                          <div
                            className="lms-progress-fill bg-green"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                        <span className="small text-slate">100%</span>
                      </div>
                    </td>
                    <td className="fw-bold text-green">96%</td>
                    <td className="text-slate">Completed Apr 1</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">
                      <span className="course-dot bg-orange"></span> Design
                      Systems
                    </td>
                    <td>
                      <span
                        className="badge bg-blue-light text-blue rounded-pill px-3 py-1"
                        style={{ background: "#e0f2fe", color: "#0284c7" }}
                      >
                        Design
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-blue-light text-blue rounded-pill px-3 py-1">
                        In Progress
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="lms-progress-bar flex-grow-1"
                          style={{ width: "80px" }}
                        >
                          <div
                            className="lms-progress-fill bg-blue"
                            style={{ width: "45%" }}
                          ></div>
                        </div>
                        <span className="small text-slate">45%</span>
                      </div>
                    </td>
                    <td className="fw-bold text-slate">—</td>
                    <td className="text-slate">May 15, 2026</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">
                      <span
                        className="course-dot"
                        style={{ backgroundColor: "#0284c7" }}
                      ></span>{" "}
                      Agile & Scrum Mastery
                    </td>
                    <td>
                      <span
                        className="badge bg-blue-light text-blue rounded-pill px-3 py-1"
                        style={{ background: "#e0e7ff", color: "#4f46e5" }}
                      >
                        Leadership
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-slate-200 text-slate rounded-pill px-3 py-1">
                        Not Started
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="lms-progress-bar flex-grow-1"
                          style={{ width: "80px" }}
                        >
                          <div
                            className="lms-progress-fill bg-slate-300"
                            style={{ width: "0%" }}
                          ></div>
                        </div>
                        <span className="small text-slate">0%</span>
                      </div>
                    </td>
                    <td className="fw-bold text-slate">—</td>
                    <td className="text-slate">Jul 1, 2026</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {renderModal()}
    </div>
  );
};

export default EmployeeDetails;
