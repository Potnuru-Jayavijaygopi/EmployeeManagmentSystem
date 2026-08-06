import { useState } from "react";

import Button from "../../components/common/Button";
import {
  Plus,
  UserPlus,
  FileText,
  ArrowLeft,
  ArrowRight,
  Check,
  Info,
  Image as ImageIcon,
  ChevronDown,
  Trash2,
  Download,
  Users,
  DollarSign,
  TrendingDown,
  Clock,
  AlertTriangle,
  Play,
  Calendar,
  Minus,
  Shield,
  File,
  X,
  Edit,
  PlayCircle,
  CreditCard,
  Search,
  Send,
  CheckCircle,
  Landmark,
  Loader2,
  Percent,
} from "lucide-react";
import "./AdminPayroll.css";
import Breadcrumb from "../../components/dashboard/Breadcrumb";
import { employeesData } from "../../data/employeesData";

const AssignSalaryStructure = ({ onCancel }) => (
  <div className="fade-in">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <Breadcrumb items={["Dashboard", "Payroll"]} />
        <h3 className="fw-bold mt-2 mb-1">Assign Salary Structure</h3>
        <p className="text-muted small">
          Assign a salary structure to one or more employees.
        </p>
      </div>
      <div className="d-flex gap-3">
        <Button
          variant="outline"
          className="btn btn-white border px-4 fw-medium"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className="btn btn-primary bg-blue border-0 px-4 fw-medium d-flex align-items-center gap-2"
        >
          <Check size={16} /> Assign & Save
        </Button>
      </div>
    </div>

    <div className="row g-4">
      <div className="col-12 col-lg-7">
        <div className="payroll-card p-4">
          <h6 className="fw-bold mb-4">Assignment Details</h6>

          <div className="mb-4">
            <label className="payroll-form-label">Select Employee(s)</label>
            <div className="position-relative">
              <input
                type="text"
                className="payroll-form-control w-100"
                defaultValue="Srinivas Kandagatla — EMP011"
              />
              <ChevronDown
                size={16}
                className="position-absolute text-muted"
                style={{ right: "12px", top: "12px" }}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="payroll-form-label">Salary Structure</label>
            <div className="position-relative">
              <input
                type="text"
                className="payroll-form-control w-100"
                defaultValue="Junior Developer L1 — ₹43,000 net"
              />
              <ChevronDown
                size={16}
                className="position-absolute text-muted"
                style={{ right: "12px", top: "12px" }}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="payroll-form-label">Effective Date</label>
            <input
              type="date"
              className="payroll-form-control w-100 text-muted"
              defaultValue="2026-04-01"
            />
          </div>

          <div className="mb-4">
            <label className="payroll-form-label">Notes (optional)</label>
            <textarea
              className="payroll-form-control w-100"
              rows="3"
              placeholder="Reason for assignment or revision..."
            ></textarea>
          </div>

          <div
            className="d-flex gap-2 p-3 bg-blue-light text-blue rounded-3"
            style={{
              backgroundColor: "#eff6ff",
              color: "#1e40af",
              border: "1px solid #bfdbfe",
            }}
          >
            <Info size={18} className="flex-shrink-0 mt-1" />
            <span className="small">
              Assigning a new structure will override the existing structure
              from the effective date. Previous payroll is not affected.
            </span>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-5">
        <div className="payroll-card p-4 h-100">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6 className="fw-bold m-0">Structure Preview</h6>
            <span className="badge bg-light text-primary border rounded-pill px-3 py-1">
              Junior Developer L1
            </span>
          </div>

          <div className="structure-preview-row">
            <span className="text-muted">Basic Salary</span>
            <span className="fw-bold">₹30,000</span>
          </div>
          <div className="structure-preview-row">
            <span className="text-muted">HRA</span>
            <span className="fw-bold text-success-green">+ ₹12,000</span>
          </div>
          <div className="structure-preview-row border-bottom">
            <span className="text-muted">Transport</span>
            <span className="fw-bold text-success-green">+ ₹3,000</span>
          </div>

          <div className="structure-preview-row mt-3">
            <span className="text-muted">PF Deduction</span>
            <span className="fw-bold text-danger-red">- ₹3,600</span>
          </div>
          <div className="structure-preview-row border-bottom">
            <span className="text-muted">TDS</span>
            <span className="fw-bold text-danger-red">- ₹1,200</span>
          </div>

          <div className="net-pay-box">
            <span className="net-pay-label">Net Pay / Month</span>
            <span className="net-pay-value">₹43,000</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CreateSalaryStructure = ({ onCancel }) => (
  <div className="fade-in">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <Breadcrumb items={["Dashboard", "Payroll"]} />
        <h3 className="fw-bold mt-2 mb-1">Create Salary Structure</h3>
        <p className="text-muted small">
          Define all salary components for a pay grade.
        </p>
      </div>
      <div className="d-flex gap-3">
        <Button
          variant="outline"
          className="btn btn-white border px-4 fw-medium"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className="btn btn-primary bg-blue border-0 px-4 fw-medium d-flex align-items-center gap-2"
        >
          <Check size={16} /> Save Structure
        </Button>
      </div>
    </div>

    <div className="row g-4">
      <div className="col-12 col-lg-8">

        <div className="payroll-card p-4 mb-4">
          <h6 className="fw-bold mb-4">Basic Information</h6>
          <div className="mb-4">
            <label className="payroll-form-label">Structure Name</label>
            <input
              type="text"
              className="payroll-form-control w-100"
              placeholder="e.g. Junior Developer L1"
            />
          </div>
          <div className="row g-3 mb-4">
            <div className="col-6">
              <label className="payroll-form-label">Pay Grade</label>
              <div className="position-relative">
                <input
                  type="text"
                  className="payroll-form-control w-100"
                  defaultValue="Junior (L1-L2)"
                />
                <ChevronDown
                  size={16}
                  className="position-absolute text-muted"
                  style={{ right: "12px", top: "12px" }}
                />
              </div>
            </div>
            <div className="col-6">
              <label className="payroll-form-label">Currency</label>
              <input
                type="text"
                className="payroll-form-control w-100"
                defaultValue="INR (₹)"
                disabled
              />
            </div>
          </div>
          <div className="row g-3">
            <div className="col-6">
              <label className="payroll-form-label">Effective From</label>
              <input
                type="date"
                className="payroll-form-control w-100 text-muted"
                defaultValue="2026-04-01"
              />
            </div>
            <div className="col-6">
              <label className="payroll-form-label">Pay Frequency</label>
              <div className="position-relative">
                <input
                  type="text"
                  className="payroll-form-control w-100"
                  defaultValue="Monthly"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <div className="payroll-card p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6 className="fw-bold m-0">Earnings Components</h6>
            <Button
              variant="outline"
              className="btn btn-sm btn-white border d-flex align-items-center gap-1"
            >
              <Plus size={14} /> Add Row
            </Button>
          </div>
          <table className="structure-table w-100">
            <thead>
              <tr>
                <th width="30%">COMPONENT</th>
                <th width="25%">TYPE</th>
                <th width="30%">AMOUNT / %</th>
                <th width="15%" className="text-center">
                  TAXABLE
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    className="payroll-form-control w-100"
                    defaultValue="Basic Salary"
                  />
                </td>
                <td>
                  <div className="position-relative">
                    <select className="payroll-form-control w-100 appearance-none bg-white text-dark border">
                      <option>Fixed</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="position-absolute text-muted"
                      style={{ right: "10px", top: "12px" }}
                    />
                  </div>
                </td>
                <td>
                  <div className="component-input">
                    <div className="component-prefix">₹</div>
                    <input type="text" defaultValue="30,000" />
                  </div>
                </td>
                <td className="text-center">
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </td>
                <td className="text-center">
                  <Trash2 size={16} className="text-muted cursor-pointer" />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    className="payroll-form-control w-100"
                    defaultValue="HRA"
                  />
                </td>
                <td>
                  <div className="position-relative">
                    <select className="payroll-form-control w-100 appearance-none bg-white text-dark border">
                      <option>% of Basic</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="position-absolute text-muted"
                      style={{ right: "10px", top: "12px" }}
                    />
                  </div>
                </td>
                <td>
                  <div className="component-input">
                    <div className="component-prefix">%</div>
                    <input type="text" defaultValue="40" />
                  </div>
                </td>
                <td className="text-center">
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="toggle-slider"></span>
                  </label>
                </td>
                <td className="text-center">
                  <Trash2 size={16} className="text-muted cursor-pointer" />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    className="payroll-form-control w-100"
                    defaultValue="Transport Allowance"
                  />
                </td>
                <td>
                  <div className="position-relative">
                    <select className="payroll-form-control w-100 appearance-none bg-white text-dark border">
                      <option>Fixed</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="position-absolute text-muted"
                      style={{ right: "10px", top: "12px" }}
                    />
                  </div>
                </td>
                <td>
                  <div className="component-input">
                    <div className="component-prefix">₹</div>
                    <input type="text" defaultValue="3,000" />
                  </div>
                </td>
                <td className="text-center">
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="toggle-slider"></span>
                  </label>
                </td>
                <td className="text-center">
                  <Trash2 size={16} className="text-muted cursor-pointer" />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    className="payroll-form-control w-100 bg-light border-0"
                    placeholder="-"
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="payroll-form-control w-100 bg-light border-0"
                    placeholder="-"
                    disabled
                  />
                </td>
                <td>
                  <div className="component-input bg-light opacity-50">
                    <div className="component-prefix">%</div>
                    <input
                      type="text"
                      placeholder="-"
                      disabled
                      className="bg-light"
                    />
                  </div>
                </td>
                <td className="text-center opacity-50">
                  <label className="toggle-switch">
                    <input type="checkbox" disabled />
                    <span className="toggle-slider"></span>
                  </label>
                </td>
                <td className="text-center">
                  <Trash2 size={16} className="text-muted opacity-50" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="payroll-card p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6 className="fw-bold m-0">Deduction Components</h6>
            <Button
              variant="outline"
              className="btn btn-sm btn-white border d-flex align-items-center gap-1"
            >
              <Plus size={14} /> Add Row
            </Button>
          </div>
          <table className="structure-table w-100">
            <thead>
              <tr>
                <th width="30%">COMPONENT</th>
                <th width="25%">TYPE</th>
                <th width="30%">AMOUNT / %</th>
                <th width="15%" className="text-center">
                  MANDATORY
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    className="payroll-form-control w-100"
                    defaultValue="TDS / Income Tax"
                  />
                </td>
                <td>
                  <div className="position-relative">
                    <select className="payroll-form-control w-100 appearance-none bg-white text-dark border">
                      <option>Fixed</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="position-absolute text-muted"
                      style={{ right: "10px", top: "12px" }}
                    />
                  </div>
                </td>
                <td>
                  <div className="component-input">
                    <div className="component-prefix">₹</div>
                    <input type="text" defaultValue="1,200" />
                  </div>
                </td>
                <td className="text-center">
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </td>
                <td className="text-center">
                  <Trash2 size={16} className="text-muted cursor-pointer" />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    className="payroll-form-control w-100"
                    defaultValue="PF Contribution"
                  />
                </td>
                <td>
                  <div className="position-relative">
                    <select className="payroll-form-control w-100 appearance-none bg-white text-dark border">
                      <option>% of Basic</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="position-absolute text-muted"
                      style={{ right: "10px", top: "12px" }}
                    />
                  </div>
                </td>
                <td>
                  <div className="component-input">
                    <div className="component-prefix">₹</div>
                    <input type="text" defaultValue="12" />
                  </div>
                </td>
                <td className="text-center">
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </td>
                <td className="text-center">
                  <Trash2 size={16} className="text-muted cursor-pointer" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="col-12 col-lg-4">

        <div
          className="payroll-card p-4 position-sticky"
          style={{ top: "20px" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6 className="fw-bold m-0">Live Preview</h6>
            <span
              className="badge bg-light text-primary border rounded-pill px-2 py-1"
              style={{ fontSize: "0.65rem" }}
            >
              • Auto-calculated
            </span>
          </div>

          <div className="structure-preview-row">
            <span className="text-muted">Basic Salary</span>
            <span className="fw-bold">₹30,000</span>
          </div>
          <div className="structure-preview-row">
            <span className="text-muted">HRA (40%)</span>
            <span className="fw-bold text-success-green">+ ₹12,000</span>
          </div>
          <div className="structure-preview-row">
            <span className="text-muted">Transport</span>
            <span className="fw-bold text-success-green">+ ₹3,000</span>
          </div>
          <div className="structure-preview-row border-bottom">
            <span className="text-muted">Performance Bonus</span>
            <span className="fw-bold text-success-green">+ ₹3,000</span>
          </div>

          <div className="structure-preview-row mt-3">
            <span className="text-muted">PF (12%)</span>
            <span className="fw-bold text-danger-red">- ₹3,600</span>
          </div>
          <div className="structure-preview-row">
            <span className="text-muted">TDS</span>
            <span className="fw-bold text-danger-red">- ₹1,200</span>
          </div>
          <div className="structure-preview-row border-bottom">
            <span className="text-muted">Professional Tax</span>
            <span className="fw-bold text-danger-red">- ₹200</span>
          </div>

          <div className="net-pay-box mt-4">
            <span className="net-pay-label">Net Monthly Pay</span>
            <span className="net-pay-value">₹43,000</span>
          </div>

          <div className="d-flex justify-content-between mt-3 text-muted small px-2">
            <span>Gross CTC: ₹48,000</span>
            <span>Annual: ₹5,16,000</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PayslipThemes = ({ onCancel, onContinue }) => {
  const [selectedTheme, setSelectedTheme] = useState("ocean");

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Breadcrumb items={["Dashboard", "Payroll"]} />
          <h3 className="fw-bold mt-2 mb-1">Choose Payslip Theme</h3>
          <p className="text-muted small">
            Select a design theme for your payslips. All themes are SaaS-grade
            and print-ready.
          </p>
        </div>
        <div className="d-flex gap-3">
          <Button
            variant="outline"
            className="btn btn-white border px-4 fw-medium d-flex align-items-center gap-2"
            onClick={onCancel}
          >
            <ArrowLeft size={16} /> Back
          </Button>
          <Button
            variant="primary"
            className="btn btn-primary bg-blue border-0 px-4 fw-medium d-flex align-items-center gap-2"
            onClick={onContinue}
          >
            Continue to Customize <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      <div className="row g-4">

        <div className="col-12 col-md-6 col-lg-4">
          <div
            className={`theme-card ${
              selectedTheme === "ocean" ? "active" : ""
            }`}
            onClick={() => setSelectedTheme("ocean")}
          >
            <div
              className="theme-preview-img p-3"
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
              }}
            >
              <div className="bg-white rounded shadow-sm h-100 p-2 d-flex flex-column opacity-75">
                <div className="w-50 h-8 bg-light mb-2 rounded"></div>
                <div className="w-100 h-2 bg-light mb-1 rounded"></div>
                <div className="w-75 h-2 bg-light mb-auto rounded"></div>
              </div>
            </div>
            <div className="p-4">
              <span className="theme-badge ocean">Ocean Blue</span>
              <h6 className="fw-bold m-0 mb-2 text-dark">Ocean Minimal</h6>
              <p className="text-muted small m-0">
                Clean sky-blue gradient header with two-column earnings layout
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div
            className={`theme-card ${
              selectedTheme === "forest" ? "active" : ""
            }`}
            onClick={() => setSelectedTheme("forest")}
          >
            <div
              className="theme-preview-img p-3"
              style={{
                background: "linear-gradient(135deg, #166534 0%, #15803d 100%)",
              }}
            >
              <div className="bg-white rounded shadow-sm h-100 p-2 d-flex flex-column opacity-75">
                <div className="w-25 h-8 bg-light mb-2 rounded mx-auto"></div>
                <div className="w-100 h-2 bg-light mb-1 rounded"></div>
                <div className="w-100 h-2 bg-light mb-auto rounded"></div>
              </div>
            </div>
            <div className="p-4">
              <span className="theme-badge forest">Forest Zen</span>
              <h6 className="fw-bold m-0 mb-2 text-dark">Forest Zen</h6>
              <p className="text-muted small m-0">
                Calming green palette with a nature-inspired minimal layout -
                eco-friendly feel
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div
            className={`theme-card ${
              selectedTheme === "violet" ? "active" : ""
            }`}
            onClick={() => setSelectedTheme("violet")}
          >
            <div
              className="theme-preview-img p-3"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)",
              }}
            >
              <div className="bg-white rounded shadow-sm h-100 p-2 d-flex flex-column opacity-75">
                <div className="w-50 h-8 bg-light mb-2 rounded ms-auto"></div>
                <div className="w-100 h-2 bg-light mb-1 rounded"></div>
                <div className="w-75 h-2 bg-light mb-auto rounded"></div>
              </div>
            </div>
            <div className="p-4">
              <span className="theme-badge violet">Violet Luxe</span>
              <h6 className="fw-bold m-0 mb-2 text-dark">Violet Luxe</h6>
              <p className="text-muted small m-0">
                Rich purple gradient with premium feel - great for tech startups
                and SaaS companies
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div
            className={`theme-card ${
              selectedTheme === "slate" ? "active" : ""
            }`}
            onClick={() => setSelectedTheme("slate")}
          >
            <div
              className="theme-preview-img p-3"
              style={{ background: "#334155" }}
            >
              <div className="bg-white rounded shadow-sm h-100 p-2 d-flex flex-column opacity-75">
                <div className="w-50 h-8 bg-light mb-2 rounded"></div>
                <div className="w-100 h-2 bg-light mb-1 rounded"></div>
                <div className="w-75 h-2 bg-light mb-auto rounded"></div>
              </div>
            </div>
            <div className="p-4">
              <span className="theme-badge slate">Slate Modern</span>
              <h6 className="fw-bold m-0 mb-2 text-dark">Slate Modern</h6>
              <p className="text-muted small m-0">
                Ultra-minimal grayscale typography - ideal for formal corporate
                documents
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div
            className={`theme-card ${
              selectedTheme === "corporate" ? "active" : ""
            }`}
            onClick={() => setSelectedTheme("corporate")}
          >
            <div
              className="theme-preview-img p-3"
              style={{ background: "#111827" }}
            >
              <div className="bg-white rounded shadow-sm h-100 p-2 d-flex flex-column opacity-75">
                <div className="w-50 h-8 bg-light mb-2 rounded"></div>
                <div className="w-100 h-2 bg-light mb-1 rounded"></div>
                <div className="w-75 h-2 bg-light mb-auto rounded"></div>
              </div>
            </div>
            <div className="p-4">
              <span className="theme-badge corporate">Executive Dark</span>
              <h6 className="fw-bold m-0 mb-2 text-dark">Corporate Dark</h6>
              <p className="text-muted small m-0">
                Bold dark header with clean white body - perfect for
                leadership-level payslips
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomizePayslip = ({ theme, onCancel }) => {
  const renderTheme = () => {
    if (theme === "slate") {
      return (
        <div className="payslip-big-preview mb-5 pb-5">
          <div className="payslip-header-slate d-flex justify-content-between align-items-center">
            <div className="d-flex gap-3 align-items-center">
              <div
                className="bg-light rounded d-flex justify-content-center align-items-center text-dark"
                style={{
                  width: 48,
                  height: 48,
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                XY
              </div>
              <div>
                <h6 className="m-0 fw-bold mb-1">
                  XYZZ Software Solutions Pvt. Ltd.
                </h6>
                <p className="m-0 small text-primary">hr@technova.io</p>
              </div>
            </div>
            <div className="text-end">
              <h3 className="fw-bold m-0">Pay Slip</h3>
              <p className="m-0 text-muted small">April 2026</p>
            </div>
          </div>
          <div className="p-5">
            <div className="row g-4 mb-5 border-bottom pb-4">
              <div className="col-4">
                <p className="payslip-label">Month</p>
                <p className="payslip-val">April 2026</p>
              </div>
              <div className="col-4">
                <p className="payslip-label">Employee Name</p>
                <p className="payslip-val">Arjun Mehta</p>
              </div>
              <div className="col-4"></div>
              <div className="col-4">
                <p className="payslip-label">Employee ID</p>
                <p className="payslip-val">TNS-2024-0147</p>
              </div>
              <div className="col-4">
                <p className="payslip-label">Department</p>
                <p className="payslip-val">Product Design Department</p>
              </div>
              <div className="col-4"></div>
              <div className="col-4">
                <p className="payslip-label">Designation</p>
                <p className="payslip-val">UI/UX Designer Intern</p>
              </div>
              <div className="col-4">
                <p className="payslip-label">Work Mode</p>
                <p className="payslip-val">Remote</p>
              </div>
              <div className="col-4"></div>
              <div className="col-4">
                <p className="payslip-label">Pay Date</p>
                <p className="payslip-val">30 April, 2026</p>
              </div>
            </div>
            <div className="row g-4 mb-5">
              <div className="col-6">
                <div className="theme-forest-box border-0 bg-light bg-opacity-50">
                  <h6 className="fw-bold mb-4">Earnings</h6>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Basic Salary</span>
                    <span className="fw-medium">₹ 28,000</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">HRA</span>
                    <span className="fw-medium">₹ 8,000</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Internet Allowance</span>
                    <span className="fw-medium">₹ 1,500</span>
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                    <span className="text-muted">Performance Bonus</span>
                    <span className="fw-medium">₹ 7,500</span>
                  </div>
                  <div className="d-flex justify-content-between border-top pt-3">
                    <span className="fw-bold text-success">Gross Earnings</span>
                    <span className="fw-bold text-success">₹ 45,000</span>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="theme-forest-box border-0 bg-light bg-opacity-50 h-100">
                  <h6 className="fw-bold mb-4">Deductions</h6>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">TDS</span>
                    <span className="fw-medium">₹ 1,200</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Provident Fund (PF)</span>
                    <span className="fw-medium">₹ 1,500</span>
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                    <span className="text-muted">Professional Tax</span>
                    <span className="fw-medium">₹ 800</span>
                  </div>
                  <div className="d-flex justify-content-between border-top pt-3 mt-auto">
                    <span className="fw-bold text-danger">
                      Total Deductions
                    </span>
                    <span className="fw-bold text-danger">₹ 3,500</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center py-5 bg-light rounded-4 mb-5">
              <p className="m-0 text-muted small">Net Pay</p>
              <h2 className="fw-bold" style={{ fontSize: "3rem" }}>
                ₹ 41,500
              </h2>
              <p className="m-0 text-muted small fst-italic">
                Rupees Forty Two Thousand Five Hundred Only
              </p>
            </div>
            <h6 className="payslip-section-title">BANK DETAILS</h6>
            <div className="payslip-grid border-top pt-4">
              <div>
                <p className="payslip-label">Payment Mode</p>
                <p className="payslip-val">NEFT / Direct Deposit</p>
              </div>
              <div>
                <p className="payslip-label">Bank Name</p>
                <p className="payslip-val">HDFC Bank</p>
              </div>
              <div>
                <p className="payslip-label">Account Number</p>
                <p className="payslip-val">XXXX XXXX 4821</p>
              </div>
              <div>
                <p className="payslip-label">IFSC Code</p>
                <p className="payslip-val">HDFC00001102</p>
              </div>
            </div>
            <div
              className="text-center text-muted pt-5 mt-5"
              style={{ fontSize: "0.65rem" }}
            >
              This is a system generated payslip.
            </div>
          </div>
        </div>
      );
    }

    if (theme === "corporate") {
      return (
        <div className="theme-corporate-wrapper mb-5">
          <div className="payslip-header-corporate d-flex justify-content-between align-items-center border-bottom border-secondary pb-4 mb-4">
            <div className="d-flex gap-3 align-items-center">
              <div
                className="bg-dark border border-secondary rounded d-flex justify-content-center align-items-center text-white"
                style={{ width: 48, height: 48, fontWeight: "bold" }}
              >
                T
              </div>
              <div>
                <h6 className="m-0 fw-bold mb-1">
                  TechNova Software Solutions
                </h6>
                <p className="m-0 small opacity-75">hr@technova.io</p>
              </div>
            </div>
            <div className="text-end">
              <h3 className="fw-bold m-0">Pay Slip</h3>
              <p className="m-0 opacity-75 small">April 2026</p>
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-3">
              <div className="theme-corporate-card h-100">
                <p className="payslip-label">NAME</p>
                <p className="payslip-val">Arjun Mehta</p>
              </div>
            </div>
            <div className="col-3">
              <div className="theme-corporate-card h-100">
                <p className="payslip-label">ID</p>
                <p className="payslip-val">TNS-2024-0147</p>
              </div>
            </div>
            <div className="col-3">
              <div className="theme-corporate-card h-100">
                <p className="payslip-label">ROLE</p>
                <p className="payslip-val">UI/UX Designer</p>
              </div>
            </div>
            <div className="col-3">
              <div className="theme-corporate-card h-100">
                <p className="payslip-label">MODE</p>
                <p className="payslip-val">Remote</p>
              </div>
            </div>
            <div className="col-6">
              <div className="theme-corporate-card h-100">
                <p className="payslip-label">DEPARTMENT</p>
                <p className="payslip-val">Product Design Department</p>
              </div>
            </div>
            <div className="col-3">
              <div className="theme-corporate-card h-100">
                <p className="payslip-label">PAY DATE</p>
                <p className="payslip-val">30 April, 2026</p>
              </div>
            </div>
            <div className="col-3">
              <div className="theme-corporate-card h-100">
                <p className="payslip-label">MONTH</p>
                <p className="payslip-val">April 2026</p>
              </div>
            </div>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-6">
              <div className="theme-corporate-card h-100">
                <h6 className="fw-bold mb-4 d-flex align-items-center gap-2">
                  <div
                    className="rounded-circle bg-success"
                    style={{ width: 8, height: 8 }}
                  ></div>{" "}
                  Earnings
                </h6>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Basic Salary</span>
                  <span className="fw-medium">₹ 28,000</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">HRA</span>
                  <span className="fw-medium">₹ 8,000</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Internet Allowance</span>
                  <span className="fw-medium">₹ 1,500</span>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <span className="text-muted">Performance Bonus</span>
                  <span className="fw-medium">₹ 7,500</span>
                </div>
                <div className="d-flex justify-content-between border-top pt-3">
                  <span className="fw-bold text-success">Gross Earnings</span>
                  <span className="fw-bold text-success">₹ 45,000</span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="theme-corporate-card h-100">
                <h6 className="fw-bold mb-4 d-flex align-items-center gap-2">
                  <div
                    className="rounded-circle bg-danger"
                    style={{ width: 8, height: 8 }}
                  ></div>{" "}
                  Deductions
                </h6>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">TDS</span>
                  <span className="fw-medium">₹ 1,200</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Provident Fund (PF)</span>
                  <span className="fw-medium">₹ 1,500</span>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <span className="text-muted">Professional Tax</span>
                  <span className="fw-medium">₹ 800</span>
                </div>
                <div className="d-flex justify-content-between border-top pt-3 mt-auto">
                  <span className="fw-bold text-danger">Total Deductions</span>
                  <span className="fw-bold text-danger">₹ 3,500</span>
                </div>
              </div>
            </div>
          </div>

          <div className="theme-corporate-netpay mb-4 d-flex justify-content-between align-items-center">
            <div>
              <p className="m-0 text-muted small mb-1 text-uppercase letter-spacing-1">
                Net Pay
              </p>
              <h2 className="fw-bold text-white mb-2">₹ 41,500</h2>
              <p
                className="m-0 text-muted small fst-italic"
                style={{ fontSize: "0.7rem" }}
              >
                Rupees Forty Two Thousand Five Hundred Only
              </p>
            </div>
            <div className="text-end">
              <p className="m-0 text-muted small mb-1 text-uppercase letter-spacing-1">
                Credited Via
              </p>
              <p className="m-0 text-white fw-bold">NEFT</p>
              <p className="m-0 text-muted small">30 Apr 2026</p>
            </div>
          </div>

          <div className="theme-corporate-card">
            <h6 className="fw-bold mb-3">Bank Details</h6>
            <div className="payslip-grid">
              <div>
                <p className="payslip-label">PAYMENT MODE</p>
                <p className="payslip-val">NEFT / Direct Deposit</p>
              </div>
              <div>
                <p className="payslip-label">BANK NAME</p>
                <p className="payslip-val">HDFC Bank</p>
              </div>
              <div>
                <p className="payslip-label">ACCOUNT NUMBER</p>
                <p className="payslip-val">XXXX XXXX 4821</p>
              </div>
              <div>
                <p className="payslip-label">IFSC CODE</p>
                <p className="payslip-val">HDFC00001102</p>
              </div>
            </div>
          </div>

          <div
            className="text-center text-muted pt-4"
            style={{ fontSize: "0.65rem" }}
          >
            This is a system generated payslip.
          </div>
        </div>
      );
    }

    if (theme === "forest") {
      return (
        <div className="payslip-big-preview mb-5 pb-5 bg-white">
          <div className="payslip-header-forest">
            <div
              className="d-flex justify-content-between align-items-start position-relative"
              style={{ zIndex: 2 }}
            >
              <div className="d-flex gap-3 align-items-center">
                <div
                  className="bg-white bg-opacity-25 border border-light border-opacity-25 rounded d-flex justify-content-center align-items-center text-white"
                  style={{ width: 48, height: 48, fontWeight: "bold" }}
                >
                  XY
                </div>
                <div>
                  <h6 className="m-0 fw-bold mb-1">
                    XYZZ Software Solutions Pvt. Ltd.
                  </h6>
                  <p className="m-0 small text-white text-opacity-75">
                    hr@technova.io
                  </p>
                </div>
              </div>
              <div className="text-end">
                <h3 className="fw-bold m-0 text-white">Pay Slip</h3>
                <p className="m-0 small text-white text-opacity-75">
                  April 2026
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 p-md-5">
            <div className="d-flex align-items-center gap-2 mb-4">
              <div
                className="bg-primary"
                style={{ width: 3, height: 16 }}
              ></div>
              <h6
                className="fw-bold m-0 text-primary text-uppercase"
                style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
              >
                Employee Information
              </h6>
            </div>
            <div className="row g-4 mb-5 pb-4">
              <div className="col-6">
                <p className="text-muted small text-uppercase mb-1">Month</p>
                <p className="fw-medium m-0">April 2026</p>
              </div>
              <div className="col-6">
                <p className="text-muted small text-uppercase mb-1">
                  Employee Name
                </p>
                <p className="fw-medium m-0">Arjun Mehta</p>
              </div>
              <div className="col-6">
                <p className="text-muted small text-uppercase mb-1">
                  Employee ID
                </p>
                <p className="fw-medium m-0">TNS-2024-0147</p>
              </div>
              <div className="col-6">
                <p className="text-muted small text-uppercase mb-1">
                  Department
                </p>
                <p className="fw-medium m-0">Product Design Department</p>
              </div>
              <div className="col-6">
                <p className="text-muted small text-uppercase mb-1">
                  Designation
                </p>
                <p className="fw-medium m-0">UI/UX Designer</p>
              </div>
              <div className="col-6">
                <p className="text-muted small text-uppercase mb-1">
                  Work Mode
                </p>
                <p className="fw-medium m-0">Remote</p>
              </div>
              <div className="col-6">
                <p className="text-muted small text-uppercase mb-1">Pay Date</p>
                <p className="fw-medium m-0">30 April, 2026</p>
              </div>
            </div>

            <div className="row g-4 mb-5">
              <div className="col-6">
                <div className="theme-forest-box p-0 overflow-hidden h-100">
                  <div className="theme-forest-header bg-success">EARNINGS</div>
                  <div className="p-3 p-md-4">
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted small">Basic Salary</span>
                      <span className="fw-medium small">₹ 28,000</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted small">HRA</span>
                      <span className="fw-medium small">₹ 8,000</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted small">
                        Internet Allowance
                      </span>
                      <span className="fw-medium small">₹ 1,500</span>
                    </div>
                    <div className="d-flex justify-content-between mb-4">
                      <span className="text-muted small">
                        Performance Bonus
                      </span>
                      <span className="fw-medium small">₹ 7,500</span>
                    </div>
                    <div className="d-flex justify-content-between border-top pt-3">
                      <span className="fw-bold text-success small">
                        Gross Earnings
                      </span>
                      <span className="fw-bold text-success small">
                        ₹ 45,000
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="theme-forest-box p-0 overflow-hidden h-100">
                  <div className="theme-forest-header bg-danger">
                    DEDUCTIONS
                  </div>
                  <div className="p-3 p-md-4">
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted small">TDS</span>
                      <span className="fw-medium small">₹ 1,200</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted small">
                        Provident Fund (PF)
                      </span>
                      <span className="fw-medium small">₹ 1,500</span>
                    </div>
                    <div className="d-flex justify-content-between mb-4">
                      <span className="text-muted small">Professional Tax</span>
                      <span className="fw-medium small">₹ 800</span>
                    </div>
                    <div className="d-flex justify-content-between border-top pt-3 mt-auto">
                      <span className="fw-bold text-danger small">
                        Total Deductions
                      </span>
                      <span className="fw-bold text-danger small">₹ 3,500</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="p-4 p-md-5 rounded-3 mb-5"
              style={{ background: "#1e3a8a", color: "white" }}
            >
              <p className="m-0 text-white text-opacity-75 small text-uppercase mb-2">
                Net Pay
              </p>
              <h2
                className="fw-bold text-white mb-2"
                style={{ fontSize: "2.5rem" }}
              >
                ₹ 41,500
              </h2>
              <p
                className="m-0 text-white text-opacity-75 small fst-italic"
                style={{ fontSize: "0.7rem" }}
              >
                (In Words: Rupees Forty Two Thousand Five Hundred Only)
              </p>
            </div>

            <div className="d-flex align-items-center gap-2 mb-4">
              <div
                className="bg-primary"
                style={{ width: 3, height: 16 }}
              ></div>
              <h6
                className="fw-bold m-0 text-primary text-uppercase"
                style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
              >
                Bank Details
              </h6>
            </div>
            <div className="payslip-grid pb-5">
              <div>
                <p
                  className="text-muted small text-uppercase mb-1"
                  style={{ fontSize: "0.65rem" }}
                >
                  Payment Mode
                </p>
                <p className="fw-medium small">NEFT / Direct Deposit</p>
              </div>
              <div>
                <p
                  className="text-muted small text-uppercase mb-1"
                  style={{ fontSize: "0.65rem" }}
                >
                  Bank Name
                </p>
                <p className="fw-medium small">HDFC Bank</p>
              </div>
              <div>
                <p
                  className="text-muted small text-uppercase mb-1"
                  style={{ fontSize: "0.65rem" }}
                >
                  Account Number
                </p>
                <p className="fw-medium small">XXXX XXXX 4821</p>
              </div>
              <div>
                <p
                  className="text-muted small text-uppercase mb-1"
                  style={{ fontSize: "0.65rem" }}
                >
                  IFSC Code
                </p>
                <p className="fw-medium small">HDFC00001102</p>
              </div>
            </div>
            <div
              className="text-center text-muted border-top pt-4"
              style={{ fontSize: "0.65rem" }}
            >
              This is a system generated payslip.
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="payslip-big-preview mb-5">
        <div
          className={`payslip-header-ocean ${
            theme === "violet" ? "bg-purple" : ""
          }`}
          style={
            theme === "violet"
              ? {
                  background:
                    "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)",
                }
              : {}
          }
        >
          <div
            className="d-flex justify-content-between align-items-start position-relative"
            style={{ zIndex: 2 }}
          >
            <div className="d-flex gap-3 align-items-center">
              <div
                className="bg-white rounded-circle d-flex justify-content-center align-items-center text-primary"
                style={{ width: 48, height: 48 }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderTop: "2px solid #2563eb",
                    borderLeft: "2px solid #2563eb",
                    borderRadius: "50%",
                  }}
                ></div>
              </div>
              <div>
                <h6 className="m-0 fw-bold mb-1">
                  Acme Technologies Pvt. Ltd.
                </h6>
                <p className="m-0 small opacity-75">
                  hr@acmetechnologies.in • payroll@acmetechnologies.in
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 position-relative" style={{ zIndex: 2 }}>
            <h2 className="fw-bold mb-2">Pay Slip — April 2026</h2>
            <p className="m-0 opacity-75 small">
              Official Salary Statement • Confidential
            </p>
          </div>
        </div>
        <div className="p-5">
          <h6 className="payslip-section-title">EMPLOYEE DETAILS</h6>
          <div className="payslip-grid mb-5 pb-4 border-bottom">
            <div>
              <p className="payslip-label">Employee Name</p>
              <p className="payslip-val">Ananya Sharma</p>
            </div>
            <div>
              <p className="payslip-label">Employee ID</p>
              <p className="payslip-val">TNS-2024-087</p>
            </div>
            <div>
              <p className="payslip-label">Designation</p>
              <p className="payslip-val">Software Developer</p>
            </div>
            <div>
              <p className="payslip-label">Department</p>
              <p className="payslip-val">Product Design</p>
            </div>
            <div>
              <p className="payslip-label">Pay Date</p>
              <p className="payslip-val">30 April 2026</p>
            </div>
            <div>
              <p className="payslip-label">Work Mode</p>
              <p className="payslip-val">Remote</p>
            </div>
            <div>
              <p className="payslip-label">Month</p>
              <p className="payslip-val">April 2026</p>
            </div>
            <div>
              <p className="payslip-label">PAN</p>
              <p className="payslip-val">ABCPS1234Z</p>
            </div>
          </div>
          <h6 className="payslip-section-title">SALARY BREAKDOWN</h6>
          <div className="row g-4 mb-5">
            <div className="col-6">
              <table className="payslip-table border rounded overflow-hidden">
                <thead>
                  <tr>
                    <th colSpan="2" className="text-primary">
                      <span className="text-primary me-2">▲</span> Earnings
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Basic Salary</td>
                    <td className="text-end fw-medium">₹ 20,000</td>
                  </tr>
                  <tr>
                    <td>HRA</td>
                    <td className="text-end fw-medium">₹ 8,000</td>
                  </tr>
                  <tr>
                    <td>Internet Allowance</td>
                    <td className="text-end fw-medium">₹ 1,500</td>
                  </tr>
                  <tr>
                    <td>Performance Bonus</td>
                    <td className="text-end fw-medium">₹ 16,000</td>
                  </tr>
                  <tr className="bg-light">
                    <td className="fw-bold">Gross Earnings</td>
                    <td className="text-end fw-bold text-primary">₹ 45,500</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-6">
              <table className="payslip-table border rounded overflow-hidden h-100">
                <thead>
                  <tr>
                    <th colSpan="2" className="text-danger">
                      <span className="text-danger me-2">▼</span> Deductions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>TDS</td>
                    <td className="text-end fw-medium">₹ 1,500</td>
                  </tr>
                  <tr>
                    <td>Provident Fund</td>
                    <td className="text-end fw-medium">₹ 1,200</td>
                  </tr>
                  <tr>
                    <td>Professional Tax</td>
                    <td className="text-end fw-medium">₹ 300</td>
                  </tr>
                  <tr className="border-0">
                    <td colSpan="2">&nbsp;</td>
                  </tr>
                  <tr className="bg-light mt-auto">
                    <td className="fw-bold">Total Deductions</td>
                    <td className="text-end fw-bold text-primary">₹ 3,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            className="payslip-net-pay mb-5 d-flex justify-content-between align-items-end"
            style={theme === "violet" ? { background: "#7c3aed" } : {}}
          >
            <div>
              <p className="m-0 opacity-75 small">Net Pay</p>
              <h2 className="payslip-net-pay-amount">₹ 42,500</h2>
              <p className="payslip-net-pay-words">
                (In Words: Rupees Forty Two Thousand Five Hundred Only)
              </p>
            </div>
          </div>
          <h6 className="payslip-section-title">BANK DETAILS</h6>
          <div className="payslip-grid mb-5">
            <div>
              <p className="payslip-label">Payment Mode</p>
              <p className="payslip-val">NEFT</p>
            </div>
            <div>
              <p className="payslip-label">Bank Name</p>
              <p className="payslip-val">HDFC Bank</p>
            </div>
            <div>
              <p className="payslip-label">Account No.</p>
              <p className="payslip-val">xxxxxxx4821</p>
            </div>
            <div>
              <p className="payslip-label">IFSC Code</p>
              <p className="payslip-val">HDFC00001102</p>
            </div>
          </div>
          <div
            className="text-center text-muted border-top pt-4"
            style={{ fontSize: "0.65rem" }}
          >
            This is a system generated payslip. No signature required. | Acme
            Technologies Pvt. Ltd. © 2026
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Breadcrumb items={["Dashboard", "Payroll"]} />
          <h3 className="fw-bold mt-2 mb-1">Customize Payslip</h3>
          <p className="text-muted small">
            Select a design theme for your payslips. All themes are SaaS-grade
            and print-ready.
          </p>
        </div>
        <div className="d-flex gap-3">
          <Button
            variant="outline"
            className="btn btn-white border px-4 fw-medium d-flex align-items-center gap-2"
            onClick={onCancel}
          >
            <ArrowLeft size={16} /> Change Theme
          </Button>
          <Button
            variant="primary"
            className="btn btn-success bg-success border-0 px-4 fw-medium d-flex align-items-center gap-2 text-white"
          >
            <Download size={16} /> Generate & Send All
          </Button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-4">

          <div className="payroll-card p-4 mb-4">
            <h6 className="fw-bold mb-4">Company Branding</h6>

            <div
              className="border border-dashed rounded-3 p-4 d-flex justify-content-center align-items-center mb-4"
              style={{ height: "100px", backgroundColor: "#f8fafc" }}
            >
              <div
                className="avatar-lg bg-dark rounded-circle d-flex justify-content-center align-items-center text-white flex-column gap-2"
                style={{ width: 48, height: 48 }}
              >
                <ImageIcon size={20} />
              </div>
            </div>

            <div className="mb-4">
              <label className="payroll-form-label">Company Name</label>
              <input
                type="text"
                className="payroll-form-control w-100"
                defaultValue="Acme Technologies Pvt. Ltd."
              />
            </div>
            <div className="mb-4">
              <label className="payroll-form-label">Company Address</label>
              <input
                type="text"
                className="payroll-form-control w-100"
                defaultValue="Hyderabad, Telangana, India"
              />
            </div>
            <div className="mb-4">
              <label className="payroll-form-label">
                CIN / Registration No.
              </label>
              <input
                type="text"
                className="payroll-form-control w-100"
                defaultValue="U72900TG2020PTC141234"
              />
            </div>
          </div>

          <div className="payroll-card p-4 mb-4">
            <h6 className="fw-bold mb-4">Payslip Details</h6>
            <div className="mb-4">
              <label className="payroll-form-label">Payroll Period</label>
              <input
                type="text"
                className="payroll-form-control w-100"
                defaultValue="April 2026"
              />
            </div>
            <div className="mb-4">
              <label className="payroll-form-label">Payment Date</label>
              <input
                type="date"
                className="payroll-form-control w-100 text-muted"
                defaultValue="2026-04-30"
              />
            </div>
            <div className="mb-4">
              <label className="payroll-form-label">Payroll Reference</label>
              <input
                type="text"
                className="payroll-form-control w-100"
                defaultValue="PAY-APR-2026"
              />
            </div>
            <div className="mb-2">
              <label className="payroll-form-label">Footer Note</label>
              <textarea
                className="payroll-form-control w-100"
                rows="3"
                defaultValue="This is a computer-generated payslip and does not require a signature."
              ></textarea>
            </div>
          </div>

          <div className="p-3 bg-warning-light text-warning-dark border border-warning rounded-3 small">
            Preview updates automatically - Final output will include all 47
            employees
          </div>
        </div>

        <div className="col-12 col-lg-8">{renderTheme()}</div>
      </div>
    </div>
  );
};

const DeductionManager = ({ onCancel }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="fade-in position-relative">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Breadcrumb items={["Dashboard", "Payroll"]} />
          <h3 className="fw-bold mt-2 mb-1">Deduction Manager</h3>
          <p className="text-muted small">
            Configure recurring and one-time deductions applied during payroll.
          </p>
        </div>
        <div className="d-flex gap-3">
          <Button
            variant="outline"
            className="btn btn-white border px-4 fw-medium"
            onClick={onCancel}
          >
            Back to Dashboard
          </Button>
          <Button
            variant="primary"
            className="btn btn-primary bg-blue border-0 px-4 fw-medium d-flex align-items-center gap-2"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={16} /> Add Deduction
          </Button>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-3">
          <div className="admin-stat-card stat-card-red">
            <div className="admin-stat-icon-wrapper">
              <Minus size={20} />
            </div>
            <h4 className="fw-bold mb-1">₹3.2L</h4>
            <span className="text-dark small fw-medium">Total Deductions</span>
            <span className="text-muted small">April 2026</span>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="admin-stat-card stat-card-green">
            <div className="admin-stat-icon-wrapper">
              <Shield size={20} />
            </div>
            <h4 className="fw-bold mb-1">₹1.8L</h4>
            <span className="text-dark small fw-medium">PF Contributions</span>
            <span className="text-muted small">Employer + Employee</span>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="admin-stat-card stat-card-orange">
            <div className="admin-stat-icon-wrapper">
              <File size={20} />
            </div>
            <h4 className="fw-bold mb-1">₹92K</h4>
            <span className="text-dark small fw-medium">TDS Collected</span>
            <span className="text-muted small">Income Tax</span>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="admin-stat-card stat-card-blue">
            <div className="admin-stat-icon-wrapper">
              <Clock size={20} />
            </div>
            <h4 className="fw-bold mb-1">8</h4>
            <span className="text-dark small fw-medium">Active Rules</span>
            <span className="text-muted small">Configured deductions</span>
          </div>
        </div>
      </div>

      <div className="payroll-card p-4">
        <h6 className="fw-bold mb-4">Deduction Rules</h6>

        <div className="rule-row">
          <div className="flex-grow-1">
            <h6 className="fw-bold m-0 mb-1">PF Contribution</h6>
            <span className="text-muted small">
              Statutory • % of Basic • 48 employees
            </span>
          </div>
          <div className="d-flex align-items-center gap-4">
            <span className="fw-bold">12%</span>
            <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-3 py-1">
              <div
                className="d-inline-block rounded-circle bg-success me-1"
                style={{ width: 6, height: 6 }}
              ></div>{" "}
              Statutory
            </span>
            <Button
              variant="outline"
              className="btn btn-sm btn-white border px-3"
            >
              Edit
            </Button>
            <Button
              variant="outline"
              className="btn btn-sm btn-white border border-danger text-danger px-3"
            >
              Delete
            </Button>
          </div>
        </div>

        <div className="rule-row">
          <div className="flex-grow-1">
            <h6 className="fw-bold m-0 mb-1">TDS / Income Tax</h6>
            <span className="text-muted small">
              Statutory • Fixed • 48 employees
            </span>
          </div>
          <div className="d-flex align-items-center gap-4">
            <span className="fw-bold">₹1,200</span>
            <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-3 py-1">
              <div
                className="d-inline-block rounded-circle bg-success me-1"
                style={{ width: 6, height: 6 }}
              ></div>{" "}
              Statutory
            </span>
            <Button
              variant="outline"
              className="btn btn-sm btn-white border px-3"
            >
              Edit
            </Button>
            <Button
              variant="outline"
              className="btn btn-sm btn-white border border-danger text-danger px-3"
            >
              Delete
            </Button>
          </div>
        </div>

        <div className="rule-row">
          <div className="flex-grow-1">
            <h6 className="fw-bold m-0 mb-1">Professional Tax</h6>
            <span className="text-muted small">
              Statutory • Fixed • 48 employees
            </span>
          </div>
          <div className="d-flex align-items-center gap-4">
            <span className="fw-bold">₹200</span>
            <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-3 py-1">
              <div
                className="d-inline-block rounded-circle bg-success me-1"
                style={{ width: 6, height: 6 }}
              ></div>{" "}
              Statutory
            </span>
            <Button
              variant="outline"
              className="btn btn-sm btn-white border px-3"
            >
              Edit
            </Button>
            <Button
              variant="outline"
              className="btn btn-sm btn-white border border-danger text-danger px-3"
            >
              Delete
            </Button>
          </div>
        </div>

        <div className="rule-row">
          <div className="flex-grow-1">
            <h6 className="fw-bold m-0 mb-1">Leave Deduction</h6>
            <span className="text-muted small">
              Leave • Per Day Salary • 7 employees
            </span>
          </div>
          <div className="d-flex align-items-center gap-4">
            <span className="fw-bold">LOP</span>
            <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 rounded-pill px-3 py-1">
              <div
                className="d-inline-block rounded-circle bg-danger me-1"
                style={{ width: 6, height: 6 }}
              ></div>{" "}
              Leave
            </span>
            <Button
              variant="outline"
              className="btn btn-sm btn-white border px-3"
            >
              Edit
            </Button>
            <Button
              variant="outline"
              className="btn btn-sm btn-white border border-danger text-danger px-3"
            >
              Delete
            </Button>
          </div>
        </div>

        <div className="rule-row">
          <div className="flex-grow-1">
            <h6 className="fw-bold m-0 mb-1">Salary Advance Recovery</h6>
            <span className="text-muted small">Loan • Fixed • 3 employees</span>
          </div>
          <div className="d-flex align-items-center gap-4">
            <span className="fw-bold">₹5,000</span>
            <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 rounded-pill px-3 py-1">
              <div
                className="d-inline-block rounded-circle bg-primary me-1"
                style={{ width: 6, height: 6 }}
              ></div>{" "}
              Loan
            </span>
            <Button
              variant="outline"
              className="btn btn-sm btn-white border px-3"
            >
              Edit
            </Button>
            <Button
              variant="outline"
              className="btn btn-sm btn-white border border-danger text-danger px-3"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      {showAddModal && (
        <>
          <div
            className="modal-backdrop fade show"
            style={{ zIndex: 1040 }}
          ></div>
          <div
            className="position-fixed top-0 end-0 bottom-0 bg-white shadow-lg p-4 fade-in"
            style={{ width: "400px", zIndex: 1050, overflowY: "auto" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
              <div>
                <h5 className="fw-bold m-0">Add Deduction Rule</h5>
                <p className="text-muted small m-0">
                  Configure a new deduction for payroll
                </p>
              </div>
              <button
                className="btn btn-light rounded-circle p-2"
                onClick={() => setShowAddModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-3">
              <label className="payroll-form-label">Deduction Name</label>
              <input
                type="text"
                className="payroll-form-control w-100"
                placeholder="e.g. Salary Advance Recovery"
              />
            </div>
            <div className="mb-3">
              <label className="payroll-form-label">Category</label>
              <input
                type="text"
                className="payroll-form-control w-100"
                defaultValue="Statutory (PF, TDS, PT)"
              />
            </div>
            <div className="mb-3">
              <label className="payroll-form-label">Calculation Type</label>
              <input
                type="text"
                className="payroll-form-control w-100"
                defaultValue="Fixed Amount"
              />
            </div>
            <div className="mb-3">
              <label className="payroll-form-label">Amount / Percentage</label>
              <div className="component-input">
                <div className="component-prefix">₹</div>
                <input type="text" defaultValue="0" />
              </div>
            </div>
            <div className="mb-3">
              <label className="payroll-form-label">Apply To</label>
              <div className="position-relative">
                <input
                  type="text"
                  className="payroll-form-control w-100"
                  defaultValue="All Employees"
                />
                <ChevronDown
                  size={14}
                  className="position-absolute text-muted"
                  style={{ right: 12, top: 12 }}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="payroll-form-label">Recurring</label>
              <input
                type="text"
                className="payroll-form-control w-100"
                defaultValue="Every Month"
              />
            </div>
            <div className="mb-3">
              <label className="payroll-form-label">Effective From</label>
              <input
                type="date"
                className="payroll-form-control w-100 text-muted"
                defaultValue="2026-04-01"
              />
            </div>
            <div className="mb-4">
              <label className="payroll-form-label">Notes</label>
              <textarea
                className="payroll-form-control w-100"
                rows="3"
                placeholder="Optional description..."
              ></textarea>
            </div>

            <div className="d-flex gap-2 pt-3 border-top">
              <Button
                variant="outline"
                className="btn btn-white border flex-grow-1"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="btn btn-primary bg-blue border-0 flex-grow-1 d-flex justify-content-center align-items-center gap-2"
              >
                <Plus size={16} /> Add Deduction
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const PayrollHistory = () => {
  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Breadcrumb items={["Dashboard", "Payroll"]} />
          <h3 className="fw-bold mt-2 mb-1">Payroll History</h3>
          <p className="text-muted small">
            All payroll runs, reports and downloadable records.
          </p>
        </div>
        <div className="d-flex gap-3">
          <Button
            variant="outline"
            className="btn btn-white border px-4 fw-medium d-flex align-items-center gap-2"
          >
            <Download size={16} /> Export CSV
          </Button>
          <Button
            variant="primary"
            className="btn btn-primary bg-blue border-0 px-4 fw-medium d-flex align-items-center gap-2 text-white"
          >
            <Play size={16} /> Run Payroll
          </Button>
        </div>
      </div>

      <div className="payroll-card p-4 mx-auto mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 className="fw-bold m-0">Salary Assignments</h6>
          <div className="d-flex gap-3">
            <div className="position-relative">
              <Search
                size={16}
                className="text-muted position-absolute top-50 start-0 translate-middle-y ms-3"
              />
              <input
                type="text"
                className="form-control bg-light border-0 ps-5"
                placeholder="Search employee..."
                style={{ width: 200 }}
              />
            </div>
            <select className="form-select bg-light border-0 w-auto">
              <option>All Status</option>
            </select>
          </div>
        </div>

        <ul className="nav nav-tabs border-bottom mb-4">
          <li className="nav-item">
            <a
              className="nav-link active fw-medium text-primary border-primary border-bottom-2 pb-3"
              href="#"
            >
              All Runs{" "}
              <span className="badge bg-primary text-white ms-1 rounded-pill">
                16
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-muted fw-medium pb-3" href="#">
              Completed
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-muted fw-medium pb-3" href="#">
              Pending
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-muted fw-medium pb-3" href="#">
              Failed
            </a>
          </li>
        </ul>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead
              className="table-light text-muted"
              style={{ fontSize: "0.7rem", letterSpacing: "0.5px" }}
            >
              <tr>
                <th className="fw-bold border-bottom-0 pb-3 text-uppercase">
                  Reference
                </th>
                <th className="fw-bold border-bottom-0 pb-3 text-uppercase">
                  Period
                </th>
                <th className="fw-bold border-bottom-0 pb-3 text-uppercase">
                  Employees
                </th>
                <th className="fw-bold border-bottom-0 pb-3 text-uppercase">
                  Gross Amount
                </th>
                <th className="fw-bold border-bottom-0 pb-3 text-uppercase">
                  Net Disbursed
                </th>
                <th className="fw-bold border-bottom-0 pb-3 text-uppercase">
                  Pay Date
                </th>
                <th className="fw-bold border-bottom-0 pb-3 text-uppercase">
                  Status
                </th>
                <th className="fw-bold border-bottom-0 pb-3 text-uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="small text-muted py-3 border-bottom-0">
                  PAY-APR-2026
                </td>
                <td className="small fw-bold py-3 border-bottom-0 text-dark">
                  April 2026
                </td>
                <td className="small py-3 border-bottom-0 text-muted">47</td>
                <td className="small fw-medium py-3 border-bottom-0 text-muted">
                  ₹38,45,000
                </td>
                <td className="small fw-bold py-3 border-bottom-0 text-dark">
                  ₹35,25,000
                </td>
                <td className="small py-3 border-bottom-0 text-muted">
                  Apr 30, 2026
                </td>
                <td className="py-3 border-bottom-0">
                  <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-2 py-1">
                    <span style={{ fontSize: "8px" }}>●</span> Paid
                  </span>
                </td>
                <td className="py-3 border-bottom-0 d-flex gap-2">
                  <Button
                    variant="outline"
                    className="btn btn-sm btn-white border fw-medium px-3"
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    className="btn btn-sm btn-white border fw-medium px-3"
                  >
                    Download
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="small text-muted py-3 border-bottom-0">
                  PAY-MAR-2026
                </td>
                <td className="small fw-bold py-3 border-bottom-0 text-dark">
                  March 2026
                </td>
                <td className="small py-3 border-bottom-0 text-muted">48</td>
                <td className="small fw-medium py-3 border-bottom-0 text-muted">
                  ₹37,80,000
                </td>
                <td className="small fw-bold py-3 border-bottom-0 text-dark">
                  ₹33,80,000
                </td>
                <td className="small py-3 border-bottom-0 text-muted">
                  Mar 31, 2026
                </td>
                <td className="py-3 border-bottom-0">
                  <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-2 py-1">
                    <span style={{ fontSize: "8px" }}>●</span> Paid
                  </span>
                </td>
                <td className="py-3 border-bottom-0 d-flex gap-2">
                  <Button
                    variant="outline"
                    className="btn btn-sm btn-white border fw-medium px-3"
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    className="btn btn-sm btn-white border fw-medium px-3"
                  >
                    Download
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="small text-muted py-3 border-bottom-0">
                  PAY-FEB-2026
                </td>
                <td className="small fw-bold py-3 border-bottom-0 text-dark">
                  February 2026
                </td>
                <td className="small py-3 border-bottom-0 text-muted">46</td>
                <td className="small fw-medium py-3 border-bottom-0 text-muted">
                  ₹36,20,000
                </td>
                <td className="small fw-bold py-3 border-bottom-0 text-dark">
                  ₹32,10,000
                </td>
                <td className="small py-3 border-bottom-0 text-muted">
                  Feb 28, 2026
                </td>
                <td className="py-3 border-bottom-0">
                  <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-2 py-1">
                    <span style={{ fontSize: "8px" }}>●</span> Paid
                  </span>
                </td>
                <td className="py-3 border-bottom-0 d-flex gap-2">
                  <Button
                    variant="outline"
                    className="btn btn-sm btn-white border fw-medium px-3"
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    className="btn btn-sm btn-white border fw-medium px-3"
                  >
                    Download
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="small text-muted py-3 border-bottom-0">
                  PAY-JAN-2026
                </td>
                <td className="small fw-bold py-3 border-bottom-0 text-dark">
                  January 2026
                </td>
                <td className="small py-3 border-bottom-0 text-muted">45</td>
                <td className="small fw-medium py-3 border-bottom-0 text-muted">
                  ₹35,40,000
                </td>
                <td className="small fw-bold py-3 border-bottom-0 text-dark">
                  ₹31,50,000
                </td>
                <td className="small py-3 border-bottom-0 text-muted">—</td>
                <td className="py-3 border-bottom-0">
                  <span className="badge bg-warning bg-opacity-10 text-warning-dark border border-warning border-opacity-25 rounded-pill px-2 py-1">
                    <span style={{ fontSize: "8px" }}>●</span> Pending
                  </span>
                </td>
                <td className="py-3 border-bottom-0 d-flex gap-2">
                  <Button
                    variant="outline"
                    className="btn btn-sm btn-white border fw-medium px-3"
                  >
                    View
                  </Button>
                  <Button
                    variant="primary"
                    className="btn btn-sm btn-primary bg-blue border-0 fw-medium px-3 text-white"
                  >
                    Resume
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="small text-muted py-3 border-bottom-0">
                  PAY-DEC-2025
                </td>
                <td className="small fw-bold py-3 border-bottom-0 text-dark">
                  December 2025
                </td>
                <td className="small py-3 border-bottom-0 text-muted">44</td>
                <td className="small fw-medium py-3 border-bottom-0 text-muted">
                  ₹34,90,000
                </td>
                <td className="small fw-bold py-3 border-bottom-0 text-dark">
                  ₹30,85,000
                </td>
                <td className="small py-3 border-bottom-0 text-muted">
                  Dec 31, 2025
                </td>
                <td className="py-3 border-bottom-0">
                  <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 rounded-pill px-2 py-1">
                    <span style={{ fontSize: "8px" }}>●</span> Failed
                  </span>
                </td>
                <td className="py-3 border-bottom-0 d-flex gap-2">
                  <Button
                    variant="outline"
                    className="btn btn-sm btn-white border fw-medium px-3"
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    className="btn btn-sm btn-white border fw-medium px-3"
                  >
                    Download
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="small text-muted py-3">PAY-FEB-2026</td>
                <td className="small fw-bold py-3 text-dark">February 2026</td>
                <td className="small py-3 text-muted">46</td>
                <td className="small fw-medium py-3 text-muted">₹36,20,000</td>
                <td className="small fw-bold py-3 text-dark">₹32,10,000</td>
                <td className="small py-3 text-muted">Feb 28, 2026</td>
                <td className="py-3">
                  <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-2 py-1">
                    <span style={{ fontSize: "8px" }}>●</span> Paid
                  </span>
                </td>
                <td className="py-3 d-flex gap-2">
                  <Button
                    variant="outline"
                    className="btn btn-sm btn-white border fw-medium px-3"
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    className="btn btn-sm btn-white border fw-medium px-3"
                  >
                    Download
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-4">
          <span className="small text-muted">Showing 1-8 of 16 records</span>
          <div className="d-flex gap-1">
            <button className="btn btn-sm btn-light border px-2 text-muted">
              ‹
            </button>
            <button className="btn btn-sm btn-primary bg-blue border-0 px-3 text-white">
              1
            </button>
            <button className="btn btn-sm btn-light border px-3 text-muted bg-white">
              2
            </button>
            <button className="btn btn-sm btn-light border px-2 text-muted">
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PayrollSetup = ({ onNext }) => {
  const [employeeScope, setEmployeeScope] = useState("all");
  const [isScopeOpen, setIsScopeOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [isMethodOpen, setIsMethodOpen] = useState(false);
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mt-2 mb-1">Payroll Setup</h3>
          <p className="text-muted small">
            Configure payroll period and employee scope.
          </p>
        </div>
        <div className="d-flex gap-3">
          <Button
            variant="outline"
            className="btn btn-white border px-4 fw-medium d-flex align-items-center gap-2"
          >
            <Download size={16} /> Export CSV
          </Button>
          <Button
            variant="primary"
            className="btn btn-primary bg-blue border-0 px-4 fw-medium d-flex align-items-center gap-2 text-white"
          >
            <Play size={16} /> Run Payroll
          </Button>
        </div>
      </div>

      <div className="wizard-stepper px-4">
        <div className="wizard-progress-bar" style={{ width: "0%" }}></div>
        <div className="wizard-step active">
          <div className="wizard-step-icon bg-primary border-primary text-white">
            1
          </div>
          <div className="wizard-step-label text-primary">Setup</div>
          <div className="wizard-step-sub">Period & scope</div>
        </div>
        <div className="wizard-step pending">
          <div className="wizard-step-icon">2</div>
          <div className="wizard-step-label">Process</div>
          <div className="wizard-step-sub">Auto-calculate</div>
        </div>
        <div className="wizard-step pending">
          <div className="wizard-step-icon">3</div>
          <div className="wizard-step-label">Review</div>
          <div className="wizard-step-sub">Verify data</div>
        </div>
        <div className="wizard-step pending">
          <div className="wizard-step-icon">4</div>
          <div className="wizard-step-label">Adjust</div>
          <div className="wizard-step-sub">Edits & bonus</div>
        </div>
        <div className="wizard-step pending">
          <div className="wizard-step-icon">5</div>
          <div className="wizard-step-label">Approve</div>
          <div className="wizard-step-sub">Sign-off</div>
        </div>
        <div className="wizard-step pending">
          <div className="wizard-step-icon">6</div>
          <div className="wizard-step-label">Pay</div>
          <div className="wizard-step-sub">Disburse</div>
        </div>
      </div>

      <div className="payroll-card p-4 mx-auto border mt-4">
        <h6 className="fw-bold mb-4">Payroll Configuration</h6>

        <div className="row g-4 mb-4">
          <div className="col-12 col-md-6">
            <label className="form-label small fw-bold text-muted mb-2">
              Payroll Month
            </label>
            <input
              type="text"
              className="form-control bg-white"
              defaultValue="April"
            />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label small fw-bold text-muted mb-2">
              Year
            </label>
            <input
              type="text"
              className="form-control bg-white"
              defaultValue="2026"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label small fw-bold text-muted mb-2">
            Employee Scope
          </label>
          <div className="border rounded">
            <div
              className="p-3 d-flex justify-content-between align-items-center cursor-pointer bg-white"
              onClick={() => setIsScopeOpen(!isScopeOpen)}
            >
              <span className="fw-medium">
                {employeeScope === "all"
                  ? "All Employees (48)"
                  : "Specific Employee"}
              </span>
              <ChevronDown size={18} className="text-muted" />
            </div>
            {isScopeOpen && (
              <div className="border-top">
                <div
                  className={`p-3 border-bottom bg-white cursor-pointer ${
                    employeeScope === "all"
                      ? "text-primary fw-medium bg-primary bg-opacity-10"
                      : ""
                  }`}
                  onClick={() => {
                    setEmployeeScope("all");
                    setIsScopeOpen(false);
                  }}
                >
                  All Employees (48)
                </div>
                <div
                  className={`p-3 bg-white cursor-pointer ${
                    employeeScope === "specific"
                      ? "text-primary fw-medium bg-primary bg-opacity-10"
                      : ""
                  }`}
                  onClick={() => {
                    setEmployeeScope("specific");
                    setIsScopeOpen(false);
                  }}
                >
                  Specific Employee
                </div>
              </div>
            )}
          </div>
        </div>

        {employeeScope === "specific" && (
          <div className="mb-4 fade-in">
            <label className="form-label small fw-bold text-muted mb-2">
              Specific Employee
            </label>
            <input
              type="text"
              className="form-control bg-white"
              placeholder="Employee ID"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="form-label small fw-bold text-muted mb-2">
            Payment Method
          </label>
          <div className="border rounded">
            <div
              className="p-3 d-flex justify-content-between align-items-center cursor-pointer bg-white"
              onClick={() => setIsMethodOpen(!isMethodOpen)}
            >
              <span className="fw-medium">
                {paymentMethod === "bank"
                  ? "Bank Transfer (NEFT / IMPS)"
                  : paymentMethod === "manual"
                  ? "Manual / Cheque"
                  : paymentMethod}
              </span>
              <ChevronDown size={18} className="text-muted" />
            </div>
            {isMethodOpen && (
              <div className="border-top">
                <div
                  className={`p-3 border-bottom bg-white cursor-pointer ${
                    paymentMethod === "bank"
                      ? "text-white fw-medium bg-primary"
                      : ""
                  }`}
                  onClick={() => {
                    setPaymentMethod("bank");
                    setIsMethodOpen(false);
                  }}
                >
                  Bank Transfer (NEFT / IMPS)
                </div>
                <div
                  className={`p-3 border-bottom bg-white cursor-pointer ${
                    paymentMethod === "manual"
                      ? "text-white fw-medium bg-primary"
                      : ""
                  }`}
                  onClick={() => {
                    setPaymentMethod("manual");
                    setIsMethodOpen(false);
                  }}
                >
                  Manual Cheque
                </div>
                <div
                  className="p-3 bg-white cursor-pointer border-bottom fw-medium small text-muted"
                  onClick={() => setIsAddingCustom(true)}
                >
                  + Custom Method
                </div>
                {isAddingCustom && (
                  <div className="p-2 bg-light d-flex gap-2 border-top">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="New Payment Method"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setPaymentMethod(e.target.value);
                          setIsAddingCustom(false);
                          setIsMethodOpen(false);
                        }
                      }}
                    />
                    <Button
                      variant="primary"
                      className="btn btn-sm btn-primary bg-blue border-0 px-3"
                    >
                      Add
                    </Button>
                    <Button
                      variant="outline"
                      className="btn btn-sm btn-light border px-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAddingCustom(false);
                      }}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-12 col-md-6">
            <label className="form-label small fw-bold text-muted mb-2">
              Payment Date
            </label>
            <div className="position-relative">
              <input
                type="text"
                className="form-control bg-white pe-5"
                defaultValue="30-04-2026"
              />
              <Calendar
                size={16}
                className="text-muted position-absolute top-50 end-0 translate-middle-y me-3"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label small fw-bold text-muted mb-2">
              Payroll Reference
            </label>
            <input
              type="text"
              className="form-control bg-white"
              defaultValue="PAY-APR-2026"
            />
          </div>
        </div>

        <div className="bg-light rounded p-4 mb-4 mt-5">
          <h6 className="fw-bold small text-muted text-uppercase letter-spacing-1 mb-3">
            SUMMARY PREVIEW
          </h6>
          <div className="row g-4">
            <div className="col-12 col-md-3">
              <span className="text-muted small d-block mb-1">Period</span>
              <span className="fw-bold">April 2026</span>
            </div>
            <div className="col-12 col-md-3">
              <span className="text-muted small d-block mb-1">Employees</span>
              <span className="fw-bold">
                {employeeScope === "all" ? "48" : "1"}
              </span>
            </div>
            <div className="col-12 col-md-3">
              <span className="text-muted small d-block mb-1">Est. Cost</span>
              <span className="fw-bold">₹34.2L</span>
            </div>
            <div className="col-12 col-md-3">
              <span className="text-muted small d-block mb-1">Pay Date</span>
              <span className="fw-bold">Apr 30, 2026</span>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-3 mt-4">
          <Button
            variant="outline"
            className="btn btn-white border px-4 fw-medium text-muted"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="btn btn-primary bg-blue border-0 px-4 fw-medium d-flex align-items-center gap-2"
            onClick={onNext}
          >
            Generate Payroll <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

const TaxPFSettings = () => {
  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Breadcrumb items={["Dashboard", "Payroll"]} />
          <h3 className="fw-bold mt-2 mb-1">Tax & PF Settings</h3>
          <p className="text-muted small">
            Configure tax slabs, PF rules and statutory compliance settings.
          </p>
        </div>
        <div className="d-flex gap-3">
          <Button
            variant="outline"
            className="btn btn-white border px-4 fw-medium d-flex align-items-center gap-2"
          >
            <RefreshCw size={16} /> Reset to Default
          </Button>
          <Button
            variant="primary"
            className="btn btn-primary bg-blue border-0 px-4 fw-medium d-flex align-items-center gap-2 text-white"
          >
            <Check size={16} /> Save Settings
          </Button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-7">

          <div className="payroll-card p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold m-0">Provident Fund (PF)</h6>
              <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-3 py-1 d-flex align-items-center gap-1">
                <span style={{ fontSize: "12px" }}>●</span> Active
              </span>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4 pb-4 border-bottom">
              <div>
                <h6 className="fw-bold m-0 mb-1" style={{ fontSize: "0.9rem" }}>
                  Employee PF Contribution
                </h6>
                <span className="text-muted small">
                  Deducted from employee salary
                </span>
              </div>
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  className="form-control form-control-sm text-end"
                  style={{ width: 60 }}
                  defaultValue="12"
                />
                <span className="ms-2 fw-medium">%</span>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4 pb-4 border-bottom">
              <div>
                <h6 className="fw-bold m-0 mb-1" style={{ fontSize: "0.9rem" }}>
                  Employer PF Contribution
                </h6>
                <span className="text-muted small">Added to CTC</span>
              </div>
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  className="form-control form-control-sm text-end"
                  style={{ width: 60 }}
                  defaultValue="12"
                />
                <span className="ms-2 fw-medium">%</span>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4 pb-4 border-bottom">
              <div>
                <h6 className="fw-bold m-0 mb-1" style={{ fontSize: "0.9rem" }}>
                  PF Wage Ceiling
                </h6>
                <span className="text-muted small">
                  Monthly PF calculated on max
                </span>
              </div>
              <div className="d-flex align-items-center">
                <div
                  className="input-group input-group-sm"
                  style={{ width: 120 }}
                >
                  <span className="input-group-text bg-light border-end-0">
                    ₹
                  </span>
                  <input
                    type="text"
                    className="form-control text-end border-start-0"
                    defaultValue="15,000"
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold m-0 mb-1" style={{ fontSize: "0.9rem" }}>
                  Enable EPF for all employees
                </h6>
                <span className="text-muted small">
                  Mandatory for CTC {">"} ₹15,000
                </span>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="payroll-card p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold m-0">Professional Tax</h6>
              <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-3 py-1 d-flex align-items-center gap-1">
                <span style={{ fontSize: "12px" }}>●</span> Active
              </span>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4 pb-4 border-bottom">
              <div>
                <h6 className="fw-bold m-0 mb-1" style={{ fontSize: "0.9rem" }}>
                  State
                </h6>
                <span className="text-muted small">
                  Professional tax varies by state
                </span>
              </div>
              <div className="border rounded px-3 py-1 bg-white small fw-medium">
                Telangana
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold m-0 mb-1" style={{ fontSize: "0.9rem" }}>
                  Monthly PT (Telangana)
                </h6>
                <span className="text-muted small">
                  Salary {">"} ₹15,000: ₹200/month
                </span>
              </div>
              <div className="d-flex align-items-center">
                <div
                  className="input-group input-group-sm"
                  style={{ width: 100 }}
                >
                  <span className="input-group-text bg-light border-end-0">
                    ₹
                  </span>
                  <input
                    type="text"
                    className="form-control text-end border-start-0"
                    defaultValue="200"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="payroll-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold m-0">ESIC Settings</h6>
              <span className="badge bg-warning bg-opacity-10 text-warning-dark border border-warning border-opacity-25 rounded-pill px-3 py-1 d-flex align-items-center gap-1">
                <span style={{ fontSize: "12px" }}>●</span> Optional
              </span>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4 pb-4 border-bottom">
              <div>
                <h6 className="fw-bold m-0 mb-1" style={{ fontSize: "0.9rem" }}>
                  Enable ESIC
                </h6>
                <span className="text-muted small">
                  Employees earning {"<"} ₹21,000/month
                </span>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold m-0 mb-1" style={{ fontSize: "0.9rem" }}>
                  Employee Contribution
                </h6>
              </div>
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  className="form-control form-control-sm text-end"
                  style={{ width: 70 }}
                  defaultValue="0.75"
                />
                <span className="ms-2 fw-medium">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="payroll-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold m-0">Income Tax Slabs (FY 2025-26)</h6>
              <span className="badge bg-light text-dark border px-3 py-1 rounded-pill small">
                New Regime
              </span>
            </div>

            <div className="table-responsive">
              <table className="table align-middle">
                <thead
                  className="table-light text-muted"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.5px" }}
                >
                  <tr>
                    <th className="fw-bold border-bottom-0 pb-3">
                      INCOME RANGE
                    </th>
                    <th className="fw-bold border-bottom-0 pb-3">TAX RATE</th>
                    <th className="fw-bold border-bottom-0 pb-3 text-end">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="small fw-medium py-3 border-bottom-0">
                      Up to ₹3,00,000
                    </td>
                    <td className="small text-muted py-3 border-bottom-0">
                      <span className="badge bg-light text-dark border">
                        0%
                      </span>
                    </td>
                    <td className="text-end py-3 border-bottom-0">
                      <span className="text-primary small fw-medium cursor-pointer">
                        Edit
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="small fw-medium py-3 border-bottom-0">
                      ₹3,00,001 - ₹7,00,000
                    </td>
                    <td className="small text-muted py-3 border-bottom-0">
                      <span className="badge bg-light text-dark border">
                        5%
                      </span>
                    </td>
                    <td className="text-end py-3 border-bottom-0">
                      <span className="text-primary small fw-medium cursor-pointer">
                        Edit
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="small fw-medium py-3 border-bottom-0">
                      ₹7,00,001 - ₹10,00,000
                    </td>
                    <td className="small text-muted py-3 border-bottom-0">
                      <span className="badge bg-light text-dark border">
                        10%
                      </span>
                    </td>
                    <td className="text-end py-3 border-bottom-0">
                      <span className="text-primary small fw-medium cursor-pointer">
                        Edit
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="small fw-medium py-3 border-bottom-0">
                      ₹10,00,001 - ₹12,00,000
                    </td>
                    <td className="small text-muted py-3 border-bottom-0">
                      <span className="badge bg-light text-dark border">
                        15%
                      </span>
                    </td>
                    <td className="text-end py-3 border-bottom-0">
                      <span className="text-primary small fw-medium cursor-pointer">
                        Edit
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="small fw-medium py-3 border-bottom-0">
                      ₹12,00,001 - ₹15,00,000
                    </td>
                    <td className="small text-muted py-3 border-bottom-0">
                      <span className="badge bg-light text-dark border">
                        20%
                      </span>
                    </td>
                    <td className="text-end py-3 border-bottom-0">
                      <span className="text-primary small fw-medium cursor-pointer">
                        Edit
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="small fw-medium py-3">Above ₹15,00,000</td>
                    <td className="small text-muted py-3">
                      <span className="badge bg-light text-dark border">
                        30%
                      </span>
                    </td>
                    <td className="text-end py-3">
                      <span className="text-primary small fw-medium cursor-pointer">
                        Edit
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Button
              variant="outline"
              className="btn btn-white border w-100 fw-medium d-flex align-items-center justify-content-center gap-2 mb-4"
            >
              <Plus size={16} /> Add Tax Slab
            </Button>

            <div className="bg-primary bg-opacity-10 text-primary p-3 rounded d-flex gap-3 align-items-start border border-primary border-opacity-25">
              <Info size={16} className="mt-1 flex-shrink-0" />
              <p className="small m-0 fw-medium">
                Rebate u/s 87A: Income up to ₹7L is exempt under new regime
                after rebate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PayrollProcess = ({ onNext }) => {
  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mt-2 mb-1">Payroll Process</h3>
          <p className="text-muted small">
            Configure payroll period and employee scope.
          </p>
        </div>
        <div className="d-flex gap-3">
          <Button
            variant="outline"
            className="btn btn-white border px-4 fw-medium d-flex align-items-center gap-2"
          >
            <Download size={16} /> Export CSV
          </Button>
          <Button
            variant="primary"
            className="btn btn-primary bg-blue border-0 px-4 fw-medium d-flex align-items-center gap-2 text-white"
          >
            <Play size={16} /> Run Payroll
          </Button>
        </div>
      </div>

      <div className="wizard-stepper px-4">
        <div className="wizard-progress-bar" style={{ width: "20%" }}></div>
        <div className="wizard-step completed">
          <div className="wizard-step-icon">
            <Check size={18} />
          </div>
          <div className="wizard-step-label">Setup</div>
          <div className="wizard-step-sub">Period & scope</div>
        </div>
        <div className="wizard-step active">
          <div className="wizard-step-icon bg-primary border-primary text-white">
            2
          </div>
          <div className="wizard-step-label text-primary">Process</div>
          <div className="wizard-step-sub">Auto-calculate</div>
        </div>
        <div className="wizard-step pending">
          <div className="wizard-step-icon">3</div>
          <div className="wizard-step-label">Review</div>
          <div className="wizard-step-sub">Verify data</div>
        </div>
        <div className="wizard-step pending">
          <div className="wizard-step-icon">4</div>
          <div className="wizard-step-label">Adjust</div>
          <div className="wizard-step-sub">Edits & bonus</div>
        </div>
        <div className="wizard-step pending">
          <div className="wizard-step-icon">5</div>
          <div className="wizard-step-label">Approve</div>
          <div className="wizard-step-sub">Sign-off</div>
        </div>
        <div className="wizard-step pending">
          <div className="wizard-step-icon">6</div>
          <div className="wizard-step-label">Pay</div>
          <div className="wizard-step-sub">Disburse</div>
        </div>
      </div>

      <div
        className="payroll-card p-5 mx-auto border mt-5"
        style={{
          maxWidth: "650px",
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)",
        }}
      >
        <div className="text-center mb-5">
          <h5 className="fw-bold mb-1">Calculating Payroll</h5>
          <p className="text-muted small m-0">
            April 2026 • 48 Employees • PAY-APR-2026
          </p>
        </div>

        <div className="mb-5">
          <div className="process-step-item completed">
            <div className="process-step-icon-wrapper">
              <Check size={18} />
            </div>
            <span className="fw-medium small">
              Fetching attendance records (48/48)
            </span>
          </div>
          <div className="process-step-item completed">
            <div className="process-step-icon-wrapper">
              <Check size={18} />
            </div>
            <span className="fw-medium small">
              Calculating leave deductions (7 leaves applied)
            </span>
          </div>
          <div className="process-step-item active">
            <div className="process-step-icon-wrapper">
              <Loader2 size={18} className="spin-animation" />
            </div>
            <span className="fw-medium small">
              Applying salary structures & rules...
            </span>
          </div>
          <div className="process-step-item pending">
            <div className="process-step-icon-wrapper"></div>
            <span className="fw-medium small">
              Computing bonuses & deductions
            </span>
          </div>
          <div className="process-step-item pending">
            <div className="process-step-icon-wrapper"></div>
            <span className="fw-medium small">
              Calculating net pay for all employees
            </span>
          </div>
        </div>

        <div className="text-center mb-4">
          <div
            className="progress mb-2"
            style={{ height: "6px", borderRadius: "3px" }}
          >
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{ width: "55%" }}
              aria-valuenow="55"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <span className="text-muted small">
            55% complete • Estimated 30 seconds remaining
          </span>
        </div>

        <Button
          variant="primary"
          className="btn btn-primary bg-blue border-0 w-100 fw-medium"
          onClick={onNext}
        >
          Skip to Results <ArrowRight size={16} className="ms-2" />
        </Button>
      </div>
    </div>
  );
};

const PayrollReview = ({ onNext }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <div className="fade-in position-relative">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mt-2 mb-1">Payroll Review</h3>
          <p className="text-muted small">
            Configure payroll period and employee scope.
          </p>
        </div>
      </div>

      <div className="wizard-stepper px-4">
        <div className="wizard-progress-bar" style={{ width: "40%" }}></div>
        <div className="wizard-step completed">
          <div className="wizard-step-icon">
            <Check size={18} />
          </div>
          <div className="wizard-step-label">Setup</div>
          <div className="wizard-step-sub">Period & scope</div>
        </div>
        <div className="wizard-step completed">
          <div className="wizard-step-icon">
            <Check size={18} />
          </div>
          <div className="wizard-step-label">Process</div>
          <div className="wizard-step-sub">Auto-calculate</div>
        </div>
        <div className="wizard-step active">
          <div className="wizard-step-icon bg-primary border-primary text-white">
            3
          </div>
          <div className="wizard-step-label text-primary">Review</div>
          <div className="wizard-step-sub">Verify data</div>
        </div>
        <div className="wizard-step pending">
          <div className="wizard-step-icon">4</div>
          <div className="wizard-step-label">Adjust</div>
          <div className="wizard-step-sub">Edits & bonus</div>
        </div>
        <div className="wizard-step pending">
          <div className="wizard-step-icon">5</div>
          <div className="wizard-step-label">Approve</div>
          <div className="wizard-step-sub">Sign-off</div>
        </div>
        <div className="wizard-step pending">
          <div className="wizard-step-icon">6</div>
          <div className="wizard-step-label">Pay</div>
          <div className="wizard-step-sub">Disburse</div>
        </div>
      </div>

      <div className="row g-4 mt-2">
        <div className="col-12 col-md-4">
          <div className="payroll-card p-4 h-100">
            <span className="text-muted small fw-bold">EMPLOYEES</span>
            <h3 className="fw-bold text-primary mt-2 m-0">48</h3>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="payroll-card p-4 h-100">
            <span className="text-muted small fw-bold">GROSS PAY</span>
            <h3 className="fw-bold mt-2 m-0">₹38.5L</h3>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="payroll-card p-4 h-100">
            <span className="text-muted small fw-bold">DEDUCTIONS</span>
            <h3 className="fw-bold text-danger mt-2 m-0">-₹3.2L</h3>
          </div>
        </div>
      </div>

      <div className="payroll-card p-4 mt-4">
        <div className="mb-4">
          <div
            className="d-flex align-items-center text-muted"
            style={{ width: 250 }}
          >
            <Search size={18} className="me-2" />
            <input
              type="text"
              className="dist-search-input"
              placeholder="Search employee..."
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light text-muted small">
              <tr>
                <th className="fw-bold border-bottom-0 pb-3">ID</th>
                <th className="fw-bold border-bottom-0 pb-3">EMPLOYEE</th>
                <th className="fw-bold border-bottom-0 pb-3">ROLE</th>
                <th className="fw-bold border-bottom-0 pb-3">BASE SALARY</th>
                <th className="fw-bold border-bottom-0 pb-3 text-success">
                  ALLOWANCES
                </th>
                <th className="fw-bold border-bottom-0 pb-3 text-danger">
                  DEDUCTIONS
                </th>
                <th className="fw-bold border-bottom-0 pb-3 text-primary">
                  NET PAY
                </th>
                <th className="fw-bold border-bottom-0 pb-3 text-end">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, i) => (
                <tr
                  key={i}
                  onClick={() => setSelectedEmployee(emp)}
                  style={{ cursor: "pointer" }}
                >
                  <td className="small text-muted">{emp.id}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div
                        className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex justify-content-center align-items-center me-3 fw-bold"
                        style={{ width: 32, height: 32, fontSize: "0.75rem" }}
                      >
                        {emp.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h6
                          className="m-0 fw-bold"
                          style={{ fontSize: "0.9rem" }}
                        >
                          {emp.name}
                        </h6>
                        <span className="text-muted small">Engineering</span>
                      </div>
                    </div>
                  </td>
                  <td className="small text-muted">{emp.role}</td>
                  <td className="fw-medium small">{emp.base}</td>
                  <td className="fw-medium small text-success">
                    +{emp.allowances}
                  </td>
                  <td className="fw-medium small text-danger">
                    {emp.deductions}
                  </td>
                  <td className="fw-bold small text-primary">{emp.net}</td>
                  <td className="text-end">
                    <Button
                      variant="outline"
                      className="btn btn-sm btn-white border px-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEmployee(emp);
                      }}
                    >
                      Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 d-flex justify-content-between align-items-center">
          <span className="text-muted small">
            Showing 1 - 5 of 48 employees
          </span>
          <Button
            variant="primary"
            className="btn btn-primary bg-blue border-0 px-5 fw-medium"
            onClick={onNext}
          >
            Continue <ArrowRight size={16} className="ms-2" />
          </Button>
        </div>
      </div>

      {selectedEmployee && (
        <div className="review-slide-out">
          <div className="review-slide-header d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold m-0">{selectedEmployee.name}</h5>
              <p className="text-muted small m-0">
                {selectedEmployee.id} • {selectedEmployee.role} • April 2026
              </p>
            </div>
            <button
              className="btn btn-light rounded-circle p-2"
              onClick={() => setSelectedEmployee(null)}
            >
              <X size={20} />
            </button>
          </div>
          <div className="review-slide-content">
            <div className="rule-row justify-content-between mb-4">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="bg-primary text-white rounded d-flex justify-content-center align-items-center fw-bold"
                  style={{ width: 40, height: 40 }}
                >
                  {selectedEmployee.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h6 className="fw-bold m-0">{selectedEmployee.name}</h6>
                  <span className="text-muted small">
                    {selectedEmployee.id} • {selectedEmployee.role}
                  </span>
                </div>
              </div>
              <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-3 py-1 d-flex align-items-center gap-1">
                <span style={{ fontSize: "12px" }}>●</span> Calculated
              </span>
            </div>

            <h6 className="fw-bold mb-3 mt-4">Earnings</h6>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted small">Basic Salary</span>
              <span className="fw-medium small">₹30,000</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted small">HRA (40%)</span>
              <span className="fw-medium small text-success">+ ₹12,000</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted small">Transport Allowance</span>
              <span className="fw-medium small text-success">+ ₹3,000</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <span className="text-muted small">Performance Bonus</span>
              <input
                type="text"
                className="form-control form-control-sm text-end"
                style={{ width: 100 }}
                defaultValue="₹5,000"
              />
            </div>

            <h6 className="fw-bold mb-3 mt-5">Deductions</h6>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted small">PF Contribution (12%)</span>
              <span className="fw-medium small text-danger">- ₹3,600</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted small">TDS / Income Tax</span>
              <span className="fw-medium small text-danger">- ₹1,200</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted small">Professional Tax</span>
              <span className="fw-medium small text-danger">- ₹200</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted small">Leave Deduction</span>
              <span className="fw-medium small text-danger">- ₹0</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <span className="text-muted small">One-time Penalty</span>
              <input
                type="text"
                className="form-control form-control-sm text-end"
                style={{ width: 100 }}
                defaultValue="₹0"
              />
            </div>

            <div className="bg-primary bg-opacity-10 rounded p-3 d-flex justify-content-between align-items-center mb-4 border border-primary border-opacity-25">
              <span className="fw-bold text-primary">Final Net Pay</span>
              <h4 className="fw-bold text-primary m-0">₹48,000</h4>
            </div>

            <Button
              variant="outline"
              className="btn btn-white border w-100 py-2 fw-medium text-muted"
            >
              + Add One-time Payment
            </Button>
          </div>
          <div className="review-slide-footer d-flex gap-3">
            <Button
              variant="outline"
              className="btn btn-white border px-4 flex-shrink-0 fw-medium d-flex align-items-center gap-2"
            >
              <Edit size={16} /> Adjustments
            </Button>
            <Button
              variant="primary"
              className="btn btn-primary bg-blue border-0 flex-grow-1 fw-medium d-flex align-items-center justify-content-center gap-2 text-white"
              onClick={() => setSelectedEmployee(null)}
            >
              <Check size={16} /> Save Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const PayrollAdjust = ({ onNext, onPrev }) => (
  <div className="fade-in">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h3 className="fw-bold mt-2 mb-1">Payroll Adjust</h3>
        <p className="text-muted small">
          Configure payroll period and employee scope.
        </p>
      </div>
      <div className="d-flex gap-3">
        <Button
          variant="outline"
          className="btn btn-white border px-4 fw-medium d-flex align-items-center gap-2"
          onClick={onPrev}
        >
          <ArrowLeft size={16} /> Back
        </Button>
        <Button
          variant="outline"
          className="btn btn-white border px-4 fw-medium d-flex align-items-center gap-2"
        >
          <Edit size={16} /> Adjustments
        </Button>
        <Button
          variant="primary"
          className="btn btn-primary bg-blue border-0 px-4 fw-medium d-flex align-items-center gap-2"
          onClick={onNext}
        >
          Proceed to Approval <ArrowRight size={16} />
        </Button>
      </div>
    </div>

    <div className="wizard-stepper px-4">
      <div className="wizard-progress-bar" style={{ width: "60%" }}></div>
      <div className="wizard-step completed">
        <div className="wizard-step-icon">
          <Check size={18} />
        </div>
        <div className="wizard-step-label">Setup</div>
        <div className="wizard-step-sub">Period & scope</div>
      </div>
      <div className="wizard-step completed">
        <div className="wizard-step-icon">
          <Check size={18} />
        </div>
        <div className="wizard-step-label">Process</div>
        <div className="wizard-step-sub">Auto-calculate</div>
      </div>
      <div className="wizard-step completed">
        <div className="wizard-step-icon">
          <Check size={18} />
        </div>
        <div className="wizard-step-label">Review</div>
        <div className="wizard-step-sub">Verify data</div>
      </div>
      <div className="wizard-step active">
        <div className="wizard-step-icon">4</div>
        <div className="wizard-step-label">Adjust</div>
        <div className="wizard-step-sub">Edits & bonus</div>
      </div>
      <div className="wizard-step">
        <div className="wizard-step-icon">5</div>
        <div className="wizard-step-label">Approve</div>
        <div className="wizard-step-sub">Sign-off</div>
      </div>
      <div className="wizard-step">
        <div className="wizard-step-icon">6</div>
        <div className="wizard-step-label">Pay</div>
        <div className="wizard-step-sub">Disburse</div>
      </div>
    </div>

    <div className="row g-4">
      <div className="col-12 col-lg-8">
        <div className="payroll-card p-4 mb-4">
          <h6 className="fw-bold mb-4">Add Adjustment</h6>
          <div className="mb-4">
            <label className="payroll-form-label">Employee</label>
            <input
              type="text"
              className="payroll-form-control w-100"
              defaultValue="Srinivas Kandagatla — EMP011"
            />
          </div>
          <div className="row g-4 mb-4">
            <div className="col-6">
              <label className="payroll-form-label">Adjustment Type</label>
              <input type="text" className="payroll-form-control w-100" />
            </div>
            <div className="col-6">
              <label className="payroll-form-label">Amount</label>
              <div className="component-input">
                <div className="component-prefix">₹</div>
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="payroll-form-label">Apply To</label>
            <input
              type="text"
              className="payroll-form-control w-100"
              defaultValue="This month only"
            />
          </div>
          <div className="mb-4">
            <label className="payroll-form-label">Reason / Notes</label>
            <textarea
              className="payroll-form-control w-100"
              rows="3"
              placeholder="Reason for this adjustment..."
            ></textarea>
          </div>
          <div className="d-flex justify-content-end gap-3 pt-3">
            <Button variant="outline" className="btn btn-white border px-4">
              Reset
            </Button>
            <Button
              variant="primary"
              className="btn btn-primary bg-blue border-0 px-4 d-flex align-items-center gap-2"
            >
              <Plus size={16} /> Add Adjustment
            </Button>
          </div>
        </div>

        <div className="payroll-card p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6 className="fw-bold m-0">Applied Adjustments</h6>
            <span
              className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 rounded-pill px-2 py-1"
              style={{ fontSize: "0.7rem" }}
            >
              • 4 items
            </span>
          </div>

          <div className="rule-row align-items-start">
            <div className="me-3 mt-1">
              <div
                className="avatar bg-success bg-opacity-10 text-success rounded border border-success border-opacity-25 d-flex justify-content-center align-items-center"
                style={{ width: 32, height: 32 }}
              >
                <Plus size={16} />
              </div>
            </div>
            <div className="flex-grow-1">
              <h6 className="fw-bold m-0 mb-1">Festival Bonus</h6>
              <span className="text-muted small">All Employees</span>
            </div>
            <div className="text-end me-4">
              <h6 className="fw-bold text-success m-0">+₹1,00,000</h6>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline" className="btn btn-sm btn-white border">
                Edit
              </Button>
              <Button
                variant="outline"
                className="btn btn-sm btn-white border border-danger text-danger"
              >
                Remove
              </Button>
            </div>
          </div>

          <div className="rule-row align-items-start">
            <div className="me-3 mt-1">
              <div
                className="avatar bg-success bg-opacity-10 text-success rounded border border-success border-opacity-25 d-flex justify-content-center align-items-center"
                style={{ width: 32, height: 32 }}
              >
                <Plus size={16} />
              </div>
            </div>
            <div className="flex-grow-1">
              <h6 className="fw-bold m-0 mb-1">Performance Bonus</h6>
              <span className="text-muted small">Rahul Sharma</span>
            </div>
            <div className="text-end me-4">
              <h6 className="fw-bold text-success m-0">+₹20,000</h6>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline" className="btn btn-sm btn-white border">
                Edit
              </Button>
              <Button
                variant="outline"
                className="btn btn-sm btn-white border border-danger text-danger"
              >
                Remove
              </Button>
            </div>
          </div>

          <div className="rule-row align-items-start">
            <div className="me-3 mt-1">
              <div
                className="avatar bg-danger bg-opacity-10 text-danger rounded border border-danger border-opacity-25 d-flex justify-content-center align-items-center"
                style={{ width: 32, height: 32 }}
              >
                <Minus size={16} />
              </div>
            </div>
            <div className="flex-grow-1">
              <h6 className="fw-bold m-0 mb-1">Leave Penalty</h6>
              <span className="text-muted small">Ananya Reddy</span>
            </div>
            <div className="text-end me-4">
              <h6 className="fw-bold text-danger m-0">-₹3,000</h6>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline" className="btn btn-sm btn-white border">
                Edit
              </Button>
              <Button
                variant="outline"
                className="btn btn-sm btn-white border border-danger text-danger"
              >
                Remove
              </Button>
            </div>
          </div>

          <div className="rule-row align-items-start mb-0">
            <div className="me-3 mt-1">
              <div
                className="avatar bg-danger bg-opacity-10 text-danger rounded border border-danger border-opacity-25 d-flex justify-content-center align-items-center"
                style={{ width: 32, height: 32 }}
              >
                <Minus size={16} />
              </div>
            </div>
            <div className="flex-grow-1">
              <h6 className="fw-bold m-0 mb-1">Advance Recovery</h6>
              <span className="text-muted small">Emp Test</span>
            </div>
            <div className="text-end me-4">
              <h6 className="fw-bold text-danger m-0">-₹15,500</h6>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline" className="btn btn-sm btn-white border">
                Edit
              </Button>
              <Button
                variant="outline"
                className="btn btn-sm btn-white border border-danger text-danger"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-4">
        <div className="payroll-card p-4 sticky-top" style={{ top: "20px" }}>
          <h6 className="fw-bold mb-4">Adjustment Summary</h6>

          <div className="d-flex justify-content-between mb-3">
            <span className="text-muted small">Original Payroll</span>
            <span className="fw-medium">₹34,18,500</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span className="text-muted small">Total Bonuses Added</span>
            <span className="fw-medium text-success">+ ₹1,25,000</span>
          </div>
          <div className="d-flex justify-content-between mb-4">
            <span className="text-muted small">Total Deductions Added</span>
            <span className="fw-medium text-danger">- ₹18,500</span>
          </div>

          <div className="d-flex justify-content-between pt-4 border-top mb-4">
            <span className="fw-bold text-dark">Revised Payroll Total</span>
            <span
              className="fw-bold text-primary"
              style={{ fontSize: "1.1rem" }}
            >
              ₹35,25,000
            </span>
          </div>

          <div className="p-3 bg-warning-light text-warning-dark border border-warning rounded-3 small d-flex gap-2 align-items-start">
            <AlertTriangle size={16} className="flex-shrink-0 mt-1" />
            <span>
              Adjustments will reflect in individual payslips and the final
              approval screen.
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PayrollApprove = ({ onPrev, onNext }) => (
  <div className="fade-in">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h3 className="fw-bold mt-2 mb-1">Payroll Approve</h3>
        <p className="text-muted small">
          Configure payroll period and employee scope.
        </p>
      </div>
    </div>

    <div className="wizard-stepper px-4">
      <div className="wizard-progress-bar" style={{ width: "80%" }}></div>
      <div className="wizard-step completed">
        <div className="wizard-step-icon">
          <Check size={18} />
        </div>
        <div className="wizard-step-label">Setup</div>
        <div className="wizard-step-sub">Period & scope</div>
      </div>
      <div className="wizard-step completed">
        <div className="wizard-step-icon">
          <Check size={18} />
        </div>
        <div className="wizard-step-label">Process</div>
        <div className="wizard-step-sub">Auto-calculate</div>
      </div>
      <div className="wizard-step completed">
        <div className="wizard-step-icon">
          <Check size={18} />
        </div>
        <div className="wizard-step-label">Review</div>
        <div className="wizard-step-sub">Verify data</div>
      </div>
      <div className="wizard-step completed">
        <div className="wizard-step-icon">
          <Check size={18} />
        </div>
        <div className="wizard-step-label">Adjust</div>
        <div className="wizard-step-sub">Edits & bonus</div>
      </div>
      <div className="wizard-step active">
        <div className="wizard-step-icon">5</div>
        <div className="wizard-step-label">Approve</div>
        <div className="wizard-step-sub">Sign-off</div>
      </div>
      <div className="wizard-step">
        <div className="wizard-step-icon">6</div>
        <div className="wizard-step-label">Pay</div>
        <div className="wizard-step-sub">Disburse</div>
      </div>
    </div>

    <div className="payroll-card p-4 mx-auto" style={{ maxWidth: "800px" }}>
      <div className="approve-summary-card mb-4">
        <div className="row text-center">
          <div className="col-3">
            <h2 className="fw-bold text-primary mb-1">₹35.3L</h2>
            <span className="text-muted small">Total Payout</span>
          </div>
          <div className="col-3 border-start">
            <h2 className="fw-bold text-primary mb-1">48</h2>
            <span className="text-muted small">Employees</span>
          </div>
          <div className="col-3 border-start">
            <h2 className="fw-bold text-primary mb-1">Apr 30</h2>
            <span className="text-muted small">Pay Date</span>
          </div>
          <div className="col-3 border-start">
            <h2 className="fw-bold text-primary mb-1">NEFT</h2>
            <span className="text-muted small">Method</span>
          </div>
        </div>
      </div>

      <div className="payroll-alert-row alert-row-orange mb-4">
        <div className="d-flex align-items-center gap-2 text-warning-dark fw-medium small">
          <AlertTriangle size={16} />{" "}
          <span>
            <strong>1 employee (EMP003)</strong> has a payroll calculation
            error. Resolve before approving or it will be excluded.
          </span>
        </div>
      </div>

      <div className="payroll-card p-4 border mb-4 shadow-none">
        <h6 className="fw-bold mb-4">Approval Chain</h6>

        <div className="approval-chain-block">
          <div className="approval-avatar bg-success">M</div>
          <div className="flex-grow-1">
            <h6 className="fw-bold m-0 mb-1">Manager Review</h6>
            <span className="text-muted small">
              Brahma (Admin) • Apr 28, 2026
            </span>
          </div>
          <div className="text-success fw-bold small d-flex align-items-center gap-1">
            <div
              className="rounded-circle bg-success"
              style={{ width: 6, height: 6 }}
            ></div>{" "}
            Approved
          </div>
        </div>

        <div className="approval-chain-block active mb-0">
          <div className="approval-avatar bg-primary">F</div>
          <div className="flex-grow-1">
            <h6 className="fw-bold m-0 mb-1">Finance Approval</h6>
            <span className="text-muted small">Pending your action</span>
          </div>
          <div className="text-primary fw-bold small d-flex align-items-center gap-1">
            <div
              className="rounded-circle bg-primary"
              style={{ width: 6, height: 6 }}
            ></div>{" "}
            Your Turn
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <Button
          variant="outline"
          className="btn btn-white border border-danger text-danger px-5 fw-medium d-flex align-items-center gap-2"
          onClick={onPrev}
        >
          <X size={16} /> Reject & Send Back
        </Button>
        <Button
          variant="primary"
          className="btn btn-success bg-success border-0 px-5 fw-medium d-flex align-items-center gap-2 text-white"
          onClick={onNext}
        >
          <Check size={16} /> Approve Payroll
        </Button>
      </div>
    </div>
  </div>
);

const PayrollAdministration = ({ setView }) => (
  <div className="fade-in">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <Breadcrumb items={["Dashboard", "Payroll"]} />
        <h3 className="fw-bold mt-2 mb-1">Payroll Administration</h3>
        <p className="text-muted small">
          Manage salary structures, assignments, payslips and deductions.
        </p>
      </div>
      <div className="d-flex gap-3">
        <Button
          variant="outline"
          className="btn btn-white border px-4 fw-medium d-flex align-items-center gap-2"
          onClick={() => setView("payroll-history")}
        >
          <Clock size={16} /> Payroll History
        </Button>
        <Button
          variant="primary"
          className="btn btn-primary bg-blue border-0 px-4 fw-medium d-flex align-items-center gap-2"
          onClick={() => setView("run-payroll-setup")}
        >
          <PlayCircle size={16} /> Run Payroll
        </Button>
      </div>
    </div>

    <div className="row g-4 mb-4">
      <div className="col-12 col-md-3">
        <div className="admin-stat-card stat-card-blue">
          <div className="admin-stat-icon-wrapper">
            <Users size={20} />
          </div>
          <h4 className="fw-bold mb-1">48</h4>
          <span className="text-dark small fw-medium text-uppercase letter-spacing-1">
            Total Employees
          </span>
          <span className="text-muted small">Active on payroll</span>
        </div>
      </div>
      <div className="col-12 col-md-3">
        <div className="admin-stat-card stat-card-green">
          <div className="admin-stat-icon-wrapper">
            <DollarSign size={20} />
          </div>
          <h4 className="fw-bold mb-1">₹34.2L</h4>
          <span className="text-dark small fw-medium text-uppercase letter-spacing-1">
            Payroll Cost
          </span>
          <span className="text-muted small">April 2026</span>
        </div>
      </div>
      <div className="col-12 col-md-3">
        <div className="admin-stat-card stat-card-orange">
          <div className="admin-stat-icon-wrapper">
            <TrendingDown size={20} />
          </div>
          <h4 className="fw-bold mb-1">₹60,000</h4>
          <span className="text-dark small fw-medium text-uppercase letter-spacing-1">
            Deductions
          </span>
          <span className="text-muted small">Active deductions this year</span>
        </div>
      </div>
      <div className="col-12 col-md-3">
        <div className="admin-stat-card stat-card-red">
          <div className="admin-stat-icon-wrapper">
            <AlertTriangle size={20} />
          </div>
          <h4 className="fw-bold mb-1">2</h4>
          <span className="text-dark small fw-medium text-uppercase letter-spacing-1">
            Pending Runs
          </span>
          <span className="text-muted small">Need Attention</span>
        </div>
      </div>
    </div>

    <div className="row g-4 mb-4">
      <div className="col-12 col-lg-7">
        <div className="payroll-card p-4 h-100">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h6 className="fw-bold m-0 mb-1">Pre-Payroll Alerts</h6>
              <span className="text-muted small">
                Resolve before running payroll
              </span>
            </div>
            <Button
              variant="primary"
              className="btn btn-sm btn-primary bg-blue border-0 px-3 d-flex align-items-center gap-2"
              onClick={() => setView("run-payroll-setup")}
            >
              <Play size={14} /> Run Payroll
            </Button>
          </div>

          <div className="payroll-alert-row alert-row-red">
            <div className="d-flex align-items-center gap-2 text-danger-red small fw-medium">
              <div
                className="rounded-circle bg-danger"
                style={{ width: 6, height: 6 }}
              ></div>{" "}
              Missing attendance data
            </div>
            <span className="text-danger-red small fw-bold">3 employees</span>
          </div>
          <div className="payroll-alert-row alert-row-orange">
            <div className="d-flex align-items-center gap-2 text-warning-dark small fw-medium">
              <div
                className="rounded-circle bg-warning"
                style={{ width: 6, height: 6 }}
              ></div>{" "}
              Unapproved leave requests
            </div>
            <span className="text-warning-dark small fw-bold">7 leaves</span>
          </div>
          <div className="payroll-alert-row alert-row-blue">
            <div className="d-flex align-items-center gap-2 text-primary small fw-medium">
              <div
                className="rounded-circle bg-primary"
                style={{ width: 6, height: 6 }}
              ></div>{" "}
              Salary structure not assigned
            </div>
            <span className="text-primary small fw-bold">2 employees</span>
          </div>
          <div className="payroll-alert-row alert-row-orange mb-0">
            <div className="d-flex align-items-center gap-2 text-warning-dark small fw-medium">
              <div
                className="rounded-circle bg-warning"
                style={{ width: 6, height: 6 }}
              ></div>{" "}
              Bank details missing
            </div>
            <span className="text-warning-dark small fw-bold">1 employee</span>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-5">
        <div className="payroll-card p-4 h-100">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6 className="fw-bold m-0">Recent Payroll Runs</h6>
            <span className="text-primary small fw-bold cursor-pointer">
              View All
            </span>
          </div>

          <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
            <div className="d-flex gap-3 align-items-center">
              <div className="bg-light text-primary rounded p-2">
                <Calendar size={18} />
              </div>
              <div>
                <h6 className="fw-bold m-0 mb-1">March 2026</h6>
                <span className="text-muted small">
                  48 employees • Apr 2, 2026
                </span>
              </div>
            </div>
            <div className="text-end">
              <h6 className="fw-bold m-0 mb-1">₹33.8L</h6>
              <span className="text-success small fw-bold d-flex align-items-center justify-content-end gap-1">
                <div
                  className="rounded-circle bg-success"
                  style={{ width: 6, height: 6 }}
                ></div>{" "}
                Paid
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
            <div className="d-flex gap-3 align-items-center">
              <div className="bg-light text-primary rounded p-2">
                <Calendar size={18} />
              </div>
              <div>
                <h6 className="fw-bold m-0 mb-1">February 2026</h6>
                <span className="text-muted small">
                  46 employees • Mar 1, 2026
                </span>
              </div>
            </div>
            <div className="text-end">
              <h6 className="fw-bold m-0 mb-1">₹32.1L</h6>
              <span className="text-success small fw-bold d-flex align-items-center justify-content-end gap-1">
                <div
                  className="rounded-circle bg-success"
                  style={{ width: 6, height: 6 }}
                ></div>{" "}
                Paid
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center py-3">
            <div className="d-flex gap-3 align-items-center">
              <div className="bg-light text-primary rounded p-2">
                <Calendar size={18} />
              </div>
              <div>
                <h6 className="fw-bold m-0 mb-1">January 2026</h6>
                <span className="text-muted small">45 employees</span>
              </div>
            </div>
            <div className="text-end">
              <h6 className="fw-bold m-0 mb-1">₹31.5L</h6>
              <span className="text-warning-dark small fw-bold d-flex align-items-center justify-content-end gap-1">
                <div
                  className="rounded-circle bg-warning"
                  style={{ width: 6, height: 6 }}
                ></div>{" "}
                Pending
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="row g-4">
      <div className="col-12 col-md-4">
        <div
          className="payroll-card p-4 h-100 cursor-pointer border-hover"
          onClick={() => setView("create-structure")}
        >
          <div className="d-flex gap-3">
            <div className="bg-primary bg-opacity-10 text-primary rounded p-2 h-100">
              <FileText size={20} />
            </div>
            <div>
              <h6 className="fw-bold mb-2">Salary Structures</h6>
              <p className="text-muted small mb-3">
                Manage pay grades and salary components
              </p>
              <span
                className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 rounded-pill px-2 py-1"
                style={{ fontSize: "0.65rem" }}
              >
                • 6 structures
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-4">
        <div
          className="payroll-card p-4 h-100 cursor-pointer border-hover"
          onClick={() => setView("deductions")}
        >
          <div className="d-flex gap-3">
            <div className="bg-danger bg-opacity-10 text-danger rounded p-2 h-100">
              <ArrowRight size={20} />
            </div>
            <div>
              <h6 className="fw-bold mb-2">Deductions</h6>
              <p className="text-muted small mb-3">
                TDS, PF, leave deductions, penalties
              </p>
              <span
                className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 rounded-pill px-2 py-1"
                style={{ fontSize: "0.65rem" }}
              >
                • Active: 8
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-4">
        <div
          className="payroll-card p-4 h-100 cursor-pointer border-hover"
          onClick={() => setView("tax-pf-settings")}
        >
          <div className="d-flex gap-3">
            <div className="bg-success bg-opacity-10 text-success rounded p-2 h-100">
              <Percent size={20} />
            </div>
            <div>
              <h6 className="fw-bold mb-2">Tax & PF Settings</h6>
              <p className="text-muted small mb-3">
                Configure tax slabs and compliance rules
              </p>
              <span
                className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-2 py-1"
                style={{ fontSize: "0.65rem" }}
              >
                • Configured
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-4 mt-2">
        <div
          className="payroll-card p-3 h-100 cursor-pointer border-hover bg-light bg-opacity-50"
          onClick={() => setView("assign-structure")}
        >
          <div className="d-flex align-items-center gap-2">
            <UserPlus size={16} className="text-muted" />{" "}
            <h6 className="fw-bold m-0 small text-dark">
              Assign Salary Structure
            </h6>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4 mt-2">
        <div
          className="payroll-card p-3 h-100 cursor-pointer border-hover bg-light bg-opacity-50"
          onClick={() => setView("choose-theme")}
        >
          <div className="d-flex align-items-center gap-2">
            <ImageIcon size={16} className="text-muted" />{" "}
            <h6 className="fw-bold m-0 small text-dark">Payslip Themes</h6>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4 mt-2">
        <div
          className="payroll-card p-3 h-100 cursor-pointer border-hover bg-light bg-opacity-50"
          onClick={() => setView("customize-payslip")}
        >
          <div className="d-flex align-items-center gap-2">
            <FileText size={16} className="text-muted" />{" "}
            <h6 className="fw-bold m-0 small text-dark">
              Customize & Generate
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PayrollPay = ({ onPrev, onComplete }) => {
  const [selectedMethod, setSelectedMethod] = useState("bank");
  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mt-2 mb-1">Payroll Pay</h3>
          <p className="text-muted small">
            Configure payroll period and employee scope.
          </p>
        </div>
      </div>

      <div className="wizard-stepper px-4">
        <div className="wizard-progress-bar" style={{ width: "100%" }}></div>
        <div className="wizard-step completed">
          <div className="wizard-step-icon">
            <Check size={18} />
          </div>
          <div className="wizard-step-label">Setup</div>
          <div className="wizard-step-sub">Period & scope</div>
        </div>
        <div className="wizard-step completed">
          <div className="wizard-step-icon">
            <Check size={18} />
          </div>
          <div className="wizard-step-label">Process</div>
          <div className="wizard-step-sub">Auto-calculate</div>
        </div>
        <div className="wizard-step completed">
          <div className="wizard-step-icon">
            <Check size={18} />
          </div>
          <div className="wizard-step-label">Review</div>
          <div className="wizard-step-sub">Verify data</div>
        </div>
        <div className="wizard-step completed">
          <div className="wizard-step-icon">
            <Check size={18} />
          </div>
          <div className="wizard-step-label">Adjust</div>
          <div className="wizard-step-sub">Edits & bonus</div>
        </div>
        <div className="wizard-step completed">
          <div className="wizard-step-icon">
            <Check size={18} />
          </div>
          <div className="wizard-step-label">Approve</div>
          <div className="wizard-step-sub">Sign-off</div>
        </div>
        <div className="wizard-step active">
          <div className="wizard-step-icon bg-primary border-primary text-white">
            6
          </div>
          <div className="wizard-step-label text-primary">Pay</div>
          <div className="wizard-step-sub">Disburse</div>
        </div>
      </div>

      <div
        className="payroll-card p-4 p-md-5 mx-auto border"
        style={{
          maxWidth: "650px",
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)",
        }}
      >
        <h6 className="fw-bold mb-4">Payment Method</h6>

        <div className="row g-3 mb-5">
          <div className="col-6">
            <div
              className={`payment-method-card ${
                selectedMethod === "bank" ? "selected" : ""
              }`}
              onClick={() => setSelectedMethod("bank")}
            >
              <div className="payment-method-icon">
                <Landmark size={32} className="mx-auto" />
              </div>
              <h6
                className="fw-bold mb-1"
                style={selectedMethod === "bank" ? { color: "#2563eb" } : {}}
              >
                Bank Transfer
              </h6>
              <p className="small text-muted m-0">NEFT / IMPS / RTGS</p>
            </div>
          </div>
          <div className="col-6">
            <div
              className={`payment-method-card ${
                selectedMethod === "manual" ? "selected" : ""
              }`}
              onClick={() => setSelectedMethod("manual")}
            >
              <div className="payment-method-icon">
                <CreditCard size={32} className="mx-auto" />
              </div>
              <h6
                className="fw-bold mb-1"
                style={selectedMethod === "manual" ? { color: "#2563eb" } : {}}
              >
                Manual / Cheque
              </h6>
              <p className="small text-muted m-0">Process offline</p>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <span className="text-muted small">Total Employees</span>
          <span className="fw-bold">47 (1 excluded)</span>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <span className="text-muted small">Gross Payout</span>
          <span className="fw-bold">₹38,45,000</span>
        </div>
        <div className="d-flex justify-content-between pb-3 border-bottom mb-4">
          <span className="text-muted small">Total Deductions</span>
          <span className="fw-bold text-danger">- ₹3,20,000</span>
        </div>

        <div className="d-flex justify-content-between mb-5">
          <span className="text-muted small align-self-end pb-1">
            Net Disbursement
          </span>
          <span className="fw-bold text-success" style={{ fontSize: "1.5rem" }}>
            ₹35,25,000
          </span>
        </div>

        <div className="payroll-alert-row alert-row-red mb-4">
          <div className="d-flex align-items-start gap-2 text-danger-red small fw-medium">
            <AlertTriangle size={16} className="mt-1 flex-shrink-0" />
            <span>
              <strong>Irreversible Action.</strong> Once processed, payments
              cannot be recalled. Ensure all details are correct.
            </span>
          </div>
        </div>

        <div className="d-flex gap-3">
          <Button
            variant="outline"
            className="btn btn-white border px-4 flex-shrink-0 fw-medium"
            onClick={onPrev}
          >
            <ArrowLeft size={16} className="me-2" /> Back
          </Button>
          <Button
            variant="primary"
            className="btn btn-danger bg-danger border-0 flex-grow-1 fw-medium"
            onClick={onComplete}
          >
            Generate Excel & Payslips — ₹35,25,000
          </Button>
        </div>
      </div>
    </div>
  );
};

const PayrollComplete = ({ onNavigate }) => (
  <div className="fade-in">
    <div className="wizard-stepper px-4 mt-5">
      <div className="wizard-progress-bar" style={{ width: "100%" }}></div>
      <div className="wizard-step completed">
        <div className="wizard-step-icon">
          <Check size={18} />
        </div>
      </div>
      <div className="wizard-step completed">
        <div className="wizard-step-icon">
          <Check size={18} />
        </div>
      </div>
      <div className="wizard-step completed">
        <div className="wizard-step-icon">
          <Check size={18} />
        </div>
      </div>
      <div className="wizard-step completed">
        <div className="wizard-step-icon">
          <Check size={18} />
        </div>
      </div>
      <div className="wizard-step completed">
        <div className="wizard-step-icon">
          <Check size={18} />
        </div>
      </div>
      <div className="wizard-step completed">
        <div className="wizard-step-icon">
          <Check size={18} />
        </div>
      </div>
    </div>

    <div
      className="payroll-card p-5 mx-auto text-center mt-5 border"
      style={{
        maxWidth: "500px",
        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05)",
      }}
    >
      <div
        className="bg-success rounded-circle d-flex justify-content-center align-items-center text-white mx-auto mb-4"
        style={{ width: 80, height: 80 }}
      >
        <Check size={40} />
      </div>
      <h2 className="fw-bold mb-3">Payroll Complete! 🎉</h2>
      <p className="text-muted mb-5">
        April 2026 payroll has been processed and payslips sent to all 48
        employees.
      </p>

      <Button
        variant="primary"
        className="btn btn-primary bg-blue border-0 w-100 mb-3 py-2 fw-medium"
        onClick={() => onNavigate("distribution")}
      >
        View Payroll History
      </Button>
      <Button
        variant="outline"
        className="btn btn-white border w-100 py-2 fw-medium"
        onClick={() => onNavigate("dashboard")}
      >
        Back to Dashboard
      </Button>
    </div>
  </div>
);

const PayslipDistribution = () => {
  const [viewMode, setViewMode] = useState("overview"); 

  const employees = [
    {
      id: "EMP011",
      name: "Srinivas Kandagatla",
      amount: "₹53,000",
      status: "sent",
      role: "Junior Developer L1",
      gross: "₹48,000",
      deductions: "-₹5,000",
      bonuses: "+₹5,000",
      net: "₹48,000",
    },
    {
      id: "EMP002",
      name: "Rahul Sharma",
      amount: "₹1,62,000",
      status: "sent",
      role: "Engineering Manager L3",
      gross: "₹1,18,000",
      deductions: "-₹8,500",
      bonuses: "+₹20,000",
      net: "₹1,29,500",
    },
    {
      id: "EMP001",
      name: "Priya Nair",
      amount: "₹1,39,000",
      status: "sent",
      role: "CTO Executive",
      gross: "₹54,000",
      deductions: "-₹12,000",
      bonuses: "+₹30,000",
      net: "₹72,000",
    },
    {
      id: "EMP007",
      name: "Ananya Reddy",
      amount: "₹97,000",
      status: "pending",
      role: "Senior Designer",
      gross: "₹80,000",
      deductions: "-₹6,000",
      bonuses: "+₹10,000",
      net: "₹84,000",
    },
    {
      id: "EMP003",
      name: "Emp Test",
      amount: "₹45,000",
      status: "pending",
      role: "Tester",
      gross: "₹40,000",
      deductions: "-₹2,000",
      bonuses: "+₹7,000",
      net: "₹45,000",
    },
  ];

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Breadcrumb items={["Dashboard", "Payroll"]} />
          <h3 className="fw-bold mt-2 mb-1">Payslip Distribution</h3>
          <p className="text-muted small">
            April 2026 • 47 payslips generated • Payment processed
          </p>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <div className="btn-group me-2" role="group">
            <button
              type="button"
              className={`btn btn-sm ${
                viewMode === "overview"
                  ? "btn-primary bg-blue border-0"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setViewMode("overview")}
            >
              Overview
            </button>
            <button
              type="button"
              className={`btn btn-sm ${
                viewMode === "list"
                  ? "btn-primary bg-blue border-0"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setViewMode("list")}
            >
              Payslips
            </button>
          </div>
          <Button
            variant="outline"
            className="btn btn-white border px-4 fw-medium d-flex align-items-center gap-2"
          >
            <Download size={16} /> Export Report
          </Button>
          {viewMode === "list" && (
            <Button
              variant="primary"
              className="btn btn-success bg-success border-0 px-4 fw-medium d-flex align-items-center gap-2 text-white"
            >
              <Send size={16} /> Send All Payslips
            </Button>
          )}
        </div>
      </div>

      {viewMode === "overview" ? (
        <>
          <div className="row g-4 mb-4">
            <div className="col-12 col-md-3">
              <div className="payroll-card p-4 h-100 d-flex align-items-center gap-3">
                <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-flex justify-content-center align-items-center">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="fw-bold text-primary m-0 mb-1">47</h4>
                  <span className="text-dark small fw-medium">
                    Employees Paid
                  </span>
                  <p className="text-muted m-0" style={{ fontSize: "0.75rem" }}>
                    1 excluded (error)
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="payroll-card p-4 h-100 d-flex align-items-center gap-3">
                <div className="bg-success bg-opacity-10 text-success rounded-circle p-3 d-flex justify-content-center align-items-center">
                  <DollarSign size={24} />
                </div>
                <div>
                  <h4 className="fw-bold text-success m-0 mb-1">₹35.3L</h4>
                  <span className="text-dark small fw-medium">
                    Net Disbursed
                  </span>
                  <p className="text-muted m-0" style={{ fontSize: "0.75rem" }}>
                    Bank Transfer
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="payroll-card p-4 h-100 d-flex align-items-center gap-3">
                <div className="bg-danger bg-opacity-10 text-danger rounded-circle p-3 d-flex justify-content-center align-items-center">
                  <Minus size={24} />
                </div>
                <div>
                  <h4 className="fw-bold text-danger m-0 mb-1">₹3.2L</h4>
                  <span className="text-dark small fw-medium">
                    Total Deductions
                  </span>
                  <p className="text-muted m-0" style={{ fontSize: "0.75rem" }}>
                    PF + TDS + PT
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="payroll-card p-4 h-100 d-flex align-items-center gap-3">
                <div className="bg-success bg-opacity-10 text-success rounded-circle p-3 d-flex justify-content-center align-items-center">
                  <Check size={24} />
                </div>
                <div>
                  <h4 className="fw-bold text-success m-0 mb-1">Paid</h4>
                  <span className="text-dark small fw-medium">Status</span>
                  <p className="text-muted m-0" style={{ fontSize: "0.75rem" }}>
                    Apr 30, 2026
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="payroll-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
              <h6 className="fw-bold m-0">Employee Payroll Detail</h6>
              <Button
                variant="outline"
                className="btn btn-sm btn-white border px-3"
              >
                View Payslips
              </Button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead
                  className="table-light text-muted"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}
                >
                  <tr>
                    <th className="fw-bold border-bottom-0 pb-3">EMPLOYEE</th>
                    <th className="fw-bold border-bottom-0 pb-3">ROLE</th>
                    <th className="fw-bold border-bottom-0 pb-3">GROSS</th>
                    <th className="fw-bold border-bottom-0 pb-3">DEDUCTIONS</th>
                    <th className="fw-bold border-bottom-0 pb-3">BONUSES</th>
                    <th className="fw-bold border-bottom-0 pb-3">NET PAY</th>
                    <th className="fw-bold border-bottom-0 pb-3 text-end">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, i) => (
                    <tr key={i}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="bg-primary bg-opacity-10 text-primary rounded d-flex justify-content-center align-items-center fw-bold"
                            style={{
                              width: 32,
                              height: 32,
                              fontSize: "0.75rem",
                            }}
                          >
                            {emp.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <h6
                              className="m-0 fw-bold"
                              style={{ fontSize: "0.9rem" }}
                            >
                              {emp.name}
                            </h6>
                            <span
                              className="text-muted"
                              style={{ fontSize: "0.75rem" }}
                            >
                              {emp.id}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="text-muted small">{emp.role}</td>
                      <td className="fw-medium small">{emp.gross}</td>
                      <td className="fw-medium small text-danger">
                        {emp.deductions}
                      </td>
                      <td className="fw-medium small text-success">
                        {emp.bonuses}
                      </td>
                      <td className="fw-bold small">{emp.net}</td>
                      <td className="text-end">
                        <span
                          className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1"
                          style={{ fontSize: "0.75rem" }}
                        >
                          <span style={{ fontSize: "10px" }}>●</span> Paid
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="success-banner mb-4">
            <CheckCircle size={24} className="text-success" />
            <div>
              <h6 className="fw-bold text-success m-0 mb-1">
                Payment Processed Successfully!
              </h6>
              <p className="small text-success text-opacity-75 m-0">
                ₹34,18,500 disbursed to 48 employees • April 30, 2026
              </p>
            </div>
          </div>

          <div className="payroll-card p-4">
            <div className="dist-list-header">
              <div className="d-flex align-items-center text-muted">
                <Search size={18} className="me-2" />
                <input
                  type="text"
                  className="dist-search-input"
                  placeholder="Search employee..."
                />
              </div>
              <Button
                variant="outline"
                className="btn btn-sm btn-white border d-flex align-items-center gap-2 px-3"
              >
                All Status <ChevronDown size={14} />
              </Button>
            </div>

            {employeesData.map((emp, i) => (
              <div key={i} className="rule-row align-items-center">
                <div className="me-3">
                  <div
                    className="bg-primary bg-opacity-10 text-primary rounded p-2 d-flex justify-content-center align-items-center"
                    style={{ width: 40, height: 40 }}
                  >
                    <FileText size={20} />
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h6 className="fw-bold m-0 mb-1">{emp.name}</h6>
                  <span className="text-muted small">
                    {emp.id} • April 2026 • {emp.amount}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  {emp.status === "sent" ? (
                    <span
                      className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-3 py-1"
                      style={{ fontSize: "0.65rem" }}
                    >
                      Sent
                    </span>
                  ) : (
                    <span
                      className="badge bg-warning bg-opacity-25 text-warning-dark border border-warning border-opacity-50 rounded-pill px-3 py-1"
                      style={{ fontSize: "0.65rem" }}
                    >
                      Pending
                    </span>
                  )}
                  <Button
                    variant="outline"
                    className="btn btn-sm btn-white border px-4"
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    className="btn btn-sm btn-white border border-primary text-primary px-4"
                  >
                    Send
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const AdminPayroll = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedTheme, setSelectedTheme] = useState("ocean");

  if (activeView === "create-structure")
    return (
      <CreateSalaryStructure onCancel={() => setActiveView("dashboard")} />
    );
  if (activeView === "assign-structure")
    return (
      <AssignSalaryStructure onCancel={() => setActiveView("dashboard")} />
    );
  if (activeView === "choose-theme")
    return (
      <PayslipThemes
        onCancel={() => setActiveView("dashboard")}
        onContinue={(theme) => {
          setSelectedTheme(theme);
          setActiveView("customize-payslip");
        }}
      />
    );
  if (activeView === "customize-payslip")
    return (
      <CustomizePayslip
        theme={selectedTheme}
        onCancel={() => setActiveView("choose-theme")}
      />
    );

  if (activeView === "deductions")
    return <DeductionManager onCancel={() => setActiveView("dashboard")} />;
  if (activeView === "payroll-history") return <PayrollHistory />;
  if (activeView === "tax-pf-settings") return <TaxPFSettings />;
  if (activeView === "run-payroll-setup")
    return <PayrollSetup onNext={() => setActiveView("run-payroll-process")} />;
  if (activeView === "run-payroll-process")
    return (
      <PayrollProcess onNext={() => setActiveView("run-payroll-review")} />
    );
  if (activeView === "run-payroll-review")
    return <PayrollReview onNext={() => setActiveView("run-payroll-adjust")} />;
  if (activeView === "run-payroll-adjust")
    return (
      <PayrollAdjust
        onPrev={() => setActiveView("run-payroll-review")}
        onNext={() => setActiveView("run-payroll-approve")}
      />
    );
  if (activeView === "run-payroll-approve")
    return (
      <PayrollApprove
        onPrev={() => setActiveView("run-payroll-adjust")}
        onNext={() => setActiveView("run-payroll-pay")}
      />
    );
  if (activeView === "run-payroll-pay")
    return (
      <PayrollPay
        onPrev={() => setActiveView("run-payroll-approve")}
        onComplete={() => setActiveView("run-payroll-complete")}
      />
    );
  if (activeView === "run-payroll-complete")
    return <PayrollComplete onNavigate={(view) => setActiveView(view)} />;
  if (activeView === "distribution") return <PayslipDistribution />;

  return <PayrollAdministration setView={setActiveView} />;
};

export default AdminPayroll;
