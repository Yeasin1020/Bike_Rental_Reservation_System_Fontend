import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userManagementApi = createApi({
	reducerPath: "userManagementApi",
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
		getUsers: builder.query({
			query: () => "/users",
		}),
		getProfile: builder.query({
			query: () => ({
				url: "/users/me",
				method: "GET",
			})
		}),
		updateUserToAdmin: builder.mutation({
			query: (userId) => ({
				url: `/users/${userId}/admin`,
				method: "PATCH",
			}),
		}),
		updateProfile: builder.mutation({
			query: ({ userId, userData }) => ({
				url: `/users/${userId}`,
				method: "PUT",
				body: userData,
			}),
		}),
		deleteUser: builder.mutation({
			query: (userId) => ({
				url: `/users/${userId}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useGetUsersQuery,
	useGetProfileQuery,
	useUpdateUserToAdminMutation,
	useUpdateProfileMutation,
	useDeleteUserMutation,
} = userManagementApi;
