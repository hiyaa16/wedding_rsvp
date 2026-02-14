import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { FaTimes } from 'react-icons/fa';
import { db } from './firebase';

import galleryBg from '/assets/image5.jpeg';
import wedding1 from '/assets/image3.jpg';
import wedding2 from '/assets/image.jpg';
import wedding3 from '/assets/image8.jpg';
import wedding4 from '/assets/image9.jpg';

// Manual Cloudinary images
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
];

const STATIC_IMAGES = [
  { id: 'static-1', url: wedding1 },
  { id: 'static-2', url: wedding2 },
  { id: 'static-3', url: wedding3 },
  { id: 'static-4', url: wedding4 }
];

export default function Gallery({ isAdmin, goBack }) {

  const [photos, setPhotos] = useState([]);
  const [selectedImgIdx, setSelectedImgIdx] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'photos'), (snapshot) => {
      const imgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPhotos(imgs);
    });
    return () => unsubscribe();
  }, []);

  const allImages = [...STATIC_IMAGES, ...MANUAL_URLS, ...photos];

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "YOUR_CLOUDINARY_PRESET");

    try {
      const cloudinaryRes = await fetch(
        "https://api.cloudinary.com/v1_1/dhkabclgt/image/upload",
        { method: "POST", body: data }
      );

      const cloudinaryData = await cloudinaryRes.json();
      const imageUrl = cloudinaryData.secure_url;

      if (!imageUrl) throw new Error("Upload failed");

      await addDoc(collection(db, 'photos'), { url: imageUrl });

      alert("Photo uploaded!");
      setFile(null);
    } catch {
      alert("Upload failed");
    }

    setUploading(false);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (allImages.length === 0 || selectedImgIdx === null) return;
    const nextIdx = (selectedImgIdx + 1) % allImages.length;
    setSelectedImgIdx(nextIdx);
    setSelectedImg(allImages[nextIdx].url);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (allImages.length === 0 || selectedImgIdx === null) return;
    const prevIdx = (selectedImgIdx - 1 + allImages.length) % allImages.length;
    setSelectedImgIdx(prevIdx);
    setSelectedImg(allImages[prevIdx].url);
  };

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
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-20 px-4 sm:px-8 md:px-12 pt-20 pb-20">

        {/* Logo + Heading */}
        <div className="flex flex-col items-center mt-8 mb-4">
          <img
            src="/logo.png"
            alt="Wedding Logo"
            className="mb-4 h-16 sm:h-20 md:h-24 w-auto"
          />
          <h1
            className="text-center text-2xl sm:text-3xl md:text-5xl font-normal text-white drop-shadow-lg "
            style={{ fontFamily: 'Cinzel Decorative, serif' }}
          >
            Wedding Photo Gallery
          </h1>
        </div>

        {/* Responsive QR Section */}
        <div className="flex flex-col items-center text-center px-4 mt-6 mb-14 max-w-3xl mx-auto">

          <p className="text-red-500 text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            GET ALL THE PHOTOS
          </p>

          <p className="text-white text-sm sm:text-base md:text-lg mb-4 max-w-xl">
            from this event instantly using face recognition
          </p>

          <p className="text-white text-base sm:text-lg font-semibold mb-4">
            SCAN THIS CODE
          </p>

          <img
            src="/qr.png"
            alt="Wedding QR Code"
            className="w-44 sm:w-60 md:w-72 lg:w-80 mb-4 drop-shadow-2xl"
          />

          <p className="text-white text-sm sm:text-base md:text-lg font-semibold">
            CLICK A SELFIE
          </p>

          <p className="text-white text-base sm:text-lg md:text-xl font-bold mt-1">
            U-Code: U2Y*6X
          </p>

          <p className="text-gray-300 text-xs sm:text-sm mt-6">
            Technology by Kwikpic
          </p>

        </div>

        {/* Upload Form */}
        {isAdmin && (
          <div className="mt-6 mb-6 flex flex-col items-center">
            <form className="w-full max-w-md bg-white/90 rounded-lg p-4 shadow" onSubmit={handleUpload}>
              <input
                type="file"
                onChange={e => setFile(e.target.files[0])}
                className="mb-2"
                accept="image/*"
              />
              <button
                disabled={uploading}
                className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                {uploading ? "Uploading..." : "Upload Photo"}
              </button>
            </form>
          </div>
        )}

        {/* Image Grid (Smaller Photos) */}
        <div className="max-w-7xl mx-auto bg-white/30 rounded-3xl shadow-xl p-4 backdrop-blur-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {allImages.map((photo, idx) => (
              <div
                key={photo.id}
                className="rounded-xl shadow hover:shadow-lg transition overflow-hidden bg-white"
              >
                <img
                  src={photo.url}
                  alt="Wedding Photo"
                  loading="lazy"
                  className="w-full h-28 sm:h-32 md:h-40 lg:h-44 object-cover cursor-pointer transition-transform duration-200 hover:scale-105"
                  onClick={() => {
                    setSelectedImgIdx(idx);
                    setSelectedImg(photo.url);
                    setShowModal(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
