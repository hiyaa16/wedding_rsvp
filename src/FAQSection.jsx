import React, { useState } from "react";
// 1. ✅ Import your background image here
import faqBg from "/assets/image5.jpeg"; // <--- Make sure this path is correct

const faqData = [
  {
    question: "Do I need a visa to visit India?",
    answer: "Yes, all international guests will need an E-Visa to enter India. Please apply at least 1-2 weeks before departure. Depending on length of stay (30 days–5 year options), Visas are $25–$80.",
  },
  {
    question: "Which hotel/property will guests be staying at?",
    answer: [
      "All guests will have pre-booked accommodation at the Indana Palace, Jodhpur where all wedding events will take place.",
      "There will be no need to book your own room—it has already been reserved and comped for your party for the two days.",
      "Address: Benayakiya Road, Shikargarh, Jodhpur, Rajasthan 342015, India."
    ],
  },
  {
    question: "What is the best way to get to Jodhpur?",
    answer: [
      "For our international guests, it is best to arrive at either Mumbai (BOM) or New Delhi (DEL) airport, and then take a domestic flight to Jodhpur (JDH).",
      "Our wedding team will reach out for your arrival details as transportation will be provided to the hotel once you arrive in Jodhpur. Our hotel is located around 10 minutes from the airport.",
      "We recommend arriving around 10 AM in Jodhpur on February 20th, 2026 as our first event begins at 12 PM. Check-out will be after breakfast on February 22nd, 2026."
    ],
  },
  {
    question: "What can I do while I'm in Jodhpur?",
    answer: [
      "🏰 Mehrangarh Fort: One of the largest forts in India, offering panoramic views, the Sheesh Mahal, a museum, and zip-lining adventures.",
      "👑 Umaid Bhawan Palace: A blend of Indian and European architecture, featuring a museum, a vintage car collection, and a luxury hotel.",
      "🏙 The Blue City (Old Town): Wander through narrow alleys painted in vivid blue. Discover stepwells, local eateries, and artisan shops.",
      "⛲ Jaswant Thada: A white marble cenotaph surrounded by peaceful gardens and a lake backdrop.",
      "🏜 Camel & Jeep Safari in the Thar Desert: Enjoy camel rides at sunset, jeep safaris, Bishnoi village tours, wildlife spotting, and traditional Rajasthani dinners under the stars."
    ],
  },
  {
    question: "Where can I find the detailed schedule and timings for all events?",
    answer: "Please refer to the itinerary tab on our website. There will also be copies of the itinerary in every guest’s room.",
  },
  {
    question: "Do you have any recommendations on where we can buy our outfits?",
    answer: [
      "You can refer to our wardrobe planner for guidance on color scheme and dress code. Here are a few suggestions:",
      "Online: https://www.lashkaraa.com, https://www.kalkifashion.com, https://www.mirraw.com/",
      "Stores in Mumbai:",
      "— Seasons India (Women) – 175, Plaza Asiad Ground Floor Junction of S.V. Road and Santacruz Railway Station Rd, Santacruz (West), Mumbai, Maharashtra. Phone: 022 6145 9999",
      "— Raas (Ladies) – SV Road, Saraswat Nagar, Willingdon, Santacruz (West), Mumbai, Phone: +91-70390 63976",
      "— Dressline (Ladies) – Victoria Plaza, S.V. Road, Santacruz West, Mumbai. Phone: 070458 88479",
      "— Panhiar (by Pravin Gada) (Women & Men) – Swami Vivekananda Rd, opposite Podar School, Willingdon, Santacruz (West), Mumbai. Womens: +91-9820036346 / Mens: +91-9820393180",
      "— Manyavar & Mohey (Men & Women) – Le Magasin, SV Road, Santacruz West, Mumbai. Phone: +91-8037002624",
      "— Tasva (Men) – SV Road, Opposite Asha Parekh Hospital, Santacruz West, Mumbai. Phone: +91-9167165675"
    ],
  },
  {
    question: "We are spending a few days in Mumbai, what is there to do?",
    answer: [
      "Places to visit: Gateway of India, The Taj Mahal Palace, Haji Ali Dargah, Chhatrapati Shivaji Maharaj Terminus, Shree Siddhivinayak Temple, Chhatrapati Shivaji Maharaj Vastu Sangrahalaya.",
      "Places to eat: The Bombay Canteen, Ekaa, Masque, Shree Thaker Bhojanalay, Leopold Cafe, Aram Vada Pav, Bastian - At The Top, Cafe Madras, Elco Panipuri."
    ],
  },
  {
    question: "Which states/cities should I visit while I am in India?",
    answer: "There are so many things to do in India, but some places we recommend visiting are Jaipur, Udaipur, Mumbai, Kerala, and Agra (Taj Mahal).",
  },
  {
    question: "Who should I contact if I have questions before the wedding?",
    answer: [
      "You can contact our wedding team on WhatsApp:",
      "Event Planner: +91 7742735994",
      "For further queries & personal assistance: Call +91-9987953308"
    ],
  },
  // ...keep your previous questions if you want!
  
  {
    question: "When should I arrive at the venue?",
    answer: "Guests should plan to arrive by the February 20th to settle in before the afternoon's festivities.",
  },
  {
    question: "Is transportation provided to and from the airport?",
    answer: "Yes, we are arranging transportation for all guests to and from Jodhpur Airport (JDH). Please share your flight details via the form present in this site.",
  },
  {
    question: "Do you need my flight information?",
    answer: "Yes! We have sent out a form in this website to collect everyone’s travel details. This will help us coordinate your arrivals and ensure all necessary information is provided for a smooth experience.",
  },
  {
    question: "Is there a dress code?",
    answer: "Yes, there is a dress code for each event ;) please refer to the wardrobe planner and style guide for further details",
  }
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
