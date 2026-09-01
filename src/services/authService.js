import apiClient, { setTokens, clearTokens } from './apiClient';

export const authService = {
  login: async (credentials) => {
    const data = await apiClient.post('/auth/login/', credentials);
    const accessToken = data.tokens?.access || data.access || data.token;
    const refreshToken = data.tokens?.refresh || data.refresh;
    if (accessToken) {
      setTokens(accessToken, refreshToken);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    }
    return data;
  },

  register: async (userData) => {
    return await apiClient.post('/auth/register/', userData);
  },

  getProfile: async () => {
    return await apiClient.get('/auth/profile/');
  },

  changePassword: async (passwordData) => {
    return await apiClient.post('/auth/change-password/', passwordData);
  },

  enable2FA: async (data) => {
    return await apiClient.post('/auth/2fa/toggle/', data);
  },

  getSessions: async () => {
    return await apiClient.get('/auth/sessions/');
  },

  logoutSession: async (sessionId) => {
    return await apiClient.post(`/auth/sessions/${sessionId}/logout/`);
  },

  logout: () => {
    clearTokens();
  }
};

export default authService;
