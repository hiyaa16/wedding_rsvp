import React, { useRef, useEffect, useState } from "react";
import RSVPForm from "./RSVPForm";
import { useNavigate } from "react-router-dom";
import bgImage from "./assets/image5.jpeg";

function RSVPSection() {
  const bgRef = useRef(null);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = bgImage;
  }, []);

  const handleOptionClick = (option) => {
    if (option === "upload") {
      navigate("/upload"); // ✅ this redirects to Upload.jsx
    } else {
      setSelectedOption("rsvp");
    }
  };

  return (
    <div className="relative w-full">
      {/* Background */}
      <div
        ref={bgRef}
        className="fixed top-0 left-0 w-full h-screen bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Foreground content */}
      <section
        id="rsvp"
        className="relative z-10 flex items-center justify-center min-h-screen px-4"
      >
        <div className="max-w-lg w-full text-center p-8 bg-transparent rounded-xl">
          {!selectedOption ? (
            <>
              <h2 className="text-4xl font-bold text-white mb-8">
                Choose an Option
              </h2>
              <div className="flex justify-center gap-6">
                <button
                  onClick={() => handleOptionClick("rsvp")}
                  className="px-6 py-3 border border-white text-white rounded-md hover:bg-white/20 transition"
                >
                  RSVP
                </button>
                <button
                  onClick={() => handleOptionClick("upload")}
                  className="px-6 py-3 border border-white text-white rounded-md hover:bg-white/20 transition"
                >
                  Upload Wedding Images
                </button>
              </div>
            </>
          ) : (
            <RSVPForm />
          )}
        </div>
      </section>
    </div>
  );
}

export default RSVPSection;
