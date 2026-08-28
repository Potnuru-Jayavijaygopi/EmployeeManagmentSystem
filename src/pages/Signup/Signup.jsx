import React, { useState } from "react";
import {
  User,
  Mail,
  Briefcase,
  Eye,
  AlertCircle,
  Check,
  UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import Button from "../../components/common/Button";
import { authService } from "../../services";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isWeak = formData.password.length > 0 && formData.password.length < 6;
  const isFair = formData.password.length >= 6 && formData.password.length < 10;
  const isStrong = formData.password.length >= 10;
  const isMatch =
    formData.password && formData.confirmPassword === formData.password;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await authService.register(formData);
      navigate("/auth/login");
    } catch (err) {
      console.warn("API Registration fallback:", err);
      navigate("/auth/login");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">


      <div
        className="signup-card bg-white rounded-3 shadow-sm border d-flex flex-column mx-3 my-4"
        style={{ width: "100%", maxWidth: "520px", overflow: "hidden" }}
      >
        <div className="p-4 p-md-5 pb-4">
          <div className="text-center mb-4 pb-2">
            <div
              className="d-inline-flex align-items-center justify-content-center bg-blue text-white rounded-3 mb-3"
              style={{ width: "48px", height: "48px" }}
            >
              <span className="fw-bold fs-4">E</span>
            </div>
            <h3 className="fw-bold mb-2">Create your account</h3>
            <p className="text-muted small mb-4">
              Start your free trial in minutes — no credit card required.
            </p>

            <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
              <span
                className="badge bg-light text-muted border px-2 py-1 fw-medium"
                style={{ fontSize: "0.75rem" }}
              >
                <Check size={12} className="text-success me-1" /> Cancel anytime
              </span>
              <span
                className="badge bg-light text-muted border px-2 py-1 fw-medium"
                style={{ fontSize: "0.75rem" }}
              >
                <Check size={12} className="text-success me-1" /> 14-day free
                trial
              </span>
              <span
                className="badge bg-light text-muted border px-2 py-1 fw-medium"
                style={{ fontSize: "0.75rem" }}
              >
                <Check size={12} className="text-success me-1" /> No credit card
              </span>
            </div>
          </div>

          {isWeak && (
            <div className="alert-banner alert-danger mb-4">
              <AlertCircle size={16} className="alert-icon" />
              <div>
                Your password is too weak. Please choose a stronger password.
              </div>
            </div>
          )}

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <label
                className="form-label small fw-bold text-muted text-uppercase tracking-wide"
                style={{ fontSize: "0.7rem" }}
              >
                Full Name <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <User
                  size={16}
                  className="position-absolute text-muted"
                  style={{ left: "12px", top: "12px" }}
                />
                <input
                  type="text"
                  name="fullName"
                  className="form-control ps-5 py-2"
                  placeholder="Sanjay Mehta"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label
                className="form-label small fw-bold text-muted text-uppercase tracking-wide"
                style={{ fontSize: "0.7rem" }}
              >
                Work Email <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <Mail
                  size={16}
                  className="position-absolute text-muted"
                  style={{ left: "12px", top: "12px" }}
                />
                <input
                  type="email"
                  name="email"
                  className="form-control ps-5 py-2 border-blue bg-blue-light"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label
                className="form-label small fw-bold text-muted text-uppercase tracking-wide"
                style={{ fontSize: "0.7rem" }}
              >
                Company Name <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <Briefcase
                  size={16}
                  className="position-absolute text-muted"
                  style={{ left: "12px", top: "12px" }}
                />
                <input
                  type="text"
                  name="company"
                  className="form-control ps-5 py-2"
                  placeholder="Acme Corp"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label
                className="form-label small fw-bold text-muted text-uppercase tracking-wide"
                style={{ fontSize: "0.7rem" }}
              >
                Password <span className="text-danger">*</span>
              </label>
              <div className="position-relative mb-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={`form-control py-2 ps-3 pe-5 ${
                    isWeak ? "border-danger" : ""
                  } ${isStrong ? "border-success" : ""}`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Button
                  variant="ghost"
                  type="button"
                  className="btn btn-link position-absolute text-muted p-0"
                  style={{ right: "12px", top: "8px" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Eye size={18} />
                </Button>
              </div>

              {formData.password.length > 0 && (
                <div className="mt-1">
                  <div className="d-flex gap-1 mb-1">
                    <div
                      className={`flex-grow-1 rounded-pill strength-bar ${
                        isWeak || isFair || isStrong
                          ? isWeak
                            ? "bg-danger"
                            : isFair
                            ? "bg-warning"
                            : "bg-success"
                          : "bg-light"
                      }`}
                    ></div>
                    <div
                      className={`flex-grow-1 rounded-pill strength-bar ${
                        isFair || isStrong
                          ? isFair
                            ? "bg-warning"
                            : "bg-success"
                          : "bg-light"
                      }`}
                    ></div>
                    <div
                      className={`flex-grow-1 rounded-pill strength-bar ${
                        isStrong ? "bg-success" : "bg-light"
                      }`}
                    ></div>
                    <div
                      className={`flex-grow-1 rounded-pill strength-bar ${
                        isStrong ? "bg-success" : "bg-light"
                      }`}
                    ></div>
                  </div>
                  {isWeak && (
                    <span
                      className="small text-danger fw-medium"
                      style={{ fontSize: "0.7rem" }}
                    >
                      Weak — too short
                    </span>
                  )}
                  {isFair && (
                    <span
                      className="small text-warning fw-medium"
                      style={{ fontSize: "0.7rem" }}
                    >
                      Fair — could be stronger
                    </span>
                  )}
                  {isStrong && (
                    <span
                      className="small text-success fw-medium"
                      style={{ fontSize: "0.7rem" }}
                    >
                      Strong
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                className="form-label small fw-bold text-muted text-uppercase tracking-wide"
                style={{ fontSize: "0.7rem" }}
              >
                Confirm Password <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className={`form-control py-2 ps-3 pe-5 ${
                    isMatch ? "border-success bg-success-light" : ""
                  }`}
                  placeholder="Repeat Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <Button
                  variant="ghost"
                  type="button"
                  className="btn btn-link position-absolute text-muted p-0"
                  style={{ right: "12px", top: "8px" }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Eye size={18} />
                </Button>
                {isMatch && (
                  <Check
                    size={16}
                    className="position-absolute text-success"
                    style={{ right: "40px", top: "10px" }}
                  />
                )}
              </div>
              {isMatch && (
                <div
                  className="small text-success mt-1 d-flex align-items-center fw-medium"
                  style={{ fontSize: "0.75rem" }}
                >
                  <Check size={12} className="me-1" /> Passwords match.
                </div>
              )}
            </div>

            <div className="mb-4 d-flex align-items-start">
              <input
                type="checkbox"
                id="agreeTerms"
                className="form-check-input mt-1 me-2 cursor-pointer flex-shrink-0"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
              />
              <label
                htmlFor="agreeTerms"
                className="small text-muted cursor-pointer mb-0 lh-base"
              >
                I agree to the{" "}
                <a href="#" className="text-blue text-decoration-none">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue text-decoration-none">
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button
              type="submit"
              className="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center mb-1 btn-sign-in"
              disabled={!agreed}
            >
              <UserPlus size={16} className="me-2" /> Create Account
            </Button>
          </form>
        </div>

        <div className="bg-light border-top text-center py-3 px-4 w-100 mt-auto">
          <span className="small text-muted" style={{ fontSize: "0.8rem" }}>
            Already have account?{" "}
            <a
              href="#"
              className="text-blue fw-medium text-decoration-none"
              onClick={(e) => {
                e.preventDefault();
                navigate("/auth/login");
              }}
            >
              Sign in
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
