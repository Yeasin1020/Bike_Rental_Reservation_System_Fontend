import { useState } from "react";
import {
  FaUserCog,
  FaBicycle,
  FaUsers,
  FaGift,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import AdminProfilePage from "./AdminProfilePage"; // Placeholder component for Profile Management
import BikeManagement from "./BikeManagement"; // Placeholder component for Bike Management
import UserManagement from "./UserManagement";
import ReturnBike from "./ReturnBike";

const AdminDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState("profile");

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "adminProfileManagement":
        return <AdminProfilePage />;
      case "bikesManagement":
        return <BikeManagement />;
      case "usersManagement":
        return <UserManagement />;
      case "returnBike":
        return <ReturnBike />;
      case "coupons":
        return <div>Coupon Management Section</div>;
      default:
        return <AdminProfilePage />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 w-64 bg-gray-800 text-white p-4 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
          <button
            className="text-gray-400 focus:outline-none md:hidden"
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
        </div>
        <ul>
          <li>
            <button
              onClick={() => setSelectedSection("adminProfileManagement")}
              className={`flex items-center p-2 rounded-md ${
                selectedSection === "adminProfileManagement"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              <FaUserCog className="mr-3" /> Profile Management
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedSection("bikesManagement")}
              className={`flex items-center p-2 rounded-md ${
                selectedSection === "bikesManagement"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              <FaBicycle className="mr-3" /> Bike Management
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedSection("usersManagement")}
              className={`flex items-center p-2 rounded-md ${
                selectedSection === "usersManagement"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              <FaUsers className="mr-3" /> User Management
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedSection("returnBike")}
              className={`flex items-center p-2 rounded-md ${
                selectedSection === "returnBike"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              <FaBicycle className="mr-3" /> Return Bike
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedSection("coupons")}
              className={`flex items-center p-2 rounded-md ${
                selectedSection === "coupons"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              <FaGift className="mr-3" /> Coupon Management
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        <div className="md:hidden mb-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-700 focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div className="space-y-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
