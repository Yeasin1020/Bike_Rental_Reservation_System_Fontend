// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";

// const baseQuery = fetchBaseQuery({
// 	baseUrl: "http://localhost:5000/api", // Your API base URL
// 	credentials: "include", // Ensure you send credentials with requests
// 	prepareHeaders: (headers, { getState }) => {
// 		const token = (getState() as RootState).user.token; // Get the token from the Redux state
// 		if (token) {
// 			headers.set("Authorization", `Bearer ${token}`); // Add token to Authorization header
// 		}
// 		return headers;
// 	},
// });

// export const baseApi = createApi({
// 	reducerPath: "baseApi",
// 	baseQuery: baseQuery,
// 	endpoints: () => ({}),
// });

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
	reducerPath: 'baseApi',
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000/api",
		credentials: "include",
	}),

	endpoints: () => ({})
})