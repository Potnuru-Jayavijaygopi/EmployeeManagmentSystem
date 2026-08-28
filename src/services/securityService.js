import apiClient from './apiClient';

export const securityService = {
  getSecurityStatus: async () => {
    return await apiClient.get('/security/status/');
  },

  getSecuritySummary: async () => {
    return await apiClient.get('/security/summary/');
  },

  getRateLimitStatus: async () => {
    return await apiClient.get('/security/rate-limit/status/');
  },

  getActivityLogs: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return await apiClient.get(`/logs/activity/${query ? `?${query}` : ''}`);
  },

  getAuditLogs: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return await apiClient.get(`/logs/audit/${query ? `?${query}` : ''}`);
  }
};

export default securityService;
