import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const textColor = isHome ? "text-white hover:text-pink-600" : "text-black hover:text-pink-600";
  const mobileLinkColor = "text-black hover:text-pink-600";

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

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
    setMenuOpen(false); // close menu on link click
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 shadow-md ${isHome ? "bg-transparent" : "bg-white"}`}>
      <div className="mx-4 sm:mx-10 flex justify-between items-center py-4">
        <div className={`text-2xl font-bold ${isHome ? "text-white" : "text-black"}`}>
          #ViPattykiShaadi
        </div>
        {/* Hamburger menu button - visible on small screens */}
        <button
          className={`sm:hidden ${isHome ? "text-white" : "text-black"}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        {/* Links */}
        <ul
          className={`
            flex flex-col sm:flex-row gap-6 sm:gap-9
            absolute sm:static top-full left-0 w-full sm:w-auto
            ${menuOpen ? "bg-white p-6 rounded-b-lg shadow-lg" : "bg-transparent p-0"}
            transition-transform duration-300 ease-in-out
            transform ${menuOpen ? "translate-y-0" : "-translate-y-full"} sm:translate-y-0
            ${menuOpen ? "" : "hidden sm:flex"}
          `}
        >
          <li>
            <Link to="/" className={menuOpen ? mobileLinkColor : textColor} onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/our-story" className={menuOpen ? mobileLinkColor : textColor} onClick={() => setMenuOpen(false)}>
              Our Story
            </Link>
          </li>
          <li>
            <Link to="/gallery" className={menuOpen ? mobileLinkColor : textColor} onClick={() => setMenuOpen(false)}>
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/itinerary" className={menuOpen ? mobileLinkColor : textColor} onClick={() => setMenuOpen(false)}>
              Itinerary
            </Link>
          </li>
          <li>
            <a href="/#rsvp" onClick={scrollToRSVP} className={menuOpen ? mobileLinkColor : textColor}>
              RSVP
            </a>
          </li>
          <li>
            <Link to="/outfit-moodboard" className={menuOpen ? mobileLinkColor : textColor} onClick={() => setMenuOpen(false)}>
              Outfit Moodboard
            </Link>
          </li>
          <li>
  <Link to="/faq" className={menuOpen ? mobileLinkColor : textColor} onClick={() => setMenuOpen(false)}>
    FAQ
  </Link>
</li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;