import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { AppDispatch, RootState } from "../../../redux/store";
import { logout } from "../../../redux/features/auth/authSlice";
import md5 from "md5";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../redux/api/userManagementApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminProfilePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const {
    data: profile,
    isLoading: isFetching,
    isError,
  } = useGetProfileQuery();
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    role: "",
    profilePicture: "",
  });
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);

  // Update state when the profile data is fetched
  useEffect(() => {
    if (profile?.data) {
      setProfileData({
        name: profile.data.name || "Unknown",
        email: profile.data.email || "",
        role: profile.data.role || "Admin",
        profilePicture: profile.data.profilePicture || "/default-avatar.png",
      });
    }
  }, [profile]);

  // Fallback to Gravatar if no image is found in the database
  useEffect(() => {
    if (
      !profile?.data?.profilePicture &&
      profile?.data?.email &&
      profile?.data?.email.includes("@")
    ) {
      const gravatarHash = md5(profile.data.email.trim().toLowerCase());
      const gravatarUrl = `https://www.gravatar.com/avatar/${gravatarHash}?d=identicon`;
      setProfileData((prev) => ({
        ...prev,
        profilePicture: gravatarUrl,
      }));
    }
  }, [profile]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Successfully logged out!");
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    toast.info("Editing profile...");
  };

  const handleSaveProfile = async () => {
    try {
      const updatedData = { ...profileData };
      if (newProfilePicture) {
        updatedData.profilePicture = URL.createObjectURL(newProfilePicture);
      }

      await updateProfile({
        userId: user?._id,
        userData: updatedData,
      }).unwrap();

      setIsEditing(false);
      toast.success("Profile updated successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Failed to update profile: " + error.message);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (profile?.data) {
      setProfileData({
        name: profile.data.name || "Unknown",
        email: profile.data.email || "",
        role: profile.data.role || "Admin",
        profilePicture: profile.data.profilePicture || "/default-avatar.png",
      });
    }
    setNewProfilePicture(null);
    toast.info("Edit canceled");
  };

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setNewProfilePicture(file);

      const fileReader = new FileReader();
      fileReader.onload = () => {
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: fileReader.result as string,
        }));
      };
      fileReader.readAsDataURL(file);
    }
  };

  if (isFetching) {
    return <div>Loading profile...</div>;
  }

  if (isError) {
    toast.error("Error fetching profile data");
    return <div>Error fetching profile data</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-lg p-6 transition-all duration-300 ease-in-out">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Admin Profile
        </h1>

        <div className="flex flex-col items-center sm:flex-row sm:space-x-8">
          {/* Profile Picture Section */}
          <div className="relative mb-6 sm:mb-0">
            <img
              src={profileData.profilePicture || "/default-avatar.png"}
              alt="Profile"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gray-200 shadow-xl"
            />
            {isEditing && (
              <div className="mt-3 text-center">
                <label
                  className="cursor-pointer text-blue-600 hover:text-blue-800"
                  htmlFor="profilePicture"
                >
                  Change Picture
                </label>
                <input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePictureChange}
                />
              </div>
            )}
          </div>

          {/* Profile Information Section */}
          <div className="w-full sm:w-2/3">
            {/* Name */}
            <div className="mb-6">
              <label
                className="block text-lg font-semibold text-gray-700 mb-2"
                htmlFor="name"
              >
                Name:
              </label>
              {isEditing ? (
                <input
                  id="name"
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              ) : (
                <p className="text-xl font-semibold text-gray-800">
                  {profileData.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-6">
              <label
                className="block text-lg font-semibold text-gray-700 mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <p className="text-xl font-semibold text-gray-800">
                {profileData.email}
              </p>
            </div>

            {/* Role */}
            <div className="mb-6">
              <label
                className="block text-lg font-semibold text-gray-700 mb-2"
                htmlFor="role"
              >
                Role:
              </label>
              <p className="text-xl font-semibold text-gray-800">
                {profileData.role}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center space-x-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    disabled={isSaving}
                  >
                    <FaSave className="mr-2" />
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    <FaTimes className="mr-2" />
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleEditProfile}
                    className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                  >
                    <FaEdit className="mr-2" />
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminProfilePage;
