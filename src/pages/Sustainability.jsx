import React, { useState } from "react";
import Logo from "../components/Logo";

const SustainabilityTips = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Example tips data
  const tips = [
    {
      id: 1,
      category: "clothing-care",
      title: "Wash Clothes in Cold Water",
      description: "Washing clothes in cold water saves energy and keeps fabrics from wearing out quickly.",
      points: 5,
    },
    {
      id: 2,
      category: "upcycling",
      title: "Turn Old Jeans into a Bag",
      description: "Repurpose your old jeans into a reusable bag. A fun and sustainable DIY project!",
      points: 10,
    },
    {
      id: 3,
      category: "shopping-sustainably",
      title: "Buy Second-Hand Clothes",
      description: "Reduce waste and save money by shopping for pre-loved clothes at thrift stores.",
      points: 5,
    },
    {
      id: 4,
      category: "clothing-care",
      title: "Air Dry Your Clothes",
      description: "Avoid using a dryer. Air drying clothes saves energy and extends their lifespan.",
      points: 5,
    },
  ];

  // Filter tips based on category
  const filteredTips =
    selectedCategory === "all"
      ? tips
      : tips.filter((tip) => tip.category === selectedCategory);

  return (
    <div className="form-page">
      <Logo />
      <h1>Sustainability Tips</h1>
      <p>Learn how to keep your wardrobe sustainable and eco-friendly!</p>

      {/* Category Filter */}
      <div className="category-filter">
        <label>Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="clothing-care">Clothing Care</option>
          <option value="upcycling">Upcycling</option>
          <option value="shopping-sustainably">Shopping Sustainably</option>
        </select>
      </div>

      {/* Sustainability Tips Cards */}
      <div className="tips-container">
        {filteredTips.map((tip) => (
          <div key={tip.id} className="tip-card">
            <h2>{tip.title}</h2>
            <p>{tip.description}</p>
            <span className="points-reward">+{tip.points} Points</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SustainabilityTips;
