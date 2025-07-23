import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">BikeRental</h3>
          <p className="text-gray-400 text-sm">
            Your go-to platform for renting bikes with the best selection and
            unbeatable service. Explore the world on two wheels today!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:underline text-gray-400">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/bikes" className="hover:underline text-gray-400">
                Available Bikes
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline text-gray-400">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media & Policies */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 mb-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaFacebook size={28} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaTwitter size={28} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaInstagram size={28} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaLinkedin size={28} />
            </a>
          </div>
          <ul className="text-sm space-y-2">
            <li>
              <Link
                to="/privacy-policy"
                className="hover:underline text-gray-400"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms-of-service"
                className="hover:underline text-gray-400"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider and Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} BikeRental. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
