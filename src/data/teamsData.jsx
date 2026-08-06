import React from "react";


export const teamsData = [
  {
    id: 1,
    initials: "FE",
    color: "blue",
    role: "Team Lead",
    title: "Frontend Engineering",
    department: "Engineering",
    lead: "Kiran Das",
    members: 12,
    joined: "Mar 2023",
    description:
      "Responsible for building and maintaining the core product frontend. Works closely with Design and Backend teams.",
    isLead: true,
    metrics: [
      { label: "MEMBERS", value: "12" },
      { label: "ACTIVE", value: "10" },
      { label: "LEADS", value: "1" },
      { label: "INTERNS", value: "2" },
    ],
    memberList: [
      {
        id: 1,
        name: "Kiran Das",
        initials: "KD",
        role: "Engineering Manager",
        email: "kiran.d@company.com",
        status: "Lead",
        department: "Engineering",
        bg: "bg-green-light",
        text: "text-green",
        badgeBg: "bg-blue-light",
        badgeText: "text-blue",
      },
      {
        id: 2,
        name: "Neha Reddy",
        initials: "NR",
        role: "Sr. Developer",
        email: "neha.r@company.com",
        status: "Active",
        department: "Engineering",
        bg: "bg-blue-light",
        text: "text-blue",
        badgeBg: "bg-green-light",
        badgeText: "text-green",
      },
      {
        id: 3,
        name: "Ravi Kumar",
        initials: "RK",
        role: "Developer",
        email: "ravi.k@company.com",
        status: "Active",
        department: "Engineering",
        bg: "bg-red-light",
        text: "text-red",
        badgeBg: "bg-green-light",
        badgeText: "text-green",
      },
      {
        id: 4,
        name: "Dev Patel",
        initials: "DP",
        role: "Developer",
        email: "dev.p@company.com",
        status: "Active",
        department: "Engineering",
        bg: "bg-yellow-light",
        text: "text-yellow",
        badgeBg: "bg-green-light",
        badgeText: "text-green",
      },
      {
        id: 5,
        name: "Priya Sharma",
        initials: "PS",
        role: "UI Engineer",
        email: "priya.s@company.com",
        status: "Active",
        department: "Design",
        bg: "bg-purple-light",
        text: "text-purple",
        badgeBg: "bg-green-light",
        badgeText: "text-green",
      },
      {
        id: 6,
        name: "Anil Mehta",
        initials: "AM",
        role: "Intern",
        email: "anil.m@company.com",
        status: "Intern",
        department: "Engineering",
        bg: "bg-orange-light",
        text: "text-orange",
        badgeBg: "bg-yellow-light",
        badgeText: "text-yellow",
      },
    ],
    activities: [
      {
        id: 1,
        initials: "KD",
        text: (
          <>
            <span className="font-bold text-dark">Kiran Das</span> was assigned
            as Team Lead
          </>
        ),
        time: "2 hours ago",
      },
      {
        id: 2,
        initials: "NR",
        text: (
          <>
            <span className="font-bold text-dark">Neha Reddy</span> was added to
            the team
          </>
        ),
        time: "1 day ago",
      },
      {
        id: 3,
        initials: "CT",
        text: (
          <>
            Team completed{" "}
            <span className="font-bold text-dark">Cybersecurity Training</span>
          </>
        ),
        time: "2 weeks ago",
      },
    ],
  },
  {
    id: 2,
    initials: "PD",
    color: "yellow",
    role: "Member",
    title: "Product Design Review",
    department: "Design",
    lead: "Priya Sharma",
    members: 5,
    joined: "Jun 2023",
    description:
      "Oversees product design architecture and conducts weekly design reviews across cross-functional squads.",
    isLead: false,
    metrics: [
      { label: "MEMBERS", value: "5" },
      { label: "ACTIVE", value: "5" },
      { label: "LEADS", value: "1" },
      { label: "INTERNS", value: "0" },
    ],
    memberList: [],
    activities: [],
  },
];
