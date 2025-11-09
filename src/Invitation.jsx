import React, { useState, useEffect } from "react";

const carouselImages = [
  { src: "/assets/VP_page0001.jpg" },
  { src: "/assets/VP_page0002.jpg" },
  { src: "/assets/VP_page0003.jpg" },
  { src: "/assets/VP_page0004.jpg" },
  { src: "/assets/VP_page0005.jpg" },
  { src: "/assets/VP_page0006.jpg" },
  { src: "/assets/VP_page0007.jpg" },
  { src: "/assets/VP_page0008.jpg" },
  { src: "/assets/VP_page0009.jpg" },
  { src: "/assets/VP_page0010.jpg" },
];

function Invitation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const totalSlides = carouselImages.length;

  // ✅ Responsive listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Swipe controls (mobile)
  const [touchStartX, setTouchStartX] = useState(null);
  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (touchStartX - endX > 50) nextSlide(); // swipe left
    if (endX - touchStartX > 50) prevSlide(); // swipe right
  };

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));

  const getRelativePosition = (index) => {
    let diff = index - currentSlide;
    if (diff > totalSlides / 2) diff -= totalSlides;
    if (diff < -totalSlides / 2) diff += totalSlides;
    return diff;
  };

  const CENTER_SCALE = windowWidth < 768 ? 1.05 : windowWidth < 1200 ? 1.3 : 1.5;
  const SIDE_SCALE = windowWidth < 768 ? 0.8 : 0.6;
  const SIDE_OFFSET = windowWidth < 768 ? 110 : windowWidth < 1200 ? 200 : 250;
  const CARD_BASE_WIDTH =
    windowWidth < 768 ? "70%" : windowWidth < 1200 ? "24%" : "34%";

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center flex flex-col items-center overflow-hidden"
      style={{ backgroundImage: "url('/assets/image5.jpeg')" }} // ✅ from public, no import
    >
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <div className="relative z-10 text-white text-center w-full max-w-6xl px-2 sm:px-4 flex flex-col h-full">
        <h1
          className="mt-24 sm:mt-20 md:mt-24 text-xl sm:text-3xl md:text-5xl font-light tracking-tight mb-4 drop-shadow-lg leading-tight px-2"
          style={{ fontFamily: "Cinzel Decorative, serif" }}
        >
          Invitation
        </h1>

        {/* Carousel */}
        <div
          className="relative w-full mx-auto flex-grow flex items-center justify-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px] mt-10 sm:mt-16 md:mt-24"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-white z-30 hover:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 md:h-10 md:w-10"
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
            className="absolute right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 text-white z-30 hover:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 md:h-10 md:w-10"
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

          {/* Slides */}
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
                  alt={`Invitation page ${index + 1}`}
                  className={`w-full h-full ${
                    windowWidth < 768 ? "object-contain" : "object-cover"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center mb-6 mt-4 space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white scale-110" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <img
            src={carouselImages[activeImageIndex].src}
            alt="Full Invitation"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
            className="absolute top-5 right-5 text-white text-3xl font-bold"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default Invitation;
