import React from "react";
import { Eye, Edit2, BarChart2, User } from "lucide-react";
import Badge from "../../../components/common/Badge";
import Button from '../../../components/common/Button';

const CourseCard = ({ course, onViewDetails, onEdit }) => {
  return (
    <div
      className="bg-white border rounded-4 overflow-hidden d-flex flex-column"
      style={{ position: "relative", height: "100%" }}
    >

      <div
        style={{
          height: "4px",
          width: "100%",
          backgroundColor: course.themeColor || "var(--primary-blue)",
        }}
      ></div>

      <div className="p-4 flex-grow-1 d-flex flex-column">

        <div className="d-flex align-items-center justify-content-center rounded-3 lms-icon-lg mb-3" style={{ backgroundColor: course.iconBg }}>
          <div style={{ color: course.themeColor }}>{course.icon}</div>
        </div>
        <h5 className="fw-bold mb-2 text-dark lms-font-lg">
          {course.title}
        </h5>
        <p className="text-secondary small mb-3 lms-text-clamp-2">
          {course.description}
        </p>

        <div className="d-flex flex-wrap gap-2 mb-4">
          <Badge
            variant={
              course.level === "Advanced"
                ? "danger"
                : course.level === "Beginner"
                ? "success"
                : "warning"
            }
            className="bg-opacity-10 fw-medium lms-font-xs"
          >
            {course.level}
          </Badge>
          <Badge
            variant={
              course.status === "Published"
                ? "success"
                : course.status === "Draft"
                ? "secondary"
                : "info"
            }
            className="bg-opacity-10 fw-medium lms-font-xs"
          >
            {course.status}
          </Badge>
          <Badge
            variant="primary"
            className="bg-opacity-10 fw-medium lms-font-xs"
          >
            {course.category}
          </Badge>
        </div>

        <div className="mt-auto">

          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex">
              {course.assignedUsers?.slice(0, 3).map((user, idx) => (
                <div
                  key={idx}
                  className="rounded-circle border border-2 border-white d-flex align-items-center justify-content-center text-white fw-bold lms-font-xs lms-icon-sm"
                  style={{
                    backgroundColor: user.color,
                    marginLeft: idx > 0 ? "-8px" : "0",
                  }}
                  title={user.name}
                >
                  {user.initials}
                </div>
              ))}
              {course.additionalAssigned > 0 && (
                <div
                  className="rounded-circle border border-2 border-white d-flex align-items-center justify-content-center bg-secondary text-white fw-bold lms-font-xs lms-icon-sm"
                  style={{
                    marginLeft: "-8px",
                  }}
                >
                  +{course.additionalAssigned}
                </div>
              )}
            </div>
            <div className="text-muted small">
              {(course.assignedUsers?.length || 0) + (course.additionalAssigned || 0)}{" "}
              assigned
            </div>
          </div>

          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="w-100 bg-light rounded-pill overflow-hidden mb-2 lms-progress-track">
              <div
                className="h-100"
                style={{
                  width: `${course.progress}%`,
                  backgroundColor: course.progressColor || course.themeColor,
                }}
              ></div>
            </div>
            <div className="small fw-bold text-dark">{course.progress}%</div>
          </div>
        </div>
      </div>

      <div className="p-3 border-top d-flex justify-content-between align-items-center bg-white">
        <div className="d-flex gap-2">
          <Button variant="icon" onClick={onViewDetails} className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center border lms-icon-md lms-bg-gray">
            <Eye size={14} className="text-muted" />
          </Button>
          <Button variant="icon"
            onClick={onEdit}
            className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center border lms-icon-md lms-bg-gray"
          >
            <Edit2 size={14} className="text-muted" />
          </Button>
          <Button variant="icon" className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center border lms-icon-md lms-bg-gray">
            <BarChart2 size={14} className="text-muted" />
          </Button>
          <Button variant="icon" className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center border lms-icon-md lms-bg-gray">
            <User size={14} className="text-muted" />
          </Button>
        </div>
        <div className="text-muted small fw-medium">{course.duration}</div>
      </div>
    </div>
  );
};

export default CourseCard;
