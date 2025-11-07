import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Component imports
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import RSVPSection from "./RSVPSection";
import OurStory from "./OurStory";
import Gallery from "./Gallery";
import Itinerary from "./Itinerary";
import OutfitMoodboard from "./OutfitMoodboard";
import MusicPlayer from "./MusicPlayer";
import FAQSection from "./FAQSection";
import ProtectedRoute from "./ProtectedRoute"; 
// import RSVPTable from "./RSVPTable"; 
import AdminButton from "./AdminButton";
import Upload from "./Upload";
// Note: AdminDashboard component is imported/rendered within ProtectedRoute

function Home() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <HeroSection />;
}

function App() {
  return (
    <Router>
      <MusicPlayer />
      <AdminButton />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/faq" element={<FAQSection />} />
        <Route path="/outfit-moodboard" element={<OutfitMoodboard />} />
        <Route path="/rsvp" element={<RSVPSection />} />
        <Route path="/upload" element={<Upload />} />
        
        {/* Admin Route: ProtectedRoute handles login and renders AdminDashboard */}
        <Route path="/admin" element={<ProtectedRoute />} />
      </Routes>
    </Router>
  );
}

export default App;