import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

interface Review {
  _id: string;
  user: {
    name: string;
  };
  text: string;
  imageUrl?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          "https://bike-rental-reservation-system-backend-gamma.vercel.app/api/reviews/public"
        );
        setReviews(res.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="py-16 ">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <motion.h2
          className="text-3xl font-bold text-center text-gray-900 sm:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          What Our Customers Say
        </motion.h2>

        <motion.p
          className="mt-4 text-base sm:text-lg text-center text-gray-600"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          viewport={{ once: true }}
        >
          Honest reviews from our satisfied riders.
        </motion.p>

        {/* Testimonials Grid */}
        <motion.div
          className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {!loading && reviews.length > 0 ? (
            reviews.slice(0, visibleCount).map((review) => (
              <motion.div
                key={review._id}
                className=" border border-gray-100 p-5 rounded-xl shadow-sm hover:shadow-md transition duration-300 text-center"
                variants={cardVariants}
              >
                <div className="mb-4">
                  {review.imageUrl ? (
                    <img
                      src={review.imageUrl}
                      alt={review.user.name}
                      className="w-14 h-14 mx-auto rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 mx-auto bg-blue-600 text-white flex items-center justify-center text-lg font-semibold rounded-full">
                      {review.user.name.charAt(0)}
                    </div>
                  )}
                </div>
                <blockquote className="text-sm text-gray-700 italic">
                  “{review.text}”
                </blockquote>
                <p className="mt-2 text-sm font-medium text-gray-900">
                  {review.user.name}
                </p>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              {loading ? "Loading testimonials..." : "No testimonials found."}
            </div>
          )}
        </motion.div>

        {/* Show More Button */}
        {visibleCount < reviews.length && (
          <div className="mt-8 text-center">
            <button
              onClick={handleShowMore}
              className="px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
