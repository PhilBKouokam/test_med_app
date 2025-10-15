import React from "react";
import "./Landing_Page.css";
import { Link } from "react-router-dom";

const Landing_Page = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div>
          <div data-aos="fade-up" className="flex-hero">
            <h1>
              Your Health
              <br />
              <span className="text-gradient">Our Responsibility</span>
            </h1>

            <div className="blob-cont">
              <div className="blue blob"></div>
            </div>
            <div className="blob-cont">
              <div className="blue1 blob"></div>
            </div>

            <h4>
              We provide comprehensive healthcare services with expert medical
              professionals, state-of-the-art facilities, and personalized care
              plans. Your well-being is our priority, and we're committed to
              helping you live your healthiest life.
            </h4>

            <a href="#services">
              <button className="button">Get Started</button>
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services">
        <div className="services-container">
          <h2 className="services-title">Our Healthcare Services</h2>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fa fa-stethoscope" aria-hidden="true"></i>
              </div>
              <h3>General Consultation</h3>
              <p>
                Expert medical consultation with experienced healthcare
                professionals for all your health concerns.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fa fa-heart" aria-hidden="true"></i>
              </div>
              <h3>Specialized Care</h3>
              <p>
                Access to specialized medical services including cardiology,
                dermatology, and orthopedics.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fa fa-calendar" aria-hidden="true"></i>
              </div>
              <h3>Easy Appointments</h3>
              <p>
                Book appointments online with your preferred doctors at your
                convenient time slots.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo">
              <span className="logo-text">StayHealthy</span>
              <div className="logo-icon">
                <div className="logo-dot"></div>
              </div>
            </div>
            <p className="footer-text">
              Your trusted healthcare partner for a healthier tomorrow.
            </p>
          </div>

          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact Us</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 StayHealthy. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Landing_Page;