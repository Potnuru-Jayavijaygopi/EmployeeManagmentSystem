import apiClient from './apiClient';

export const expenseService = {
  getClaims: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return await apiClient.get(`/expenses/claims/${query ? `?${query}` : ''}`);
  },

  getCategories: async () => {
    return await apiClient.get('/expenses/categories/');
  },

  submitClaim: async (data) => {
    return await apiClient.post('/expenses/claims/', data);
  },

  updateClaimStatus: async (id, status) => {
    return await apiClient.patch(`/expenses/claims/${id}/`, { status });
  },

  uploadReceipt: async (formData) => {
    return await apiClient.post('/expenses/receipts/', formData);
  }
};

export default expenseService;
