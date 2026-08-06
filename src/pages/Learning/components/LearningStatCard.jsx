export const LearningStatCard = ({
  icon: Icon,
  value,
  label,
  iconColorClass,
  iconBgClass,
}) => (
  <div className="bg-white border rounded-4 p-4 d-flex align-items-center gap-3 flex-grow-1 lms-stat-card">
    <div
      className={`d-flex align-items-center justify-content-center rounded-3 ${iconColorClass} ${iconBgClass} lms-icon-lg`}
    >
      <Icon size={24} />
    </div>
    <div>
      <div className={`fw-bold mb-1 text-dark lms-font-2xl lh-1`}>{value}</div>
      <div className="text-muted small lms-font-sm">{label}</div>
    </div>
  </div>
);
