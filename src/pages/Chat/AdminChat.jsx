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
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  ThumbsUp,
  Reply,
} from "lucide-react";
import "./Chat.css";
import Button from "../../components/common/Button";
import { MdFolderZip } from "react-icons/md";
import { availableUsers } from "../../data/chatAvailableUsers";

const AdminChat = ({ onTabChange, onNavigateHome }) => {
  const [activeChat, setActiveChat] = useState(null);
  const [activeRightTab, setActiveRightTab] = useState("Info");
  const [hoveredMessage, setHoveredMessage] = useState(null);

  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  const availableUsersList = availableUsers.filter(
    (u) => !selectedParticipants.find((p) => p.name === u.name)
  );

  const addParticipant = (user) => {
    setSelectedParticipants([...selectedParticipants, user]);
  };

  const removeParticipant = (user) => {
    setSelectedParticipants(
      selectedParticipants.filter((p) => p.name !== user.name)
    );
  };

  const renderRightTabContent = () => {
    switch (activeRightTab) {
      case "Files":
        return (
          <div className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
              <span
                className="small fw-bold text-muted text-uppercase"
                style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
              >
                STARRED MESSAGES
              </span>
              <span
                className="small fw-bold text-muted text-uppercase cursor-pointer"
                style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
              >
                DELETE ALL
              </span>
            </div>

            <div className="d-flex align-items-center mb-4">
              <div
                className="d-flex justify-content-center align-items-center rounded bg-danger-light text-danger me-3"
                style={{ width: 40, height: 40 }}
              >
                <FileText size={20} />
              </div>
              <div>
                <h6
                  className="m-0 fw-medium text-dark"
                  style={{ fontSize: "0.85rem" }}
                >
                  brand_guidelines_v2.pdf
                </h6>
                <p className="m-0 text-muted" style={{ fontSize: "0.7rem" }}>
                  Oct 24 • 4.2 MB
                </p>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4">
              <div
                className="d-flex justify-content-center align-items-center rounded text-purple me-3"
                style={{ width: 40, height: 40, backgroundColor: "#f3e8ff" }}
              >
                <ImageIcon size={20} />
              </div>
              <div>
                <h6
                  className="m-0 fw-medium text-dark"
                  style={{ fontSize: "0.85rem" }}
                >
                  lobby_concept_01.jpg
                </h6>
                <p className="m-0 text-muted" style={{ fontSize: "0.7rem" }}>
                  Oct 24 • 1.8 MB
                </p>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4">
              <div
                className="d-flex justify-content-center align-items-center rounded bg-success-light text-success me-3"
                style={{ width: 40, height: 40 }}
              >
                <FileSpreadsheet size={20} />
              </div>
              <div>
                <h6
                  className="m-0 fw-medium text-dark"
                  style={{ fontSize: "0.85rem" }}
                >
                  resource_allocation.xlsx
                </h6>
                <p className="m-0 text-muted" style={{ fontSize: "0.7rem" }}>
                  Oct 22 • 840 KB
                </p>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4">
              <div
                className="d-flex justify-content-center align-items-center rounded bg-warning-light text-warning me-3"
                style={{ width: 40, height: 40 }}
              >
                <MdFolderZip size={20} />
              </div>
              <div>
                <h6
                  className="m-0 fw-medium text-dark"
                  style={{ fontSize: "0.85rem" }}
                >
                  Assets_Package.zip
                </h6>
                <p className="m-0 text-muted" style={{ fontSize: "0.7rem" }}>
                  Oct 20 • 125 MB
                </p>
              </div>
            </div>
          </div>
        );

      case "Starred":
        return (
          <div className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
              <span
                className="small fw-bold text-muted text-uppercase"
                style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
              >
                STARRED MESSAGES
              </span>
              <span
                className="small fw-bold text-muted text-uppercase cursor-pointer"
                style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
              >
                DELETE ALL
              </span>
            </div>

            <div className="mb-4 pb-3 border-bottom">
              <div className="d-flex gap-2 mb-2">
                <div
                  className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white"
                  style={{
                    width: 24,
                    height: 24,
                    fontSize: "0.7rem",
                    backgroundColor: "#8b5cf6",
                  }}
                >
                  S
                </div>
                <div>
                  <div className="d-flex align-items-baseline gap-2 mb-1">
                    <span
                      className="fw-bold text-dark"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Sun
                    </span>
                    <span
                      className="text-muted"
                      style={{ fontSize: "0.65rem" }}
                    >
                      9:14 AM
                    </span>
                  </div>
                  <div className="text-dark" style={{ fontSize: "0.8rem" }}>
                    Hey team, I pushed the auth fix to the PR. Can someone
                    review when they get a chance?
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4 pb-3 border-bottom">
              <div className="d-flex gap-2 mb-2">
                <div
                  className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white"
                  style={{
                    width: 24,
                    height: 24,
                    fontSize: "0.7rem",
                    backgroundColor: "#0ea5e9",
                  }}
                >
                  S
                </div>
                <div>
                  <div className="d-flex align-items-baseline gap-2 mb-1">
                    <span
                      className="fw-bold text-dark"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Star
                    </span>
                    <span
                      className="text-muted"
                      style={{ fontSize: "0.65rem" }}
                    >
                      9:17 AM
                    </span>
                  </div>
                  <div className="text-dark" style={{ fontSize: "0.8rem" }}>
                    On it! Also the new dashboard mockups are ready — dropping
                    them in Figma now.
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4 pb-3">
              <div className="d-flex gap-2 mb-2">
                <div
                  className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white"
                  style={{
                    width: 24,
                    height: 24,
                    fontSize: "0.7rem",
                    backgroundColor: "#8b5cf6",
                  }}
                >
                  S
                </div>
                <div>
                  <div className="d-flex align-items-baseline gap-2 mb-1">
                    <span
                      className="fw-bold text-dark"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Sun
                    </span>
                    <span
                      className="text-muted"
                      style={{ fontSize: "0.65rem" }}
                    >
                      9:21 AM
                    </span>
                  </div>
                  <div className="text-dark" style={{ fontSize: "0.8rem" }}>
                    Works for me 👍
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "Info":
        return (
          <div className="p-3">
            <div className="text-center mb-4 mt-2">
              <div
                className="avatar rounded-circle d-flex justify-content-center align-items-center mx-auto mb-3 bg-light text-muted"
                style={{ width: 80, height: 80 }}
              ></div>
              <h5 className="fw-bold text-dark mb-1">Engineering Team</h5>
              <p className="text-muted small">
                Public Channel • Created Mar 12, 2026
              </p>
            </div>

            <div className="mb-4">
              <span
                className="small fw-bold text-muted text-uppercase mb-2 d-block"
                style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
              >
                DESCRIPTION
              </span>
              <p className="text-dark" style={{ fontSize: "0.85rem" }}>
                Engineering team discussions, code reviews, and sprint updates.
              </p>
            </div>

            <div className="mb-4 pb-4 border-bottom">
              <span
                className="small fw-bold text-muted text-uppercase mb-2 d-block"
                style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
              >
                CHANNEL TYPE
              </span>
              <div className="d-flex justify-content-between align-items-center border rounded p-2 px-3">
                <span
                  className="fw-medium text-dark"
                  style={{ fontSize: "0.85rem" }}
                >
                  Visibility
                </span>
                <span className="badge bg-success-light text-success fw-semibold rounded-pill px-3">
                  Public
                </span>
              </div>
            </div>

            {renderMembersList()}
          </div>
        );

      case "Members":
      default:
        return (
          <>
            <div className="flex-grow-1 overflow-auto hide-scrollbar p-3">
              {renderMembersList()}
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
          </>
        );
    }
  };

  const renderMembersList = () => (
    <>
      <div className="mb-4 mt-2">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span
            className="small fw-bold text-muted text-uppercase"
            style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
          >
            {activeChat ? "MEMBERS (12)" : "ONLINE — 4"}
          </span>
          {activeChat && activeRightTab === "Members" && (
            <Button
              variant="icon"
              className="btn btn-sm btn-light p-1 border-0 rounded text-muted"
              onClick={() => setShowAddMembersModal(true)}
            >
              <Plus size={14} />
            </Button>
          )}
        </div>

        {[
          {
            name: "Moon",
            role: "Admin",
            initials: "M",
            color: "#d97706",
            online: true,
          },
          {
            name: "Sri Vishnu",
            role: "Software Engineer",
            initials: "SC",
            color: "#2563eb",
            online: true,
          },
          {
            name: "Sun",
            role: "Frontend Engineer",
            initials: "S",
            color: "#8b5cf6",
            online: true,
          },
          {
            name: "Star",
            role: "Designer",
            initials: "S",
            color: "#0ea5e9",
            online: true,
          },
        ].map((member) => (
          <div
            key={member.name}
            className="d-flex align-items-center mb-3 justify-content-between"
          >
            <div className="d-flex align-items-center">
              <div
                className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white me-3 position-relative"
                style={{
                  backgroundColor: member.color,
                  width: 32,
                  height: 32,
                  fontSize: "0.8rem",
                }}
              >
                {member.initials}
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
                  {member.name}
                </h6>
                <p className="m-0 text-muted" style={{ fontSize: "0.7rem" }}>
                  {member.role}
                </p>
              </div>
            </div>
            {activeChat && activeRightTab === "Members" && (
              <Button
                variant="icon"
                className="btn btn-sm btn-light border-0 p-1 text-muted rounded bg-light"
              >
                <X size={14} />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div>
        <span
          className="small fw-bold text-muted text-uppercase mb-3 d-block"
          style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
        >
          OFFLINE &mdash; 2
        </span>

        {[
          {
            name: "Meteor",
            role: "Backend Engineer",
            initials: "M",
            color: "#64748b",
          },
          { name: "Galaxy", role: "DevOps", initials: "G", color: "#ef4444" },
        ].map((member) => (
          <div
            key={member.name}
            className="d-flex align-items-center mb-3 opacity-75 justify-content-between"
          >
            <div className="d-flex align-items-center">
              <div
                className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white me-3 position-relative"
                style={{
                  backgroundColor: member.color,
                  width: 32,
                  height: 32,
                  fontSize: "0.8rem",
                }}
              >
                {member.initials}
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
                  {member.name}
                </h6>
                <p className="m-0 text-muted" style={{ fontSize: "0.7rem" }}>
                  {member.role}
                </p>
              </div>
            </div>
            {activeChat && activeRightTab === "Members" && (
              <Button
                variant="icon"
                className="btn btn-sm btn-light border-0 p-1 text-muted rounded bg-light"
              >
                <X size={14} />
              </Button>
            )}
          </div>
        ))}
      </div>
    </>
  );

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

              <div
                className="d-flex gap-3 position-relative msg-row"
                onMouseEnter={() => setHoveredMessage(1)}
                onMouseLeave={() => setHoveredMessage(null)}
              >
                <div
                  className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white"
                  style={{ width: 32, height: 32, backgroundColor: "#8b5cf6" }}
                >
                  S
                </div>
                <div className="flex-grow-1">
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
                {hoveredMessage === 1 && (
                  <div
                    className="msg-actions position-absolute border bg-white rounded shadow-sm d-flex overflow-hidden"
                    style={{ top: -10, right: 10 }}
                  >
                    <div className="p-2 cursor-pointer msg-action-hover border-end">
                      <ThumbsUp size={14} className="text-muted" />
                    </div>
                    <div className="p-2 cursor-pointer msg-action-hover border-end">
                      <Reply size={14} className="text-muted" />
                    </div>
                    <div className="p-2 cursor-pointer msg-action-hover">
                      <Star size={14} className="text-muted" />
                    </div>
                  </div>
                )}
              </div>

              <div
                className="d-flex gap-3 position-relative msg-row"
                onMouseEnter={() => setHoveredMessage(2)}
                onMouseLeave={() => setHoveredMessage(null)}
              >
                <div
                  className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white"
                  style={{ width: 32, height: 32, backgroundColor: "#0ea5e9" }}
                >
                  S
                </div>
                <div className="flex-grow-1">
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
                {hoveredMessage === 2 && (
                  <div
                    className="msg-actions position-absolute border bg-white rounded shadow-sm d-flex overflow-hidden"
                    style={{ top: -10, right: 10 }}
                  >
                    <div className="p-2 cursor-pointer msg-action-hover border-end">
                      <ThumbsUp size={14} className="text-muted" />
                    </div>
                    <div className="p-2 cursor-pointer msg-action-hover border-end">
                      <Reply size={14} className="text-muted" />
                    </div>
                    <div className="p-2 cursor-pointer msg-action-hover">
                      <Star size={14} className="text-muted" />
                    </div>
                  </div>
                )}
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

              <div
                className="d-flex gap-3 mt-2 position-relative msg-row"
                onMouseEnter={() => setHoveredMessage(4)}
                onMouseLeave={() => setHoveredMessage(null)}
              >
                <div
                  className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white"
                  style={{ width: 32, height: 32, backgroundColor: "#8b5cf6" }}
                >
                  S
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex align-items-baseline gap-2 mb-1">
                    <span
                      className="fw-bold text-dark"
                      style={{ fontSize: "0.85rem" }}
                    >
                      Sun
                    </span>
                    <span className="text-muted" style={{ fontSize: "0.7rem" }}>
                      9:21 AM
                    </span>
                  </div>
                  <div className="text-dark" style={{ fontSize: "0.9rem" }}>
                    Works for me
                  </div>
                  <div className="mt-2 d-flex gap-2 align-items-center">
                    <div className="bg-light rounded px-2 py-1 d-flex align-items-center gap-1 border">
                      <span>👍</span>
                    </div>
                    {hoveredMessage === 4 && (
                      <div className="d-flex gap-2">
                        <Button
                          variant="ghost"
                          className="btn btn-sm btn-light border py-0 px-2 small text-muted"
                        >
                          Reply
                        </Button>
                        <Button
                          variant="ghost"
                          className="btn btn-sm btn-light border py-0 px-2 small text-muted"
                        >
                          Star
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                {hoveredMessage === 4 && (
                  <div
                    className="msg-actions position-absolute border bg-white rounded shadow-sm d-flex overflow-hidden"
                    style={{ top: -10, right: 10 }}
                  >
                    <div className="p-2 cursor-pointer msg-action-hover border-end">
                      <ThumbsUp size={14} className="text-muted" />
                    </div>
                    <div className="p-2 cursor-pointer msg-action-hover border-end">
                      <Reply size={14} className="text-muted" />
                    </div>
                    <div className="p-2 cursor-pointer msg-action-hover">
                      <Star size={14} className="text-muted" />
                    </div>
                  </div>
                )}
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
                onClick={() => setShowCreateRoomModal(true)}
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
          style={{ width: "320px", minWidth: "320px" }}
        >
          <div className="d-flex border-bottom">
            {["Members", "Files", "Starred", "Info"].map((tab) => (
              <div
                key={tab}
                className={`flex-grow-1 text-center py-3 cursor-pointer ${
                  activeRightTab === tab
                    ? "border-2 border-bottom border-blue"
                    : "text-muted"
                }`}
                onClick={() => setActiveRightTab(tab)}
              >
                <span
                  className={`fw-${
                    activeRightTab === tab ? "bold text-blue" : "medium"
                  } small`}
                >
                  {tab}
                </span>
              </div>
            ))}
          </div>

          <div className="flex-grow-1 overflow-auto hide-scrollbar">
            {renderRightTabContent()}
          </div>
        </div>
      </div>

      {showAddMembersModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 1050 }}
        >
          <div
            className="bg-white rounded-4 shadow-lg p-4"
            style={{ width: "400px", maxWidth: "90%" }}
          >
            <h5 className="fw-bold mb-3 text-dark text-center text-start">
              Add Members
            </h5>

            <div className="border rounded-3 p-2 mb-3">
              {selectedParticipants.length > 0 && (
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {selectedParticipants.map((p) => (
                    <div
                      key={p.name}
                      className="badge bg-light text-dark border d-flex align-items-center gap-1 py-1 px-2 rounded-pill"
                    >
                      <div
                        className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white"
                        style={{
                          backgroundColor: p.color,
                          width: 16,
                          height: 16,
                          fontSize: "0.5rem",
                        }}
                      >
                        {p.initials}
                      </div>
                      <span className="fw-medium text-secondary">{p.name}</span>
                      <X
                        size={12}
                        className="cursor-pointer text-muted ms-1"
                        onClick={() => removeParticipant(p)}
                      />
                    </div>
                  ))}
                </div>
              )}
              <input
                type="text"
                className="form-control border-0 shadow-none p-0"
                placeholder="Search people..."
                style={{ fontSize: "0.85rem" }}
              />
            </div>

            <div
              className="mb-4 d-flex flex-column gap-3 overflow-auto"
              style={{ maxHeight: "200px" }}
            >
              {availableUsersList.map((u) => (
                <div
                  key={u.name}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white"
                      style={{
                        backgroundColor: u.color,
                        width: 32,
                        height: 32,
                        fontSize: "0.8rem",
                      }}
                    >
                      {u.initials}
                    </div>
                    <div>
                      <h6
                        className="m-0 fw-medium text-dark"
                        style={{ fontSize: "0.85rem" }}
                      >
                        {u.name}
                      </h6>
                      <p
                        className="m-0 text-muted"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {u.role}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="icon"
                    className="btn btn-sm btn-light p-1 rounded-circle border text-muted"
                    onClick={() => addParticipant(u)}
                  >
                    <Plus size={14} />
                  </Button>
                </div>
              ))}
            </div>

            <div className="d-flex flex-column gap-2">
              <Button
                className="btn btn-primary w-100 rounded-3 py-2 fw-medium"
                disabled={selectedParticipants.length === 0}
                style={{
                  backgroundColor:
                    selectedParticipants.length === 0 ? "#93c5fd" : "#3b82f6",
                  border: "none",
                }}
              >
                Add Member
              </Button>
              <Button
                variant="ghost"
                className="btn btn-white w-100 text-muted fw-medium py-2"
                onClick={() => {
                  setShowAddMembersModal(false);
                  setSelectedParticipants([]);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {showCreateRoomModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 1050 }}
        >
          <div
            className="bg-white rounded-4 shadow-lg p-4"
            style={{ width: "400px", maxWidth: "90%" }}
          >
            <h5 className="fw-bold mb-4 text-dark text-start">Create Room</h5>

            <div className="mb-3">
              <label
                className="small fw-bold text-muted text-uppercase mb-2 d-block"
                style={{ fontSize: "0.65rem", letterSpacing: "0.05em" }}
              >
                ROOM NAME
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. design-reviews"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label
                className="small fw-bold text-muted text-uppercase mb-2 d-block"
                style={{ fontSize: "0.65rem", letterSpacing: "0.05em" }}
              >
                ADD PARTICIPANTS
              </label>
              <div className="border rounded-3 p-2 mb-3">
                {selectedParticipants.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    {selectedParticipants.map((p) => (
                      <div
                        key={p.name}
                        className="badge bg-light text-dark border d-flex align-items-center gap-1 py-1 px-2 rounded-pill"
                      >
                        <div
                          className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white"
                          style={{
                            backgroundColor: p.color,
                            width: 16,
                            height: 16,
                            fontSize: "0.5rem",
                          }}
                        >
                          {p.initials}
                        </div>
                        <span className="fw-medium text-secondary">
                          {p.name}
                        </span>
                        <X
                          size={12}
                          className="cursor-pointer text-muted ms-1"
                          onClick={() => removeParticipant(p)}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <input
                  type="text"
                  className="form-control border-0 shadow-none p-0"
                  placeholder="Search people..."
                  style={{ fontSize: "0.85rem" }}
                />
              </div>
            </div>

            <div
              className="mb-4 d-flex flex-column gap-3 overflow-auto"
              style={{ maxHeight: "180px" }}
            >
              {availableUsersList.map((u) => (
                <div
                  key={u.name}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white"
                      style={{
                        backgroundColor: u.color,
                        width: 32,
                        height: 32,
                        fontSize: "0.8rem",
                      }}
                    >
                      {u.initials}
                    </div>
                    <div>
                      <h6
                        className="m-0 fw-medium text-dark"
                        style={{ fontSize: "0.85rem" }}
                      >
                        {u.name}
                      </h6>
                      <p
                        className="m-0 text-muted"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {u.role}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="icon"
                    className="btn btn-sm btn-light p-1 rounded-circle border text-muted"
                    onClick={() => addParticipant(u)}
                  >
                    <Plus size={14} />
                  </Button>
                </div>
              ))}
            </div>

            <div className="d-flex flex-column gap-2">
              <Button
                className="btn btn-primary w-100 rounded-3 py-2 fw-medium"
                disabled={!roomName || selectedParticipants.length === 0}
                style={{
                  backgroundColor:
                    !roomName || selectedParticipants.length === 0
                      ? "#93c5fd"
                      : "#3b82f6",
                  border: "none",
                }}
              >
                Create Room
              </Button>
              <Button
                variant="ghost"
                className="btn btn-white w-100 text-muted fw-medium py-2"
                onClick={() => {
                  setShowCreateRoomModal(false);
                  setRoomName("");
                  setSelectedParticipants([]);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminChat;
