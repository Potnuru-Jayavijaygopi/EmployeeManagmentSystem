import React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import "./MetricCard.css";

const MetricCard = ({
  value,
  title,
  subtitle,
  icon: Icon,
  statusColor = "blue",
  statusIcon = null,
}) => {
  return (
    <div className="dashboard-metric-card">
      <div className="metric-header">
        <span className={`metric-value text-${statusColor}`}>{value}</span>
        {Icon && (
          <div
            className={`metric-icon-box bg-${statusColor}-light text-${statusColor}`}
          >
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="metric-title">{title}</div>

      <div className={`metric-subtitle text-${statusColor}`}>
        {statusIcon === "check" && <CheckCircle2 size={12} className="me-1" />}
        {statusIcon === "alert" && <AlertCircle size={12} className="me-1" />}
        {subtitle}
      </div>
    </div>
  );
};

export default MetricCard;
