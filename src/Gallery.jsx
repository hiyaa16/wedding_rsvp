import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { FaTimes } from 'react-icons/fa';
import { db } from './firebase';

import galleryBg from '/assets/image5.jpeg';
import wedding1 from '/assets/image3.jpg';
import wedding2 from '/assets/image.jpg';
import wedding3 from '/assets/image8.jpg';
import wedding4 from '/assets/image9.jpg';

// Manual Cloudinary images (unchanged)
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
      const cloudinaryRes = await fetch("https://api.cloudinary.com/v1_1/dhkabclgt/image/upload", {
        method: "POST",
        body: data,
      });
      const cloudinaryData = await cloudinaryRes.json();
      const imageUrl = cloudinaryData.secure_url;
      if (!imageUrl) throw new Error("Cloudinary upload failed");
      await addDoc(collection(db, 'photos'), { url: imageUrl });
      alert("Photo uploaded!");
      setFile(null);
    } catch (err) {
      alert("Upload failed");
    }
    setUploading(false);
  };

  const handleDelete = async (photoId) => {
    try {
      await deleteDoc(doc(db, 'photos', photoId));
      alert('Image deleted!');
    } catch (error) {
      alert('Delete failed');
    }
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
      {/* Gallery background */}
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

      {/* Content section */}
      <div className="relative z-20 px-3 sm:px-8 md:px-12 pt-20 pb-20">
        <div className="flex flex-col items-center mt-8 mb-2">
          {/* Logo above heading */}
          <img
            src="/logo.png"
            alt="Wedding Logo"
            className="mb-4 h-16 sm:h-20 md:h-24 w-auto"
            style={{ maxWidth: '90vw' }}
          />
          <h1 className="text-center text-2xl sm:text-3xl md:text-5xl font-normal text-white drop-shadow-lg mt-2 mb-10"
            style={{ fontFamily: 'Cinzel Decorative, serif' }}>
            Wedding Photo Gallery
          </h1>
        </div>

        {/* Upload form for admin only */}
        {isAdmin && (
          <div className="mt-6 mb-3 flex flex-col items-center">
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

        {/* Images grid */}
        <div className="max-w-7xl mx-auto bg-white/30 rounded-3xl shadow-xl p-4 backdrop-blur-sm">
          {allImages.length === 0 ? (
            <p className="text-center text-gray-700 text-lg">No wedding photos yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {allImages.map((photo, idx) => (
                <div
                  key={photo.id}
                  className="rounded-xl shadow hover:shadow-lg transition overflow-hidden bg-white flex flex-col items-center relative"
                >
                  <img
                    src={photo.url}
                    alt="Wedding Photo"
                    loading="lazy"
                    className="w-full h-36 sm:h-44 md:h-52 object-cover cursor-pointer transition-transform duration-150 hover:scale-105"
                    onClick={() => {
                      setSelectedImgIdx(idx);
                      setSelectedImg(photo.url);
                      setShowModal(true);
                    }}
                  />
                  {isAdmin && photo.id && !photo.id.startsWith('manual-') && !photo.id.startsWith('static-') && (
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-700"
                      onClick={() => handleDelete(photo.id)}
                      title="Delete Image"
                    >✕</button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back to Menu button for admin, below images grid */}
        {isAdmin && (
          <button
            onClick={goBack}
            className="mt-10 mb-6 px-8 py-3 font-semibold text-white bg-gray-700 hover:bg-blue-800 rounded-full text-lg transition flex items-center gap-2 mx-auto"
            style={{ minWidth: 220 }}
          >
            &#8592; Back to Menu
          </button>
        )}
      </div>

      {/* Modal for full image display with arrows */}
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
          <button
            className="absolute left-5 top-1/2 transform -translate-y-1/2 text-4xl text-white bg-black/40 p-2 rounded-full shadow z-60"
            onClick={handlePrev}
            aria-label="Prev"
          >&#8592;</button>
          <img
            src={selectedImg}
            alt="Full View"
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl border-4 border-white"
            style={{ boxShadow: '0 0 35px 0 rgba(0,0,0,0.25)' }}
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-4xl text-white bg-black/40 p-2 rounded-full shadow z-60"
            onClick={handleNext}
            aria-label="Next"
          >&#8594;</button>
        </div>
      )}
    </div>
  );
}
