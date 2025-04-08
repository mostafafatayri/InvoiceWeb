import React from "react";
import "./Sign.scss";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  return (
    <div className="signup-page">
      {/* Left: Sign Up Form */}
      <div className="signup-form-section">
        <div className="signup-box">
          <div className="heading">
            <h2>Sign up</h2>
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>

          <form>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" required />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm your password" required />
            </div>

            <div className="terms">
              <label>
                <input type="checkbox" required /> I accept the{" "}
                <Link to="/terms">terms and conditions</Link>
              </label>
            </div>

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>

      {/* Right: Logo + Info + Illustration */}
      <div className="signup-illustration">
        <div className="overlay">
          <h3>Join Us Today!</h3>
          <p>
            Create your account and start using our secure dashboard with robust access control.
          </p>
          <img
            src="/assets/logo.png"
            alt="Secure Dashboard Illustration"
            className="illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
