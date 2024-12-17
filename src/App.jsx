import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import { signInAnonymously } from "firebase/auth";
import { ref, get } from "firebase/database";
import { db } from "./firebaseConfig";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Wardrobe from "./pages/Wardrobe";
import OutfitPlanner from "./pages/OutfitPlanner";
import SustainabilityTips from "./pages/Sustainability";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import SavedOutfits from "./pages/SavedOutfits";
import EditOutfit from "./pages/EditOutfit";
import EditProfile from "./pages/EditProfile"; // Import EditProfile Component
import Navigation from "./components/Navigation";

function App() {
  const [isGuest, setIsGuest] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [uid, setUid] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [wardrobeCount, setWardrobeCount] = useState(0);
  const [savedOutfitsCount, setSavedOutfitsCount] = useState(0);

  // Fetch counts for wardrobe and outfits
  const fetchCounts = async (userUid) => {
    try {
      const wardrobeRef = ref(db, `wardrobes/${userUid}`);
      const wardrobeSnapshot = await get(wardrobeRef);
      if (wardrobeSnapshot.exists()) {
        const wardrobeData = wardrobeSnapshot.val();
        const totalWardrobeItems = Object.values(wardrobeData).reduce(
          (acc, category) => acc + Object.keys(category).length,
          0
        );
        setWardrobeCount(totalWardrobeItems);
      }

      const outfitsRef = ref(db, `outfits/${userUid}`);
      const outfitsSnapshot = await get(outfitsRef);
      if (outfitsSnapshot.exists()) {
        setSavedOutfitsCount(Object.keys(outfitsSnapshot.val()).length);
      }
    } catch (error) {
      console.error("Error fetching counts:", error.message);
    }
  };

  // Guest access logic
  const handleGuestAccess = async () => {
    try {
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;
      setUid(user.uid);
      setIsGuest(true);
      setIsAuthenticated(false);
      fetchCounts(user.uid);
    } catch (error) {
      console.error("Error signing in as guest:", error.message);
    }
  };

  const handleLogin = (userUid, userData) => {
    setUid(userUid);
    setUserProfile(userData);
    setIsGuest(false);
    setIsAuthenticated(true);
    fetchCounts(userUid);
  };

  const handleLogout = () => {
    setUid(null);
    setUserProfile(null);
    setIsGuest(false);
    setIsAuthenticated(false);
    setWardrobeCount(0);
    setSavedOutfitsCount(0);
  };

  // Update user profile after editing
  const handleUpdateProfile = (updatedProfile) => {
    setUserProfile((prev) => ({ ...prev, ...updatedProfile }));
  };

  return (
    <Router>
      <div className="app-container">
        <div className="main-wrapper">
          <Routes>
            <Route path="/" element={<SignUp onGuestAccess={handleGuestAccess} onLogin={handleLogin} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/home"
              element={isAuthenticated || isGuest ? <Home isGuest={isGuest} uid={uid} /> : <Navigate to="/" />}
            />
            <Route
              path="/profile"
              element={
                isAuthenticated || isGuest ? (
                  <Profile
                    uid={uid}
                    profile={userProfile}
                    points={userProfile?.points || 0}
                    wardrobeCount={wardrobeCount}
                    savedOutfitsCount={savedOutfitsCount}
                    onLogout={handleLogout}
                    isGuest={isGuest}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            {/* Add Edit Profile Route */}
            <Route
              path="/edit-profile"
              element={
                isAuthenticated || isGuest ? (
                  <EditProfile
                    uid={uid}
                    profile={userProfile}
                    onUpdateProfile={handleUpdateProfile}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/wardrobe"
              element={
                isAuthenticated || isGuest ? <Wardrobe isGuest={isGuest} uid={uid} /> : <Navigate to="/" />
              }
            />
            <Route path="/add-item" element={isAuthenticated && uid ? <AddItem uid={uid} /> : <Navigate to="/" />} />
            <Route path="/edit-item" element={isAuthenticated && uid ? <EditItem uid={uid} /> : <Navigate to="/" />} />
            <Route
              path="/outfit-planner"
              element={isAuthenticated || isGuest ? <OutfitPlanner uid={uid} /> : <Navigate to="/" />}
            />
            <Route
              path="/saved-outfits"
              element={isAuthenticated || isGuest ? <SavedOutfits uid={uid} /> : <Navigate to="/" />}
            />
            <Route
              path="/edit-outfit"
              element={isAuthenticated || isGuest ? <EditOutfit uid={uid} /> : <Navigate to="/" />}
            />
            <Route
              path="/sustainability-tips"
              element={isAuthenticated || isGuest ? <SustainabilityTips /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        {(isAuthenticated || isGuest) && <Navigation />}
      </div>
    </Router>
  );
}

export default App;
