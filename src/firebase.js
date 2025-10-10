import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // <-- NEW: Imported for AdminAuth component
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

// Initialize Firestore database and export it
export const db = getFirestore(app);

// Initialize Authentication and export it for AdminAuth.js
export const auth = getAuth(app); // <-- NEW: Exported auth service

// Optional: Initialize Analytics (if needed)
export const analytics = getAnalytics(app);
