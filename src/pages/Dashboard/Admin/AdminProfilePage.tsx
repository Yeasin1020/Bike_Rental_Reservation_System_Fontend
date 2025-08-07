import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { AppDispatch, RootState } from "../../../redux/store";
import { logout } from "../../../redux/features/auth/authSlice";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../redux/api/userManagementApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileSkeleton from "./Skeleton/ProfileSkeleton";

const UserProfilePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isImageError, setIsImageError] = useState(false);

  const {
    data: profile,
    isLoading: isFetching,
    isError,
  } = useGetProfileQuery(undefined);

  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    profilePicture: "",
    phone: "",
    address: "",
    role: "",
  });

  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);

  useEffect(() => {
    if (profile?.data) {
      const { name, email, profilePicture, phone, address, role } =
        profile.data;
      setProfileData({
        name: name || "Unknown",
        email: email || "",
        profilePicture: profilePicture || "/default-avatar.png",
        phone: phone || "",
        address: address || "",
        role: role || "user",
      });
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
        userId: user?._id as string,
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
      const { name, email, profilePicture, phone, address, role } =
        profile.data;
      setProfileData({
        name: name || "Unknown",
        email: email || "",
        profilePicture: profilePicture || "/default-avatar.png",
        phone: phone || "",
        address: address || "",
        role: role || "user",
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

  if (isFetching) return <ProfileSkeleton></ProfileSkeleton>;

  if (isError) {
    toast.error("Error fetching profile data");
    return (
      <div className="text-center text-red-500 font-medium py-6">
        Error loading profile
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className=" shadow-xl rounded-xl p-8 transition-all duration-300">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          My Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              {profileData.profilePicture && !isImageError ? (
                <img
                  src={profileData.profilePicture}
                  alt="Profile"
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-lg object-cover transition-transform duration-300 hover:scale-105"
                  onError={() => setIsImageError(true)}
                />
              ) : (
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center text-4xl sm:text-5xl font-semibold text-gray-700">
                    {profileData.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                </div>
              )}
            </div>

            {isEditing && (
              <div className="mt-3 text-center">
                <label
                  htmlFor="profilePicture"
                  className="text-blue-600 cursor-pointer hover:underline text-sm"
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

          {/* Profile Info */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ProfileField
              label="Full Name"
              value={profileData.name}
              editable={isEditing}
              onChange={(val) => setProfileData({ ...profileData, name: val })}
            />
            <ProfileField
              label="Email"
              value={profileData.email}
              editable={false}
            />
            <ProfileField
              label="Phone"
              value={profileData.phone}
              editable={isEditing}
              onChange={(val) => setProfileData({ ...profileData, phone: val })}
            />
            <ProfileField
              label="Address"
              value={profileData.address}
              editable={isEditing}
              onChange={(val) =>
                setProfileData({ ...profileData, address: val })
              }
            />
            <ProfileField
              label="Role"
              value={profileData.role}
              editable={false}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                <FaSave className="mr-2" />
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex items-center px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200"
              >
                <FaTimes className="mr-2" />
                Cancel
              </button>
            </>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-8">
              <button
                onClick={handleEditProfile}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition duration-200 w-full sm:w-auto"
              >
                <FaEdit className="opacity-80" />
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm transition duration-200 w-full sm:w-auto"
              >
                <FaEdit className="opacity-80 rotate-180" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default UserProfilePage;

// 🔄 Reusable input field component
const ProfileField = ({
  label,
  value,
  editable,
  onChange,
}: {
  label: string;
  value: string;
  editable: boolean;
  onChange?: (value: string) => void;
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {editable ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      ) : (
        <p className="text-gray-800 font-medium">{value || "N/A"}</p>
      )}
    </div>
  );
};
