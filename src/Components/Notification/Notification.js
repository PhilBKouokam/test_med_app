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
    const updateStateFromStorage = () => {
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
      } else {
        setShowNotification(false);
      }
    };
  
    // Run once initially
    updateStateFromStorage();
  
    // Listen to both events
    window.addEventListener("storage", updateStateFromStorage);
    window.addEventListener("appointmentUpdate", updateStateFromStorage);
  
    return () => {
      window.removeEventListener("storage", updateStateFromStorage);
      window.removeEventListener("appointmentUpdate", updateStateFromStorage);
    };
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