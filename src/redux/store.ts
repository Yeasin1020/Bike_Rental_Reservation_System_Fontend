import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import { bikeApi } from './api/bikeApi';
import { userManagementApi } from './api/userManagementApi';
import { bikeReturnApi } from './api/bikeRentalApi';
import { baseApi } from './api/baseApi';
import { reviewApi } from './api/bikeReviewApi';

// Persist config for auth
const persistConfig = {
	key: 'auth',
	storage,
};

// Apply persist to auth reducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Create the store
export const store = configureStore({
	reducer: {
		auth: persistedAuthReducer,

		// RTK Query APIs
		[bikeApi.reducerPath]: bikeApi.reducer,
		[userManagementApi.reducerPath]: userManagementApi.reducer,
		[bikeReturnApi.reducerPath]: bikeReturnApi.reducer,
		[baseApi.reducerPath]: baseApi.reducer,
		[reviewApi.reducerPath]: reviewApi.reducer, // ✅ include reviewApi reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(
			bikeApi.middleware,
			userManagementApi.middleware,
			bikeReturnApi.middleware,
			baseApi.middleware,
			reviewApi.middleware // ✅ include reviewApi middleware
		),
});

// Export persistor for usage with PersistGate
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
