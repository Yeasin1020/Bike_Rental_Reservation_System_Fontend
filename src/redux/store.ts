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
import { bikeApi } from './api/bikeApi';
import { userManagementApi } from './api/userManagementApi';
import { bikeReturnApi } from './api/bikeRentalApi';
import { baseApi } from './api/baseApi';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
	key: 'auth',
	storage,
};


const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
	reducer: {
		[bikeApi.reducerPath]: bikeApi.reducer,
		[userManagementApi.reducerPath]: userManagementApi.reducer,
		[bikeReturnApi.reducerPath]: bikeReturnApi.reducer,
		[baseApi.reducerPath]: baseApi.reducer,
		auth: persistedAuthReducer,
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
			baseApi.middleware
		),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
