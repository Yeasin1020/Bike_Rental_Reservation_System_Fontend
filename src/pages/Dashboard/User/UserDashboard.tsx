import { useEffect, useState } from "react";
import {
  FaUser,
  FaBicycle,
  FaBook,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import UserProfilePage from "./UserProfile";
import BikeList from "../../BikeList/BikeList";
import RentalHistory from "./RentalHistory";

const LOCAL_STORAGE_KEY = "user-dashboard-selected-section";

const UserDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState("userProfile");

  // Load selection from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) setSelectedSection(saved);
  }, []);

  // Update localStorage on section change
  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
    localStorage.setItem(LOCAL_STORAGE_KEY, section);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "userProfile":
        return <UserProfilePage />;
      case "bikeBooking":
        return <BikeList />;
      case "rentalHistory":
        return <RentalHistory />;
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
        {/* Top: Title + Close */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">User Dashboard</h2>
            <button
              className="text-gray-400 focus:outline-none md:hidden"
              onClick={toggleSidebar}
            >
              <FaTimes />
            </button>
          </div>

          <ul className="space-y-2">
            <SidebarItem
              icon={<FaUser className="mr-3" />}
              label="Profile"
              section="userProfile"
              active={selectedSection === "userProfile"}
              onClick={handleSectionChange}
            />
            <SidebarItem
              icon={<FaBicycle className="mr-3" />}
              label="Book Bike"
              section="bikeBooking"
              active={selectedSection === "bikeBooking"}
              onClick={handleSectionChange}
            />
            <SidebarItem
              icon={<FaBook className="mr-3" />}
              label="Rental History"
              section="rentalHistory"
              active={selectedSection === "rentalHistory"}
              onClick={handleSectionChange}
            />
          </ul>
        </div>

        {/* Bottom: Settings */}
        <div>
          <SidebarItem
            icon={<FaCog className="mr-3" />}
            label="Settings"
            section="settings"
            active={selectedSection === "settings"}
            onClick={handleSectionChange}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-2 lg:p-8 overflow-y-auto">
        {/* Mobile toggle */}
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

// ✅ Reusable Sidebar Item Component
const SidebarItem = ({
  icon,
  label,
  section,
  active,
  onClick,
}: {
  icon: JSX.Element;
  label: string;
  section: string;
  active: boolean;
  onClick: (section: string) => void;
}) => {
  return (
    <li>
      <button
        onClick={() => onClick(section)}
        className={`flex items-center w-full p-2 rounded-md text-left transition ${
          active ? "bg-blue-700" : "hover:bg-blue-700"
        }`}
      >
        {icon}
        {label}
      </button>
    </li>
  );
};
