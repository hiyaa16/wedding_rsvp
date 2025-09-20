import React from "react";
import moodboardImage from "./assets/outfit.png"; // replace with your image

function OutfitMoodboard() {
  return (
    
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <h1
        className="mt-20 text-pink-500 text-center text-4xl md:text-6xl font-serif font-thin max-w-3xl md:mb-24 "
        style={{ fontFamily: "serif" }}
      >
        Discover Your Style with Our Outfit Moodboard
      </h1>
      <img
        src={moodboardImage}
        alt="Outfit Moodboard"
        className="max-w-full max-h-screen object-contain"
      />
      
      
    </div>
  );
}

export default OutfitMoodboard;
