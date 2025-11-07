import React, { useRef, useEffect, useState } from "react";
import song from "/assets/music.mp3";

function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Autoplay logic
    const playAudio = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        // Autoplay blocked - play on first user click
        const clickHandler = () => {
          audioRef.current.play();
          setIsPlaying(true);
          window.removeEventListener("click", clickHandler);
        };
        window.addEventListener("click", clickHandler);
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
