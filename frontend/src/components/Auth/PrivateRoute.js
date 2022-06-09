import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ children, isAdmin }) {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="auth/login" />;
  }

  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/auth/login" />;
  }

  return children ? children : <Outlet />;
}
