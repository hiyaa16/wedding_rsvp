import React, { useState } from "react";
import bgImage from "./assets/image2.jpeg";

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
  const [numPeople, setNumPeople] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [localAddress, setLocalAddress] = useState("");
  const [arrivalTrainNo, setArrivalTrainNo] = useState("");
  const [departureTrainNo, setDepartureTrainNo] = useState("");
  const [arrivalFlightNo, setArrivalFlightNo] = useState("");
  const [departureFlightNo, setDepartureFlightNo] = useState("");

  const handleContactChange = (e) => {
    const val = e.target.value;
    setContact(val);
    if (!/^\d{10}$/.test(val)) {
      setContactError("Enter a valid 10-digit number");
    } else {
      setContactError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contactError) return;

    const formData = {
      name,
      countryCode,
      contact,
      response,
      numberofPeople: numPeople,
      arrivalDate,
      arrivalTime,
      departureDate,
      departureTime,
      transportMode,
      Address: localAddress,
      needTransport,
      arrivalTrainNo,
      departureTrainNo,
      arrivalFlightNo,
      departureFlightNo,
    };

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/YOUR_WEB_APP_URL/exec",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.ok) {
        alert("RSVP submitted successfully!");
        setName("");
        setContact("");
        setResponse("");
        setNumPeople("");
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
      } else {
        alert("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting RSVP");
    }
  };

  return (
    <div
      className="w-full sm:w-[550px] mx-auto pt-14 pb-16 px-8 text-center rounded-t-full shadow-3xl flex flex-col items-center relative overflow-hidden mt-10 mb-10"
      style={{
        minHeight: "730px",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-transparent sm:bg-black/10 rounded-t-full"></div>

      <div className="relative z-10 w-full">
        <h2
          className="text-4xl mb-8 font-bold tracking-wide text-black drop-shadow-lg"
          style={{ fontFamily: "serif" }}
        >
          RSVP
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setResponse("yes")}
            className={`px-8 py-2 rounded-xl transition font-serif text-base shadow ${
              response === "yes"
                ? "bg-black text-white"
                : "bg-white text-black border border-black"
            }`}
          >
            Accept
          </button>
          <button
            onClick={() => setResponse("no")}
            className={`px-8 py-2 rounded-xl transition font-serif text-base shadow ${
              response === "no"
                ? "bg-black text-white"
                : "bg-white text-black border border-black"
            }`}
          >
            Decline
          </button>
        </div>

        {(response === "yes" || response === "no") && (
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 rounded-full font-serif bg-white bg-opacity-90 shadow border border-gray-300 focus:border-black focus:outline-none"
            />

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
              <div className="text-red-500 text-left ml-2 text-sm">
                {contactError}
              </div>
            )}

            {response === "yes" && (
              <>
                <input
                  type="number"
                  min="1"
                  placeholder="Number of People"
                  value={numPeople}
                  onChange={(e) => setNumPeople(e.target.value)}
                  required
                  className="w-full p-3 rounded-full font-serif bg-white bg-opacity-90 shadow border border-gray-300 focus:border-black focus:outline-none"
                />

                <div className="text-left pl-1 font-serif text-black text-sm font-semibold">
                  Enter arrival date and time
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

                <div className="text-left pl-1 font-serif text-black text-sm font-semibold">
                  Enter departure date and time
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
                      className="w-full p-3 rounded-full font-serif bg-white bg-opacity-90 shadow border border-gray-300 focus:border-black focus:outline-none mt-2"
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
                      className="w-full p-3 rounded-full font-serif bg-white bg-opacity-90 shadow border border-gray-300 focus:border-black focus:outline-none mt-2"
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

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-center justify-center mt-4">
                  <label className="font-serif text-black">
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
              className="w-40 mt-6 py-3 rounded-full bg-black text-white font-serif text-lg transition hover:bg-gray-700 disabled:opacity-50"
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