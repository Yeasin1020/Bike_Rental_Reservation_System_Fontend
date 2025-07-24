import { Link } from "react-router-dom";
import {
  FaMotorcycle,
  FaClock,
  FaMapMarkerAlt,
  FaTools,
  FaCalendarAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { useEffect } from "react";

const services = [
  {
    icon: <FaClock className="text-4xl text-blue-600" />,
    title: "Hourly & Daily Rentals",
    desc: "Rent bikes by the hour or for a full day – flexibility for your schedule.",
  },
  {
    icon: <FaMotorcycle className="text-4xl text-blue-600" />,
    title: "Scooter & Bike Options",
    desc: "Choose from a range of scooters and motorbikes suited to all needs.",
  },
  {
    icon: <FaMapMarkerAlt className="text-4xl text-blue-600" />,
    title: "Location-Based Pickup",
    desc: "Pick up your ride from a nearby hub – quick and convenient.",
  },
  {
    icon: <FaTools className="text-4xl text-blue-600" />,
    title: "On-Road Assistance",
    desc: "Emergency support available 24/7 while you’re on the road.",
  },
  {
    icon: <FaCalendarAlt className="text-4xl text-blue-600" />,
    title: "Advance Booking",
    desc: "Reserve your ride in advance to avoid last-minute hassle.",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-blue-600" />,
    title: "Well-Maintained Bikes",
    desc: "All bikes are regularly inspected for safety and cleanliness.",
  },
];

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-20">
      {/* Header */}
      <div className="text-center mb-14 max-w-2xl mx-auto px-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          🚗 Our Bike Rental Services
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Get on the road with our flexible and customer-friendly bike rental
          solutions. Available anytime, anywhere.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.map((service, i) => (
          <div
            key={i}
            className="bg-white shadow-md hover:shadow-xl rounded-2xl p-6 flex flex-col items-start space-y-3 transition duration-300"
          >
            <div className="p-3 bg-blue-100 rounded-full">{service.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm">{service.desc}</p>
          </div>
        ))}
      </div>

      {/* Why Choose Us */}
      <div className="mt-20 max-w-4xl mx-auto text-center px-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Why Choose Us?
        </h2>
        <ul className="text-gray-700 space-y-3 text-base sm:text-lg text-left sm:text-center">
          <li>✅ Wide variety of bike models</li>
          <li>✅ Transparent pricing – no hidden charges</li>
          <li>✅ 24/7 customer service support</li>
          <li>✅ Easy cancellation and refund policy</li>
          <li>✅ Trusted by thousands of happy riders</li>
        </ul>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <Link
          to="/bike-list"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-base sm:text-lg font-medium transition"
        >
          🚴 Browse Bikes Now
        </Link>
      </div>
    </section>
  );
};

export default Services;
