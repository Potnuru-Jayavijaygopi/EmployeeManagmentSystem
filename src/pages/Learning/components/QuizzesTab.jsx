import React, { useState, useEffect } from 'react';
import { Plus, Search, HelpCircle, CheckCircle, Clock } from 'lucide-react';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';
import { lmsService } from '../../../services';

const StatCard = ({ icon: Icon, value, label, iconColorClass, iconBgClass }) => (
  <div className="bg-white border rounded-4 p-4 d-flex align-items-center gap-3 flex-grow-1 lms-stat-card">
    <div className={`d-flex align-items-center justify-content-center rounded-circle ${iconColorClass} ${iconBgClass} lms-icon-lg`}>
      <Icon size={24} />
    </div>
    <div>
      <div className={`fw-bold mb-1 text-dark lms-font-2xl lh-1`}>{value}</div>
      <div className="text-muted small lms-font-sm">{label}</div>
    </div>
  </div>
);

const QuizzesTab = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await lmsService.getQuizzes();
        const list = Array.isArray(data) ? data : (data?.results || []);
        setQuizzes(list);
      } catch (err) {
        setQuizzes([]);
      }
    };
    fetchQuizzes();
  }, []);

  const totalQuizzes = quizzes.length;
  const activeQuizzes = quizzes.filter(q => q.is_published !== false).length;
  const passScores = quizzes.map(q => Number(q.passing_score || 0)).filter(s => s > 0);
  const avgPassScore = passScores.length > 0 ? Math.round(passScores.reduce((a, b) => a + b, 0) / passScores.length) : 80;

  return (
    <div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1 d-flex align-items-center gap-2">
            <span className="text-primary d-flex align-items-center justify-content-center">
              <HelpCircle size={24} />
            </span>
            Quizzes
          </h4>
          <div className="text-muted small">All quizzes created for your courses</div>
        </div>
        <Button className="btn-system btn-system-size-default btn-system-primary d-flex align-items-center gap-2 shadow-sm">
          <Plus size={18} /> Create Quiz
        </Button>
      </div>

      <div className="d-flex flex-wrap gap-3 mb-4">
        <StatCard icon={HelpCircle} value={String(totalQuizzes)} label="Total Quizzes" iconColorClass="text-primary" iconBgClass="bg-primary bg-opacity-10" />
        <StatCard icon={CheckCircle} value={String(activeQuizzes)} label="Active" iconColorClass="text-success" iconBgClass="bg-success bg-opacity-10" />
        <StatCard icon={Clock} value={`${avgPassScore}%`} label="Avg Pass Score" iconColorClass="text-warning" iconBgClass="bg-warning bg-opacity-10" />
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-3 flex-grow-1" style={{ maxWidth: '400px' }}>
          <div className="position-relative flex-grow-1">
            <Search className="position-absolute top-50 translate-middle-y text-muted ms-3" size={16} />
            <input 
              type="text" 
              className="form-control form-control-sm ps-5 text-dark shadow-none lms-radius-md" 
              placeholder="Search quizzes..." 
            />
          </div>
          <select className="form-select form-select-sm text-dark shadow-none lms-radius-md lms-select-input">
            <option>All Status</option>
          </select>
        </div>
        <div className="text-muted small">Showing {quizzes.length} quizzes</div>
      </div>

      <div className="bg-white border rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="bg-light border-bottom">
              <tr>
                <th className="text-muted small fw-bold text-uppercase border-bottom-0 ps-4 py-3 lms-font-xs lms-tracking-wide">Quiz Title</th>
                <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide">Associated Course</th>
                <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 text-center lms-font-xs lms-tracking-wide">Pass Score</th>
                <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide">Time Limit</th>
                <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide">Status</th>
                <th className="text-muted small fw-bold text-uppercase border-bottom-0 py-3 lms-font-xs lms-tracking-wide">Difficulty</th>
                <th className="text-muted small fw-bold text-uppercase border-bottom-0 pe-4 py-3 text-end lms-font-xs lms-tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz, idx) => {
                const title = quiz.title || `Quiz #${quiz.id}`;
                const courseName = quiz.course_name || quiz.course_title || 'General Course';
                const passScore = quiz.passing_score || 80;
                const timeLimit = quiz.time_limit_minutes ? `${quiz.time_limit_minutes} mins` : 'Untimed';
                const status = quiz.is_published !== false ? 'Active' : 'Draft';
                const difficulty = quiz.difficulty || 'Medium';

                return (
                  <tr key={quiz.id || idx}>
                    <td className="ps-4 py-3 fw-bold text-dark small">{title}</td>
                    <td className="py-3 text-muted small">{courseName}</td>
                    <td className="py-3 text-center">
                      <Badge variant="success" className="bg-opacity-25 text-success fw-bold px-2 py-1 lms-font-xs">
                        {passScore}%
                      </Badge>
                    </td>
                    <td className="py-3 text-muted small">{timeLimit}</td>
                    <td className="py-3">
                      <Badge variant={status === 'Active' ? 'success' : 'secondary'} className="bg-opacity-10 fw-medium">
                        {status}
                      </Badge>
                    </td>
                    <td className="py-3 text-muted small text-capitalize">{difficulty}</td>
                    <td className="pe-4 py-3 text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" className="btn btn-sm btn-light border px-2 py-1 rounded fw-medium text-muted lms-font-xs lms-bg-gray">Edit</Button>
                        <Button variant="destructive" className="btn btn-sm btn-light border px-2 py-1 rounded fw-medium text-danger lms-font-xs" style={{ backgroundColor: '#Fef2f2', borderColor: '#Fecaca' }}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {quizzes.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">
                    No quizzes found in database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuizzesTab;
