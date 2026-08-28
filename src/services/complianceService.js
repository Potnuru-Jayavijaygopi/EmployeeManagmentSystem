import apiClient from './apiClient';

export const complianceService = {
  getPolicies: async () => {
    return await apiClient.get('/compliance/policies/');
  },

  getCategories: async () => {
    return await apiClient.get('/compliance/categories/');
  },

  getAcknowledgments: async () => {
    return await apiClient.get('/compliance/acknowledgments/');
  },

  acknowledgePolicy: async (policyId) => {
    return await apiClient.post('/compliance/acknowledgments/', { policy: policyId });
  }
};

export default complianceService;
