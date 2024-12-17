import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../firebaseConfig";
import WardrobeItem from "../components/WardrobeItem";
import { useNavigate } from "react-router-dom";
import AddItemIcon from "../assets/AddItem.svg";
import AddCircleIcon from "../assets/Icons/add-circle.svg";
import Logo from "../components/Logo";

const Wardrobe = ({ uid }) => {
  const [wardrobe, setWardrobe] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWardrobe() {
      try {
        const wardrobeRef = ref(db, `wardrobes/${uid}`);
        const snapshot = await get(wardrobeRef);

        if (snapshot.exists()) {
          const wardrobeData = snapshot.val();

          const categories = [
            "layers",
            "shirts",
            "pants",
            "dresses",
            "skirts",
            "shoes",
            "accessories",
          ];

          const wardrobeWithDefaults = categories.reduce((acc, category) => {
            acc[category] = wardrobeData[category] || {};
            return acc;
          }, {});

          setWardrobe(wardrobeWithDefaults);
        } else {
          setWardrobe({
            layers: {},
            shirts: {},
            pants: {},
            dresses: {},
            skirts: {},
            shoes: {},
            accessories: {},
          });
        }
      } catch (error) {
        console.error("Error fetching wardrobe:", error.message);
      }
    }

    if (uid) fetchWardrobe();
  }, [uid]);

  // Calculate total items across all categories
  const totalItems = Object.values(wardrobe).reduce(
    (sum, categoryItems) => sum + Object.keys(categoryItems).length,
    0
  );

  return (
    <section className="wardrobe-page">
      {/* Reusable Logo Component */}
      <Logo />

      <header className="wardrobe-header">
        <div className="header-title-container">
          <div className="title-left">
            <span className="item-count">{totalItems} ITEMS</span>
            <h1 className="wardrobe-title">Your Closet</h1>
          </div>
          <div className="title-right">
            <button
              className="add-circle-button"
              onClick={() => navigate("/add-item")}
            >
              <img src={AddCircleIcon} alt="Add Circle" className="add-circle-icon" />
            </button>
          </div>
        </div>
      </header>

      {/* Wardrobe Categories */}
      <div className="wardrobe-container">
        {Object.entries(wardrobe).map(([category, items]) => (
          <div key={category} className="wardrobe-category">
            <div className="category-header">
              <h2 className="category-title">
                {category.charAt(0).toUpperCase() + category.slice(1)} (
                {Object.keys(items).length})
              </h2>
            </div>
            <div className="carousel">
              {Object.entries(items).map(([itemId, item]) => (
                <WardrobeItem
                  key={itemId}
                  item={{ ...item, id: itemId, uid }} // Pass id and uid
                  category={category} // Pass the category
                />
              ))}
              <div
                className="add-item-slot"
                onClick={() => navigate("/add-item", { state: { category } })}
              >
                <img src={AddItemIcon} alt="Add Item" className="add-item-image" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Wardrobe;
