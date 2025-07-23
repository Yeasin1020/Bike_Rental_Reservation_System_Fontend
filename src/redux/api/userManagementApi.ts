import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ✅ Define types with unique names
export interface UserApi {
	_id: string;
	name: string;
	email: string;
	role: string;
	profilePicture?: string;
}

export interface UsersResponse {
	success: boolean;
	message: string;
	data: UserApi[];
}

export interface ProfileResponse {
	success: boolean;
	message: string;
	data: UserApi;
}

export interface UpdateProfilePayload {
	userId: string;
	userData: Partial<UserApi>;
}

// ✅ API Setup with Types
export const userManagementApi = createApi({
	reducerPath: "userManagementApi",
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
	endpoints: (builder) => ({
		getUsers: builder.query<UsersResponse, void>({
			query: () => "/users",
		}),
		getProfile: builder.query<ProfileResponse, void>({
			query: () => ({
				url: "/users/me",
				method: "GET",
			}),
		}),
		updateUserToAdmin: builder.mutation<{ success: boolean }, string>({
			query: (userId) => ({
				url: `/users/${userId}/admin`,
				method: "PATCH",
			}),
		}),
		updateProfile: builder.mutation<{ success: boolean }, UpdateProfilePayload>({
			query: ({ userId, userData }) => ({
				url: `/users/${userId}`,
				method: "PUT",
				body: userData,
			}),
		}),
		deleteUser: builder.mutation<{ success: boolean }, string>({
			query: (userId) => ({
				url: `/users/${userId}`,
				method: "DELETE",
			}),
		}),
	}),
});

// ✅ Export hooks
export const {
	useGetUsersQuery,
	useGetProfileQuery,
	useUpdateUserToAdminMutation,
	useUpdateProfileMutation,
	useDeleteUserMutation,
} = userManagementApi;

// ✅ Export types explicitly for TS with new name
