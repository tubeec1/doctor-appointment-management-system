import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsAuthenticated, selectUser } from "../features/auth/authSlice";

const ProtectedRoute = ({ children, roles }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user?.role)) {
    switch (user?.role) {
      case "Administrator":
        return <Navigate to="/dashboard/admin" replace />;

      case "Doctor":
        return <Navigate to="/dashboard/doctor" replace />;

      case "Patient":
        return <Navigate to="/" />;

      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
