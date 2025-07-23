// // src/redux/features/bikeSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import { Document } from 'mongoose';  // Import Document from mongoose

// export type TBike = {
// 	name: string;
// 	description: string;
// 	pricePerHour: number;
// 	isAvailable: boolean;
// 	cc: number;
// 	year: number;
// 	model: string;
// 	brand: string;
// } & Document;

// interface BikeState {
// 	bikes: TBike[]; // Use TBike as the type for bikes array
// 	loading: boolean;
// 	error: string | null;
// }

// const initialState: BikeState = {
// 	bikes: [],
// 	loading: false,
// 	error: null,
// };

// const bikeSlice = createSlice({
// 	name: 'bikes',
// 	initialState,
// 	reducers: {
// 		setBikes: (state, action: PayloadAction<TBike[]>) => {
// 			state.bikes = action.payload;
// 		},
// 		setLoading: (state, action: PayloadAction<boolean>) => {
// 			state.loading = action.payload;
// 		},
// 		setError: (state, action: PayloadAction<string | null>) => {
// 			state.error = action.payload;
// 		},
// 	},
// });

// export const { setBikes, setLoading, setError } = bikeSlice.actions;

// export default bikeSlice.reducer;
