import apiClient from './apiClient';

export const analyticsService = {
  getDashboardAnalytics: async () => {
    return await apiClient.get('/analytics/dashboard/');
  },

  getAttendanceAnalytics: async () => {
    return await apiClient.get('/analytics/attendance/');
  },

  getProductivityAnalytics: async () => {
    return await apiClient.get('/analytics/productivity/');
  }
};

export default analyticsService;
