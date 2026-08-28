import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import PortalLayout from "./components/layout/PortalLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Announcements from "./pages/Announcements";
import Tasks from "./pages/Tasks";
import Attendance from "./pages/Attendance";
import AdminAttendance from "./pages/Attendance/AdminAttendance";
import Leave from "./pages/Leave";
import AdminLeave from "./pages/Leave/AdminLeave";
import Chat from "./pages/Chat";
import AdminChat from "./pages/Chat/AdminChat";
import HROverview from "./pages/HROverview";
import Payroll from "./pages/Payroll";
import AdminPayroll from "./pages/Payroll/AdminPayroll";
import Expenses from "./pages/Expenses";
import AdminExpenses from "./pages/Expenses/AdminExpenses";
import Performance from "./pages/Performance";
import Learning from "./pages/Learning";
import Documents from "./pages/Documents";
import Analytics from "./pages/Analytics";
import Compliance from "./pages/Compliance";
import Projects from "./pages/Projects";
import EmployeeDirectory from "./pages/EmployeeDirectory";
import Plans from "./pages/Plans";
import Logs from "./pages/Logs";
import Security from "./pages/Security";
import Teams from "./pages/Teams";
import AdminTeams from "./pages/AdminTeams";
import Contact from "./pages/Contact/Contact";
import PricingPlans from "./components/PricingPlans";
import FreeTrial from "./pages/FreeTrial/FreeTrial";
import LandingPage from "./pages/LandingPage/LandingPage";
import HrLandingPage from "./pages/HRLanding/HrLandingPage";
import ManagerPortalLandingPage from "./pages/ManagerPortalLandingPage/ManagerPortalLandingPage";
import PageTitleUpdater from "./components/PageTitleUpdater/PageTitleUpdater";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <PageTitleUpdater />
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/pricing" element={<PricingPlans />} />
        <Route path="/" element={<FreeTrial />} />
        <Route path="/lms" element={<LandingPage />} />
        <Route path="/hr-landing-page" element={<HrLandingPage />} />
        <Route path="/manager-portal-landing-page" element={<ManagerPortalLandingPage />} />
        <Route path="/admin" element={<PortalLayout role="admin" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard role="admin" />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="leave" element={<AdminLeave />} />
          <Route path="chat" element={<AdminChat />} />
          <Route path="hr-overview" element={<HROverview />} />
          <Route path="payroll" element={<AdminPayroll />} />
          <Route path="expenses" element={<AdminExpenses />} />
          <Route path="performance" element={<Performance />} />
          <Route path="learning" element={<Learning />} />
          <Route path="documents" element={<Documents />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="compliance" element={<Compliance />} />
          <Route path="projects" element={<Projects />} />
          <Route path="plans" element={<Plans />} />
          <Route path="logs" element={<Logs />} />
          <Route path="security" element={<Security />} />
          <Route path="teams" element={<AdminTeams />} />
          <Route path="employees" element={<EmployeeDirectory />} />
        </Route>

        <Route path="/hr" element={<PortalLayout role="hr" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard role="hr" />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="leave" element={<AdminLeave />} />
          <Route path="chat" element={<AdminChat />} />
          <Route path="payroll" element={<AdminPayroll />} />
          <Route path="expenses" element={<AdminExpenses />} />
          <Route path="performance" element={<Performance />} />
          <Route path="documents" element={<Documents />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="compliance" element={<Compliance />} />
          <Route path="projects" element={<Projects />} />
          <Route path="plans" element={<Plans />} />
          <Route path="logs" element={<Logs />} />
          <Route path="security" element={<Security />} />
          <Route path="teams" element={<AdminTeams />} />
          <Route path="employees" element={<EmployeeDirectory />} />
        </Route>

        <Route path="/manager" element={<PortalLayout role="manager" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard role="manager" />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="leave" element={<AdminLeave />} />
          <Route path="chat" element={<AdminChat />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="expenses" element={<AdminExpenses />} />
          <Route path="performance" element={<Performance />} />
          <Route path="learning" element={<Learning />} />
          <Route path="documents" element={<Documents />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="compliance" element={<Compliance />} />
          <Route path="projects" element={<Projects />} />
          <Route path="teams" element={<Teams role="manager" />} />
          <Route path="employees" element={<EmployeeDirectory />} />
          <Route path="plans" element={<Plans />} />
        </Route>

        <Route path="/employee" element={<PortalLayout role="employee" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard role="employee" />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leave" element={<Leave />} />
          <Route path="chat" element={<Chat />} />
          <Route path="hr-overview" element={<HROverview />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="performance" element={<Performance />} />
          <Route path="learning" element={<Learning />} />
          <Route path="documents" element={<Documents />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="compliance" element={<Compliance />} />
          <Route path="projects" element={<Projects />} />
          <Route path="teams" element={<Teams role="employee" />} />
          <Route path="plans" element={<Plans />} />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
