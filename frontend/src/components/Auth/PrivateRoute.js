import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ children, adminRoute, isAdmin }) {
  const { isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="auth/login" />;
  }

  // if (adminRoute && !isAdmin) {
  //   return <Navigate to="/profile" />;
  // }

  return children ? children : <Outlet />;
}
