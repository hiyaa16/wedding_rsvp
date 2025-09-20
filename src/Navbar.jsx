import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const textColor = isHome
    ? "text-white hover:text-pink-600"
    : "text-black hover:text-pink-600";

  const [isOpen, setIsOpen] = useState(false); // for mobile menu

  // Scroll to RSVP section
  const scrollToRSVP = (e) => {
    e.preventDefault();

    if (isHome) {
      const rsvpSection = document.getElementById("rsvp");
      if (rsvpSection) {
        rsvpSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = "/";
      setTimeout(() => {
        const rsvpSection = document.getElementById("rsvp");
        if (rsvpSection) {
          rsvpSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full ${
        isHome ? "bg-pink" : "bg-white"
      } shadow-md z-50`}
    >
      <div className="mx-4 sm:mx-10 flex justify-between items-center py-4">
        <div className={`text-2xl font-bold ${isHome ? "text-white" : "text-black"}`}>
          #vpattykishaadi
        </div>

        {/* Hamburger menu for mobile */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`focus:outline-none ${isHome ? "text-white" : "text-black"}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Menu */}
        <ul
          className={`flex-col sm:flex-row sm:flex gap-6 sm:gap-9 absolute sm:static top-full left-0 w-full sm:w-auto bg-pink sm:bg-transparent transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-96 py-4" : "max-h-0"
          }`}
        >
          <li>
            <Link to="/" className={textColor} onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/our-story" className={textColor} onClick={() => setIsOpen(false)}>
              Our Story
            </Link>
          </li>
          <li>
            <Link to="/gallery" className={textColor} onClick={() => setIsOpen(false)}>
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/itinerary" className={textColor} onClick={() => setIsOpen(false)}>
              Itinerary
            </Link>
          </li>
          <li>
            <a href="/#rsvp" onClick={(e) => { scrollToRSVP(e); setIsOpen(false); }} className={textColor}>
              RSVP
            </a>
          </li>
          <li>
            <Link to="/outfit-moodboard" className={textColor} onClick={() => setIsOpen(false)}>
              Outfit Moodboard
            </Link>
          </li>
          <li>
            <Link to="/contact" className={textColor} onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
