import React from "react";

// Assuming you have a background image asset named itiBg
import itiBg from "./assets/image5.jpeg"; 
import image1 from "./assets/iti1.png";
import image2 from "./assets/iti2.png";
import image3 from "./assets/iti3.png";
import image4 from "./assets/iti4.png";

function Itinerary() {
  return (
    <div className="relative w-full min-h-screen">
      
      {/* Background Image Container (Fixed/Full Height) */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${itiBg})` }}
      >
        {/* Black Overlay (Dull Effect) */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/70"></div>
      </div>

      {/* Content Container: Ensure content appears above the overlay */}
      <div className="relative z-10 px-4 py-8 max-w-3xl mx-auto text-white">
        <h2
          className="text-4xl md:text-5xl pt-16 md:pt-24 text-center font-thin mb-10 drop-shadow-lg"
          style={{ fontFamily: 'Cinzel Decorative, serif'}}
        >
          Our Wedding Itinerary
        </h2>

        <div className="flex flex-col gap-8">
          {/* Itinerary Images - Wrapped in a slightly transparent box for readability */}
          {[image1, image2, image3, image4].map((imgSrc, idx) => (
            <img
              key={idx}
              src={imgSrc}
              alt={`Itinerary ${idx + 1}`}
              className="w-full h-auto rounded-md shadow-xl object-contain bg-white/10 p-2"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Itinerary;
