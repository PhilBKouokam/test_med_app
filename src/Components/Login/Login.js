// Components/Login/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  // form state
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // === handlers (replacing <script> functions) ===
  const goBackToHome = () => navigate("/");

  const togglePassword = () => setShowPassword((s) => !s);

  const clearError = (field) =>
    setErrors((e) => {
      const copy = { ...e };
      delete copy[field];
      return copy;
    });

  const showError = (field, message) =>
    setErrors((e) => ({ ...e, [field]: message }));

  const validateField = (name, value) => {
    clearError(name);
    switch (name) {
      case "email":
        if (!value) return showError(name, "Email is required");
        if (!/^\S+@\S+$/i.test(value))
          return showError(name, "Please enter a valid email address");
        break;
      case "password":
        if (!value) return showError(name, "Password is required");
        if (value.length < 6)
          return showError(name, "Password must be at least 6 characters");
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const localErrors = {};
    if (!form.email) localErrors.email = "Email is required";
    else if (!/^\S+@\S+$/i.test(form.email))
      localErrors.email = "Please enter a valid email address";
  
    if (!form.password) localErrors.password = "Password is required";
    else if (form.password.length < 6)
      localErrors.password = "Password must be at least 6 characters";
  
    setErrors(localErrors);
    if (Object.keys(localErrors).length > 0) return;
  
    setSubmitting(true);
    try {
      // Simulate login call
      await new Promise((res) => setTimeout(res, 1000));
  
      // Fake login response
      const fakeToken = "simulated_login_token_" + Date.now();
      const fakeName = "Test User";
  
      // Save session (same keys as Sign_Up)
      sessionStorage.setItem("auth-token", fakeToken);
      sessionStorage.setItem("name", form.name || "User");
      sessionStorage.setItem("email", form.email);
      sessionStorage.setItem("phone", form.phone || "");
      sessionStorage.setItem("role", form.role || "");
  
      alert("Login successful!");
      navigate("/");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({ email: "", password: "" });
    setErrors({});
    setShowPassword(false);
  };

  const forgotPassword = () => {
    alert("Forgot password functionality would be implemented here");
  };

  // === JSX converted from your HTML body ===
  return (
    <div className="login-container">
      {/* Back Button */}
      <button className="back-button" onClick={goBackToHome}>
        <svg
          className="back-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>Back to Home</span>
      </button>

      {/* Login Form Card */}
      <div className="form-card">
        <div className="form-header">
          <h1>Login</h1>
          <p>
            Are you a new member?{" "}
            <Link to="/signup" className="signup-link">
              Sign Up Here
            </Link>
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              required
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="error-message" id="emailError">
                {errors.email}
              </div>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="form-input password-input"
                placeholder="Enter your password"
                required
                minLength={6}
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {/* Eye on */}
                <svg
                  className={`eye-icon ${showPassword ? "hidden" : ""}`}
                  id="eyeIcon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                {/* Eye off */}
                <svg
                  className={`eye-off-icon ${showPassword ? "" : "hidden"}`}
                  id="eyeOffIcon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              </button>
            </div>
            {errors.password && (
              <div className="error-message" id="passwordError">
                {errors.password}
              </div>
            )}
          </div>

          {/* Login */}
          <button type="submit" className="btn-login" disabled={submitting}>
            <span className={submitting ? "hidden" : ""} id="loginText">
              Login
            </span>
            <span className={submitting ? "" : "hidden"} id="loadingText">
              Logging in...
            </span>
          </button>

          {/* Reset */}
          <button type="button" className="btn-reset" onClick={resetForm}>
            Reset
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="forgot-password">
          <button onClick={forgotPassword} className="forgot-password-link">
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;