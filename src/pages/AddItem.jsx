import React, { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo"; 

const AddItem = ({ uid }) => {
  const [category, setCategory] = useState("layers");
  const [itemName, setItemName] = useState("");
  const [itemTags, setItemTags] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!itemName.trim()) {
      setError("Item name is required!");
      return;
    }

    try {
      const itemRef = ref(db, `wardrobes/${uid}/${category}`);
      await push(itemRef, {
        name: itemName,
        tags: itemTags.split(",").map((tag) => tag.trim()),
        image: itemImage || "https://via.placeholder.com/150",
      });
      navigate("/wardrobe");
    } catch (err) {
      console.error("Error adding item:", err.message);
      setError("Failed to add item. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const imageUrl = e.target.value;
    setItemImage(imageUrl);
    setPreviewImage(imageUrl);
  };

  return (
    <div className="form-page">
      <Logo /> {/* Add the Logo component here */}
      <h1>Add new item</h1>
      <form onSubmit={handleAddItem}>
        <label>
          Add URL Image
          <input
            type="text"
            value={itemImage}
            onChange={handleImageChange}
            placeholder="Add URL Image"
          />
        </label>

        {/* Image Preview */}
        <div className="image-preview">
          {previewImage ? (
            <img src={previewImage} alt="Preview" />
          ) : (
            <span>Image preview</span>
          )}
        </div>

        <label>
          Select Category
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="layers">Layers</option>
            <option value="shirts">Shirts</option>
            <option value="pants">Pants</option>
            <option value="dresses">Dresses</option>
            <option value="skirts">Skirts</option>
            <option value="shoes">Shoes</option>
            <option value="accessories">Accessories</option>
          </select>
        </label>

        <label>
          Name
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Name"
          />
        </label>

        <label>
          Add tags
          <input
            type="text"
            value={itemTags}
            onChange={(e) => setItemTags(e.target.value)}
            placeholder="Add tags"
          />
        </label>

        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
