import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const Profile = ({ profile, wardrobeCount, savedOutfitsCount, points, onLogout, isGuest }) => {
  const navigate = useNavigate();

  return (
    <div className="form-page">
      <Logo />
      <h1 style={{ backgroundColor: "transparent" }}>Your Profile</h1>

      {/* Profile Info Card */}
      <div className="profile-card">
        <div className="profile-avatar">
          <img
            src={profile?.profilePicture || "https://via.placeholder.com/100"}
            alt="Profile"
            className="profile-image"
          />
        </div>
        <div className="profile-info" style={{ backgroundColor: "transparent" }}>
          <h3 className="profile-name" style={{ backgroundColor: "transparent" }}>
            {profile?.name || "User"}
          </h3>
          <p style={{ backgroundColor: "transparent" }}>
            {profile?.email || "example@email.com"}
          </p>
          <p style={{ backgroundColor: "transparent" }}>
            Points: {points || 0}
          </p>
        </div>

        {/* Stats Section */}
        <div className="profile-stats" style={{ backgroundColor: "transparent" }}>
          <div className="stats-box" style={{ backgroundColor: "transparent" }}>
            <h3 style={{ backgroundColor: "transparent" }}>{wardrobeCount}</h3>
            <p style={{ backgroundColor: "transparent" }}>Wardrobe Items</p>
          </div>
          <div className="stats-box" style={{ backgroundColor: "transparent" }}>
            <h3 style={{ backgroundColor: "transparent" }}>{savedOutfitsCount}</h3>
            <p style={{ backgroundColor: "transparent" }}>Saved Outfits</p>
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="profile-buttons">
        {/* Render "Edit Profile" ONLY if not a guest */}
        {!isGuest && (
          <button
            className="save-outfit-button"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>
        )}
        <button
          className="save-outfit-button"
          onClick={() => navigate("/sustainability-tips")}
        >
          Sustainability Tips
        </button>
        <button className="delete-button" onClick={onLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
