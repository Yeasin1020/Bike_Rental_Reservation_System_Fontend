const HistoryAndMilestones = () => {
  const milestones = [
    {
      year: "2015",
      title: "Founding of BikeRental",
      description:
        "BikeRental was founded with the mission to provide affordable and eco-friendly bike rentals to cycling enthusiasts.",
    },
    {
      year: "2017",
      title: "Expansion to Multiple Cities",
      description:
        "After a successful launch, BikeRental expanded to major cities, providing customers with convenient access to bikes.",
    },
    {
      year: "2019",
      title: "Reached 1 Million Rides",
      description:
        "BikeRental reached a major milestone by completing over a million rides, proving our success in the bike rental industry.",
    },
    {
      year: "2021",
      title: "Sustainability Partnership",
      description:
        "BikeRental partnered with local organizations to promote cycling and sustainability, further solidifying our commitment to the environment.",
    },
    {
      year: "2023",
      title: "Launched Mobile App",
      description:
        "We launched our user-friendly mobile app, enabling customers to easily rent bikes, view availability, and track their rides.",
    },
  ];

  return (
    <div className=" py-16 px-6 md:px-12">
      <div className="max-w-screen-xl mx-auto text-center space-y-12">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
          Our Journey & Milestones
        </h2>

        {/* Timeline */}
        <div className="relative space-y-12">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="relative flex flex-col sm:flex-row items-center  p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Year Circle */}
              <div
                className={`absolute sm:left-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:-translate-x-1/2 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center`}
              >
                <span className="font-semibold text-lg">{milestone.year}</span>
              </div>

              {/* Content */}
              <div className="ml-0 sm:ml-16 sm:mr-12 text-center sm:text-left mt-6 sm:mt-0">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {milestone.title}
                </h3>
                <p className="text-gray-600 mt-2">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryAndMilestones;
