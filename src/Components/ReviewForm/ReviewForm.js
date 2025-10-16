import React, { useEffect, useState } from "react";
import "./ReviewForm.css";

const ReviewForm = () => {
  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    // ✅ Load all doctor appointments
    const allAppointments = JSON.parse(localStorage.getItem("appointments")) || {};

    // Convert each doctor's saved data into a row
    const flattened = Object.keys(allAppointments).map((doctorName, index) => {
      // Retrieve specialty info if stored under doctor-specific key
      const doctorInfo = JSON.parse(localStorage.getItem("doctorData")) || {};
      const storedDoctorData = JSON.parse(localStorage.getItem("doctorDataList") || "{}");

      return {
        serial: index + 1,
        doctorName,
        speciality:
          storedDoctorData[doctorName]?.speciality ||
          doctorInfo.speciality ||
          "N/A",
      };
    });

    setAppointments(flattened);

    // ✅ Load any existing reviews
    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || {};
    setReviews(storedReviews);
  }, []);

  const handleAddReview = (doctorName) => {
    const reviewText = prompt(`Please enter your review for Dr. ${doctorName}:`);
    if (reviewText && reviewText.trim() !== "") {
      const updatedReviews = {
        ...reviews,
        [doctorName]: reviewText,
      };
      setReviews(updatedReviews);
      localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    }
  };

  return (
    <div className="review-container">
      <h2 className="review-title">Reviews</h2>

      {appointments.length === 0 ? (
        <p className="no-appointments">No completed consultations yet.</p>
      ) : (
        <table className="review-table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>Provide Feedback</th>
              <th>Review Given</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.serial}>
                <td>{appt.serial}</td>
                <td>{`Dr. ${appt.doctorName}`}</td>
                <td>{appt.speciality}</td>
                <td>
                  <button
                    className="feedback-btn"
                    onClick={() => handleAddReview(appt.doctorName)}
                  >
                    Click Here
                  </button>
                </td>
                <td>
                  {reviews[appt.doctorName]
                    ? reviews[appt.doctorName]
                    : "No review yet"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReviewForm;