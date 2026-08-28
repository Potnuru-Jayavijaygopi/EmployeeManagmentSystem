import apiClient from './apiClient';

export const employeeService = {
  getEmployees: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return await apiClient.get(`/hr/employees/${query ? `?${query}` : ''}`);
  },

  getEmployeeById: async (id) => {
    return await apiClient.get(`/hr/employees/${id}/`);
  },

  createEmployee: async (data) => {
    return await apiClient.post('/hr/employees/', data);
  },

  updateEmployee: async (id, data) => {
    return await apiClient.patch(`/hr/employees/${id}/`, data);
  },

  getTeams: async () => {
    return await apiClient.get('/teams/');
  },

  getTeamMembers: async (teamId) => {
    return await apiClient.get(`/team-members/${teamId ? `?team=${teamId}` : ''}`);
  },

  getOnboardingChecklist: async () => {
    return await apiClient.get('/hr/onboarding/');
  }
};

export default employeeService;
