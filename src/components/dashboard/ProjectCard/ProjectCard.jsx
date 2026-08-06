import React from "react";
import { Eye, Folder, Calendar } from "lucide-react";
import "./ProjectCard.css";
import Button from "../../common/Button";

const ProjectCard = ({ project }) => {
  const {
    id,
    status,
    title,
    subtitle,
    priority,
    department,
    manager,
    membersCount,
    memberAvatars = [],
    tasksCompleted,
    tasksTotal,
    progress,
    dueDate,
    isOverdue,
  } = project;

  const statusColors = {
    Active: "blue",
    Planning: "purple",
    Completed: "green",
  };
  const statusColor = statusColors[status] || "slate";

  const priorityColors = {
    High: "red",
    Medium: "orange",
    Low: "green",
  };
  const priorityColor = priorityColors[priority] || "slate";

  return (
    <div className="project-card">
      <div className="project-col-info">
        <div className="d-flex align-items-center mb-2">
          <span className="project-id me-3">{id}</span>
          <span
            className={`project-status-pill text-${statusColor} bg-${statusColor}-light`}
          >
            <span className={`status-dot bg-${statusColor}`}></span>
            {status}
          </span>
        </div>
        <h4 className="project-title text-truncate">{title}</h4>
        <p className="project-subtitle text-truncate mb-0">{subtitle}</p>
      </div>

      <div className="project-col-tags">
        <div
          className={`project-tag text-${priorityColor} bg-${priorityColor}-light mb-2`}
        >
          {priority}
        </div>
        <div className="project-tag bg-slate-light text-slate">
          {department}
        </div>
      </div>

      <div className="project-col-manager">
        <div className="manager-avatar bg-orange text-white me-2">
          {manager.initials}
        </div>
        <div>
          <div className="manager-name">{manager.name}</div>
          <div className="manager-role">Manager</div>
        </div>
      </div>

      <div className="project-col-members">
        <div className="member-avatars mb-1">
          {memberAvatars.map((avatar, idx) => (
            <div
              key={idx}
              className={`member-avatar bg-${avatar.color} text-white`}
              style={{ zIndex: 10 - idx }}
            >
              {avatar.initials}
            </div>
          ))}
        </div>
        <div className="member-count">{membersCount} members</div>
      </div>

      <div className="project-col-progress">
        <div className="d-flex justify-content-between mb-1">
          <span className="progress-label">
            My Tasks ({tasksCompleted}/{tasksTotal})
          </span>
          <span
            className={`progress-percent text-${
              isOverdue ? "red" : priorityColor
            }`}
          >
            {progress}%
          </span>
        </div>
        <div className="progress-track mb-2">
          <div
            className={`progress-fill bg-${isOverdue ? "red" : priorityColor}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div
          className={`due-date ${
            isOverdue ? "text-red font-medium" : "text-slate"
          }`}
        >
          <Calendar size={12} className="me-1" />
          {isOverdue
            ? "Overdue"
            : status === "Completed"
            ? "Completed"
            : "Due"}{" "}
          — {dueDate}
        </div>
      </div>

      <div className="project-col-actions">
        <Button variant="icon" className="">
          <Eye size={16} />
        </Button>
        <Button variant="icon" className="">
          <Folder size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
