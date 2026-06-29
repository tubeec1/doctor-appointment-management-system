import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsAuthenticated, selectUser } from "../features/auth/authSlice";

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  if (!isAuthenticated) {
    return children;
  }

  switch (user?.role) {
    case "Administrator":
      return <Navigate to="/dashboard/admin" replace />;

    case "Doctor":
      return <Navigate to="/dashboard/doctor" replace />;

    case "Patient":
      return <Navigate to="/dashboard/patient" replace />;

    default:
      return <Navigate to="/" replace />;
  }
};

export default PublicRoute;
