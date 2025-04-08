import React from "react";
import { Link } from "react-router-dom";
import "./CheckEmail.scss";
import LoginBranding from "../../../Components/LoginBranding/Login";

const CheckEmail: React.FC = () => {
  return (
    <div className="check-email-page">
      <div className="check-email-section">
        <div className="check-email-box">
          <img 
            src="/assets/1.png" 
            alt="Email Sent" 
            className="illustration"
          />
          <h3>Check your email</h3>
          <p>
            Please click the link sent to your email <br />
            <strong>demo@keenthemes.com</strong> <br />
            to reset your password. Thank you.
          </p>
          <button type="button">Skip for now</button>
          <p className="resend">
            Didn't receive an email? <Link to="/resend">Resend</Link>
          </p>
        </div>
      </div>

      {/* Right: Logo + Info + Illustration */}
      <LoginBranding />
    </div>
  );
};

export default CheckEmail;
