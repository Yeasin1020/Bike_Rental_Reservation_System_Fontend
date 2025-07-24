const TeamSection = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "CEO",
      bio: "John is the visionary behind BikeRental. With a passion for cycling and sustainability, he has been leading the company to new heights.",
      photo: "https://via.placeholder.com/150",
    },
    {
      name: "Jane Smith",
      role: "CTO",
      bio: "Jane is the tech genius who ensures that our platform runs smoothly and provides top-notch service to our customers.",
      photo: "https://via.placeholder.com/150",
    },
    {
      name: "Sarah Lee",
      role: "Marketing Manager",
      bio: "Sarah drives our marketing strategies and is dedicated to bringing BikeRental’s message to cycling enthusiasts everywhere.",
      photo: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className=" py-16 px-6 md:px-12">
      <div className="max-w-screen-xl mx-auto text-center space-y-12">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Meet Our Team
        </h2>

        {/* Team Member Profiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className=" p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-md text-blue-600">{member.role}</p>
              <p className="text-gray-600 mt-4">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
