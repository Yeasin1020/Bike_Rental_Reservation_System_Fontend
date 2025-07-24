import { useState } from "react";
import {
  FaUser,
  FaBicycle,
  FaBook,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa"; // Placeholder component for Rental History
import UserProfilePage from "./UserProfile";
import BikeList from "../../BikeList/BikeList";
import RentalHistory from "./RentalHistory";
// import { AppDispatch } from "../../../redux/store"; // Adjust according to your setup
// import { useDispatch } from "react-redux";

const UserDashboard: React.FC = () => {
  // const dispatch: AppDispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState("profile");

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "userProfileManagement":
        return <UserProfilePage></UserProfilePage>;
      case "bikeBooking":
        return <BikeList></BikeList>;
      case "rentalHistory":
        return <RentalHistory></RentalHistory>;
      case "settings":
        return <div>User Settings Section</div>;
      default:
        return <UserProfilePage />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 w-64 bg-[#18202F] text-white p-4 z-50 transform
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    transition-transform duration-300 md:translate-x-0 flex flex-col justify-between h-full`}
      >
        {/* Top part: Title + Close + Menu Buttons */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">User Dashboard</h2>
            <button
              className="text-gray-400  focus:outline-none md:hidden"
              onClick={toggleSidebar}
            >
              <FaTimes />
            </button>
          </div>
          <ul>
            <li>
              <button
                onClick={() => setSelectedSection("userProfile")}
                className={`flex items-center p-2 rounded-md ${
                  selectedSection === "userProfile"
                    ? "bg-blue-700"
                    : "hover:bg-blue-700"
                }`}
              >
                <FaUser className="mr-3" /> Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection("bikeBooking")}
                className={`flex items-center p-2 rounded-md ${
                  selectedSection === "bikeBooking"
                    ? "bg-blue-700"
                    : "hover:bg-blue-700"
                }`}
              >
                <FaBicycle className="mr-3" /> Book Bike
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection("rentalHistory")}
                className={`flex items-center p-2 rounded-md ${
                  selectedSection === "rentalHistory"
                    ? "bg-blue-700"
                    : "hover:bg-blue-700"
                }`}
              >
                <FaBook className="mr-3" /> Rental History
              </button>
            </li>
          </ul>
        </div>

        {/* Bottom part: Settings button */}
        <div>
          <button
            onClick={() => setSelectedSection("settings")}
            className={`flex items-center p-2 rounded-md w-full ${
              selectedSection === "settings"
                ? "bg-blue-700"
                : "hover:bg-blue-700"
            }`}
          >
            <FaCog className="mr-3" /> Settings
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-1 lg:p-8 bg-gray-100 overflow-y-auto">
        <div className="md:hidden mb-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-700 focus:outline-none p-2 ml-3 rounded-md hover:bg-gray-200 transition"
          >
            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
        <div className="space-y-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default UserDashboard;
