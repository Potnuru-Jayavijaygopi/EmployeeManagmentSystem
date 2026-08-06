
import { AlertCircle, ArrowRightCircle, Users, Calendar } from 'lucide-react';
export const initialAnnouncements = [
    {
      id: 1,
      type: 'urgent',
      category: 'Emergency',
      title: 'URGENT: Security Update Required',
      description: 'Please update your passwords and enable 2FA by end of day 2',
      content: 'To maintain organizational security standards, all employees are required to update their account passwords and enable Two-Factor Authentication (2FA) before the end of day on October 20, 2025.\n\nThis security update is mandatory for all departments and user roles within the organization.\n\nPlease ensure:\n- Your password follows the latest password policy requirements\n- 2FA is enabled successfully on your account\n- Old or weak passwords are replaced immediately\n\nFailure to complete the required security update before the deadline may temporarily restrict access to company systems and internal resources.\n\nRegards,\nAdmin Team',
      author: 'Admin',
      date: '10 min ago',
      expires: '10/20/2025',
      icon: AlertCircle
    },
    {
      id: 2,
      type: 'info',
      category: 'General',
      title: 'New Project Launch',
      description: 'We are excited to announce the launch of Project Phoenix next month.',
      content: 'Detailed information about Project Phoenix...',
      author: 'Product Team',
      date: '30 min ago',
      isNew: true,
      expires: '11/3/2025',
      icon: ArrowRightCircle
    },
    {
      id: 3,
      type: 'event',
      category: 'Events',
      title: 'Team Building Event',
      description: 'Join us for a team building event this Friday at 4 PM.',
      content: 'Detailed information about the team building event...',
      author: 'HR Dept',
      date: '1 hour ago',
      expires: '10/24/2025',
      icon: Users
    },
    {
      id: 4,
      type: 'holiday',
      category: 'Events',
      title: 'Company Holiday - New Year 2026',
      description: 'Office will be closed on January 1st, 2026 for New Year celebrations.',
      content: 'Detailed information about the holiday...',
      author: 'HR Dept',
      date: '2 hour ago',
      expires: '11/18/2025',
      icon: Calendar
    }
  ];