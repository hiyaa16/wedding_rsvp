import React, { useState } from "react";
import bgImage from "/assets/image5.jpeg";
import RSVPTable from "./RSVPTable";
import Gallery from "./Gallery";
import OurStory from "./OurStory";

function AdminDashboard({ isAdmin }) {
  const [activeScreen, setActiveScreen] = useState("menu");

  const adminOptions = [
    { name: "RSVP List", icon: null, screen: "rsvp" },
    { name: "Gallery", icon: null, screen: "gallery" },
    { name: "Our Story", icon: null, screen: "story" },
  ];

  const renderContent = () => {
    switch (activeScreen) {
      case "rsvp":
        return (
          <div className="overflow-x-auto w-full">
            <RSVPTable />
          </div>
        );
      case "gallery":
        return <Gallery isAdmin={isAdmin} />;
      case "story":
        return <OurStory isAdmin={isAdmin} />;
      case "menu":
      default:
        return (
          <div className="flex flex-col space-y-10 w-full max-w-4xl mx-auto p-6 items-center justify-center">
            {adminOptions.map((option) => (
              <button
                key={option.screen}
                onClick={() => setActiveScreen(option.screen)}
                className="
                  w-full sm:w-4/5 md:w-3/4 lg:w-2/3
                  bg-white bg-opacity-80
                  shadow-xl
                  p-8
                  mb-3
                  rounded-2xl
                  border border-white/30
                  hover:scale-[1.03]
                  hover:border-pink-300
                  transition transform duration-200
                  flex items-center justify-center gap-5
                  font-serif text-xl text-gray-700 tracking-wide
                  font-semibold
                "
                style={{
                  fontFamily: "'Playfair Display', serif",
                  letterSpacing: "0.02em",
                }}
              >
                <span>{option.name}</span>
              </button>
            ))}
          </div>
        );
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-cover bg-center relative px-0"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Light overlay only, no blur */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 max-w-full w-full text-center mt-10 mb-10 px-4">
        <h1
          className="text-4xl md:text-5xl font-bold mb-12 mt-8 text-white drop-shadow-lg font-serif tracking-widest"
          style={{
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "0.07em",
          }}
        >
          Admin Dashboard
        </h1>
        <div className="bg-black bg-opacity-10 rounded-xl shadow-xl w-full">
          {renderContent()}
        </div>
        {activeScreen !== "menu" && (
          <button
            onClick={() => setActiveScreen("menu")}
            className="mt-10 px-8 py-3 bg-gray-700
              text-white text-lg font-semibold rounded-full shadow-lg hover:bg-gray-800 transition font-serif"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ← Back to Menu
          </button>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
