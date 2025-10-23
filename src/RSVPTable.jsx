import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function RSVPTable() {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRSVPs() {
      const snapshot = await getDocs(collection(db, "rsvps"));
      const list = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setRsvps(list);
      setLoading(false);
    }
    fetchRSVPs();
  }, []);

  if (loading) return <div>Loading RSVP data...</div>;

  return (
    <div className="p-4 overflow-auto bg-gray-200">
      <h2 className="text-2xl font-bold mb-6 md:mt-20 text-center text-white">RSVP List</h2>
      <table className="min-w-full border-collapse border border-gray-300 bg-pink-100">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Response</th>
            <th className="border border-gray-300 p-2">Guests</th>
            <th className="border border-gray-300 p-2">Country Code</th>
            <th className="border border-gray-300 p-2">Contact</th>
            <th className="border border-gray-300 p-2">Arrival Date</th>
            <th className="border border-gray-300 p-2">Arrival Time</th>
            <th className="border border-gray-300 p-2">Departure Date</th>
            <th className="border border-gray-300 p-2">Departure Time</th>
            <th className="border border-gray-300 p-2">Transport Mode</th>
            <th className="border border-gray-300 p-2">Arrival Train No</th>
            <th className="border border-gray-300 p-2">Departure Train No</th>
            <th className="border border-gray-300 p-2">Arrival Flight No</th>
            <th className="border border-gray-300 p-2">Departure Flight No</th>
            <th className="border border-gray-300 p-2">Local Address</th>
            <th className="border border-gray-300 p-2">Need Transport</th>
          </tr>
        </thead>
        <tbody>
          {rsvps.map((rsvp) => (
            <tr key={rsvp.id} className="even:bg-gray-50">
              <td className="border border-gray-300 p-2">{rsvp.name || "Anonymous"}</td>
              <td className="border border-gray-300 p-2">
                {rsvp.response === "yes"
                  ? "Attending"
                  : rsvp.response === "no"
                  ? "Declined"
                  : "N/A"}
              </td>
              <td className="border border-gray-300 p-2">{rsvp.numberofPeople || "1"}</td>
              <td className="border border-gray-300 p-2">{rsvp.countryCode || "-"}</td>
              <td className="border border-gray-300 p-2">{rsvp.contact || "-"}</td>
              <td className="border border-gray-300 p-2">{rsvp.arrivalDate || "-"}</td>
              <td className="border border-gray-300 p-2">{rsvp.arrivalTime || "-"}</td>
              <td className="border border-gray-300 p-2">{rsvp.departureDate || "-"}</td>
              <td className="border border-gray-300 p-2">{rsvp.departureTime || "-"}</td>
              <td className="border border-gray-300 p-2">{rsvp.transportMode || "-"}</td>
              <td className="border border-gray-300 p-2">{rsvp.arrivalTrainNo || "-"}</td>
              <td className="border border-gray-300 p-2">{rsvp.departureTrainNo || "-"}</td>
              <td className="border border-gray-300 p-2">{rsvp.arrivalFlightNo || "-"}</td>
              <td className="border border-gray-300 p-2">{rsvp.departureFlightNo || "-"}</td>
              <td className="border border-gray-300 p-2">{rsvp.address || "-"}</td>
              <td className="border border-gray-300 p-2">{rsvp.needTransport || "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RSVPTable;
