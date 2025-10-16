import React, { useEffect, useState } from "react";
import "./ReviewForm.css";
import GiveReviews from "../ReviewForm/GiveReviews";

const ReviewForm = () => {
  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState({});
  const [activeDoctor, setActiveDoctor] = useState(null);

  useEffect(() => {
    // ✅ Load appointment and doctor data
    const allAppointments = JSON.parse(localStorage.getItem("appointments")) || {};
    const doctorDataList = JSON.parse(localStorage.getItem("doctorDataList")) || {};

    // ✅ Combine data sources for table
    const flattened = Object.keys(allAppointments).map((doctorName, index) => ({
      serial: index + 1,
      doctorName,
      speciality:
        doctorDataList[doctorName]?.speciality ||
        allAppointments[doctorName]?.doctorSpeciality ||
        "N/A",
    }));

    setAppointments(flattened);

    // ✅ Load any stored reviews
    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || {};
    setReviews(storedReviews);
  }, []);

  // ✅ Save submitted reviews
  const handleReviewSubmit = (doctorName, reviewData) => {
    const updatedReviews = {
      ...reviews,
      [doctorName]: reviewData,
    };
    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    setActiveDoctor(null); // close the review form
  };

  return (
    <div className="review-container">
      <h2 className="review-title">Reviews</h2>

      {appointments.length === 0 ? (
        <p className="no-appointments">No booked consultations yet.</p>
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
            {appointments.map((appt) => {
              const review = reviews[appt.doctorName];
              const hasReview = !!review;

              return (
                <React.Fragment key={appt.serial}>
                  <tr>
                    <td>{appt.serial}</td>
                    <td>{`Dr. ${appt.doctorName}`}</td>
                    <td>{appt.speciality}</td>
                    <td>
                    <button
                        className="feedback-btn"
                        onClick={() =>
                            setActiveDoctor(
                            activeDoctor === appt.doctorName
                                ? null // if clicked again, close the form
                                : appt.doctorName // if different doctor, open form
                            )
                        }
                        disabled={hasReview}
                        style={{
                            opacity: hasReview ? 0.6 : 1,
                            cursor: hasReview ? "not-allowed" : "pointer",
                        }}
                        >
                        {hasReview
                            ? "Submitted"
                            : activeDoctor === appt.doctorName
                            ? "Close Form"
                            : "Click Here"}
                    </button>
                    </td>
                    <td className="review-message">
                      {review
                        ? `"${review.review}" (${review.rating}/5)`
                        : "No review yet"}
                    </td>
                  </tr>

                  {/* ✅ Show review form below doctor when active */}
                  {activeDoctor === appt.doctorName && !hasReview && (
                    <tr>
                      <td colSpan="5">
                        <GiveReviews
                          doctorName={appt.doctorName}
                          onSubmit={(data) =>
                            handleReviewSubmit(appt.doctorName, data)
                          }
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReviewForm;