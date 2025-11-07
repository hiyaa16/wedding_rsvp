import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { db } from './firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";

// Milestone images: Use direct string path (public/assets/s1.jpg etc)
const defaultMilestones = [
  {
    year: "2018",
    title: "The First Hello",
    location: "München, Germany",
    story: "They first met on February 14, 2018, in a university dorm. What started as casual hellos in the hallway slowly turned into longer conversations. Neither knew it then, but this chance encounter would change everything.",
    image: "/assets/s1.jpg",
  },
  {
    year: "2019",
    title: "Coffee Dates & Deep Talks",
    location: "Munich, Germany",
    story: "By 2019, those hallway hellos had become regular coffee dates. They discovered shared dreams, laughed at the same jokes, and found comfort in each other's company. What began as friendship was quietly becoming something more.",
    image: "/assets/s2.jpg",
  },
  {
    year: "2020",
    title: "Love in the Time of Lockdown",
    location: "Virtual dates across time zones",
    story: "When COVID-19 hit, distance became their biggest challenge. Video calls replaced coffee dates, and timezone differences meant stolen moments whenever they could. But love found a way—every call, every message, every 'goodnight' across continents only made their bond stronger.",
    image: "/assets/s3.jpg",
  },
  {
    year: "2021",
    title: "Finally Together Again",
    location: "Germany & Beyond",
    story: "As the world slowly reopened, they made up for lost time. From exploring Germany to holiday trips, every moment together felt like a celebration. They had survived distance; now they were ready to build a future.",
    image: "/assets/s4.jpg",
  },
  {
    year: "2022",
    title: "Adventures & New Beginnings",
    location: "California & Beyond",
    story: "Life took them to new places and new adventures. From California beaches to new experiences, they tackled everything as a team. Every challenge, every joy—they faced it together, stronger than ever.",
    image: "/assets/s5.jpg",
  },
  {
    year: "2023",
    title: "The Beginning of Forever",
    location: "India",
    story: "Patty got down on one knee and asked Vipul to spend forever together. With tears of joy and hearts full of love, they said yes to a lifetime of adventures, laughter, and endless love. The best chapter was just beginning.",
    image: "/assets/s6.jpg",
  },
  {
    year: "2024",
    title: "The Journey to 'I Do'",
    story: "From planning their dream destination wedding in Jodhpur to sharing this special moment with their loved ones, every detail has been chosen with love. As they prepare to exchange vows, they're grateful for every twist and turn that brought them here—to this moment, to this love, to each other.",
    image: "/assets/s8.jpg",
  },
];

export default function OurStory({ isAdmin }) {
  const [milestones, setMilestones] = useState(defaultMilestones);
  const [editingIdx, setEditingIdx] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  // Firestore se milestones fetch karo
  useEffect(() => {
    async function fetchStory() {
      const docRef = doc(db, "ourstory", "main");
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) setMilestones(snapshot.data().milestones);
    }
    fetchStory();
  }, []);

  // Start editing
  const startEdit = i => {
    setEditingIdx(i);
    setEditForm({ ...milestones[i] });
  };

  // Save edit to Firestore
  const saveEdit = async () => {
    setSaving(true);
    const newMilestones = milestones.slice();
    newMilestones[editingIdx] = { ...editForm };
    setMilestones(newMilestones);
    await setDoc(doc(db, "ourstory", "main"), { milestones: newMilestones });
    setEditingIdx(null);
    setSaving(false);
  };

  return (
    <div
      className="relative min-h-screen bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(/assets/image5.jpeg)` }} // Place image5.jpeg in public/assets/
    >
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <header className="text-center py-24 text-white relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}>
          How It All Began
        </h1>
        <p className="mt-3 text-lg text-gray-200" style={{ fontFamily: "'Inter', sans-serif" }}>
          The journey of Vipul & Patty
        </p>
        <div className="mx-auto mt-5 w-24 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"></div>
      </header>
      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-20 flex flex-col items-center">
        {milestones.map((m, i) => (
          <section key={i} className="flex flex-col items-center text-center gap-6 mb-20 group transition-transform w-full md:w-[75%]">
            <div className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {m.year}
            </div>
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 md:p-6 shadow-lg border border-white/30 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl w-full">
              {isAdmin && editingIdx === i ? (
                <form className="flex flex-col gap-3 items-center w-full">
                  <input value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className="border p-2 rounded w-full" />
                  <input value={editForm.location || ""} onChange={e => setEditForm({ ...editForm, location: e.target.value })} className="border p-2 rounded w-full" placeholder="Location"/>
                  <textarea value={editForm.story} onChange={e => setEditForm({ ...editForm, story: e.target.value })} className="border p-2 rounded w-full" rows={4} />
                  <button type="button" className="bg-green-600 text-white px-4 py-2 rounded m-2" disabled={saving} onClick={saveEdit}>
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button type="button" className="bg-gray-400 px-3 py-1 rounded" onClick={() => setEditingIdx(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {m.title}
                  </h2>
                  {m.location && (
                    <p className="flex justify-center items-center gap-2 italic text-gray-600 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <MapPin size={18} className="text-pink-600" />
                      {m.location}
                    </p>
                  )}
                  <p className="text-gray-700 leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {m.story}
                  </p>
                  <div className="overflow-hidden rounded-xl w-full">
                    <img src={m.image} alt={m.title} className="w-full h-auto max-h-[450px] md:max-h-[350px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  {isAdmin && (
                    <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => startEdit(i)}>
                      Edit
                    </button>
                  )}
                </>
              )}
            </div>
          </section>
        ))}
        {/* Final Wedding Card section (not editable) */}
        <section className="relative flex items-center justify-center py-16 mt-10">
          <div className="absolute inset-0 rounded-2xl"></div>
          <div className="relative z-10 max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-10 text-center">
            <hr className="w-16 mx-auto border-[1.5px] border-purple-600 mb-4" />
            <h2 className="text-2xl md:text-4xl font-bold text-purple-800 mb-4">
              February 20–21, 2026
            </h2>
            <hr className="w-16 mx-auto border-[1.5px] border-purple-600 mb-4" />
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              After years of friendship, love, distance, and devotion, Vipul and Patty are finally becoming one. Surrounded by family and friends in the royal city of Jodhpur, they'll celebrate not just a wedding, but a love story that was always meant to be.
            </p>
            <p className="text-purple-800 font-semibold italic text-lg">
              And this is just the beginning…
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
