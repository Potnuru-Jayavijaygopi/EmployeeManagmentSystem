import { Baby, Briefcase, Heart, Thermometer, User } from "lucide-react";

export const leaveTypes = [
  {
    id: "casual",
    name: "Casual Leave",
    remaining: 5,
    icon: <Heart size={16} />,
    color: "warning",
  },
  {
    id: "sick",
    name: "Sick Leave",
    remaining: 4,
    icon: <Thermometer size={16} />,
    color: "danger",
  },
  {
    id: "paid",
    name: "Paid Leave",
    remaining: 15,
    icon: <Briefcase size={16} />,
    color: "blue",
  },
  {
    id: "maternity",
    name: "Maternity Leave",
    remaining: 84,
    icon: <Baby size={16} />,
    color: "pink",
    badge: "For Women only",
  },
  {
    id: "paternity",
    name: "Paternity Leave",
    remaining: 15,
    icon: <User size={16} />,
    color: "purple",
    badge: "For Men only",
  },
];

export const historyData = [
  {
    dateRange: "Oct 24 - Oct 26",
    days: "3 Days",
    type: "Casual",
    typeColor: "warning",
    reason: "Family gathering in native town",
    applied: "Oct 12, 2023",
    status: "Approved",
  },
  {
    dateRange: "Nov 02 - Nov 02",
    days: "1 Day",
    type: "Sick",
    typeColor: "danger",
    reason: "Viral fever and body ache",
    applied: "Nov 01, 2023",
    status: "Pending",
  },
  {
    dateRange: "Dec 20 - Dec 28",
    days: "9 Days",
    type: "Paid",
    typeColor: "blue",
    reason: "Winter vacation / Annual leave",
    applied: "Sep 15, 2023",
    status: "Approved",
  },
  {
    dateRange: "Aug 14 - Aug 14",
    days: "1 Day",
    type: "Casual",
    typeColor: "warning",
    reason: "Personal errands and bank work",
    applied: "Aug 10, 2023",
    status: "Rejected",
  },
  {
    dateRange: "Jan 15 - Jan 18",
    days: "4 Days",
    type: "Paid",
    typeColor: "blue",
    reason: "New year trip abroad",
    applied: "Dec 01, 2023",
    status: "Approved",
  },
];
