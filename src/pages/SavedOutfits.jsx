import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Logo from "../components/Logo";

const SavedOutfits = ({ uid }) => {
  const [outfits, setOutfits] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch saved outfits from the database
  useEffect(() => {
    const fetchSavedOutfits = async () => {
      try {
        const outfitsRef = ref(db, `outfits/${uid}`);
        const snapshot = await get(outfitsRef);

        if (snapshot.exists()) {
          const fetchedOutfits = Object.entries(snapshot.val()).map(
            ([id, outfit]) => ({ id, ...outfit })
          );
          setOutfits(fetchedOutfits);
        }
      } catch (error) {
        console.error("Error fetching saved outfits:", error.message);
      }
    };

    if (uid) fetchSavedOutfits();
  }, [uid]);

  // Navigate to the EditOutfit page with outfit data
  const handleEditOutfit = (outfit) => {
    navigate("/edit-outfit", { state: { outfit } }); // Pass outfit data as state
  };

  return (
    <div className="form-page">
      <Logo />
      <div className="subtitle-text">
      <h1>Saved Outfits</h1>
      <p>Take a look at your saved outfits! Edit, reuse, or get inspired for your next look.</p>
    </div>
      {/* Outfits List */}
      <div className="outfits-container">
        {outfits.length > 0 ? (
          outfits.map((outfit) => (
            <div
              key={outfit.id}
              className="outfit-card"
              onClick={() => handleEditOutfit(outfit)} // Navigate on click
              style={{ cursor: "pointer" }} // Add pointer cursor for clarity
            >
              <h2 className="outfit-name">{outfit.name}</h2>
              <div className="outfit-items">
                {outfit.items.map((item, index) => (
                  <div key={index} className="outfit-item">
                    <img
                      src={item.image || "https://via.placeholder.com/150"}
                      alt={item.name}
                      className="outfit-item-image"
                    />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No outfits saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default SavedOutfits;
