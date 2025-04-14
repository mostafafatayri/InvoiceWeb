/**import React from "react";
import { Navigate } from "react-router-dom";
import { useUserState } from "../Reducers/UserReducer/UserContext";

interface ProtectedRoutePropss {
  children: React.ReactNode;
}

const ProtectedRouteSuperAdmin: React.FC<ProtectedRoutePropss> = ({ children }) => {
  const { state: user } = useUserState();

  if (!user || !user.role || user.role[0] !== "superadmin") {
    alert("You don't have the right privileges to access this page 😢");
    return <Navigate to="/dashboard" replace />;
  }
  

  return <>{children}</>;
};

export default ProtectedRouteSuperAdmin;**/



 import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUserState } from "../Reducers/UserReducer/UserContext";
import { toast } from "react-toastify";

interface ProtectedRoutePropss {
  children: React.ReactNode;
}

const ProtectedRouteSuperAdmin: React.FC<ProtectedRoutePropss> = ({ children }) => {
  const { state: user } = useUserState();

  useEffect(() => {
    if (!user || !user.role || user.role[0] !== "superadmin") {
      toast.error("You don't have the right privileges to access this page.");
    }
  }, [user]);

  if (!user || !user.role || user.role[0] !== "superadmin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRouteSuperAdmin;

 