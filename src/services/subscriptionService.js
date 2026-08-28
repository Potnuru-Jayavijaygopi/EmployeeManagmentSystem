import apiClient from './apiClient';

export const subscriptionService = {
  getPlans: async () => {
    return await apiClient.get('/subscriptions/plans/');
  },

  getCurrentSubscription: async () => {
    return await apiClient.get('/subscriptions/subscription/');
  }
};

export default subscriptionService;
