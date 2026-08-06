import { ActivityIcon, BarChart2, Calendar, CheckSquare, Clock, CreditCard, FileText, GraduationCap, LayoutGrid, MessageSquare, Shield, Target, User, UserPlus, Users } from "lucide-react"

export const featuresData = [
    {
      title: "Employee Lifecycle Management",
      desc: "Handle onboarding, employee records, department allocation, and workforce structure through a centralized HR system.",
      icon: Users,
      list: [
        "Employee onboarding workflows",
        "Role & department mapping",
        "Employee records management",
        "Organizational hierarchy",
        "Offboarding workflows"
      ],
      metricLabel: "Manager Adoption rate",
      metricValue: "94%",
      imageUrl: "/employeeDirectory.png"
    },
    {
      title: "Attendance & Leave Operations",
      desc: "Track employee attendance, manage leave approvals, and monitor workforce availability in real time across every department.",
      icon: FileText,
      list: [
        "Attendance monitoring & reports",
        "Leave approval workflows",
        "Workforce availability matrix",
        "Real-time attendance insights"
      ],
      metricLabel: "One-time delivery rate",
      metricValue: "89%",
      imageUrl: "/AttendanceAndLeaveOperations.png"
    },
    {
      title: "Compliance & Policy Tracking",
      desc: "Track policy acknowledgments, compliance completion, and workforce adherence through a structured compliance management system.",
      icon: Shield,
      list: [
        "Policy acknowledgment tracking",
        "Compliance monitoring dashboard",
        "Compliance status reports",
        "Due-date reminders & alerts"
      ],
      metricLabel: "Avg. Processing time",
      metricValue: "-40%",
      imageUrl: "./complianceTracking.png"
    },
    {
      title: "Workforce Engagement & Communication",
      desc: "Deliver announcements, updates, and workforce communications through one connected employee engagement system.",
      icon: MessageSquare,
      list: [
        "HR announcements & broadcasts",
        "Internal communication tools",
        "Event notifications & calendar",
        "Employee engagement updates",
        "Org-wide notification center"
      ],
      metricLabel: "Data accuracy",
      metricValue: "99.8%",
      imageUrl: "./workforceEnagment.png"
    }
  ]

  export const employeeFeatureData = [
    {
      title: "Attendance Tracking",
      desc: "Monitor daily attendance, work activity, WFH & Regularization requests, and employee availability through a centralized dashboard with real-time tracking, historical records, and workforce visibility.",
      icon: Calendar,
      list: [
        "Daily attendance logs & Calendar View",
        "WFH & Regularisation Request",
        "Work-hour Tracking & Overtime",
        "Remote Check-in Visibility",
        "Attendance History & Trends"
      ],
      metricLabel: "Adoption rate",
      metricValue: "96%",
      imageUrl: "https://placehold.co/700x500/FFFFFF/3B82F6?text=Attendance+Tracking"
    },
    {
      title: "Leave Management",
      desc: "Apply, track, and manage leave requests with real-time approval visibility, leave balance insights, request history, and seamless communication between employees and managers.",
      icon: FileText,
      list: [
        "One-click leave request submission",
        "Real-time approval tracking",
        "Leave balance overview by type",
        "Full request history & audit trail"
      ],
      metricLabel: "Processing Speed",
      metricValue: "50% Faster",
      imageUrl: "https://placehold.co/700x500/FFFFFF/3B82F6?text=Leave+Management"
    },
    {
      title: "LMS & Learning",
      desc: "Access courses, certifications, quizzes, and personalized learning paths from a connected learning workspace, with real-time progress tracking, skill development insights, and structured training completion visibility.",
      icon: GraduationCap,
      list: [
        "Course enrollment & catalog",
        "Quiz & assessment engine",
        "Certification tracking & badges",
        "Learning analytics dashboard",
        "Assignment progress & deadlines"
      ],
      metricLabel: "Learning Engagement",
      metricValue: "+40%",
      imageUrl: "https://placehold.co/700x500/FFFFFF/3B82F6?text=LMS+Dashboard"
    },
    {
      title: "Payroll Access",
      desc: "Access salary details, payslips, reimbursement records, and complete payroll history through a secure and transparent payroll management system designed for employees.",
      icon: CreditCard,
      list: [
        "Payslip access & download",
        "Monthly salary breakdown",
        "Payroll history & statements",
        "Tax and deduction visibility",
        "Reimbursement requests & tracking"
      ],
      metricLabel: "Employer Satisfaction",
      metricValue: "100%",
      imageUrl: "https://placehold.co/700x500/FFFFFF/3B82F6?text=Payroll+Dashboard"
    }
  ]

  export const managerFeaturesData = [
    {
      title: "Team Performance Tracking",
      desc: "Track employee productivity, performance trends, attendance patterns, and workload distribution through a centralized team management system.",
      icon: Target,
      list: [
        "Team productivity monitoring",
        "Attendance visibility across team",
        "Workload distribution insights",
        "Employee performance scoring",
        "Team activity tracking"
      ],
      metricLabel: "Manager Adoption rate",
      metricValue: "94%",
      imageUrl: "./allEmployeesCoreFeatures.png"
    },
    {
      title: "Project & Task Oversight",
      desc: "Track project progress, oversee assigned tasks, and ensure teams stay aligned with operational goals.",
      icon: CheckSquare,
      list: [
        "Project progress tracking",
        "Task assignment visibility",
        "Deadline monitoring & alerts",
        "Team workload balancing"
      ],
      metricLabel: "One-time delivery rate",
      metricValue: "89%",
      imageUrl: "./projectAndTaskjOverSight.png"
    },
    {
      title: "Approval Workflows",
      desc: "Manage leave approvals, requests, operational reviews, and workflow decisions through a centralized approval system.",
      icon: CheckSquare,
      list: [
        "Request management queue",
        "Task review approvals",
        "Operational request handling",
        "Approval history tracking"
      ],
      metricLabel: "Avg. Processing time",
      metricValue: "-40%",
      imageUrl: "./approvalWorkflows.png"
    },
    {
      title: "Team Analytics & Productivity",
      desc: "Analyze workforce trends, productivity metrics, project efficiency, and team performance through real-time operational analytics.",
      icon: BarChart2,
      list: [
        "Team analytics dashboards",
        "Productivity insights & scoring",
        "Workforce reporting",
        "Performance trend analysis",
        "Operational KPI tracking"
      ],
      metricLabel: "Data accuracy",
      metricValue: "99.8%",
      imageUrl: "./teamAnalytics.png"
    }
  ]

  export const hrFeaturesData =[
    { id: '01', title: 'HR Creates Profile', desc: 'New hire record added, role & department assigned', icon: UserPlus },
    { id: '02', title: 'Onboarding Begins', desc: 'Checklist activated, documents collected, access granted', icon: CheckSquare },
    { id: '03', title: 'Attendance Managed', desc: 'Daily tracking, leave approvals & shift scheduling', icon: Calendar },
    { id: '04', title: 'Policies Assigned', desc: 'Compliance policies assigned, acknowledgments tracked', icon: Shield },
    { id: '05', title: 'Workforce Insights', desc: 'Real-time analytics, engagement & HR reporting', icon: ActivityIcon }
  ]

  export const employeeOperationalFlowData = [
    { id: '01', title: 'Employee logs in', desc: 'Secure SSO access to personalised dashboard', icon: User },
    { id: '02', title: 'Tracks attendance', desc: 'Clock in, view shift schedule and daily log', icon: Calendar },
    { id: '03', title: 'Accesses LMS', desc: 'Takes courses, quizzes and certifications', icon: GraduationCap },
    { id: '04', title: 'Completes tasks', desc: 'Tracks daily activities, deadlines and reviews', icon: CheckSquare },
    { id: '05', title: 'Payroll updates', desc: 'Views payslips, reimbursements and salary history', icon: CreditCard }
  ]

  export const managerOperationalFlowData = [
    { id: '01', title: 'Reviews team dashboard', desc: 'Checks attendance, productivity scores, and alerts at a glance', icon: LayoutGrid },
    { id: '02', title: 'Tracks attendance & productivity', desc: 'Monitors who\'s present, performance trends, and workload balance', icon: Users },
    { id: '03', title: 'Oversees project progress', desc: 'Reviews tasks on Kanban, checks deadlines, reassigns if needed', icon: Calendar },
    { id: '04', title: 'Handles approvals & requests', desc: 'Reviews leave, WFH, and operational requests from the queue', icon: CheckSquare },
    { id: '05', title: 'Reviews operational analytics', desc: 'Analyzes KPIs, productivity trends, and efficiency reports', icon: BarChart2 }
  ]

  export const hrProvenImpact = [
    { color: "green", icon: ActivityIcon, value: "40%", title: "Faster HR Operations", desc: "HR processes that took hours now complete in minutes with automated workflows and centralized controls.", trend: "vs manual process" },
    { color: "blue", icon: UserPlus, value: "3x", title: "Faster Employee Onboarding", desc: "Structured onboarding checklists and automated document collection cut new hire setup time dramatically.", trend: "vs legacy onboarding" },
    { color: "orange", icon: GraduationCap, value: "60%", title: "Reduced Manual Workflows", desc: "Eliminate repetitive HR admin tasks with automated leave approvals, policy tracking, and employee record updates.", trend: "process automation" },
    { color: "red", icon: Clock, value: "Real-time", title: "Workforce Visibility", desc: "Live attendance, compliance status, and workforce analytics instantly visible to HR teams across the organization.", trend: "zero-delay reporting" }
  ]

  export const employeePortalImpact = [
    { color: "blue", icon: ActivityIcon, value: "50%", title: "Faster leave processing", desc: "Approvals that used to take days now complete in hours with automated workflows.", trend: "vs manual process" },
    { color: "green", icon: Users, value: "3x", title: "Better employee accessibility", desc: "Every tool, record, and update available in one login — no more portal switching.", trend: "adoption vs legacy" },
    { color: "orange", icon: GraduationCap, value: "40%", title: "Improved learning engagement", desc: "Integrated LMS with progress tracking drives course completion rates significantly higher.", trend: "course completion" },
    { color: "red", icon: Clock, value: "Real-time", title: "Workforce visibility", desc: "Live attendance, task progress, and payroll status — instantly visible across the organisation.", trend: "0 delay reporting" }
  ]

  export const managerPortalImpact = [
    { color: "purple", icon: ActivityIcon, value: "32%", title: "Higher Team Productivity", desc: "Real-time visibility into team workloads enables faster rebalancing and performance coaching.", trend: "vs manual oversight" },
    { color: "green", icon: CheckSquare, value: "60%", title: "Faster Approval Workflows", desc: "Centralized approval queue eliminates back-and-forth and reduces response times drastically.", trend: "vs email approvals" },
    { color: "blue", icon: LayoutGrid, value: "Real-time", title: "Project Visibility", desc: "Live project progress, task status, and deadline tracking across all active workstreams.", trend: "0 delay reporting" },
    { color: "orange", icon: Users, value: "2x", title: "Improved Workforce Coordination", desc: "Unified team data enables smarter delegation, reducing coordination overhead significantly.", trend: "team alignment" }
  ]

  export const employeePortalCheckList = [
    "Faster daily operations across all departments",
    "Centralized employee access — one login, all tools",
    "Real-time task and payroll visibility",
  ]