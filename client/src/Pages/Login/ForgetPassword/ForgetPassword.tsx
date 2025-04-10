import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";
import "./ForgotPassword.scss";
import LoginBranding from "../../../Components/LoginBranding/Login";
import { forgotPass } from "../../../Services/Auth/authService";









const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await forgotPass(email);
    if (response.success) {
      setMessage(response.message);
      setError("");
      navigate("/login");
    } else {
      setError(response.message);
      setMessage("");
    }
  };

  return (
    <div className="forgot-password-page">
      {/* Left: Forgot Password Form */}
      <div className="forgot-password-form-section">
        <div className="forgot-password-box">
          <div className="heading">
            <h2>Your Email</h2>
            <p>Enter your email to reset password</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="email@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit">Continue</button>
          </form>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

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
