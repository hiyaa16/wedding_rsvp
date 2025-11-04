import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { FaTimes } from 'react-icons/fa';
import { db } from './firebase';

import galleryBg from './assets/image5.jpeg';
import wedding1 from './assets/image3.jpg';
import wedding2 from './assets/image.jpg';
import wedding3 from './assets/image8.jpg';
import wedding4 from './assets/image9.jpg';

// 👉 STEP 1: Add your manual image URLs here (from Cloudinary, Imgur, etc.)
const MANUAL_URLS = [
  { id: 'manual-1', url: 'https://res.cloudinary.com/dhkabclgt/image/upload/v1762278672/greendress_llagvn.jpg' },
  { id: 'manual-2', url: 'https://res.cloudinary.com/dhkabclgt/image/upload/v1762278670/dinner_ug4fxp.jpg' },
  { id: 'manual-3', url: 'https://res.cloudinary.com/dhkabclgt/image/upload/v1762278671/holdhand_ivsfh0.jpg' },
  { id: 'manual-4', url: 'https://res.cloudinary.com/dhkabclgt/image/upload/v1762278670/DSC_0613_ld9p4u.jpg' },
  { id: 'manual-5', url: 'https://res.cloudinary.com/dhkabclgt/image/upload/v1762278670/DSC_0744_jd00vb.jpg' },
  { id: 'manual-6', url: 'https://res.cloudinary.com/dhkabclgt/image/upload/v1762278670/DSC_0243_gqkmhp.jpg' },
  { id: 'manual-7', url: 'https://res.cloudinary.com/dhkabclgt/image/upload/v1762279155/main_ecvwo4.jpg' },
  { id: 'manual-8', url: 'https://res.cloudinary.com/dhkabclgt/image/upload/v1762279405/a_fgqc1m.jpg' },
  { id: 'manual-9', url: 'https://res.cloudinary.com/dhkabclgt/image/upload/v1762279405/food_l71rsd.jpg' },
  { id: 'manual-10', url: 'https://res.cloudinary.com/dhkabclgt/image/upload/v1762279406/image7_pvcwlx.jpg' },
  

  // 🪄 Add all 20–30 photos like this
];

// 👉 STEP 2: Local static images
const STATIC_IMAGES = [
  { id: 'static-1', url: wedding1 },
  { id: 'static-2', url: wedding2 },
  { id: 'static-3', url: wedding3 },
  { id: 'static-4', url: wedding4 }
];

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Firestore listener (optional — if you ever want to add dynamic images later)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'photos'), (snapshot) => {
      const imgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPhotos(imgs);
    });
    return () => unsubscribe();
  }, []);

  // Combine all image sources — static + manual + Firestore
  const allImages = [...STATIC_IMAGES, ...MANUAL_URLS, ...photos];

  return (
    <div className="relative">
      {/* Background */}
      <div
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

        {/* Photo Grid */}
        <div className="max-w-7xl mx-auto bg-white/30 rounded-3xl shadow-xl p-4 backdrop-blur-sm">
          {allImages.length === 0 ? (
            <p className="text-center text-gray-700 text-lg">No wedding photos yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {allImages.map((photo) => (
                <div
                  key={photo.id}
                  className="rounded-xl shadow hover:shadow-lg transition overflow-hidden bg-white flex flex-col items-center"
                >
                  <img
                    src={photo.url}
                    alt="Wedding Photo"
                    loading="lazy"
                    className="w-full h-36 sm:h-44 md:h-52 object-cover cursor-pointer transition-transform duration-150 hover:scale-105"
                    onClick={() => {
                      setSelectedImg(photo.url);
                      setShowModal(true);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal for Full Image */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <button
            style={{
              position: 'absolute',
              top: 30,
              right: 30,
              fontSize: 30,
              color: 'white',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              zIndex: 60
            }}
            onClick={() => setShowModal(false)}
            aria-label="Close"
          >
            <FaTimes />
          </button>
          <img
            src={selectedImg}
            alt="Full View"
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl border-4 border-white"
            style={{ boxShadow: '0 0 35px 0 rgba(0,0,0,0.25)' }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
