import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore'; // Removed addDoc, serverTimestamp
import { FaTimes } from 'react-icons/fa'; // Removed FaPlus
import { db } from './firebase';

import galleryBg from './assets/image5.jpeg';
import wedding1 from './assets/image3.jpg';
import wedding2 from './assets/image.jpg';
import wedding3 from './assets/image8.jpg';
import wedding4 from './assets/image9.jpg';

const STATIC_IMAGES = [
  { id: 'static-1', url: wedding1 },
  { id: 'static-2', url: wedding2 },
  { id: 'static-3', url: wedding3 },
  { id: 'static-4', url: wedding4 }
];

export default function Gallery() { // Renamed the function component
  const [photos, setPhotos] = useState([]);
  // Removed: [file, setFile], [message, setMessage], [progress, setProgress]
  const [selectedImg, setSelectedImg] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Firestore subscription to fetch user-uploaded photos
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'photos'), (snapshot) => {
      const imgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPhotos(imgs);
    });
    return () => unsubscribe();
  }, []);

  // Combine static and dynamically loaded images
  const allImages = [...STATIC_IMAGES, ...photos];

  // Removed: handleFileChange and handleUpload functions

  return (
    <div className="relative">
      <div // Full-screen background
        style={{
          backgroundImage: `url(${galleryBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 0
        }}
      >
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70 z-10"></div>
      </div>

      {/* Content Section */}
      <div className="relative z-20 px-3 sm:px-8 md:px-12 pt-20 pb-20">
        <h1
          className="text-center text-2xl sm:text-3xl md:text-5xl font-normal text-white drop-shadow-lg mt-12 mb-10"
          style={{ fontFamily: 'Cinzel Decorative, serif' }}
        >
          Wedding Photo Gallery
        </h1>

        {/* Removed: Upload Section (input, button, message, and progress) */}

        {/* Photo Grid */}
        <div className="max-w-7xl mx-auto bg-white/30 rounded-3xl shadow-xl p-4 backdrop-blur-sm">
          {allImages.length === 0 ? (
            <p className="text-center text-gray-700 text-lg">
              No wedding photos yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {allImages.map((photo) => (
                <div 
                  key={photo.id} 
                  className="rounded-xl shadow hover:shadow-lg transition overflow-hidden bg-white flex flex-col items-center"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || 'Wedding Photo'}
                    className="w-full h-36 sm:h-44 md:h-52 object-cover cursor-pointer transition-transform duration-150 hover:scale-105"
                    onClick={() => { setSelectedImg(photo.url); setShowModal(true); }}
                  />
                  {photo.caption && (
                    <div className="p-2 text-purple-700 font-semibold text-center text-xs sm:text-sm">
                      {photo.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal / Lightbox for big preview */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <button
            style={{ position: 'absolute', top: 30, right: 30, fontSize: 30, color: 'white', background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 60 }}
            onClick={() => setShowModal(false)}
            aria-label="Close"
          >
            <FaTimes />
          </button>
          <img
            src={selectedImg}
            alt="Big preview"
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl border-4 border-white"
            style={{ boxShadow: '0 0 35px 0 rgba(0,0,0,0.25)' }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}