import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import TypewriterSearch from "../ui/TypewriterSearch";

const HeroSection = () => {
  const [bgLoaded, setBgLoaded] = useState(false);

  const highResImage = useMemo(
    () =>
      "https://res.cloudinary.com/dwg8d0bfp/image/upload/f_auto,q_auto,w_1920/harley-davidson-Be8-Td-JZPa-BE-unsplash_x28new.jpg",
    []
  );

  const lowResImage = useMemo(
    () =>
      "https://res.cloudinary.com/dwg8d0bfp/image/upload/f_auto,q_10,w_20/harley-davidson-Be8-Td-JZPa-BE-unsplash_x28new.jpg",
    []
  );

  useEffect(() => {
    const cached = localStorage.getItem("heroBgCached");
    if (cached === "true") {
      setBgLoaded(true);
    } else {
      const img = new Image();
      img.src = highResImage;
      img.onload = () => {
        setBgLoaded(true);
        localStorage.setItem("heroBgCached", "true");
      };
    }
  }, [highResImage]);

  return (
    <>
      {/* Preload background */}
      <img
        src={highResImage}
        alt="Background preload"
        style={{ display: "none" }}
        loading="eager"
      />

      {/* Background section */}
      <div
        className={`relative min-h-screen bg-center bg-no-repeat bg-cover transition-opacity duration-700 ease-in-out will-change-opacity ${
          bgLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url('${bgLoaded ? highResImage : lowResImage}')`,
          backgroundColor: "#0f172a", // Tailwind slate-900 fallback
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 text-center space-y-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-xl">
            Explore the Best Rides with{" "}
            <span className="text-blue-400">BikeRental</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow">
            Discover the joy of cycling with our premium bikes available for
            rent.
          </p>

          {/* Search Bar */}
          <TypewriterSearch></TypewriterSearch>

          {/* CTA Button */}
          <Link
            to="/bike-list"
            className="relative inline-block mt-4 px-6 py-3 text-white text-lg font-semibold rounded-lg
            bg-[#3B82F6] shadow-md overflow-hidden transition-all duration-300 
            hover:scale-105 hover:shadow-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-300
            animate-pulse-soft group"
          >
            <span className="absolute inset-0 bg-blue-400 opacity-20 blur-2xl rounded-full group-hover:opacity-30 transition-all duration-300"></span>
            <span className="relative z-10">🚴 View All Bikes</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
