import React from "react";

import image1 from "./assets/iti1.png";
import image2 from "./assets/iti2.png";
import image3 from "./assets/iti3.png";
import image4 from "./assets/iti4.png";

function Itinerary() {
  return (
    <div className="px-4 py-8 max-w-3xl mx-auto">
      <h2
        className="text-4xl md:text-6xl md:mt-24 text-center font-serif font-thin mb-10"
        style={{ fontFamily: "'Bodoni Moda', serif" }}
      >
        Our Wedding Itinerary
      </h2>

      <div className="flex flex-col gap-8">
        {[image1, image2, image3, image4].map((imgSrc, idx) => (
          <img
            key={idx}
            src={imgSrc}
            alt={`Itinerary ${idx + 1}`}
            className="w-full h-auto rounded-md border border-gray-300 object-contain"
          />
        ))}
      </div>
    </div>
  );
}

export default Itinerary;
