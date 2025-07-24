import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// Login
		login: builder.mutation({
			query: (userInfo) => ({
				url: "/auth/login",
				method: "POST",
				body: userInfo,
			}),
		}),

		// Signup
		register: builder.mutation({
			query: (newUser) => ({
				url: "/auth/signup", // Make sure this matches your backend route
				method: "POST",
				body: newUser,
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
