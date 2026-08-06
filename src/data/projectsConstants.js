export const projectsData = [
  {
    id: 'PRJ-009', title: 'API Gateway Redesign', status: 'Active', 
    desc: 'Write API specifications, implement microservice rate-limit policies, and deploy Kubernetes gateways for API traffic security.',
    priority: 'Medium', dept: 'Engineering',
    manager: { name: 'Riya Sharma', initials: 'RS', color: '#f59e0b', email: 'riya@company.com' },
    team: [
      { name: 'Rahul Das', initials: 'RD', color: '#db2777', role: 'Frontend Dev', workload: 'Medium' },
      { name: 'Devraj Singh', initials: 'DS', color: '#8b5cf6', role: 'Kubernetes Specialist', workload: 'High' },
      { name: 'Meera Iyer', initials: 'MI', color: '#4f46e5', role: 'Technical Writer', workload: 'Low' }
    ],
    progress: 60, deadline: '30 Aug 2025', isOverdue: true,
    tasks: [
      { title: 'Write API specification documentation', assignee: 'Riya Sharma', completed: true },
      { title: 'Rate limiting middleware scripting', assignee: 'Rahul Das', completed: true },
      { title: 'Configure ingress routing nodes', assignee: 'Devraj Singh', completed: false },
      { title: 'Generate client integration guides', assignee: 'Meera Iyer', completed: false }
    ]
  },
  {
    id: 'PRJ-006', title: 'Brand Refresh 2025', status: 'Completed', 
    desc: 'Organization-wide brand refresh...',
    priority: 'Medium', dept: 'Marketing',
    manager: { name: 'Priya Mehta', initials: 'PM', color: '#ef4444' },
    team: [
      { name: 'Arun N', initials: 'AN', color: '#10b981' },
      { name: 'Meera I', initials: 'MI', color: '#4f46e5' }
    ],
    progress: 100, deadline: '31 Mar 2025', isOverdue: false
  },
  {
    id: 'PRJ-001', title: 'Customer Portal Redesign', status: 'Active', 
    desc: 'Complete overhaul of the customer-...',
    priority: 'High', dept: 'Engineering',
    manager: { name: 'Riya Sharma', initials: 'RS', color: '#f59e0b' },
    team: [
      { name: 'Rahul D', initials: 'RD', color: '#db2777' },
      { name: 'Arun N', initials: 'AN', color: '#10b981' },
      { name: 'Devraj S', initials: 'DS', color: '#8b5cf6' },
      { name: 'Sneha P', initials: 'SP', color: '#0ea5e9' }
    ],
    progress: 72, deadline: '30 Jun 2025', isOverdue: true
  },
  {
    id: 'PRJ-004', title: 'Data Analytics Platform', status: 'Planning', 
    desc: 'Build an internal data analytics...',
    priority: 'Medium', dept: 'Finance',
    manager: { name: 'Meera Iyer', initials: 'MI', color: '#4f46e5' },
    team: [
      { name: 'Devraj S', initials: 'DS', color: '#8b5cf6' },
      { name: 'Riya S', initials: 'RS', color: '#f59e0b' },
      { name: 'Priya M', initials: 'PM', color: '#ef4444' }
    ],
    progress: 12, deadline: '31 Dec 2025', isOverdue: true
  },
  {
    id: 'PRJ-008', title: 'Employee L&D Platform', status: 'On Hold', 
    desc: 'Build an internal learning platform with...',
    priority: 'Low', dept: 'HR',
    manager: { name: 'Sneha Patel', initials: 'SP', color: '#0ea5e9' },
    team: [
      { name: 'Rahul D', initials: 'RD', color: '#db2777' },
      { name: 'Arun N', initials: 'AN', color: '#10b981' },
      { name: 'Riya S', initials: 'RS', color: '#f59e0b' }
    ],
    progress: 22, deadline: '31 Oct 2025', isOverdue: true
  }
];
