import React, { useState, useEffect } from "react";

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
import { chatService, employeeService } from "../../services";

const Chat = ({ onTabChange, onNavigateHome }) => {
  const [activeChat, setActiveChat] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [channels, setChannels] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const roomList = await chatService.getRooms();
        const rawRooms = Array.isArray(roomList) 
          ? roomList 
          : Array.isArray(roomList?.results) 
          ? roomList.results 
          : Array.isArray(roomList?.data) 
          ? roomList.data 
          : [];
        setRooms(rawRooms);
        if (rawRooms.length > 0 && !activeChat) {
          setActiveChat(rawRooms[0]);
        }

        const chanList = await chatService.getChannels();
        const rawChans = Array.isArray(chanList) 
          ? chanList 
          : Array.isArray(chanList?.results) 
          ? chanList.results 
          : Array.isArray(chanList?.data) 
          ? chanList.data 
          : [];
        setChannels(rawChans);

        const empList = await employeeService.getEmployees();
        const rawEmps = Array.isArray(empList) 
          ? empList 
          : Array.isArray(empList?.results) 
          ? empList.results 
          : Array.isArray(empList?.data) 
          ? empList.data 
          : [];
        setUsers(rawEmps);
      } catch (err) {
        setRooms([]);
        setChannels([]);
        setUsers([]);
      }
    };
    fetchChatData();
  }, []);

  useEffect(() => {
    if (!activeChat) return;
    const fetchMessages = async () => {
      try {
        const roomId = activeChat.id || activeChat._id;
        if (roomId) {
          const msgList = await chatService.getMessages(roomId);
          const rawMsgs = Array.isArray(msgList) 
            ? msgList 
            : Array.isArray(msgList?.results) 
            ? msgList.results 
            : [];
          setMessages(rawMsgs);
        } else {
          setMessages([]);
        }
      } catch (err) {
        setMessages([]);
      }
    };
    fetchMessages();
  }, [activeChat]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeChat) return;

    const roomId = activeChat.id || activeChat._id;
    const newMsgObj = {
      room: roomId,
      content: inputMessage,
      sender_name: "You",
      created_at: new Date().toISOString()
    };

    try {
      if (roomId) {
        await chatService.sendMessage(newMsgObj);
      }
      setMessages((prev) => [...prev, newMsgObj]);
      setInputMessage("");
    } catch (err) {
      setMessages((prev) => [...prev, newMsgObj]);
      setInputMessage("");
    }
  };

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
              {channels.length > 0 ? (
                channels.map((chan) => (
                  <div
                    key={chan.id || chan._id}
                    className={`d-flex align-items-center px-3 py-2 cursor-pointer ${
                      activeChat?.id === chan.id ? "bg-blue-light text-blue" : "chat-item-hover"
                    }`}
                    onClick={() => setActiveChat(chan)}
                  >
                    <span className="me-2 fw-semibold">#</span>
                    <span className="fw-medium flex-grow-1 small">{chan.name}</span>
                  </div>
                ))
              ) : (
                <div className="px-3 py-1 small text-muted">No channels in database.</div>
              )}
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
              {rooms.length > 0 ? (
                rooms.map((rm) => (
                  <div
                    key={rm.id || rm._id}
                    className={`d-flex align-items-center px-3 py-2 cursor-pointer ${
                      activeChat?.id === rm.id ? "bg-blue-light text-blue" : "chat-item-hover"
                    }`}
                    onClick={() => setActiveChat(rm)}
                  >
                    <span className="me-2 fw-semibold">#</span>
                    <span className="fw-medium flex-grow-1 small text-dark">{rm.name}</span>
                  </div>
                ))
              ) : (
                <div className="px-3 py-1 small text-muted">No rooms in database.</div>
              )}
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
              {users.length > 0 ? (
                users.map((u) => {
                  const displayName = u.first_name ? `${u.first_name} ${u.last_name || ""}`.trim() : (u.user?.first_name ? `${u.user.first_name} ${u.user.last_name || ""}`.trim() : u.email || "Employee");
                  const initials = displayName.substring(0, 2).toUpperCase();
                  return (
                    <div
                      key={u.id}
                      className={`d-flex align-items-center px-3 py-2 cursor-pointer ${
                        activeChat?.id === u.id ? "bg-blue-light text-blue" : "chat-item-hover"
                      }`}
                      onClick={() => setActiveChat({ id: u.id, name: displayName, type: "direct" })}
                    >
                      <div
                        className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white me-2"
                        style={{
                          backgroundColor: "#2563eb",
                          width: 24,
                          height: 24,
                          fontSize: "0.7rem",
                        }}
                      >
                        {initials}
                      </div>
                      <span className="text-secondary fw-medium flex-grow-1 small">
                        {displayName}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="px-3 py-1 small text-muted">No active users in database.</div>
              )}
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
              VG
            </div>
            <div className="flex-grow-1">
              <h6
                className="m-0 fw-bold text-dark"
                style={{ fontSize: "0.8rem" }}
              >
                Vijay Gopi
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
                <h5 className="m-0 fw-bold text-dark">{activeChat.name || "Chat Room"}</h5>
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

            <div className="flex-grow-1 p-4 overflow-auto d-flex flex-column gap-3 bg-white">
              {messages.length > 0 ? (
                messages.map((msg, idx) => (
                  <div key={msg.id || idx} className="d-flex gap-3">
                    <div
                      className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white"
                      style={{ width: 32, height: 32, backgroundColor: "#2563eb" }}
                    >
                      {(msg.sender_name || "U").substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="d-flex align-items-baseline gap-2 mb-1">
                        <span className="fw-bold text-dark" style={{ fontSize: "0.85rem" }}>
                          {msg.sender_name || msg.sender || "User"}
                        </span>
                        <span className="text-muted" style={{ fontSize: "0.7rem" }}>
                          {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"}
                        </span>
                      </div>
                      <div className="text-dark" style={{ fontSize: "0.9rem" }}>
                        {msg.content || msg.text || ""}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-5 text-muted">
                  No messages in this chat room yet.
                </div>
              )}
            </div>

            <form
              onSubmit={handleSendMessage}
              className="p-4 bg-white"
              style={{ borderTop: "1px solid #f1f5f9" }}
            >
              <div className="border rounded-3 p-2 bg-light d-flex flex-column">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="form-control border-0 bg-transparent shadow-none mb-3 px-2 py-1"
                  placeholder={`Message #${activeChat.name || "chat"}...`}
                  style={{ fontSize: "0.9rem" }}
                />
                <div className="d-flex justify-content-between align-items-center px-2 pb-1">
                  <div className="d-flex gap-3">
                    <Paperclip size={18} className="text-muted cursor-pointer" />
                    <Smile size={18} className="text-muted cursor-pointer" />
                    <AtSign size={18} className="text-muted cursor-pointer" />
                  </div>
                  <Button type="submit" className="btn btn-primary bg-blue border-0 px-4 py-1 rounded fw-medium">
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="chat-main flex-grow-1 d-flex flex-column align-items-center justify-content-center p-4 bg-transparent border-end">
            <div className="text-center mb-4">
              <div
                className="d-inline-flex align-items-center justify-content-center bg-white border rounded-4 shadow-sm mb-4 position-relative"
                style={{ width: 80, height: 80 }}
              >
                <MessageSquare size={32} className="text-muted" strokeWidth={1.5} />
              </div>
              <h4 className="fw-bold text-dark mb-2">Select a conversation</h4>
              <p className="text-muted small mx-auto" style={{ maxWidth: "300px" }}>
                Choose a channel or direct message from the left to start chatting.
              </p>
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
          </div>

          <div className="flex-grow-1 overflow-auto hide-scrollbar p-3">
            <div className="mb-4 mt-2">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span
                  className="small fw-bold text-muted text-uppercase"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
                >
                  MEMBERS ({users.length})
                </span>
              </div>

              {users.length > 0 ? (
                users.map((u) => {
                  const displayName = u.first_name ? `${u.first_name} ${u.last_name || ""}`.trim() : (u.user?.first_name ? `${u.user.first_name} ${u.user.last_name || ""}`.trim() : u.email || "Employee");
                  const initials = displayName.substring(0, 2).toUpperCase();
                  return (
                    <div key={u.id} className="d-flex align-items-center mb-3 justify-content-between">
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
                          {initials}
                          <div
                            className="position-absolute bg-success rounded-circle border border-white"
                            style={{ width: 10, height: 10, bottom: -2, right: -2 }}
                          ></div>
                        </div>
                        <div>
                          <h6 className="m-0 fw-bold text-dark" style={{ fontSize: "0.8rem" }}>
                            {displayName}
                          </h6>
                          <p className="m-0 text-muted" style={{ fontSize: "0.7rem" }}>
                            {u.designation || u.department || "Employee"}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-muted small">No members found in database.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
