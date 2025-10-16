import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./DoctorCardIC.css";
import AppointmentFormIC from "../AppointmentFormIC/AppointmentFormIC";
import { v4 as uuidv4 } from "uuid";

const DoctorCardIC = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // ✅ Load doctor-specific appointment from global list
  useEffect(() => {
    const savedAll = JSON.parse(localStorage.getItem("appointments")) || {};
    if (savedAll[name]) {
      setAppointments(savedAll[name]);
    }
  }, [name]);

  // ✅ Save global appointments object when this doctor's changes
  const saveAppointments = (updatedAppointments) => {
    const all = JSON.parse(localStorage.getItem("appointments")) || {};
    if (updatedAppointments.length > 0) {
      all[name] = updatedAppointments;
    } else {
      delete all[name];
    }
    localStorage.setItem("appointments", JSON.stringify(all));
  };

  const handleBooking = () => setShowModal(true);

  const handleCancel = (id) => {
    const updated = appointments.filter((a) => a.id !== id);
    setAppointments(updated);
    saveAppointments(updated);

    // Remove global notification data if this doctor has no appointments left
    if (updated.length === 0) {
      localStorage.removeItem("doctorData");
      localStorage.removeItem(name);
    }

    // Notify Notification.js
    window.dispatchEvent(new Event("appointmentUpdate"));
  };

  const handleFormSubmit = (data) => {
    const appointment = { id: uuidv4(), ...data };
    const updated = [appointment];
    setAppointments(updated);
    saveAppointments(updated);
    setShowModal(false);

    // ✅ Update notification data for this specific booking
    localStorage.setItem(
      "doctorData",
      JSON.stringify({ name, speciality, experience, ratings })
    );
    localStorage.setItem(
      name,
      JSON.stringify({
        date: data.appointmentDate,
        time: data.timeSlot,
      })
    );

    // Notify Notification.js
    window.dispatchEvent(new Event("appointmentUpdate"));
  };

  const renderStars = (count) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < count ? "star filled" : "star"}>
        ★
      </span>
    ));

  return (
    <div className="doctor-card-container">
      {/* Doctor Info */}
      <div className="doctor-card-profile-image-container">
        {profilePic ? (
          <img src={profilePic} alt={name} />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            fill="#7c3aed"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        )}
      </div>

      <div className="doctor-card-details-container">
        <div className="doctor-card-detail-name">Dr. {name}</div>
        <div className="doctor-card-detail-speciality">{speciality}</div>
        <div className="doctor-card-detail-experience">
          {experience} years experience
        </div>
        <div className="doctor-card-detail-consultationfees">
          Ratings: {renderStars(ratings)}
        </div>
      </div>

      <div className="doctor-card-options-container">
        {appointments.length > 0 ? (
          <>
            <div className="appointment-summary">
              <h4>Appointment Details</h4>
              <p><strong>Name:</strong> {appointments[0].name}</p>
              <p><strong>Phone:</strong> {appointments[0].phoneNumber}</p>
              <p><strong>Date:</strong> {appointments[0].appointmentDate}</p>
              <p><strong>Time Slot:</strong> {appointments[0].timeSlot}</p>
            </div>

            <button
              className="cancel-appointment-btn"
              onClick={() => handleCancel(appointments[0].id)}
            >
              Cancel Appointment
            </button>
          </>
        ) : (
          <button className="book-appoinment-btn" onClick={handleBooking}>
            Book Appointment
            <br />
            <span className="no-booking-fee-text">No Booking Fee</span>
          </button>
        )}
      </div>

      <Popup
        open={showModal}
        modal
        nested
        closeOnDocumentClick
        onClose={() => setShowModal(false)}
      >
        {appointments.length > 0 ? (
          <>
            <h3 className="appointment-confirmed">Appointment Booked!</h3>
            {appointments.map((a) => (
              <div key={a.id} className="bookedInfo">
                <p>Name: {a.name}</p>
                <p>Phone Number: {a.phoneNumber}</p>
                <button
                  className="cancel-appointment-btn"
                  onClick={() => handleCancel(a.id)}
                >
                  Cancel Appointment
                </button>
              </div>
            ))}
          </>
        ) : (
          <AppointmentFormIC
            doctorName={name}
            doctorSpeciality={speciality}
            doctorExperience={experience}
            doctorRating={ratings}
            onSubmit={handleFormSubmit}
            onClose={() => setShowModal(false)}
          />
        )}
      </Popup>
    </div>
  );
};

export default DoctorCardIC;