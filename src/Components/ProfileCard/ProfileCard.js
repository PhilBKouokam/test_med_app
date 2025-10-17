import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.css";

const ProfileCard = ({ user }) => {
  const [userDetails, setUserDetails] = useState(user || {});
  const [updatedDetails, setUpdatedDetails] = useState(user || {});
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch from API only if user prop is empty
  useEffect(() => {
    if (!user) {
      const authtoken = sessionStorage.getItem("auth-token");
      if (!authtoken) {
        navigate("/login");
      } else {
        fetchUserProfile();
      }
    }
  }, [user, navigate]);

  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      const response = await fetch(`${API_URL}/api/auth/user`, {
        headers: {
          Authorization: `Bearer ${authtoken}`,
          Email: email,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUserDetails(userData);
        setUpdatedDetails(userData);
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleEdit = () => setEditMode(true);

  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Get token and email
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");
  
      if (!authtoken || !email) {
        alert("You need to be logged in to update your profile.");
        navigate("/login");
        return;
      }
  
      // Create payload
      const payload = { ...updatedDetails };
  
      // Send the update request to backend
      /*const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          "Email": email,
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        // ✅ Update both local state and sessionStorage
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);
  
        setUserDetails(updatedDetails);
        setEditMode(false);
  
        // ✅ Trigger UI refresh for Navbar
        window.dispatchEvent(new Event("focus"));
  
        alert("Profile updated successfully!");
      } else {
        throw new Error("Failed to update profile");
      }*/
      console.log("Simulating profile update:", updatedDetails);
      sessionStorage.setItem("name", updatedDetails.name);
      sessionStorage.setItem("phone", updatedDetails.phone);
      setUserDetails(updatedDetails);
      setEditMode(false);
      window.dispatchEvent(new Event("focus"));
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed:", error);
      alert("Something went wrong while updating your profile.");
    }
  };

  return (
    <div 
        className="profile-container"
        onClick={(e) => e.stopPropagation()}
    >
      {!editMode ? (
        <div className="profile-details">
          <h3>👤 Profile Information</h3>
          <p><b>Name:</b> {userDetails.name || "Not set"}</p>
          <p><b>Email:</b> {userDetails.email || "Not set"}</p>
          <p><b>Phone:</b> {userDetails.phone || "Not set"}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="profile-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={updatedDetails.name || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={updatedDetails.phone || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={updatedDetails.email || ""}
              disabled
            />
          </label>
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
};

export default ProfileCard;