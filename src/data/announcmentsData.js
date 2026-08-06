import { AlertTriangle, Bell, Briefcase, Mail } from "lucide-react";

export const stats = [
  {
    title: "Total",
    count: "10",
    icon: Bell,
    bg: "bg-blue-light",
    color: "text-blue",
  },
  {
    title: "Unread",
    count: "4",
    icon: Mail,
    bg: "bg-light-orange",
    color: "text-orange",
  },
  {
    title: "System Alerts",
    count: "2",
    icon: AlertTriangle,
    bg: "bg-red-light",
    color: "text-red",
  },
  {
    title: "Pending Action",
    count: "1",
    icon: Briefcase,
    bg: "bg-light-blue",
    color: "text-blue",
  },
];

export const filters = ["All", "General", "Emergency", "Events", "Policies"];
