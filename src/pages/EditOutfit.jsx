import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ref, get, update, remove } from "firebase/database"; // Add remove
import { db } from "../firebaseConfig";
import Logo from "../components/Logo";
import OutfitItem from "../components/OutfitItem";

const EditOutfit = ({ uid }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { outfit } = location.state || {};

  const [wardrobe, setWardrobe] = useState({});
  const [outfitName, setOutfitName] = useState(outfit.name);
  const [selectedItems, setSelectedItems] = useState(outfit.items || []);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch wardrobe data
  useEffect(() => {
    const fetchWardrobe = async () => {
      try {
        const wardrobeRef = ref(db, `wardrobes/${uid}`);
        const snapshot = await get(wardrobeRef);

        if (snapshot.exists()) {
          setWardrobe(snapshot.val());
        }
      } catch (error) {
        console.error("Error fetching wardrobe:", error.message);
      }
    };

    if (uid) fetchWardrobe();
  }, [uid]);

  // Handle item selection/deselection
  const handleItemClick = (item) => {
    setSelectedItems((prev) =>
      prev.find((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id) // Remove item
        : [...prev, item] // Add item
    );
  };

  // Save updated outfit to Firebase
  const handleSaveChanges = async () => {
    try {
      const outfitRef = ref(db, `outfits/${uid}/${outfit.id}`);
      await update(outfitRef, {
        name: outfitName,
        items: selectedItems,
      });
      alert("Outfit updated successfully!");
      navigate("/saved-outfits");
    } catch (error) {
      console.error("Error saving outfit:", error.message);
    }
  };

  // Delete outfit from Firebase
  const handleDeleteOutfit = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this outfit?"
    );
    if (!confirmDelete) return;

    try {
      const outfitRef = ref(db, `outfits/${uid}/${outfit.id}`);
      await remove(outfitRef);
      alert("Outfit deleted successfully!");
      navigate("/saved-outfits");
    } catch (error) {
      console.error("Error deleting outfit:", error.message);
    }
  };

  // Filter wardrobe items based on selected category
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
      <h1>Edit Outfit</h1>

      {/* Outfit Name Edit */}
      <label>
        Outfit Name:
        <input
          type="text"
          value={outfitName}
          onChange={(e) => setOutfitName(e.target.value)}
          placeholder="Enter outfit name"
        />
      </label>

      {/* Category Filter */}
      <div className="category-filter">
        <h3>How does it work?</h3>
        <p> - **Step 1**: Review your saved outfit and see all the items.<br />
            - **Step 2**: Remove any items you no longer want in the outfit.<br />
            - **Step 3**: Add new items by selecting them from your wardrobe.<br />
            - **Step 4**: Update the outfit name and save your changes.<br />
        </p>
        <label>Sort by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
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

      {/* Wardrobe Items */}
      <div className="carousel">
        {filteredItems.map((item) => (
          <OutfitItem
            key={item.id}
            item={item}
            onClick={() => handleItemClick(item)}
            isSelected={selectedItems.find((i) => i.id === item.id)}
          />
        ))}
      </div>

      {/* Selected Outfit Preview */}
      <div className="outfit-preview">
        <h2>Your Outfit</h2>
        <div className="preview-items">
          {selectedItems.map((item) => (
            <div key={item.id} className="preview-card">
              <img src={item.image} alt={item.name} className="preview-image" />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="edit-buttons">
        <button onClick={handleSaveChanges} className="save-button">
          Save Changes
        </button>
        <button onClick={handleDeleteOutfit} className="delete-button">
          Delete Outfit
        </button>
      </div>
    </div>
  );
};

export default EditOutfit;
