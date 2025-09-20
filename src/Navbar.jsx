import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const textColor = isHome ? "text-white hover:text-pink-600" : "text-black hover:text-pink-600";

  const scrollToRSVP = (e) => {
    e.preventDefault();
    if (isHome) {
      const rsvpSection = document.getElementById("rsvp");
      if (rsvpSection) rsvpSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/";
      setTimeout(() => {
        const rsvpSection = document.getElementById("rsvp");
        if (rsvpSection) rsvpSection.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full ${isHome ? "bg-pink" : "bg-white"} shadow-md z-50`}>
      <div className="mx-10 flex justify-between items-center py-4">
        <div className={`text-2xl font-bold ${isHome ? "text-white" : "text-black"}`}>
          #vpattykishaadi
        </div>
        <ul className="flex gap-9">
          <li><Link to="/" className={textColor}>Home</Link></li>
          <li><Link to="/our-story" className={textColor}>Our Story</Link></li>
          <li><Link to="/gallery" className={textColor}>Gallery</Link></li>
          <li><Link to="/itinerary" className={textColor}>Itinerary</Link></li>
          <li><a href="/#rsvp" onClick={scrollToRSVP} className={textColor}>RSVP</a></li>
          <li><Link to="/outfit-moodboard" className={textColor}>Outfit Moodboard</Link></li>
          <li><Link to="/contact" className={textColor}>Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
