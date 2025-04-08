import React, { useEffect } from "react";
import { useUserState } from "../Reducers/UserReducer/UserContext";
import { useNavigate } from "react-router-dom";

const RedirectIfAuthenticated: React.FC = () => {
  const { state } = useUserState();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [state.isAuthenticated, navigate]);

  return null;
};

export default RedirectIfAuthenticated;
