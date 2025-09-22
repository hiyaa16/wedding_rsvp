// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD9_lGwQb1ciqlvXylr5LsCHyomgTTbm4",
  authDomain: "vipattykishaadi.firebaseapp.com",
  projectId: "vipattykishaadi",
  storageBucket: "vipattykishaadi.firebasestorage.app",
  messagingSenderId: "929091848007",
  appId: "1:929091848007:web:a27ccbec4356210084ee62",
  measurementId: "G-4E51W17PEW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore database and export it for use in your React app
export const db = getFirestore(app);

// Optional: Initialize Analytics (if needed)
export const analytics = getAnalytics(app);
