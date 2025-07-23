import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayouts from "../components/layouts/MainLayouts";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import BikeList from "../pages/BikeList/BikeList";
import BikeDetails from "../pages/BikeDetails/BikeDetails";
import UserDashboard from "../pages/Dashboard/User/UserDashboard";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import LoginForm from "../pages/LogIn/LoginPage";
import { useAppSelector } from "../redux/hooks"; // Assuming Redux for authentication state
import AdminProfilePage from "../pages/Dashboard/Admin/AdminProfilePage";
import BikeManagement from "../pages/Dashboard/Admin/BikeManagement";
import UserManagement from "../pages/Dashboard/Admin/UserManagement";
import ReturnBike from "../pages/Dashboard/Admin/ReturnBike";
import UserProfilePage from "../pages/Dashboard/User/UserProfile";

// AuthWrapper Component
// eslint-disable-next-line react-refresh/only-export-components
const AuthWrapper = ({
  allowedRole,
  children,
}: {
  allowedRole: string;
  children: React.ReactNode;
}) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return user?.role === allowedRole ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace />
  );
};

// Router configuration
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      { index: true, element: <Home /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/bike-list", element: <BikeList /> },
      { path: "/bike-detail/:id", element: <BikeDetails /> },
      { path: "/login", element: <LoginForm /> },
      {
        path: "/userDashboard",
        element: (
          <AuthWrapper allowedRole="user">
            <UserDashboard />
          </AuthWrapper>
        ),
        children: [
          { path: "userProfileManagement", element: <UserProfilePage /> },
        ],
      },
      {
        path: "/adminDashboard",
        element: (
          <AuthWrapper allowedRole="admin">
            <AdminDashboard />
          </AuthWrapper>
        ),
        children: [
          { path: "adminProfileManagement", element: <AdminProfilePage /> },
          { path: "bikesManagement", element: <BikeManagement /> },
          { path: "adminProfileManagement", element: <UserManagement /> },
          { path: "returnBike", element: <ReturnBike /> },
        ],
      },
    ],
  },
]);
