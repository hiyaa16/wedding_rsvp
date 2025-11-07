import React, { useState, useEffect } from "react";

import img1 from "/assets/1st.jpg";
import img8 from "/assets/image3.jpeg";
import img3 from "/assets/catfam.jpg";
import img4 from "/assets/dinner.jpg"
import img5 from "/assets/holdhand.jpg"
import img6 from "/assets/married.jpg"
import img7 from "/assets/main.jpg"
import img2 from "/assets/greendress.jpeg"

function getTimeRemaining(targetDate) {
  const now = new Date();
  const total = targetDate - now;
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
}

function HeroSection() {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];
  const [current, setCurrent] = useState(0);

  // Target: 21 February 2026, 00:00:00 (5:30 is IST)
  const targetDate = new Date("2026-02-21T06:00:00+05:30");
  const [countdown, setCountdown] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeRemaining(targetDate));
    }, 1000);
    // ✅ Syntax Error Fix: Added missing closing parenthesis here
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="relative w-full h-[90vh] h-screen overflow-hidden bg-black">
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
      <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-70 z-10"></div>

      {/* Centered Content - Changed 'justify-center' to 'justify-end' and added 'pb-24' (Padding Bottom) */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end text-center text-white px-4 sm:px-10 pb-24">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-[.10em] mb-5">
          SAVE THE DATE
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-3 sm:gap-6">
          <div className="sm:border-r-2 sm:border-white pr-0 sm:pr-8 text-sm  sm:text-base md:text-lg opacity-90 font-bold text-center sm:text-left">
            Indana
            <br />
            Jodhpur
          </div>
          <div className="text-2xl sm:text-3xl md:text-4xl italic font-serif mx-2 sm:mx-6 opacity-100">
            Vipul & Patty
          </div>
          <div className="sm:border-l-2 sm:border-white pl-0 sm:pl-8 text-sm sm:text-base md:text-lg opacity-90 font-bold text-center sm:text-right">
            20 & 21 February
            <br />
            2026
          </div>
        </div>

        {/* SMALLER COUNTDOWN BOX */}
        <div className="mt-6 flex flex-col items-center">
          <div className="bg-white bg-opacity-90 rounded-lg shadow-md px-3 py-2 flex gap-3 md:gap-5">
            <div className="flex flex-col items-center">
              <span className="text-lg md:text-2xl font-bold text-gray-800">{countdown.days}</span>
              <span className="text-[9px] md:text-xs font-semibold text-gray-500 mt-0.5 tracking-widest">DAYS</span>
            </div>
            <span className="text-base md:text-xl text-gray-600 flex items-end">:</span>
            <div className="flex flex-col items-center">
              <span className="text-lg md:text-2xl font-bold text-gray-800">{String(countdown.hours).padStart(2, "0")}</span>
              <span className="text-[9px] md:text-xs font-semibold text-gray-500 mt-0.5 tracking-widest">HOURS</span>
            </div>
            <span className="text-base md:text-xl text-gray-600 flex items-end">:</span>
            <div className="flex flex-col items-center">
              <span className="text-lg md:text-2xl font-bold text-gray-800">{String(countdown.minutes).padStart(2, "0")}</span>
              <span className="text-[9px] md:text-xs font-semibold text-gray-500 mt-0.5 tracking-widest">MINS</span>
            </div>
            <span className="text-base md:text-xl text-gray-600 flex items-end">:</span>
            <div className="flex flex-col items-center">
              <span className="text-lg md:text-2xl font-bold text-gray-800">{String(countdown.seconds).padStart(2, "0")}</span>
              <span className="text-[9px] md:text-xs font-semibold text-gray-500 mt-0.5 tracking-widest">SECONDS</span>
            </div>
          </div>
          <div className="mt-5 text-2xl sm:text-3xl font-semibold text-white drop-shadow-lg tracking-wider">to go...</div>
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

     
    </div>
  );
}

export default HeroSection;
