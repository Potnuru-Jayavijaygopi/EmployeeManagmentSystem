import React, { useState, useEffect } from 'react';
import Button from '../Button';
import { notificationService, withFallback } from '../../../services';

export const NotificationItem = ({ 
  initials, 
  iconColor = 'danger', 
  title, 
  date, 
  description, 
  isUnread = false,
  onMark,
  onDelete
}) => {
  return (
    <div className={`notification-item ${isUnread ? 'unread' : ''}`}>
      <div className="notification-content-wrapper">
        <div className={`notification-avatar bg-${iconColor}-light`}>
          {initials}
        </div>
        <div className="notification-details">
          <div className="d-flex justify-content-between align-items-start mb-1">
            <h6 className="notification-title mb-0 pr-3">{title}</h6>
            <span className="notification-date">{date}</span>
          </div>
          <p className="notification-desc mb-3">
            {description}
          </p>
          <div className="d-flex gap-2">
            <Button variant="primary" size="sm" onClick={onMark}>Mark</Button>
            <Button variant="outline-destructive" size="sm" onClick={onDelete}>Delete</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NotificationList = ({ notifications: initialNotifications, count, onViewAll }) => {
  const [notificationsList, setNotificationsList] = useState(initialNotifications || []);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await withFallback(notificationService.getNotifications(), initialNotifications);
      if (data) setNotificationsList(Array.isArray(data) ? data : data.results || initialNotifications);
    };
    fetchNotifications();
  }, []);
  return (
    <div className="card shadow-sm border-0 h-100 rounded-4 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-2">
          <h5 className="mb-0 fw-bold notification-header-title">Notifications</h5>
          {count > 0 && (
            <span className="badge bg-danger rounded-pill px-2 notification-badge">{count}</span>
          )}
        </div>
        <Button variant="ghost" className="btn-link p-0 border-0 bg-transparent text-decoration-none fw-medium notification-view-all" onClick={onViewAll}>
          View all
        </Button>
      </div>
      <div className="notification-list">
        {notifications.map((notif, idx) => (
          <NotificationItem key={notif.id || idx} {...notif} />
        ))}
      </div>
    </div>
  );
};
