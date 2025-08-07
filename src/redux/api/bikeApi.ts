import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Bike } from "../../utils/type/bike";

export interface BikesApiResponse {
	success: boolean;
	statusCode: number;
	message: string;
	data: Bike[];
}

export interface SingleBikeApiResponse {
	success: boolean;
	statusCode: number;
	message: string;
	data: Bike;
}

export const bikeApi = createApi({
	reducerPath: "bikeApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://bike-rental-reservation-system-backend-gamma.vercel.app/api",
		prepareHeaders: (headers, { getState }) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const token = (getState() as any).auth.token;
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	tagTypes: ["Review"],
	endpoints: (builder) => ({
		// ✅ Get all bikes
		getBikes: builder.query<BikesApiResponse, void>({
			query: () => "/bikes",
		}),

		// ✅ Get single bike by ID
		getBikeById: builder.query<SingleBikeApiResponse, string>({
			query: (id) => `/bikes/${id}`,
			providesTags: (result) =>
				result?.data?.reviews?.map((review) => ({
					type: "Review" as const,
					id: review._id,
				})) ?? [],
		}),


		// ✅ Create
		createBike: builder.mutation({
			query: (bikeData) => ({
				url: "/bikes",
				method: "POST",
				body: bikeData,
			}),
		}),

		// ✅ Update
		updateBike: builder.mutation({
			query: ({ id, bikeData }) => ({
				url: `/bikes/${id}`,
				method: "PUT",
				body: bikeData,
			}),
		}),

		// ✅ Delete
		deleteBike: builder.mutation({
			query: (id) => ({
				url: `/bikes/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

// ✅ Export hooks
export const {
	useGetBikesQuery,
	useGetBikeByIdQuery, // 🔥 newly added
	useCreateBikeMutation,
	useUpdateBikeMutation,
	useDeleteBikeMutation,
} = bikeApi;
