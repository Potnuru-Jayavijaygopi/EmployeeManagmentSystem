import { useState, useEffect } from "react";

import Breadcrumb from "../../components/dashboard/Breadcrumb";
import {
  Bell,
  Search,
  Filter,
  Trash2,
  Plus,
  AlertCircle,
  Users,
  X,
  Trash,
  ArrowLeft,
  CheckSquare,
  Clock,
  CheckCheck,
  Eye,
  MoreVertical,
} from "lucide-react";
import "./Announcements.css";
import { initialAnnouncements } from "../../data/intialAnnouncments";
import Button from "../../components/common/Button";
import { filters, stats } from "../../data/announcmentsData";
import { dashboardService, withFallback } from "../../services";

const Announcements = ({ onTabChange, onNavigateHome }) => {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const apiData = await withFallback(dashboardService.getAnnouncements(), initialAnnouncements);
      setAnnouncements(Array.isArray(apiData) ? apiData : apiData.results || initialAnnouncements);
    };
    fetchAnnouncements();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);

  const [viewingAnnouncement, setViewingAnnouncement] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    priority: "Normal",
    expires: "",
    content: "",
    visibility: "",
  });

  const openCreateModal = () => {
    setEditingAnnouncement(null);
    setFormData({
      title: "",
      priority: "Normal",
      expires: "",
      content: "",
      visibility: "",
    });
    setIsModalOpen(true);
  };

  const closeCreateEditModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (announcementToDelete) {
      setAnnouncements(
        announcements.filter((a) => a.id !== announcementToDelete.id)
      );
    }
    setIsDeleteModalOpen(false);
    setAnnouncementToDelete(null);
  };

  const handleSave = () => {

    if (editingAnnouncement) {
      setAnnouncements(
        announcements.map((a) =>
          a.id === editingAnnouncement.id
            ? {
                ...a,
                title: formData.title,
                description: formData.content.substring(0, 50),
                content: formData.content,
                expires: formData.expires,
              }
            : a
        )
      );
    } else {
      const newAnn = {
        id: Date.now(),
        type: formData.priority === "High" ? "urgent" : "info",
        category: "General",
        title: formData.title,
        description: formData.content.substring(0, 50),
        content: formData.content,
        author: "Admin",
        date: "Just now",
        expires: formData.expires,
        icon: formData.priority === "High" ? AlertCircle : Bell,
      };
      setAnnouncements([newAnn, ...announcements]);
    }
    setIsModalOpen(false);
  };

  if (viewingAnnouncement) {
    const isUrgent = viewingAnnouncement.type === "urgent";
    const Icon = viewingAnnouncement.icon;
    return (
      <>
        <div className="announcements-container">
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <Breadcrumb items={["Dashboard", "Announcements"]} />
              <h1 className="page-title m-0">Company Announcements</h1>
              <p className="text-muted">
                Leave requests, tasks, messages and system alerts
              </p>
            </div>
            <Button
              variant="outline"
              className="btn btn-outline border"
              onClick={() => setViewingAnnouncement(null)}
            >
              <ArrowLeft size={16} className="me-2" /> Back to List
            </Button>
          </div>

          <div className="announcement-view-card">
            <div className="d-flex align-items-center mb-4">
              <div
                className={`view-icon-box ${
                  isUrgent ? "bg-red-light text-red" : "bg-blue-light text-blue"
                }`}
              >
                <Icon size={24} />
              </div>
              <div className="ms-3">
                <h2 className="view-title mb-1">{viewingAnnouncement.title}</h2>
                <div className="view-meta text-muted">
                  <Clock size={14} className="me-1" />{" "}
                  {viewingAnnouncement.date}
                  <span className="mx-2">•</span>
                  <Users size={14} className="me-1" /> By{" "}
                  {viewingAnnouncement.author}
                </div>
              </div>
            </div>

            <div className="view-content-box">
              <h6 className="content-label text-muted mb-3">MESSAGE CONTENT</h6>
              <div className="content-body" style={{ whiteSpace: "pre-line" }}>
                {viewingAnnouncement.content}
              </div>
            </div>

            <div className="mt-4">
              <Button
                className="btn btn-primary bg-blue border-0"
                onClick={() => setViewingAnnouncement(null)}
              >
                <CheckSquare size={16} className="me-2" /> Mark as Read
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="announcements-container">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <Breadcrumb items={["Dashboard", "Announcements"]} />
            <h1 className="page-title m-0">Company Announcements</h1>
            <p className="text-muted m-0 mt-1">
              Leave requests, tasks, messages and system alerts
            </p>
          </div>
          <Button
            className="btn btn-primary bg-blue border-0"
            onClick={openCreateModal}
          >
            <Plus size={18} className="me-2" /> Create Announcement
          </Button>
        </div>

        <div className="row g-3 mb-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="col-12 col-md-3">
              <div className="announcement-stat-card">
                <div>
                  <h3 className="stat-count">{stat.count}</h3>
                  <p className="stat-title">{stat.title}</p>
                </div>
                <div className={`stat-icon-wrapper ${stat.bg} ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="announcement-toolbar mb-4">
          <div className="filter-pills">
            {filters.map((filter) => (
              <Button
                key={filter}
                className={`filter-pill ${
                  activeFilter === filter ? "active bg-blue text-white" : ""
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
          <div className="toolbar-actions d-flex align-items-center position-relative">
            <div className="search-box me-3">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search notifications..."
                className="form-control ps-5"
              />
            </div>
            <Button
              variant="outline"
              className="btn btn-outline border p-2"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
            >
              <Filter size={18} />
            </Button>

            {showSortDropdown && (
              <div className="sort-dropdown shadow-sm border rounded">
                <div className="sort-option active text-blue">Newest First</div>
                <div className="sort-option">Oldest First</div>
                <div className="sort-option">Recently Updated</div>
                <div className="sort-option">Priority</div>
                <div className="sort-option">Unread First</div>
              </div>
            )}
          </div>
        </div>

        <div className="announcements-list-wrapper">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h5 className="mb-1 fw-bold">Announcements</h5>
              <p className="text-muted mb-0 small">
                Stay updated with company news
              </p>
            </div>
            <Button variant="outline" className="btn-system btn-system-outline bg-white border text-dark d-flex align-items-center gap-2 px-3">
              <CheckCheck size={16} className="text-muted" /> Mark All Read
            </Button>
          </div>

          <div className="announcements-list">
            {announcements
              .filter(
                (a) => activeFilter === "All" || a.category === activeFilter
              )
              .map((announcement) => {
                const IconComponent = (typeof announcement.icon === 'function' || typeof announcement.icon === 'object') ? announcement.icon : AlertCircle;
                const isUrgent = announcement.type === "urgent";
                return (
                  <div
                    key={announcement.id}
                    className="announcement-list-item bg-white border text-start  rounded mb-3 position-relative d-flex align-items-center p-3 shadow-sm"
                    style={{ cursor: "pointer" }}
                    onClick={() => setViewingAnnouncement(announcement)}
                  >
                    <div
                      className={`item-accent ${
                        isUrgent ? "bg-red" : "bg-blue"
                      }`}
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: "4px",
                        borderTopLeftRadius: "4px",
                        borderBottomLeftRadius: "4px",
                      }}
                    ></div>

                    <div
                      className={`item-icon-box ms-3 ${
                        isUrgent
                          ? "bg-red-light text-red"
                          : "bg-blue-light text-blue"
                      }`}
                    >
                      <IconComponent size={20} />
                    </div>

                    <div className="item-content ms-4 flex-grow-1 text-start">
                      <h6 className="mb-1 fw-bold text-start">
                        {announcement.title}
                      </h6>
                      <p className="text-muted mb-1 small text-start">
                        {announcement.description}
                      </p>
                      <div className="text-muted small text-start">
                        By {announcement.author} <span className="mx-1">•</span>{" "}
                        Expires: {announcement.expires}
                      </div>
                    </div>

                    <div className="item-actions d-flex align-items-center gap-2">
                      <Button variant="icon" className="btn btn-action-icon rounded border-0 text-muted">
                        <Eye size={18} />
                      </Button>
                      <Button variant="icon" className="btn btn-action-icon rounded border-0 text-muted">
                        <MoreVertical size={18} />
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content-box p-4 bg-white rounded shadow-lg">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center">
                <div className="modal-icon-bg bg-blue-light text-blue rounded p-2 me-3">
                  <Plus size={20} />
                </div>
                <h5 className="m-0 fw-semibold">
                  {editingAnnouncement
                    ? "Edit Announcement"
                    : "Create Announcement"}
                </h5>
              </div>
              <Button variant="icon"
                className="btn btn-light rounded-circle p-2 border-0"
                onClick={closeCreateEditModal}
              >
                <X size={20} />
              </Button>
            </div>

            <div className="form-group mb-3">
              <label className="fw-medium mb-2">
                Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter announcement title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="row mb-3">
              <div className="col-6">
                <label className="fw-medium mb-2">
                  Priority <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                >
                  <option>Normal</option>
                  <option>High</option>
                </select>
              </div>
              <div className="col-6">
                <label className="fw-medium mb-2">
                  Expires at <span className="text-danger">*</span>
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={formData.expires}
                  onChange={(e) =>
                    setFormData({ ...formData, expires: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="fw-medium mb-2">
                Content <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Write your announcement..."
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              ></textarea>
            </div>

            <div className="form-group mb-4">
              <label className="fw-medium mb-2">Visibility</label>
              <input
                type="text"
                className="form-control"
                value={formData.visibility}
                onChange={(e) =>
                  setFormData({ ...formData, visibility: e.target.value })
                }
              />
            </div>

            <div className="d-flex justify-content-end border-top pt-3 mt-4">
              <Button variant="secondary"
                className="btn btn-light border px-4 py-2 me-3"
                onClick={closeCreateEditModal}
              >
                Cancel
              </Button>
              <Button
                className="btn btn-primary bg-blue border-0 px-4 py-2"
                onClick={handleSave}
              >
                <CheckSquare size={18} className="me-2" />{" "}
                {editingAnnouncement
                  ? "Update announcement"
                  : "Save announcement"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div
            className="modal-content-box delete-modal p-0 bg-white rounded-lg shadow-lg overflow-hidden"
            style={{ maxWidth: "550px" }}
          >
            <div className="p-3 border-bottom">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="modal-icon-bg bg-red-light text-red rounded p-2 me-3">
                    <Trash2 size={20} />
                  </div>
                  <div className="d-flex align-items-start flex-column ">
                    <h5 className="m-0 fw-bold">Delete Announcement</h5>
                    <p className="text-muted small m-0">
                      This action cannot be undone
                    </p>
                  </div>
                </div>
                <Button variant="secondary"
                  className="btn btn-light rounded-circle p-2 border-0"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  <X size={20} />
                </Button>
              </div>
            </div>

            <div className="p-4 text-center">
              <div
                className="d-inline-flex align-items-center justify-content-center bg-red-light text-red rounded-circle mb-3"
                style={{ width: 60, height: 60 }}
              >
                <Trash size={28} />
              </div>
              <h5 className="fw-bold mb-3">
                Delete {announcementToDelete?.title} ?
              </h5>
              <p className="text-muted small px-3">
                Once deleted, this announcement will be permanently removed from
                your records and will no longer appear in your announcements
                panel.
              </p>
            </div>

            <div className="p-3 bg-light d-flex justify-content-end border-top">
              <Button variant="secondary"
                className="btn btn-white border px-4 py-2 me-2 bg-white fw-semibold text-dark"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="btn btn-danger bg-red-light text-red border-red-light px-4 py-2 fw-semibold"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Announcements;
