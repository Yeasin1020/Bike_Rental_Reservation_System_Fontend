import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    image: "",
    quote:
      "The bike I rented was in perfect condition, and the process was smooth. Highly recommend this service!",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "", // No image here
    quote:
      "Amazing experience! The staff was friendly, and I found the perfect bike for my weekend adventure.",
  },
  {
    id: 3,
    name: "Mark Taylor",
    image: "",
    quote:
      "Great selection of bikes and affordable pricing. I'll definitely rent from here again!",
  },
  {
    id: 4,
    name: "Emma Brown",
    image: "", // No image
    quote:
      "The online booking system was seamless, and the bike was ready when I arrived. A+ service!",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Testimonials = () => {
  return (
    <div className="py-20  ">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Heading */}
        <motion.h2
          className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          What Our Customers Say
        </motion.h2>

        <motion.p
          className="mt-4 text-lg text-center text-gray-600"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          viewport={{ once: true }}
        >
          Hear from our happy customers who love renting bikes from us!
        </motion.p>

        {/* Testimonials Grid */}
        <motion.div
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className=" border border-gray-200 rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300"
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
            >
              {/* Customer Image or Fallback Initial */}
              <div className="mb-4">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-blue-600"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full mx-auto bg-blue-600 text-white flex items-center justify-center text-xl font-bold border-4 border-blue-600">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Customer Quote */}
              <blockquote className="text-gray-700 italic">
                “{testimonial.quote}”
              </blockquote>

              {/* Customer Name */}
              <p className="mt-4 font-semibold text-gray-900">
                {testimonial.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
