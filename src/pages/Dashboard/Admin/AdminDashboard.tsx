import { useEffect, useState } from "react";
import {
  FaUserCog,
  FaBicycle,
  FaUsers,
  FaGift,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import AdminProfilePage from "./AdminProfilePage";
import BikeManagement from "./BikeManagement";
import UserManagement from "./UserManagement";
import ReturnBike from "./ReturnBike";

const LOCAL_STORAGE_KEY = "admin-dashboard-selected-section";

const AdminDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState("profile");

  // 🔁 Load from localStorage on mount
  useEffect(() => {
    const savedSection = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedSection) {
      setSelectedSection(savedSection);
    }
  }, []);

  // 💾 Save selection to localStorage
  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
    localStorage.setItem(LOCAL_STORAGE_KEY, section);
  };

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
        return <div>Coupon Management Coming soon</div>;
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
        <ul className="space-y-2">
          <SidebarItem
            icon={<FaUserCog className="mr-3" />}
            label="Profile Management"
            section="adminProfileManagement"
            active={selectedSection === "adminProfileManagement"}
            onClick={handleSectionChange}
          />
          <SidebarItem
            icon={<FaBicycle className="mr-3" />}
            label="Bike Management"
            section="bikesManagement"
            active={selectedSection === "bikesManagement"}
            onClick={handleSectionChange}
          />
          <SidebarItem
            icon={<FaUsers className="mr-3" />}
            label="User Management"
            section="usersManagement"
            active={selectedSection === "usersManagement"}
            onClick={handleSectionChange}
          />
          <SidebarItem
            icon={<FaBicycle className="mr-3" />}
            label="Return Bike"
            section="returnBike"
            active={selectedSection === "returnBike"}
            onClick={handleSectionChange}
          />
          <SidebarItem
            icon={<FaGift className="mr-3" />}
            label="Coupon Management"
            section="coupons"
            active={selectedSection === "coupons"}
            onClick={handleSectionChange}
          />
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Mobile Sidebar Toggle */}
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

// ✅ SidebarItem as Reusable Component
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
          active ? "bg-gray-700" : "hover:bg-gray-700"
        }`}
      >
        {icon}
        {label}
      </button>
    </li>
  );
};
