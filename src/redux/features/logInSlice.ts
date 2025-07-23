// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const initialState = {
// 	email: "",
// 	password: "",
// 	isLoggedIn: false, // Added isLoggedIn to manage login state
// };

// const loginSlice = createSlice({
// 	name: "login",
// 	initialState,
// 	reducers: {
// 		setEmail(state, action: PayloadAction<string>) {
// 			state.email = action.payload;
// 		},
// 		setPassword(state, action: PayloadAction<string>) {
// 			state.password = action.payload;
// 		},
// 		setLoggedIn(state, action: PayloadAction<boolean>) {
// 			state.isLoggedIn = action.payload; // Set the logged-in status
// 		},
// 	},
// });

// export const { setEmail, setPassword, setLoggedIn } = loginSlice.actions;

// export default loginSlice.reducer;