import React from 'react';
import { CheckSquare, Check, Clock, AlertCircle } from 'lucide-react';

export const tasksStats = [
  { title: 'ACTIVE TASKS', mainValue: '12', subtitle: 'Assigned this sprint', icon: <CheckSquare size={18} />, colorTheme: 'primary' },
  { title: 'COMPLETED', mainValue: '5', subtitle: '41% completion rate', icon: <Check size={18} />, colorTheme: 'success' },
  { title: 'IN PROGRESS', mainValue: '5', subtitle: 'Due this week', icon: <Clock size={18} />, colorTheme: 'warning' },
  { title: 'OVERDUE', mainValue: '2', subtitle: 'Needs immediate action', icon: <AlertCircle size={18} />, colorTheme: 'danger' },
];

export const taskFilters = ['All', 'Overdue', 'In Progress', 'Done'];
