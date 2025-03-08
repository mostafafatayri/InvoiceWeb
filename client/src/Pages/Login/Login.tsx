import React from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
const Login: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p>Login to your account</p>
        
        <form>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="register-link">
          Don't have an account? <Link to="/SignUp">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
