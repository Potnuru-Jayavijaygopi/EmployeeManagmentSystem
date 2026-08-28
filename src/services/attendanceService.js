import apiClient from './apiClient';

export const attendanceService = {
  getAttendanceRecords: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return await apiClient.get(`/attendance/attendance/${query ? `?${query}` : ''}`);
  },

  clockIn: async (location = {}) => {
    return await apiClient.post('/attendance/attendance/clock_in/', location);
  },

  clockOut: async (location = {}) => {
    return await apiClient.post('/attendance/attendance/clock_out/', location);
  },

  getShifts: async () => {
    return await apiClient.get('/attendance/shifts/');
  },

  getWFHRequests: async () => {
    return await apiClient.get('/attendance/wfh-requests/');
  },

  submitWFHRequest: async (data) => {
    return await apiClient.post('/attendance/wfh-requests/', data);
  },

  getRegularizations: async () => {
    return await apiClient.get('/attendance/regularizations/');
  },

  submitRegularization: async (data) => {
    return await apiClient.post('/attendance/regularizations/', data);
  }
};

export default attendanceService;
