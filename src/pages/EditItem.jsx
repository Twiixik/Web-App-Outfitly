import React, { useState } from "react";
import { ref, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import Logo from "../components/Logo";

const EditProfile = ({ uid, profile, onUpdateProfile }) => {
  const [name, setName] = useState(profile?.name || "");
  const [profilePicture, setProfilePicture] = useState(profile?.profilePicture || "");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      // Update profile in the database
      const userRef = ref(db, `users/${uid}`);
      await update(userRef, { name, profilePicture });

      // Update profile in state
      onUpdateProfile({ name, profilePicture });

      // Show modal and close after a delay
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/profile");
      }, 2000);
    } catch (err) {
      console.error("Error saving profile:", err.message);
    }
  };

  return (
    <div className="form-page">
      <Logo />
      <h1>Edit Profile</h1>
      <form onSubmit={handleSaveChanges}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <label>Profile Picture URL</label>
        <input
          type="text"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
          placeholder="Enter image URL"
        />
        <button type="submit" className="save-outfit-button">
          Save Changes
        </button>
      </form>

      {/* Modal Popup */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Changes Saved!</h2>
            <p>Your profile has been successfully updated.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
