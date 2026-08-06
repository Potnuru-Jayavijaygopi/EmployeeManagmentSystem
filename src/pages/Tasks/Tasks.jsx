import React, { useState } from 'react';

import Breadcrumb from '../../components/dashboard/Breadcrumb';
import StatCard from '../../components/common/StatCard/StatCard';
import FilterPills from '../../components/common/FilterPills';
import Modal from '../../components/common/Modal';
import { 
  Plus, Edit, CheckCircle2, Clock, AlertCircle, 
  Calendar, User, GitBranch, Box, Edit3, Trash2, GitPullRequest, Circle, Check,
  X, CheckSquare
} from 'lucide-react';
import './Tasks.css';
import Button from '../../components/common/Button';
import { initialTasks } from '../../data/initialTasks';
import { tasksStats, taskFilters } from '../../data/tasksData';

const Tasks = ({ onTabChange, onNavigateHome }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeFilter, setActiveFilter] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    status: 'In Progress',
    priority: 'Medium',
    assignedTo: '',
    category: 'Backend',
    dueDate: '',
    estimatedHours: '',
    repository: '',
    branch: '',
    pullRequest: '',
    description: ''
  });

  const openCreateModal = () => {
    setEditingTask(null);
    setFormData({
      title: '',
      status: 'In Progress',
      priority: 'Medium',
      assignedTo: '',
      category: 'Backend',
      dueDate: '',
      estimatedHours: '',
      repository: '',
      branch: '',
      pullRequest: '',
      description: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      status: task.status === 'TODO' ? 'In Progress' : 'Completed',
      priority: task.priority === 'MEDIUM' ? 'Medium' : 'Low',
      assignedTo: task.assignee,
      category: 'Backend',
      dueDate: task.date,
      estimatedHours: '8',
      repository: task.repo,
      branch: task.branch,
      pullRequest: task.pr,
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setIsModalOpen(false);
  };

  const getStatusBadge = (status) => {
    if (status === 'TODO') return <span className="badge-pill bg-light border text-secondary fw-semibold px-2 py-1">TODO</span>;
    if (status === 'COMPLETED') return <span className="badge-pill bg-success-light text-success fw-semibold px-2 py-1">COMPLETED</span>;
    return <span className="badge-pill bg-light border text-secondary fw-semibold px-2 py-1">{status}</span>;
  };

  const getPriorityBadge = (priority) => {
    return <span className="badge-pill bg-light border text-dark fw-semibold px-2 py-1 ms-2">{priority}</span>;
  };

  return (
    <>
      <div className="dashboard-container">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <Breadcrumb items={['Dashboard', 'Tasks']} />
            <h1 className="page-title m-0">Task Management</h1>
          </div>
          <Button className="btn btn-primary bg-blue border-0 d-flex align-items-center" onClick={openCreateModal}>
            <Plus size={18} className="me-2" /> Assign Task
          </Button>
        </div>

        <div className="row g-3 mb-4">
          {tasksStats.map((stat, idx) => (
            <div key={idx} className="col-12 col-md-3">
              <StatCard 
                title={stat.title}
                icon={stat.icon}
                colorTheme={stat.colorTheme}
                mainValue={stat.mainValue}
                mainValueColorClass={stat.colorTheme === 'danger' ? 'text-danger' : ''}
                subtitle={stat.subtitle}
                subtitleColor={stat.colorTheme === 'danger' ? 'danger' : 'sub-text'}
              />
            </div>
          ))}
        </div>

        <div className="mb-4">
          <FilterPills 
            filters={taskFilters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        <div className="task-list d-flex flex-column gap-3">
          {tasks.map((task, idx) => (
            <div key={idx} className="task-card bg-white border rounded p-4 shadow-sm">
              <div className="row">

                <div className="col-12 col-md-3 border-end">
                  <h6 className="fw-bold mb-1">{task.title}</h6>
                  <span className="text-muted small fw-semibold text-uppercase tracking-wide">{task.id}</span>

                  <div className="mt-3 mb-2 text-muted small d-flex align-items-center">
                    <Calendar size={14} className="me-2" /> {task.date}
                  </div>
                  <div className="text-muted small d-flex align-items-center mb-4">
                    <User size={14} className="me-2" /> {task.assignee}
                  </div>

                  <div className="d-flex gap-2">
                    <Button variant="secondary" className="btn btn-sm btn-light border d-flex align-items-center px-3" onClick={() => openEditModal(task)}>
                      <Edit3 size={14} className="me-2 text-muted" /> Edit
                    </Button>
                    <Button variant="ghost" className="btn btn-sm btn-light border d-flex align-items-center px-3">
                      <Trash2 size={14} className="me-2 text-muted" /> Delete
                    </Button>
                  </div>
                </div>

                <div className="col-12 col-md-5 border-end px-4">
                  <div className="text-muted small fw-semibold text-uppercase tracking-wide mb-3">DEVOPS LINK</div>

                  <div className="d-flex align-items-center mb-2">
                    {task.devopsType === 'github' ? (
                       <GitBranch size={16} className="me-2 flex-shrink-0" />
                    ) : (
                       <Box size={16} className="me-2 flex-shrink-0 text-dark" /> 
                    )}
                    <span className="fw-semibold small text-truncate">{task.repo}</span>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <GitPullRequest size={16} className="me-2 flex-shrink-0 text-muted" />
                    <span className="fw-semibold small text-truncate">{task.pr}</span>
                    {task.devopsType === 'github' && <Circle size={8} fill="#2ea043" className="text-success ms-2 border-0 flex-shrink-0" />}
                  </div>

                  <div className="text-muted small mb-1 text-start">
                    {task.devopsType === 'github' ? 'Git Branch:' : 'Bitbucket Repository'} <span className="text-dark">{task.devopsType === 'github' ? task.branch : ''}</span>
                  </div>

                  <div className="text-muted small text-start">
                    {task.devopsType === 'github' ? (
                      <>
                        Last Commit: <span className="text-dark">{task.commit}</span><br/>
                        GitHub Actions Status: <span className="text-dark">{task.actionStatus}</span>
                      </>
                    ) : (
                      <>Build (Passed) &rarr; Staging (Depl) &rarr; Production (Pend)</>
                    )}
                  </div>
                </div>

                <div className="col-12 col-md-4 ps-4">
                  <div className="d-flex justify-content-start mb-4">
                    {getStatusBadge(task.status)}
                    {getPriorityBadge(task.priority)}
                  </div>

                  <div className="text-muted small text-start">
                    {task.devopsType === 'github' ? (
                      <>
                        Commit: {task.commit}<br/>
                        GitHub Actions Status: {task.actionStatus}<br/>
                        Build Pipeline (GitHub): <span className="text-success fw-semibold"><Check size={14} className="me-1"/>Passed</span>
                      </>
                    ) : (
                      <>
                        Bitbucket Repository:<br/>
                        {task.repo}<br/>
                        Branch: {task.branch}<br/>
                        Commit: {task.commit}<br/>
                        Bitbucket Pipelines Status: <span className="text-danger fw-semibold">{task.actionStatus}</span><br/>
                        Build Pipeline (Bitbucket): <span className="text-danger fw-semibold"><X size={14} className="me-1"/>Failed</span>
                      </>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingTask ? "Edit Task" : "Create Task"}
        icon={editingTask ? Edit3 : Plus}
        iconBgClass="bg-blue-light"
        iconTextClass="text-blue"
        maxWidth="700px"
        footer={
          <>
            <Button variant="secondary" className="btn btn-white border px-4 py-2 me-3 bg-white fw-semibold" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button className="btn btn-primary bg-blue border-0 px-4 py-2 d-flex align-items-center" onClick={handleSave}>
              <CheckCircle2 size={18} className="me-2" /> {editingTask ? 'Save Changes' : 'Create Task'}
            </Button>
          </>
        }
      >
        <div className="form-section mb-4">
          <div className="text-muted small fw-semibold text-uppercase tracking-wide mb-3">TASK DETAILS</div>
          <div className="form-group mb-3">
            <label className="fw-semibold mb-2">Task Title <span className="text-danger">*</span></label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter task title..." 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
            />
          </div>
        </div>

        <div className="form-section mb-4">
          <div className="text-muted small fw-semibold text-uppercase tracking-wide mb-3">STATUS & ASSIGNMENT</div>
          <div className="row mb-3">
            <div className="col-6">
              <label className="fw-semibold mb-2">Status</label>
              <select 
                className="form-select bg-blue-light border-0 text-blue fw-medium" 
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
              >
                <option>TODO</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
            <div className="col-6">
              <label className="fw-semibold mb-2 d-block">Priority</label>
              <div className="d-flex gap-2">
                <Button variant="outline" 
                  className={`btn flex-grow-1 ${formData.priority === 'Low' ? 'btn-outline-secondary border-secondary' : 'btn-light border text-muted'}`}
                  onClick={() => setFormData({...formData, priority: 'Low'})}
                >Low</Button>
                <Button variant="outline" 
                  className={`btn flex-grow-1 ${formData.priority === 'Medium' ? 'btn-outline-warning border-warning text-warning fw-semibold' : 'btn-light border text-muted'}`}
                  onClick={() => setFormData({...formData, priority: 'Medium'})}
                >Medium</Button>
                <Button variant="outline-destructive" 
                  className={`btn flex-grow-1 ${formData.priority === 'High' ? 'btn-outline-danger border-danger' : 'btn-light border text-muted'}`}
                  onClick={() => setFormData({...formData, priority: 'High'})}
                >High</Button>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-6">
              <label className="fw-semibold mb-2">Assigned To</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Name" 
                value={formData.assignedTo} 
                onChange={e => setFormData({...formData, assignedTo: e.target.value})} 
              />
            </div>
            <div className="col-6">
              <label className="fw-semibold mb-2">Category</label>
              <select 
                className="form-select" 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option>Backend</option>
                <option>Frontend</option>
                <option>Design</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section mb-4">
          <div className="text-muted small fw-semibold text-uppercase tracking-wide mb-3">TIMELINE</div>
          <div className="row mb-3">
            <div className="col-6">
              <label className="fw-semibold mb-2">Due Date</label>
              <div className="position-relative">
                <input 
                  type="date" 
                  className="form-control pe-5" 
                  value={formData.dueDate}
                  onChange={e => setFormData({...formData, dueDate: e.target.value})}
                />
              </div>
            </div>
            <div className="col-6">
              <label className="fw-semibold mb-2">Estimated Hours</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. 8" 
                value={formData.estimatedHours} 
                onChange={e => setFormData({...formData, estimatedHours: e.target.value})} 
              />
            </div>
          </div>
        </div>

        <div className="form-section mb-4">
          <div className="text-muted small fw-semibold text-uppercase tracking-wide mb-3">DEVOPS LINK</div>
          <div className="form-group mb-3">
            <label className="fw-semibold mb-2">Repository</label>
            <div className="input-group">
              <span className="input-group-text bg-white"><GitPullRequest size={16} className="text-muted"/></span>
              <input 
                type="text" 
                className="form-control border-start-0 ps-0" 
                placeholder="e.g., github.com/pegorion/frontend-ui" 
                value={formData.repository} 
                onChange={e => setFormData({...formData, repository: e.target.value})} 
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-6">
              <label className="fw-semibold mb-2">Git Branch</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><GitBranch size={16} className="text-muted"/></span>
                <input 
                  type="text" 
                  className="form-control border-start-0 ps-0" 
                  placeholder="e.g., fix/header-alignment" 
                  value={formData.branch} 
                  onChange={e => setFormData({...formData, branch: e.target.value})} 
                />
              </div>
            </div>
            <div className="col-6">
              <label className="fw-semibold mb-2">Pull Request</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><GitPullRequest size={16} className="text-muted"/></span>
                <input 
                  type="text" 
                  className="form-control border-start-0 ps-0" 
                  placeholder="e.g., pull/34" 
                  value={formData.pullRequest} 
                  onChange={e => setFormData({...formData, pullRequest: e.target.value})} 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-section mb-2">
          <div className="text-muted small fw-semibold text-uppercase tracking-wide mb-3">DESCRIPTION</div>
          <div className="form-group">
            <label className="fw-semibold mb-2">Task Description</label>
            <textarea 
              className="form-control" 
              rows="4" 
              placeholder="Describe the task in detail..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>
        </div>

      </Modal>

    </>
  );
};

export default Tasks;
