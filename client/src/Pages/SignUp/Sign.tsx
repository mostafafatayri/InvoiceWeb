import React, { useState } from "react";
import "./Sign.scss";
import { register } from "../../Services/Auth/authService";
import { useNavigate } from "react-router-dom";

const SignUpForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    profileType: "company",
    displayName: "",
    legalName: "",
    mobile: "",
    phone: "",
    jobPosition: "",
    title: "",
    website: "",
    vatNumber: "",
    street: "",
    street2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    companyLogo: "",
    licenseNumber: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { confirmPassword, ...payload } = formData;
    console.log(confirmPassword)//should emove this for latter:
    const response = await register(payload);
    if (response?.success) {
      alert("Registration successful!");
      navigate("/login");
    } else {
      alert(response?.message || "Something went wrong");
    }
  };

  const renderFields = (fields: string[]) => (
    <>
      {fields.map((field) => (
        <div className="input-group" key={field}>
          <label>{field.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}</label>
          <input
            type={field.toLowerCase().includes("password") ? "password" : "text"}
            name={field}
            value={formData[field as keyof typeof formData]}
            onChange={handleChange}
            required={field === "email" || field === "password" || field === "confirmPassword"}
          />
        </div>
      ))}
    </>
  );

  return (
    <div className="signup-page">
      {/* Left Section */}
      <div className="signup-form-section">
        <div className="signup-box">
          <div className="heading">
            <h2>Sign up</h2>
            <p>
              Already have an account? <a href="/login">Sign in</a>
            </p>
          </div>

          <form onSubmit={step === 4 ? handleSubmit : undefined}>
            {step === 1 && renderFields(["email", "password", "confirmPassword", "firstName", "lastName"])}
            {step === 2 && renderFields(["displayName", "legalName", "mobile", "phone", "jobPosition"])}
            {step === 3 && renderFields(["title", "website", "vatNumber", "street", "street2"])}
            {step === 4 && renderFields(["city", "state", "zip", "country", "companyLogo", "licenseNumber"])}

            <div style={{ marginTop: "1rem" }}>
              {step > 1 && <button type="button" onClick={prevStep}>Back</button>}
              {step < 4 && <button type="button" onClick={nextStep}>Next</button>}
              {step === 4 && <button type="submit">Sign Up</button>}
            </div>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="signup-illustration">
        <div className="overlay">
          <h3>Join Us Today!</h3>
          <p>Create your account and start using our secure dashboard with robust access control.</p>
          <img src="/assets/logo.png" alt="Secure Dashboard Illustration" className="illustration" />
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;


/*import React from "react";
import "./Sign.scss";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  return (
    <div className="signup-page">
     
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

export default SignUp;*/
