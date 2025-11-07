import React, { useRef, useEffect } from "react";
import RSVPForm from "./RSVPForm";
import bgImage from "/assets/image5.jpeg";

function RSVPSection() {
  const bgRef = useRef(null);

  useEffect(() => {
    // This is good practice for preloading, we'll keep it.
    const img = new window.Image();
    img.src = bgImage;
    img.onload = () => console.log("RSVP background image loaded:", bgImage);
    img.onerror = () => console.error("Failed to load RSVP background image:", bgImage);
  }, []);

  return (
    <div className="relative w-full">
      {/* 1. Fixed Background Container */}
      <div
        ref={bgRef}
        // Tailwind classes: fixed top-0 left-0 w-full h-screen ensure it covers the viewport
        className="fixed top-0 left-0 w-full h-screen bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* 2. Content Section - This is the main change.
           We removed the extra <div className="h-screen"></div> which was causing the scroll.
           The section now uses min-h-screen to ensure it covers the viewport, 
           and it's absolutely positioned or uses padding/margin to position itself over 
           the fixed background (thanks to relative/z-10).
      */}
      <section 
        id="rsvp" 
        // Use 'flex items-center justify-center min-h-screen' to center the form vertically and horizontally.
        // 'relative z-10' keeps it above the fixed background.
        className="relative z-10 flex items-center justify-center min-h-screen px-4"
      >
        <div className="max-w-lg w-full text-center p-8">
          {/* This ensures the RSVPForm takes up the center of the screen */}
          <RSVPForm />
        </div>
      </section>
    </div>
  );
}

export default RSVPSection;