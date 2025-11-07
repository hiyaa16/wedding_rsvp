import React, { useState, useEffect } from "react";
import bgImage from "/assets/image5.jpeg";
import { db } from "./firebase";
import { collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  // Cloudinary credentials
  const CLOUD_NAME = "dhkabclgt";
  const UPLOAD_PRESET = "pattypulledvipul";

  // Firestore reference
  const uploadsRef = collection(db, "uploads");

  // 🔹 Fetch all uploaded images from Firebase
  useEffect(() => {
    const fetchImages = async () => {
      const q = query(uploadsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const images = querySnapshot.docs.map((doc) => doc.data().imageUrl);
      setUploadedImages(images);
    };
    fetchImages();
  }, []);

  // 🔹 File input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // 🔹 Upload image to Cloudinary and store URL in Firebase
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await response.json();

      if (data.secure_url) {
        // Store the URL in Firebase Firestore
        await addDoc(uploadsRef, {
          imageUrl: data.secure_url,
          createdAt: new Date(),
        });

        // Update UI immediately
        setUploadedImages((prev) => [data.secure_url, ...prev]);
      } else {
        alert(data.error?.message || "Upload failed.");
      }

      setSelectedFile(null);
      setPreview(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center font-serif text-white px-4">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* Upload card */}
      <div className="relative z-10 bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-full max-w-md text-center mb-10">
        <h1 className="text-3xl mb-6 text-pink-400 font-semibold">
          Upload Wedding Images 💍
        </h1>

        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="preview"
              className="w-full h-64 object-cover rounded-lg border border-pink-200"
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-200 border border-gray-400 rounded-lg cursor-pointer bg-transparent p-2 mb-4"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full py-2 bg-pink-500 hover:bg-pink-600 rounded-full text-white font-semibold transition duration-300"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </div>

      {/* Uploaded Images Box */}
      {uploadedImages.length > 0 && (
        <div className="relative z-10 bg-white/10 backdrop-blur-lg p-6 rounded-2xl w-full max-w-5xl overflow-y-auto max-h-[60vh] border border-pink-200">
          <h2 className="text-2xl font-semibold text-pink-300 mb-4 text-center">
            Uploaded Gallery ✨
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {uploadedImages.map((url, index) => (
              <div
                key={index}
                onClick={() => setFullscreenImage(url)}
                className="cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={url}
                  alt={`uploaded-${index}`}
                  className="w-full h-40 object-cover rounded-lg border border-pink-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen popup */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setFullscreenImage(null)}
        >
          <img
            src={fullscreenImage}
            alt="fullscreen"
            className="max-w-5xl max-h-[90vh] rounded-lg shadow-2xl"
          />
          <button
            className="absolute top-6 right-6 text-white text-4xl font-bold hover:text-pink-500"
            onClick={() => setFullscreenImage(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default Upload;
