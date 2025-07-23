const HeroSection = () => {
  return (
    <div
      className="relative bg-cover bg-center h-screen"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/6FHdhmJ/harley-davidson-Be8-Td-JZPa-BE-unsplash.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 space-y-6">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          Explore the Best Rides with{" "}
          <span className="text-blue-500">BikeRental</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-200">
          Discover the joy of cycling with our premium bikes available for rent.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-lg">
          <div className="flex items-center bg-white rounded-lg shadow-lg">
            <input
              type="text"
              placeholder="Search bike availability..."
              className="w-full px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none"
            />
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-r-lg hover:bg-blue-500 transition-colors duration-200">
              Search
            </button>
          </div>
        </div>

        {/* Call-to-Action Button */}
        <a
          href="/bike-list"
          className="px-6 py-3 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-500 transition-all duration-200"
        >
          View All Bikes
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
