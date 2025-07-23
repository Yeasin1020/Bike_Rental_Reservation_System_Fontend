const WhyChooseUs = () => {
  const benefits = [
    {
      id: 1,
      icon: "🚴‍♂️",
      title: "Wide Selection of Bikes",
      description:
        "Choose from a variety of bikes for every need—mountain, road, or city bikes.",
    },
    {
      id: 2,
      icon: "💰",
      title: "Affordable Prices",
      description:
        "Enjoy the best rental prices in town without compromising on quality.",
    },
    {
      id: 3,
      icon: "🌟",
      title: "Excellent Customer Service",
      description:
        "Our friendly team ensures a hassle-free rental experience, every time.",
    },
    {
      id: 4,
      icon: "🔧",
      title: "Well-Maintained Bikes",
      description:
        "All our bikes are regularly serviced to guarantee your safety and comfort.",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl">
          Why Choose Us
        </h2>
        <p className="mt-4 text-lg text-center text-gray-600">
          Discover why our customers keep coming back to us for their bike
          rental needs!
        </p>

        {/* Benefits Grid */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex flex-col items-center text-center bg-gray-50 border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              {/* Icon */}
              <div className="text-4xl mb-4">{benefit.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
