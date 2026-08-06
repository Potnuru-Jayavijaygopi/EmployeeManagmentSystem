export const pendingLeaves = [
  { id: 1, name: 'Ananya Reddy', initials: 'AR', color: 'primary', dept: 'Design', type: 'Annual Leave', from: 'Apr 24', to: 'Apr 25', days: '2d', reason: 'Personal travel', status: 'Pending' },
  { id: 2, name: 'Ravi Kumar', initials: 'RK', color: 'warning', dept: 'Engineering', type: 'Sick Leave', from: 'Apr 22', to: 'Apr 22', days: '1d', reason: 'Fever and cold', status: 'Pending' },
  { id: 3, name: 'Emp Test', initials: 'ET', color: 'danger', dept: 'Engineering', type: 'Casual Leave', from: 'Apr 28', to: 'Apr 28', days: '1d', reason: 'Personal work', status: 'Pending' },
  { id: 4, name: 'Kiran Patel', initials: 'KP', color: 'success', dept: 'HR', type: 'Annual Leave', from: 'May 02', to: 'May 05', days: '4d', reason: 'Family vacation', status: 'Pending' },
  { id: 5, name: 'Meera Nair', initials: 'MN', color: 'purple', dept: 'Engineering', type: 'Casual Leave', from: 'Apr 29', to: 'Apr 29', days: '1d', reason: 'Bank work', status: 'Pending' },
  { id: 6, name: 'Suresh Babu', initials: 'SB', color: 'orange', dept: 'Engineering', type: 'Sick Leave', from: 'Apr 23', to: 'Apr 24', days: '2d', reason: 'Dental appointment', status: 'Pending' }
];

export const allLeaves = [
  ...pendingLeaves,
  { id: 7, name: 'Kiran Patel', initials: 'KP', color: 'success', dept: 'HR', type: 'Sick Leave', from: 'Apr 15', to: 'Apr 16', days: '2d', reason: 'Medical procedure', status: 'Rejected' },
  { id: 8, name: 'Priya Sharma', initials: 'PS', color: 'info', dept: 'Product', type: 'Annual Leave', from: 'Apr 10', to: 'Apr 14', days: '5d', reason: 'Vacation', status: 'Approved' },
  { id: 9, name: 'Srinivas K', initials: 'SK', color: 'blue', dept: 'Engineering', type: 'Casual Leave', from: 'Apr 05', to: 'Apr 05', days: '1d', reason: 'Personal', status: 'Cancelled' },
  { id: 10, name: 'Ravi Kumar', initials: 'RK', color: 'warning', dept: 'Engineering', type: 'Casual Leave', from: 'Mar 28', to: 'Mar 28', days: '1d', reason: 'Personal errand', status: 'Approved' }
];

export const leaveHistory = [
  { id: 1, name: 'Kiran Patel', initials: 'KP', color: 'success', type: 'Sick Leave', dates: 'Apr 15-16', days: '2d', reason: 'Medical procedure', appliedOn: 'Apr 14', status: 'Approved' },
  { id: 2, name: 'Ananya Reddy', initials: 'AR', color: 'primary', type: 'Casual Leave', dates: 'Mar 28', days: '1d', reason: 'Personal errand', appliedOn: 'Mar 27', status: 'Approved' },
  { id: 3, name: 'Ravi Kumar', initials: 'RK', color: 'warning', type: 'Annual Leave', dates: 'Mar 10-12', days: '3d', reason: 'Family visit', appliedOn: 'Mar 5', status: 'Approved' },
  { id: 4, name: 'Emp Test', initials: 'ET', color: 'danger', type: 'Annual Leave', dates: 'Feb 20-21', days: '2d', reason: 'Short trip', appliedOn: 'Feb 18', status: 'Pending' },
  { id: 5, name: 'Suresh Babu', initials: 'SB', color: 'orange', type: 'Sick Leave', dates: 'Feb 14', days: '1d', reason: 'Unwell', appliedOn: 'Feb 14', status: 'Rejected' }
];

export const leaveBalances = {
  annual: { total: 18, used: 4, remaining: 14, percentage: 22 },
  sick: { total: 12, used: 0, remaining: 12, percentage: 0 },
  casual: { total: 6, used: 1, remaining: 5, percentage: 17 },
  paid: { total: 18, used: 6, remaining: 12, percentage: 33 }
};
