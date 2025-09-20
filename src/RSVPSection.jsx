import React from "react";
import RSVPForm from "./RSVPForm";
import bgImage from "./assets/image5.jpeg";

function RSVPSection() {
  return (
    <section
      id="rsvp"
      className="relative w-full min-h-screen flex items-center justify-center px-4"
    >
      {/* Fixed background */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* RSVP Form */}
      <div className="relative z-10 max-w-lg w-full text-center p-6 sm:p-8 rounded-lg bg-white/90 shadow-lg">
        <RSVPForm />
      </div>
    </section>
  );
}

export default RSVPSection;
