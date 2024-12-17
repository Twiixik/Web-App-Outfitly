import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "../assets/icons/home.svg";
import WardrobeIcon from "../assets/icons/wardrobe.svg";
import HangerIcon from "../assets/icons/hanger.svg";
import SustainabilityIcon from "../assets/icons/sustainability.svg";
import ProfileIcon from "../assets/icons/profile.svg";

const Navigation = () => {
  return (
    <nav className="navigation">
      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
      >
        <img src={HomeIcon} alt="Home" />
      </NavLink>
      <NavLink
        to="/wardrobe"
        className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
      >
        <img src={WardrobeIcon} alt="Wardrobe" />
      </NavLink>
      <NavLink
        to="/outfit-planner"
        className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
      >
        <img src={HangerIcon} alt="Outfit Planner" style={{ width: "45px", height: "45px" }}/>
      </NavLink>
      <NavLink
        to="/sustainability-tips"
        className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
      >
        <img src={SustainabilityIcon} alt="Sustainability Tips" />
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
      >
        <img src={ProfileIcon} alt="Profile" />
      </NavLink>
    </nav>
  );
};

export default Navigation;
