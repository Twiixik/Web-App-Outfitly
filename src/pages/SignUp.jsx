import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInAnonymously } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../firebaseConfig";
import Logo from "../components/Logo";

const SignUp = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    try {
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;

      await set(ref(db, `users/${user.uid}`), { name: "Guest", email: "guest@example.com" });
      await set(ref(db, `wardrobes/${user.uid}`), {
        layers: [],
        shirts: [],
        pants: [],
        dresses: [],
        skirts: [],
        shoes: [],
        accessories: [],
      });

      onLogin(user.uid, { name: "Guest", email: "guest@example.com" });
      navigate("/home");
    } catch (err) {
      setError("Failed to continue as guest. Please try again.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await set(ref(db, `users/${user.uid}`), { name, email });
      await set(ref(db, `wardrobes/${user.uid}`), {
        layers: [],
        shirts: [],
        pants: [],
        dresses: [],
        skirts: [],
        shoes: [],
        accessories: [],
      });

      onLogin(user.uid, { name, email });
      navigate("/home");
    } catch (err) {
      setError("Failed to create an account. Please try again.");
    }
  };

  return (
    <div className="form-page">
      <Logo />
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp} className="form-container">
        <input
          className="input-field"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          Sign Up
        </button>
      </form>
      {error && <p className="error-text">{error}</p>}
      <button onClick={() => navigate("/login")} className="see-saved-btn">
        Already have an account? Log In
      </button>
      <button onClick={handleGuestLogin} className="save-outfit-button">
        Continue as Guest
      </button>
    </div>
  );
};

export default SignUp;
