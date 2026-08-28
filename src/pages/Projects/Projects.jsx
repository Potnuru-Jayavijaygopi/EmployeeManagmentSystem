import { useState, useEffect } from "react";
import {
  Folder,
  PlayCircle,
  CheckCircle2,
  AlertCircle,
  Users,
  Search,
  ChevronDown,
  Filter,
  Eye,
  Edit2,
  UserPlus,
  FilePlus,
  X,
  UploadCloud,
  ArrowRightLeft,
  Plus,
  Check,
  Trash2,
  Calendar,
  RefreshCw,
  ClipboardList,
  Clock,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./Projects.css";
import { projectsData as initialProjectsData } from "../../data/projectsConstants";
import { MdOutlineArchive } from "react-icons/md";
import Button from '../../components/common/Button';
import { dashboardService, withFallback } from "../../services";

const Projects = () => {
  const location = useLocation();
  const [projectsList, setProjectsList] = useState(initialProjectsData);

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await withFallback(dashboardService.getProjects(), initialProjectsData);
      if (Array.isArray(projects) && projects.length > 0 && projects[0]?.manager) {
        setProjectsList(projects);
      }
    };
    fetchProjects();
  }, []);

  const projectsData = Array.isArray(projectsList) && projectsList.length > 0 ? projectsList : initialProjectsData;
  const isEmployee = location.pathname.startsWith("/employee");
  const [viewMode, setViewMode] = useState("list"); 
  const [selectedProject, setSelectedProject] = useState(null);
  const [drawerTab, setDrawerTab] = useState("Overview");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isChangeManagerModalOpen, setIsChangeManagerModalOpen] =
    useState(false);
  const [isAssignTaskModalOpen, setIsAssignTaskModalOpen] = useState(false);
  const getAccentColor = (status) => {
    switch (status) {
      case "Active":
        return "blue";
      case "Completed":
        return "green";
      case "On Hold":
        return "orange";
      default:
        return "blue";
    }
  };

  const openDrawer = (project) => {
    setSelectedProject(project);
    setDrawerTab("Overview");
  };

  return (
    <div className="projects-container fade-in p-4">
      <div className="proj-breadcrumb">
        <Link to="/admin/dashboard">Projects</Link>{" "}
        <span className="mx-1">›</span> <span>Overview</span>
      </div>

      <div className="proj-header">
        <h1 className="proj-title">Project Management</h1>
        <div className="d-flex gap-2">
          {viewMode === "list" ? (
            <Button variant="outline"
              className="btn btn-outline-secondary"
              onClick={() => setViewMode("empty")}
            >
              Show Empty State
            </Button>
          ) : (
            <Button variant="outline"
              className="btn btn-outline-secondary"
              onClick={() => setViewMode("list")}
            >
              Show Projects
            </Button>
          )}
          {!isEmployee && (
            <Button
              className="btn btn-primary bg-blue border-0 px-4 fw-semibold shadow-sm d-flex align-items-center gap-2"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus size={16} /> Create Project
            </Button>
          )}
        </div>
      </div>

      {viewMode === "empty" ? (
        <div className="proj-empty-state fade-in">
          <div className="empty-graphic">
            <div
              className="d-flex flex-column gap-2 opacity-25"
              style={{ width: "80%" }}
            >
              <div
                style={{
                  height: "12px",
                  width: "40%",
                  background: "#94a3b8",
                  borderRadius: "4px",
                }}
              ></div>
              <div
                style={{
                  height: "12px",
                  width: "70%",
                  background: "#94a3b8",
                  borderRadius: "4px",
                }}
              ></div>
              <div
                style={{
                  height: "40px",
                  width: "100%",
                  background: "#94a3b8",
                  borderRadius: "8px",
                  marginTop: "12px",
                }}
              ></div>
            </div>
            <div className="empty-awaiting-badge text-dark fw-bold">
              <CheckCircle2 size={24} />
              <span style={{ fontSize: "0.6rem" }}>AWAITING</span>
            </div>
          </div>
          <h3>No Projects available yet</h3>
          <p>
            Your project board is empty. Begin by breaking your goals into
            manageable tasks for your team.
          </p>
          {!isEmployee && (
            <>
              <Button
                className="btn btn-primary bg-blue border-0 px-4 py-2 fw-semibold shadow-sm d-flex align-items-center gap-2"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus size={16} /> Add Project
              </Button>
              <div className="empty-tip">
                TIP: PRESS <span className="key-badge">P</span> TO QUICKLY
                CREATE A PROJECT
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="fade-in">
          {isEmployee ? (
            <div className="proj-kpi-grid">
              <div className="proj-kpi-card shadow-sm">
                <div className="proj-kpi-value">7</div>
                <div className="proj-kpi-label">My Assigned Projects</div>
                <div className="proj-kpi-trend green">
                  <CheckCircle2 size={12} /> All verified
                </div>
                <div className="proj-kpi-icon blue">
                  <Folder size={18} />
                </div>
              </div>
              <div className="proj-kpi-card shadow-sm">
                <div className="proj-kpi-value">5</div>
                <div className="proj-kpi-label">My Active Tasks</div>
                <div
                  className="proj-kpi-trend red"
                  style={{ color: "#ef4444" }}
                >
                  ! Action needed
                </div>
                <div
                  className="proj-kpi-icon"
                  style={{ background: "#fffbeb", color: "#f59e0b" }}
                >
                  <ClipboardList size={18} />
                </div>
              </div>
              <div className="proj-kpi-card shadow-sm">
                <div className="proj-kpi-value">5</div>
                <div className="proj-kpi-label">Completed Tasks</div>
                <div className="proj-kpi-trend green">
                  <CheckCircle2 size={12} /> +2 this week
                </div>
                <div className="proj-kpi-icon green">
                  <CheckCircle2 size={18} />
                </div>
              </div>
              <div className="proj-kpi-card shadow-sm">
                <div
                  className="proj-kpi-value"
                  style={{ fontSize: "1.25rem", marginTop: "10px" }}
                >
                  15 May 2025
                </div>
                <div className="proj-kpi-label">Upcoming Deadline</div>
                <div className="proj-kpi-trend red">
                  <Clock size={12} /> On 21 May 2026
                </div>
                <div className="proj-kpi-icon red">
                  <Calendar size={18} />
                </div>
              </div>
            </div>
          ) : (
            <div className="proj-kpi-grid">
              <div className="proj-kpi-card shadow-sm">
                <div className="proj-kpi-value">10</div>
                <div className="proj-kpi-label">Total Projects</div>
                <div className="proj-kpi-trend green">↗ +2 this qtr</div>
                <div className="proj-kpi-icon blue">
                  <Folder size={18} />
                </div>
              </div>
              <div className="proj-kpi-card shadow-sm">
                <div className="proj-kpi-value">5</div>
                <div className="proj-kpi-label">Active Projects</div>
                <div className="proj-kpi-trend green">
                  <CheckCircle2 size={12} /> 4 on schedule
                </div>
                <div className="proj-kpi-icon blue bg-white border text-blue">
                  <PlayCircle size={18} />
                </div>
              </div>
              <div className="proj-kpi-card shadow-sm">
                <div className="proj-kpi-value">2</div>
                <div className="proj-kpi-label">Completed</div>
                <div className="proj-kpi-trend green">↗ +1 this month</div>
                <div className="proj-kpi-icon green bg-white border text-green">
                  <CheckCircle2 size={18} />
                </div>
              </div>
              <div className="proj-kpi-card shadow-sm">
                <div className="proj-kpi-value">1</div>
                <div className="proj-kpi-label">Delayed Projects</div>
                <div className="proj-kpi-trend red">
                  <AlertCircle size={12} /> Needs Attention
                </div>
                <div className="proj-kpi-icon red bg-white border text-red">
                  <AlertCircle size={18} />
                </div>
              </div>
              <div className="proj-kpi-card shadow-sm">
                <div className="proj-kpi-value">7</div>
                <div className="proj-kpi-label">Assigned Managers</div>
                <div className="proj-kpi-trend green">↗ 100% assigned</div>
                <div className="proj-kpi-icon purple">
                  <Users size={18} />
                </div>
              </div>
            </div>
          )}

          <div className="proj-filter-bar">
            <div className="proj-search-input">
              <Search size={16} className="proj-search-icon" />
              <input type="text" placeholder="Search projects..." />
            </div>
            <div className="proj-filters">
              <div className="proj-filter-wrapper">
                <select className="proj-filter-select">
                  <option>All Statuses</option>
                </select>
                <ChevronDown size={14} className="proj-filter-chevron" />
              </div>
              <div className="proj-filter-wrapper">
                <select className="proj-filter-select">
                  <option>All Departments</option>
                </select>
                <ChevronDown size={14} className="proj-filter-chevron" />
              </div>
              <div className="proj-filter-wrapper">
                <select className="proj-filter-select">
                  <option>All Managers</option>
                </select>
                <ChevronDown size={14} className="proj-filter-chevron" />
              </div>
              <div className="proj-filter-wrapper">
                <select className="proj-filter-select">
                  <option>Sort: Name</option>
                </select>
                <Filter
                  size={14}
                  className="proj-filter-chevron"
                  style={{ right: "auto", left: "12px" }}
                />
              </div>
            </div>
          </div>

          <div className="proj-card-list">
            {projectsData.map((proj) => (
              <div
                key={proj.id}
                className="proj-card shadow-sm"
                onClick={() => openDrawer(proj)}
                style={{ cursor: "pointer" }}
              >
                <div
                  className={`proj-card-accent ${getAccentColor(proj.status)}`}
                ></div>

                <div>
                  <div className="pc-id-status">
                    <span className="pc-id">{proj.id}</span>
                    <span
                      className={`pc-status ${(proj.status || "Active")
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      <div className="dot"></div> {proj.status || "Active"}
                    </span>
                  </div>
                  <h3 className="pc-title">{proj.title}</h3>
                  <div className="pc-desc">{proj.desc}</div>
                </div>

                <div className="pc-badges">
                  <span
                    className={`proj-badge priority-${(proj.priority || "Medium").toLowerCase()}`}
                  >
                    {proj.priority || "Medium"}
                  </span>
                  <span className="proj-badge dept">{proj.dept}</span>
                </div>

                <div className="pc-user">
                  <div
                    className="pc-avatar"
                    style={{ background: proj.manager?.color || "#3b82f6" }}
                  >
                    {proj.manager?.initials || "PM"}
                  </div>
                  <div className="pc-user-info">
                    <span className="pc-user-name">{proj.manager?.name || "Project Manager"}</span>
                    <span className="pc-user-role">Manager</span>
                  </div>
                </div>

                <div className="pc-user" style={{ justifyContent: "center" }}>
                  <div className="pc-avatar-group">
                    {(proj.team || []).map((mbr, i) => (
                      <div
                        key={i}
                        className="pc-avatar shadow-sm"
                        style={{ background: mbr.color || "#3b82f6", zIndex: 10 - i }}
                      >
                        {mbr.initials}
                      </div>
                    ))}
                  </div>
                  <div className="pc-user-info ms-2">
                    <span
                      className="pc-user-role"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {proj.team.length} members
                    </span>
                  </div>
                </div>

                <div className="pc-progress">
                  <div className="pc-prog-header">
                    <span
                      className="text-slate"
                      style={{ fontSize: "0.85rem", fontWeight: "600" }}
                    >
                      {isEmployee
                        ? `My Tasks (${
                            proj.tasks?.filter((t) => t.completed).length || 0
                          }/${proj.tasks?.length || 0})`
                        : "Progress"}
                    </span>
                    <span
                      style={{
                        color:
                          proj.progress === 100
                            ? "#10b981"
                            : proj.progress > 50
                            ? "#f59e0b"
                            : "#ef4444",
                        fontWeight: "700",
                      }}
                    >
                      {proj.progress}%
                    </span>
                  </div>
                  <div
                    className="pc-prog-bar-bg"
                    style={{ marginTop: "4px", marginBottom: "4px" }}
                  >
                    <div
                      className="pc-prog-fill"
                      style={{
                        width: `${proj.progress}%`,
                        background:
                          proj.progress === 100
                            ? "#10b981"
                            : proj.progress > 50
                            ? "#f59e0b"
                            : "#ef4444",
                      }}
                    ></div>
                  </div>
                  <div
                    className={`pc-deadline ${
                      proj.isOverdue ? "overdue" : "safe"
                    }`}
                  >
                    <Calendar size={12} />{" "}
                    {proj.isOverdue
                      ? `Overdue — ${proj.deadline}`
                      : `Due ${proj.deadline}`}
                  </div>
                </div>

                <div className="pc-actions">
                  <Button variant="icon"
                    className="pc-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDrawer(proj);
                    }}
                  >
                    <Eye size={16} />
                  </Button>
                  {isEmployee ? (
                    <Button variant="icon" className="pc-action-btn">
                      <MdOutlineArchive size={16} />
                    </Button>
                  ) : (
                    <>
                      <Button variant="icon"
                        className="pc-action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsCreateModalOpen(true);
                        }}
                      >
                        <Edit2 size={14} />
                      </Button>
                      <Button variant="icon"
                        className="pc-action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsAddMemberModalOpen(true);
                        }}
                      >
                        <UserPlus size={16} />
                      </Button>
                      <Button variant="icon"
                        className="pc-action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsAssignTaskModalOpen(true);
                        }}
                      >
                        <FilePlus size={16} />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedProject && (
        <div
          className="proj-drawer-overlay"
          onClick={() => setSelectedProject(null)}
        >
          <div className="proj-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header d-flex flex-column">
              <Button variant="icon"
                className="drawer-close"
                onClick={() => setSelectedProject(null)}
              >
                <X size={18} />
              </Button>
              <div className="pc-id-status mb-1">
                <span className="pc-id">{selectedProject.id}</span>
              </div>
              <h2 className="proj-title mb-3" style={{ fontSize: "1.5rem" }}>
                {selectedProject.title}
              </h2>
              <div className="pc-badges" style={{ flexDirection: "row" }}>
                <span
                  className={`pc-status ${selectedProject.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  <div className="dot"></div> {selectedProject.status}
                </span>
                <span
                  className={`proj-badge priority-${selectedProject.priority.toLowerCase()}`}
                >
                  {selectedProject.priority}
                </span>
                <span className="proj-badge dept">{selectedProject.dept}</span>
              </div>
            </div>

            {!isEmployee && (
              <div className="drawer-tabs">
                <Button
                  className={`drawer-tab ${
                    drawerTab === "Overview" ? "active" : ""
                  }`}
                  onClick={() => setDrawerTab("Overview")}
                >
                  Overview
                </Button>
                <Button
                  className={`drawer-tab ${
                    drawerTab === "Tasks checklist" ? "active" : ""
                  }`}
                  onClick={() => setDrawerTab("Tasks checklist")}
                >
                  Tasks checklist
                </Button>
                <Button
                  className={`drawer-tab ${
                    drawerTab === "Team members" ? "active" : ""
                  }`}
                  onClick={() => setDrawerTab("Team members")}
                >
                  Team members
                </Button>
              </div>
            )}

            <div className="drawer-content">
              {(isEmployee || drawerTab === "Overview") && (
                <div className="fade-in">
                  <div className="drawer-section-title">
                    <RefreshCw size={14} /> PROGRESS OVERVIEW
                  </div>
                  <div className="prog-circular-wrap">
                    <div className="circle-chart">
                      <span className="circle-val">
                        {selectedProject.progress}%
                      </span>
                      <span className="circle-lbl">DONE</span>
                    </div>
                    <div className="flex-grow-1">
                      <div className="pc-prog-header">
                        <span className="text-slate fw-semibold">
                          Completion Target
                        </span>
                        <span className="fw-bold text-dark">100%</span>
                      </div>
                      <div className="pc-prog-bar-bg my-2">
                        <div
                          className="pc-prog-fill"
                          style={{
                            width: `${selectedProject.progress}%`,
                            background: "#f59e0b",
                          }}
                        ></div>
                      </div>
                      <div className="pc-deadline safe mt-1">
                        <Calendar size={12} /> Timeline: 1 Feb 2025 —{" "}
                        {selectedProject.deadline}
                      </div>
                    </div>
                  </div>

                  <div className="drawer-section-title mt-4">
                    <AlertCircle size={14} /> PROJECT INFORMATION
                  </div>
                  <div className="drawer-info-grid mt-3">
                    <div className="info-lbl">Project ID</div>
                    <div className="info-val">{selectedProject.id}</div>
                    <div className="info-lbl">Department</div>
                    <div className="info-val">{selectedProject.dept}</div>
                    <div className="info-lbl">Priority</div>
                    <div
                      className={`info-val text-${
                        selectedProject.priority === "High"
                          ? "danger"
                          : "warning"
                      }`}
                    >
                      {selectedProject.priority}
                    </div>
                    <div className="info-lbl">Status</div>
                    <div className="info-val">
                      <span
                        className={`pc-status ${selectedProject.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div className="dot"></div> {selectedProject.status}
                      </span>
                    </div>
                  </div>
                  <div
                    className="fw-bold text-dark mb-1"
                    style={{ fontSize: "0.85rem" }}
                  >
                    Description:
                  </div>
                  <p
                    className="text-slate"
                    style={{ fontSize: "0.85rem", lineHeight: 1.5 }}
                  >
                    {selectedProject.desc}
                  </p>

                  <div className="drawer-section-title mt-5">
                    <Users size={14} /> ASSIGNED MANAGER
                  </div>
                  <div className="drawer-manager-card mt-3">
                    <div className="pc-user">
                      <div
                        className="pc-avatar"
                        style={{
                          background: selectedProject.manager.color,
                          width: "40px",
                          height: "40px",
                        }}
                      >
                        {selectedProject.manager.initials}
                      </div>
                      <div className="pc-user-info">
                        <span
                          className="pc-user-name"
                          style={{ fontSize: "0.95rem" }}
                        >
                          {selectedProject.manager.name}
                        </span>
                        <span className="pc-user-role">Engineering Lead</span>
                        <span
                          className="text-blue"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {selectedProject.manager.email ||
                            "manager@company.com"}
                        </span>
                      </div>
                    </div>
                    {!isEmployee && (
                      <Button variant="secondary"
                        className="btn btn-light bg-white border fw-semibold shadow-sm px-3 py-1 d-flex align-items-center gap-2"
                        style={{ fontSize: "0.8rem" }}
                        onClick={() => setIsChangeManagerModalOpen(true)}
                      >
                        <ArrowRightLeft size={12} /> Reassign
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {!isEmployee && drawerTab === "Tasks checklist" && (
                <div className="fade-in">
                  <div className="drawer-section-title">
                    <CheckCircle2 size={14} /> TASKS CHECKLIST
                  </div>
                  <div className="mt-3">
                    {selectedProject.tasks?.map((t, idx) => (
                      <div key={idx} className="drawer-task-item">
                        <div
                          className={`task-checkbox ${
                            t.completed ? "checked" : ""
                          }`}
                        >
                          {t.completed && <Check size={12} strokeWidth={4} />}
                        </div>
                        <div
                          className={`task-title ${
                            t.completed
                              ? "text-decoration-line-through text-slate"
                              : ""
                          }`}
                        >
                          {t.title}
                        </div>
                        <div className="task-assignee bg-light px-2 py-1 rounded">
                          {t.assignee}
                        </div>
                        <Button variant="destructive" className="btn p-0 text-danger opacity-50 hover-opacity-100">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="secondary"
                    className="btn btn-light bg-white border w-100 mt-4 py-2 fw-semibold text-dark shadow-sm d-flex align-items-center justify-content-center gap-2"
                    onClick={() => setIsAssignTaskModalOpen(true)}
                  >
                    <Plus size={16} /> Add New Task
                  </Button>
                </div>
              )}

              {!isEmployee && drawerTab === "Team members" && (
                <div className="fade-in">
                  <div className="drawer-section-title">
                    <Users size={14} /> TEAM ALLOCATION OVERVIEW
                  </div>
                  <div className="mt-3">
                    {selectedProject.team?.map((mbr, idx) => (
                      <div key={idx} className="drawer-team-item">
                        <div className="pc-user">
                          <div
                            className="pc-avatar"
                            style={{
                              background: mbr.color,
                              width: "36px",
                              height: "36px",
                            }}
                          >
                            {mbr.initials}
                          </div>
                          <div className="pc-user-info">
                            <span className="pc-user-name">{mbr.name}</span>
                            <span className="pc-user-role">
                              {mbr.role || "Member"}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                          <div className="text-end">
                            <div className="workload-lbl">WORKLOAD</div>
                            <div
                              className={`workload-badge ${
                                mbr.workload?.toLowerCase() || "medium"
                              }`}
                            >
                              {mbr.workload || "Medium"}
                            </div>
                          </div>
                          <Button variant="icon" className="pc-action-btn">
                            <FilePlus size={14} />
                          </Button>
                          <Button variant="destructive" className="pc-action-btn text-danger">
                            <UserPlus
                              size={14}
                              style={{ transform: "rotate(45deg)" }}
                            />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="secondary"
                    className="btn btn-light bg-white border w-100 mt-4 py-2 fw-semibold text-dark shadow-sm d-flex align-items-center justify-content-center gap-2"
                    onClick={() => setIsAddMemberModalOpen(true)}
                  >
                    <UserPlus size={16} /> Add Team Member
                  </Button>
                </div>
              )}
            </div>

            {isEmployee ? (
              <div
                className="drawer-footer"
                style={{ justifyContent: "flex-end" }}
              >
                <Button variant="secondary"
                  className="btn btn-light bg-white border fw-semibold shadow-sm px-4 py-2 text-dark"
                  style={{ fontSize: "0.9rem" }}
                  onClick={() => setSelectedProject(null)}
                >
                  Close
                </Button>
              </div>
            ) : (
              <div className="drawer-footer">
                <Button variant="secondary"
                  className="btn btn-light bg-white border fw-semibold shadow-sm px-3 d-flex align-items-center gap-2 text-dark"
                  onClick={() => setIsAddMemberModalOpen(true)}
                >
                  <UserPlus size={14} /> Add Members
                </Button>
                <Button variant="secondary"
                  className="btn btn-light bg-white border fw-semibold shadow-sm px-3 d-flex align-items-center gap-2 text-dark"
                  onClick={() => setIsChangeManagerModalOpen(true)}
                >
                  <ArrowRightLeft size={14} /> Change Manager
                </Button>
                <Button
                  className="btn btn-primary bg-blue border-0 fw-semibold shadow-sm px-4 d-flex align-items-center gap-2 text-white"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <Edit2 size={14} /> Edit Project
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {isCreateModalOpen && (
        <div className="proj-modal-overlay">
          <div className="proj-modal-content large fade-in">
            <div className="pm-header">
              <div className="pm-title">
                <Plus size={18} className="text-blue" />{" "}
                {selectedProject ? "Edit Project" : "Create new project"}
              </div>
              <Button variant="icon"
                className="drawer-close position-static m-0"
                onClick={() => setIsCreateModalOpen(false)}
              >
                <X size={16} />
              </Button>
            </div>
            <div className="pm-body">
              <div className="pm-group">
                <label className="pm-label">Project name *</label>
                <input
                  type="text"
                  className="pm-input"
                  placeholder="Enter project name"
                  defaultValue={selectedProject ? selectedProject.title : ""}
                />
              </div>
              <div className="pm-group">
                <label className="pm-label">Description</label>
                <textarea
                  className="pm-textarea"
                  placeholder="Brief project description..."
                  defaultValue={selectedProject ? selectedProject.desc : ""}
                ></textarea>
              </div>
              <div className="pm-row">
                <div className="pm-group">
                  <label className="pm-label">Manager</label>
                  <select className="pm-select">
                    <option>Auto — current user</option>
                  </select>
                </div>
                <div className="pm-group">
                  <label className="pm-label">Department</label>
                  <select className="pm-select">
                    <option>Engineering</option>
                  </select>
                </div>
              </div>
              <div className="pm-row">
                <div className="pm-group">
                  <label className="pm-label">Status</label>
                  <select className="pm-select">
                    <option>Planning</option>
                  </select>
                </div>
                <div className="pm-group">
                  <label className="pm-label">Priority</label>
                  <select className="pm-select">
                    <option>High</option>
                  </select>
                </div>
              </div>
              <div className="pm-row">
                <div className="pm-group">
                  <label className="pm-label">Start date *</label>
                  <input
                    type="text"
                    className="pm-input"
                    placeholder="dd - mm - yyyy"
                  />
                </div>
                <div className="pm-group">
                  <label className="pm-label">Deadline *</label>
                  <input
                    type="text"
                    className="pm-input"
                    placeholder="dd - mm - yyyy"
                  />
                </div>
              </div>
              <div className="pm-group">
                <label className="pm-label">Assign team members</label>
                <input
                  type="text"
                  className="pm-input mb-3"
                  placeholder="Search people..."
                />

                <div className="pm-assigned-member border-bottom">
                  <div className="pc-user">
                    <div className="pc-avatar bg-purple">S</div>
                    <div className="pc-user-info">
                      <span className="pc-user-name">Sun</span>
                      <span className="pc-user-role">Frontend Engineer</span>
                    </div>
                  </div>
                  <Button variant="icon" className="btn btn-light bg-white border p-1 text-slate">
                    <Plus size={14} />
                  </Button>
                </div>
                <div className="pm-assigned-member border-bottom">
                  <div className="pc-user">
                    <div className="pc-avatar bg-indigo">M</div>
                    <div className="pc-user-info">
                      <span className="pc-user-name">Moon</span>
                      <span className="pc-user-role">Frontend Engineer</span>
                    </div>
                  </div>
                  <Button variant="icon" className="btn btn-light bg-white border p-1 text-slate">
                    <Plus size={14} />
                  </Button>
                </div>
                <div className="pm-assigned-member">
                  <div className="pc-user">
                    <div className="pc-avatar bg-indigo">M</div>
                    <div className="pc-user-info">
                      <span className="pc-user-name">Meteor</span>
                      <span className="pc-user-role">Frontend Engineer</span>
                    </div>
                  </div>
                  <Button variant="icon" className="btn btn-light bg-white border p-1 text-slate">
                    <Plus size={14} />
                  </Button>
                </div>
                <div className="text-slate" style={{ fontSize: "0.7rem" }}>
                  Hold Ctrl/Cmd to select multiple members
                </div>
              </div>
              <div className="pm-group mt-4">
                <label className="pm-label">
                  Project documentation (optional)
                </label>
                <div className="pm-dropzone">
                  <div className="pm-dz-icon">
                    <UploadCloud size={24} />
                  </div>
                  <div className="fw-bold text-dark mb-1">
                    Drop file here or click to browse
                  </div>
                  <div className="text-slate" style={{ fontSize: "0.8rem" }}>
                    PDF, JPG or PNG - Max 10MB
                  </div>
                </div>
              </div>
            </div>
            <div className="pm-footer">
              <Button
                className="btn fw-semibold text-white"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button className="btn btn-primary bg-blue border-0 px-4 fw-semibold shadow-sm">
                <Check size={16} className="me-2" /> Create project
              </Button>
            </div>
          </div>
        </div>
      )}

      {isAddMemberModalOpen && (
        <div className="proj-modal-overlay">
          <div className="proj-modal-content fade-in">
            <div className="pm-header">
              <div className="pm-title">Add Team Member</div>
              <Button variant="icon"
                className="drawer-close position-static m-0"
                onClick={() => setIsAddMemberModalOpen(false)}
              >
                <X size={16} />
              </Button>
            </div>
            <div className="pm-body">
              <div className="pm-group">
                <label
                  className="pm-label text-slate"
                  style={{ textTransform: "uppercase" }}
                >
                  SELECT TEAM MEMBER *
                </label>
                <input
                  type="text"
                  className="pm-input"
                  placeholder="Rahul Das — Frontend Dev"
                />
              </div>
              <div className="pm-group">
                <label
                  className="pm-label text-slate"
                  style={{ textTransform: "uppercase" }}
                >
                  WORKLOAD ALLOCATION
                </label>
                <input type="text" className="pm-input" placeholder="Medium" />
              </div>
            </div>
            <div className="pm-footer">
              <Button
                className="btn fw-semibold text-white"
                onClick={() => setIsAddMemberModalOpen(false)}
              >
                Cancel
              </Button>
              <Button className="btn btn-primary bg-blue border-0 px-4 fw-semibold shadow-sm">
                <Plus size={16} className="me-2" /> Add to Project
              </Button>
            </div>
          </div>
        </div>
      )}

      {isChangeManagerModalOpen && (
        <div className="proj-modal-overlay">
          <div className="proj-modal-content fade-in">
            <div className="pm-header">
              <div className="pm-title">Add New Manager</div>
              <Button variant="icon"
                className="drawer-close position-static m-0"
                onClick={() => setIsChangeManagerModalOpen(false)}
              >
                <X size={16} />
              </Button>
            </div>
            <div className="pm-body">
              <div className="pm-group">
                <label
                  className="pm-label text-slate"
                  style={{ textTransform: "uppercase" }}
                >
                  SELECT NEW MANAGER *
                </label>
                <input
                  type="text"
                  className="pm-input"
                  placeholder="Vasu — Backend Dev"
                />
              </div>
              <div className="pm-group">
                <label
                  className="pm-label text-slate"
                  style={{ textTransform: "uppercase" }}
                >
                  PREVIOUS MANAGER
                </label>
                <input
                  type="text"
                  className="pm-input"
                  placeholder="Rahul Das — Frontend Dev"
                />
              </div>
            </div>
            <div className="pm-footer">
              <Button
                className="btn fw-semibold text-white"
                onClick={() => setIsChangeManagerModalOpen(false)}
              >
                Cancel
              </Button>
              <Button className="btn btn-primary bg-blue border-0 px-4 fw-semibold shadow-sm">
                Change Manager
              </Button>
            </div>
          </div>
        </div>
      )}

      {isAssignTaskModalOpen && (
        <div className="proj-modal-overlay">
          <div className="proj-modal-content large fade-in">
            <div className="pm-header">
              <div className="pm-title">
                <Plus size={18} className="text-blue" /> Assign New Task
              </div>
              <Button variant="icon"
                className="drawer-close position-static m-0"
                onClick={() => setIsAssignTaskModalOpen(false)}
              >
                <X size={16} />
              </Button>
            </div>
            <div className="pm-body">
              <div className="pm-group">
                <div
                  className="text-slate fw-bold mb-3"
                  style={{ fontSize: "0.7rem", letterSpacing: "1px" }}
                >
                  TASK DETAILS
                </div>
                <label className="pm-label">
                  Task Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="pm-input"
                  placeholder="Enter task title..."
                />
              </div>

              <div
                className="text-slate fw-bold mb-3 mt-4"
                style={{ fontSize: "0.7rem", letterSpacing: "1px" }}
              >
                STATUS & ASSIGNMENT
              </div>
              <div className="pm-row">
                <div className="pm-group">
                  <label className="pm-label">Status</label>
                  <select className="pm-select">
                    <option>Select Status...</option>
                  </select>
                </div>
                <div className="pm-group">
                  <label className="pm-label">Priority</label>
                  <div
                    className="d-flex w-100 border rounded"
                    style={{ borderColor: "#e2e8f0", overflow: "hidden" }}
                  >
                    <Button variant="secondary" className="btn flex-grow-1 border-0 rounded-0 bg-white text-slate fw-semibold py-2">
                      Low
                    </Button>
                    <Button variant="secondary" className="btn flex-grow-1 border-0 border-start border-end rounded-0 bg-white text-slate fw-semibold py-2">
                      High
                    </Button>
                    <Button variant="secondary" className="btn flex-grow-1 border-0 rounded-0 bg-white text-slate fw-semibold py-2">
                      Medium
                    </Button>
                  </div>
                </div>
              </div>
              <div className="pm-row">
                <div className="pm-group">
                  <label className="pm-label">Assigned To</label>
                  <input
                    type="text"
                    className="pm-input"
                    placeholder="Select assignee..."
                  />
                </div>
                <div className="pm-group">
                  <label className="pm-label">Category</label>
                  <select className="pm-select">
                    <option>Select Category...</option>
                  </select>
                </div>
              </div>

              <div
                className="text-slate fw-bold mb-3 mt-4"
                style={{ fontSize: "0.7rem", letterSpacing: "1px" }}
              >
                TIMELINE
              </div>
              <div className="pm-row">
                <div className="pm-group position-relative">
                  <label className="pm-label">Due Date</label>
                  <input
                    type="text"
                    className="pm-input"
                    placeholder="dd - mm - yyyy"
                  />
                  <Calendar
                    size={14}
                    className="text-slate position-absolute"
                    style={{
                      right: "12px",
                      top: "35px",
                      pointerEvents: "none",
                    }}
                  />
                </div>
                <div className="pm-group">
                  <label className="pm-label">Estimated Hours</label>
                  <input
                    type="text"
                    className="pm-input"
                    placeholder="e.g. 8"
                  />
                </div>
              </div>

              <div
                className="text-slate fw-bold mb-3 mt-4"
                style={{ fontSize: "0.7rem", letterSpacing: "1px" }}
              >
                DESCRIPTION
              </div>
              <div className="pm-group">
                <label className="pm-label">Task Description</label>
                <textarea
                  className="pm-textarea"
                  placeholder="Describe the task in detail..."
                ></textarea>
              </div>
            </div>
            <div className="pm-footer">
              <Button
                className="btn fw-semibold text-white"
                onClick={() => setIsAssignTaskModalOpen(false)}
              >
                Cancel
              </Button>
              <Button className="btn btn-primary bg-blue border-0 px-4 fw-semibold shadow-sm">
                <Check size={16} className="me-2" /> Add Task
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
