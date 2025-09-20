import React, { useState, useEffect } from "react";

import img1 from "./assets/image.jpg";
import img2 from "./assets/image3.jpeg";
import img3 from "./assets/image4.jpeg";

function HeroSection() {
  const images = [img1, img2, img3];
  const [current, setCurrent] = useState(0);

  // Auto-change background every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden z-10 bg-gray-900">
      {/* Background carousel */}
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`Slide ${i}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />
      ))}

      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Fixed Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-3xl md:text-6xl font-extrabold tracking-[.10em] mb-4">
          SAVE THE DATE
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center w-full">
          <div className="md:border-r-2 md:border-white pr-8 text-base md:text-lg opacity-90 font-light">
            Indana<br />Jodhpur
          </div>
          <div className="text-4xl md:text-3xl italic font-serif mx-6 opacity-100">
            Vipul & Patty
          </div>
          <div className="md:border-l-2 md:border-white pl-8 md:pl-10 text-base md:text-lg opacity-90 font-light">
            20 & 21 February<br />2026
          </div>
        </div>
      </div>

      {/* Wavy White Shape */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-32"
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