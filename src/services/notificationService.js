import apiClient from './apiClient';

export const notificationService = {
  getNotifications: async () => {
    return await apiClient.get('/notifications/');
  },

  getPreferences: async () => {
    return await apiClient.get('/notifications/preferences/');
  },

  updatePreferences: async (data) => {
    return await apiClient.post('/notifications/preferences/', data);
  },

  getEscalations: async () => {
    return await apiClient.get('/notifications/escalations/');
  }
};

export default notificationService;
