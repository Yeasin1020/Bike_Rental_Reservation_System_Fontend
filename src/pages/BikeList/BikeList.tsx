import { useEffect, useState } from "react";
import axios from "axios";

interface Bike {
  _id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  cc: number;
  pricePerHour: number;
  isAvailable: boolean;
  imageUrls: string[];
  location: {
    city: string;
    area?: string;
  };
}

const BikeList: React.FC = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [filteredBikes, setFilteredBikes] = useState<Bike[]>([]);
  const [search, setSearch] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const res = await axios.get(
          "https://bike-rental-reservation-system-backend-gamma.vercel.app/api/bikes"
        );
        setBikes(res.data.data);
        setFilteredBikes(res.data.data);
      } catch (err) {
        console.error("Failed to fetch bikes:", err);
      }
    };
    fetchBikes();
  }, []);

  useEffect(() => {
    let result = [...bikes];

    if (search) {
      result = result.filter((bike) =>
        [bike.name, bike.brand, bike.model].some((field) =>
          field.toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    if (filterBrand) {
      result = result.filter((bike) => bike.brand === filterBrand);
    }

    if (onlyAvailable) {
      result = result.filter((bike) => bike.isAvailable);
    }

    setFilteredBikes(result);
    setVisibleCount(6);
  }, [search, filterBrand, onlyAvailable, bikes]);

  const brands = Array.from(new Set(bikes.map((b) => b.brand)));

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-screen-2xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
        🏍️ Explore Available Bikes
      </h1>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <input
          type="text"
          placeholder="🔍 Search by name, brand or model..."
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-blue-400 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filterBrand}
          onChange={(e) => setFilterBrand(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-full"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
          />
          Show only available bikes
        </label>
      </div>

      {/* Bike Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBikes.slice(0, visibleCount).map((bike) => (
          <div
            key={bike._id}
            className="border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden bg-white flex flex-col"
          >
            <img
              src={bike.imageUrls?.[0] || "https://via.placeholder.com/400x250"}
              alt={bike.name}
              className="w-full h-48 object-cover"
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
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      {visibleCount < filteredBikes.length && (
        <div className="text-center mt-10">
          <button
            onClick={handleSeeMore}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-5 py-2 rounded-md"
          >
            See More
          </button>
        </div>
      )}

      {/* No Results */}
      {filteredBikes.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No bikes found 😞
        </p>
      )}
    </div>
  );
};

export default BikeList;
