// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC8XoyfSyOTt8BJ5eq5UBlt9u6opXg8w38",
  authDomain: "outfitly-8c38d.firebaseapp.com",
  databaseURL: "https://outfitly-8c38d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "outfitly-8c38d",
  storageBucket: "outfitly-8c38d.firebasestorage.app",
  messagingSenderId: "887405980532",
  appId: "1:887405980532:web:5be3d26dca6fe401aa1a21",
  measurementId: "G-9GR6BLQHPP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth and Firestore
export const auth = getAuth(app);
export const db = getDatabase(app);