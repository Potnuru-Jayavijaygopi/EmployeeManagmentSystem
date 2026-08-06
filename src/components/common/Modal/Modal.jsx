import React from "react";
import { X } from "lucide-react";
import "./Modal.css";
import Button from "../Button";

const Modal = ({
  isOpen,
  onClose,
  title,
  icon: Icon,
  iconBgClass,
  iconTextClass,
  children,
  maxWidth = "600px",
  hideHeader = false,
  footer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="custom-modal-content bg-white rounded shadow-lg"
        style={{
          maxWidth,
          width: "100%",
          margin: "1rem",
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {!hideHeader && (
          <div className="custom-modal-header p-4 border-bottom d-flex justify-content-between align-items-center flex-shrink-0">
            <div className="d-flex align-items-center">
              {Icon && (
                <div
                  className={`custom-modal-icon-bg ${
                    iconBgClass || "bg-light"
                  } ${
                    iconTextClass || "text-dark"
                  } rounded p-2 me-3 d-flex align-items-center justify-content-center`}
                >
                  <Icon size={20} />
                </div>
              )}
              {title && (
                <div className="m-0 d-flex flex-column justify-content-center">
                  {typeof title === "string" ? (
                    <h5 className="m-0 fw-bold">{title}</h5>
                  ) : (
                    title
                  )}
                </div>
              )}
            </div>
            <Button
              variant="icon"
              className="btn btn-light rounded-circle p-2 border-0 d-flex align-items-center justify-content-center"
              onClick={onClose}
            >
              <X size={20} />
            </Button>
          </div>
        )}

        <div className="custom-modal-body p-4 overflow-auto">{children}</div>

        {footer && (
          <div className="custom-modal-footer p-3 bg-light border-top d-flex justify-content-end flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
