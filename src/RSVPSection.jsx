import React, { useRef, useEffect } from "react";
import RSVPForm from "./RSVPForm";
import bgImage from "./assets/image5.jpeg";

function RSVPSection() {
  const bgRef = useRef(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = bgImage;
    img.onload = () => console.log("RSVP background image loaded:", bgImage);
    img.onerror = () => console.error("Failed to load RSVP background image:", bgImage);
  }, []);

  return (
    <div className="relative w-full">
      <div
        ref={bgRef}
        className="fixed top-0 left-0 w-full h-screen bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="h-screen"></div>

      <section id="rsvp" className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-lg w-full text-center p-8">
          <RSVPForm />
        </div>
      </section>
    </div>
  );
}

export default RSVPSection;
