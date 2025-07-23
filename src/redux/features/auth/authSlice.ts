// features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
	name: string;
	email: string;
	role: string;
};

type TAuthState = {
	user: null | User;
	token: null | string;
};

const initialState: TAuthState = {
	user: null,
	token: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<TAuthState>) => {
			const { user, token } = action.payload;
			state.user = user;
			state.token = token;
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
		},
	},
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

// ✅ Add these exports
export type { User, TAuthState };
