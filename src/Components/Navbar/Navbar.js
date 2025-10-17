import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ProfileCard from "../ProfileCard/ProfileCard";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // still for mobile menu
  const [profileOpen, setProfileOpen] = useState(false); // new: for profile dropdown
  const [isAuthed, setIsAuthed] = useState(!!sessionStorage.getItem("auth-token"));
  const [name, setName] = useState(sessionStorage.getItem("name") || "");
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsAuthed(false);
    setName("");
    setProfileOpen(false);
    navigate("/");
  };

  // ✅ Run on mount + every route change (including reloads)
  useEffect(() => {
    const authed = !!sessionStorage.getItem("auth-token");
    const storedName = sessionStorage.getItem("name") || "";
    setIsAuthed(authed);
    setName(storedName);
  }, [location]); // triggers on any route navigation

  // ✅ Extra: Sync on focus (e.g., after login from another tab)
  useEffect(() => {
    const syncOnFocus = () => {
      const authed = !!sessionStorage.getItem("auth-token");
      const storedName = sessionStorage.getItem("name") || "";
      setIsAuthed(authed);
      setName(storedName);
    };
    window.addEventListener("focus", syncOnFocus);
    return () => window.removeEventListener("focus", syncOnFocus);
  }, []);

  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (!e.target.closest(".profile-wrapper")) setProfileOpen(false);
    };
    document.addEventListener("click", closeOnOutsideClick);
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, []);

  return (
    <div>
      <header className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="logo" onClick={closeMenu}>
            <span className="brand-name">StayHealthy</span>
            <div className="logo-icon">
              <div className="logo-dot"></div>
            </div>
          </Link>

          {/* Menu */}
          <nav className="nav-menu">
            <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
            <Link to="/appointments" className="nav-link" onClick={closeMenu}>Appointments</Link>
            <Link to="/instant-consultation" className="nav-link" onClick={closeMenu}>Instant Booking</Link>
            <Link to="/blog" className="nav-link" onClick={closeMenu}>Health Blog</Link>
            <Link to="/reviews" className="nav-link" onClick={closeMenu}>Reviews</Link>
          </nav>

          {/* Auth Buttons */}
          <div className="auth-buttons">
            {!isAuthed ? (
              <>
                <Link to="/signup" className="btn btn-signup" onClick={closeMenu}>
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-login" onClick={closeMenu}>
                  Login
                </Link>
              </>
            ) : (
              <>
                {isAuthed && (
                    <div className="profile-wrapper">
                        <div className="profile-header">
                        <span
                            className="welcome-name"
                            onClick={() => setProfileOpen((prev) => !prev)}
                            style={{ cursor: "pointer" }}
                        >
                            Welcome, {name} ⌄
                        </span>
                        <button className="btn btn-logout" onClick={handleLogout}>
                            Logout
                        </button>
                        </div>

                        {profileOpen && (
                            <div className="profile-dropdown-absolute">
                                {!sessionStorage.getItem("showProfile") ? (
                                <div className="profile-menu">
                                    <div
                                    className="profile-menu-item"
                                    onClick={() => {
                                        sessionStorage.setItem("showProfile", "true");
                                        window.dispatchEvent(new Event("profileToggle"));
                                    }}
                                    >
                                    Your Profile
                                    </div>
                                </div>
                                ) : (
                                <ProfileCard
                                    user={{
                                    name: sessionStorage.getItem("name"),
                                    email: sessionStorage.getItem("email"),
                                    phone: sessionStorage.getItem("phone"),
                                    }}
                                    onClose={() => {
                                    sessionStorage.removeItem("showProfile");
                                    window.dispatchEvent(new Event("profileToggle"));
                                    }}
                                />
                                )}
                            </div>
                        )}
                    </div>
                    )} 
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`mobile-menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div id="mobileMenu" className={`mobile-menu ${menuOpen ? "active" : ""}`} role="menu">
          <Link to="/" className="mobile-nav-link" onClick={closeMenu}>Home</Link>
          <Link to="/appointments" className="mobile-nav-link" onClick={closeMenu}>Appointments</Link>
          <Link to="/instant-consultation" className="mobile-nav-link" onClick={closeMenu}>Instant Booking</Link>
          <Link to="/blog" className="mobile-nav-link" onClick={closeMenu}>Health Blog</Link>
          <Link to="/reviews" className="mobile-nav-link" onClick={closeMenu}>Reviews</Link>
          <div className="mobile-auth-buttons">
            {!isAuthed ? (
              <>
                <Link to="/signup" className="btn btn-signup" onClick={closeMenu}>Sign Up</Link>
                <Link to="/login" className="btn btn-login" onClick={closeMenu}>Login</Link>
              </>
            ) : (
              <button className="btn btn-logout" onClick={() => { closeMenu(); handleLogout(); }}>
                Logout
              </button>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;