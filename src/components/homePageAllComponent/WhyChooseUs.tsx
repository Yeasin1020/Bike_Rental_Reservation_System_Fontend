import { motion } from "framer-motion";

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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const WhyChooseUs = () => {
  return (
    <div className="py-20">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Heading */}
        <motion.h2
          className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Why Choose Us
        </motion.h2>

        <motion.p
          className="mt-4 text-lg text-center text-gray-600"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          viewport={{ once: true }}
        >
          Discover why our customers keep coming back to us for their bike
          rental needs!
        </motion.p>

        {/* Benefits Grid */}
        <motion.div
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              className="flex flex-col items-center text-center  border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{benefit.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
