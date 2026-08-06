import { 
  Clock, ListTodo, Calendar, Bell, 
  AlertCircle, Users, ArrowRightCircle, UserCheck, ClipboardList
} from 'lucide-react';

export const metrics = [
    { value: 'Active', title: "Today's Status", subtitle: 'Checked in at 9:00 AM', icon: Clock, statusColor: 'green' },
    { value: '5', title: 'Pending Tasks', subtitle: '2 due today', icon: ListTodo, statusColor: 'blue' },
    { value: '12', title: 'Leave Balance', subtitle: 'Days remaining', icon: Calendar, statusColor: 'blue' },
    { value: '3', title: 'Notifications', subtitle: 'New updates', icon: Bell, statusColor: 'blue' },
  ];

  export const adminMetrics = [
    { value: '50', title: 'Active Workforce', subtitle: 'Employees active today', icon: UserCheck, valueColor: 'green-dark' },
    { value: '15', title: 'Workforce Overview', subtitle: 'Total employees in the organization', icon: Users, valueColor: 'dark-main' },
    { value: '15', title: 'Pending Projects', subtitle: '8 active, 7 Completed', icon: ClipboardList, valueColor: 'dark-main' },
    { value: '3', title: 'System Activity', subtitle: 'Recent updates and usage', icon: Bell, valueColor: 'dark-main' },
  ];

  export const announcements = [
    {
      id: 1,
      type: 'urgent',
      title: 'URGENT: Security Update Required',
      description: 'Please update your passwords and enable 2FA by end of day 2',
      author: 'Admin',
      expires: '10/20/2025',
      icon: AlertCircle,
      timeAgo: '10 min ago',
      isRead: false
    },
    {
      id: 3,
      type: 'info',
      title: 'New Project Launch',
      description: 'We are excited to announce the launch of Project Phoenix next month.',
      author: 'Product Team',
      expires: '11/3/2025',
      icon: ArrowRightCircle,
      timeAgo: '30 min ago',
      isRead: false
    },
    {
      id: 2,
      type: 'event',
      title: 'Team Building Event',
      description: 'Join us for a team building event this Friday at 4 PM.',
      author: 'HR Dept',
      expires: '10/24/2025',
      icon: Users,
      timeAgo: '1 hour ago',
      isRead: true
    },
    {
      id: 4,
      type: 'holiday',
      title: 'Company Holiday - New Year 2026',
      description: 'Office will be closed on January 1st, 2026 for New Year celebrations.',
      author: 'HR Dept',
      expires: '11/18/2025',
      icon: Calendar,
      timeAgo: '2 hour ago',
      isRead: true
    }
  ];

