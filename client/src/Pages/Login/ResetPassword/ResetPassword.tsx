import React from "react";
import { Link } from "react-router-dom";
import "./ResetPassword.scss";
import LoginBranding from "../../../Components/LoginBranding/Login";

const ResetPassword: React.FC = () => {
  return (
    <div className="reset-password-page">
      {/* Left: Reset Password Form */}
      <div className="reset-password-form-section">
        <div className="reset-password-box">
          <div className="heading">
            <h2>Reset Your Password</h2>
            <p>Enter your new password below.</p>
          </div>

          <form>
            <div className="input-group">
              <label>New Password</label>
              <input type="password" placeholder="Enter your new password" required />
            </div>

            <div className="input-group">
              <label>Confirm New Password</label>
              <input type="password" placeholder="Confirm your new password" required />
            </div>

            <button type="submit" className="update-btn">Update Password</button>
          </form>

          <div className="back-link">
            <Link to="/login">← Back to Login</Link>
          </div>
        </div>
      </div>

      {/* Right: Logo + Info + Illustration */}
      <LoginBranding />
    </div>
  );
};

export default ResetPassword;
