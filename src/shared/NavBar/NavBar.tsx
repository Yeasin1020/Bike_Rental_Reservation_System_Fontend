import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { AppDispatch, RootState } from "../../redux/store";
import { logout } from "../../redux/features/auth/authSlice";

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );

  const dispatch: AppDispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
  };

  const commonLinkStyle =
    "hover:text-blue-400 transition duration-300 ease-in-out";
  const buttonStyle =
    "px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105";

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-md z-50 transition-transform duration-300 ${
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-wide">
            BikeRental
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={commonLinkStyle}>
              Home
            </Link>
            <Link to="/about-us" className={commonLinkStyle}>
              About Us
            </Link>
            <Link to="/bike-list" className={commonLinkStyle}>
              Bike List
            </Link>
            <Link to="/services" className={commonLinkStyle}>
              Services
            </Link>
            <Link to="/pricing" className={commonLinkStyle}>
              Pricing
            </Link>
            <Link to="/contact" className={commonLinkStyle}>
              Contact
            </Link>

            {token ? (
              <>
                <Link
                  to={`/${
                    user?.role === "admin" ? "adminDashboard" : "userDashboard"
                  }`}
                  className={`${buttonStyle} bg-blue-600 hover:bg-blue-500`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className={`${buttonStyle} bg-red-600 hover:bg-red-500`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`${buttonStyle} bg-blue-600 hover:bg-blue-500`}
                >
                  Login
                </Link>
                <Link
                  to="/signUp"
                  className={`${buttonStyle} bg-green-600 hover:bg-green-500`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded transition-transform duration-200 focus:outline-none focus:ring-0"
          >
            {menuOpen ? (
              <FaTimes
                size={22}
                className="text-white hover:scale-110 duration-300"
              />
            ) : (
              <FaBars
                size={22}
                className="text-white hover:scale-110 duration-300"
              />
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-gray-900 text-white">
            <div className="px-6 py-4 space-y-4 flex flex-col">
              {[
                "/",
                "/about-us",
                "/bike-list",
                "/services",
                "/pricing",
                "/contact",
              ].map((path, i) => (
                <Link
                  key={i}
                  to={path}
                  onClick={toggleMenu}
                  className="hover:text-blue-400 transition duration-300"
                >
                  {path === "/"
                    ? "Home"
                    : path
                        .replace("/", "")
                        .replace("-", " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                </Link>
              ))}

              {token ? (
                <>
                  <Link
                    to={`/${
                      user?.role === "admin"
                        ? "adminDashboard"
                        : "userDashboard"
                    }`}
                    className={`${buttonStyle} bg-blue-600 hover:bg-blue-500 w-full text-center`}
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`${buttonStyle} bg-red-600 hover:bg-red-500 w-full`}
                  >
                    Logout
                  </button>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 hover:text-blue-400 transition duration-300"
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
                    className={`${buttonStyle} bg-blue-600 hover:bg-blue-500 w-full text-center`}
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signUp"
                    className={`${buttonStyle} bg-green-600 hover:bg-green-500 w-full text-center`}
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
      {/* Optional: Padding to prevent overlap */}
      <div className="h-[60px] md:h-[63px]" />

      {/* adjust to match nav height */}
    </>
  );
};

export default NavBar;
