import apiClient from './apiClient';

export const payrollService = {
  getPayslips: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return await apiClient.get(`/payroll/payslips/${query ? `?${query}` : ''}`);
  },

  getPayslipById: async (id) => {
    return await apiClient.get(`/payroll/payslips/${id}/`);
  },

  getSalaryStructures: async () => {
    return await apiClient.get('/payroll/salary-structures/');
  },

  getPayrollRuns: async () => {
    return await apiClient.get('/payroll/payroll-runs/');
  },

  createPayrollRun: async (data) => {
    return await apiClient.post('/payroll/payroll-runs/', data);
  },

  getDeductions: async () => {
    return await apiClient.get('/payroll/deductions/');
  }
};

export default payrollService;
