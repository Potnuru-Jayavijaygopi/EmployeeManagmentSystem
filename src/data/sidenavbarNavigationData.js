import {
  LayoutGrid,
  Bell,
  CheckSquare,
  Clock,
  CalendarDays,
  MessageSquare,
  Users,
  DollarSign,
  Receipt,
  Activity,
  GraduationCap,
  FileText,
  PieChart,
  ShieldCheck,
} from 'lucide-react';

export const navigation = [
    {
      group: 'MAIN',
      items: [
        { name: 'Overview', icon: LayoutGrid },
        { name: 'Announcements', icon: Bell },
        { name: 'Tasks', icon: CheckSquare }
      ]
    },
    {
      group: 'TIME & ATTENDANCE',
      items: [
        { name: 'Attendance', icon: Clock },
        { name: 'Leave', icon: CalendarDays }
      ]
    },
    {
      group: 'COMMUNICATION',
      items: [
        { name: 'Chat', icon: MessageSquare }
      ]
    },
    {
      group: 'HR & FINANCE',
      items: [
        { name: 'HR Overview', icon: Users },
        { name: 'Payroll', icon: DollarSign },
        { name: 'Expenses', icon: Receipt }
      ]
    },
    {
      group: 'GROWTH',
      items: [
        { name: 'Performance', icon: Activity },
        { name: 'Learning', icon: GraduationCap }
      ]
    },
    {
      group: 'RESOURCES',
      items: [
        { name: 'Documents', icon: FileText },
        { name: 'Analytics', icon: PieChart },
        { name: 'Compliance', icon: ShieldCheck }
      ]
    }
  ];