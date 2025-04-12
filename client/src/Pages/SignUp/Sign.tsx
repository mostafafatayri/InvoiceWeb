import React, { useState, useEffect } from "react";
import "./Sign.scss";
import { register } from "../../Services/Auth/authService";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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

  const [showFields, setShowFields] = useState<{ [key: string]: boolean }>({});
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const navigate = useNavigate();

  const requiredFields = Object.keys(formData).filter(
    (key) =>
      !["companyLogo", "zip", "state", "street2", "website", "phone"].includes(key)
  );

  const placeholders: { [key: string]: string } = {
    email: "Enter your email address",
    password: "Enter your password",
    confirmPassword: "Please confirm your password",
    firstName: "Enter your first name",
    lastName: "Enter your last name",
    displayName: "Choose a display name",
    legalName: "Enter your legal company name",
    mobile: "Enter your mobile number",
    phone: "Enter your phone number (optional)",
    jobPosition: "Enter your job title",
    title: "Title (e.g. Mr., Mrs.)",
    website: "Company website (optional)",
    vatNumber: "Enter your VAT number",
    street: "Street address",
    street2: "Additional address info (optional)",
    city: "Enter your city",
    state: "State/Province (optional)",
    zip: "ZIP/Postal Code (optional)",
    country: "Enter your country",
    companyLogo: "Logo URL (optional)",
    licenseNumber: "Enter your business license number",
  };

  useEffect(() => {
    const initialVisibility: { [key: string]: boolean } = {};
    Object.keys(formData).forEach((field) => {
      if (field.toLowerCase().includes("password")) {
        initialVisibility[field] = false;
      }
    });
    setShowFields(initialVisibility);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false })); // clear error on change
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const validateForm = () => {
    const newErrors: { [key: string]: boolean } = {};
    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = true;
      }
    });

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = true;
    }

    setErrors(newErrors);
    const errorKeys = Object.keys(newErrors);
    if (errorKeys.length > 0) {
      const firstInvalid = document.querySelector<HTMLInputElement>(`[name="${errorKeys[0]}"]`);
      firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { confirmPassword, ...payload } = formData;
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
      {fields.map((field) => {
        if (field === "profileType") {
          return (
            <div className="input-group" key={field}>
              <label>Profile Type</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="profileType"
                    value="company"
                    checked={formData.profileType === "company"}
                    onChange={handleChange}
                  />
                  <span>Company</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="profileType"
                    value="individual"
                    checked={formData.profileType === "individual"}
                    onChange={handleChange}
                  />
                  <span>Individual</span>
                </label>
              </div>
            </div>
          );
        }

        return (
          <div className={`input-group ${errors[field] ? "error" : ""}`} key={field}>
            <label>
              {field.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}
            </label>
            <div className="password-input-wrapper">
              <input
                type={
                  field.toLowerCase().includes("password") && showFields[field]
                    ? "text"
                    : field.toLowerCase().includes("password")
                    ? "password"
                    : "text"
                }
                name={field}
                value={formData[field as keyof typeof formData]}
                placeholder={placeholders[field] || `Enter your ${field}`}
                onChange={handleChange}
              />
              {field.toLowerCase().includes("password") && (
                <span
                  onClick={() =>
                    setShowFields((prev) => ({
                      ...prev,
                      [field]: !prev[field],
                    }))
                  }
                >
                  {showFields[field] ? <FaEyeSlash /> : <FaEye />}
                </span>
              )}
            </div>
            {errors[field] && (
              <span className="error-message">This field is required</span>
            )}
          </div>
        );
      })}
    </>
  );

  return (
    <div className="signup-page">
      <div className="signup-form-section">
        <div className="signup-box">
          <div className="heading">
            <h2>Sign up</h2>
            <p>
              Already have an account? <a href="/login">Sign in</a>
            </p>
          </div>

          <form onSubmit={step === 4 ? handleSubmit : undefined}>
            {step === 1 &&
              renderFields([
                "email",
                "password",
                "confirmPassword",
                "firstName",
                "lastName",
                "profileType",
              ])}
            {step === 2 &&
              renderFields([
                "displayName",
                "legalName",
                "mobile",
                "phone",
                "jobPosition",
              ])}
            {step === 3 &&
              renderFields([
                "title",
                "website",
                "vatNumber",
                "street",
                "street2",
              ])}
            {step === 4 &&
              renderFields([
                "city",
                "state",
                "zip",
                "country",
                "companyLogo",
                "licenseNumber",
              ])}

            <div style={{ marginTop: "1rem" }}>
              {step > 1 && (
                <button type="button" onClick={prevStep}>
                  Back
                </button>
              )}
              {step < 4 && (
                <button type="button" onClick={nextStep}>
                  Next
                </button>
              )}
              {step === 4 && <button type="submit">Sign Up</button>}
            </div>
          </form>
        </div>
      </div>

      <div className="signup-illustration">
        <div className="overlay">
          <h3>Join Us Today!</h3>
          <p>
            Create your account and start using our secure dashboard with
            robust access control.
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

export default SignUpForm;



/**import React, { useState, useEffect } from "react";
import "./Sign.scss";
import { register } from "../../Services/Auth/authService";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUpForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    profileType: "company", // 👈 radio field
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

  const [showFields, setShowFields] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();

  const placeholders: Record<string, string> = {
    email: "Enter your email address",
    password: "Create a password",
    confirmPassword: "Re-enter your password",
    firstName: "Enter your first name",
    lastName: "Enter your last name",
    displayName: "What name should be displayed?",
    legalName: "Your official legal name",
    mobile: "Enter your mobile number",
    phone: "Optional phone number",
    jobPosition: "Your job title or role",
    title: "Mr., Ms., Dr., etc.",
    website: "Your company/personal website",
    vatNumber: "VAT or Tax Number",
    street: "Street name",
    street2: "Apartment, Suite, etc. (optional)",
    city: "City of residence",
    state: "State or province",
    zip: "Zip or postal code",
    country: "Country of residence",
    companyLogo: "Company logo URL",
    licenseNumber: "Business license number",
  };

  useEffect(() => {
    const initialVisibility: { [key: string]: boolean } = {};
    Object.keys(formData).forEach((field) => {
      if (field.toLowerCase().includes("password")) {
        initialVisibility[field] = false;
      }
    });
    setShowFields(initialVisibility);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { confirmPassword, ...payload } = formData;
   
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
      {fields.map((field) => {
        if (field === "profileType") {
          return (
            <div className="input-group" key={field}>
  <label>Profile Type</label>
  <div className="radio-group">
    <label>
      <input
        type="radio"
        name="profileType"
        value="company"
        checked={formData.profileType === "company"}
        onChange={handleChange}
      />
      <span>Company</span>
    </label>
    <label>
      <input
        type="radio"
        name="profileType"
        value="individual"
        checked={formData.profileType === "individual"}
        onChange={handleChange}
      />
      <span>Individual</span>
    </label>
  </div>
</div>

          );
        }

        return (
          <div className="input-group" key={field}>
            <label>
              {field.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}
            </label>
            <div className="password-input-wrapper">
              <input
                type={
                  field.toLowerCase().includes("password") && showFields[field]
                    ? "text"
                    : field.toLowerCase().includes("password")
                    ? "password"
                    : "text"
                }
                name={field}
                value={formData[field as keyof typeof formData]}
                placeholder={placeholders[field] || `Enter your ${field}`}
                onChange={handleChange}
                required={["email", "password", "confirmPassword"].includes(field)}
              />
              {field.toLowerCase().includes("password") && (
                <span
                  onClick={() =>
                    setShowFields((prev) => ({
                      ...prev,
                      [field]: !prev[field],
                    }))
                  }
                >
                  {showFields[field] ? <FaEyeSlash /> : <FaEye />}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </>
  );

  return (
    <div className="signup-page">
      <div className="signup-form-section">
        <div className="signup-box">
          <div className="heading">
            <h2>Sign up</h2>
            <p>
              Already have an account? <a href="/login">Sign in</a>
            </p>
          </div>

          <form onSubmit={step === 4 ? handleSubmit : undefined}>
            {step === 1 &&
              renderFields([
                "email",
                "password",
                "confirmPassword",
                "firstName",
                "lastName",
                "profileType", // 👈 shown on step 1
              ])}
            {step === 2 &&
              renderFields(["displayName", "legalName", "mobile", "phone", "jobPosition"])}
            {step === 3 &&
              renderFields(["title", "website", "vatNumber", "street", "street2"])}
            {step === 4 &&
              renderFields(["city", "state", "zip", "country", "companyLogo", "licenseNumber"])}

            <div style={{ marginTop: "1rem" }}>
              {step > 1 && <button type="button" onClick={prevStep}>Back</button>}
              {step < 4 && <button type="button" onClick={nextStep}>Next</button>}
              {step === 4 && <button type="submit">Sign Up</button>}
            </div>
          </form>
        </div>
      </div>

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

export default SignUpForm;**/

