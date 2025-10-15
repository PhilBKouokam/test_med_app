import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./DoctorCardIC.css";
import AppointmentFormIC from "../AppointmentFormIC/AppointmentFormIC";
import { v4 as uuidv4 } from "uuid";

const DoctorCardIC = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleBooking = () => setShowModal(true);
  const handleCancel = (id) =>
    setAppointments((prev) => prev.filter((a) => a.id !== id));

  const handleFormSubmit = (data) => {
    setAppointments([{ id: uuidv4(), ...data }]);
    setShowModal(false);
  };

  const renderStars = (count) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < count ? "star filled" : "star"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="doctor-card-container">
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
            <button
            className="book-appoinment-btn"
            onClick={handleBooking}
            >
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
            onClose={() => setShowModal(false)} // ✅ optional, for manual close
            />
        )}
      </Popup>
    </div>
  );
};

export default DoctorCardIC;
