import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import RSVPSection from "./RSVPSection";
import OurStory from "./OurStory";
import Gallery from "./Gallery";
import Itinerary from "./Itinerary";
import OutfitMoodboard from "./OutfitMoodboard";
import MusicPlayer from "./MusicPlayer";
import FAQSection from "./FAQSection";
import ProtectedRoute from "./ProtectedRoute"; // add this import
import RSVPTable from "./RSVPTable"; // Import nayi table

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <HeroSection />
      <RSVPSection />
    </>
  );
}

function App() {
  return (
    <Router>
      <MusicPlayer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/faq" element={<FAQSection />} />
        <Route path="/outfit-moodboard" element={<OutfitMoodboard />} />
        <Route path="/rsvp-table" element={<ProtectedRoute><RSVPTable /></ProtectedRoute>} /> {/* Add new route */}
      </Routes>
    </Router>
  );
}

export default App;
