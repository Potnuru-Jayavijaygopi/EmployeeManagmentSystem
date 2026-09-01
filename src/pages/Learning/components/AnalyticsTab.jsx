import { useState, useEffect } from "react";
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
import AnalyticsEmployeeDetail from "./AnalyticsEmployeeDetail";
import Button from "../../../components/common/Button";
import { LearningStatCard } from "./LearningStatCard";
import { lmsService } from "../../../services";

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

const AnalyticsTab = () => {
  const [subTab, setSubTab] = useState("employees");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      const [cRes, eRes, qRes] = await Promise.allSettled([
        lmsService.getCourses(),
        lmsService.getEnrollments(),
        lmsService.getQuizzes(),
      ]);

      if (cRes.status === 'fulfilled') {
        const cData = cRes.value;
        setCourses(Array.isArray(cData) ? cData : (cData?.results || []));
      } else { setCourses([]); }

      if (eRes.status === 'fulfilled') {
        const eData = eRes.value;
        setEnrollments(Array.isArray(eData) ? eData : (eData?.results || []));
      } else { setEnrollments([]); }

      if (qRes.status === 'fulfilled') {
        const qData = qRes.value;
        setQuizzes(Array.isArray(qData) ? qData : (qData?.results || []));
      } else { setQuizzes([]); }
    };
    fetchAnalyticsData();
  }, []);

  if (selectedEmployee) {
    return (
      <AnalyticsEmployeeDetail
        employee={selectedEmployee}
        onBack={() => setSelectedEmployee(null)}
      />
    );
  }

  const notStartedCount = enrollments.filter(e => Number(e.progress_percentage || 0) === 0).length;
  const lowCompletionCount = courses.filter(c => Number(c.completion_rate || 0) < 40).length;
  const totalEnrollments = enrollments.length;
  
  const progList = enrollments.map(e => Number(e.progress_percentage || 0));
  const avgCompletion = progList.length > 0 ? Math.round(progList.reduce((a, b) => a + b, 0) / progList.length) : 0;
  
  const passList = quizzes.map(q => Number(q.passing_score || 0)).filter(s => s > 0);
  const avgQuizScore = passList.length > 0 ? Math.round(passList.reduce((a, b) => a + b, 0) / passList.length) : 80;

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
          title={`${notStartedCount} Enrollments Pending/Not Started`}
          desc="Assigned courses requiring user action"
          colorClass="text-danger"
          bgClass="bg-danger bg-opacity-10 border-danger border-opacity-25"
        />
        <AlertCard
          icon={AlertTriangle}
          title={`${lowCompletionCount} Low Completion Courses`}
          desc="Below 40% completion rate"
          colorClass="text-warning"
          bgClass="bg-warning bg-opacity-10 border-warning border-opacity-25"
        />
        <AlertCard
          icon={CheckSquare}
          title="0 Recent Quiz Failures"
          desc="All users meeting pass thresholds"
          colorClass="text-primary"
          bgClass="bg-primary bg-opacity-10 border-primary border-opacity-25"
        />
      </div>

      <div className="d-flex flex-wrap gap-3 mb-4">
        <LearningStatCard
          icon={BookOpen}
          value={String(totalEnrollments)}
          label="Total Enrollments"
          iconColorClass="text-primary"
          iconBgClass="bg-primary bg-opacity-10"
        />
        <LearningStatCard
          icon={CheckCircle}
          value={`${avgCompletion}%`}
          label="Avg Completion"
          iconColorClass="text-success"
          iconBgClass="bg-success bg-opacity-10"
        />
        <LearningStatCard
          icon={Star}
          value={`${avgQuizScore}%`}
          label="Avg Quiz Target"
          iconColorClass="text-warning"
          iconBgClass="bg-warning bg-opacity-10"
        />
        <LearningStatCard
          icon={Award}
          value="100%"
          label="Course Pass Rate"
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
          Enrollments
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
            {subTab === "employees" && `All enrollments — ${enrollments.length} total`}
            {subTab === "courses" && `All courses — ${courses.length} total`}
            {subTab === "quizzes" && `All quizzes — ${quizzes.length} total`}
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            {subTab === "employees" && (
              <>
                <thead className="bg-light border-bottom">
                  <tr>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 ps-4 py-3 lms-font-xs lms-tracking-wide">
                      User / Employee
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide">
                      Enrolled Course
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide" style={{ width: "200px" }}>
                      Completion %
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide">
                      Status
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 pe-4 py-3 lms-font-xs lms-tracking-wide">
                      Enrolled Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((emp, idx) => {
                    const userName = emp.user_name || emp.user_email || 'Brahma Admin';
                    const initials = userName.split(' ').map(n => n[0]).join('').substring(0, 2);
                    const courseTitle = emp.course_title || emp.course_name || 'LMS Course';
                    const progress = Number(emp.progress_percentage || 0);
                    const status = emp.status || 'active';
                    const enrolledDate = emp.enrolled_at ? emp.enrolled_at.substring(0, 10) : 'Recently';

                    return (
                      <tr
                        key={emp.id || idx}
                      >
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center gap-3">
                            <div
                              className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold lms-font-sm lms-icon-md bg-primary"
                            >
                              {initials}
                            </div>
                            <div>
                              <div className="fw-bold text-dark small">
                                {userName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-muted small">{courseTitle}</td>
                        <td className="py-3">
                          <ProgressBar
                            progress={progress}
                            color={
                              progress > 80
                                ? "#10B981"
                                : progress > 40
                                ? "#F59E0B"
                                : "#EF4444"
                            }
                          />
                        </td>
                        <td className="py-3">
                          <Badge variant={status === 'completed' ? 'success' : 'primary'} className="bg-opacity-10 fw-medium">
                            {status}
                          </Badge>
                        </td>
                        <td className="pe-4 py-3 text-muted small">
                          {enrolledDate}
                        </td>
                      </tr>
                    );
                  })}

                  {enrollments.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">
                        No active enrollments found in database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </>
            )}

            {subTab === "courses" && (
              <>
                <thead className="bg-light border-bottom">
                  <tr>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 ps-4 py-3 lms-font-xs lms-tracking-wide">
                      Course Title
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide">
                      Category
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 text-center lms-font-xs lms-tracking-wide">
                      Level
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 text-center lms-font-xs lms-tracking-wide">
                      Duration
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 pe-4 py-3 lms-font-xs lms-tracking-wide">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, idx) => {
                    const title = course.title || `Course #${course.id}`;
                    const category = course.category || 'General';
                    const level = course.level || 'Intermediate';
                    const duration = course.duration_hours ? `${course.duration_hours} hrs` : 'Self-paced';
                    const status = course.status || 'published';

                    return (
                      <tr key={course.id || idx}>
                        <td className="ps-4 py-3">
                          <span className="fw-bold text-dark small">
                            {title}
                          </span>
                        </td>
                        <td
                          className="py-3 fw-bold text-primary small"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {category}
                        </td>
                        <td className="py-3 fw-bold text-dark small text-center text-capitalize">
                          {level}
                        </td>
                        <td className="py-3 fw-bold text-dark small text-center">
                          {duration}
                        </td>
                        <td className="pe-4 py-3">
                          <Badge
                            variant={status === "published" ? "success" : "secondary"}
                            className="bg-opacity-10 fw-medium"
                          >
                            {status}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}

                  {courses.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">
                        No courses found in database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </>
            )}

            {subTab === "quizzes" && (
              <>
                <thead className="bg-light border-bottom">
                  <tr>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 ps-4 py-3 lms-font-xs lms-tracking-wide">
                      Quiz Title
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide">
                      Associated Course
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 text-center lms-font-xs lms-tracking-wide">
                      Pass Target
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide">
                      Time Limit
                    </th>
                    <th className="text-muted small fw-bold text-uppercase border-bottom-0 pe-4 py-3 lms-font-xs lms-tracking-wide">
                      Difficulty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {quizzes.map((quiz, idx) => {
                    const title = quiz.title || `Quiz #${quiz.id}`;
                    const courseName = quiz.course_name || quiz.course_title || 'General';
                    const passScore = quiz.passing_score || 80;
                    const timeLimit = quiz.time_limit_minutes ? `${quiz.time_limit_minutes} mins` : 'Untimed';
                    const difficulty = quiz.difficulty || 'Medium';

                    return (
                      <tr key={quiz.id || idx}>
                        <td className="ps-4 py-3 fw-bold text-dark small">
                          {title}
                        </td>
                        <td className="py-3 text-muted small">{courseName}</td>
                        <td className="py-3 fw-bold text-dark small text-center">
                          {passScore}%
                        </td>
                        <td className="py-3 text-muted small">
                          {timeLimit}
                        </td>
                        <td className="pe-4 py-3 text-capitalize text-muted small">
                          {difficulty}
                        </td>
                      </tr>
                    );
                  })}

                  {quizzes.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">
                        No quizzes found in database.
                      </td>
                    </tr>
                  )}
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
