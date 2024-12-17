import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, db } from "../firebaseConfig";
import Logo from "../components/Logo";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = ref(db, `users/${user.uid}`);
      const userSnapshot = await get(userRef);
      if (!userSnapshot.exists()) {
        setError("User profile not found!");
        return;
      }
      const userData = userSnapshot.val();

      const wardrobeRef = ref(db, `wardrobes/${user.uid}`);
      const wardrobeSnapshot = await get(wardrobeRef);
      const wardrobeData = wardrobeSnapshot.exists() ? wardrobeSnapshot.val() : null;

      onLogin(user.uid, { ...userData, wardrobe: wardrobeData });
      navigate("/home");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="form-page">
      <Logo />
      <h1>Log In</h1>
      <form onSubmit={handleLogin} className="form-container">
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="save-outfit-button">
          Log In
        </button>
      </form>
      {error && <p className="error-text">{error}</p>}
      <button onClick={() => navigate("/")} className="see-saved-btn">
        Don't have an account? Sign Up
      </button>
    </div>
  );
};

export default Login;
