// src/Components/Notification/Notification.js
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Notification.css";

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Get stored data
    const storedUsername = sessionStorage.getItem("name");
    const storedDoctorData = JSON.parse(localStorage.getItem("doctorData"));
    const storedAppointmentData = JSON.parse(
      localStorage.getItem(storedDoctorData?.name)
    );

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      setShowNotification(true);
    }

    // Listen for appointment cancellation
    const handleStorageChange = () => {
      const latestAppointment = JSON.parse(
        localStorage.getItem(storedDoctorData?.name)
      );
      if (!latestAppointment) {
        setShowNotification(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!isLoggedIn) {
    return (
      <>
        <Navbar />
        {children}
      </>
    );
  }

  return (
    <div>
      <Navbar />
      {children}

      {showNotification && appointmentData && (
        <div className="notification-container">
          <div className="notification-card">
            <h3 className="notification-title">Appointment Confirmed 🎉</h3>
            <p>
              <strong>Doctor:</strong> {doctorData?.name}
            </p>
            <p>
              <strong>Speciality:</strong> {doctorData?.speciality}
            </p>
            <p>
              <strong>Patient:</strong> {username}
            </p>
            <p>
              <strong>Date:</strong> {appointmentData?.date}
            </p>
            <p>
              <strong>Time:</strong> {appointmentData?.time}
            </p>
            <button
              className="notification-close"
              onClick={() => setShowNotification(false)}
            >
              ✖ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;