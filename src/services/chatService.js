import apiClient from './apiClient';

export const chatService = {
  getRooms: async () => {
    return await apiClient.get('/chat/rooms/');
  },

  getMessages: async (roomId) => {
    return await apiClient.get(`/chat/messages/?room=${roomId}`);
  },

  sendMessage: async (data) => {
    return await apiClient.post('/chat/messages/', data);
  },

  getChannels: async () => {
    return await apiClient.get('/chat/channels/');
  },

  getOnlineUsers: async () => {
    return await apiClient.get('/chat/online-status/');
  }
};

export default chatService;
