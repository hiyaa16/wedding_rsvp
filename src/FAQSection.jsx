import React, { useState } from "react";
// 1. ✅ Import your background image here
import faqBg from "/assets/image5.jpeg"; // <--- Make sure this path is correct

const faqData = [
  {
    question: "Are accommodations provided for the wedding?",
    answer:
      "Yes! All guests will have accommodations booked at the venue for two nights — February 20th and 21st.",
  },
  {
    question: "When should I arrive at the venue?",
    answer:
      "Guests should plan to arrive by the February 20th to settle in before the afternoon's festivities.",
  },
  {
    question: "Is transportation provided to and from the airport?",
    answer:
      "Yes, we are arranging transportation for all guests to and from Jodhpur Airport (JDH). Please share your flight details via the form present in this site.",
  },
  {
    question: "Do you need my flight information?",
    answer:
      "Yes! We have send out a form in this website to collect everyone’s travel details. This will help us coordinate your arrivals and ensure all necessary information is provided for a smooth experience.",
  },
  {
    question: "Is there a dress code?",
    answer:
      "Yes, there is a dress code for each event ;) please refer to the wardrobe planner and style guide for further details",
  },
  {
    question: "What can I do while I'm in Jodhpur?",
    answer: [
      "🏰 Mehrangarh Fort: One of the largest forts in India, offering panoramic views, the Sheesh Mahal, a museum, and zip-lining adventures.",
      "👑 Umaid Bhawan Palace: A blend of Indian and European architecture, featuring a museum, a vintage car collection, and a luxury hotel.",
      "🏙 The Blue City (Old Town): Wander through narrow alleys painted in vivid blue. Discover stepwells, local eateries, and artisan shops.",
      "⛲ Jaswant Thada: A white marble cenotaph surrounded by peaceful gardens and a lake backdrop.",
      "🏜 Camel & Jeep Safari in the Thar Desert: Enjoy camel rides at sunset, jeep safaris, Bishnoi village tours, wildlife spotting, and traditional Rajasthani dinners under the stars."
    ]
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (idx) => setOpenIndex(idx === openIndex ? null : idx);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `url(${faqBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 0",
      }}
    >
      {/* Overlay for readability */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "#44475a", // subtle color for overlay for even more readability
          opacity: 0.78,
          zIndex: 1,
        }}
      />
      <h2
        style={{
          color: "white",
          fontFamily: "inherit",
          marginBottom: 32,
          marginTop: 40,
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          fontSize: "2.5rem",
          padding: "0 10px",
        }}
      >
        Frequently Asked Questions
      </h2>
      <div 
        style={{ 
          width: "90%",
          maxWidth: 900, 
          position: "relative", 
          zIndex: 2,
          paddingBottom: "40px"
        }}
      >
        {faqData.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: "#152243ff",
              borderRadius: 12,
              marginBottom: 16,
              boxShadow: "0 1px 8px rgba(0,0,0,0.3)",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => handleToggle(idx)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                color: "white",
                fontWeight: 700,
                fontSize: "1.25rem",
                padding: "22px 24px",
                borderRadius: 12,
                textAlign: "left",
                cursor: "pointer",
                outline: "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {item.question}
              <span 
                style={{ 
                  fontSize: "1.5rem", 
                  transform: openIndex === idx ? "rotate(180deg)" : "rotate(0deg)", 
                  transition: "transform 0.3s ease",
                  marginLeft: "10px"
                }}
              >
                &#9660;
              </span>
            </button>
            {openIndex === idx && (
              <div
                style={{
                  color: "#f3f1f1ff",
                  fontSize: "1.1rem",
                  padding: "0 28px 18px 28px",
                  fontFamily: "inherit",
                  animation: "fadeIn 0.3s forwards",
                }}
              >
                {Array.isArray(item.answer) ? (
                  <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
                    {item.answer.map((line, i) => (
                      <li key={i} style={{ marginBottom: 8, listStyle: "disc" }}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  item.answer || <span style={{ color: "#7a7979ff" }}>Answer coming soon.</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Global fadeIn animation (can be moved to a CSS file) */}
      <style>{`
       @keyframes fadeIn {
         from { opacity: 0; transform: translateY(-10px); }
         to { opacity: 1; transform: translateY(0); }
       }
     `}</style>
    </div>
  );
}

export default FAQSection;
