import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/home" replace />; // Redirect logged-in users
  }

  return <Outlet />; // Allow access to login page
};

export default PublicRoute;
