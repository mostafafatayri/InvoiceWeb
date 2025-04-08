import React from "react";
import { Link } from "react-router-dom";
import "./PasswordIsChanged.scss";
import LoginBranding from "../../../Components/LoginBranding/Login";

const PasswordChanged: React.FC = () => {
  return (
    <div className="password-changed-page">
      {/* Left: Success Message */}
      <div className="password-changed-form-section">
        <div className="password-changed-box">
          <div className="icon-container">
            <img
              src="/assets/32.png"
              alt="Password Changed"
              className="success-icon"
            />
          </div>
          <div className="heading">
            <h2>Your password is changed</h2>
            <p>Your password has been successfully updated. <br /> Your account's security is our priority.</p>
          </div>
          <button className="sign-in-btn">
            <Link to="/login">Sign in</Link>
          </button>
        </div>
      </div>

      {/* Right: Logo + Info + Illustration */}
      <LoginBranding />
    </div>
  );
};

export default PasswordChanged;
