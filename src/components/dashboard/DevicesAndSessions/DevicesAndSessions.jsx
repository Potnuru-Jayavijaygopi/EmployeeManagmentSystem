import React, { useState } from "react";
import { Monitor, Smartphone, RefreshCw } from "lucide-react";
import "./DevicesAndSessions.css";
import Button from "../../common/Button";

const DevicesAndSessions = () => {
  const [activeTab, setActiveTab] = useState("Sessions");

  return (
    <div className="devices-session-manager">
      <div className="dsm-header">
        <h3 className="dsm-title">Devices & Session Manager</h3>
        <div className="dsm-toggle-group">
          <Button
            className={`dsm-toggle-btn ${
              activeTab === "Devices" ? "active" : ""
            }`}
            onClick={() => setActiveTab("Devices")}
          >
            Devices
          </Button>
          <Button
            className={`dsm-toggle-btn ${
              activeTab === "Sessions" ? "active" : ""
            }`}
            onClick={() => setActiveTab("Sessions")}
          >
            Sessions
          </Button>
        </div>
      </div>

      <div className="dsm-body">
        {activeTab === "Sessions" ? (
          <>
            <div className="dsm-body-header">
              <h4 className="dsm-subtitle">Active Sessions (3)</h4>
              <div className="dsm-actions">
                <Button variant="icon" className="dsm-action-btn">
                  <RefreshCw size={14} /> Refresh
                </Button>
                <Button variant="icon" className="dsm-action-btn primary">
                  Logout all other sessions
                </Button>
              </div>
            </div>

            <div className="dsm-list">
              <div className="session-card current">
                <div className="current-badge">Current Session</div>
                <div className="session-icon-box">
                  <Monitor size={24} />
                </div>
                <div className="session-details">
                  <h5 className="session-name">Chrome on Windows</h5>
                  <div className="session-meta">
                    <div className="status-dot-sm active"></div>
                    <span>Active now • IP: 127.0.0.1 • Mumbai, IN</span>
                  </div>
                </div>
              </div>

              <div className="session-card">
                <div className="session-icon-box">
                  <Smartphone size={24} />
                </div>
                <div className="session-details">
                  <h5 className="session-name">You</h5>
                  <div className="session-meta">
                    <div className="status-dot-sm"></div>
                    <span>
                      Last active: 2 hours ago • IP:127.0.0.2 • Delhi, IN
                    </span>
                  </div>
                </div>
              </div>

              <div className="session-card">
                <div className="session-icon-box">
                  <Monitor size={24} />
                </div>
                <div className="session-details">
                  <h5 className="session-name">MacOS</h5>
                  <div className="session-meta">
                    <div className="status-dot-sm"></div>
                    <span>
                      Last active: 4 days ago • IP:127.0.0.3 • Pune, IN
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="dsm-body-header">
              <h4 className="dsm-subtitle">Your Devices (3)</h4>
              <div className="dsm-actions">
                <Button variant="icon" className="dsm-action-btn">
                  <RefreshCw size={14} /> Refresh
                </Button>
              </div>
            </div>

            <div className="dsm-list">
              <div className="session-card current">
                <div className="current-badge">Current Session</div>
                <div className="session-icon-box">
                  <Monitor size={24} />
                </div>
                <div className="session-details">
                  <h5 className="session-name">Chrome on Windows</h5>
                  <div className="session-meta">
                    <div className="status-dot-sm active"></div>
                    <span>Active now • 192.168.1.104 • Mumbai, IN</span>
                  </div>
                </div>
                <div className="session-actions">
                  <Button
                    variant="outline-destructive"
                    className="dsm-action-btn danger-outline"
                  >
                    Remove
                  </Button>
                </div>
              </div>

              <div className="session-card">
                <div className="session-icon-box">
                  <Smartphone size={24} />
                </div>
                <div className="session-details">
                  <h5 className="session-name">Safari on iPhone 13 Pro</h5>
                  <div className="session-meta">
                    <div className="status-dot-sm"></div>
                    <span>
                      Last active: 2 hours ago • 14.139.116.1 • Delhi, IN
                    </span>
                  </div>
                </div>
                <div className="session-actions">
                  <Button
                    variant="outline"
                    className="dsm-action-btn primary-outline"
                  >
                    Trust
                  </Button>
                  <Button
                    variant="outline-destructive"
                    className="dsm-action-btn danger-outline"
                  >
                    Remove
                  </Button>
                </div>
              </div>

              <div className="session-card">
                <div className="session-icon-box">
                  <Monitor size={24} />
                </div>
                <div className="session-details">
                  <h5 className="session-name">Firefox on MacOS</h5>
                  <div className="session-meta">
                    <div className="status-dot-sm"></div>
                    <span>
                      Last active: 4 days ago • 117.218.1.200 • Pune, IN
                    </span>
                  </div>
                </div>
                <div className="session-actions">
                  <Button
                    variant="outline"
                    className="dsm-action-btn primary-outline"
                  >
                    Trust
                  </Button>
                  <Button
                    variant="outline-destructive"
                    className="dsm-action-btn danger-outline"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DevicesAndSessions;
