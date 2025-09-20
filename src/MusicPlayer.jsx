import React, { useEffect, useRef, useState } from "react";
import song from "./assets/music.mp3";

function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Try to autoplay on mount
    const playAudio = async () => {
      try {
        await audioRef.current.play(); // Always start playing
        setIsPlaying(true);
      } catch (err) {
        // Autoplay blocked on mobile
        console.log("Autoplay blocked:", err);
        setIsPlaying(false);
      }
    };
    playAudio();
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={song} loop autoPlay />

      {/* Floating icon bottom-right */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-4 right-4 text-black text-2xl z-50 bg-transparent border-none cursor-pointer"
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>
    </>
  );
}

export default MusicPlayer;
