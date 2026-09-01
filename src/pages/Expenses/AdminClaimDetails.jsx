import React, { useState } from "react";
import Button from "../../components/common/Button";

import {
  ArrowLeft,
  Calendar,
  Paperclip,
  CheckCircle2,
  XCircle,
  Clock,
  Check,
  FileText,
  Upload,
} from "lucide-react";
import "./AdminClaimDetails.css";
import Breadcrumb from "../../components/dashboard/Breadcrumb";
import { expenseService } from "../../services";

const AdminClaimDetails = ({ claim, onBack }) => {
  const normStatus = (status) => {
    if (!status) return 'Submitted';
    const s = String(status).toUpperCase();
    if (s === 'APPROVED') return 'Approved';
    if (s === 'REJECTED') return 'Rejected';
    if (s === 'REIMBURSED') return 'Reimbursed';
    if (s === 'UNDER_REVIEW') return 'Under Review';
    if (s === 'SUBMITTED') return 'Submitted';
    if (s === 'DRAFT') return 'Draft';
    return status;
  };

  const statusStr = normStatus(claim?.status);
  const [currentStatus, setCurrentStatus] = useState(statusStr);

  const handleStatusChange = async (newStatus) => {
    setCurrentStatus(newStatus);
    if (claim && claim.id) {
      try {
        await expenseService.updateClaimStatus(claim.id, newStatus);
      } catch (err) {
        console.warn("API Claim status update fallback:", err);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Submitted":
        return { text: "#3b82f6", bg: "#eff6ff" };
      case "Under Review":
        return { text: "#f97316", bg: "#fff7ed" };
      case "Approved":
        return { text: "#16a34a", bg: "#f0fdf4" };
      case "Rejected":
        return { text: "#ef4444", bg: "#fef2f2" };
      case "Reimbursed":
        return { text: "#8b5cf6", bg: "#f3e8ff" };
      default:
        return { text: "#6b7280", bg: "#f3f4f6" };
    }
  };

  const statusStyle = getStatusColor(currentStatus);

  let isUnderReview =
    currentStatus === "Under Review" ||
    currentStatus === "Approved" ||
    currentStatus === "Reimbursed" ||
    currentStatus === "Rejected";
  let isApproved = currentStatus === "Approved" || currentStatus === "Reimbursed";
  let isReimbursed = currentStatus === "Reimbursed";
  let isRejected = currentStatus === "Rejected";

  const empName = claim?.employee_name || claim?.name || claim?.user_name || 'Brahma Admin';
  const initials = empName.split(' ').map(n => n[0]).join('').substring(0, 2);
  const dept = claim?.department || claim?.dept || 'Engineering';
  const amountFormatted = claim?.amount ? `₹${Number(claim.amount).toLocaleString('en-IN')}` : (claim?.amount || '₹0.00');
  const categoryName = claim?.category_name || claim?.category || 'General';
  const expenseDate = claim?.expense_date || claim?.date || '01 Jan 2026';
  const description = claim?.description || claim?.desc || claim?.title || 'Expense claim details';

  return (
    <div className="admin-claim-details px-4 py-3">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <Breadcrumb items={['Dashboard', 'Expenses']} />
          <h3 className="fw-bold mt-2 mb-1">Claim Details</h3>
          <p className="text-muted small">
            Full breakdown of this expense claim
          </p>
        </div>
        <Button
          variant="outline"
          className="btn btn-white border d-flex align-items-center gap-2 px-3 fw-medium"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          Back to Claims
        </Button>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-8">

          <div className="bg-white rounded-4 border shadow-sm p-4 mb-4">
            <div className="d-flex justify-content-between align-items-start mb-5 border-bottom pb-4">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="avatar-lg rounded-3 d-flex justify-content-center align-items-center text-white bg-primary"
                  style={{
                    width: 56,
                    height: 56,
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  {initials}
                </div>
                <div>
                  <h5 className="m-0 fw-bold text-dark">{empName}</h5>
                  <p className="m-0 text-muted small">{dept}</p>
                </div>
              </div>
              <div
                className="badge rounded-pill px-3 py-2 fw-semibold"
                style={{
                  backgroundColor: statusStyle.bg,
                  color: statusStyle.text,
                }}
              >
                {currentStatus}
              </div>
            </div>

            <div className="row mb-5">
              <div className="col-6">
                <p
                  className="text-muted small fw-bold text-uppercase mb-2"
                  style={{ letterSpacing: "0.05em", fontSize: "0.65rem" }}
                >
                  CLAIM AMOUNT
                </p>
                <h3 className="fw-bold text-primary mb-0">{amountFormatted}</h3>
              </div>
              <div className="col-6">
                <p
                  className="text-muted small fw-bold text-uppercase mb-2"
                  style={{ letterSpacing: "0.05em", fontSize: "0.65rem" }}
                >
                  CATEGORY
                </p>
                <span className="badge bg-light text-dark border px-3 py-2 fw-medium">
                  {categoryName}
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <p
                  className="text-muted small fw-bold text-uppercase mb-2"
                  style={{ letterSpacing: "0.05em", fontSize: "0.65rem" }}
                >
                  EXPENSE DATE
                </p>
                <div className="d-flex align-items-center gap-2 fw-medium text-dark">
                  <Calendar size={16} className="text-muted" />
                  {expenseDate}
                </div>
              </div>
              <div className="col-6">
                <p
                  className="text-muted small fw-bold text-uppercase mb-2"
                  style={{ letterSpacing: "0.05em", fontSize: "0.65rem" }}
                >
                  RECEIPT
                </p>
                <div className="d-flex align-items-center gap-2 fw-medium text-muted">
                  <Paperclip size={16} />
                  {claim?.requires_receipt || claim?.receiptType
                    ? "receipt_attached.pdf"
                    : "No receipt uploaded"}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-4 border shadow-sm p-4">
            <p
              className="text-muted small fw-bold text-uppercase mb-3"
              style={{ letterSpacing: "0.05em", fontSize: "0.65rem" }}
            >
              DESCRIPTION / NOTES
            </p>
            <div
              className="bg-light rounded-3 p-4 text-dark border"
              style={{ minHeight: "100px" }}
            >
              {description}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">

          <div className="bg-white rounded-4 border shadow-sm p-4 mb-4">
            <h6 className="fw-bold mb-3 text-dark">Quick Actions</h6>

            {currentStatus === "Under Review" || currentStatus === "Submitted" ? (
              <div className="d-flex flex-column gap-2">
                <Button
                  className="btn w-100 rounded-3 py-2 fw-medium d-flex align-items-center justify-content-center gap-2"
                  style={{
                    backgroundColor: "#f0fdf4",
                    color: "#16a34a",
                    border: "1px solid #16a34a",
                  }}
                  onClick={() => handleStatusChange('Approved')}
                >
                  <CheckCircle2 size={16} />
                  Approve Claim
                </Button>
                <Button
                  className="btn w-100 rounded-3 py-2 fw-medium d-flex align-items-center justify-content-center gap-2"
                  style={{
                    backgroundColor: "#fef2f2",
                    color: "#ef4444",
                    border: "1px solid #ef4444",
                  }}
                  onClick={() => handleStatusChange('Rejected')}
                >
                  <XCircle size={16} />
                  Reject Claim
                </Button>
              </div>
            ) : currentStatus === "Approved" ? (
              <div className="d-flex flex-column gap-2">
                <Button
                  className="btn w-100 rounded-3 py-2 fw-medium d-flex align-items-center justify-content-center gap-2"
                  style={{
                    backgroundColor: "#f3e8ff",
                    color: "#8b5cf6",
                    border: "1px solid #8b5cf6",
                  }}
                  onClick={() => handleStatusChange('Reimbursed')}
                >
                  <Check size={16} />
                  Reimbursed
                </Button>
              </div>
            ) : currentStatus === "Rejected" ? (
              <div className="d-flex flex-column gap-2">
                <Button
                  className="btn w-100 rounded-3 py-2 fw-medium d-flex align-items-center justify-content-center gap-2"
                  style={{
                    backgroundColor: "#f0fdf4",
                    color: "#16a34a",
                    border: "1px solid #16a34a",
                  }}
                  onClick={() => handleStatusChange('Approved')}
                >
                  <CheckCircle2 size={16} />
                  Approve Claim
                </Button>
              </div>
            ) : (
              <div className="text-center text-muted small py-2">
                No actions available for reimbursed claims.
              </div>
            )}
          </div>

          <div className="bg-white rounded-4 border shadow-sm p-4">
            <h6 className="fw-bold mb-4 text-dark">Claim Timeline</h6>

            <div className="timeline-container">

              <div className="timeline-item d-flex gap-3 mb-4 position-relative">
                <div className="timeline-line"></div>
                <div
                  className="timeline-icon bg-blue-light text-primary d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: "#eff6ff",
                    zIndex: 2,
                  }}
                >
                  <Upload size={14} />
                </div>
                <div>
                  <h6
                    className="m-0 fw-bold text-dark"
                    style={{ fontSize: "0.85rem" }}
                  >
                    Claim Submitted
                  </h6>
                  <p className="m-0 text-muted" style={{ fontSize: "0.75rem" }}>
                    {claim.date}
                  </p>
                </div>
              </div>

              <div className="timeline-item d-flex gap-3 mb-4 position-relative">
                <div className="timeline-line"></div>
                <div
                  className={`timeline-icon d-flex align-items-center justify-content-center rounded-circle ${
                    isUnderReview ? "text-warning" : "text-muted"
                  }`}
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: isUnderReview ? "#fff7ed" : "#f3f4f6",
                    zIndex: 2,
                  }}
                >
                  <Clock
                    size={14}
                    color={isUnderReview ? "#f97316" : "#9ca3af"}
                  />
                </div>
                <div>
                  <h6
                    className={`m-0 fw-bold ${
                      isUnderReview ? "text-dark" : "text-muted"
                    }`}
                    style={{ fontSize: "0.85rem" }}
                  >
                    Under Review
                  </h6>
                  <p className="m-0 text-muted" style={{ fontSize: "0.75rem" }}>
                    {isUnderReview ? "In progress" : "Waiting"}
                  </p>
                </div>
              </div>

              <div className="timeline-item d-flex gap-3 mb-4 position-relative">
                <div className="timeline-line"></div>
                <div
                  className={`timeline-icon d-flex align-items-center justify-content-center rounded-circle`}
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: isApproved
                      ? "#f0fdf4"
                      : isRejected
                      ? "#fef2f2"
                      : "#f3f4f6",
                    zIndex: 2,
                  }}
                >
                  {isRejected ? (
                    <XCircle size={14} color="#ef4444" />
                  ) : (
                    <Check
                      size={14}
                      color={isApproved ? "#16a34a" : "#9ca3af"}
                    />
                  )}
                </div>
                <div>
                  <h6
                    className={`m-0 fw-bold ${
                      isApproved || isRejected ? "text-dark" : "text-muted"
                    }`}
                    style={{ fontSize: "0.85rem" }}
                  >
                    {isRejected ? "Rejected" : "Approved"}
                  </h6>
                  <p className="m-0 text-muted" style={{ fontSize: "0.75rem" }}>
                    {isApproved || isRejected ? "Completed" : "Waiting"}
                  </p>
                </div>
              </div>

              <div className="timeline-item d-flex gap-3 position-relative">
                <div
                  className={`timeline-icon d-flex align-items-center justify-content-center rounded-circle`}
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: isReimbursed ? "#f3e8ff" : "#f3f4f6",
                    zIndex: 2,
                  }}
                >
                  <FileText
                    size={14}
                    color={isReimbursed ? "#8b5cf6" : "#9ca3af"}
                  />
                </div>
                <div>
                  <h6
                    className={`m-0 fw-bold ${
                      isReimbursed ? "text-dark" : "text-muted"
                    }`}
                    style={{ fontSize: "0.85rem" }}
                  >
                    Reimbursed
                  </h6>
                  <p className="m-0 text-muted" style={{ fontSize: "0.75rem" }}>
                    {isReimbursed ? "Completed" : "Waiting"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClaimDetails;
