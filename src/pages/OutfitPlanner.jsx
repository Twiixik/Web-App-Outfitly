import React, { useState, useEffect } from "react";
import { ref, get, push } from "firebase/database";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import OutfitItem from "../components/OutfitItem";

const OutfitPlanner = ({ uid }) => {
  const [wardrobe, setWardrobe] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedItems, setSelectedItems] = useState([]);
  const [outfitName, setOutfitName] = useState("");
  const navigate = useNavigate();

  // Fetch wardrobe data
  useEffect(() => {
    async function fetchWardrobe() {
      try {
        const wardrobeRef = ref(db, `wardrobes/${uid}`);
        const snapshot = await get(wardrobeRef);
        if (snapshot.exists()) {
          setWardrobe(snapshot.val());
        }
      } catch (error) {
        console.error("Error fetching wardrobe:", error.message);
      }
    }
    if (uid) fetchWardrobe();
  }, [uid]);

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle item selection/deselection
  const handleItemClick = (item) => {
    setSelectedItems((prev) =>
      prev.find((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id) // Deselect item
        : [...prev, item] // Select item
    );
  };

  // Save outfit
  const handleSaveOutfit = async () => {
    if (!outfitName.trim()) {
      alert("Please enter a name for the outfit.");
      return;
    }

    try {
      const outfitsRef = ref(db, `outfits/${uid}`);
      await push(outfitsRef, {
        name: outfitName,
        items: selectedItems,
      });
      alert("Outfit saved successfully!");
      navigate("/saved-outfits");
    } catch (error) {
      console.error("Error saving outfit:", error.message);
    }
  };

  // Filter items based on the selected category
  const filteredItems =
    selectedCategory === "all"
      ? Object.entries(wardrobe).flatMap(([category, items]) =>
          Object.entries(items).map(([id, item]) => ({
            ...item,
            id,
            category,
          }))
        )
      : Object.entries(wardrobe[selectedCategory] || {}).map(([id, item]) => ({
          ...item,
          id,
          category: selectedCategory,
        }));

  return (
    <div className="form-page">
      <Logo />
      <div className="subtitle-text">
        <h1>Outfit Planner</h1>
        <p>
          Build your perfect outfit by selecting items from your wardrobe. Save
          your look and earn 20 points that you can redeem for discounts with
          our sustainable brand partners.
        </p>
      </div>
      {/* Button to navigate to saved outfits */}
      <button
        onClick={() => navigate("/saved-outfits")}
        className="see-saved-btn"
      >
        Saved Outfits
      </button>

      {/* Category Selection */}
      <div className="category-filter">
        <h3>How does it work?</h3>
        <p>
          - **Step 1**: Choose items from your wardrobe or filter by category.
          <br />- **Step 2**: Tap an item to add it to your outfit.<br />- **Step
          3**: Name your outfit and save it.<br />- **Step 4**: Preview your
          complete look below!
        </p>
        <label>Sort by Category:</label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="all">All</option>
          <option value="layers">Layers</option>
          <option value="shirts">Shirts</option>
          <option value="pants">Pants</option>
          <option value="dresses">Dresses</option>
          <option value="skirts">Skirts</option>
          <option value="shoes">Shoes</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>

      {/* Items Carousel */}
      <div className="carousel">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <OutfitItem
              key={item.id}
              item={item}
              onClick={handleItemClick}
              isSelected={selectedItems.find((i) => i.id === item.id)}
            />
          ))
        ) : (
          <p style={{ textAlign: "center", color: "var(--Text-And-Icon)" }}>
            You have no items in your wardrobe.{" "}
            {uid
              ? "Add items to start creating your perfect outfit!"
              : "Log in to begin building outfits."}
          </p>
        )}
      </div>

      {/* Selected Outfit Preview */}
      <div className="outfit-preview">
        <h2>Your Outfit Preview</h2>
        <div className="preview-items">
          {selectedItems.map((item) => (
            <div key={item.id} className="preview-card">
              <img src={item.image} alt={item.name} className="preview-image" />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Outfit Name and Save Button */}
      <input
        type="text"
        placeholder="Enter Outfit Name"
        value={outfitName}
        onChange={(e) => setOutfitName(e.target.value)}
        className="outfit-name-input"
      />
      <button onClick={handleSaveOutfit} className="save-outfit-button">
        Save Outfit
      </button>
    </div>
  );
};

export default OutfitPlanner;
