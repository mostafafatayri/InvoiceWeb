import React from "react";
import { Navigate } from "react-router-dom";
import { useUserState } from "../Reducers/UserReducer/UserContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { state: user } = useUserState();

  if (!user.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
