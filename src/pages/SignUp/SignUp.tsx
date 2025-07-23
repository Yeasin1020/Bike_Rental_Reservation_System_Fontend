// import React from "react";
// import { toast, ToastContainer } from "react-toastify"; // Correct import here
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { RootState } from "../../redux/store";
// import { useSignUpMutation } from "../../redux/features/auth/authApi";
// import {
//   setAddress,
//   setEmail,
//   setName,
//   setPassword,
//   setPhone,
// } from "../../redux/features/signUpSlice";

// const SignUp: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { name, email, password, phone, role, address } = useAppSelector(
//     (state: RootState) => state.signup
//   );

//   const [signup] = useSignUpMutation();
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validation check before making API call
//     if (!name || !email || !password || !phone || !address) {
//       toast.error("Please fill in all fields.");
//       return;
//     }

//     try {
//       const user = await signup({
//         name,
//         email,
//         password,
//         phone,
//         role,
//         address,
//       });

//       if (user?.data) {
//         toast.success("Sign-up successful!");
//         setTimeout(() => {
//           navigate("/login");
//         }, 2000);
//       }
//     } catch (err) {
//       toast.error("Sign-up failed. Please try again.");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1" htmlFor="name">
//             Name
//           </label>
//           <input
//             id="name"
//             value={name}
//             onChange={(e) => dispatch(setName(e.target.value))}
//             type="text"
//             placeholder="Enter your name"
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1" htmlFor="email">
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => dispatch(setEmail(e.target.value))}
//             placeholder="Enter your email"
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1" htmlFor="password">
//             Password
//           </label>
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => dispatch(setPassword(e.target.value))}
//             placeholder="Enter your password"
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div className="mb-4">
//           <label
//             className="block text-sm font-medium mb-1"
//             htmlFor="phoneNumber"
//           >
//             Phone Number
//           </label>
//           <input
//             id="phoneNumber"
//             type="tel"
//             value={phone}
//             onChange={(e) => dispatch(setPhone(e.target.value))}
//             placeholder="Enter your phone number"
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1" htmlFor="address">
//             Address
//           </label>
//           <textarea
//             id="address"
//             value={address}
//             onChange={(e) => dispatch(setAddress(e.target.value))}
//             placeholder="Enter your address"
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <button
//           type="submit"
//           className="px-8 py-3 bg-[#005FA8] text-white font-semibold rounded-lg shadow-md hover:bg-[#002766] transition-colors transform hover:scale-110 active:scale-95"
//         >
//           Sign Up
//         </button>
//       </form>

//       {/* Toast container to render notifications */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default SignUp;
