import apiClient from './apiClient';

export const performanceService = {
  getGoals: async () => {
    return await apiClient.get('/performance/goals/');
  },

  createGoal: async (data) => {
    return await apiClient.post('/performance/goals/', data);
  },

  getKPIs: async () => {
    return await apiClient.get('/performance/kpis/');
  },

  createKPI: async (data) => {
    return await apiClient.post('/performance/kpis/', data);
  },

  getReviewCycles: async () => {
    return await apiClient.get('/reviews/review-cycles/');
  },

  getReviews: async () => {
    return await apiClient.get('/reviews/reviews/');
  },

  submitSelfAssessment: async (data) => {
    return await apiClient.post('/reviews/self-assessments/', data);
  }
};

export default performanceService;
