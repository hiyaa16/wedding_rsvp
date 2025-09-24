import React, { useState, useEffect } from "react";

import img1 from "./assets/image.jpg";
import img2 from "./assets/image3.jpeg";
import img3 from "./assets/image3.jpg";

function HeroSection() {
  const images = [img1, img2, img3];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[90vh] sm:h-screen overflow-hidden bg-black">
      {/* Background Images */}
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`Slide ${i}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex: i === current ? 10 : 5 }}
        />
      ))}

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

      {/* Text Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4 sm:px-10 mt-48">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-[.10em] mb-5">
          SAVE THE DATE
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-3 sm:gap-6">
          <div className="sm:border-r-2 sm:border-white pr-0 sm:pr-8 text-sm sm:text-base md:text-lg opacity-90 font-light text-center sm:text-left">
            Indana
            <br />
            Jodhpur
          </div>

          <div className="text-2xl sm:text-3xl md:text-4xl italic font-serif mx-2 sm:mx-6 opacity-100">
            Vipul & Patty
          </div>

          <div className="sm:border-l-2 sm:border-white pl-0 sm:pl-8 text-sm sm:text-base md:text-lg opacity-90 font-light text-center sm:text-right">
            20 & 21 February
            <br />
            2026
          </div>
        </div>
      </div>

      {/* Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-white scale-110" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-20 sm:h-32"
        >
          <path
            d="M-10.59,118.77 C150.00,150.00 349.25,0.00 510.59,120.77 L500.00,0.00 L0.00,0.00 Z"
            className="fill-gray-300"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default HeroSection;
