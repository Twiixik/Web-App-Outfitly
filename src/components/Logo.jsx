import React from "react";
import LogoImage from "../assets/Logo/frame 4.png"; // Path to your logo image

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={LogoImage} alt="Outfitly Logo" className="logo-image" />
    </div>
  );
};

export default Logo;
