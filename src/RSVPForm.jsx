import React, { useState, useEffect } from "react";
import bgImage from "./assets/image5.jpeg";
import { collection, addDoc } from "firebase/firestore";
import bg from "./assets/rsvpbg.jpg";
import { db } from "./firebase";

const COUNTRY_CODES = [
  { code: "+91", label: "India" },
  { code: "+1", label: "USA" },
  { code: "+44", label: "UK" },
  { code: "+971", label: "UAE" },
  { code: "+61", label: "Australia" },
];

function RSVPForm() {
  const [response, setResponse] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [contact, setContact] = useState("");
  const [contactError, setContactError] = useState("");
  const [transportMode, setTransportMode] = useState("");
  const [needTransport, setNeedTransport] = useState("");
  const [name, setName] = useState("");
  const [numAdults, setNumAdults] = useState(0);
  const [numKids, setNumKids] = useState(0);
  const [guestNames, setGuestNames] = useState([]);
  const [arrivalDate, setArrivalDate] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [localAddress, setLocalAddress] = useState("");
  const [arrivalTrainNo, setArrivalTrainNo] = useState("");
  const [departureTrainNo, setDepartureTrainNo] = useState("");
  const [arrivalFlightNo, setArrivalFlightNo] = useState("");
  const [departureFlightNo, setDepartureFlightNo] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const desktopImg = new window.Image();
    desktopImg.src = bgImage;

    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dynamic guest name handling
  useEffect(() => {
    const totalGuests = Number(numAdults) + Number(numKids);
    const updatedNames = [...guestNames];

    if (totalGuests > guestNames.length) {
      for (let i = guestNames.length; i < totalGuests; i++) {
        updatedNames.push("");
      }
    } else if (totalGuests < guestNames.length) {
      updatedNames.splice(totalGuests);
    }
    setGuestNames(updatedNames);
  }, [numAdults, numKids]);

  const handleGuestNameChange = (index, value) => {
    const updated = [...guestNames];
    updated[index] = value;
    setGuestNames(updated);
  };

  const handleContactChange = (e) => {
    const val = e.target.value;
    setContact(val);
    setContactError(
      val === "" || /^\d{10}$/.test(val) ? "" : "Enter a valid 10-digit number"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contactError) return;

    const formData = {
      name,
      countryCode,
      contact,
      response,
      adults: numAdults,
      kids: numKids,
      guestNames,
      arrivalDate,
      arrivalTime,
      departureDate,
      departureTime,
      transportMode,
      address: localAddress,
      needTransport,
      arrivalTrainNo,
      departureTrainNo,
      arrivalFlightNo,
      departureFlightNo,
    };

    try {
      await addDoc(collection(db, "rsvps"), formData);
      setSubmitted(true);

      setName("");
      setContact("");
      setResponse("");
      setNumAdults(0);
      setNumKids(0);
      setGuestNames([]);
      setArrivalDate("");
      setArrivalTime("");
      setDepartureDate("");
      setDepartureTime("");
      setTransportMode("");
      setLocalAddress("");
      setNeedTransport("");
      setArrivalTrainNo("");
      setDepartureTrainNo("");
      setArrivalFlightNo("");
      setDepartureFlightNo("");
    } catch (err) {
      console.error("Error saving RSVP:", err);
      alert("Error saving RSVP. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="w-full sm:w-[550px] mx-auto p-8 text-center shadow-3xl mt-10 mb-10 bg-white opacity-90 rounded-xl">
        <h2 className="text-3xl font-bold text-gray-800">
          Thank you for your RSVP!
        </h2>
      </div>
    );
  }

  return (
    <div
      className="w-full sm:w-[550px] mx-auto px-8 text-center shadow-3xl flex flex-col items-center relative overflow-hidden mt-10 mb-10 rounded-t-full transition-all duration-500 ease-in-out bg-cover bg-center bg-no-repeat"
      style={{
        minHeight: isMobile
          ? response
            ? "700px"
            : "750px"
          : response
          ? "1100px"
          : "900px",
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-20 rounded-t-full"></div>

      <div className="relative z-10 w-full">
        <h2
          className="text-4xl sm:mb-10 mt-10 font-bold tracking-wide text-white drop-shadow-lg"
          style={{ fontFamily: "serif" }}
        >
          RSVP
        </h2>

        <div className="flex justify-center gap-6 mb-12">
          <button
            onClick={() => setResponse("yes")}
            className={`px-6 py-2 sm:px-8 sm:py-2 rounded-xl transition font-serif text-base shadow mt-20 ${
              response === "yes"
                ? "bg-white text-black"
                : "bg-transparent text-white border border-white hover:bg-white hover:text-black"
            }`}
          >
            Accept
          </button>
          <button
            onClick={() => setResponse("no")}
            className={`px-6 py-2 sm:px-8 sm:py-2 rounded-xl transition font-serif text-base shadow mt-20 ${
              response === "no"
                ? "bg-white text-black"
                : "bg-transparent text-white border border-white hover:bg-white hover:text-black"
            }`}
          >
            Decline
          </button>
        </div>

        {(response === "yes" || response === "no") && (
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 rounded-full font-serif bg-white bg-opacity-90 shadow border border-gray-300 focus:border-black focus:outline-none mt-2"
            />

            {/* Contact */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 items-center">
              <select
                className="w-full sm:w-auto p-3 rounded-full sm:rounded-l-full sm:rounded-r-none font-serif bg-white bg-opacity-90 shadow border sm:border-r-0 border-gray-300 focus:border-black focus:outline-none"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                required
              >
                {COUNTRY_CODES.map(({ code, label }) => (
                  <option key={code} value={code}>
                    {code} {label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Contact Number"
                maxLength={10}
                value={contact}
                onChange={handleContactChange}
                required
                className="flex-1 w-full p-3 rounded-full sm:rounded-r-full sm:rounded-l-none font-serif bg-white bg-opacity-90 shadow border border-gray-300 focus:border-black focus:outline-none"
              />
            </div>
            {contactError && (
              <div className="text-red-400 text-left ml-2 text-sm">
                {contactError}
              </div>
            )}

            {/* YES Response Fields */}
            {response === "yes" && (
              <>
                {/* Adults + Kids */}
                <div className="text-left font-serif text-white text-sm font-semibold">
  Number of Guests
</div>

<div className="flex gap-4">
  {/* Adults */}
  <div className="flex flex-col w-1/2">
    <label className="text-xs text-white font-serif mb-1">Adults</label>
    <input
      type="number"
      min="0"
      placeholder="0"
      value={numAdults}
      onChange={(e) => {
        const adults = parseInt(e.target.value) || 0;
        setNumAdults(adults);
        updateGuestNames(adults, numKids);
      }}
      className="w-full p-3 rounded-full font-serif bg-white bg-opacity-90 shadow border border-gray-300 focus:border-black focus:outline-none"
    />
  </div>

  {/* Kids */}
  <div className="flex flex-col w-1/2">
    <label className="text-xs text-white font-serif mb-1">Kids</label>
    <input
      type="number"
      min="0"
      placeholder="0"
      value={numKids}
      onChange={(e) => {
        const kids = parseInt(e.target.value) || 0;
        setNumKids(kids);
        updateGuestNames(numAdults, kids);
      }}
      className="w-full p-3 rounded-full font-serif bg-white bg-opacity-90 shadow border border-gray-300 focus:border-black focus:outline-none"
    />
  </div>
</div>

{/* Dynamic Guest Names */}
{guestNames.length > 0 && (
  <div className="space-y-3 mt-3">
    {guestNames.map((guest, i) => {
      const label =
        i < numAdults ? `Adult ${i + 1} Name` : `Kid ${i - numAdults + 1} Name`;
      return (
        <input
          key={i}
          type="text"
          placeholder={label}
          value={guest}
          onChange={(e) => handleGuestNameChange(i, e.target.value)}
          className="w-full p-3 rounded-full font-serif bg-white bg-opacity-90 shadow border border-gray-300 focus:border-black focus:outline-none"
          required
        />
      );
    })}
  </div>
)}


                {/* Arrival */}
                <div className="text-left pl-1 font-serif text-white text-sm font-semibold">
                  Enter arrival date and time in Jodhpur
                </div>
                <div className="flex gap-4 flex-col sm:flex-row">
                  <input
                    type="date"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    required
                    className="flex-1 w-full p-3 rounded-full font-serif bg-white bg-opacity-90 shadow border border-gray-300 focus:border-black focus:outline-none"
                  />
                  <input
                    type="time"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    required
                    className="flex-1 w-full p-3 rounded-full font-serif bg-white bg-opacity-90 shadow border border-gray-300 focus:border-black focus:outline-none"
                  />
                </div>

                {/* Departure */}
                <div className="text-left pl-1 font-serif text-white text-sm font-semibold">
                  Enter departure date and time from Jodhpur
                </div>
                <div className="flex gap-4 flex-col sm:flex-row">
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    required
                    className="flex-1 w-full p-3 rounded-full font-serif bg-white bg-opacity-90 shadow border border-gray-300 focus:border-black focus:outline-none"
                  />
                  <input
                    type="time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    required
                    className="flex-1 w-full p-3 rounded-full font-serif bg-white bg-opacity-90 shadow border border-gray-300 focus:border-black focus:outline-none"
                  />
                </div>

                {/* Mode of Transport */}
                <select
                  className="w-full p-3 rounded-full font-serif bg-white bg-opacity-90 shadow border border-gray-300 focus:border-black focus:outline-none"
                  value={transportMode}
                  onChange={(e) => setTransportMode(e.target.value)}
                  required
                >
                  <option value="">Mode of Transportation</option>
                  <option value="railway">Railway Station</option>
                  <option value="airport">Airport</option>
                  <option value="local">Local</option>
                </select>

                {/* Transport details */}
                {transportMode === "railway" && (
                  <>
                    <input
                      type="text"
                      placeholder="Arrival Train No."
                      value={arrivalTrainNo}
                      onChange={(e) => setArrivalTrainNo(e.target.value)}
                      required
                      className="w-full p-3 rounded-full font-serif bg-white bg-opacity-90 shadow border border-gray-300 focus:border-black focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Departure Train No."
                      value={departureTrainNo}
                      onChange={(e) => setDepartureTrainNo(e.target.value)}
                      required
                      className="w-full p-3 rounded-full font-serif bg-white bg-opacity-90 shadow border border-gray-300 focus:border-black focus:outline-none"
                    />
                  </>
                )}

                {transportMode === "airport" && (
                  <>
                    <input
                      type="text"
                      placeholder="Arrival Flight No."
                      value={arrivalFlightNo}
                      onChange={(e) => setArrivalFlightNo(e.target.value)}
                      required
                      className="w-full p-3 rounded-full font-serif bg-white bg-opacity-90 shadow border border-gray-300 focus:border-black focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Departure Flight No."
                      value={departureFlightNo}
                      onChange={(e) => setDepartureFlightNo(e.target.value)}
                      required
                      className="w-full p-3 rounded-full font-serif bg-white bg-opacity-90 shadow border border-gray-300 focus:border-black focus:outline-none"
                    />
                  </>
                )}

                {transportMode === "local" && (
                  <input
                    type="text"
                    placeholder="Address"
                    value={localAddress}
                    onChange={(e) => setLocalAddress(e.target.value)}
                    required
                    className="w-full p-3 rounded-full font-serif bg-white bg-opacity-90 shadow border border-gray-300 focus:border-black focus:outline-none"
                  />
                )}

                {/* Need Transport */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-center justify-center mt-4 text-white">
                  <label className="font-serif">
                    Need transportation?
                  </label>
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      name="needTransport"
                      value="yes"
                      checked={needTransport === "yes"}
                      onChange={() => setNeedTransport("yes")}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      name="needTransport"
                      value="no"
                      checked={needTransport === "no"}
                      onChange={() => setNeedTransport("no")}
                    />
                    <span>No</span>
                  </label>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={!!contactError}
              className="w-40 mt-6 py-3 rounded-full bg-black text-white font-serif text-lg transition hover:bg-gray-300 disabled:opacity-50"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default RSVPForm;
