import { useState } from "react";

import Breadcrumb from "../../components/dashboard/Breadcrumb";
import {
  Clock,
  Home,
  Edit3,
  ChevronRight,
  Sun,
  Pause,
  Play,
  LogOut,
  ChevronLeft,
  Info,
} from "lucide-react";
import Modal from "../../components/common/Modal";
import "./Attendance.css";
import Button from "../../components/common/Button";
import { historyData as initialHistoryData } from "../../data/attendanceHistoryData";
import { attendanceService, withFallback } from "../../services";

const Attendance = ({ onTabChange, onNavigateHome, role = "manager" }) => {
  const [activeTab, setActiveTab] = useState("Attendance");
  const [sessionState, setSessionState] = useState("pre");
  const [historyView, setHistoryView] = useState("my");
  const [records, setRecords] = useState(initialHistoryData);

  const [isWfhModalOpen, setIsWfhModalOpen] = useState(false);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);

  const [wfhForm, setWfhForm] = useState({ date: "", reason: "" });
  const [regForm, setRegForm] = useState({ date: "", reason: "" });

  useEffect(() => {
    const fetchAttendanceData = async () => {
      const apiRecords = await withFallback(attendanceService.getAttendanceRecords(), initialHistoryData);
      setRecords(Array.isArray(apiRecords) ? apiRecords : apiRecords.results || initialHistoryData);
    };
    fetchAttendanceData();
  }, []);

  const historyData = records;

  const handleWfhSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      await attendanceService.submitWFHRequest(wfhForm);
    } catch (err) {
      console.warn("API WFH submission fallback:", err);
    }
    setIsWfhModalOpen(false);
  };

  const handleRegSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      await attendanceService.submitRegularization(regForm);
    } catch (err) {
      console.warn("API Regularization submission fallback:", err);
    }
    setIsRegModalOpen(false);
  };

  const handleCheckIn = async () => {
    try {
      await attendanceService.clockIn();
    } catch (e) {
      console.warn("API Clock In fallback:", e);
    }
    setSessionState("active");
  };

  const handleCheckOut = async () => {
    try {
      await attendanceService.clockOut();
    } catch (e) {
      console.warn("API Clock Out fallback:", e);
    }
    setSessionState("pre");
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <Breadcrumb items={["Dashboard", "Attendance"]} />
            <h1 className="page-title m-0">
              {activeTab === "View History" &&
              (role === "manager" || role === "admin")
                ? "Attendance Overview"
                : "Today's Attendance"}
            </h1>
            <p className="text-muted small m-0 mt-1">
              {activeTab === "View History" &&
              (role === "manager" || role === "admin")
                ? "Daily check-ins, overtime, regularization and monthly summaries"
                : "Manage your daily logs and track your working cycle · UTC +5:30"}
            </p>
          </div>

          <div className="bg-light p-1 rounded d-flex">
            <Button
              className={`btn border-0 fw-semibold px-4 py-2 ${
                activeTab === "Attendance"
                  ? "bg-blue text-white shadow-sm"
                  : "text-muted"
              }`}
              onClick={() => setActiveTab("Attendance")}
            >
              Attendance
            </Button>
            <Button
              className={`btn border-0 fw-semibold px-4 py-2 ${
                activeTab === "View History"
                  ? "bg-blue text-white shadow-sm"
                  : "text-muted"
              }`}
              onClick={() => setActiveTab("View History")}
            >
              View History
            </Button>
          </div>
        </div>

        {activeTab === "Attendance" ? (
          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="bg-white rounded border p-4 shadow-sm h-100 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <div className="d-flex align-items-center bg-light rounded-pill px-3 py-1 text-muted small fw-medium">
                    <div
                      className={`status-dot me-2 ${
                        sessionState === "active"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    ></div>
                    {sessionState === "active"
                      ? "Checked in - Active"
                      : "Not checked in yet"}
                  </div>
                  <div className="text-muted small fw-medium">
                    01:19:25 · Mon, Apr 6
                  </div>
                </div>

                <div className="text-center mb-5 flex-grow-1 d-flex flex-column justify-content-center">
                  <div
                    className="display-2 fw-bold text-secondary font-monospace"
                    style={{ letterSpacing: "2px" }}
                  >
                    {sessionState === "active" ? "06:10:52" : "00:00:00"}
                  </div>
                  <div className="text-muted fw-semibold small text-uppercase tracking-wide mb-4">
                    Session{" "}
                    {sessionState === "active" ? "in PROGRESS" : "not STARTED"}
                  </div>

                  {sessionState === "pre" ? (
                    <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
                      <div className="bg-light text-muted small fw-medium rounded-pill px-3 py-2 d-flex align-items-center">
                        <div className="status-dot bg-warning me-2"></div>
                        Shift starts at 9:00 AM
                      </div>
                      <Button
                        className="btn btn-primary bg-blue border-0 px-5 py-2 d-flex align-items-center fs-5 fw-medium"
                        onClick={handleCheckIn}
                      >
                        <LogOut
                          size={20}
                          className="me-2"
                          style={{ transform: "scaleX(-1)" }}
                        />{" "}
                        Check In
                      </Button>
                    </div>
                  ) : (
                    <div className="d-flex flex-column align-items-center gap-3">
                      <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center">
                        <div className="bg-light text-muted small fw-medium rounded-pill px-3 py-2 d-flex align-items-center">
                          <div className="status-dot bg-warning me-2"></div>
                          Shift starts at 9:00 AM
                        </div>
                        <Button
                          variant="outline-destructive"
                          className="btn btn-outline-danger px-5 py-2 d-flex align-items-center fs-5 fw-medium"
                          onClick={handleCheckOut}
                        >
                          <LogOut size={20} className="me-2" /> Check Out
                        </Button>
                      </div>
                      <div className="d-flex gap-3 mt-2">
                        <Button
                          variant="secondary"
                          className="btn btn-light border px-4 py-2 d-flex align-items-center fw-medium text-muted"
                        >
                          <Pause size={16} className="me-2" /> Take a Break
                        </Button>
                        <Button
                          variant="secondary"
                          className="btn btn-light border px-4 py-2 d-flex align-items-center fw-medium text-muted"
                          onClick={() => setIsRegModalOpen(true)}
                        >
                          <Edit3 size={16} className="me-2" /> Regularise
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-5 mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold small text-dark">
                      Today's Goal
                    </span>
                    <span className="small text-muted font-monospace">
                      {sessionState === "active" ? "06h 10m" : "0h 00m"} / 8h
                    </span>
                  </div>
                  <div
                    className="progress rounded-pill mb-2 bg-light"
                    style={{ height: "6px" }}
                  >
                    <div
                      className="progress-bar bg-blue rounded-pill"
                      style={{
                        width: sessionState === "active" ? "77%" : "0%",
                      }}
                    ></div>
                  </div>
                  <div
                    className="d-flex justify-content-between text-muted small font-monospace"
                    style={{ fontSize: "10px" }}
                  >
                    <span>0h</span>
                    <span>2h</span>
                    <span>4h</span>
                    <span>6h</span>
                    <span>8h</span>
                  </div>
                </div>

                <div>
                  <div className="text-muted small fw-bold text-uppercase tracking-wide mb-4">
                    ACTIVITY TIMELINE
                  </div>

                  {sessionState === "pre" ? (
                    <div className="text-center text-muted py-4">
                      <div className="bg-light rounded-circle d-inline-flex p-3 mb-3">
                        <Clock size={24} className="text-secondary" />
                      </div>
                      <p className="small m-0">No activity yet today.</p>
                      <p className="small m-0">
                        Check in to start your session.
                      </p>
                    </div>
                  ) : (
                    <div className="timeline-container ps-2">
                      <div className="timeline-item position-relative pb-4 ps-4">
                        <div
                          className="timeline-dot position-absolute bg-success-light border border-2 border-success rounded-circle"
                          style={{ width: 14, height: 14, left: -6, top: 2 }}
                        ></div>
                        <div
                          className="timeline-line position-absolute bg-light"
                          style={{ width: 2, left: 0, top: 16, bottom: 0 }}
                        ></div>
                        <div className="fw-semibold text-dark mb-1 lh-1">
                          Checked in
                        </div>
                        <div className="text-muted small lh-1">10:00 AM</div>
                      </div>
                      <div className="timeline-item position-relative pb-4 ps-4">
                        <div
                          className="timeline-dot position-absolute bg-white border border-2 border-success rounded-circle"
                          style={{ width: 14, height: 14, left: -6, top: 2 }}
                        ></div>
                        <div
                          className="timeline-line position-absolute bg-light"
                          style={{ width: 2, left: 0, top: 16, bottom: 0 }}
                        ></div>
                        <div className="fw-semibold text-dark mb-1 lh-1">
                          Pause for Break
                        </div>
                        <div className="text-muted small lh-1">12:59 PM</div>
                      </div>
                      <div className="timeline-item position-relative ps-4">
                        <div
                          className="timeline-dot position-absolute bg-success-light border border-2 border-success rounded-circle"
                          style={{ width: 14, height: 14, left: -6, top: 2 }}
                        ></div>
                        <div className="fw-semibold text-dark mb-1 lh-1">
                          Continue after Break
                        </div>
                        <div className="text-muted small lh-1">01:59 PM</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4 d-flex flex-column gap-3 mt-4 mt-lg-0">
              <div className="bg-warning-light border border-warning rounded p-3 text-warning-dark">
                <div className="d-flex align-items-start">
                  <Sun
                    size={20}
                    className="text-warning me-2 mt-1 flex-shrink-0"
                  />
                  <div>
                    <h6 className="fw-bold mb-1 text-dark">
                      Good morning, Sri Vishnu!
                    </h6>
                    <p className="m-0 small fw-medium text-danger">
                      Your shift starts at 9:00 AM. You're on time today..
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded p-4 shadow-sm">
                <div className="d-flex justify-content-between mb-4 text-center">
                  <div>
                    <h3 className="fw-bold m-0 text-dark">18</h3>
                    <p className="text-muted small m-0">Present</p>
                  </div>
                  <div className="border-end"></div>
                  <div>
                    <h3 className="fw-bold m-0 text-warning">3</h3>
                    <p className="text-muted small m-0">Late days</p>
                  </div>
                  <div className="border-end"></div>
                  <div>
                    <h3 className="fw-bold m-0 text-danger">1</h3>
                    <p className="text-muted small m-0">Absent</p>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small fw-bold text-muted text-uppercase tracking-wide">
                    MONTHLY ATTENDANCE
                  </span>
                  <span className="small fw-bold text-blue">82%</span>
                </div>
                <div
                  className="progress rounded-pill bg-light"
                  style={{ height: "6px" }}
                >
                  <div
                    className="progress-bar bg-blue rounded-pill"
                    style={{ width: "82%" }}
                  ></div>
                </div>
              </div>

              <div className="bg-white border rounded p-4 shadow-sm">
                <div className="small fw-bold text-muted text-uppercase tracking-wide mb-3">
                  QUICK ACTIONS
                </div>

                <div
                  className="d-flex align-items-center p-3 border rounded mb-3 cursor-pointer action-card"
                  onClick={() => setIsWfhModalOpen(true)}
                >
                  <div className="bg-success-light text-success p-2 rounded me-3">
                    <Home size={20} />
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="m-0 fw-semibold text-dark">Request WFH</h6>
                    <p className="m-0 text-muted small">Submit for tomorrow</p>
                  </div>
                  <ChevronRight size={16} className="text-muted" />
                </div>

                <div
                  className="d-flex align-items-center p-3 border rounded cursor-pointer action-card"
                  onClick={() => setIsRegModalOpen(true)}
                >
                  <div className="bg-blue-light text-blue p-2 rounded me-3">
                    <Edit3 size={20} />
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="m-0 fw-semibold text-dark">
                      Request Regularisation
                    </h6>
                    <p className="m-0 text-muted small">
                      Fix a past attendance entry
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-muted" />
                </div>
              </div>

              <div className="bg-white border rounded p-4 shadow-sm">
                <div className="small fw-bold text-muted text-uppercase tracking-wide mb-3">
                  CURRENT LOCATION
                </div>
                <div className="bg-light rounded p-3 d-flex align-items-center">
                  <div
                    className="status-dot bg-success me-3 flex-shrink-0"
                    style={{ width: 10, height: 10 }}
                  ></div>
                  <div>
                    <h6 className="m-0 fw-semibold text-dark">
                      Hi-Tech City, Hyderabad
                    </h6>
                    <p className="m-0 text-muted small">
                      Detected automatically
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded p-4 shadow-sm">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-light text-secondary p-2 rounded-circle me-2">
                    <Clock size={16} />
                  </div>
                  <h6 className="m-0 fw-semibold text-dark">Policy Update</h6>
                </div>
                <p className="text-muted small mb-3">
                  The WFH request window has been extended to 24 hours in
                  advance.
                </p>
                <a
                  href="#"
                  className="text-blue small fw-semibold text-decoration-none"
                >
                  Read policy &rarr;
                </a>
              </div>
            </div>
          </div>
        ) : (
          <>
            {(role === "manager" || role === "admin") && (
              <>
                <div className="row g-3 mb-4">
                  {[
                    {
                      label: "PRESENT TODAY",
                      count: "18",
                      subtext: "of 24 employees",
                      color: "text-success",
                    },
                    {
                      label: "ABSENT TODAY",
                      count: "3",
                      subtext: "2 on approved leave",
                      color: "text-danger",
                    },
                    {
                      label: "LATE ARRIVALS",
                      count: "2",
                      subtext: "after 9:30 AM",
                      color: "text-warning",
                    },
                    {
                      label: "WORK FROM HOME",
                      count: "5",
                      subtext: "remote today",
                      color: "text-primary",
                    },
                    {
                      label: "OVERTIME (HRS)",
                      count: "14",
                      subtext: "this week",
                      color: "text-purple",
                    },
                  ].map((stat, idx) => (
                    <div key={idx} className="col-12 col-md">
                      <div className="bg-white border rounded p-3 h-100">
                        <div
                          className="small fw-bold text-muted text-uppercase tracking-wide mb-2"
                          style={{ fontSize: "0.7rem" }}
                        >
                          {stat.label}
                        </div>
                        <h2 className={`fw-bold mb-1 ${stat.color}`}>
                          {stat.count}
                        </h2>
                        <div className="text-muted small">{stat.subtext}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="d-flex flex-wrap gap-2 mb-4">
                  <Button
                    variant="outline"
                    className="btn-system btn-system-outline bg-white text-muted border px-3 rounded-pill d-flex align-items-center gap-2"
                  >
                    <Clock size={14} /> Today's Records{" "}
                    <span className="badge bg-light text-dark ms-1">18</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="btn-system btn-system-outline bg-white text-muted border px-3 rounded-pill d-flex align-items-center gap-2"
                  >
                    <Play size={14} style={{ transform: "rotate(-90deg)" }} />{" "}
                    Overtime{" "}
                    <span className="badge bg-light text-dark ms-1">8</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="btn-system btn-system-outline bg-white text-muted border px-3 rounded-pill d-flex align-items-center gap-2"
                  >
                    <Edit3 size={14} /> Regularization{" "}
                    <span className="badge bg-light text-dark ms-1">5</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="btn-system btn-system-outline bg-white text-muted border px-3 rounded-pill d-flex align-items-center gap-2"
                  >
                    <Clock size={14} /> History
                  </Button>
                  <Button className="btn-system btn-system-primary px-3 rounded-pill d-flex align-items-center gap-2">
                    <div
                      className="bg-white rounded-sm d-flex align-items-center justify-content-center"
                      style={{ width: 14, height: 14 }}
                    >
                      <div
                        className="bg-blue"
                        style={{ width: 6, height: 6 }}
                      ></div>
                    </div>{" "}
                    Monthly Summary
                  </Button>
                </div>

                <div className="d-inline-flex gap-2 mb-4">
                  <Button
                    variant={historyView === "team" ? "primary" : "outline"}
                    className={`btn-system ${
                      historyView === "team"
                        ? "btn-system-primary"
                        : "btn-system-outline bg-white border text-muted"
                    }`}
                    onClick={() => setHistoryView("team")}
                  >
                    Team History
                  </Button>
                  <Button
                    variant={historyView === "my" ? "primary" : "outline"}
                    className={`btn-system ${
                      historyView === "my"
                        ? "btn-system-primary"
                        : "btn-system-outline bg-white border text-muted"
                    }`}
                    onClick={() => setHistoryView("my")}
                  >
                    My History
                  </Button>
                </div>
              </>
            )}

            {historyView === "team" ? (
              <div className="row g-4">

                <div className="col-12 col-xl-8">
                  <div className="bg-white rounded border shadow-sm overflow-hidden h-100">
                    <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
                      <h5 className="m-0 fw-bold">
                        Monthly summary — April 2026
                      </h5>
                      <div className="border rounded px-3 py-1 text-muted small d-flex align-items-center gap-2">
                        22 - 04 - 2026 <Clock size={14} />
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover mb-0 align-middle">
                        <thead className="bg-light">
                          <tr>
                            <th className="text-muted small fw-bold py-3 px-4 border-0">
                              Employee
                            </th>
                            <th className="text-muted small fw-bold py-3 px-3 border-0">
                              Present
                            </th>
                            <th className="text-muted small fw-bold py-3 px-3 border-0">
                              Absent
                            </th>
                            <th className="text-muted small fw-bold py-3 px-3 border-0">
                              Late
                            </th>
                            <th className="text-muted small fw-bold py-3 px-3 border-0">
                              WFH
                            </th>
                            <th className="text-muted small fw-bold py-3 px-3 border-0">
                              Overtime hrs
                            </th>
                            <th className="text-muted small fw-bold py-3 px-4 border-0">
                              Attendance %
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              name: "Ravi Kumar",
                              dept: "Engineering",
                              p: 17,
                              a: 1,
                              l: 0,
                              w: 3,
                              o: "4h",
                              pct: 94,
                              avatar: "RK",
                              color: "bg-purple-light text-purple",
                            },
                            {
                              name: "Emp Test",
                              dept: "Engineering",
                              p: 15,
                              a: 2,
                              l: 3,
                              w: 1,
                              o: "8h",
                              pct: 83,
                              avatar: "ET",
                              color: "bg-danger-light text-danger",
                            },
                            {
                              name: "Srinivas K.",
                              dept: "Engineering",
                              p: 16,
                              a: 1,
                              l: 1,
                              w: 4,
                              o: "2h",
                              pct: 89,
                              avatar: "SK",
                              color: "bg-warning-light text-warning",
                            },
                            {
                              name: "Priya Sharma",
                              dept: "Product",
                              p: 18,
                              a: 0,
                              l: 1,
                              w: 3,
                              o: "1h 45m",
                              pct: 100,
                              avatar: "PS",
                              color: "bg-blue-light text-blue",
                            },
                            {
                              name: "Ananya Reddy",
                              dept: "Design",
                              p: 14,
                              a: 4,
                              l: 2,
                              w: 1,
                              o: "0h",
                              pct: 78,
                              avatar: "AR",
                              color: "bg-primary bg-opacity-10 text-primary",
                            },
                            {
                              name: "Kiran Patel",
                              dept: "HR",
                              p: 16,
                              a: 2,
                              l: 0,
                              w: 2,
                              o: "0h 30m",
                              pct: 89,
                              avatar: "KP",
                              color: "bg-purple bg-opacity-10 text-purple",
                            },
                          ].map((emp, i) => (
                            <tr key={i}>
                              <td className="px-4 py-3">
                                <div className="d-flex align-items-center gap-3">
                                  <div
                                    className={`rounded-circle d-flex align-items-center justify-content-center fw-bold small ${emp.color}`}
                                    style={{
                                      width: 32,
                                      height: 32,
                                      fontSize: "0.75rem",
                                    }}
                                  >
                                    {emp.avatar}
                                  </div>
                                  <div>
                                    <div className="fw-bold text-dark small">
                                      {emp.name}
                                    </div>
                                    <div
                                      className="text-muted"
                                      style={{ fontSize: "0.75rem" }}
                                    >
                                      {emp.dept}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-3 py-3 fw-bold text-success">
                                {emp.p}
                              </td>
                              <td className="px-3 py-3 fw-bold text-danger">
                                {emp.a}
                              </td>
                              <td className="px-3 py-3 fw-bold text-warning">
                                {emp.l}
                              </td>
                              <td className="px-3 py-3 fw-bold text-primary">
                                {emp.w}
                              </td>
                              <td className="px-3 py-3 fw-bold text-purple">
                                {emp.o}
                              </td>
                              <td className="px-4 py-3">
                                <div className="d-flex align-items-center gap-2">
                                  <div
                                    className="flex-grow-1 bg-light rounded-pill overflow-hidden"
                                    style={{ height: "6px", minWidth: "60px" }}
                                  >
                                    <div
                                      className="bg-primary h-100"
                                      style={{ width: `${emp.pct}%` }}
                                    ></div>
                                  </div>
                                  <span className="small fw-bold">
                                    {emp.pct}%
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-xl-4">
                  <div className="bg-white rounded border shadow-sm p-4 h-100 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h6 className="m-0 fw-bold">April 2026</h6>
                      <span className="text-muted small">Calendar view</span>
                    </div>

                    <div className="mb-4">
                      <select className="form-select border text-dark">
                        <option>Ravi Kumar</option>
                        <option>Emp Test</option>
                      </select>
                    </div>

                    <div className="calendar-grid mb-auto">
                      <div className="d-flex justify-content-between mb-2 px-2 text-muted small">
                        <div style={{ width: "14%", textAlign: "center" }}>
                          S
                        </div>
                        <div style={{ width: "14%", textAlign: "center" }}>
                          M
                        </div>
                        <div style={{ width: "14%", textAlign: "center" }}>
                          T
                        </div>
                        <div style={{ width: "14%", textAlign: "center" }}>
                          W
                        </div>
                        <div style={{ width: "14%", textAlign: "center" }}>
                          T
                        </div>
                        <div style={{ width: "14%", textAlign: "center" }}>
                          F
                        </div>
                        <div style={{ width: "14%", textAlign: "center" }}>
                          S
                        </div>
                      </div>

                      <div className="d-flex flex-wrap">
                        {Array.from({ length: 30 }).map((_, i) => {
                          const day = i + 1;
                          let style = "text-success fw-bold";
                          let boxStyle = "";

                          if (day % 7 === 4 || day % 7 === 5) {

                            style = "text-muted opacity-50";
                          } else if (day === 8) {
                            style = "text-danger fw-bold";
                            boxStyle = "bg-danger bg-opacity-10 rounded";
                          } else if (day === 23) {
                            style = "text-warning fw-bold";
                            boxStyle = "bg-warning bg-opacity-10 rounded";
                          } else if (
                            day === 3 ||
                            day === 10 ||
                            day === 17 ||
                            day === 30
                          ) {
                            style = "text-primary fw-bold";
                            boxStyle = "border border-primary rounded";
                          }

                          return (
                            <div
                              key={i}
                              className="p-1"
                              style={{ width: "14%", aspectRatio: "1/1" }}
                            >
                              <div
                                className={`w-100 h-100 d-flex align-items-center justify-content-center small ${style} ${boxStyle}`}
                              >
                                {day}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mt-4 pt-3 border-top small text-muted">
                      <div className="d-flex align-items-center gap-1">
                        <div
                          className="rounded-circle border border-success"
                          style={{ width: 10, height: 10 }}
                        ></div>{" "}
                        Present
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <div
                          className="rounded-circle bg-danger"
                          style={{ width: 10, height: 10 }}
                        ></div>{" "}
                        Absent
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <div
                          className="rounded border border-primary"
                          style={{ width: 10, height: 10 }}
                        ></div>{" "}
                        WFH
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <div
                          className="rounded-circle bg-warning"
                          style={{ width: 10, height: 10 }}
                        ></div>{" "}
                        Late
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row g-4">

                <div className="col-12 col-md-4">
                  <div className="bg-white rounded border p-4 shadow-sm h-100 d-flex flex-column">
                    <div className="small fw-bold text-muted text-uppercase tracking-wide mb-3">
                      PRESENT DAYS
                    </div>
                    <div className="d-flex align-items-end mb-4">
                      <h1 className="display-4 fw-bold text-dark m-0 me-2 lh-1">
                        22
                      </h1>
                      <span className="text-muted fw-semibold mb-1">/ 24</span>
                    </div>

                    <div
                      className="d-flex align-items-end flex-grow-1 gap-3 justify-content-between px-2 mb-4"
                      style={{ minHeight: "100px" }}
                    >
                      <div
                        className="bg-blue rounded-top w-100 opacity-50"
                        style={{ height: "70%" }}
                      ></div>
                      <div
                        className="bg-blue rounded-top w-100"
                        style={{ height: "100%" }}
                      ></div>
                      <div
                        className="bg-danger rounded-top w-100 opacity-75"
                        style={{ height: "40%" }}
                      ></div>
                      <div
                        className="bg-blue rounded-top w-100 opacity-75"
                        style={{ height: "80%" }}
                      ></div>
                      <div
                        className="bg-blue rounded-top w-100"
                        style={{ height: "60%" }}
                      ></div>
                    </div>

                    <div className="small fw-medium text-dark mt-auto">
                      &uarr; 2 vs last month
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="bg-light rounded border p-4 h-100 d-flex flex-column justify-content-center">
                    <div className="small fw-bold text-muted text-uppercase tracking-wide mb-3">
                      AVG. WORK DAY
                    </div>
                    <div
                      className="display-4 fw-bold text-dark m-0 mb-3 font-monospace"
                      style={{ letterSpacing: "1px" }}
                    >
                      07:32:42
                    </div>
                    <div className="small fw-medium text-dark mt-auto">
                      Best Day: Thur · 10hr 33min
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="bg-white rounded border p-4 shadow-sm h-100 d-flex flex-column align-items-center justify-content-center">
                    <div className="small fw-bold text-muted text-uppercase tracking-wide mb-4 align-self-start">
                      WEEKLY CHART
                    </div>
                    <div className="position-relative d-inline-flex align-items-center justify-content-center mb-4">
                      <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          stroke="#f1f5f9"
                          strokeWidth="12"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="12"
                          strokeDasharray="314"
                          strokeDashoffset="25"
                          strokeLinecap="round"
                          transform="rotate(-90 60 60)"
                        />
                      </svg>
                      <div className="position-absolute fs-3 fw-bold text-dark">
                        92%
                      </div>
                    </div>
                    <div className="small fw-medium text-dark mt-auto align-self-start">
                      Best Day: Thur · 10hr 33min
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-4">
                  <div className="bg-white rounded border shadow-sm overflow-hidden">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0 align-middle">
                        <thead className="bg-white border-bottom">
                          <tr>
                            <th className="text-muted small fw-bold text-uppercase tracking-wide py-3 px-4 border-0">
                              DATE
                            </th>
                            <th className="text-muted small fw-bold text-uppercase tracking-wide py-3 px-4 border-0">
                              CHECK-IN
                            </th>
                            <th className="text-muted small fw-bold text-uppercase tracking-wide py-3 px-4 border-0">
                              CHECK-OUT
                            </th>
                            <th className="text-muted small fw-bold text-uppercase tracking-wide py-3 px-4 border-0">
                              TOTAL HOURS
                            </th>
                            <th className="text-muted small fw-bold text-uppercase tracking-wide py-3 px-4 border-0">
                              STATUS
                            </th>
                            <th className="text-muted small fw-bold text-uppercase tracking-wide py-3 px-4 border-0 text-center">
                              TYPE
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {historyData.map((row, idx) => (
                            <tr key={idx}>
                              <td className="px-4 py-3 fw-medium text-dark">
                                {row.date}
                              </td>
                              <td className="px-4 py-3 fw-medium text-dark">
                                {row.checkIn}
                              </td>
                              <td className="px-4 py-3 fw-medium text-dark">
                                {row.checkOut}
                              </td>
                              <td className="px-4 py-3 fw-medium text-dark">
                                {row.total}
                              </td>
                              <td className="px-4 py-3">
                                {row.status === "Present" && (
                                  <span className="badge rounded-pill bg-success-light border border-success text-success fw-medium px-3 py-1">
                                    Present
                                  </span>
                                )}
                                {row.status === "Late" && (
                                  <div className="d-inline-flex gap-2">
                                    <span className="badge rounded-pill bg-warning-light border border-warning text-warning-dark fw-medium px-3 py-1">
                                      Late
                                    </span>
                                    <span className="badge rounded-pill bg-warning text-white fw-medium px-3 py-1">
                                      {row.lateTime}
                                    </span>
                                  </div>
                                )}
                                {row.status === "Overtime" && (
                                  <div className="d-inline-flex gap-2">
                                    <span className="badge rounded-pill bg-blue-light border border-blue text-blue fw-medium px-3 py-1">
                                      Overtime
                                    </span>
                                    <span className="badge rounded-pill bg-blue text-white fw-medium px-3 py-1">
                                      {row.overTime}
                                    </span>
                                  </div>
                                )}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <span className="badge rounded-pill bg-light text-secondary fw-medium px-3 py-1 border">
                                  {row.type}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="d-flex justify-content-between align-items-center p-3 border-top">
                      <div className="text-muted small">
                        Showing 1 to 5 of 24 records
                      </div>
                      <div className="d-flex gap-1">
                        <Button
                          variant="icon"
                          className="btn btn-sm btn-light border px-2 py-1 text-muted"
                        >
                          <ChevronLeft size={16} />
                        </Button>
                        <Button className="btn btn-sm btn-primary bg-blue border-0 px-3 py-1 fw-medium">
                          1
                        </Button>
                        <Button
                          variant="secondary"
                          className="btn btn-sm btn-light border px-3 py-1 text-muted"
                        >
                          2
                        </Button>
                        <Button
                          variant="secondary"
                          className="btn btn-sm btn-light border px-3 py-1 text-muted"
                        >
                          3
                        </Button>
                        <Button
                          variant="icon"
                          className="btn btn-sm btn-light border px-2 py-1 text-muted"
                        >
                          <ChevronRight size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <Modal
          isOpen={isRegModalOpen}
          onClose={() => setIsRegModalOpen(false)}
          title={
            <>
              <h4 className="m-0 fw-bold text-dark">New Regularization</h4>
              <p
                className="text-muted small m-0 mt-1"
                style={{ fontSize: "0.85rem" }}
              >
                Correct your attendance records by providing a valid
                justification for the discrepancy.
              </p>
            </>
          }
          maxWidth="550px"
          footer={
            <div className="d-flex w-100 gap-3 pt-2">
              <Button
                variant="secondary"
                className="btn btn-light bg-light border-0 fw-semibold flex-grow-1 py-2 text-dark"
                style={{ backgroundColor: "#e9ecef" }}
                onClick={() => setIsRegModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="btn btn-primary bg-blue border-0 fw-semibold flex-grow-1 py-2"
                onClick={() => setIsRegModalOpen(false)}
              >
                Submit
              </Button>
            </div>
          }
        >
          <div className="form-group mb-4 mt-2">
            <label className="small fw-bold text-muted text-uppercase tracking-wide mb-2">
              EFFECTIVE DATE
            </label>
            <div className="position-relative">
              <input
                type="date"
                className="form-control py-2 bg-light border-0"
                value={regForm.date}
                onChange={(e) =>
                  setRegForm({ ...regForm, date: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-group mb-4">
            <label className="small fw-bold text-muted text-uppercase tracking-wide mb-2">
              REASON FOR REQUEST
            </label>
            <textarea
              className="form-control bg-light border-0"
              rows="4"
              placeholder="e.g. Technical glitch at entrance gate, forgot to swipe card..."
              value={regForm.reason}
              onChange={(e) =>
                setRegForm({ ...regForm, reason: e.target.value })
              }
            ></textarea>
          </div>
          <div className="bg-light rounded p-3 d-flex align-items-start mb-2">
            <Info size={16} className="text-muted flex-shrink-0 mt-1 me-2" />
            <p className="small text-muted m-0">
              Please be concise. Requests are reviewed by the HR department and
              your direct supervisor. Attachments can be added after submission.
            </p>
          </div>
        </Modal>

        <Modal
          isOpen={isWfhModalOpen}
          onClose={() => setIsWfhModalOpen(false)}
          title={
            <>
              <h4 className="m-0 fw-bold text-dark">WFH Request</h4>
              <p
                className="text-muted small m-0 mt-1"
                style={{ fontSize: "0.85rem" }}
              >
                Submit your remote work schedule for approval.
              </p>
            </>
          }
          maxWidth="500px"
          footer={
            <div className="d-flex flex-column w-100 gap-2 pt-2">
              <Button
                className="btn btn-primary bg-blue border-0 fw-semibold py-2 w-100"
                onClick={() => setIsWfhModalOpen(false)}
              >
                Submit Request
              </Button>
              <Button
                variant="secondary"
                className="btn btn-white border-0 fw-semibold text-muted py-2 w-100"
                onClick={() => setIsWfhModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          }
        >
          <div className="form-group mb-4 mt-2">
            <label className="small fw-bold text-muted text-uppercase tracking-wide mb-2">
              REQUEST DATE
            </label>
            <div className="position-relative">
              <input
                type="date"
                className="form-control py-2"
                value={wfhForm.date}
                onChange={(e) =>
                  setWfhForm({ ...wfhForm, date: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-group mb-2">
            <label className="small fw-bold text-muted text-uppercase tracking-wide mb-2">
              REASON FOR REQUEST
            </label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Detail your request objectives..."
              value={wfhForm.reason}
              onChange={(e) =>
                setWfhForm({ ...wfhForm, reason: e.target.value })
              }
            ></textarea>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Attendance;
