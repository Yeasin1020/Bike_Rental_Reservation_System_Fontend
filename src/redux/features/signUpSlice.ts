// // In SignUpSlice
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const initialState = {
// 	name: "",
// 	email: "",
// 	password: "",
// 	phone: "",
// 	role: "user",
// 	address: "",
// };

// const signUpSlice = createSlice({
// 	name: "signUp",
// 	initialState,
// 	reducers: {
// 		setName(state, action: PayloadAction<string>) {
// 			state.name = action.payload;
// 		},
// 		setEmail(state, action: PayloadAction<string>) {
// 			state.email = action.payload;
// 		},
// 		setPassword(state, action: PayloadAction<string>) {
// 			state.password = action.payload;
// 		},
// 		setPhone(state, action: PayloadAction<string>) {
// 			state.phone = action.payload;
// 		},
// 		setAddress(state, action: PayloadAction<string>) {
// 			state.address = action.payload;
// 		},
// 		resetSignUp(state) {
// 			// Reset to the initial state
// 			Object.assign(state, initialState);
// 		},
// 	},
// });

// export const {
// 	setName,
// 	setEmail,
// 	setPassword,
// 	setPhone,
// 	setAddress,
// 	resetSignUp,
// } = signUpSlice.actions;

// export default signUpSlice.reducer;