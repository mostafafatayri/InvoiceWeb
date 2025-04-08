import React from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.scss";
import LoginBranding from "../../../Components/LoginBranding/Login";

const ForgotPassword: React.FC = () => {
  return (
    <div className="forgot-password-page">
      {/* Left: Forgot Password Form */}
      <div className="forgot-password-form-section">
        <div className="forgot-password-box">
          <div className="heading">
            <h2>Your Email</h2>
            <p>Enter your email to reset password</p>
          </div>

          <form>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="email@email.com" required />
            </div>

            <button type="submit">Continue</button>
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

export default ForgotPassword;
