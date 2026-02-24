import React from "react";
import { useAuth } from "../auth/hooks/useAuth";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

function Dashboard() {
  const { currentUser, isLoading } = useAuth();
  const userRoles = currentUser?.roles || [];
  if (isLoading) {
    return <div>Loading Dashboard...</div>;
  }
  const hasRole = (roleToCheck) => {
    return userRoles.includes(roleToCheck);
  };

  if (hasRole("admin")) return <AdminDashboard />;

  if (hasRole("user")) return <UserDashboard />;

  return <div>You don't have a valid role to view a dashboard.</div>;
}

export default Dashboard;
