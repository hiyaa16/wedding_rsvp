import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import RSVPSection from "./RSVPSection";
import OurStory from "./OurStory";
import Gallery from "./Gallery";
import Itinerary from "./Itinerary";
import Contact from "./Contact";
import OutfitMoodboard from "./OutfitMoodboard";
import MusicPlayer from "./MusicPlayer"; // ✅ Autoplay music
import TestGetRequest from "./TestGetRequest"; // ✅ Temporary GET test component

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test-get" element={<TestGetRequest />} /> {/* Temporary GET test */}
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/outfit-moodboard" element={<OutfitMoodboard />} />
      </Routes>
    </Router>
  );
}

export default App;
