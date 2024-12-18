import React from "react";
import LogoImage from "../assets/Logo/frame.png"; 

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={LogoImage} alt="Outfitly Logo" className="logo-image" />
    </div>
  );
};

export default Logo;
