import React from "react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserToAdminMutation,
} from "../../../redux/api/userManagementApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../../components/ui/Loading";

// Define User type locally for UI usage
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  id: string; // mapped from _id for convenience
}

// Helper to safely get error message from RTK Query errors
function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ("data" in error && typeof (error as any).data === "object") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return ((error as any).data?.message as string) || "Unknown error";
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ("message" in error && typeof (error as any).message === "string") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (error as any).message;
    }
  }
  return "Unknown error";
}

const UserManagement: React.FC = () => {
  const { data, isLoading, isError, refetch, error } = useGetUsersQuery();

  // Map _id to id for UI usage
  const users: User[] = (data?.data || []).map((user) => ({
    ...user,
    id: user._id,
  }));

  const [deleteUser] = useDeleteUserMutation();
  const [updateUserToAdmin] = useUpdateUserToAdminMutation();

  const handleDeleteUser = async (userId: string | undefined) => {
    if (!userId) {
      toast.error("User ID is missing.");
      return;
    }
    try {
      await deleteUser(userId).unwrap();
      toast.success("User deleted successfully!");
      refetch();
    } catch (err) {
      toast.error(`Failed to delete user: ${getErrorMessage(err)}`);
    }
  };

  const handlePromoteToAdmin = async (userId: string | undefined) => {
    if (!userId) {
      toast.error("User ID is missing.");
      return;
    }
    try {
      await updateUserToAdmin(userId).unwrap();
      toast.success("User promoted to admin successfully!");
      refetch();
    } catch (err) {
      toast.error(`Failed to promote user: ${getErrorMessage(err)}`);
    }
  };

  if (isLoading) return <Loading></Loading>;

  if (isError)
    return <div className="p-6 text-red-500">{getErrorMessage(error)}</div>;

  if (!users.length)
    return <div className="p-6 text-gray-600">No users found.</div>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
      </div>

      {/* User List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className=" shadow-md rounded-lg p-4 border hover:shadow-lg transition-shadow"
          >
            {/* User Details */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {user.name}
              </h2>
              <p className="text-gray-600">{user.email}</p>
              <span
                className={`inline-block px-3 py-1 mt-2 text-sm rounded-full ${
                  user.role === "admin"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {user.role}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between gap-2">
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                aria-label={`Delete user ${user.name}`}
              >
                Delete
              </button>
              {user.role !== "admin" && (
                <button
                  onClick={() => handlePromoteToAdmin(user.id)}
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                  aria-label={`Promote ${user.name} to admin`}
                >
                  Promote to Admin
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default UserManagement;
