import apiClient from './apiClient';

export const leaveService = {
  getLeaves: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return await apiClient.get(`/leaves/leaves/${query ? `?${query}` : ''}`);
  },

  getLeaveBalance: async () => {
    return await apiClient.get('/leaves/balance/');
  },

  getLeaveTypes: async () => {
    return await apiClient.get('/leaves/types/');
  },

  submitLeaveRequest: async (leaveData) => {
    return await apiClient.post('/leaves/leaves/', leaveData);
  },

  updateLeaveStatus: async (id, status) => {
    return await apiClient.patch(`/leaves/leaves/${id}/`, { status });
  }
};

export default leaveService;
