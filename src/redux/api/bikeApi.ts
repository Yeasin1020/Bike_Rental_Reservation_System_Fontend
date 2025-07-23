import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Bike } from "../../utils/type/bike";

interface BikesApiResponse {
	success: boolean;
	statusCode: number;
	message: string;
	data: Bike[];
}

export const bikeApi = createApi({
	reducerPath: "bikeApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000/api",
		prepareHeaders: (headers, { getState }) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const token = (getState() as any).auth.token;
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getBikes: builder.query<BikesApiResponse, void>({
			query: () => "/bikes",
		}),
		createBike: builder.mutation({
			query: (bikeData) => ({
				url: "/bikes",
				method: "POST",
				body: bikeData,
			}),
		}),
		updateBike: builder.mutation({
			query: ({ id, bikeData }) => ({
				url: `/bikes/${id}`,
				method: "PUT",
				body: bikeData,
			}),
		}),
		deleteBike: builder.mutation({
			query: (id) => ({
				url: `/bikes/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useGetBikesQuery,
	useCreateBikeMutation,
	useUpdateBikeMutation,
	useDeleteBikeMutation,
} = bikeApi;
