import React, { useState } from "react";

import Breadcrumb from "../../components/dashboard/Breadcrumb";
import {
  DollarSign,
  Briefcase,
  TrendingDown,
  FileText,
  Clock,
  Download,
  Calendar,
  Info,
  CheckCircle2,
} from "lucide-react";
import "./Payroll.css";
import Button from "../../components/common/Button";

const Payroll = ({ onTabChange, onNavigateHome }) => {
  const [activeTab, setActiveTab] = useState("Current");

  return (
    <>
      <div className="dashboard-container">

        <div className="mb-4">
          <Breadcrumb items={["Dashboard", "Payroll"]} />
          <h1 className="page-title m-0">My Payroll</h1>
          <p className="text-muted small m-0 mt-1">
            View salary, payslips, deductions & history
          </p>
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
              <h3 className="fw-bold text-blue mb-1">₹40,000</h3>
              <p
                className="text-muted small m-0"
                style={{ fontSize: "0.75rem" }}
              >
                After deductions
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
                BASIC SALARY
              </div>
              <h3 className="fw-bold text-success mb-1">₹1,00,000</h3>
              <p
                className="text-muted small m-0"
                style={{ fontSize: "0.75rem" }}
              >
                Per month CTC
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
                ACTIVE DEDUCTIONS
              </div>
              <h3 className="fw-bold text-danger mb-1">₹60,000</h3>
              <p
                className="text-muted small m-0"
                style={{ fontSize: "0.75rem" }}
              >
                2 active &mdash; Loan & Advance
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
                TOTAL ALLOWANCES
              </div>
              <h3 className="fw-bold text-warning-dark mb-1">₹1,200</h3>
              <p
                className="text-muted small m-0"
                style={{ fontSize: "0.75rem" }}
              >
                Total Allowances for this month
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
                5
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
              <span
                className="badge bg-light text-secondary border rounded-pill ms-2"
                style={{ fontSize: "0.6rem" }}
              >
                2
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
                          April 2026
                        </span>
                      </div>
                      <div className="p-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="text-secondary small d-flex align-items-center">
                            <div className="status-dot bg-success me-2"></div>{" "}
                            Basic Salary
                          </span>
                          <span className="text-dark small fw-medium">
                            ₹1,00,000.00
                          </span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="text-secondary small d-flex align-items-center">
                            <div className="status-dot bg-success me-2"></div>{" "}
                            House Rent Allowance
                          </span>
                          <span className="text-muted small">₹0.00</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="text-secondary small d-flex align-items-center">
                            <div className="status-dot bg-success me-2"></div>{" "}
                            Medical Allowance
                          </span>
                          <span className="text-muted small">₹0.00</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="text-secondary small d-flex align-items-center">
                            <div className="status-dot bg-success me-2"></div>{" "}
                            Special Allowance
                          </span>
                          <span className="text-muted small">₹0.00</span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center p-3 border-top bg-light">
                        <span className="fw-bold text-dark small">
                          Gross Earnings
                        </span>
                        <span className="fw-bold text-blue small">
                          ₹1,00,000.00
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
                          2 deductions
                        </span>
                      </div>
                      <div className="p-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="text-secondary small d-flex align-items-center">
                            <div className="status-dot bg-danger me-2"></div>{" "}
                            Provident Fund
                          </span>
                          <span className="text-muted small">₹0.00</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="text-secondary small d-flex align-items-center">
                            <div className="status-dot bg-danger me-2"></div>{" "}
                            Professional Tax
                          </span>
                          <span className="text-muted small">₹0.00</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="text-secondary small d-flex align-items-center">
                            <div className="status-dot bg-danger me-2"></div>{" "}
                            Income Tax (TDS)
                          </span>
                          <span className="text-muted small">₹0.00</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="text-secondary small d-flex align-items-center">
                            <div className="status-dot bg-danger me-2"></div>{" "}
                            Other Deductions
                          </span>
                          <span className="text-dark small fw-medium">
                            ₹60,000.00
                          </span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center p-3 border-top bg-light">
                        <span className="fw-bold text-dark small">
                          Total Deductions
                        </span>
                        <span className="fw-bold text-danger small">
                          ₹60,000.00
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
                      NET TAKE-HOME SALARY &middot; APRIL 2026
                    </div>
                    <h2 className="fw-bold mb-1">₹40,000.00</h2>
                    <p
                      className="m-0 small"
                      style={{ opacity: 0.8, fontSize: "0.75rem" }}
                    >
                      Credited to account ending &middot;&middot;4230
                    </p>
                  </div>
                  <div className="text-end" style={{ width: "200px" }}>
                    <div
                      className="small mb-2"
                      style={{ fontSize: "0.75rem", opacity: 0.9 }}
                    >
                      Pay breakdown
                    </div>
                    <div
                      className="progress mb-2 bg-blue-dark"
                      style={{ height: "6px" }}
                    >
                      <div
                        className="progress-bar bg-white"
                        role="progressbar"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                    <div
                      className="small d-flex align-items-center justify-content-end"
                      style={{ fontSize: "0.7rem", opacity: 0.9 }}
                    >
                      <div className="status-dot bg-white me-2"></div> Basic
                      (100%)
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Payslips" && (
              <div>
                <div className="bg-blue-light text-blue rounded p-3 mb-4 d-flex align-items-start border border-blue">
                  <Info size={18} className="me-2 mt-1 flex-shrink-0" />
                  <span className="small">
                    Payslips are generated by HR at the end of each pay period.
                    Download a PDF copy for your records.
                  </span>
                </div>

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
                          MONTH
                        </th>
                        <th
                          className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3"
                          style={{ fontSize: "0.65rem" }}
                        >
                          BASIC
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
                      <tr>
                        <td className="text-muted small border-bottom-0 py-3">
                          #16
                        </td>
                        <td className="border-bottom-0 py-3">
                          <div className="d-flex align-items-center">
                            <div
                              className="bg-blue-light text-blue rounded fw-bold d-flex justify-content-center align-items-center me-2"
                              style={{
                                width: 24,
                                height: 24,
                                fontSize: "0.75rem",
                              }}
                            >
                              1
                            </div>
                            <span className="text-dark small fw-medium">
                              January 2026
                            </span>
                          </div>
                        </td>
                        <td className="text-dark small fw-medium border-bottom-0 py-3">
                          1,00,000
                        </td>
                        <td className="text-muted small border-bottom-0 py-3">
                          10,000
                        </td>
                        <td className="text-dark small fw-bold border-bottom-0 py-3">
                          90,000
                        </td>
                        <td className="border-bottom-0 py-3">
                          <span
                            className="badge bg-blue-light text-blue rounded-pill px-2 py-1 fw-medium d-inline-flex align-items-center gap-1"
                            style={{ fontSize: "0.7rem" }}
                          >
                            <div className="status-dot bg-blue"></div> Generated
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
                      <tr>
                        <td className="text-muted small border-bottom-0 py-3">
                          #16
                        </td>
                        <td className="border-bottom-0 py-3">
                          <div className="d-flex align-items-center">
                            <div
                              className="bg-blue-light text-blue rounded fw-bold d-flex justify-content-center align-items-center me-2"
                              style={{
                                width: 24,
                                height: 24,
                                fontSize: "0.75rem",
                              }}
                            >
                              1
                            </div>
                            <span className="text-dark small fw-medium">
                              January 2026
                            </span>
                          </div>
                        </td>
                        <td className="text-dark small fw-medium border-bottom-0 py-3">
                          1,00,000
                        </td>
                        <td className="text-muted small border-bottom-0 py-3">
                          10,000
                        </td>
                        <td className="text-dark small fw-bold border-bottom-0 py-3">
                          90,000
                        </td>
                        <td className="border-bottom-0 py-3">
                          <span
                            className="badge bg-blue-light text-blue rounded-pill px-2 py-1 fw-medium d-inline-flex align-items-center gap-1"
                            style={{ fontSize: "0.7rem" }}
                          >
                            <div className="status-dot bg-blue"></div> Generated
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
                      <tr>
                        <td className="text-muted small border-bottom-0 py-3">
                          #9
                        </td>
                        <td className="border-bottom-0 py-3">
                          <div className="d-flex align-items-center">
                            <div
                              className="bg-blue-light text-blue rounded fw-bold d-flex justify-content-center align-items-center me-2"
                              style={{
                                width: 24,
                                height: 24,
                                fontSize: "0.75rem",
                              }}
                            >
                              11
                            </div>
                            <span className="text-dark small fw-medium">
                              November 2025
                            </span>
                          </div>
                        </td>
                        <td className="text-dark small fw-medium border-bottom-0 py-3">
                          1,00,000
                        </td>
                        <td className="text-muted small border-bottom-0 py-3">
                          10,000
                        </td>
                        <td className="text-dark small fw-bold border-bottom-0 py-3">
                          90,000
                        </td>
                        <td className="border-bottom-0 py-3">
                          <span
                            className="badge bg-success-light text-success rounded-pill px-2 py-1 fw-medium d-inline-flex align-items-center gap-1"
                            style={{ fontSize: "0.7rem" }}
                          >
                            <div className="status-dot bg-success"></div> Paid
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
                      <tr>
                        <td className="text-muted small border-bottom-0 py-3">
                          #16
                        </td>
                        <td className="border-bottom-0 py-3">
                          <div className="d-flex align-items-center">
                            <div
                              className="bg-blue-light text-blue rounded fw-bold d-flex justify-content-center align-items-center me-2"
                              style={{
                                width: 24,
                                height: 24,
                                fontSize: "0.75rem",
                              }}
                            >
                              1
                            </div>
                            <span className="text-dark small fw-medium">
                              January 2026
                            </span>
                          </div>
                        </td>
                        <td className="text-dark small fw-medium border-bottom-0 py-3">
                          1,00,000
                        </td>
                        <td className="text-muted small border-bottom-0 py-3">
                          10,000
                        </td>
                        <td className="text-dark small fw-bold border-bottom-0 py-3">
                          90,000
                        </td>
                        <td className="border-bottom-0 py-3">
                          <span
                            className="badge bg-blue-light text-blue rounded-pill px-2 py-1 fw-medium d-inline-flex align-items-center gap-1"
                            style={{ fontSize: "0.7rem" }}
                          >
                            <div className="status-dot bg-blue"></div> Generated
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
                      <tr>
                        <td className="text-muted small py-3">#16</td>
                        <td className="py-3">
                          <div className="d-flex align-items-center">
                            <div
                              className="bg-blue-light text-blue rounded fw-bold d-flex justify-content-center align-items-center me-2"
                              style={{
                                width: 24,
                                height: 24,
                                fontSize: "0.75rem",
                              }}
                            >
                              1
                            </div>
                            <span className="text-dark small fw-medium">
                              January 2026
                            </span>
                          </div>
                        </td>
                        <td className="text-dark small fw-medium py-3">
                          1,00,000
                        </td>
                        <td className="text-muted small py-3">10,000</td>
                        <td className="text-dark small fw-bold py-3">90,000</td>
                        <td className="py-3">
                          <span
                            className="badge bg-blue-light text-blue rounded-pill px-2 py-1 fw-medium d-inline-flex align-items-center gap-1"
                            style={{ fontSize: "0.7rem" }}
                          >
                            <div className="status-dot bg-blue"></div> Generated
                          </span>
                        </td>
                        <td className="text-end py-3">
                          <Button
                            variant="secondary"
                            className="btn btn-sm btn-white border text-muted px-3 d-inline-flex align-items-center"
                            style={{ fontSize: "0.75rem" }}
                          >
                            <Download size={14} className="me-1" /> Download
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "Deductions" && (
              <div>
                <div className="bg-blue-light text-blue rounded p-3 mb-4 d-flex align-items-start border border-blue">
                  <Info size={18} className="me-2 mt-1 flex-shrink-0" />
                  <span className="small">
                    These deductions are applied to your monthly salary. Contact
                    HR to modify or close any active deduction.
                  </span>
                </div>

                <div className="row g-4 mb-4">

                  <div className="col-12 col-md-6">
                    <div className="border rounded h-100 d-flex flex-column">
                      <div className="p-4 flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start mb-4">
                          <div>
                            <h6 className="fw-bold text-dark m-0 mb-1">LOAN</h6>
                            <span
                              className="text-muted small"
                              style={{ fontSize: "0.75rem" }}
                            >
                              Deduction ID: #3
                            </span>
                          </div>
                          <span
                            className="badge bg-success-light text-success border border-success rounded-pill px-2 py-1 fw-medium d-inline-flex align-items-center gap-1"
                            style={{ fontSize: "0.7rem" }}
                          >
                            <div className="status-dot bg-success"></div> Active
                          </span>
                        </div>

                        <div className="mb-4">
                          <div className="d-flex justify-content-between mb-1">
                            <span
                              className="text-muted small"
                              style={{ fontSize: "0.75rem" }}
                            >
                              Repayment Progress
                            </span>
                            <span
                              className="text-warning-dark small fw-bold"
                              style={{ fontSize: "0.75rem" }}
                            >
                              0% paid
                            </span>
                          </div>
                          <div
                            className="progress bg-light"
                            style={{ height: "6px" }}
                          >
                            <div
                              className="progress-bar bg-warning"
                              role="progressbar"
                              style={{ width: "0%" }}
                            ></div>
                          </div>
                        </div>

                        <div className="row g-3">
                          <div className="col-6">
                            <div className="border rounded p-3 text-center">
                              <div
                                className="small fw-bold text-muted text-uppercase tracking-wide mb-2"
                                style={{ fontSize: "0.65rem" }}
                              >
                                TOTAL AMOUNT
                              </div>
                              <div className="fw-bold text-dark">45,000</div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="border rounded p-3 text-center">
                              <div
                                className="small fw-bold text-muted text-uppercase tracking-wide mb-2"
                                style={{ fontSize: "0.65rem" }}
                              >
                                REMAINING
                              </div>
                              <div className="fw-bold text-warning-dark">
                                45,000
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="border rounded p-3 text-center">
                              <div
                                className="small fw-bold text-muted text-uppercase tracking-wide mb-2"
                                style={{ fontSize: "0.65rem" }}
                              >
                                MONTHLY EMI
                              </div>
                              <div className="fw-bold text-dark">5,000</div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="border rounded p-3 text-center">
                              <div
                                className="small fw-bold text-muted text-uppercase tracking-wide mb-2"
                                style={{ fontSize: "0.65rem" }}
                              >
                                INSTALMENTS LEFT
                              </div>
                              <div className="fw-bold text-warning-dark">9</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="bg-light p-3 border-top text-muted small d-flex align-items-center"
                        style={{ fontSize: "0.75rem" }}
                      >
                        <Calendar size={14} className="me-2" /> Dec 2024 &rarr;
                        Sep 2025
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="border rounded h-100 d-flex flex-column">
                      <div className="p-4 flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start mb-4">
                          <div>
                            <h6 className="fw-bold text-dark m-0 mb-1">
                              ADVANCE
                            </h6>
                            <span
                              className="text-muted small"
                              style={{ fontSize: "0.75rem" }}
                            >
                              Deduction ID: #2
                            </span>
                          </div>
                          <span
                            className="badge bg-success-light text-success border border-success rounded-pill px-2 py-1 fw-medium d-inline-flex align-items-center gap-1"
                            style={{ fontSize: "0.7rem" }}
                          >
                            <div className="status-dot bg-success"></div> Active
                          </span>
                        </div>

                        <div className="mb-4">
                          <div className="d-flex justify-content-between mb-1">
                            <span
                              className="text-muted small"
                              style={{ fontSize: "0.75rem" }}
                            >
                              Repayment Progress
                            </span>
                            <span
                              className="text-warning-dark small fw-bold"
                              style={{ fontSize: "0.75rem" }}
                            >
                              0% paid
                            </span>
                          </div>
                          <div
                            className="progress bg-light"
                            style={{ height: "6px" }}
                          >
                            <div
                              className="progress-bar bg-warning"
                              role="progressbar"
                              style={{ width: "0%" }}
                            ></div>
                          </div>
                        </div>

                        <div className="row g-3">
                          <div className="col-6">
                            <div className="border rounded p-3 text-center">
                              <div
                                className="small fw-bold text-muted text-uppercase tracking-wide mb-2"
                                style={{ fontSize: "0.65rem" }}
                              >
                                TOTAL AMOUNT
                              </div>
                              <div className="fw-bold text-dark">15,000</div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="border rounded p-3 text-center">
                              <div
                                className="small fw-bold text-muted text-uppercase tracking-wide mb-2"
                                style={{ fontSize: "0.65rem" }}
                              >
                                REMAINING
                              </div>
                              <div className="fw-bold text-warning-dark">
                                15,000
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="border rounded p-3 text-center">
                              <div
                                className="small fw-bold text-muted text-uppercase tracking-wide mb-2"
                                style={{ fontSize: "0.65rem" }}
                              >
                                MONTHLY EMI
                              </div>
                              <div className="fw-bold text-dark">5,000</div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="border rounded p-3 text-center">
                              <div
                                className="small fw-bold text-muted text-uppercase tracking-wide mb-2"
                                style={{ fontSize: "0.65rem" }}
                              >
                                INSTALMENTS LEFT
                              </div>
                              <div className="fw-bold text-warning-dark">3</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="bg-light p-3 border-top text-muted small d-flex align-items-center"
                        style={{ fontSize: "0.75rem" }}
                      >
                        <Calendar size={14} className="me-2" /> Nov 2024 &rarr;
                        Jan 2025
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded p-4 d-flex justify-content-between align-items-center bg-white">
                  <div className="d-flex gap-5">
                    <div>
                      <div
                        className="small fw-bold text-muted text-uppercase tracking-wide mb-1"
                        style={{ fontSize: "0.65rem" }}
                      >
                        TOTAL OUTSTANDING
                      </div>
                      <h5 className="fw-bold text-danger m-0">₹60,000.00</h5>
                    </div>
                    <div>
                      <div
                        className="small fw-bold text-muted text-uppercase tracking-wide mb-1"
                        style={{ fontSize: "0.65rem" }}
                      >
                        MONTHLY DEDUCTION
                      </div>
                      <h5 className="fw-bold text-warning-dark m-0">
                        ₹10,000.00
                      </h5>
                    </div>
                    <div>
                      <div
                        className="small fw-bold text-muted text-uppercase tracking-wide mb-1"
                        style={{ fontSize: "0.65rem" }}
                      >
                        ACTIVE DEDUCTIONS
                      </div>
                      <h5 className="fw-bold text-dark m-0">2</h5>
                    </div>
                  </div>
                  <div
                    className="text-muted small text-end"
                    style={{ fontSize: "0.75rem" }}
                  >
                    EMIs are auto-deducted each month.
                    <br />
                    Contact HR if you have any disputes.
                  </div>
                </div>
              </div>
            )}

            {activeTab === "History" && (
              <div className="text-center py-5 text-muted">
                <Clock size={48} className="mb-3 opacity-50" />
                <h5>Payroll History</h5>
                <p className="small">
                  Your historical payroll changes will appear here.
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
