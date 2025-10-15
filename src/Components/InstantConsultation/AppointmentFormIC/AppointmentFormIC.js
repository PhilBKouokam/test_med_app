import React, { useState } from "react";
import "./AppointmentFormIC.css";

const AppointmentFormIC = ({
  doctorName,
  doctorSpeciality,
  doctorExperience,
  doctorRating,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    appointmentDate: "",
    timeSlot: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long.";
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Enter a valid phone number (10–15 digits).";
    }

    // Date validation
    if (!formData.appointmentDate) {
      newErrors.appointmentDate = "Please select a date.";
    } else {
      const selectedDate = new Date(formData.appointmentDate);
      const today = new Date();
      if (selectedDate < today.setHours(0, 0, 0, 0)) {
        newErrors.appointmentDate = "Date must be in the future.";
      }
    }

    // Time slot validation
    if (!formData.timeSlot) {
      newErrors.timeSlot = "Please select a time slot.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ returns true if no errors
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" })); // clear error when typing
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({
        name: "",
        phoneNumber: "",
        appointmentDate: "",
        timeSlot: "",
      });
      setErrors({});
    }
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
    <div className="appointment-form" onClick={(e) => e.stopPropagation()}>
      {/* Doctor Info Header */}
      <div className="doctor-header">
        <h3 className="doctor-name">Dr. {doctorName}</h3>
        <p className="doctor-speciality">{doctorSpeciality}</p>
        <p className="doctor-experience">{doctorExperience} years experience</p>
        <p className="doctor-rating">
          Ratings: {renderStars(doctorRating)}
        </p>
      </div>

      {/* Appointment Form */}
      <form onSubmit={handleFormSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error-input" : ""}
            required
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={errors.phoneNumber ? "error-input" : ""}
            required
          />
          {errors.phoneNumber && (
            <p className="error-text">{errors.phoneNumber}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="appointmentDate">Date of Appointment:</label>
          <input
            type="date"
            id="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            className={errors.appointmentDate ? "error-input" : ""}
            required
          />
          {errors.appointmentDate && (
            <p className="error-text">{errors.appointmentDate}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="timeSlot">Book Time Slot:</label>
          <select
            id="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            className={errors.timeSlot ? "error-input" : ""}
            required
          >
            <option value="">Select a time slot</option>
            <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
            <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
            <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
            <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
            <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
            <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
          </select>
          {errors.timeSlot && <p className="error-text">{errors.timeSlot}</p>}
        </div>

        <button type="submit" className="book-appointment-btn">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default AppointmentFormIC;
