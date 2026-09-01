import apiClient from './apiClient';

export const subscriptionService = {
  getPlans: async () => {
    return await apiClient.get('/subscriptions/plans/');
  },

  getCurrentSubscription: async () => {
    return await apiClient.get('/subscriptions/subscription/current/').catch(() => []);
  },

  getHistory: async () => {
    return await apiClient.get('/subscriptions/subscription/current/').catch(() => []);
  }
};

export default subscriptionService;
