// src/api/bikeReturnApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bikeReturnApi = createApi({
	reducerPath: 'bikeReturnApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://bike-rental-reservation-system-backend-gamma.vercel.app/api',
		prepareHeaders: (headers, { getState }) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const token = (getState() as any).auth.token;
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		// Get rentals for a user
		getRentals: builder.query({
			query: () => '/rentals', // This fetches rentals for the logged-in user
		}),
		//create rental 
		createRental: builder.mutation({
			query: (rentalData) => ({
				url: "/rentals",
				method: "POST",
				body: rentalData,
			}),
		}),
		// Return a bike
		returnBike: builder.mutation({
			query: (rentalId) => ({
				url: `/rentals/${rentalId}/return`, // This will return a specific bike rental
				method: 'PUT',
			}),
		}),
		// Get all rentals for admin (this uses the '/rentals/allRentals' route)
		getAllRentals: builder.query({
			query: () => '/rentals/allRentals', // This fetches all rentals (only accessible to admin)
		}),
	}),
});

export const {
	useGetRentalsQuery,
	useCreateRentalMutation,
	useReturnBikeMutation,
	useGetAllRentalsQuery, // Updated to use the correct endpoint
} = bikeReturnApi;
