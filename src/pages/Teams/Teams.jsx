import { useState, useEffect } from "react";
import Breadcrumb from "../../components/dashboard/Breadcrumb";
import {
  Info,
  User,
  CalendarDays,
  Eye,
  Users,
  Building,
  MoreHorizontal,
  Edit,
  Plus,
  Trash2,
  Eye as EyeIcon,
  Search,
  LayoutGrid,
  LayoutList,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import "./Teams.css";
import "../AdminTeams/AdminTeams.css";
import Button from "../../components/common/Button";
import { teamsData as initialTeamsData } from "../../data/teamsData";
import { employeeService, withFallback } from "../../services";

const Teams = ({ role = "employee" }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const [activeTab, setActiveTab] = useState("Overview");
  const [memberView, setMemberView] = useState("table");
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeamsData = async () => {
      try {
        const apiTeams = await employeeService.getTeams();
        const rawList = Array.isArray(apiTeams)
          ? apiTeams
          : Array.isArray(apiTeams?.data?.results)
          ? apiTeams.data.results
          : Array.isArray(apiTeams?.results)
          ? apiTeams.results
          : Array.isArray(apiTeams?.data)
          ? apiTeams.data
          : [];

        const mappedTeams = rawList.map((t) => {
          const tName = t.name || t.title || 'Team';
          const deptName = t.department_detail?.name || (typeof t.department === 'string' ? t.department : 'Engineering');
          const leadName = t.lead_detail ? `${t.lead_detail.first_name || ''} ${t.lead_detail.last_name || ''}`.trim() : (typeof t.lead === 'string' ? t.lead : 'Vijay Gopi');
          const initials = tName.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2) || 'TM';
          return {
            ...t,
            id: t.id,
            title: tName,
            name: tName,
            department: deptName,
            lead: leadName || 'Vijay Gopi',
            members: t.member_count || t.members || 0,
            isLead: true,
            initials: initials,
            color: 'blue',
            bg: 'bg-blue-light',
            text: 'text-blue',
          };
        });

        setTeams(mappedTeams);
      } catch (err) {
        setTeams([]);
      }
    };
    fetchTeamsData();
  }, []);

  const teamsData = teams;
  const leadTeams = teamsData.filter((t) => t.isLead);
  const memberTeams = teamsData.filter((t) => !t.isLead);
  const totalMembersCount = teamsData.reduce((acc, t) => acc + (t.members || 0), 0);

  return (
    <>
      <div
        className="dashboard-container teams-container"
        style={{ maxWidth: "1400px" }}
      >

        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <Breadcrumb
              items={
                selectedTeam
                  ? ["Teams", selectedTeam.title]
                  : ["Teams", "Overview"]
              }
            />
            {!selectedTeam && (
              <>
                <div className="d-flex align-items-center gap-3">
                  <h1 className="page-title m-0">My Teams</h1>
                </div>
                <p className="page-subtitle mt-1 mb-0 text-slate">
                  Teams you are assigned to as a member or lead.
                </p>
              </>
            )}
          </div>
          {!selectedTeam && (
            <div className="viewing-as text-slate font-medium">
              Viewing as:{" "}
              <span className="text-dark font-bold">Shiva (Manager)</span>
            </div>
          )}
        </div>

        {!selectedTeam && (
          <div className="teams-info-banner bg-blue-light border-blue text-blue mb-4">
            <Info size={16} className="me-2 flex-shrink-0 mt-1" />
            <span>
              <strong>Showing only teams you belong to.</strong> Contact HR or
              Admin to join additional teams.
            </span>
          </div>
        )}

        {!selectedTeam ? (

          <>

            {role === "manager" && (
              <div className="row g-4 mb-5">
                <div className="col-12 col-md-4">
                  <div className="mgr-stat-card">
                    <div className="mgr-stat-icon bg-green-light text-green">
                      <Users size={16} />
                    </div>
                    <div className="mgr-stat-label">TEAMS I LEAD</div>
                    <div className="mgr-stat-value">{leadTeams.length}</div>
                    <div className="mgr-stat-desc">As assigned lead</div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="mgr-stat-card">
                    <div className="mgr-stat-icon bg-blue-light text-blue">
                      <User size={16} />
                    </div>
                    <div className="mgr-stat-label">TOTAL MEMBERS</div>
                    <div className="mgr-stat-value">{totalMembersCount}</div>
                    <div className="mgr-stat-desc">Under my teams</div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="mgr-stat-card">
                    <div className="mgr-stat-icon bg-yellow-light text-yellow">
                      <Users size={16} />
                    </div>
                    <div className="mgr-stat-label">ALSO MEMBER OF</div>
                    <div className="mgr-stat-value">{teamsData.length}</div>
                    <div className="mgr-stat-desc">Other teams</div>
                  </div>
                </div>
              </div>
            )}

            {role === "manager" ? (

              <>
                <h6
                  className="section-title mb-3"
                  style={{
                    fontSize: "0.85rem",
                    color: "#64748b",
                    letterSpacing: "0.5px",
                  }}
                >
                  TEAMS I LEAD
                </h6>
                <div className="row g-4 mb-5">
                  {leadTeams.map((team) => (
                    <div
                      key={team.id}
                      className="col-12 col-md-6 col-lg-5 col-xl-4"
                    >
                      <div className="team-card pb-3">
                        <Button
                          variant="icon"
                          className="ellipsis-btn"
                          onClick={() => setShowDropdown(!showDropdown)}
                        >
                          <MoreHorizontal size={16} />
                        </Button>
                        {showDropdown && (
                          <div className="dropdown-menu-custom">
                            <div
                              className="dropdown-item-custom"
                              onClick={() => {
                                setSelectedTeam(team);
                                setShowDropdown(false);
                              }}
                            >
                              <EyeIcon size={14} /> View Details
                            </div>
                            <div
                              className="dropdown-item-custom"
                              onClick={() => setShowDropdown(false)}
                            >
                              <Edit size={14} /> Edit Team
                            </div>
                            <div
                              className="dropdown-item-custom"
                              onClick={() => setShowAddMemberModal(true)}
                            >
                              <Plus size={14} /> Add Member
                            </div>
                            <div className="dropdown-item-custom disabled">
                              <Trash2 size={14} /> Delete{" "}
                              <span className="admin-only-badge">
                                Admin only
                              </span>
                            </div>
                          </div>
                        )}

                        <div
                          className={`team-avatar bg-${team.color}-light text-${team.color} mb-3`}
                        >
                          {team.initials}
                        </div>

                        <h4 className="team-title">{team.title}</h4>
                        <p
                          className="team-department text-slate mb-4"
                          style={{ fontSize: "0.8rem" }}
                        >
                          {team.department}
                        </p>

                        <div className="d-flex gap-4 text-slate small mb-4">
                          <span className="d-flex align-items-center">
                            <User size={14} className="me-1 text-muted" />{" "}
                            {team.members} members
                          </span>
                          <span className="d-flex align-items-center">
                            <User size={14} className="me-1 text-muted" />{" "}
                            {team.lead}
                          </span>
                        </div>

                        <div className="d-flex gap-2 mt-auto pt-2">
                          <Button
                            variant="outline"
                            className="btn btn-outline-secondary flex-grow-1 fw-semibold d-flex justify-content-center align-items-center bg-white"
                            style={{ fontSize: "0.85rem" }}
                            onClick={() => setShowAddMemberModal(true)}
                          >
                            <Plus size={14} className="me-1" /> Add Member
                          </Button>
                          <Button
                            variant="outline"
                            className="btn btn-outline-primary flex-grow-1 fw-semibold bg-blue-light border-blue text-blue d-flex justify-content-center align-items-center"
                            style={{ fontSize: "0.85rem" }}
                            onClick={() => setSelectedTeam(team)}
                          >
                            <Eye size={14} className="me-1" /> View Team
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <h6
                  className="section-title mb-3"
                  style={{
                    fontSize: "0.85rem",
                    color: "#64748b",
                    letterSpacing: "0.5px",
                  }}
                >
                  TEAMS I'M A MEMBER OF
                </h6>
                <div className="row g-4">
                  {memberTeams.map((team) => (
                    <div
                      key={team.id}
                      className="col-12 col-md-6 col-lg-5 col-xl-4"
                    >
                      <div className="team-card pb-3">
                        <div
                          className={`team-avatar bg-${team.color}-light text-${team.color} mb-3`}
                        >
                          {team.initials}
                        </div>

                        <h4 className="team-title">{team.title}</h4>
                        <p
                          className="team-department text-slate mb-4"
                          style={{ fontSize: "0.8rem" }}
                        >
                          {team.department}
                        </p>

                        <div className="team-meta text-slate mb-4">
                          <div className="meta-item">
                            <User size={14} className="me-2 text-muted" />
                            <span>
                              Lead:{" "}
                              <strong className="text-dark">{team.lead}</strong>
                            </span>
                          </div>
                          <div className="meta-item">
                            <Users size={14} className="me-2 text-muted" />
                            <span>
                              <strong className="text-dark">
                                {team.members} members
                              </strong>
                            </span>
                          </div>
                          <div className="meta-item mt-2 pt-2 border-top">
                            <div
                              className="status-dot border border-slate me-2"
                              style={{
                                background: "transparent",
                                width: "8px",
                                height: "8px",
                              }}
                            ></div>
                            <span>
                              Your role:{" "}
                              <strong className="text-dark">{team.role}</strong>
                            </span>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="btn btn-outline-primary w-100 mt-auto fw-semibold bg-blue-light border-blue text-blue d-flex justify-content-center align-items-center"
                          style={{ fontSize: "0.85rem" }}
                          onClick={() => setSelectedTeam(team)}
                        >
                          <Eye size={14} className="me-1" /> View Team
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (

              <div className="row g-4">
                {teamsData.map((team) => (
                  <div
                    key={team.id}
                    className="col-12 col-md-6 col-lg-5 col-xl-4"
                  >
                    <div className="team-card">
                      <div className="team-card-header mb-3">
                        <div
                          className={`team-avatar bg-${team.color}-light text-${team.color}`}
                        >
                          {team.initials}
                        </div>
                        <div className="team-role-pill bg-slate-light text-slate">
                          {team.role}
                        </div>
                      </div>

                      <h4 className="team-title">{team.title}</h4>
                      <p className="team-department text-slate mb-4">
                        {team.department}
                      </p>

                      <div className="team-meta text-slate mb-4">
                        <div className="meta-item">
                          <User size={14} className="me-2 text-muted" />
                          <span>
                            Lead:{" "}
                            <strong className="text-dark">{team.lead}</strong>
                          </span>
                        </div>
                        <div className="meta-item">
                          <Users size={14} className="me-2 text-muted" />
                          <span>
                            <strong className="text-dark">
                              {team.members}
                            </strong>{" "}
                            members
                          </span>
                        </div>
                        <div className="meta-item">
                          <CalendarDays size={14} className="me-2 text-muted" />
                          <span>
                            Joined:{" "}
                            <strong className="text-dark">{team.joined}</strong>
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="btn btn-outline-primary w-100 d-flex justify-content-center align-items-center gap-2 bg-blue-light border-blue text-blue fw-semibold"
                        onClick={() => setSelectedTeam(team)}
                      >
                        <Eye size={16} /> View Team
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : 
        role === "manager" ? (

          <>

            <div className="team-header-card mt-3">
              <div className="team-header-info">
                <div
                  className={`team-header-avatar bg-${selectedTeam.color}-light text-${selectedTeam.color}`}
                >
                  {selectedTeam.initials}
                </div>
                <div>
                  <h2 className="team-header-title">{selectedTeam.title}</h2>
                  <div className="d-flex gap-2 mb-3">
                    <span className="badge active">
                      <div className="status-dot active"></div> Active
                    </span>
                  </div>
                  <div className="header-meta">
                    <span className="header-meta-item">
                      <Building size={16} /> Department:{" "}
                      <strong className="text-dark">
                        {selectedTeam.department}
                      </strong>
                    </span>
                    <span className="header-meta-item">
                      <User size={16} /> Lead:{" "}
                      <strong className="text-dark">{selectedTeam.lead}</strong>
                    </span>
                    <span className="header-meta-item">
                      <Users size={16} /> Members:{" "}
                      <strong className="text-dark">
                        {selectedTeam.members}
                      </strong>
                    </span>
                    <span className="header-meta-item">
                      <CalendarDays size={16} /> Created:{" "}
                      <strong className="text-dark">Jan 12, 2024</strong>
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2">
                <Button
                  variant="outline"
                  className="btn btn-outline-secondary bg-white border d-flex align-items-center fw-semibold text-dark"
                >
                  <Edit size={16} className="me-2 text-muted" /> Edit Team
                </Button>
                <Button
                  className="btn btn-primary bg-blue border-0 d-flex align-items-center fw-semibold text-white"
                  onClick={() => setShowAddMemberModal(true)}
                >
                  <Plus size={16} className="me-2" /> Add Member
                </Button>
              </div>
            </div>

            <div className="custom-tabs">
              {["Overview", "Members", "Analytics", "Settings"].map((tab) => (
                <Button
                  key={tab}
                  className={`custom-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </Button>
              ))}
            </div>

            <div className="tab-content">

              {activeTab === "Overview" && (
                <div className="row g-4">
                  <div className="col-12 col-md-6">
                    <div className="chart-card">
                      <h3 className="chart-title">Team Composition</h3>
                      <p className="chart-subtitle">
                        Role breakdown · 12 members
                      </p>

                      <div className="progress-bar-group">
                        <div className="progress-header">
                          <span>Engineers</span>
                          <strong>8</strong>
                        </div>
                        <div className="progress-track">
                          <div
                            className="progress-fill bg-blue"
                            style={{ width: "66%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="progress-bar-group">
                        <div className="progress-header">
                          <span>Team Leads</span>
                          <strong>2</strong>
                        </div>
                        <div className="progress-track">
                          <div
                            className="progress-fill bg-green"
                            style={{ width: "16%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="progress-bar-group mb-0">
                        <div className="progress-header">
                          <span>Interns</span>
                          <strong>2</strong>
                        </div>
                        <div className="progress-track">
                          <div
                            className="progress-fill bg-orange"
                            style={{ width: "16%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="chart-card">
                      <h3 className="chart-title">Team Info</h3>
                      <div
                        className="mt-4 text-slate"
                        style={{
                          fontSize: "0.9rem",
                          lineHeight: "1.6",
                          paddingBottom: "32px",
                          borderBottom: "1px solid #e2e8f0",
                        }}
                      >
                        {selectedTeam.description}
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-3 py-2 border-bottom">
                        <span className="text-slate small">Status</span>
                        <span className="badge active">
                          <div className="status-dot active"></div> Active
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                        <span className="text-slate small">Department</span>
                        <span className="font-semibold text-dark small">
                          {selectedTeam.department}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center py-3">
                        <span className="text-slate small">Created</span>
                        <span className="font-semibold text-dark small">
                          Jan 12, 2024
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Members" && (
                <div className="members-table-card">
                  <div className="table-toolbar">
                    <div className="d-flex gap-3">
                      <div className="search-box">
                        <Search size={16} className="icon" />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search members..."
                          style={{ minWidth: "250px" }}
                        />
                      </div>
                      <select className="filter-select bg-white">
                        <option>All Roles</option>
                        <option>Engineer</option>
                        <option>Team Lead</option>
                        <option>Intern</option>
                      </select>
                    </div>
                    <div className="d-flex gap-3 align-items-center">
                      <div className="view-toggle">
                        <Button
                          variant="icon"
                          className={`view-toggle-btn ${
                            memberView === "grid" ? "active" : ""
                          }`}
                          onClick={() => setMemberView("grid")}
                        >
                          <LayoutGrid size={16} />
                        </Button>
                        <Button
                          variant="icon"
                          className={`view-toggle-btn ${
                            memberView === "table" ? "active" : ""
                          }`}
                          onClick={() => setMemberView("table")}
                        >
                          <LayoutList size={16} />
                        </Button>
                      </div>
                      <Button
                        className="btn btn-primary bg-blue border-0 py-2 d-flex align-items-center fw-semibold text-sm text-white"
                        onClick={() => setShowAddMemberModal(true)}
                      >
                        <Plus size={16} className="me-2" /> Add Member
                      </Button>
                    </div>
                  </div>

                  {memberView === "table" ? (
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>MEMBER</th>
                          <th>ROLE</th>
                          <th>DEPARTMENT</th>
                          <th>EMAIL</th>
                          <th>STATUS</th>
                          <th>ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedTeam.memberList.map((member) => (
                          <tr key={member.id}>
                            <td>
                              <div className="member-cell">
                                <div
                                  className={`member-avatar ${member.bg} ${member.text}`}
                                >
                                  {member.initials}
                                </div>
                                <div>
                                  <div className="fw-bold text-dark">
                                    {member.name}
                                  </div>
                                  <div
                                    className="text-slate"
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    {member.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="text-dark">{member.role}</td>
                            <td className="text-dark">{member.department}</td>
                            <td className="text-slate">{member.email}</td>
                            <td>
                              {member.status === "Lead" && (
                                <span
                                  className="badge bg-blue-light text-blue rounded-pill px-3 py-1 fw-bold"
                                  style={{ fontSize: "0.7rem" }}
                                >
                                  Lead
                                </span>
                              )}
                              {member.status === "Active" && (
                                <span
                                  className="badge active rounded-pill px-3 py-1 fw-bold"
                                  style={{ fontSize: "0.7rem" }}
                                >
                                  Active
                                </span>
                              )}
                              {member.status === "Intern" && (
                                <span
                                  className="badge bg-yellow-light text-yellow rounded-pill px-3 py-1 fw-bold"
                                  style={{ fontSize: "0.7rem" }}
                                >
                                  Intern
                                </span>
                              )}
                            </td>
                            <td>
                              <div className="table-actions">
                                <Button
                                  variant="secondary"
                                  className="btn btn-sm btn-light border bg-white text-blue fw-semibold"
                                >
                                  View
                                </Button>
                                <Button
                                  variant="outline-destructive"
                                  className="btn btn-sm btn-light border bg-white text-red fw-semibold"
                                >
                                  Remove
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-4 row g-4 bg-slate-light">
                      {selectedTeam.memberList.map((member) => (
                        <div key={member.id} className="col-12 col-md-4">
                          <div className="member-grid-card">
                            <div
                              className={`member-grid-avatar ${member.bg} ${member.text}`}
                            >
                              {member.initials}
                            </div>
                            <h4 className="member-grid-name">{member.name}</h4>
                            <div className="member-grid-role">
                              {member.role}
                            </div>
                            <div className="member-grid-email">
                              {member.email}
                            </div>

                            {member.status === "Lead" && (
                              <span className="badge bg-blue-light text-blue rounded-pill px-4 py-1 mb-4 fw-bold">
                                Lead
                              </span>
                            )}
                            {member.status === "Active" && (
                              <span className="badge active rounded-pill px-4 py-1 mb-4 fw-bold">
                                Active
                              </span>
                            )}
                            {member.status === "Intern" && (
                              <span className="badge bg-yellow-light text-yellow rounded-pill px-4 py-1 mb-4 fw-bold">
                                Intern
                              </span>
                            )}

                            <div className="d-flex gap-2 mt-auto w-100 justify-content-center">
                              <Button
                                variant="secondary"
                                className="btn btn-sm btn-light border bg-white text-blue fw-semibold"
                              >
                                View Profile
                              </Button>
                              <Button
                                variant="outline-destructive"
                                className="btn btn-sm btn-light border bg-white text-red fw-semibold"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="p-3 border-top text-slate small d-flex justify-content-between align-items-center">
                    <span>{selectedTeam.members} members</span>
                    <div className="d-flex gap-2">
                      <Button
                        variant="icon"
                        className="btn btn-sm btn-light border p-1"
                      >
                        <ChevronLeft size={16} />
                      </Button>
                      <Button className="btn btn-sm btn-primary bg-blue border-0 px-3 text-white">
                        1
                      </Button>
                      <Button
                        variant="icon"
                        className="btn btn-sm btn-light border p-1"
                      >
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Analytics" && (
                <div className="p-5 text-center text-slate">
                  <p>Analytics Dashboard</p>
                </div>
              )}

              {activeTab === "Settings" && (
                <div className="p-5 text-center text-slate">
                  <p>Team Settings</p>
                </div>
              )}
            </div>
          </>
        ) : (

          <div className="team-detail-view">
            <div className="team-detail-card">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className={`team-avatar-lg bg-${selectedTeam.color}-light text-${selectedTeam.color}`}
                  >
                    {selectedTeam.initials}
                  </div>
                  <div>
                    <h2 className="team-detail-title">{selectedTeam.title}</h2>
                    <div className="team-detail-meta">
                      <div className="meta-item text-slate">
                        <User size={14} className="me-1" /> Lead:{" "}
                        <strong>{selectedTeam.lead}</strong>
                      </div>
                      <div className="meta-item text-slate">
                        <Users size={14} className="me-1" />{" "}
                        {selectedTeam.members} members
                      </div>
                      <div className="meta-item text-slate">
                        <Building size={14} className="me-1" />{" "}
                        {selectedTeam.department} Department
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <span className="badge-pill bg-green-light text-green border border-success-subtle">
                    <div className="status-dot active"></div> Active
                  </span>
                  <span className="badge-pill bg-blue-light text-blue border border-primary-subtle">
                    {selectedTeam.department}
                  </span>
                  <span className="badge-pill bg-purple-light text-purple border border-primary-subtle">
                    Your role: {selectedTeam.role}
                  </span>
                </div>
              </div>

              <p
                className="text-slate mb-0"
                style={{
                  fontSize: "0.9rem",
                  lineHeight: "1.6",
                  maxWidth: "80%",
                }}
              >
                {selectedTeam.description}
              </p>

              <div className="metric-boxes">
                {selectedTeam.metrics.map((metric, idx) => (
                  <div key={idx} className="metric-box">
                    <div className="metric-value">{metric.value}</div>
                    <div className="metric-label">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="row g-4">
              <div className="col-12 col-xl-12">
                <div className="section-header">
                  <h3 className="section-title">Team Members</h3>
                  <p className="section-subtitle">
                    Directory view — contact your team
                  </p>
                </div>

                <div className="row g-3">
                  {selectedTeam.memberList.map((member) => (
                    <div key={member.id} className="col-12 col-md-6">
                      <div className="member-card shadow-sm">
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className={`team-avatar-sm ${member.bg} ${member.text}`}
                          >
                            {member.initials}
                          </div>
                          <div className="member-info">
                            <h6>{member.name}</h6>
                            <p>{member.role}</p>
                            <p className="email">{member.email}</p>
                          </div>
                        </div>
                        <span
                          className={`badge-pill ${member.badgeBg} ${member.badgeText} px-3 py-1`}
                          style={{ fontSize: "0.7rem" }}
                        >
                          {member.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-12">
                <div className="section-header mt-4">
                  <h3 className="section-title">Recent Activity</h3>
                  <p className="section-subtitle">Last 30 days</p>
                </div>

                <div className="activity-card shadow-sm">
                  <div className="activity-list">
                    {selectedTeam.activities.map((activity) => (
                      <div key={activity.id} className="activity-item">
                        <div className="activity-avatar border shadow-sm bg-light text-muted">
                          {activity.initials}
                        </div>
                        <div className="activity-content mt-1">
                          <p>{activity.text}</p>
                          <span className="time">{activity.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showAddMemberModal && (
        <div className="modal-overlay">
          <div className="modal-content-box p-4" style={{ maxWidth: "480px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="fw-bold m-0">Add Members</h4>
                <p className="text-slate small m-0 mt-1">
                  Search and select employees to add to this team
                </p>
              </div>
              <Button
                variant="secondary"
                className="btn btn-light border-0 rounded-circle p-2"
                onClick={() => setShowAddMemberModal(false)}
              >
                <X size={20} />
              </Button>
            </div>

            <label className="form-label">SEARCH EMPLOYEES</label>
            <div className="search-box w-100 mb-3">
              <Search size={16} className="icon" />
              <input
                type="text"
                className="settings-input bg-white m-0"
                placeholder="Type name or email..."
              />
            </div>

            <div className="add-member-list">
              <div className="add-member-item">
                <div className="d-flex gap-3 align-items-center">
                  <div className="member-avatar bg-yellow-light text-yellow">
                    SR
                  </div>
                  <div>
                    <div
                      className="fw-bold text-dark"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Sunita Rao
                    </div>
                    <div className="text-slate" style={{ fontSize: "0.75rem" }}>
                      Legal
                    </div>
                  </div>
                </div>
                <Button
                  variant="icon"
                  className="btn btn-light border-0 text-muted"
                >
                  <Plus size={18} />
                </Button>
              </div>
              <div className="add-member-item">
                <div className="d-flex gap-3 align-items-center">
                  <div className="member-avatar bg-blue-light text-blue">
                    RV
                  </div>
                  <div>
                    <div
                      className="fw-bold text-dark"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Rohit Verma
                    </div>
                    <div className="text-slate" style={{ fontSize: "0.75rem" }}>
                      DevOps
                    </div>
                  </div>
                </div>
                <Button
                  variant="icon"
                  className="btn btn-light border-0 text-muted"
                >
                  <Plus size={18} />
                </Button>
              </div>
              <div className="add-member-item">
                <div className="d-flex gap-3 align-items-center">
                  <div className="member-avatar bg-purple-light text-purple">
                    AT
                  </div>
                  <div>
                    <div
                      className="fw-bold text-dark"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Arjun Tiwari
                    </div>
                    <div className="text-slate" style={{ fontSize: "0.75rem" }}>
                      Engineering
                    </div>
                  </div>
                </div>
                <Button
                  variant="icon"
                  className="btn btn-light border-0 text-muted"
                >
                  <Plus size={18} />
                </Button>
              </div>
            </div>

            <label className="form-label mb-2">SELECTED (2)</label>
            <div className="selected-tags mb-4">
              <div className="selected-tag">
                Kavya Nair <X size={12} className="cursor-pointer" />
              </div>
              <div className="selected-tag">
                Meera Joshi <X size={12} className="cursor-pointer" />
              </div>
            </div>

            <div className="d-flex justify-content-end gap-3 pt-2">
              <Button
                variant="secondary"
                className="btn btn-light bg-white border fw-semibold px-4 text-dark"
                onClick={() => setShowAddMemberModal(false)}
              >
                Cancel
              </Button>
              <Button className="btn btn-primary bg-blue border-0 fw-semibold px-4 d-flex align-items-center text-white">
                <User size={18} className="me-2" /> Add Members
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Teams;
