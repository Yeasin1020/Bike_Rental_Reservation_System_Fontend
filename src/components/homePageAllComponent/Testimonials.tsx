const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      image: "/images/user1.jpg",
      quote:
        "The bike I rented was in perfect condition, and the process was smooth. Highly recommend this service!",
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "/images/user2.jpg",
      quote:
        "Amazing experience! The staff was friendly, and I found the perfect bike for my weekend adventure.",
    },
    {
      id: 3,
      name: "Mark Taylor",
      image: "/images/user3.jpg",
      quote:
        "Great selection of bikes and affordable pricing. I'll definitely rent from here again!",
    },
    {
      id: 4,
      name: "Emma Brown",
      image: "/images/user4.jpg",
      quote:
        "The online booking system was seamless, and the bike was ready when I arrived. A+ service!",
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-r from-blue-100 to-blue-50">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl">
          What Our Customers Say
        </h2>
        <p className="mt-4 text-lg text-center text-gray-600">
          Hear from our happy customers who love renting bikes from us!
        </p>

        {/* Testimonials Grid */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 text-center"
            >
              {/* Customer Image */}
              <div className="mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-blue-600"
                />
              </div>

              {/* Customer Quote */}
              <blockquote className="text-gray-700 italic">
                “{testimonial.quote}”
              </blockquote>

              {/* Customer Name */}
              <p className="mt-4 font-semibold text-gray-900">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
