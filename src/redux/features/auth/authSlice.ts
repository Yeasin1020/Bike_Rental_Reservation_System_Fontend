// features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
	_id: string;
	name: string;
	email: string;
	role: string;
	profilePicture?: string;
};

export type TAuthState = {
	user: User | null;
	token: string | null;
};

// ✅ Define the payload type separately
type SetUserPayload = {
	user: User;
	token: string;
};

const initialState: TAuthState = {
	user: null,
	token: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<SetUserPayload>) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
		},
	},
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
