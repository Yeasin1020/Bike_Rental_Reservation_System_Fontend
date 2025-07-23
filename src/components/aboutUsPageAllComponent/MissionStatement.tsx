const MissionStatement = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-50 py-16 px-6 md:px-12">
      <div className="max-w-screen-xl mx-auto text-center space-y-8">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
          Our Mission
        </h2>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-700 max-w-4xl mx-auto">
          At BikeRental, we are dedicated to offering the best cycling
          experience to riders of all kinds. Our mission is to provide
          convenient, affordable, and high-quality bikes for rent, ensuring
          every rider enjoys a safe, comfortable, and memorable experience. We
          are driven by our commitment to sustainability, community, and
          promoting a healthy lifestyle. Whether you're looking for a quick ride
          or a long adventure, we're here to help you explore the world, one
          pedal at a time.
        </p>

        {/* Values Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
          <div className="space-y-4 text-center bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-3xl font-semibold text-blue-600">Quality</h3>
            <p className="text-gray-600">
              We offer well-maintained, high-performance bikes for all riders.
            </p>
          </div>
          <div className="space-y-4 text-center bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-3xl font-semibold text-blue-600">
              Affordability
            </h3>
            <p className="text-gray-600">
              Affordable rates that make bike rentals accessible to everyone.
            </p>
          </div>
          <div className="space-y-4 text-center bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-3xl font-semibold text-blue-600">
              Sustainability
            </h3>
            <p className="text-gray-600">
              Our eco-friendly approach helps reduce the carbon footprint.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionStatement;
