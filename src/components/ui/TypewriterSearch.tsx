import { useState, useEffect, ChangeEvent } from "react";
import { useGetBikesQuery } from "../../redux/api/bikeApi";
import { Bike } from "../../utils/type/bike";
import { useNavigate } from "react-router-dom";

const TypewriterSearch = () => {
  const fullText = "Search bike availability...";
  const [placeholder, setPlaceholder] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const { data, error, isLoading } = useGetBikesQuery();

  // Typewriter placeholder effect
  useEffect(() => {
    const speed = isDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setPlaceholder(fullText.slice(0, index + 1));
        setIndex(index + 1);
        if (index + 1 === fullText.length) setIsDeleting(true);
      } else {
        setPlaceholder(fullText.slice(0, index - 1));
        setIndex(index - 1);
        if (index - 1 === 0) setIsDeleting(false);
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const suggestions =
    query && data?.data
      ? data.data.filter((bike: Bike) =>
          bike.name.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  // Handle click on bike card
  const handleCardClick = (bikeId: string) => {
    navigate(`/bike-details/${bikeId}`);
  };

  return (
    <div className="w-full max-w-xl mx-auto relative">
      <div className="flex items-center bg-white/90 backdrop-blur-md rounded-lg shadow-md overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder || "Search bike availability..."}
          className="w-full px-4 py-3 text-gray-700 focus:outline-none"
          autoComplete="off"
        />
        <button className="px-5 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors duration-200">
          Search
        </button>
      </div>

      {/* Loading and error states */}
      {isLoading && (
        <div className="absolute w-full bg-white border border-gray-300 mt-1 p-3 text-gray-500 rounded-lg shadow">
          Loading...
        </div>
      )}
      {error && (
        <div className="absolute w-full bg-white border border-gray-300 mt-1 p-3 text-red-500 rounded-lg shadow">
          Failed to load suggestions.
        </div>
      )}

      {/* Bike suggestions */}
      {query && (
        <div className="absolute w-full bg-white border border-gray-200 rounded-lg mt-2 shadow-xl z-10 max-h-[450px] overflow-auto p-2 space-y-2">
          {suggestions.length > 0 ? (
            suggestions.map((bike: Bike) => {
              const bikeId =
                typeof bike._id === "object" && "$oid" in bike._id
                  ? bike._id.$oid
                  : (bike._id as string);

              return (
                <div
                  key={bikeId}
                  onClick={() => handleCardClick(bikeId)}
                  className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-blue-50 transition"
                >
                  {/* Image */}
                  <img
                    src={bike.imageUrls[0]}
                    alt={bike.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-800">
                      {bike.name}
                    </h4>
                    <p className="text-xs text-gray-600">
                      ৳{bike.pricePerHour}/hr &middot; {bike.brand} {bike.model}
                    </p>
                    <p className="text-xs text-gray-500">
                      {bike.location.city}, {bike.location.area}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500 py-6">
              <div className="flex flex-col items-center space-y-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75h.008v.008H9.75V9.75zm0 0a3 3 0 116.001.001 3 3 0 01-6.001-.001zM4.5 20.25l1.5-4.5m13.5 4.5l-1.5-4.5M6.75 15.75h10.5"
                  />
                </svg>
                <p className="font-medium text-sm">
                  No bikes found with that name.
                </p>
                <p className="text-xs">Try a different keyword.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TypewriterSearch;
