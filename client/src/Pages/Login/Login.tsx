import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import LoginBranding from "../../Components/LoginBranding/Login";
import { login } from "../../Services/Auth/authService";
import { useUserState } from "../../Reducers/UserReducer/UserContext";
import RedirectIfAuthenticated from "../../Utils/RedirectIfAuthenticated";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👈 Eye icons

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state
  const [errorMessage, setErrorMessage] = useState("");
  const { dispatch } = useUserState();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await login(email, password);

    if (response.success && response.data) {
      dispatch({ type: "LOGIN", payload: response.data });
      localStorage.setItem("accessToken", response.data.token);
      navigate("/dashboard");
    } else {
      setErrorMessage(response.message || "Login failed");
    }
  };

  return (
    <>
      <RedirectIfAuthenticated />

      <div className="login-page">
        <div className="login-form-section">
          <div className="login-box">
            <div className="heading">
              <h2>Sign in</h2>
              <p>
                Need an account? <Link to="/SignUp">Sign up</Link>
              </p>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group password-field">
                <label>Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <div className="remember-forgot">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <Link to="/forgot-password" className="forgot">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit">Sign In</button>
            </form>
          </div>
        </div>

        <LoginBranding />
      </div>
    </>
  );
};

export default Login;


// src/Pages/Login/Login.tsx
/*import React, { useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import LoginBranding from "../../Components/LoginBranding/Login";
import { login } from "../../Services/Auth/authService";
import { useUserState } from "../../Reducers/UserReducer/UserContext";
import { useNavigate } from "react-router-dom"; 
import RedirectIfAuthenticated from "../../Utils/RedirectIfAuthenticated";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { dispatch } = useUserState(); // Use the context to get dispatch
  const navigate = useNavigate(); 
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await login(email, password);
  
    if (response.success && response.data) {
      console.log("Login successful:", response.data);
  
      // Dispatch the user data to the reducer
      dispatch({ type: "LOGIN", payload: response.data });
      navigate("/dashboard");
      // Save the token in localStorage for persistence
     // alert(response.data.token);
      localStorage.setItem("accessToken", response.data.token);
      console.log("User data dispatched successfully.");
    } else {
      setErrorMessage(response.message || "Login failed");
    }
  };
  

  return (
    <>
      <RedirectIfAuthenticated /> 
      
      <div className="login-page">
        <div className="login-form-section">
          <div className="login-box">
            <div className="heading">
              <h2>Sign in</h2>
              <p>
                Need an account? <Link to="/SignUp">Sign up</Link>
              </p>
            </div>
  
            {errorMessage && <p className="error-message">{errorMessage}</p>}
  
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
  
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
  
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <Link to="/forgot-password" className="forgot">
                  Forgot Password?
                </Link>
              </div>
  
              <button type="submit">Sign In</button>
            </form>
          </div>
        </div>
  
        <LoginBranding />
      </div>
    </>
  );
  
};

export default Login;*/
 
