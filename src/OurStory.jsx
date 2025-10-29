import React, { useRef, useEffect, useState, useCallback } from "react";
import storyBg from "./assets/bgw1.jpg";
import image2018 from "./assets/s1.jpg";
import image2019 from "./assets/s2.jpg";
import image2020 from "./assets/s3.jpg";
import image2021 from "./assets/s4.jpg";
import image2022 from "./assets/s5.jpg";
import image2023 from "./assets/s6.jpg";
import image2024 from "./assets/s8.jpg";
import image2025 from "./assets/s9.jpg";

const storyEvents = [
  {
    year: '2018',
    text: 'Their love story began on February 02, 2018, in Mannheim, Germany, when both of them embarked on their study exchange semester. Together on a new continent, fate introduced them as roommates for the next 6 months! From travelling to over 12 countries together, to celebrating birthdays and making life-long memories, Vipul and Patty were officially together on April 30, 2018 — which is now also the day of their legal marriage!',
    image: image2018,
    align: 'left',
  },
  {
    year: '2019',
    text: 'A year into long distance (and multiple flights back and forth to each other!), Vipul and Patty had both graduated from university. Now began the full-time job hunt so they could continue taking expensive flights, whilst they both figure out how to close the distance…',
    image: image2019,
    align: 'right',
  },
  {
    year: '2020',
    text: 'Shortly after celebrating their first in-person Valentines’ day together in Toronto, COVID struck! The worst possible thing to happen to a long-distance couple...in August, they both decided to adopt the most handsome and charming kitten ever, Storm! Separated for the longest time in their relationship (8 months!) Patty and Vipul finally reunited in Mexico for a getaway in October!',
    image: image2020,
    align: 'left',
  },
  {
    year: '2021',
    text: 'More than 3 years of long-distance (and a lot of Aeroplan Miles…) later, they finally closed the gap! After yet another summer in Mexico, Patty officially moved to Toronto on August 20, 2021. 3 beautiful seasons later, they decorated their Christmas tree for the first time. Even though Storm kept knocking down all the ornaments and tried to eat fallen pine needles, they were all happy to spend the holidays together as a family of three!',
    image: image2021,
    align: 'right',
  },
  {
    year: '2022',
    text: 'From exploring the Canadian Rockies, the wowie of Maui and enjoying the California sunshine, Vipul and Patty complete their first year living together. With many memories made, Vipul starts thinking about their future…',
    image: image2022,
    align: 'left',
  },
  {
    year: '2023',
    text: 'During Patty’s first visit to India, Vipul pops the question — she says yes — the crowd goes wild! After having felt like they had defied all the odds, they realised their journey was merely beginning…',
    image: image2023,
    align: 'right',
  },
  {
    year: '2024',
    text: 'Patty & Vipul take a “few” trips to unwind from planning three weddings in the next year and a half.',
    image: image2024,
    align: 'left',
  },
  {
    year: '2025',
    text: 'With two of three weddings done (and a mini-moon to Amsterdam, an ode to Patty & Vipul’s first memorable trips back in 2018), we are now here…super excited to be planning our grand finale! We cannot wait to celebrate our unique journey with our beloved ones at the Indana Palace, Jodhpur in dhoom dham style!',
    image: image2025,
    align: 'right',
  },
];

const useIntersectionObserver = (ref, options) => {
  const [isVisible, setIsVisible] = useState(false);
  const isRevealedRef = useRef(false);

  useEffect(() => {
    if (isRevealedRef.current) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        isRevealedRef.current = true;
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return isVisible;
};

const TimelineItem = ({ year, text, image, align }) => {
  const itemRef = useRef(null);
  const isVisible = useIntersectionObserver(itemRef, { threshold: 0.2 });

  const baseAnimationClasses = `transition duration-1000 ease-out opacity-0 transform`;
  const activeAnimationClasses = `opacity-100 translate-x-0`;
  const initialAnimationClasses = align === "left" ? "-translate-x-full" : "translate-x-full";

  const contentClasses = isVisible ? activeAnimationClasses : initialAnimationClasses;
  const boxStyleClasses = `bg-white/10 p-6 md:p-8 rounded-lg shadow-2xl backdrop-blur-sm border border-white/20`;
  const negativeMarginLeft = "md:-ml-10";
  const negativeMarginRight = "md:-mr-10";

  return (
    <div ref={itemRef} className="relative mb-20 flex w-full justify-center z-20">
      {/* Timeline heart on the center line */}
      <div className="hidden md:flex absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-10 justify-center items-center pointer-events-none">
        <span className="inline-block w-5 h-5 rounded-full bg-white border-2 border-pink-400 flex items-center justify-center shadow-lg text-pink-400 text-xs z-40">
          ♥
        </span>
      </div>
      {/* Timeline content */}
      <div
        className={`relative w-full max-w-lg flex flex-col p-0 ${align === "left"
          ? `md:mr-auto md:text-right md:pr-10 ${negativeMarginLeft}`
          : `md:ml-auto md:text-left md:pl-10 ${negativeMarginRight}`
          } ${baseAnimationClasses} ${contentClasses}`}
      >
        <div className={boxStyleClasses}>
          <p
            className="text-base sm:text-lg font-light tracking-wide leading-relaxed text-white"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            {text}
          </p>
        </div>
        <img
          src={image}
          alt={`Vipul and Patty in ${year}`}
          className="w-full h-auto object-cover mt-4 rounded-lg shadow-xl max-w-sm md:max-w-full mx-auto"
        />
        {/* Heart & year below image, centered */}
        <span
          className="flex items-center justify-center gap-2 text-center text-lg sm:text-2xl font-serif text-pink-400 mt-4"
          style={{ fontFamily: "Cinzel Decorative, serif" }}
        >
          <span className="inline-block w-5 h-5 rounded-full bg-white border-2 border-pink-400 flex items-center justify-center shadow-lg text-pink-400 text-xs">
            ♥
          </span>
          {year}
        </span>
      </div>
    </div>
  );
};

function OurStory() {
  const timelineRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  const handleScroll = useCallback(() => {
    const timelineContainer = timelineRef.current;
    if (!timelineContainer) return;
    const { top, height } = timelineContainer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrolled = Math.max(0, viewportHeight - top);
    const fillPercentage = Math.min(100, (scrolled / height) * 100);
    setLineHeight(fillPercentage);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black">
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${storyBg})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-4 text-white">
        <h1
          style={{ fontFamily: "Cinzel Decorative, serif" }}
          className="text-center text-3xl sm:text-4xl md:text-5xl mt-24 font-thin tracking-normal drop-shadow-lg mb-16"
        >
          HOW IT ALL BEGAN
        </h1>

        {/* Timeline */}
        <div ref={timelineRef} className="w-full max-w-5xl px-4 relative mt-10 mb-20">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-600/30"></div>
          <div
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-pink-400"
            style={{
              height: `${lineHeight}%`,
              top: 0,
              transition: "height 0.2s linear",
            }}
          ></div>
          <div className="md:hidden absolute left-4 h-full w-0.5 bg-gray-600/30"></div>

          {storyEvents.map((event, index) => (
            <TimelineItem
              key={index}
              year={event.year}
              text={event.text}
              image={event.image}
              align={window.innerWidth < 768 ? "left" : event.align}
            />
          ))}

          <div className="hidden md:block absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-5 h-5 rounded-full bg-pink-400 shadow-xl"></div>
        </div>

        <p className="mt-10 mb-20 text-center text-lg text-gray-300 max-w-3xl">
          Thank you for following our journey! We can't wait to celebrate with you.
        </p>
      </div>
    </div>
  );
}

export default OurStory;
