import { useState } from 'react';
import {
  Users,
  Building,
  Activity,
  LayoutGrid,
  Search,
  MoreHorizontal,
  Plus,
  Edit,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
  LayoutList,
  X,
  AlertCircle,
  ArrowUp,
  Archive,
} from 'lucide-react';
import Breadcrumb from '../../components/dashboard/Breadcrumb';
import './AdminTeams.css';
import { allTeamsData, teamMembers } from '../../data/teamsConstants';
import Button from '../../components/common/Button';

const AdminTeams = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [memberView, setMemberView] = useState('table'); 
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [teamName, setTeamName] = useState('Frontend Engineering');
  const [teamDesc, setTeamDesc] = useState('Responsible for building and maintaining the core product frontend. Works closely with Design and Backend teams.');
  const [teamLead, setTeamLead] = useState('Kiran Das');

  const renderGlobalView = () => (
    <>
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <Breadcrumb items={['Teams', 'Overview']} />
          <h1 className="page-title m-0">Teams</h1>
          <p className="page-subtitle mt-1 mb-0 text-slate">Manage all teams, members, and team structure across the organisation.</p>
        </div>
        <Button className="btn btn-primary bg-blue border-0" onClick={() => setShowCreateModal(true)}>
          <Plus size={16} className="me-2" /> Create Team
        </Button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-3">
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon bg-blue-light text-blue"><Users size={20} /></div>
              <div className="stat-trend text-green"><ArrowUp size={14} /> 2</div>
            </div>
            <div className="stat-label">TOTAL TEAMS</div>
            <div className="stat-value">24</div>
            <div className="stat-desc">Across all departments</div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon bg-green-light text-green"><User size={20} /></div>
              <div className="stat-trend text-green"><ArrowUp size={14} /> 18</div>
            </div>
            <div className="stat-label">TOTAL MEMBERS</div>
            <div className="stat-value">381</div>
            <div className="stat-desc">Active employees</div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon bg-orange-light text-orange"><Activity size={20} /></div>
            </div>
            <div className="stat-label">ACTIVE TEAMS</div>
            <div className="stat-value">21</div>
            <div className="stat-desc">3 Teams Inactive</div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon bg-purple-light text-purple"><Building size={20} /></div>
            </div>
            <div className="stat-label">DEPTS COVERED</div>
            <div className="stat-value">8</div>
            <div className="stat-desc">All departments</div>
          </div>
        </div>
      </div>

      <div className="filter-bar d-flex justify-content-between">
        <div className="d-flex gap-3 flex-grow-1">
          <div className="search-box">
            <Search size={16} className="icon" />
            <input type="text" className="form-control" placeholder="Search projects..." />
          </div>
          <select className="filter-select">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>HR</option>
            <option>Product Design</option>
          </select>
          <select className="filter-select">
            <option>All Team Leads</option>
            <option>Kiran Das</option>
            <option>Anil Mehta</option>
          </select>
          <select className="filter-select">
            <option>All Status</option>
            <option>Active</option>
            <option>Archived</option>
          </select>
        </div>
        <div className="text-muted small align-self-center">
          Showing 6 of 24 teams
        </div>
      </div>

      <div className="row g-4">
        {allTeamsData.map(team => (
          <div key={team.id} className="col-12 col-md-4">
            <div className="team-card-global" onClick={() => setSelectedTeam(team)}>
              <div className="team-actions-menu" onClick={(e) => e.stopPropagation()}>
                <MoreHorizontal size={18} />
              </div>
              <div className={`team-avatar ${team.bg} ${team.text} mb-3`}>
                {team.initials}
              </div>
              <h4 className="team-title">{team.title}</h4>
              <p className="team-department text-slate mb-4">{team.department}</p>

              <div className="d-flex justify-content-between align-items-center mt-auto">
                <div className="text-slate small d-flex gap-3">
                  <span className="d-flex align-items-center"><User size={14} className="me-1" /> {team.members} members</span>
                  <span className="d-flex align-items-center"><User size={14} className="me-1" /> {team.lead}</span>
                </div>
                {team.status === 'Active' ? (
                  <span className="badge active"><div className="status-dot active"></div> Active</span>
                ) : (
                  <span className="badge archived">Archived</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const renderDetailView = () => (
    <>
      <Breadcrumb items={['Teams', selectedTeam.title]} />

      <div className="team-header-card mt-3">
        <div className="team-header-info">
          <div className={`team-header-avatar ${selectedTeam.bg} ${selectedTeam.text}`}>
            {selectedTeam.initials}
          </div>
          <div>
            <h2 className="team-header-title">
              {selectedTeam.title}
            </h2>
            <div className="d-flex gap-2 mb-3">
              <span className="badge active"><div className="status-dot active"></div> Active</span>
            </div>
            <div className="header-meta">
              <span className="header-meta-item"><Building size={16} /> Department: <strong className="text-dark">{selectedTeam.department}</strong></span>
              <span className="header-meta-item"><User size={16} /> Lead: <strong className="text-dark">{selectedTeam.lead}</strong></span>
              <span className="header-meta-item"><Users size={16} /> Members: <strong className="text-dark">{selectedTeam.members}</strong></span>
              <span className="header-meta-item"><Calendar size={16} /> Created: <strong className="text-dark">Jan 12, 2024</strong></span>
            </div>
          </div>
        </div>
        <div className="d-flex gap-2">
          <Button variant="outline" className="btn btn-outline-secondary bg-white border d-flex align-items-center fw-semibold">
            <Edit size={16} className="me-2 text-muted" /> Edit Team
          </Button>
          <Button className="btn btn-primary bg-blue border-0 d-flex align-items-center fw-semibold" onClick={() => setShowAddMemberModal(true)}>
            <Plus size={16} className="me-2" /> Add Member
          </Button>
        </div>
      </div>

      <div className="custom-tabs">
        {['Overview', 'Members', 'Analytics', 'Settings'].map(tab => (
          <Button 
            key={tab} 
            className={`custom-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="tab-content">

        {activeTab === 'Overview' && (
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <div className="chart-card">
                <h3 className="chart-title">Team Composition</h3>
                <p className="chart-subtitle">Role breakdown · 12 members</p>

                <div className="progress-bar-group">
                  <div className="progress-header"><span>Engineers</span><strong>8</strong></div>
                  <div className="progress-track"><div className="progress-fill bg-blue" style={{width: '66%'}}></div></div>
                </div>
                <div className="progress-bar-group">
                  <div className="progress-header"><span>Team Leads</span><strong>2</strong></div>
                  <div className="progress-track"><div className="progress-fill bg-green" style={{width: '16%'}}></div></div>
                </div>
                <div className="progress-bar-group mb-0">
                  <div className="progress-header"><span>Interns</span><strong>2</strong></div>
                  <div className="progress-track"><div className="progress-fill bg-orange" style={{width: '16%'}}></div></div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="chart-card">
                <h3 className="chart-title">Team Info</h3>
                <div className="mt-4 text-slate" style={{ fontSize: '0.9rem', lineHeight: '1.6', paddingBottom: '32px', borderBottom: '1px solid #e2e8f0' }}>
                  Responsible for building and maintaining the core product frontend. Works closely with Design and Backend teams.
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3 py-2 border-bottom">
                  <span className="text-slate small">Status</span>
                  <span className="badge active"><div className="status-dot active"></div> Active</span>
                </div>
                <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                  <span className="text-slate small">Department</span>
                  <span className="font-semibold text-dark small">Engineering</span>
                </div>
                <div className="d-flex justify-content-between align-items-center py-3">
                  <span className="text-slate small">Created</span>
                  <span className="font-semibold text-dark small">Jan 12, 2024</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Members' && (
          <div className="members-table-card">
            <div className="table-toolbar">
              <div className="d-flex gap-3">
                <div className="search-box">
                  <Search size={16} className="icon" />
                  <input type="text" className="form-control" placeholder="Search members..." style={{ minWidth: '250px' }} />
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
                  <Button variant="icon" className={`view-toggle-btn ${memberView === 'grid' ? 'active' : ''}`} onClick={() => setMemberView('grid')}>
                    <LayoutGrid size={16} />
                  </Button>
                  <Button variant="icon" className={`view-toggle-btn ${memberView === 'table' ? 'active' : ''}`} onClick={() => setMemberView('table')}>
                    <LayoutList size={16} />
                  </Button>
                </div>
                <Button className="btn btn-primary bg-blue border-0 py-2 d-flex align-items-center fw-semibold text-sm" onClick={() => setShowAddMemberModal(true)}>
                  <Plus size={16} className="me-2" /> Add Member
                </Button>
              </div>
            </div>

            {memberView === 'table' ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map(member => (
                    <tr key={member.id}>
                      <td>
                        <div className="member-cell">
                          <div className={`member-avatar ${member.bg} ${member.text}`}>{member.initials}</div>
                          <div>
                            <div className="fw-bold text-dark">{member.name}</div>
                            <div className="text-slate" style={{fontSize: '0.75rem'}}>{member.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-dark">{member.role}</td>
                      <td className="text-dark">{member.department}</td>
                      <td className="text-slate">{member.email}</td>
                      <td>
                        {member.status === 'Lead' && <span className="badge bg-blue-light text-blue rounded-pill px-3 py-1 fw-bold" style={{fontSize:'0.7rem'}}>Lead</span>}
                        {member.status === 'Active' && <span className="badge active rounded-pill px-3 py-1 fw-bold" style={{fontSize:'0.7rem'}}>Active</span>}
                        {member.status === 'Intern' && <span className="badge bg-yellow-light text-yellow rounded-pill px-3 py-1 fw-bold" style={{fontSize:'0.7rem'}}>Intern</span>}
                      </td>
                      <td>
                        <div className="table-actions">
                          <Button variant="secondary" className="btn btn-sm btn-light border bg-white text-blue fw-semibold">View</Button>
                          <Button variant="outline-destructive" className="btn btn-sm btn-light border bg-white text-red fw-semibold">Remove</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-4 row g-4 bg-slate-light">
                {teamMembers.map(member => (
                  <div key={member.id} className="col-12 col-md-4">
                    <div className="member-grid-card">
                      <div className={`member-grid-avatar ${member.bg} ${member.text}`}>{member.initials}</div>
                      <h4 className="member-grid-name">{member.name}</h4>
                      <div className="member-grid-role">{member.role}</div>
                      <div className="member-grid-email">{member.email}</div>

                      {member.status === 'Lead' && <span className="badge bg-blue-light text-blue rounded-pill px-4 py-1 mb-4 fw-bold">Lead</span>}
                      {member.status === 'Active' && <span className="badge active rounded-pill px-4 py-1 mb-4 fw-bold">Active</span>}
                      {member.status === 'Intern' && <span className="badge bg-yellow-light text-yellow rounded-pill px-4 py-1 mb-4 fw-bold">Intern</span>}

                      <div className="d-flex gap-2 mt-auto w-100 justify-content-center">
                        <Button variant="secondary" className="btn btn-sm btn-light border bg-white text-blue fw-semibold">View Profile</Button>
                        <Button variant="outline-destructive" className="btn btn-sm btn-light border bg-white text-red fw-semibold">Remove</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="p-3 border-top text-slate small d-flex justify-content-between align-items-center">
              <span>8 members</span>
              <div className="d-flex gap-2">
                <Button variant="icon" className="btn btn-sm btn-light border p-1"><ChevronLeft size={16} /></Button>
                <Button className="btn btn-sm btn-primary bg-blue border-0 px-3">1</Button>
                <Button variant="icon" className="btn btn-sm btn-light border p-1"><ChevronRight size={16} /></Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Analytics' && (
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="chart-card">
                <h3 className="chart-title">Team Composition</h3>
                <p className="chart-subtitle">Role breakdown · 12 members</p>
                <div className="donut-chart-container">
                  <div className="donut-chart">
                    <div className="donut-hole">
                      <span className="donut-value">12</span>
                      <span className="donut-label">MEMBERS</span>
                    </div>
                  </div>
                  <div className="donut-legend">
                    <div className="legend-item"><div className="legend-label"><div className="legend-dot bg-blue"></div>Engineers</div><strong>6</strong></div>
                    <div className="legend-item"><div className="legend-label"><div className="legend-dot bg-green"></div>Senior Devs</div><strong>2</strong></div>
                    <div className="legend-item"><div className="legend-label"><div className="legend-dot bg-yellow"></div>Interns</div><strong>2</strong></div>
                    <div className="legend-item"><div className="legend-label"><div className="legend-dot bg-purple"></div>Leads</div><strong>2</strong></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="chart-card">
                <h3 className="chart-title">Growth Trend</h3>
                <p className="chart-subtitle">Members added · Last 6 months</p>
                <div className="bar-chart-container">
                  <div className="bar-group">
                    <span className="bar-value">6</span>
                    <div className="bar" style={{height: '60%'}}></div>
                    <span className="bar-label">Nov</span>
                  </div>
                  <div className="bar-group">
                    <span className="bar-value">8</span>
                    <div className="bar" style={{height: '80%'}}></div>
                    <span className="bar-label">Dec</span>
                  </div>
                  <div className="bar-group">
                    <span className="bar-value">8</span>
                    <div className="bar" style={{height: '80%'}}></div>
                    <span className="bar-label">Jan</span>
                  </div>
                  <div className="bar-group">
                    <span className="bar-value">10</span>
                    <div className="bar" style={{height: '100%'}}></div>
                    <span className="bar-label">Feb</span>
                  </div>
                  <div className="bar-group">
                    <span className="bar-value">11</span>
                    <div className="bar" style={{height: '110%'}}></div>
                    <span className="bar-label">Mar</span>
                  </div>
                  <div className="bar-group">
                    <span className="bar-value text-blue">12</span>
                    <div className="bar solid bg-blue" style={{height: '120%'}}></div>
                    <span className="bar-label text-dark fw-bold">Apr</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="chart-card">
                <h3 className="chart-title">Dept Distribution</h3>
                <p className="chart-subtitle">Members by department</p>
                <div className="bar-chart-container" style={{justifyContent: 'space-around', padding: '0 32px'}}>
                  <div className="bar-group">
                    <span className="bar-value">8</span>
                    <div className="bar border-blue bg-blue-light" style={{height: '100%', width: '60px'}}></div>
                    <span className="bar-label">Eng</span>
                  </div>
                  <div className="bar-group">
                    <span className="bar-value">3</span>
                    <div className="bar border-purple bg-purple-light" style={{height: '37%', width: '60px'}}></div>
                    <span className="bar-label">Design</span>
                  </div>
                  <div className="bar-group">
                    <span className="bar-value">2</span>
                    <div className="bar border-green bg-green-light" style={{height: '25%', width: '60px'}}></div>
                    <span className="bar-label">HR</span>
                  </div>
                  <div className="bar-group">
                    <span className="bar-value">1</span>
                    <div className="bar border-red bg-red-light" style={{height: '12%', width: '60px'}}></div>
                    <span className="bar-label">IT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Settings' && (
          <div className="row">
            <div className="col-12 col-lg-8">

              <div className="settings-section">
                <h3 className="settings-title">General</h3>
                <p className="settings-subtitle">Update team name and description</p>

                <label className="form-label">TEAM NAME</label>
                <input type="text" className="settings-input" value={teamName} onChange={e => setTeamName(e.target.value)} />

                <label className="form-label">DESCRIPTION</label>
                <textarea className="settings-input" rows="3" value={teamDesc} onChange={e => setTeamDesc(e.target.value)}></textarea>

                <Button className="btn btn-primary bg-blue border-0 fw-semibold px-4">Save Changes</Button>
              </div>

              <div className="settings-section">
                <h3 className="settings-title">Leadership</h3>
                <p className="settings-subtitle">Change team lead assignment</p>

                <label className="form-label">CURRENT TEAM LEAD</label>
                <div className="current-lead-card">
                  <div className="member-avatar bg-green-light text-green">KD</div>
                  <div>
                    <div className="fw-bold text-dark">{teamLead}</div>
                    <div className="text-slate small">Engineering Manager</div>
                  </div>
                </div>

                <label className="form-label">CHANGE TEAM LEAD</label>
                <select className="settings-input bg-white">
                  <option>Select new lead...</option>
                  <option>Anil Das</option>
                  <option>Harshad mehta</option>
                  <option>Kiran Bedi</option>
                </select>

                <Button variant="secondary" className="btn btn-light border fw-semibold px-4 bg-white text-dark mt-2">Update Lead</Button>
              </div>

              <div className="danger-zone">
                <h3 className="danger-title"><AlertCircle size={20} /> Danger Zone</h3>
                <p className="danger-subtitle">These actions are irreversible. Please proceed with caution.</p>

                <div className="d-flex gap-3">
                  <Button variant="secondary" className="btn btn-light border border-warning text-warning fw-semibold px-4 bg-yellow-light" onClick={() => setShowArchiveModal(true)}>
                    Archive Team
                  </Button>
                  <Button variant="destructive" className="btn btn-danger bg-red border-red fw-semibold px-4 text-white" onClick={() => setShowDeleteModal(true)}>
                    Delete Team
                  </Button>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="admin-teams-container p-4">
      {!selectedTeam ? renderGlobalView() : renderDetailView()}

      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content-box p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="fw-bold m-0">Create New Team</h4>
                <p className="text-slate small m-0 mt-1">Set up a new team and assign members</p>
              </div>
              <Button variant="secondary" className="btn btn-light border-0 rounded-circle p-2" onClick={() => setShowCreateModal(false)}><X size={20}/></Button>
            </div>

            <label className="form-label">TEAM NAME <span className="text-red">*</span></label>
            <input type="text" className="settings-input bg-white" placeholder="e.g. Frontend Engineering" />

            <label className="form-label">DEPARTMENT <span className="text-red">*</span></label>
            <input type="text" className="settings-input bg-white" defaultValue="Engineering" />

            <label className="form-label">TEAM LEAD</label>
            <select className="settings-input bg-white">
              <option>Select team lead...</option>
            </select>

            <label className="form-label">DESCRIPTION</label>
            <textarea className="settings-input bg-white" rows="3" placeholder="Brief description of this team's purpose..."></textarea>

            <div className="d-flex justify-content-end gap-3 mt-2 border-top pt-4">
              <Button variant="secondary" className="btn btn-light bg-white border fw-semibold px-4 text-dark" onClick={() => setShowCreateModal(false)}>Cancel</Button>
              <Button className="btn btn-primary bg-blue border-0 fw-semibold px-4 d-flex align-items-center">
                <Plus size={18} className="me-2" /> Create Team
              </Button>
            </div>
          </div>
        </div>
      )}

      {showAddMemberModal && (
        <div className="modal-overlay">
          <div className="modal-content-box p-4" style={{maxWidth: '480px'}}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="fw-bold m-0">Add Members</h4>
                <p className="text-slate small m-0 mt-1">Search and select employees to add to this team</p>
              </div>
              <Button variant="secondary" className="btn btn-light border-0 rounded-circle p-2" onClick={() => setShowAddMemberModal(false)}><X size={20}/></Button>
            </div>

            <label className="form-label">SEARCH EMPLOYEES</label>
            <div className="search-box w-100 mb-3">
              <Search size={16} className="icon" />
              <input type="text" className="settings-input bg-white m-0" placeholder="Type name or email..." />
            </div>

            <div className="add-member-list">
              <div className="add-member-item">
                <div className="d-flex gap-3 align-items-center">
                  <div className="member-avatar bg-yellow-light text-yellow">SR</div>
                  <div><div className="fw-bold text-dark" style={{fontSize:'0.9rem'}}>Sunita Rao</div><div className="text-slate" style={{fontSize:'0.75rem'}}>Legal</div></div>
                </div>
                <Button variant="icon" className="btn btn-light border-0 text-muted"><Plus size={18} /></Button>
              </div>
              <div className="add-member-item">
                <div className="d-flex gap-3 align-items-center">
                  <div className="member-avatar bg-blue-light text-blue">RV</div>
                  <div><div className="fw-bold text-dark" style={{fontSize:'0.9rem'}}>Rohit Verma</div><div className="text-slate" style={{fontSize:'0.75rem'}}>DevOps</div></div>
                </div>
                <Button variant="icon" className="btn btn-light border-0 text-muted"><Plus size={18} /></Button>
              </div>
              <div className="add-member-item">
                <div className="d-flex gap-3 align-items-center">
                  <div className="member-avatar bg-purple-light text-purple">AT</div>
                  <div><div className="fw-bold text-dark" style={{fontSize:'0.9rem'}}>Arjun Tiwari</div><div className="text-slate" style={{fontSize:'0.75rem'}}>Engineering</div></div>
                </div>
                <Button variant="icon" className="btn btn-light border-0 text-muted"><Plus size={18} /></Button>
              </div>
            </div>

            <label className="form-label mb-2">SELECTED (2)</label>
            <div className="selected-tags mb-4">
              <div className="selected-tag">Kavya Nair <X size={12} className="cursor-pointer" /></div>
              <div className="selected-tag">Meera Joshi <X size={12} className="cursor-pointer" /></div>
            </div>

            <div className="d-flex justify-content-end gap-3 pt-2">
              <Button variant="secondary" className="btn btn-light bg-white border fw-semibold px-4 text-dark" onClick={() => setShowAddMemberModal(false)}>Cancel</Button>
              <Button className="btn btn-primary bg-blue border-0 fw-semibold px-4 d-flex align-items-center">
                <User size={18} className="me-2" /> Add Members
              </Button>
            </div>
          </div>
        </div>
      )}

      {showArchiveModal && (
        <div className="modal-overlay">
          <div className="modal-content-box p-0 text-center overflow-hidden" style={{maxWidth: '400px'}}>
            <div className="p-4 pt-5">
              <div className="d-inline-flex bg-yellow-light text-yellow rounded-circle p-3 mb-3">
                <Archive size={32} />
              </div>
              <h4 className="fw-bold mb-2">Archive Team?</h4>
              <p className="text-slate small px-3 mb-4">
                This team will be moved to archived status and removed from active team listings.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="secondary" className="btn btn-light bg-white border fw-semibold px-4 text-dark" onClick={() => setShowArchiveModal(false)}>Cancel</Button>
                <Button className="btn btn-warning text-white border-warning bg-yellow fw-semibold px-4" onClick={() => setShowArchiveModal(false)}>
                  Confirm Archive
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content-box p-0 text-center overflow-hidden" style={{maxWidth: '400px'}}>
            <div className="p-4 pt-5">
              <div className="d-inline-flex bg-red-light text-red rounded-circle p-3 mb-3 border border-red-subtle">
                <AlertCircle size={32} />
              </div>
              <h4 className="fw-bold mb-2">Delete Team?</h4>
              <p className="text-slate small px-3 mb-4">
                This will permanently delete the team and remove all member associations. This cannot be undone.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="secondary" className="btn btn-light bg-white border fw-semibold px-4 text-dark" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                <Button variant="destructive" className="btn btn-danger bg-red text-white border-0 fw-semibold px-4" onClick={() => setShowDeleteModal(false)}>
                  Confirm Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminTeams;
