import React, { useState } from "react";

const faqData = [
  {
    question: "Are accommodations provided for the wedding?",
    answer:
      "Yes! All guests will have accommodations booked at the venue for two nights — November 26th and 27th.",
  },
  {
    question: "When should I arrive at the venue?",
    answer:
      "",
  },
  {
    question: "Is transportation provided to and from the airport?",
    answer:
      "",
  },
  {
    question: "Do you need my flight information?",
    answer:
      "Yes! We’ll send out a form before the wedding to collect everyone’s travel details and passport information (required for international guests). This will help us coordinate your arrivals and ensure all necessary information is provided for a smooth experience.",
  },
  {
    question: "Is there a dress code?",
    answer:
      "",
  },
  {
    question: "What can I do while I'm in Jodhpur?",
    answer:
      "",
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
        background: "#232B39dd",
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2
        style={{
          color: "white",
          fontFamily: "inherit",
          marginBottom: 32,
          marginTop: 40,
          textAlign: "center",
        }}
      >
        Frequently Asked Questions
      </h2>
      <div style={{ width: "80%", maxWidth: 900 }}>
        {faqData.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: "#344055",
              borderRadius: 12,
              marginBottom: 16,
              boxShadow: "0 1px 8px #0003",
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
                fontSize: 22,
                padding: "22px 24px",
                borderRadius: 12,
                textAlign: "left",
                cursor: "pointer",
                outline: "none",
              }}
            >
              {item.question}
            </button>
            {openIndex === idx && (
              <div
                style={{
                  color: "#e6e6e6",
                  fontSize: 18,
                  padding: "0 28px 18px 28px",
                  fontFamily: "inherit",
                  animation: "fadeIn 0.3s",
                }}
              >
                {item.answer || (
                  <span style={{ color: "#bbb" }}>Answer coming soon.</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQSection;
