import React, { useState, useEffect } from "react";
import bgImage from "public/assets/image5.jpeg";
import carouselImage1 from "public/assets/VP_page0001.jpg";
import carouselImage2 from "public/assets/VP_page0002.jpg";
import carouselImage3 from "public/assets/VP_page0003.jpg";
import carouselImage4 from "public/assets/VP_page0004.jpg";
import carouselImage5 from "public/assets/VP_page0005.jpg";
import carouselImage6 from "public/assets/VP_page0006.jpg";
import carouselImage7 from "public/assets/VP_page0007.jpg";
import carouselImage8 from "public/assets/VP_page0008.jpg";
import carouselImage9 from "public/assets/VP_page0009.jpg";
import carouselImage10 from "public/assets/VP_page00010.jpg";

const carouselImages = [
  { src: carouselImage1 },
  { src: carouselImage2 },
  { src: carouselImage3 },
  { src: carouselImage4 },
  { src: carouselImage5 },
  { src: carouselImage6 },
  { src: carouselImage7 },
  { src: carouselImage8 },
  { src: carouselImage9 },
  { src: carouselImage10 },
];

function Invitation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const totalSlides = carouselImages.length;

  // ✅ Responsive window listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Swipe functionality for carousel (mobile)
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    setTouchEndX(e.changedTouches[0].clientX);
    if (touchStartX - e.changedTouches[0].clientX > 50) nextSlide(); // Swipe left
    if (e.changedTouches[0].clientX - touchStartX > 50) prevSlide(); // Swipe right
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const getRelativePosition = (index) => {
    let diff = index - currentSlide;
    if (diff > totalSlides / 2) diff -= totalSlides;
    if (diff < -totalSlides / 2) diff += totalSlides;
    return diff;
  };

  // ✅ Use dynamic responsive sizing
  const CENTER_SCALE = windowWidth < 768 ? 1.05 : windowWidth < 1200 ? 1.3 : 1.5;
  const SIDE_SCALE = windowWidth < 768 ? 0.8 : 0.6;
  const SIDE_OFFSET = windowWidth < 768 ? 110 : windowWidth < 1200 ? 200 : 250;
  const CARD_BASE_WIDTH =
    windowWidth < 768 ? "70%" : windowWidth < 1200 ? "24%" : "34%";

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center flex flex-col items-center overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <div className="relative z-10 text-white text-center w-full max-w-6xl px-2 sm:px-4 flex flex-col h-full">
        <h1
          className="mt-24 sm:mt-20 md:mt-24 text-xl sm:text-3xl md:text-5xl font-light tracking-tight mb-4 drop-shadow-lg leading-tight px-2"
          style={{ fontFamily: "Cinzel Decorative, serif" }}
        >
          Invitation
        </h1>

        {/* Carousel Container */}
        <div
          className="relative w-full mx-auto flex-grow flex items-center justify-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px] mt-10 sm:mt-16 md:mt-24"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-white z-30 transition hover:text-gray-300"
            aria-label="Previous Slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 drop-shadow-lg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 text-white z-30 transition hover:text-gray-300"
            aria-label="Next Slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 drop-shadow-lg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Carousel Images */}
          {carouselImages.map((item, index) => {
            const position = getRelativePosition(index);
            const isCenter = position === 0;
            const isLeft = position === -1;
            const isRight = position === 1;

            let transformStyle = "";
            let zIndex = 5;
            let opacity = 0;

            if (isCenter) {
              transformStyle = `translateX(0%) scale(${CENTER_SCALE})`;
              zIndex = 20;
              opacity = 1;
            } else if (isLeft) {
              transformStyle = `translateX(-${SIDE_OFFSET}%) scale(${SIDE_SCALE})`;
              zIndex = 10;
              opacity = 0.9;
            } else if (isRight) {
              transformStyle = `translateX(${SIDE_OFFSET}%) scale(${SIDE_SCALE})`;
              zIndex = 10;
              opacity = 0.9;
            } else if (position < -1) {
              transformStyle = `translateX(-600%) scale(0.5)`;
              opacity = 0;
              zIndex = 5;
            } else if (position > 1) {
              transformStyle = `translateX(600%) scale(0.5)`;
              opacity = 0;
              zIndex = 5;
            }

            return (
              <div
                key={index}
                className="absolute h-[55%] sm:h-[65%] md:h-[70%] lg:h-[80%] overflow-hidden cursor-pointer"
                style={{
                  width: CARD_BASE_WIDTH,
                  zIndex,
                  transition: "all 800ms ease-out",
                  transform: `translateX(-50%) ${transformStyle}`,
                  opacity,
                  left: "50%",
                }}
                onClick={() => {
                  setActiveImageIndex(index);
                  setIsModalOpen(true);
                }}
              >
                <img
                  src={item.src}
                  alt={`Outfit Moodboard ${index + 1}`}
                  className={`w-full h-full ${
                    windowWidth < 768 ? "object-contain" : "object-cover"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center mb-6 mt-4 space-x-1 sm:space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${
                index === currentSlide ? "bg-white" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          onTouchStart={(e) => (window._touchStartX = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = endX - window._touchStartX;
            if (diff > 50) {
              setActiveImageIndex(
                (prev) => (prev === 0 ? totalSlides - 1 : prev - 1)
              );
            } else if (diff < -50) {
              setActiveImageIndex(
                (prev) => (prev === totalSlides - 1 ? 0 : prev + 1)
              );
            }
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-white text-3xl md:text-4xl font-bold hover:text-gray-300"
          >
            ×
          </button>

          {/* Left Arrow */}
          <button
            onClick={() =>
              setActiveImageIndex(
                (prev) => (prev === 0 ? totalSlides - 1 : prev - 1)
              )
            }
            className="absolute left-3 md:left-8 text-white hover:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Fullscreen Image */}
          <img
            src={carouselImages[activeImageIndex].src}
            alt={`Moodboard ${activeImageIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-lg"
          />

          {/* Right Arrow */}
          <button
            onClick={() =>
              setActiveImageIndex(
                (prev) => (prev === totalSlides - 1 ? 0 : prev + 1)
              )
            }
            className="absolute right-3 md:right-8 text-white hover:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default Invitation;
