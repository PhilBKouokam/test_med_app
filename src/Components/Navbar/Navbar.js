import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  // === (was in <script>) state + functions ===
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev); // like classList.toggle
  const closeMenu = () => setMenuOpen(false);            // like removing 'active'

  return (
    <div>{/* they asked to place inside a div in the return */}
      <header className="navbar">
        <div className="navbar-container">
          {/* Logo/Brand */}
          <a href="Navbar.html" className="logo">
            <span className="brand-name">StayHealthy</span>
            <div className="logo-icon">
              <div className="logo-dot"></div>
            </div>
          </a>

          {/* Navigation Menu */}
          <nav className="nav-menu">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/appointments" className="nav-link">Appointments</Link>
            <Link to="/blog" className="nav-link">Health Blog</Link>
            <Link to="/reviews" className="nav-link">Reviews</Link>
          </nav>

          {/* Auth Buttons */}
          <div className="auth-buttons">
            <Link to="/signup" className="btn btn-signup">Sign Up</Link>
            <Link to="/login" className="btn btn-login">Login</Link>
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
        <div
          id="mobileMenu"
          className={`mobile-menu ${menuOpen ? "active" : ""}`}
          role="menu"
        >
          <a href="Navbar.html" className="mobile-nav-link" onClick={closeMenu}>Home</a>
          <a href="#" className="mobile-nav-link" onClick={closeMenu}>Appointments</a>
          <a href="#" className="mobile-nav-link" onClick={closeMenu}>Health Blog</a>
          <a href="#" className="mobile-nav-link" onClick={closeMenu}>Reviews</a>
          <div className="mobile-auth-buttons">
            <a href="../Sign_Up/Sign_Up.html" className="btn btn-signup" onClick={closeMenu}>Sign Up</a>
            <a href="../Login/Login.html" className="btn btn-login" onClick={closeMenu}>Login</a>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;