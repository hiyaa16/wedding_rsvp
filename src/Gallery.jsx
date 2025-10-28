import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { FaPlus, FaTimes } from 'react-icons/fa';
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

export default function GalleryWithUpload() {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [selectedImg, setSelectedImg] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'photos'), (snapshot) => {
      const imgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPhotos(imgs);
    });
    return () => unsubscribe();
  }, []);

  const allImages = [...STATIC_IMAGES, ...photos];

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage('');
      setProgress(0);
    }
  };

  // Cloudinary upload logic
  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    setProgress(10);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'pyaarkikashti'); // Your unsigned preset name
    const cloudName = "dhkabclgt";

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );
      setProgress(60);

      const result = await response.json();
      setProgress(100);

      if (result.secure_url) {
        await addDoc(collection(db, 'photos'), {
          url: result.secure_url,
          caption: '',
          uploadedAt: serverTimestamp(),
          isUserUpload: true
        });
        setMessage('Upload successful!');
        setFile(null);
        setProgress(0);
      } else {
        setMessage('Upload failed. Try again.');
        setProgress(0);
      }
    } catch (err) {
      setMessage('Upload failed: ' + err.message);
      setProgress(0);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${galleryBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
      className="px-3 sm:px-8 md:px-12 pt-20 pb-20"
    >
      <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-10 font-karla">
        Wedding Photo Gallery
      </h1>

      {/* Upload Section */}
      <div className="max-w-3xl mx-auto mb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <label 
          htmlFor="file-upload" 
          className="cursor-pointer rounded-full bg-white p-4 shadow-md hover:bg-purple-200 transition text-purple-700 flex items-center gap-2"
          title="Click to select photo"
        >
          <FaPlus className="text-xl" />
          <span className="font-semibold">Upload Photo</span>
        </label>
        <input 
          id="file-upload" 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="hidden" 
        />
        <button 
          onClick={handleUpload} 
          className="py-2 px-5 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition mt-4 sm:mt-0"
          disabled={!file}
          title={file ? "Click to upload selected photo" : "Select a photo first"}
        >
          Upload
        </button>
      </div>
      
      {file && (
        <p className="text-center text-white mb-2 italic">{`Selected file: ${file.name}`}</p>
      )}
      {progress > 0 && (
        <p className="text-center text-white mb-2">
          <span className="animate-pulse">Uploading: {progress}%</span>
        </p>
      )}
      {message && (
        <p className="text-center text-white mb-4">{message}</p>
      )}

      {/* Photo Grid */}
      <div className="max-w-7xl mx-auto bg-white/95 rounded-3xl shadow-xl p-6 backdrop-blur-sm">
        {allImages.length === 0 ? (
          <p className="text-center text-gray-700 text-lg">
            No wedding photos yet. Be the first to upload!
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {allImages.map((photo) => (
              <div key={photo.id} className="rounded-xl shadow hover:shadow-lg transition overflow-hidden bg-white flex flex-col items-center">
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
            onClick={e => e.stopPropagation()} // Prevent closing when clicking image
          />
        </div>
      )}
    </div>
  );
}
