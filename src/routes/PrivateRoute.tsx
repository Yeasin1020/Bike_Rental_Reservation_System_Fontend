// // src/routes/PrivateRoute.tsx
// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";

// interface PrivateRouteProps {
//   children: React.ReactNode;
//   requiredRole: "admin" | "user";
// }

// const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
//   const { loggedIn, role } = useSelector((state: RootState) => state.login);

//   if (!loggedIn) {
//     return <Navigate to="/login" />;
//   }

//   if (role !== requiredRole) {
//     return (
//       <Navigate
//         to={role === "admin" ? "/admin-dashboard" : "/user-dashboard"}
//       />
//     );
//   }

//   return <>{children}</>;
// };

// export default PrivateRoute;
