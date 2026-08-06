import { BarChart2, Calendar, Users } from "lucide-react";

export const mainTabs = [
  {
    id: "review_cycles",
    label: "Review Cycles",
    badge: "3",
    icon: <Calendar size={16} />,
  },
  {
    id: "all_reviews",
    label: "All Reviews",
    badge: "24",
    icon: <Calendar size={16} />,
  },
  {
    id: "managers_assessments",
    label: "Manager's Assessments",
    badge: "8",
    icon: <Users size={16} />,
  },
  {
    id: "manager_reviews",
    label: "Manager Reviews",
    badge: "12",
    icon: <Users size={16} />,
  },
  {
    id: "summary_scores",
    label: "Summary & Scores",
    icon: <BarChart2 size={16} />,
  },
];
