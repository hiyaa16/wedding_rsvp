import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Existing Components
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import RSVPSection from "./RSVPSection";
import OurStory from "./OurStory";
import Gallery from "./Gallery";
import Itinerary from "./Itinerary";
import OutfitMoodboard from "./OutfitMoodboard";
import MusicPlayer from "./MusicPlayer";
import FAQSection from "./FAQSection";

// 🚀 NEW COMPONENTS FOR ADMIN DASHBOARD
import AdminAuth from "./AdminAuth.jsx";
 // Handles Login and conditionally shows the table
// Note: RSVPTable is imported inside AdminAuth, so you don't need it here.

function Home() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeroSection />
      <RSVPSection /> {/* RSVP background + form */}
    </>
  );
}

function App() {
  return (
    <Router>
      <MusicPlayer /> {/* Autoplay music on all pages */}
      <Navbar />
      {/* NOTE: You must ensure your 'Navbar.js' contains a <Link to="/dashboard">
          or similar element so users can navigate to the admin login page.
      */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/faq" element={<FAQSection />} />
        <Route path="/outfit-moodboard" element={<OutfitMoodboard />} />
        
        {/* 🔑 SECURE ADMIN ROUTE ADDED HERE */}
        {/* When a user goes to /dashboard, the AdminAuth component loads. */}
        {/* AdminAuth handles the login check and then displays the real-time table. */}
        <Route path="/dashboard" element={<AdminAuth />} />
      </Routes>
    </Router>
  );
}

export default App;
