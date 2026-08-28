import apiClient from './apiClient';

export const documentService = {
  getDocuments: async () => {
    return await apiClient.get('/documents/documents/');
  },

  getCategories: async () => {
    return await apiClient.get('/documents/categories/');
  },

  uploadDocument: async (formData) => {
    return await apiClient.post('/documents/documents/', formData);
  },

  shareDocument: async (data) => {
    return await apiClient.post('/documents/shares/', data);
  }
};

export default documentService;
