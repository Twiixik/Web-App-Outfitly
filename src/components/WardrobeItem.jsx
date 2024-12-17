import React from "react";
import { useNavigate } from "react-router-dom";

const WardrobeItem = ({ item, category }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-item`, { state: { item, category } });
  };

  return (
    <div className="wardrobe-item" onClick={handleEdit}>
      <div className="item-image-container">
        <img
          src={item.image || "https://via.placeholder.com/150"}
          alt={item.name}
          className="item-image"
        />
      </div>
      <div className="item-details">
        <h4 className="item-name">{item.name || "Unnamed Item"}</h4>
        <p className="item-tags">{item.tags?.join(", ") || "No tags"}</p>
      </div>
    </div>
  );
};

export default WardrobeItem;
