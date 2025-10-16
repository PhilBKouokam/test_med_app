import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({ user, onLogout }) => {
  if (!user) return null;

  return (
    <div className="profile-card">
      <h3>👤 Profile Information</h3>
      <div className="profile-details">
        <p><strong>Name:</strong> {user.name || "N/A"}</p>
        <p><strong>Email:</strong> {user.email || "Not provided"}</p>
        <p><strong>Phone:</strong> {user.phone || "Not provided"}</p>
      </div>
    </div>
  );
};

export default ProfileCard;