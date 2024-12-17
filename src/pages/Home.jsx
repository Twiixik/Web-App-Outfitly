import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import WardrobeItem from "../components/WardrobeItem";
import Logo from "../components/Logo"; // Reusable Logo component
import AddIcon1 from "../assets/Icons/add-icon1.svg"; // New icon

const Home = ({ uid }) => {
  const [username, setUsername] = useState("User");
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserAndWardrobe() {
      try {
        const userRef = ref(db, `users/${uid}`);
        const userSnapshot = await get(userRef);
        if (userSnapshot.exists()) {
          setUsername(userSnapshot.val().name || "User");
        }

        const wardrobeRef = ref(db, `wardrobes/${uid}`);
        const wardrobeSnapshot = await get(wardrobeRef);

        if (wardrobeSnapshot.exists()) {
          const wardrobeData = wardrobeSnapshot.val();
          const allItems = Object.entries(wardrobeData).flatMap(
            ([category, items]) =>
              Object.entries(items).map(([id, item]) => ({
                ...item,
                id,
                category,
              }))
          );

          const shuffledItems = allItems.sort(() => 0.5 - Math.random());
          setWardrobeItems(shuffledItems.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    if (uid) fetchUserAndWardrobe();
  }, [uid]);

  return (
    <section className="home-page">
      {/* Header */}
      <header className="home-header">
        <Logo />
        <h2 className="welcome-text">Hello, {username}</h2>
        <p className="subtitle">
          Welcome back, what outfit are you going to wear today?
        </p>
      </header>

      {/* Your Wardrobe */}
      <div className="wardrobe-section">
        <div className="section-header">
          <h3>Your Wardrobe</h3>
          <button onClick={() => navigate("/wardrobe")} className="see-all-btn">
            See all
          </button>
        </div>
        {wardrobeItems.length > 0 ? (
          <div className="carousel">
            {wardrobeItems.map((item) => (
              <WardrobeItem key={item.id} item={item} category={item.category} />
            ))}
          </div>
        ) : (
          <p style={{ color: "var(--Text-And-Icon)", textAlign: "center" }}>
            {uid
              ? "You have no items in your wardrobe yet. Add your first item!"
              : "You are a guest. Log in to start adding wardrobe items."}
          </p>
        )}
      </div>

      {/* Add new item */}
      <div className="action-section">
        <div className="section-header">
          <h3>Add new item</h3>
          <button onClick={() => navigate("/wardrobe")} className="see-all-btn">
            All items
          </button>
        </div>
        <div className="action-card" onClick={() => navigate("/add-item")}>
          <img src={AddIcon1} alt="Add Item" className="action-icon" />
          <h3>Add new item</h3>
        </div>
      </div>

      {/* Create outfit */}
      <div className="action-section">
        <div className="section-header">
          <h3>Create outfit</h3>
          <button
            onClick={() => navigate("/outfit-planner")}
            className="see-all-btn"
          >
            All outfits
          </button>
        </div>
        <div
          className="action-card"
          onClick={() => navigate("/outfit-planner")}
        >
          <img src={AddIcon1} alt="Create Outfit" className="action-icon" />
          <h3>Create outfit</h3>
        </div>
      </div>
    </section>
  );
};

export default Home;
