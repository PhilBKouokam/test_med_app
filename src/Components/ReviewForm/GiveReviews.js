import React, { useState } from "react";
import "./GiveReviews.css";

function GiveReviews({ doctorName, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 0,
  });
  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingSelect = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.review && formData.rating > 0) {
      setShowWarning(false);
      onSubmit(formData); // ✅ Send review data back to parent
    } else {
      setShowWarning(true);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Give Your Review for Dr. {doctorName}</h3>
      {showWarning && <p className="warning">Please fill out all fields.</p>}

      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Review:</label>
        <textarea
          name="review"
          placeholder="Write your feedback here"
          value={formData.review}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Rating:</label>
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= formData.rating ? "star filled" : "star"}
              onClick={() => handleRatingSelect(star)}
            >
              ★
            </span>
          ))}
        </div>
        </div>

      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
}

export default GiveReviews;