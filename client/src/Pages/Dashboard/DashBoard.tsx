import React from "react";
import { useUserState } from "../../Reducers/UserReducer/UserContext";
import { Navigate } from "react-router-dom"; // ✅ Import Navigate
import AdminDashboard from "../../Components/Dashboards/AdminDashboard";
import CustomerDashboard from "../../Components/Dashboards/CustomerDashboard";
import AccountantDashboard from "../../Components/Dashboards/AccountantDashboard";
import './Dashboard.scss'
const DashboardDirector: React.FC = () => {
  const { state: user } = useUserState();

  // ✅ Redirect to login if not authenticated
  if (!user.isAuthenticated) return <Navigate to="/login" replace />;

  console.log("the stated :"+user.isAuthenticated);
  console.log(user);
  //alert(user.role)
  switch (user.role[0]) {
    case "superadmin":
      return <AdminDashboard />;
    case "accountant":
      return <AccountantDashboard />;
    case "user":
      return <CustomerDashboard />;
   
  }
};

export default DashboardDirector;
