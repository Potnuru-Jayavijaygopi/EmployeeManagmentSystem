import { useState } from "react";
import {
  BarChart2,
  Download,
  AlertCircle,
  AlertTriangle,
  CheckSquare,
  BookOpen,
  CheckCircle,
  Star,
  Award,
  Search,
} from "lucide-react";
import Badge from "../../../components/common/Badge";

const AlertCard = ({ icon: Icon, title, desc, colorClass, bgClass }) => (
  <div
    className={`border rounded-4 p-3 d-flex align-items-start gap-3 flex-grow-1 ${bgClass} lms-alert-card`}
  >
    <div className={`mt-1 ${colorClass}`}>
      <Icon size={20} />
    </div>
    <div>
      <div className={`fw-bold small ${colorClass}`}>{title}</div>
      <div className={`${colorClass} opacity-75 lms-font-sm`}>{desc}</div>
    </div>
  </div>
);

const ProgressBar = ({ progress, color }) => (
  <div className="d-flex align-items-center gap-2">
    <div className="flex-grow-1 bg-light rounded-pill overflow-hidden lms-progress-track">
      <div
        className="h-100"
        style={{ width: `${progress}%`, backgroundColor: color }}
      ></div>
    </div>
    <div className="small fw-bold text-dark lms-progress-label">
      {progress}%
    </div>
  </div>
);

import AnalyticsEmployeeDetail from "./AnalyticsEmployeeDetail";
import Button from "../../../components/common/Button";
import {
  mockCourses,
  mockEmployees,
  mockQuizzes,
} from "../../../data/analyticsMockData";
import { LearningStatCard } from "./LearningStatCard";

const AnalyticsTab = () => {
  const [subTab, setSubTab] = useState("employees");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  if (selectedEmployee) {
    return (
      <AnalyticsEmployeeDetail
        employee={selectedEmployee}
        onBack={() => setSelectedEmployee(null)}
      />
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1 d-flex align-items-center gap-2">
            <span className="text-primary d-flex align-items-center justify-content-center">
              <BarChart2 size={24} />
            </span>
            Analytics & Reports
          </h4>
          <div className="text-muted small">
            Learning insights, completion trends and performance data
          </div>
        </div>
        <div className="d-flex gap-2">
          <select className="form-select text-dark shadow-none lms-radius-lg">
            <option>Last 30 days</option>
          </select>
          <Button
            variant="secondary"
            className="btn btn-white border d-flex align-items-center gap-2 text-dark shadow-sm lms-hover-bg lms-radius-lg"
          >
            <Download size={16} /> Export
          </Button>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-3 mb-4">
        <AlertCard
          icon={AlertCircle}
          title="12 Employees Not Started"
          desc="Courses assigned but not begun"
          colorClass="text-danger"
          bgClass="bg-danger bg-opacity-10 border-danger border-opacity-25"
        />
        <AlertCard
          icon={AlertTriangle}
          title="3 Low Completion Courses"
          desc="Below 40% completion rate"
          colorClass="text-warning"
          bgClass="bg-warning bg-opacity-10 border-warning border-opacity-25"
        />
        <AlertCard
          icon={CheckSquare}
          title="8 Recent Quiz Failures"
          desc="Scored below passing threshold"
          colorClass="text-primary"
          bgClass="bg-primary bg-opacity-10 border-primary border-opacity-25"
        />
      </div>

      <div className="d-flex flex-wrap gap-3 mb-4">
        <LearningStatCard
          icon={BookOpen}
          value="186"
          label="Total Enrollments"
          iconColorClass="text-primary"
          iconBgClass="bg-primary bg-opacity-10"
        />
        <LearningStatCard
          icon={CheckCircle}
          value="78%"
          label="Avg Completion"
          iconColorClass="text-success"
          iconBgClass="bg-success bg-opacity-10"
        />
        <LearningStatCard
          icon={Star}
          value="82%"
          label="Avg Quiz Score"
          iconColorClass="text-warning"
          iconBgClass="bg-warning bg-opacity-10"
        />
        <LearningStatCard
          icon={Award}
          value="94%"
          label="Quiz Pass Rate"
          iconColorClass="text-primary"
          iconBgClass="bg-primary bg-opacity-10"
        />
      </div>

      <div className="d-flex gap-2 mb-4">
        <Button
          variant="secondary"
          className={`btn rounded-pill px-4 fw-medium ${
            subTab === "employees"
              ? "btn-primary"
              : "btn-white border text-muted hover-bg-light"
          }`}
          onClick={() => setSubTab("employees")}
        >
          Employees
        </Button>
        <Button
          variant="secondary"
          className={`btn rounded-pill px-4 fw-medium ${
            subTab === "courses"
              ? "btn-primary"
              : "btn-white border text-muted hover-bg-light"
          }`}
          onClick={() => setSubTab("courses")}
        >
          Courses
        </Button>
        <Button
          variant="secondary"
          className={`btn rounded-pill px-4 fw-medium ${
            subTab === "quizzes"
              ? "btn-primary"
              : "btn-white border text-muted hover-bg-light"
          }`}
          onClick={() => setSubTab("quizzes")}
        >
          Quizzes
        </Button>
      </div>

      <div className="bg-white border rounded-4 overflow-hidden">
        <div className="p-4 d-flex justify-content-between align-items-center border-bottom">
          <div className="text-muted small">
            {subTab === "employees" && "All employees — 42 total"}
            {subTab === "courses" && "All courses — 24 total"}
            {subTab === "quizzes" && "Quiz Results"}
          </div>
          {subTab === "employees" && (
            <div className="position-relative">
              <Search
                className="position-absolute top-50 translate-middle-y text-muted ms-3"
                size={14}
              />
              <input
                type="text"
                className="form-control form-control-sm ps-5 text-dark shadow-none lms-radius-md"
                placeholder="Search..."
              />
            </div>
          )}
        </div>

        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            {subTab === "employees" && (
              <>
                <thead className="bg-light border-bottom">
                  <tr>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 ps-4 py-3 lms-font-xs lms-tracking-wide">
                      Employee
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide">
                      Role
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide">
                      Team
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 text-center lms-font-xs lms-tracking-wide">
                      Enrolled
                    </th>
                    <th
                      className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide"
                      style={{ width: "200px" }}
                    >
                      Completion %
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 fw-bold lms-font-xs lms-tracking-wide">
                      Avg Score
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 pe-4 py-3 lms-font-xs lms-tracking-wide">
                      Last Active
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockEmployees.map((emp) => (
                    <tr
                      key={emp.id}
                      className="cursor-pointer"
                      onClick={() => setSelectedEmployee(emp)}
                    >
                      <td className="ps-4 py-3">
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold lms-font-sm lms-icon-md"
                            style={{ backgroundColor: emp.color }}
                          >
                            {emp.initials}
                          </div>
                          <div>
                            <div className="fw-bold text-dark small">
                              {emp.name}
                            </div>
                            <div className="text-muted lms-font-xs">
                              {emp.role}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-muted small">{emp.role}</td>
                      <td className="py-3 text-muted small">{emp.team}</td>
                      <td className="py-3 fw-bold text-dark small text-center">
                        {emp.enrolled}
                      </td>
                      <td className="py-3">
                        <ProgressBar
                          progress={emp.completion}
                          color={
                            emp.completion > 80
                              ? "#10B981"
                              : emp.completion > 60
                              ? "#F59E0B"
                              : "#EF4444"
                          }
                        />
                      </td>
                      <td
                        className={`py-3 fw-bold small ${
                          emp.avgScore > 80
                            ? "text-success"
                            : emp.avgScore > 60
                            ? "text-warning"
                            : "text-danger"
                        }`}
                      >
                        {emp.avgScore}%
                      </td>
                      <td className="pe-4 py-3 text-muted small">
                        {emp.lastActive}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}

            {subTab === "courses" && (
              <>
                <thead className="bg-light border-bottom">
                  <tr>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 ps-4 py-3 lms-font-xs lms-tracking-wide">
                      Course
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide">
                      Category
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 text-center lms-font-xs lms-tracking-wide">
                      Assigned
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 text-center lms-font-xs lms-tracking-wide">
                      Completed
                    </th>
                    <th
                      className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide"
                      style={{ width: "200px" }}
                    >
                      Completion %
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 fw-bold lms-font-xs lms-tracking-wide">
                      Avg Score
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 pe-4 py-3 lms-font-xs lms-tracking-wide">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockCourses.map((course) => (
                    <tr key={course.id}>
                      <td className="ps-4 py-3">
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="rounded-circle"
                            style={{
                              width: "8px",
                              height: "8px",
                              backgroundColor: course.color,
                            }}
                          ></div>
                          <span className="fw-bold text-dark small">
                            {course.name}
                          </span>
                        </div>
                      </td>
                      <td
                        className="py-3 fw-bold text-primary small"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {course.category}
                      </td>
                      <td className="py-3 fw-bold text-dark small text-center">
                        {course.assigned}
                      </td>
                      <td className="py-3 fw-bold text-success small text-center">
                        {course.completed}
                      </td>
                      <td className="py-3">
                        <ProgressBar
                          progress={course.completion}
                          color={
                            course.completion > 80
                              ? "#10B981"
                              : course.completion > 60
                              ? "#F59E0B"
                              : "#EF4444"
                          }
                        />
                      </td>
                      <td className="py-3 fw-bold text-dark small">
                        {course.avgScore}%
                      </td>
                      <td className="pe-4 py-3">
                        <Badge
                          variant={
                            course.status === "Published"
                              ? "success"
                              : course.status === "Draft"
                              ? "secondary"
                              : "primary"
                          }
                          className="bg-opacity-10 fw-medium"
                        >
                          {course.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}

            {subTab === "quizzes" && (
              <>
                <thead className="bg-light border-bottom">
                  <tr>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 ps-4 py-3 lms-font-xs lms-tracking-wide">
                      Employee
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide">
                      Quiz
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 text-center lms-font-xs lms-tracking-wide">
                      Score
                    </th>
                    <th
                      className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide"
                      style={{ width: "200px" }}
                    >
                      Result
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 fw-bold lms-font-xs lms-tracking-wide">
                      Attempts
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 pe-4 py-3 lms-font-xs lms-tracking-wide">
                      Last Attempt
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockQuizzes.map((quiz) => (
                    <tr key={quiz.id}>
                      <td className="ps-4 py-3 fw-bold text-dark small">
                        {quiz.name}
                      </td>
                      <td className="py-3 text-muted small">{quiz.course}</td>
                      <td className="py-3 fw-bold text-dark small text-center">
                        {quiz.score}
                      </td>
                      <td className="py-3">
                        <ProgressBar
                          progress={quiz.result}
                          color={
                            quiz.result > 80
                              ? "#10B981"
                              : quiz.result > 0
                              ? "#E11D48"
                              : "#E5E7EB"
                          }
                        />
                      </td>
                      <td
                        className={`py-3 fw-bold small ${
                          quiz.attempts > 50
                            ? "text-warning"
                            : quiz.attempts > 0
                            ? "text-danger"
                            : "text-danger"
                        }`}
                      >
                        {quiz.attempts}%
                      </td>
                      <td className="pe-4 py-3">
                        <Badge
                          variant={
                            quiz.lastAttempt === "Active"
                              ? "success"
                              : "secondary"
                          }
                          className="bg-opacity-10 fw-medium text-success"
                        >
                          {quiz.lastAttempt}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
