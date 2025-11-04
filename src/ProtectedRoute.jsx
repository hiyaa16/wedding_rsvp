import React, { useState } from "react";
import bgImage from "./assets/image5.jpeg"; // <-- local image import

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const correctPassword = "admin123"; // 🔒 change this

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* optional dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-white bg-opacity-70 backdrop-blur-md p-10 rounded-2xl shadow-2xl text-center w-80 z-10"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-500 font-serif">
          Admin Access
        </h2>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-full border border-gray-300 focus:border-black focus:outline-none font-serif"
        />
        <button
          type="submit"
          className="w-full bg-gray-500 text-white py-3 rounded-full font-serif hover:bg-gray-700 transition"
        >
          Unlock
        </button>
      </form>
    </div>
  );
}

export default ProtectedRoute;
