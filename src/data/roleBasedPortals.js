import { User, Users, LayoutGrid } from 'lucide-react';

export const portals = [
    {
      id: 'hr',
      title: 'Human Resource Portal',
      shortTitle: 'HR Portal',
      theme: 'green',
      heading: 'Build a workplace employees actually enjoy being part of.',
      desc: 'Manage onboarding, attendance, employee records, compliance, and day-to-day HR operations through a connected workspace designed for growing teams.',
      features: ['LMS & Learning', 'Attendance Tracking', 'Payroll Automation', 'Leave Management'],
      impact: 'Reduce HR operational workload by 40% and streamline employee management from one centralized workspace.',
      icon: User,
      imageUrl: '/hrPortalImg.png'
    },
    {
      id: 'manager',
      title: 'Manager Portal',
      shortTitle: 'Manager Portal',
      theme: 'purple',
      heading: 'Keep every team aligned, productive, and moving forward.',
      desc: 'Monitor team activities, track project progress, manage approvals, and gain visibility into performance without switching between multiple tools.',
      features: ['Team Performance', 'Project & Task Oversight', 'Approval Workflows', 'Team Analytics'],
      impact: 'Increase team productivity by 32% with real-time project and performance visibility.',
      icon: Users,
      imageUrl: '/managerPortal.png'
    },
    {
      id: 'employee',
      title: 'Employee Portal',
      shortTitle: 'Employee Portal',
      theme: 'blue',
      heading: 'Give employees a simpler way to manage work.',
      desc: 'Access attendance, learning, payroll, tasks, announcements, and personal activities from a single employee-focused experience built for everyday productivity.',
      features: ['Attendance Tracking', 'LMS & Learning', 'Payroll Access', 'Tasks & Activities'],
      impact: 'Save 50% more time on daily work operations through a unified employee self-service platform.',
      icon: LayoutGrid,
      imageUrl: '/employeePortalImg.png'
    }
  ];