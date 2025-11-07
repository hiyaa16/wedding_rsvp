import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Apna logo image import karo (agar local file hai):
 import LogoImg from "/assets/logo.png"; // <-- Apni logo image ka actual path lagao

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const desktopTextColor = "text-white hover:text-pink-400 transition duration-300";
  const mobileLinkColor = "text-gray-800 hover:text-pink-600 transition duration-300";

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

 return (
    <nav className="fixed top-0 left-0 w-full z-50 shadow-lg bg-[#001926]">
      <div className="mx-4 sm:mx-6 flex justify-between items-center py-4">
        <Link
          to="/"
          className={`flex items-center gap-1 text-2xl font-bold font-serif text-white hover:text-pink-400 transition duration-300`}
          onClick={() => setMenuOpen(false)}
        >
          <img src={LogoImg} alt="Logo" className="h-8 w-10 object-contain" />
          #PattyPulledVipul
        </Link>

        {/* Hamburger Menu (Mobile only) */}
        <button
          className="sm:hidden text-white p-2 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Navigation Links */}
        <ul
          className={`
            flex flex-col sm:flex-row gap-6 sm:gap-9 font-serif
            absolute sm:static top-full left-0 w-full sm:w-auto
            ${menuOpen ? "bg-white p-6 rounded-b-lg shadow-2xl" : "bg-transparent p-0"}
            transition-all duration-300 ease-in-out
            transform ${menuOpen ? "translate-y-0" : "-translate-y-full"} sm:translate-y-0
            ${menuOpen ? "" : "hidden sm:flex"}
          `}
        >
          <li>
            <Link
              to="/"
              className={menuOpen ? mobileLinkColor : desktopTextColor}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/our-story"
              className={menuOpen ? mobileLinkColor : desktopTextColor}
              onClick={() => setMenuOpen(false)}
            >
              Our Story
            </Link>
          </li>
          <li>
            <Link
              to="/gallery"
              className={menuOpen ? mobileLinkColor : desktopTextColor}
              onClick={() => setMenuOpen(false)}
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              to="/itinerary"
              className={menuOpen ? mobileLinkColor : desktopTextColor}
              onClick={() => setMenuOpen(false)}
            >
              Itinerary
            </Link>
          </li>
          <li>
            <Link
              to="/rsvp"
              className={menuOpen ? mobileLinkColor : desktopTextColor}
              onClick={() => setMenuOpen(false)}
            >
              RSVP
            </Link>
          </li>
          <li>
            <Link
              to="/outfit-moodboard"
              className={menuOpen ? mobileLinkColor : desktopTextColor}
              onClick={() => setMenuOpen(false)}
            >
              Outfit Moodboard
            </Link>
          </li>
          <li>
            <Link
              to="/faq"
              className={menuOpen ? mobileLinkColor : desktopTextColor}
              onClick={() => setMenuOpen(false)}
            >
              FAQ
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
