import React, { useState } from "react";
import { ref, update } from "firebase/database";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const EditProfile = ({ uid, profile, onUpdateProfile }) => {
  const [name, setName] = useState(profile?.name || "");
  const [profileImageUrl, setProfileImageUrl] = useState(profile?.image || "");
  const navigate = useNavigate();

  // Handle save changes
  const handleSaveChanges = async () => {
    if (!name.trim()) {
      alert("Name cannot be empty!");
      return;
    }

    try {
      const userRef = ref(db, `users/${uid}`);
      await update(userRef, {
        name: name.trim(),
        image: profileImageUrl || "https://via.placeholder.com/100",
      });

      // Update the parent state to reflect changes immediately
      onUpdateProfile({ name, image: profileImageUrl });

      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="form-page">
      <Logo />
      <h1>Edit Profile</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Name Input */}
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </label>

        {/* Profile Image URL Input */}
        <label>
          Profile Picture URL
          <input
            type="text"
            value={profileImageUrl}
            onChange={(e) => setProfileImageUrl(e.target.value)}
            placeholder="Enter image URL"
          />
        </label>

        {/* Image Preview */}
        <div className="image-preview">
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt="Profile Preview"
              className="preview-image"
            />
          ) : (
            <span>No Image</span>
          )}
        </div>

        {/* Buttons */}
        <button
          type="button"
          className="save-outfit-button"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
        <button
          type="button"
          className="delete-button"
          onClick={() => navigate("/profile")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
