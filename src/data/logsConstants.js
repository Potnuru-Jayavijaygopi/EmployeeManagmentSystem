export const activityLogsData = [
  { time: 'Feb 28, 2026 11:58 AM', user: 'admin@example.com', action: 'READ', method: 'GET', endpoint: '/api/auth/users/', status: 200, res: '45ms', model: 'Auth', ip: '127.0.0.1' },
  { time: 'Feb 28, 2026 11:58 AM', user: 'admin@example.com', action: 'READ', method: 'GET', endpoint: '/api/auth/users/', status: 200, res: '24ms', model: 'Auth', ip: '127.0.0.1' },
  { time: 'Feb 28, 2026 11:58 AM', user: 'admin@example.com', action: 'CREATE', method: 'POST', endpoint: '/api/compliance/policies/3/...', status: 403, res: '18ms', model: 'Compliance', ip: '127.0.0.1' },
  { time: 'Feb 28, 2026 11:58 AM', user: 'admin@example.com', action: 'READ', method: 'GET', endpoint: '/api/compliance/policies/3/', status: 200, res: '43ms', model: 'Compliance', ip: '127.0.0.1' },
  { time: 'Feb 28, 2026 11:58 AM', user: 'admin@example.com', action: 'READ', method: 'GET', endpoint: '/api/compliance/policies/', status: 200, res: '77ms', model: 'Compliance', ip: '127.0.0.1' },
  { time: 'Feb 28, 2026 11:58 AM', user: 'admin@example.com', action: 'CREATE', method: 'POST', endpoint: '/api/compliance/policies/7/...', status: 200, res: '115ms', model: 'Compliance', ip: '127.0.0.1' },
  { time: 'Feb 28, 2026 11:58 AM', user: 'admin@example.com', action: 'READ', method: 'GET', endpoint: '/api/compliance/policies/8/', status: 200, res: '37ms', model: 'Compliance', ip: '127.0.0.1' },
  { time: 'Feb 28, 2026 11:58 AM', user: 'hr@example.com', action: 'LOGIN_SUCCESS', method: 'POST', endpoint: '/api/auth/login/', status: 200, res: '62ms', model: 'Auth', ip: '127.0.0.1' },
  { time: 'Feb 27, 2026 12:16 PM', user: 'Unknown', action: 'LOGIN_FAILED', method: 'GET', endpoint: '/api/auth/profile/', status: 401, res: '12ms', model: 'Auth', ip: '127.0.0.1' },
  { time: 'Feb 25, 2026 02:37 PM', user: 'admin@example.com', action: 'READ', method: 'GET', endpoint: '/api/attendance/wfh-request...', status: 404, res: '8ms', model: 'Attendance', ip: '127.0.0.1' },
];

export const auditTrailData = [
  { time: 'Feb 28, 2026 11:58 AM', user: 'admin@example.com', action: 'UPDATE', model: 'Policy', objId: '#7', changes: 'status: draft → published' },
  { time: 'Feb 28, 2026 11:55 AM', user: 'hr@example.com', action: 'CREATE', model: 'Employee', objId: '#15', changes: 'new record created' },
  { time: 'Feb 28, 2026 11:50 AM', user: 'admin@example.com', action: 'UPDATE', model: 'Payroll', objId: '#4', changes: 'gross: ₹45,000 → ₹50,000' },
  { time: 'Feb 28, 2026 11:45 AM', user: 'manager@example.com', action: 'UPDATE', model: 'Task', objId: '#9', changes: 'status: pending → in_progress' },
  { time: 'Feb 27, 2026 3:30 PM', user: 'hr@example.com', action: 'DELETE', model: 'Leave', objId: '#12', changes: 'record deleted' },
  { time: 'Feb 27, 2026 2:15 PM', user: 'admin@example.com', action: 'UPDATE', model: 'Compliance', objId: '#3', changes: 'due_date: 2026-04-01 → 2026-04-30' },
  { time: 'Feb 26, 2026 10:10 AM', user: 'admin@example.com', action: 'CREATE', model: 'Deduction', objId: '#5', changes: 'new deduction: TDS ₹4,500' },
  { time: 'Feb 25, 2026 9:00 AM', user: 'hr@example.com', action: 'UPDATE', model: 'Employee', objId: '#11', changes: 'department: QA → Engineering' },
  { time: 'Feb 24, 2026 5:20 PM', user: 'admin@example.com', action: 'UPDATE', model: 'Policy', objId: '#2', changes: 'title updated' },
  { time: 'Feb 23, 2026 12:00 PM', user: 'manager@example.com', action: 'CREATE', model: 'Task', objId: '#24', changes: 'new task assigned to EMP003' },
];

export const userSessionsData = [
  { user: 'Admin', email: 'admin@example.com', login: 'Feb 28, 2026 11:47 AM', logout: '—', duration: '0h 12m', status: 'Active', device: 'Chrome on Windows', ip: '127.0.0.1' },
  { user: 'Admin', email: 'admin@example.com', login: 'Feb 28, 2026 11:47 AM', logout: '—', duration: '0h 12m', status: 'Active', device: 'Chrome on Windows', ip: '127.0.0.1' },
  { user: 'HR User', email: 'hr@example.com', login: 'Feb 28, 2026 11:38 AM', logout: '—', duration: '0h 21m', status: 'Active', device: 'Chrome on Windows', ip: '127.0.0.1' },
  { user: 'HR User', email: 'hr@example.com', login: 'Feb 28, 2026 11:38 AM', logout: '—', duration: '0h 21m', status: 'Active', device: 'Chrome on Windows', ip: '127.0.0.1' },
  { user: 'Manager', email: 'manager@example.com', login: 'Feb 28, 2026 11:34 AM', logout: '—', duration: '0h 24m', status: 'Active', device: 'Chrome on Windows', ip: '127.0.0.1' },
  { user: 'Manager', email: 'manager@example.com', login: 'Feb 28, 2026 11:34 AM', logout: '—', duration: '0h 24m', status: 'Active', device: 'Chrome on Windows', ip: '127.0.0.1' },
  { user: 'Admin', email: 'admin@example.com', login: 'Feb 28, 2026 11:34 AM', logout: 'Feb 28, 2026 11:59 AM', duration: '0h 25m', status: 'Ended', device: 'Chrome on Windows', ip: '127.0.0.1' },
];

export const recentErrorsData = [
  { time: 'Feb 27, 2026 12:16 PM', user: 'Unknown', endpoint: '/api/auth/profile/', status: 401, error: 'Given token not valid for any token type' },
  { time: 'Feb 27, 2026 12:16 PM', user: 'Unknown', endpoint: '/api/auth/profile/', status: 401, error: 'Given token not valid for any token type' },
  { time: 'Feb 25, 2026 02:37 PM', user: 'admin@example.com', endpoint: '/api/attendance/wfh-requests/my-reques...', status: 404, error: 'Not found.' },
  { time: 'Feb 25, 2026 02:37 PM', user: 'admin@example.com', endpoint: '/api/attendance/regularizations/my-req...', status: 404, error: 'Not found.' },
  { time: 'Feb 24, 2026 02:33 PM', user: 'Unknown', endpoint: '/api/auth/profile/', status: 401, error: 'Given token not valid for any token type' },
  { time: 'Feb 23, 2026 12:50 PM', user: 'pego King', endpoint: '/api/hr/employees/my_profile/', status: 404, error: 'You do not have an employee profile yet.' },
  { time: 'Feb 23, 2026 12:41 PM', user: 'pego King', endpoint: '/api/users/me/', status: 404, error: 'N/A' },
  { time: 'Feb 23, 2026 12:41 PM', user: 'pego King', endpoint: '/api/auth/users/me/', status: 404, error: 'N/A' },
];
