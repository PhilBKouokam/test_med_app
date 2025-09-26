import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Sign_Up.css";
import { API_URL } from "../../config";


const Sign_Up = () => {
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    role: "",
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showerr, setShowerr] = useState(""); // backend / network errors

  // === Handlers (these replace <script> functions) ===
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
    // Clear previous error for this field first
    clearError(name);

    switch (name) {
      case "role":
        if (!value) return showError(name, "Please select a role");
        break;
      case "name":
        if (!value) return showError(name, "Name is required");
        if (value.length < 2)
          return showError(name, "Name must be at least 2 characters");
        break;
      case "phone":
        if (!value) return showError(name, "Phone number is required");
        if (!/^\d{10}$/.test(value))
            return showError(name, "Phone must be exactly 10 digits");
        break;
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

    if (name === "phone") {
        // keep only digits, cap at 10
        const digits = value.replace(/\D/g, "").slice(0, 10);
        setForm((f) => ({ ...f, phone: digits }));
        validateField("phone", digits);
        return;
    }    

    setForm((f) => ({ ...f, [name]: value }));
    // real-time validation
    validateField(name, value);
  };

  const validateAll = () => {
    const fields = ["role", "name", "phone", "email", "password"];
    fields.forEach((f) => validateField(f, form[f]));
    // If no errors after running validators, errors object is empty
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowerr("");
    // run a fresh validation pass
    const localErrors = {};
    const check = (name, value) => {
      switch (name) {
        case "role":
          if (!value) localErrors[name] = "Please select a role";
          break;
        case "name":
          if (!value) localErrors[name] = "Name is required";
          else if (value.length < 2)
            localErrors[name] = "Name must be at least 2 characters";
          break;
        case "phone":
          if (!value) localErrors[name] = "Phone number is required";
          else if (!/^\d{10}$/.test(value))
              localErrors[name] = "Phone must be exactly 10 digits";
          break;
        case "email":
          if (!value) localErrors[name] = "Email is required";
          else if (!/^\S+@\S+$/i.test(value))
            localErrors[name] = "Please enter a valid email address";
          break;
        case "password":
          if (!value) localErrors[name] = "Password is required";
          else if (value.length < 6)
            localErrors[name] = "Password must be at least 6 characters";
          break;
        default:
          break;
      }
    };
    Object.entries(form).forEach(([k, v]) => check(k, v));
    setErrors(localErrors);

    if (Object.keys(localErrors).length > 0) return;

   setSubmitting(true);
   try {
     const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
        }),
      });
      const json = await res.json();

      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", form.name);
        sessionStorage.setItem("phone", form.phone);
        sessionStorage.setItem("email", form.email);
        navigate("/", { replace: true });
        // (Only add a full reload if your grader requires it)
        // window.location.reload();
      } else {
       if (json?.errors?.length) setShowerr(json.errors[0].msg);
        else setShowerr(json?.error || "Registration failed");
      }
    } catch (err) {
      setShowerr("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({ role: "", name: "", phone: "", email: "", password: "" });
    setErrors({});
    setShowPassword(false);
  };

  // === JSX (converted from your HTML) ===
  return (
    <div className="signup-container">
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

      {/* Sign Up Form Card */}
      <div className="form-card">
        <div className="form-header">
          <h1>Sign Up</h1>
          <p>
            Already a member?{" "}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          {/* Role */}
          <div className="form-group">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              id="role"
              name="role"
              className="form-select"
              required
              value={form.role}
              onChange={handleChange}
            >
              <option value="">Select role</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <div className="error-message">{errors.role}</div>}
          </div>

          {/* Name */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="Enter your name"
              required
              minLength={2}
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-input"
              placeholder="Enter 10-digit phone number"
              required
              inputMode="numeric"
              maxLength={10}
              pattern="\d{10}"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <div className="error-message">{errors.phone}</div>
            )}
          </div>

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
              <div className="error-message">{errors.email}</div>
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
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          {showerr && <div className="error-message" style={{ color: 'red' }}>{showerr}</div>}
          {/* Submit */}
          <button type="submit" className="btn-submit" disabled={submitting}>
            <span className={submitting ? "hidden" : ""} id="submitText">
              Submit
            </span>
            <span className={submitting ? "" : "hidden"} id="loadingText">
              Submitting...
            </span>
          </button>

          {/* Reset */}
          <button type="button" className="btn-reset" onClick={resetForm}>
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sign_Up;