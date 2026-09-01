import React, { useState, useEffect } from "react";

import Breadcrumb from "../../components/dashboard/Breadcrumb";
import {
  DollarSign,
  Briefcase,
  TrendingDown,
  FileText,
  Clock,
  Download,
  Info,
} from "lucide-react";
import "./Payroll.css";
import Button from "../../components/common/Button";
import { payrollService } from "../../services";

const Payroll = ({ onTabChange, onNavigateHome }) => {
  const [activeTab, setActiveTab] = useState("Current");
  const [payslips, setPayslips] = useState([]);
  const [selectedSlipIndex, setSelectedSlipIndex] = useState(0);

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const slipsData = await payrollService.getPayslips();
        const rawSlips = Array.isArray(slipsData) 
          ? slipsData 
          : Array.isArray(slipsData?.results) 
          ? slipsData.results 
          : Array.isArray(slipsData?.data) 
          ? slipsData.data 
          : [];
        setPayslips(rawSlips);
      } catch (err) {
        setPayslips([]);
      }
    };
    fetchPayroll();
  }, []);

  const latestSlip = payslips.length > 0 ? payslips[selectedSlipIndex] : null;

  const netMonth = latestSlip ? Number(latestSlip.net_salary || 0).toLocaleString("en-IN") : "0";
  const grossMonth = latestSlip ? Number(latestSlip.gross_salary || 0).toLocaleString("en-IN") : "0";
  const deductionsMonth = latestSlip ? Number(latestSlip.total_deductions || 0).toLocaleString("en-IN") : "0";
  const periodText = latestSlip ? (latestSlip.period_display || `${latestSlip.month}/${latestSlip.year}`) : "No Period";

  return (
    <>
      <div className="dashboard-container">

        <div className="mb-4 d-flex justify-content-between align-items-center">
          <div>
            <Breadcrumb items={["Dashboard", "Payroll"]} />
            <h1 className="page-title m-0">My Payroll</h1>
            <p className="text-muted small m-0 mt-1">
              View salary, payslips, deductions & history
            </p>
          </div>
          {payslips.length > 1 && (
            <select
              className="form-select form-select-sm border-secondary-subtle"
              value={selectedSlipIndex}
              onChange={(e) => setSelectedSlipIndex(Number(e.target.value))}
              style={{ width: "220px" }}
            >
              {payslips.map((slip, idx) => (
                <option key={slip.id || idx} value={idx}>
                  {slip.employee_name || "Payslip"} - {slip.period_display || `${slip.month}/${slip.year}`}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="row g-4 mb-4">
          <div className="col-12 col-md-3">
            <div className="bg-white rounded p-4 shadow-sm h-100 border-top-accent border-top-blue">
              <div className="bg-blue-light text-blue rounded p-2 d-inline-flex mb-3">
                <DollarSign size={18} />
              </div>
              <div
                className="small fw-bold text-muted text-uppercase tracking-wide mb-1"
                style={{ fontSize: "0.65rem" }}
              >
                NET THIS MONTH
              </div>
              <h3 className="fw-bold text-blue mb-1">₹{netMonth}</h3>
              <p
                className="text-muted small m-0"
                style={{ fontSize: "0.75rem" }}
              >
                Period: {periodText}
              </p>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="bg-white rounded p-4 shadow-sm h-100 border-top-accent border-top-green">
              <div className="bg-success-light text-success rounded p-2 d-inline-flex mb-3">
                <Briefcase size={18} />
              </div>
              <div
                className="small fw-bold text-muted text-uppercase tracking-wide mb-1"
                style={{ fontSize: "0.65rem" }}
              >
                GROSS SALARY
              </div>
              <h3 className="fw-bold text-success mb-1">₹{grossMonth}</h3>
              <p
                className="text-muted small m-0"
                style={{ fontSize: "0.75rem" }}
              >
                Total earnings
              </p>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="bg-white rounded p-4 shadow-sm h-100 border-top-accent border-top-red">
              <div className="bg-danger-light text-danger rounded p-2 d-inline-flex mb-3">
                <TrendingDown size={18} />
              </div>
              <div
                className="small fw-bold text-muted text-uppercase tracking-wide mb-1"
                style={{ fontSize: "0.65rem" }}
              >
                TOTAL DEDUCTIONS
              </div>
              <h3 className="fw-bold text-danger mb-1">₹{deductionsMonth}</h3>
              <p
                className="text-muted small m-0"
                style={{ fontSize: "0.75rem" }}
              >
                PF, Tax & Deductions
              </p>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="bg-white rounded p-4 shadow-sm h-100 border-top-accent border-top-yellow">
              <div className="bg-warning-light text-warning rounded p-2 d-inline-flex mb-3">
                <FileText size={18} />
              </div>
              <div
                className="small fw-bold text-muted text-uppercase tracking-wide mb-1"
                style={{ fontSize: "0.65rem" }}
              >
                PAYSLIP STATUS
              </div>
              <h3 className="fw-bold text-warning-dark mb-1 text-capitalize">
                {latestSlip ? (latestSlip.status || "Paid") : "N/A"}
              </h3>
              <p
                className="text-muted small m-0"
                style={{ fontSize: "0.75rem" }}
              >
                {latestSlip ? `ID: #${latestSlip.id}` : "No Slip"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded border shadow-sm mb-4">
          <div className="p-4 border-bottom">
            <h5 className="fw-bold text-dark mb-1">My Payroll</h5>
            <p className="text-muted small m-0">Summary & documents</p>
          </div>

          <div className="d-flex border-bottom px-4 pt-3">
            <div
              className={`pb-3 me-4 pe-2 cursor-pointer d-flex align-items-center ${
                activeTab === "Current"
                  ? "border-2 border-bottom border-blue"
                  : ""
              }`}
              onClick={() => setActiveTab("Current")}
            >
              <Clock
                size={16}
                className={`me-2 ${
                  activeTab === "Current" ? "text-blue" : "text-muted"
                }`}
              />
              <span
                className={`fw-semibold ${
                  activeTab === "Current" ? "text-blue" : "text-muted"
                }`}
              >
                Current
              </span>
            </div>

            <div
              className={`pb-3 me-4 pe-2 cursor-pointer d-flex align-items-center ${
                activeTab === "Payslips"
                  ? "border-2 border-bottom border-blue"
                  : ""
              }`}
              onClick={() => setActiveTab("Payslips")}
            >
              <FileText
                size={16}
                className={`me-2 ${
                  activeTab === "Payslips" ? "text-blue" : "text-muted"
                }`}
              />
              <span
                className={`fw-semibold ${
                  activeTab === "Payslips" ? "text-blue" : "text-muted"
                }`}
              >
                Payslips
              </span>
              <span
                className="badge bg-light text-secondary border rounded-pill ms-2"
                style={{ fontSize: "0.6rem" }}
              >
                {payslips.length}
              </span>
            </div>

            <div
              className={`pb-3 me-4 pe-2 cursor-pointer d-flex align-items-center ${
                activeTab === "Deductions"
                  ? "border-2 border-bottom border-blue"
                  : ""
              }`}
              onClick={() => setActiveTab("Deductions")}
            >
              <TrendingDown
                size={16}
                className={`me-2 ${
                  activeTab === "Deductions" ? "text-blue" : "text-muted"
                }`}
              />
              <span
                className={`fw-semibold ${
                  activeTab === "Deductions" ? "text-blue" : "text-muted"
                }`}
              >
                Deductions
              </span>
            </div>

            <div
              className={`pb-3 me-4 pe-2 cursor-pointer d-flex align-items-center ${
                activeTab === "History"
                  ? "border-2 border-bottom border-blue"
                  : ""
              }`}
              onClick={() => setActiveTab("History")}
            >
              <Clock
                size={16}
                className={`me-2 ${
                  activeTab === "History" ? "text-blue" : "text-muted"
                }`}
              />
              <span
                className={`fw-semibold ${
                  activeTab === "History" ? "text-blue" : "text-muted"
                }`}
              >
                History
              </span>
            </div>
          </div>

          <div className="p-4">

            {activeTab === "Current" && (
              latestSlip ? (
                <div>
                  <div className="row g-4 mb-4">

                    <div className="col-12 col-md-6">
                      <div className="border rounded">
                        <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
                          <span
                            className="small fw-bold text-muted text-uppercase tracking-wide"
                            style={{ fontSize: "0.7rem" }}
                          >
                            EARNINGS BREAKDOWN
                          </span>
                          <span
                            className="badge bg-blue-light text-blue rounded-pill px-2 py-1 fw-semibold"
                            style={{ fontSize: "0.65rem" }}
                          >
                            {periodText}
                          </span>
                        </div>
                        <div className="p-3">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-secondary small d-flex align-items-center">
                              <div className="status-dot bg-success me-2"></div>{" "}
                              Gross Earnings
                            </span>
                            <span className="text-dark small fw-medium">
                              ₹{grossMonth}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center p-3 border-top bg-light">
                          <span className="fw-bold text-dark small">
                            Gross Earnings
                          </span>
                          <span className="fw-bold text-blue small">
                            ₹{grossMonth}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <div className="border rounded">
                        <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
                          <span
                            className="small fw-bold text-muted text-uppercase tracking-wide"
                            style={{ fontSize: "0.7rem" }}
                          >
                            DEDUCTIONS THIS MONTH
                          </span>
                          <span
                            className="badge bg-warning-light text-warning-dark rounded-pill px-2 py-1 fw-semibold"
                            style={{ fontSize: "0.65rem" }}
                          >
                            Applied
                          </span>
                        </div>
                        <div className="p-3">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-secondary small d-flex align-items-center">
                              <div className="status-dot bg-danger me-2"></div>{" "}
                              Total Statutory & Other Deductions
                            </span>
                            <span className="text-dark small fw-medium">
                              ₹{deductionsMonth}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center p-3 border-top bg-light">
                          <span className="fw-bold text-dark small">
                            Total Deductions
                          </span>
                          <span className="fw-bold text-danger small">
                            ₹{deductionsMonth}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue rounded p-4 text-white d-flex justify-content-between align-items-center">
                    <div>
                      <div
                        className="small fw-semibold text-uppercase tracking-wide mb-1"
                        style={{ fontSize: "0.7rem", opacity: 0.9 }}
                      >
                        NET TAKE-HOME SALARY &middot; {periodText.toUpperCase()}
                      </div>
                      <h2 className="fw-bold mb-1">₹{netMonth}</h2>
                      <p
                        className="m-0 small"
                        style={{ opacity: 0.8, fontSize: "0.75rem" }}
                      >
                        Employee: {latestSlip.employee_name || "Employee"} (#{latestSlip.employee_id || "EMP001"})
                      </p>
                    </div>
                    <div className="text-end" style={{ width: "200px" }}>
                      <div
                        className="small mb-2"
                        style={{ fontSize: "0.75rem", opacity: 0.9 }}
                      >
                        Pay Status
                      </div>
                      <span className="badge bg-white text-blue px-3 py-2 fw-bold text-capitalize">
                        {latestSlip.status || "Paid"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-5 text-center text-muted">
                  No current payroll record found in database.
                </div>
              )
            )}

            {activeTab === "Payslips" && (
              <div>
                <div className="bg-blue-light text-blue rounded p-3 mb-4 d-flex align-items-start border border-blue">
                  <Info size={18} className="me-2 mt-1 flex-shrink-0" />
                  <span className="small">
                    Payslips are fetched directly from your organization's API database.
                  </span>
                </div>

                {payslips.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table align-middle">
                      <thead>
                        <tr className="bg-light">
                          <th
                            className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 rounded-start"
                            style={{ fontSize: "0.65rem" }}
                          >
                            SLIP ID
                          </th>
                          <th
                            className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3"
                            style={{ fontSize: "0.65rem" }}
                          >
                            EMPLOYEE
                          </th>
                          <th
                            className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3"
                            style={{ fontSize: "0.65rem" }}
                          >
                            MONTH / PERIOD
                          </th>
                          <th
                            className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3"
                            style={{ fontSize: "0.65rem" }}
                          >
                            GROSS
                          </th>
                          <th
                            className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3"
                            style={{ fontSize: "0.65rem" }}
                          >
                            DEDUCTIONS
                          </th>
                          <th
                            className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3"
                            style={{ fontSize: "0.65rem" }}
                          >
                            NET PAY
                          </th>
                          <th
                            className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3"
                            style={{ fontSize: "0.65rem" }}
                          >
                            STATUS
                          </th>
                          <th
                            className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 text-end rounded-end"
                            style={{ fontSize: "0.65rem" }}
                          >
                            ACTIONS
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {payslips.map((slip, idx) => (
                          <tr key={slip.id || idx}>
                            <td className="text-muted small border-bottom-0 py-3">
                              #{slip.id}
                            </td>
                            <td className="border-bottom-0 py-3">
                              <span className="text-dark small fw-medium">
                                {slip.employee_name || "Employee"}
                              </span>
                            </td>
                            <td className="border-bottom-0 py-3">
                              <span className="text-dark small fw-medium">
                                {slip.period_display || `${slip.month}/${slip.year}`}
                              </span>
                            </td>
                            <td className="text-dark small fw-medium border-bottom-0 py-3">
                              ₹{Number(slip.gross_salary || 0).toLocaleString("en-IN")}
                            </td>
                            <td className="text-muted small border-bottom-0 py-3">
                              ₹{Number(slip.total_deductions || 0).toLocaleString("en-IN")}
                            </td>
                            <td className="text-dark small fw-bold border-bottom-0 py-3">
                              ₹{Number(slip.net_salary || 0).toLocaleString("en-IN")}
                            </td>
                            <td className="border-bottom-0 py-3">
                              <span
                                className={`badge ${
                                  slip.status === "paid" ? "bg-success-light text-success" : "bg-blue-light text-blue"
                                } rounded-pill px-2 py-1 fw-medium text-capitalize`}
                                style={{ fontSize: "0.7rem" }}
                              >
                                {slip.status || "Paid"}
                              </span>
                            </td>
                            <td className="text-end border-bottom-0 py-3">
                              <Button
                                variant="secondary"
                                className="btn btn-sm btn-white border text-muted px-3 d-inline-flex align-items-center"
                                style={{ fontSize: "0.75rem" }}
                              >
                                <Download size={14} className="me-1" /> Download
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-5 text-center text-muted">
                    No payslips found in database.
                  </div>
                )}
              </div>
            )}

            {activeTab === "Deductions" && (
              <div>
                <div className="bg-blue-light text-blue rounded p-3 mb-4 d-flex align-items-start border border-blue">
                  <Info size={18} className="me-2 mt-1 flex-shrink-0" />
                  <span className="small">
                    Deduction summaries calculated directly from live API database records.
                  </span>
                </div>

                {latestSlip ? (
                  <div className="border rounded p-4 bg-white">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: "0.65rem" }}>
                          TOTAL MONTHLY DEDUCTIONS ({periodText})
                        </div>
                        <h4 className="fw-bold text-danger m-0">₹{deductionsMonth}</h4>
                      </div>
                      <div>
                        <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: "0.65rem" }}>
                          GROSS SALARY
                        </div>
                        <h4 className="fw-bold text-dark m-0">₹{grossMonth}</h4>
                      </div>
                      <div>
                        <div className="small fw-bold text-muted text-uppercase tracking-wide mb-1" style={{ fontSize: "0.65rem" }}>
                          TAKE HOME PAY
                        </div>
                        <h4 className="fw-bold text-success m-0">₹{netMonth}</h4>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-5 text-center text-muted">
                    No active deductions found in database.
                  </div>
                )}
              </div>
            )}

            {activeTab === "History" && (
              <div className="text-center py-5 text-muted">
                <Clock size={48} className="mb-3 opacity-50" />
                <h5>Payroll History</h5>
                <p className="small">
                  {payslips.length > 0 
                    ? `Displaying ${payslips.length} historical payroll record(s) from API.` 
                    : "No historical payroll records found in database."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Payroll;
