import { useParams } from "react-router-dom";

// Sample data for bikes
const bikes = [
  {
    id: 1,
    brand: "Trek FX 3",
    model: "2021",
    description: "A great bike for city rides",
    price: "100",
    cc: "100cc",
    available: true,
    image: "/images/bike1.jpg",
  },
  {
    id: 2,
    brand: "Cannondale Quick",
    model: "2020",
    description: "A fast bike for professional riders",
    price: "120",
    cc: "200cc",
    available: false,
    image: "/images/bike2.jpg",
  },
  {
    id: 3,
    brand: "Specialized Sirrus",
    model: "2022",
    description: "A reliable bike for commuting",
    price: "130",
    cc: "150cc",
    available: true,
    image: "/images/bike3.jpg",
  },
  {
    id: 4,
    brand: "Giant Escape 3",
    model: "2019",
    description: "An excellent bike for all terrains",
    price: "90",
    cc: "100cc",
    available: true,
    image: "/images/bike4.jpg",
  },
];

const BikeDetails = () => {
  const { id } = useParams();
  const bikeId = Number(id); // Convert the ID to number

  // Find the bike from the list using the bike ID
  const bike = bikes.find((bike) => bike.id === bikeId);

  if (!bike) {
    // Show "Bike not found" if no bike is found
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-red-600">Bike not found</h1>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 bg-gray-50">
      {/* Bike Card */}
      <div className="max-w-screen-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Bike Image */}
          <div className="lg:w-1/2">
            <img
              src={bike.image}
              alt={bike.brand}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Bike Info */}
          <div className="lg:w-1/2 p-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              {bike.brand} {bike.model}
            </h2>
            <p className="text-lg text-gray-700 mb-4">{bike.description}</p>
            <p className="text-lg text-gray-800 mb-4">
              <span className="font-semibold">Price:</span> ${bike.price}
            </p>
            <p className="text-lg text-gray-800 mb-4">
              <span className="font-semibold">CC:</span> {bike.cc}
            </p>
            <p className="text-lg text-gray-800 mb-4">
              <span className="font-semibold">Availability:</span>{" "}
              {bike.available ? "Available" : "Unavailable"}
            </p>

            {/* Book Now Button */}
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeDetails;
