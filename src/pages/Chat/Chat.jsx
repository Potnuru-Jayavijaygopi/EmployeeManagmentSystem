import React, { useState } from "react";

import {
  Search,
  Plus,
  ChevronDown,
  MessageSquare,
  AtSign,
  Settings,
  MoreHorizontal,
  Star,
  Paperclip,
  Smile,
  CheckCheck,
  X,
} from "lucide-react";
import "./Chat.css";
import Button from "../../components/common/Button";

const Chat = ({ onTabChange, onNavigateHome }) => {
  const [activeChat, setActiveChat] = useState(null);

  return (
    <>
      <div
        className="dashboard-container"
        style={{
          height: "calc(100vh - 140px)",
          padding: 0,
          overflow: "hidden",
          display: "flex",
        }}
      >
        <div
          className="chat-left-sidebar bg-white border-end d-flex flex-column"
          style={{ width: "280px", minWidth: "280px" }}
        >
          <div className="p-3 d-flex justify-content-between align-items-center">
            <h6 className="m-0 fw-bold text-dark">Community</h6>
            <Button
              variant="icon"
              className="btn btn-sm btn-light p-1 text-muted border-0 bg-light rounded"
            >
              <Plus size={16} />
            </Button>
          </div>

          <div className="px-3 mb-3">
            <div className="position-relative">
              <Search
                size={14}
                className="position-absolute text-muted"
                style={{ top: "8px", left: "10px" }}
              />
              <input
                type="text"
                className="form-control form-control-sm bg-light border-0 ps-4"
                placeholder="Search Workspace"
                style={{ fontSize: "0.8rem" }}
              />
            </div>
          </div>

          <div className="flex-grow-1 overflow-auto hide-scrollbar pb-3">

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center px-3 mb-1">
                <span
                  className="small fw-bold text-muted text-uppercase"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
                >
                  CHANNELS
                </span>
                <ChevronDown size={14} className="text-muted" />
              </div>
              <div
                className={`d-flex align-items-center px-3 py-2 cursor-pointer ${
                  activeChat === "# Engineering"
                    ? "bg-blue-light"
                    : "chat-item-hover"
                }`}
                onClick={() => setActiveChat("# Engineering")}
              >
                <span
                  className={`${
                    activeChat === "# Engineering" ? "text-blue" : "text-muted"
                  } me-2 fw-semibold`}
                >
                  #
                </span>
                <span
                  className={`${
                    activeChat === "# Engineering"
                      ? "text-blue"
                      : "text-secondary"
                  } fw-medium flex-grow-1 small`}
                >
                  Engineering
                </span>
                <span
                  className="badge bg-blue rounded-pill fw-semibold"
                  style={{ fontSize: "0.65rem" }}
                >
                  3
                </span>
              </div>
              <div className="d-flex align-items-center px-3 py-2 cursor-pointer chat-item-hover">
                <span className="text-muted me-2 fw-semibold">#</span>
                <span className="text-secondary fw-medium flex-grow-1 small">
                  Project Discussion
                </span>
              </div>
              <div className="d-flex align-items-center px-3 py-2 cursor-pointer chat-item-hover">
                <span className="text-muted me-2 fw-semibold">#</span>
                <span className="text-secondary fw-medium flex-grow-1 small">
                  Employee
                </span>
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center px-3 mb-1 mt-2">
                <span
                  className="small fw-bold text-muted text-uppercase"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
                >
                  ROOMS
                </span>
                <ChevronDown size={14} className="text-muted" />
              </div>
              <div className="d-flex align-items-center px-3 py-2 bg-light cursor-pointer">
                <span className="text-muted me-2 fw-semibold">#</span>
                <span className="text-dark fw-medium flex-grow-1 small">
                  Development Team
                </span>
                <span
                  className="badge bg-blue rounded-pill fw-semibold"
                  style={{ fontSize: "0.65rem" }}
                >
                  3
                </span>
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center px-3 mb-2 mt-2">
                <span
                  className="small fw-bold text-muted text-uppercase"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
                >
                  DIRECT MESSAGES
                </span>
              </div>
              <div className="d-flex align-items-center px-3 py-2 cursor-pointer chat-item-hover">
                <div
                  className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white me-2"
                  style={{
                    backgroundColor: "#8b5cf6",
                    width: 24,
                    height: 24,
                    fontSize: "0.7rem",
                  }}
                >
                  S
                </div>
                <span className="text-secondary fw-medium flex-grow-1 small">
                  Sun
                </span>
              </div>
              <div className="d-flex align-items-center px-3 py-2 cursor-pointer chat-item-hover">
                <div
                  className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white me-2 position-relative"
                  style={{
                    backgroundColor: "#0ea5e9",
                    width: 24,
                    height: 24,
                    fontSize: "0.7rem",
                  }}
                >
                  S
                </div>
                <span className="text-dark fw-medium flex-grow-1 small">
                  Star
                </span>
                <div
                  className="bg-blue rounded-circle"
                  style={{ width: 6, height: 6 }}
                ></div>
              </div>
              <div className="d-flex align-items-center px-3 py-2 cursor-pointer chat-item-hover">
                <div
                  className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white me-2 position-relative"
                  style={{
                    backgroundColor: "#334155",
                    width: 24,
                    height: 24,
                    fontSize: "0.7rem",
                  }}
                >
                  M
                  <div
                    className="position-absolute bg-light rounded-circle border border-white"
                    style={{ width: 8, height: 8, bottom: -2, right: -2 }}
                  ></div>
                </div>
                <span className="text-secondary fw-medium flex-grow-1 small">
                  Meteor
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 border-top d-flex align-items-center bg-white">
            <div
              className="avatar rounded-circle d-flex justify-content-center align-items-center text-white me-2"
              style={{
                backgroundColor: "#2563eb",
                width: 32,
                height: 32,
                fontSize: "0.8rem",
              }}
            >
              SC
            </div>
            <div className="flex-grow-1">
              <h6
                className="m-0 fw-bold text-dark"
                style={{ fontSize: "0.8rem" }}
              >
                Sri Vishnu
              </h6>
              <p className="m-0 text-muted" style={{ fontSize: "0.7rem" }}>
                Software Engineer
              </p>
            </div>
            <Settings size={16} className="text-muted cursor-pointer" />
          </div>
        </div>

        {activeChat ? (
          <div className="chat-main flex-grow-1 d-flex flex-column bg-white">
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
              <div className="d-flex align-items-center gap-2">
                <span className="text-blue fw-bold fs-5">#</span>
                <h5 className="m-0 fw-bold text-dark">Engineering</h5>
                <Star size={16} className="text-muted cursor-pointer ms-1" />
              </div>
              <div className="d-flex align-items-center gap-3">
                <Search size={18} className="text-muted cursor-pointer" />
                <MoreHorizontal
                  size={18}
                  className="text-muted cursor-pointer"
                />
              </div>
            </div>

            <div className="flex-grow-1 p-4 overflow-auto d-flex flex-column gap-4 bg-white">
              <div className="d-flex align-items-center justify-content-center position-relative my-2">
                <hr
                  className="w-100 position-absolute"
                  style={{ zIndex: 1, borderColor: "#e2e8f0", margin: 0 }}
                />
                <span
                  className="bg-white px-3 text-muted position-relative"
                  style={{ zIndex: 2, fontSize: "0.7rem" }}
                >
                  Today, April 7
                </span>
              </div>

              <div className="d-flex gap-3">
                <div
                  className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white"
                  style={{ width: 32, height: 32, backgroundColor: "#8b5cf6" }}
                >
                  S
                </div>
                <div>
                  <div className="d-flex align-items-baseline gap-2 mb-1">
                    <span
                      className="fw-bold text-dark"
                      style={{ fontSize: "0.85rem" }}
                    >
                      Sun
                    </span>
                    <span className="text-muted" style={{ fontSize: "0.7rem" }}>
                      9:14 AM
                    </span>
                  </div>
                  <div className="text-dark" style={{ fontSize: "0.9rem" }}>
                    Hey team, I pushed the auth fix to the PR. Can someone
                    review when they get a chance?
                  </div>
                </div>
              </div>

              <div className="d-flex gap-3">
                <div
                  className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white"
                  style={{ width: 32, height: 32, backgroundColor: "#0ea5e9" }}
                >
                  S
                </div>
                <div>
                  <div className="d-flex align-items-baseline gap-2 mb-1">
                    <span
                      className="fw-bold text-dark"
                      style={{ fontSize: "0.85rem" }}
                    >
                      Star
                    </span>
                    <span className="text-muted" style={{ fontSize: "0.7rem" }}>
                      9:17 AM
                    </span>
                  </div>
                  <div className="text-dark" style={{ fontSize: "0.9rem" }}>
                    On it! Also the new dashboard mockups are ready — dropping
                    them in Figma now.
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column align-items-end mt-2">
                <div
                  className="bg-blue text-white rounded p-3 mb-1"
                  style={{ maxWidth: "80%", borderTopRightRadius: "0" }}
                >
                  Great work both of you. Let's do a quick sync at 11?
                </div>
                <div className="d-flex align-items-center gap-1 me-1">
                  <span className="text-muted" style={{ fontSize: "0.7rem" }}>
                    9:20 AM
                  </span>
                  <CheckCheck size={14} className="text-blue ms-1" />
                  <span
                    className="text-blue fw-medium"
                    style={{ fontSize: "0.7rem" }}
                  >
                    Read
                  </span>
                </div>
              </div>

              <div className="d-flex gap-3 mt-2">
                <div
                  className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white"
                  style={{ width: 32, height: 32, backgroundColor: "#8b5cf6" }}
                >
                  S
                </div>
                <div>
                  <div className="d-flex align-items-baseline gap-2 mb-1">
                    <span
                      className="fw-bold text-dark"
                      style={{ fontSize: "0.85rem" }}
                    >
                      Sun
                    </span>
                    <span className="text-muted" style={{ fontSize: "0.7rem" }}>
                      9:24 AM
                    </span>
                  </div>
                  <div className="text-dark" style={{ fontSize: "0.9rem" }}>
                    Works for me
                  </div>
                </div>
              </div>
            </div>

            <div
              className="p-4 bg-white"
              style={{ borderTop: "1px solid #f1f5f9" }}
            >
              <div className="border rounded-3 p-2 bg-light d-flex flex-column">
                <input
                  type="text"
                  className="form-control border-0 bg-transparent shadow-none mb-3 px-2 py-1"
                  placeholder="Message #engineering..."
                  style={{ fontSize: "0.9rem" }}
                />
                <div className="d-flex justify-content-between align-items-center px-2 pb-1">
                  <div className="d-flex gap-3">
                    <Paperclip
                      size={18}
                      className="text-muted cursor-pointer"
                    />
                    <Smile size={18} className="text-muted cursor-pointer" />
                    <AtSign size={18} className="text-muted cursor-pointer" />
                  </div>
                  <Button className="btn btn-primary bg-blue border-0 px-4 py-1 rounded fw-medium">
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="chat-main flex-grow-1 d-flex flex-column align-items-center justify-content-center p-4 bg-transparent border-end">
            <div className="text-center mb-4">
              <div
                className="d-inline-flex align-items-center justify-content-center bg-white border rounded-4 shadow-sm mb-4 position-relative"
                style={{ width: 80, height: 80 }}
              >
                <MessageSquare
                  size={32}
                  className="text-muted"
                  strokeWidth={1.5}
                />
                <div
                  className="position-absolute bg-light rounded-circle"
                  style={{ width: 12, height: 12, top: -4, right: -4 }}
                ></div>
              </div>
              <h4 className="fw-bold text-dark mb-2">Select a conversation</h4>
              <p
                className="text-muted small mx-auto"
                style={{ maxWidth: "300px" }}
              >
                Choose a channel or direct message from the left to start
                chatting with your colleagues.
              </p>
            </div>

            <div className="d-flex gap-3">
              <Button
                variant="icon"
                className="btn btn-white bg-white border py-3 px-4 rounded shadow-sm d-flex flex-column align-items-center justify-content-center chat-action-btn"
              >
                <AtSign size={18} className="text-muted mb-2" />
                <span
                  className="small fw-bold text-muted text-uppercase"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
                >
                  CHECK MENTIONS
                </span>
              </Button>
              <Button
                variant="icon"
                className="btn btn-white bg-white border py-3 px-4 rounded shadow-sm d-flex flex-column align-items-center justify-content-center chat-action-btn"
              >
                <Plus size={18} className="text-muted mb-2" />
                <span
                  className="small fw-bold text-muted text-uppercase"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
                >
                  CREATE ROOM
                </span>
              </Button>
            </div>
          </div>
        )}

        <div
          className="chat-right-sidebar bg-white border-start d-flex flex-column"
          style={{ width: "280px", minWidth: "280px" }}
        >
          <div className="d-flex border-bottom">
            <div className="flex-grow-1 text-center py-3 border-2 border-bottom border-blue cursor-pointer">
              <span className="fw-bold text-blue small">Members</span>
            </div>
            <div className="flex-grow-1 text-center py-3 cursor-pointer text-muted">
              <span className="fw-medium small">Files</span>
            </div>
            <div className="flex-grow-1 text-center py-3 cursor-pointer text-muted">
              <span className="fw-medium small">Starred</span>
            </div>
            <div className="flex-grow-1 text-center py-3 cursor-pointer text-muted">
              <span className="fw-medium small">Info</span>
            </div>
          </div>

          <div className="flex-grow-1 overflow-auto hide-scrollbar p-3">
            <div className="mb-4 mt-2">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span
                  className="small fw-bold text-muted text-uppercase"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
                >
                  {activeChat ? "MEMBERS (12)" : "ONLINE — 4"}
                </span>
                {activeChat && (
                  <Button
                    variant="icon"
                    className="btn btn-sm btn-light p-1 border-0 rounded text-muted"
                  >
                    <Plus size={14} />
                  </Button>
                )}
              </div>

              <div className="d-flex align-items-center mb-3 justify-content-between">
                <div className="d-flex align-items-center">
                  <div
                    className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white me-3 position-relative"
                    style={{
                      backgroundColor: "#d97706",
                      width: 32,
                      height: 32,
                      fontSize: "0.8rem",
                    }}
                  >
                    M
                    <div
                      className="position-absolute bg-success rounded-circle border border-white"
                      style={{ width: 10, height: 10, bottom: -2, right: -2 }}
                    ></div>
                  </div>
                  <div>
                    <h6
                      className="m-0 fw-bold text-dark"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Moon
                    </h6>
                    <p
                      className="m-0 text-muted"
                      style={{ fontSize: "0.7rem" }}
                    >
                      Admin
                    </p>
                  </div>
                </div>
                {activeChat && (
                  <Button
                    variant="icon"
                    className="btn btn-sm btn-light border-0 p-1 text-muted rounded"
                  >
                    <X size={14} />
                  </Button>
                )}
              </div>

              <div className="d-flex align-items-center mb-3 justify-content-between">
                <div className="d-flex align-items-center">
                  <div
                    className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white me-3 position-relative"
                    style={{
                      backgroundColor: "#2563eb",
                      width: 32,
                      height: 32,
                      fontSize: "0.8rem",
                    }}
                  >
                    SC
                    <div
                      className="position-absolute bg-success rounded-circle border border-white"
                      style={{ width: 10, height: 10, bottom: -2, right: -2 }}
                    ></div>
                  </div>
                  <div>
                    <h6
                      className="m-0 fw-bold text-dark"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Sri Vishnu
                    </h6>
                    <p
                      className="m-0 text-muted"
                      style={{ fontSize: "0.7rem" }}
                    >
                      Software
                    </p>
                  </div>
                </div>
                {activeChat && (
                  <Button
                    variant="icon"
                    className="btn btn-sm btn-light border-0 p-1 text-muted rounded"
                  >
                    <X size={14} />
                  </Button>
                )}
              </div>

              <div className="d-flex align-items-center mb-3 justify-content-between">
                <div className="d-flex align-items-center">
                  <div
                    className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white me-3 position-relative"
                    style={{
                      backgroundColor: "#8b5cf6",
                      width: 32,
                      height: 32,
                      fontSize: "0.8rem",
                    }}
                  >
                    S
                    <div
                      className="position-absolute bg-success rounded-circle border border-white"
                      style={{ width: 10, height: 10, bottom: -2, right: -2 }}
                    ></div>
                  </div>
                  <div>
                    <h6
                      className="m-0 fw-bold text-dark"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Sun
                    </h6>
                    <p
                      className="m-0 text-muted"
                      style={{ fontSize: "0.7rem" }}
                    >
                      Frontend Engineer
                    </p>
                  </div>
                </div>
                {activeChat && (
                  <Button
                    variant="icon"
                    className="btn btn-sm btn-light border-0 p-1 text-muted rounded"
                  >
                    <X size={14} />
                  </Button>
                )}
              </div>

              <div className="d-flex align-items-center mb-3 justify-content-between">
                <div className="d-flex align-items-center">
                  <div
                    className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white me-3 position-relative"
                    style={{
                      backgroundColor: "#0ea5e9",
                      width: 32,
                      height: 32,
                      fontSize: "0.8rem",
                    }}
                  >
                    S
                    <div
                      className="position-absolute bg-success rounded-circle border border-white"
                      style={{ width: 10, height: 10, bottom: -2, right: -2 }}
                    ></div>
                  </div>
                  <div>
                    <h6
                      className="m-0 fw-bold text-dark"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Star
                    </h6>
                    <p
                      className="m-0 text-muted"
                      style={{ fontSize: "0.7rem" }}
                    >
                      Designer
                    </p>
                  </div>
                </div>
                {activeChat && (
                  <Button
                    variant="icon"
                    className="btn btn-sm btn-light border-0 p-1 text-muted rounded"
                  >
                    <X size={14} />
                  </Button>
                )}
              </div>
            </div>

            <div>
              <span
                className="small fw-bold text-muted text-uppercase mb-3 d-block"
                style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
              >
                OFFLINE &mdash; 2
              </span>

              <div className="d-flex align-items-center mb-3 opacity-75 justify-content-between">
                <div className="d-flex align-items-center">
                  <div
                    className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white me-3 position-relative"
                    style={{
                      backgroundColor: "#64748b",
                      width: 32,
                      height: 32,
                      fontSize: "0.8rem",
                    }}
                  >
                    M
                    <div
                      className="position-absolute bg-secondary rounded-circle border border-white"
                      style={{ width: 10, height: 10, bottom: -2, right: -2 }}
                    ></div>
                  </div>
                  <div>
                    <h6
                      className="m-0 fw-bold text-dark"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Meteor
                    </h6>
                    <p
                      className="m-0 text-muted"
                      style={{ fontSize: "0.7rem" }}
                    >
                      Backend Engineer
                    </p>
                  </div>
                </div>
                {activeChat && (
                  <Button
                    variant="icon"
                    className="btn btn-sm btn-light border-0 p-1 text-muted rounded"
                  >
                    <X size={14} />
                  </Button>
                )}
              </div>

              <div className="d-flex align-items-center mb-3 opacity-75 justify-content-between">
                <div className="d-flex align-items-center">
                  <div
                    className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white me-3 position-relative"
                    style={{
                      backgroundColor: "#ef4444",
                      width: 32,
                      height: 32,
                      fontSize: "0.8rem",
                    }}
                  >
                    G
                    <div
                      className="position-absolute bg-secondary rounded-circle border border-white"
                      style={{ width: 10, height: 10, bottom: -2, right: -2 }}
                    ></div>
                  </div>
                  <div>
                    <h6
                      className="m-0 fw-bold text-dark"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Galaxy
                    </h6>
                    <p
                      className="m-0 text-muted"
                      style={{ fontSize: "0.7rem" }}
                    >
                      DevOps
                    </p>
                  </div>
                </div>
                {activeChat && (
                  <Button
                    variant="icon"
                    className="btn btn-sm btn-light border-0 p-1 text-muted rounded"
                  >
                    <X size={14} />
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="p-3">
            <div className="border rounded p-3 bg-light">
              <span
                className="small fw-bold text-muted text-uppercase mb-3 d-block"
                style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
              >
                INVITE
              </span>
              <Button
                className="btn btn-dark w-100 fw-medium py-2"
                style={{ fontSize: "0.85rem" }}
              >
                Generate Link
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
