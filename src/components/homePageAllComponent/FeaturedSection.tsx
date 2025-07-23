import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useGetBikesQuery } from "../../redux/api/bikeApi";
import { Bike } from "../../utils/type/bike";

const FeaturedSection: React.FC = () => {
  const { data, error, isLoading } = useGetBikesQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const bikes: Bike[] = useMemo(() => {
    return Array.isArray(data?.data) ? data.data : [];
  }, [data]);

  const [visibleCount, setVisibleCount] = useState(8);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  if (isLoading) return <p>Loading featured bikes...</p>;
  if (error) return <p>Failed to load featured bikes.</p>;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            🚴 Featured Bikes
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore our selection of top-quality bikes for every kind of rider.
          </p>
        </div>

        {/* Bike Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bikes.slice(0, visibleCount).map((bike) => (
            <motion.div
              key={
                typeof bike._id === "string"
                  ? bike._id
                  : bike._id?.$oid ?? bike.name
              }
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden bg-white flex flex-col"
            >
              <img
                src={
                  bike.imageUrls?.[0] ||
                  "https://placehold.co/400x250?text=No+Image"
                }
                alt={bike.name}
                className="w-full h-48 object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://placehold.co/400x250?text=No+Image";
                }}
                decoding="async"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                  {bike.name}
                </h2>
                <p className="text-gray-600 text-sm">
                  {bike.brand} • {bike.model} • {bike.cc}cc
                </p>
                <p className="text-gray-500 text-sm mt-1">
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
                  <button
                    onClick={() => alert(`Details of ${bike.name}`)}
                    className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm w-full"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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
