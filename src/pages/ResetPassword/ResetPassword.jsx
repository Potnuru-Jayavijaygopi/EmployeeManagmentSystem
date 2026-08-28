import React, { useState } from "react";
import { Shield, Eye, AlertCircle, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import Button from "../../components/common/Button";
import { authService } from "../../services";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const reqMetCount = [hasLength, hasUpper, hasNumber, hasSpecial].filter(
    Boolean
  ).length;
  const isWeak = reqMetCount > 0 && reqMetCount < 2;
  const isFair = reqMetCount >= 2 && reqMetCount < 4;
  const isStrong = reqMetCount === 4;

  const isMatch = password && confirmPassword && password === confirmPassword;
  const isMismatch = confirmPassword.length > 0 && password !== confirmPassword;
  const isFormValid = isStrong && isMatch;

  const handleReset = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitting(true);
    try {
      await authService.changePassword({ password });
      navigate("/auth/login");
    } catch (err) {
      console.warn("API Reset Password fallback:", err);
      navigate("/auth/login");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <Button
        onClick={() => navigate("/")}
        style={{ position: "fixed", top: "20px", right: "20px", zIndex: 9999 }}
        className="btn btn-sm btn-outline-secondary bg-white shadow-sm"
      >
        Back to App
      </Button>

      <div
        className="reset-card bg-white rounded-3 shadow-sm border p-4 p-md-5 mx-3 my-4 d-flex flex-column"
        style={{ width: "100%", maxWidth: "460px" }}
      >
        <div className="text-center mb-4 pb-2">
          <div
            className="d-inline-flex align-items-center justify-content-center bg-blue text-white rounded-3 mb-3"
            style={{ width: "48px", height: "48px" }}
          >
            <Shield size={24} />
          </div>
          <h3 className="fw-bold mb-2">Set new password</h3>
          <p
            className="text-muted small mx-auto"
            style={{ maxWidth: "320px", lineHeight: "1.5" }}
          >
            Your new password must be at least 8 characters and different from
            previous passwords.
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label
              className="form-label small fw-bold text-muted text-uppercase tracking-wide"
              style={{ fontSize: "0.7rem" }}
            >
              New Password <span className="text-danger">*</span>
            </label>
            <div className="position-relative mb-2">
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control py-2 ps-3 pe-5 ${
                  isWeak ? "border-danger" : ""
                } ${isStrong ? "border-success" : ""}`}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            {password.length > 0 && (
              <div className="mt-1 mb-2">
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
                    Weak
                  </span>
                )}
                {isFair && (
                  <span
                    className="small text-warning fw-medium"
                    style={{ fontSize: "0.7rem" }}
                  >
                    Fair
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
              Confirm New Password <span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`form-control py-2 ps-3 pe-5 ${
                  isMismatch ? "border-danger bg-danger-light text-danger" : ""
                } ${isMatch ? "border-success bg-success-light" : ""}`}
                placeholder="Repeat Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            </div>
            {isMismatch && (
              <div
                className="text-danger small mt-1 d-flex align-items-center fw-medium"
                style={{ fontSize: "0.75rem" }}
              >
                <AlertCircle size={12} className="me-1" /> Passwords do not
                match.
              </div>
            )}
          </div>

          <div className="border rounded bg-light p-3 mb-4">
            <label
              className="form-label small fw-bold text-muted text-uppercase tracking-wide mb-2 d-block"
              style={{ fontSize: "0.7rem" }}
            >
              Password Requirements
            </label>
            <ul
              className="list-unstyled mb-0 small"
              style={{ fontSize: "0.8rem" }}
            >
              <li
                className={`d-flex align-items-center mb-1 ${
                  hasLength ? "text-success" : "text-muted"
                }`}
              >
                <Check size={14} className="me-2" /> At least 8 characters
              </li>
              <li
                className={`d-flex align-items-center mb-1 ${
                  hasUpper ? "text-success" : "text-muted"
                }`}
              >
                <Check size={14} className="me-2" /> One uppercase letter
              </li>
              <li
                className={`d-flex align-items-center mb-1 ${
                  hasNumber ? "text-success" : "text-muted"
                }`}
              >
                <Check size={14} className="me-2" /> One number
              </li>
              <li
                className={`d-flex align-items-center ${
                  hasSpecial ? "text-success" : "text-muted"
                }`}
              >
                <Check size={14} className="me-2" /> One special character
              </li>
            </ul>
          </div>

          <Button
            type="submit"
            className="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center mb-3 btn-sign-in"
            disabled={!isFormValid}
          >
            <Shield size={16} className="me-2" /> Reset password
          </Button>

          <div className="text-center">
            <Button
              variant="ghost"
              type="button"
              className="btn btn-link text-muted small text-decoration-none"
              style={{ fontSize: "0.85rem" }}
              onClick={(e) => {
                e.preventDefault();
                navigate("/auth/login");
              }}
            >
              Back to log in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
