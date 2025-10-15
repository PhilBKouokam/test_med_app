import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

// Notification component to display appointment notifications
const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  // Load stored data from localStorage/sessionStorage when component mounts
  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
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
      setShowNotification(true); // Show the notification if appointment exists
    }
  }, []);

  // Watch for changes — hide notification if appointment is canceled
  useEffect(() => {
    const checkCancellation = setInterval(() => {
      const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
      const storedAppointmentData = storedDoctorData
        ? JSON.parse(localStorage.getItem(storedDoctorData.name))
        : null;

      if (!storedAppointmentData) {
        setShowNotification(false); // Hide notification when appointment data is removed
        clearInterval(checkCancellation);
      }
    }, 1000);

    return () => clearInterval(checkCancellation);
  }, []);

  return (
    <div>
      <Navbar />
      {children}

      {/* Notification Box */}
      {isLoggedIn && showNotification && appointmentData && (
        <div className="notification-container">
          <div className="notification-card">
            <h3 className="notification-title">Appointment Confirmed!</h3>
            <p><strong>Patient:</strong> {username}</p>
            <p><strong>Doctor:</strong> {doctorData?.name}</p>
            <p><strong>Speciality:</strong> {doctorData?.speciality}</p>
            <p><strong>Date:</strong> {appointmentData.appointmentDate}</p>
            <p><strong>Time:</strong> {appointmentData.timeSlot}</p>
            <button
              className="close-notification-btn"
              onClick={() => setShowNotification(false)}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;