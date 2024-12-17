import React from "react";

const OutfitItem = ({ item, onClick, isSelected }) => {
  return (
    <div
      className={`wardrobe-item ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(item)}
    >
      <div className="item-image-container">
        <img
          src={item.image || "https://via.placeholder.com/150"}
          alt={item.name}
          className="item-image"
        />
      </div>
      <div className="item-details">
        <h4 className="item-name">{item.name || "Unnamed Item"}</h4>
        <p className="item-tags">
          {item.tags?.join(", ") || "No tags"}
        </p>
      </div>
    </div>
  );
};

export default OutfitItem;
