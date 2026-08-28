import apiClient from './apiClient';

export const lmsService = {
  getCourses: async () => {
    return await apiClient.get('/lms/courses/');
  },

  getCourseDetails: async (id) => {
    return await apiClient.get(`/lms/courses/${id}/`);
  },

  getEnrollments: async () => {
    return await apiClient.get('/lms/enrollments/');
  },

  enrollCourse: async (courseId) => {
    return await apiClient.post('/lms/enrollments/', { course: courseId });
  },

  getQuizzes: async () => {
    return await apiClient.get('/lms/quizzes/');
  },

  getCertificates: async () => {
    return await apiClient.get('/lms/certificates/');
  }
};

export default lmsService;
