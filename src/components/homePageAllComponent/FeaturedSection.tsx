import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useGetBikesQuery } from "../../redux/api/bikeApi";
import { Bike } from "../../utils/type/bike";
import { Link } from "react-router-dom";
import BikeCardSkeleton from "./BikeCardSkeleton";

const FeaturedSection: React.FC = () => {
  const { data, error, isLoading } = useGetBikesQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const bikes: Bike[] = useMemo(() => {
    return Array.isArray(data?.data) ? data.data : [];
  }, [data]);

  const [visibleCount, setVisibleCount] = useState(8);
  const visibleBikes = bikes.slice(0, visibleCount);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  if (isLoading) return <BikeCardSkeleton />;
  if (error)
    return (
      <p className="text-center text-red-500">Failed to load featured bikes.</p>
    );
  const getBikeId = (id: string | { $oid: string }): string => {
    if (typeof id === "object" && id !== null && "$oid" in id) {
      return id.$oid;
    }
    return id as string;
  };
  return (
    <section className="py-16 ">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            🚴 Featured Bikes
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore our selection of top-quality bikes for every kind of rider.
          </p>
        </div>

        {/* Bike Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {visibleBikes.map((bike) => (
            <motion.div
              key={getBikeId(bike._id)} // safe string key here
              whileHover={{ scale: 1.02 }}
              className="border rounded-xl shadow hover:shadow-lg transition-all duration-200 overflow-hidden bg-white flex flex-col"
            >
              <img
                src={
                  bike.imageUrls?.[0] || "https://via.placeholder.com/400x250"
                }
                alt={bike.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                  {bike.name}
                </h2>
                <p className="text-gray-600 text-sm mb-1">
                  {bike.brand} • {bike.model} • {bike.cc}cc
                </p>

                {bike.averageRating !== undefined && (
                  <div className="text-sm text-yellow-600 flex gap-1 items-center mb-1">
                    ⭐ {bike.averageRating.toFixed(1)}/5
                    <span className="text-gray-500 ml-1">
                      ({bike.totalRatings ?? 0} review
                      {bike.totalRatings === 1 ? "" : "s"})
                    </span>
                  </div>
                )}

                <p className="text-gray-500 text-sm mb-1">
                  📍 {bike.location.city}
                  {bike.location.area ? `, ${bike.location.area}` : ""}
                </p>

                <div className="mt-auto pt-3">
                  <p className="text-blue-600 font-semibold text-base">
                    ৳ {bike.pricePerHour}/hr
                  </p>
                  <p
                    className={`text-sm mt-1 font-medium ${
                      bike.isAvailable ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {bike.isAvailable ? "Available" : "Not Available"}
                  </p>

                  <Link
                    to={`/bike-details/${bike._id}`}
                    className="mt-3 block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* See More Button */}
        {visibleCount < bikes.length && (
          <div className="text-center mt-10">
            <button
              onClick={handleSeeMore}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-5 py-2 rounded-md"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedSection;
