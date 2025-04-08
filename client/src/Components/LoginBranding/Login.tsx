import React from "react";
import "./Login.scss";
 
const LoginBranding: React.FC = () => {
  return (
    <div className="login-illustration">
      <div className="overlay">
        <h3>Secure Access Portal</h3>
        <p>
          A robust authentication gateway ensuring secure efficient user access
          to the dashboard interface.
        </p>
        <img
          src="/assets/logo.png"
          alt="Secure Dashboard Illustration"
          className="illustration"
        />
      </div>
    </div>
  );
};

export default LoginBranding;
