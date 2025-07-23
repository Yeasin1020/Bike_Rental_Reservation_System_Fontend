import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { AppDispatch, RootState } from "../../redux/store";
import { logout } from "../../redux/features/auth/authSlice";

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const { user, token } = useSelector((state: RootState) => state.auth); // Get auth state

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false); // Close mobile menu on logout
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <span className="text-2xl font-bold">BikeRental</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/about-us"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            About Us
          </Link>
          <Link
            to="/bike-list"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Bike List
          </Link>
          <Link
            to="/services"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Services
          </Link>
          <Link
            to="/pricing"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Pricing
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Contact
          </Link>

          {/* Conditional Links */}
          {token ? (
            <>
              <Link
                to={`/${
                  user?.role === "admin" ? "adminDashboard" : "userDashboard"
                }`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
              >
                Logout
              </button>
              {/* Profile Icon */}
              <Link
                to="/profile"
                className="text-white hover:text-blue-400 transition-colors duration-200"
              >
                <FaUserCircle size={24} />
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
              >
                Login
              </Link>
              <Link
                to="/signUp"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 text-white">
          <div className="px-6 py-4 space-y-4">
            <Link
              to="/"
              className="block hover:text-blue-400 transition-colors duration-200"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className="block hover:text-blue-400 transition-colors duration-200"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link
              to="/bike-list"
              className="block hover:text-blue-400 transition-colors duration-200"
              onClick={toggleMenu}
            >
              Bike List
            </Link>
            <Link
              to="/services"
              className="block hover:text-blue-400 transition-colors duration-200"
              onClick={toggleMenu}
            >
              Services
            </Link>
            <Link
              to="/pricing"
              className="block hover:text-blue-400 transition-colors duration-200"
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className="block hover:text-blue-400 transition-colors duration-200"
              onClick={toggleMenu}
            >
              Contact
            </Link>

            {/* Conditional Links */}
            {token ? (
              <>
                <Link
                  to={`/${
                    user?.role === "admin" ? "adminDashboard" : "userDashboard"
                  }`}
                  className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
                >
                  Logout
                </button>
                <Link
                  to="/profile"
                  className="block text-white hover:text-blue-400 transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  <FaUserCircle size={24} />
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signUp"
                  className="block w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
