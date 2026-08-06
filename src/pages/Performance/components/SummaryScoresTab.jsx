import React from 'react';
import Badge from '../../../components/common/Badge';
import { Star, TrendingUp, BookOpen, User, Book } from 'lucide-react';

const SummaryScoresTab = () => {
  return (
    <div className="mt-3">

      <div 
        className="rounded-4 p-4 text-white mb-4 d-flex flex-column justify-content-center position-relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
          minHeight: '140px'
        }}
      >
        <div className="position-absolute rounded-circle" style={{ width: '300px', height: '300px', background: 'rgba(255,255,255,0.05)', right: '-100px', top: '-100px' }}></div>
        <div className="position-absolute rounded-circle" style={{ width: '150px', height: '150px', background: 'rgba(255,255,255,0.05)', right: '150px', bottom: '-50px' }}></div>

        <div className="position-relative z-index-1">
          <div className="text-uppercase fw-bold mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.8)' }}>
            Q1 2025 • Overall Performance
          </div>
          <div className="d-flex align-items-end gap-5 flex-wrap">
            <div>
              <div className="display-4 fw-bold lh-1 mb-1">4.2</div>
              <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>Average score / 5.0</div>
            </div>
            <div className="pb-1">
              <div className="fs-3 fw-bold lh-1 mb-1">24</div>
              <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>Completed</div>
            </div>
            <div className="pb-1">
              <div className="fs-3 fw-bold lh-1 mb-1">8</div>
              <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>Pending</div>
            </div>
            <div className="pb-1">
              <div className="fs-3 fw-bold lh-1 mb-1" style={{ color: '#FCD34D' }}>2</div>
              <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>Promotions</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">

        <div className="col-12 col-lg-8">

          <div className="bg-white border rounded-4 p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold mb-0 text-dark">Dimension Scores</h6>
              <span className="text-primary bg-primary bg-opacity-10 px-2 py-1 rounded fw-medium" style={{ fontSize: '0.75rem' }}>Q1 2025</span>
            </div>

            <div className="d-flex flex-column gap-3">
              {[
                { label: 'Quality of Work', score: 4.4, width: '88%', color: 'bg-success' },
                { label: 'Productivity', score: 4.1, width: '82%', color: 'bg-primary' },
                { label: 'Communication', score: 4.3, width: '86%', color: 'bg-success' },
                { label: 'Teamwork', score: 4.5, width: '90%', color: 'bg-success' },
                { label: 'Leadership', score: 3.8, width: '76%', color: 'bg-primary' },
                { label: 'Problem Solving', score: 4.2, width: '84%', color: 'bg-success' },
              ].map((dim, i) => (
                <div key={i} className="d-flex align-items-center gap-3">
                  <div className="text-dark small fw-medium" style={{ width: '120px' }}>{dim.label}</div>
                  <div className="flex-grow-1">
                    <div className="progress" style={{ height: '6px' }}>
                      <div className={`progress-bar ${dim.color}`} role="progressbar" style={{ width: dim.width }} aria-valuenow={dim.score} aria-valuemin="0" aria-valuemax="5"></div>
                    </div>
                  </div>
                  <div className="text-dark small fw-bold" style={{ width: '30px', textAlign: 'right' }}>{dim.score}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border rounded-4 p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0 text-dark">Top performers</h6>
              <span className="text-success small fw-medium">This quarter</span>
            </div>

            <div className="table-responsive">
              <table className="table border-0 table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th className="border-0 text-muted fw-semibold small pb-3">Employee</th>
                    <th className="border-0 text-muted fw-semibold small pb-3">Dept</th>
                    <th className="border-0 text-muted fw-semibold small pb-3">Score</th>
                    <th className="border-0 text-muted fw-semibold small pb-3">Trend</th>
                    <th className="border-0 text-muted fw-semibold small pb-3">Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((_, i) => (
                    <tr key={i}>
                      <td className="border-bottom-0 py-3">
                        <div className="d-flex align-items-center gap-2">
                          <div className="rounded-circle d-flex align-items-center justify-content-center text-primary fw-bold" style={{ width: '28px', height: '28px', backgroundColor: '#EFF6FF', fontSize: '0.7rem' }}>PS</div>
                          <span className="fw-medium text-dark small">Priya Sharma</span>
                        </div>
                      </td>
                      <td className="border-bottom-0 py-3 text-muted small">Product</td>
                      <td className="border-bottom-0 py-3">
                        <div className="d-flex align-items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={12} className={s <= 4 ? "text-warning" : "text-muted"} fill={s <= 4 ? "currentColor" : "none"} />
                          ))}
                          <span className="ms-1 fw-bold small text-dark">4.6</span>
                        </div>
                      </td>
                      <td className="border-bottom-0 py-3 text-success">
                        <TrendingUp size={16} />
                      </td>
                      <td className="border-bottom-0 py-3">
                        <span className="bg-success bg-opacity-10 text-success fw-bold text-uppercase px-2 py-1 rounded-pill" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
                          Promotion
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">

          <div className="bg-white border rounded-4 p-4 mb-4">
            <h6 className="fw-bold mb-4 text-dark">Score distribution</h6>
            <div className="d-flex flex-column gap-3">
              {[
                { range: '4.5 – 5.0', label: 'Excellent', count: 5, width: '25%', color: 'bg-success' },
                { range: '3.5 – 4.4', label: 'Good', count: 14, width: '70%', color: 'bg-primary' },
                { range: '2.5 – 3.4', label: 'Average', count: 4, width: '20%', color: 'bg-warning' },
                { range: 'Below 2.5', label: 'Needs work', count: 1, width: '5%', color: 'bg-danger' },
              ].map((dist, i) => (
                <div key={i} className="d-flex align-items-center">
                  <div style={{ width: '80px' }}>
                    <div className="fw-bold text-dark" style={{ fontSize: '0.8rem' }}>{dist.range}</div>
                    <div className="text-muted" style={{ fontSize: '0.7rem' }}>{dist.label}</div>
                  </div>
                  <div className="flex-grow-1 px-3">
                    <div className="progress" style={{ height: '6px', backgroundColor: '#F3F4F6' }}>
                      <div className={`progress-bar ${dist.color} rounded-pill`} role="progressbar" style={{ width: dist.width }}></div>
                    </div>
                  </div>
                  <div className="fw-bold text-dark" style={{ width: '20px', textAlign: 'right', fontSize: '0.875rem' }}>{dist.count}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border rounded-4 p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold mb-0 text-dark">Promotion recommendations</h6>
              <span className="badge bg-secondary bg-opacity-10 text-secondary rounded-pill">2</span>
            </div>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center text-primary fw-bold" style={{ width: '32px', height: '32px', backgroundColor: '#EFF6FF', fontSize: '0.75rem' }}>PS</div>
                  <div>
                    <div className="fw-medium text-dark small">Priya Sharma — Product</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>Manager</div>
                  </div>
                </div>
                <span className="text-success bg-success bg-opacity-10 fw-bold text-uppercase px-2 py-1 rounded" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>Recommend</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center text-primary fw-bold" style={{ width: '32px', height: '32px', backgroundColor: '#EFF6FF', fontSize: '0.75rem' }}>JD</div>
                  <div>
                    <div className="fw-medium text-dark small">John Doe — Engineering</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>Manager</div>
                  </div>
                </div>
                <span className="text-success bg-success bg-opacity-10 fw-bold text-uppercase px-2 py-1 rounded" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>Recommend</span>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-4 p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0 text-dark">Training needs</h6>
              <span className="badge bg-secondary bg-opacity-10 text-secondary rounded-pill">5</span>
            </div>
            <div className="d-flex flex-column gap-2">
              {[
                "Leadership skills",
                "Advanced Python",
                "",
                "",
                ""
              ].map((need, i) => (
                <div key={i} className="d-flex align-items-center gap-2 py-1">
                  <div className="text-primary"><Book size={14} /></div>
                  <span className="text-dark small">{need}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SummaryScoresTab;
