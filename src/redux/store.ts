// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { bikeApi } from './api/bikeApi';
import { userManagementApi } from './api/userManagementApi';
import { bikeReturnApi } from './api/bikeRentalApi';
import { baseApi } from './api/baseApi';

const persistConfig = {
	key: 'auth',
	storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
	reducer: {
		[bikeApi.reducerPath]: bikeApi.reducer, // Adding bikeApi reducer to store
		[userManagementApi.reducerPath]: userManagementApi.reducer, // Adding bikeApi reducer to store
		[bikeReturnApi.reducerPath]: bikeReturnApi.reducer, // Adding bikeApi reducer to store
		[baseApi.reducerPath]: baseApi.reducer,
		auth: persistedAuthReducer, // Persisted auth reducer
	},
	middleware: (getDefaultMiddlewares) =>
		getDefaultMiddlewares({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(bikeApi.middleware, userManagementApi.middleware, bikeReturnApi.middleware), // Adding bikeApi middleware for caching and request handling
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
