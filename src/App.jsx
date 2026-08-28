import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import PortalLayout from "./components/layout/PortalLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Plans from "./pages/Plans";
import Logs from "./pages/Logs";
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

const Placeholder = ({ name }) => (
  <div style={{ padding: "2rem", textTransform: "capitalize", textAlign: "center", color: "#6b7280" }}>
    <h2>{name} Module</h2>
    <p>This module is assigned to another team branch.</p>
  </div>
);

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
          <Route index element={<Navigate to="teams" replace />} />
          <Route path="dashboard" element={<Placeholder name="Dashboard" />} />
          <Route path="announcements" element={<Placeholder name="Announcements" />} />
          <Route path="tasks" element={<Placeholder name="Tasks" />} />
          <Route path="attendance" element={<Placeholder name="Attendance" />} />
          <Route path="leave" element={<Placeholder name="Leave" />} />
          <Route path="chat" element={<Placeholder name="Chat" />} />
          <Route path="hr-overview" element={<Placeholder name="HR Overview" />} />
          <Route path="payroll" element={<Placeholder name="Payroll" />} />
          <Route path="expenses" element={<Placeholder name="Expenses" />} />
          <Route path="performance" element={<Placeholder name="Performance" />} />
          <Route path="learning" element={<Placeholder name="Learning" />} />
          <Route path="documents" element={<Placeholder name="Documents" />} />
          <Route path="analytics" element={<Placeholder name="Analytics" />} />
          <Route path="compliance" element={<Placeholder name="Compliance" />} />
          <Route path="projects" element={<Placeholder name="Projects" />} />
          <Route path="plans" element={<Plans />} />
          <Route path="logs" element={<Logs />} />
          <Route path="security" element={<Placeholder name="Security" />} />
          <Route path="teams" element={<AdminTeams />} />
          <Route path="employees" element={<Placeholder name="Employees" />} />
        </Route>

        <Route path="/hr" element={<PortalLayout role="hr" />}>
          <Route index element={<Navigate to="teams" replace />} />
          <Route path="dashboard" element={<Placeholder name="Dashboard" />} />
          <Route path="announcements" element={<Placeholder name="Announcements" />} />
          <Route path="attendance" element={<Placeholder name="Attendance" />} />
          <Route path="leave" element={<Placeholder name="Leave" />} />
          <Route path="chat" element={<Placeholder name="Chat" />} />
          <Route path="payroll" element={<Placeholder name="Payroll" />} />
          <Route path="expenses" element={<Placeholder name="Expenses" />} />
          <Route path="performance" element={<Placeholder name="Performance" />} />
          <Route path="documents" element={<Placeholder name="Documents" />} />
          <Route path="analytics" element={<Placeholder name="Analytics" />} />
          <Route path="compliance" element={<Placeholder name="Compliance" />} />
          <Route path="projects" element={<Placeholder name="Projects" />} />
          <Route path="plans" element={<Plans />} />
          <Route path="logs" element={<Logs />} />
          <Route path="security" element={<Placeholder name="Security" />} />
          <Route path="teams" element={<AdminTeams />} />
          <Route path="employees" element={<Placeholder name="Employees" />} />
        </Route>

        <Route path="/manager" element={<PortalLayout role="manager" />}>
          <Route index element={<Navigate to="teams" replace />} />
          <Route path="dashboard" element={<Placeholder name="Dashboard" />} />
          <Route path="announcements" element={<Placeholder name="Announcements" />} />
          <Route path="tasks" element={<Placeholder name="Tasks" />} />
          <Route path="attendance" element={<Placeholder name="Attendance" />} />
          <Route path="leave" element={<Placeholder name="Leave" />} />
          <Route path="chat" element={<Placeholder name="Chat" />} />
          <Route path="payroll" element={<Placeholder name="Payroll" />} />
          <Route path="expenses" element={<Placeholder name="Expenses" />} />
          <Route path="performance" element={<Placeholder name="Performance" />} />
          <Route path="learning" element={<Placeholder name="Learning" />} />
          <Route path="documents" element={<Placeholder name="Documents" />} />
          <Route path="analytics" element={<Placeholder name="Analytics" />} />
          <Route path="compliance" element={<Placeholder name="Compliance" />} />
          <Route path="projects" element={<Placeholder name="Projects" />} />
          <Route path="teams" element={<Teams role="manager" />} />
          <Route path="employees" element={<Placeholder name="Employees" />} />
          <Route path="plans" element={<Plans />} />
        </Route>

        <Route path="/employee" element={<PortalLayout role="employee" />}>
          <Route index element={<Navigate to="teams" replace />} />
          <Route path="dashboard" element={<Placeholder name="Dashboard" />} />
          <Route path="announcements" element={<Placeholder name="Announcements" />} />
          <Route path="tasks" element={<Placeholder name="Tasks" />} />
          <Route path="attendance" element={<Placeholder name="Attendance" />} />
          <Route path="leave" element={<Placeholder name="Leave" />} />
          <Route path="chat" element={<Placeholder name="Chat" />} />
          <Route path="hr-overview" element={<Placeholder name="HR Overview" />} />
          <Route path="payroll" element={<Placeholder name="Payroll" />} />
          <Route path="expenses" element={<Placeholder name="Expenses" />} />
          <Route path="performance" element={<Placeholder name="Performance" />} />
          <Route path="learning" element={<Placeholder name="Learning" />} />
          <Route path="documents" element={<Placeholder name="Documents" />} />
          <Route path="analytics" element={<Placeholder name="Analytics" />} />
          <Route path="compliance" element={<Placeholder name="Compliance" />} />
          <Route path="projects" element={<Placeholder name="Projects" />} />
          <Route path="teams" element={<Teams role="employee" />} />
          <Route path="plans" element={<Plans />} />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
