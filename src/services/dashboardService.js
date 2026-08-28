import apiClient from './apiClient';

export const dashboardService = {
  getSummary: async () => {
    return await apiClient.get('/dashboard/summary/');
  },

  getTasks: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return await apiClient.get(`/dashboard/tasks/${query ? `?${query}` : ''}`);
  },

  createTask: async (taskData) => {
    return await apiClient.post('/dashboard/tasks/', taskData);
  },

  updateTask: async (id, taskData) => {
    return await apiClient.patch(`/dashboard/tasks/${id}/`, taskData);
  },

  deleteTask: async (id) => {
    return await apiClient.delete(`/dashboard/tasks/${id}/`);
  },

  getProjects: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return await apiClient.get(`/dashboard/projects/${query ? `?${query}` : ''}`);
  },

  createProject: async (projectData) => {
    return await apiClient.post('/dashboard/projects/', projectData);
  },

  getAnnouncements: async () => {
    return await apiClient.get('/dashboard/announcements/');
  },

  createAnnouncement: async (data) => {
    return await apiClient.post('/dashboard/announcements/', data);
  }
};

export default dashboardService;
