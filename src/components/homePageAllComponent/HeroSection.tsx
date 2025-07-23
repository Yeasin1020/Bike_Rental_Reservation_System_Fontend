import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

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
          <div className="w-full max-w-xl">
            <div className="flex items-center bg-white/90 backdrop-blur-md rounded-lg shadow-md overflow-hidden">
              <input
                type="text"
                placeholder="Search bike availability..."
                className="w-full px-4 py-3 text-gray-700 focus:outline-none"
              />
              <button className="px-5 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors duration-200">
                Search
              </button>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            to="/bike-list"
            className="inline-block mt-4 px-6 py-3 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-500 transition-all duration-200 shadow-lg"
          >
            View All Bikes
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
