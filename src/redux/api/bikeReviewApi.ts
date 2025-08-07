import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { Review } from '../../utils/type/bike';

export const reviewApi = createApi({
	reducerPath: 'reviewApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://bike-rental-reservation-system-backend-gamma.vercel.app/api',
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth?.token;
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			// Content-Type is automatically set for POST/PUT with body in fetchBaseQuery
			return headers;
		},
	}),
	tagTypes: ['Review'],
	endpoints: (builder) => ({
		getReview: builder.query<Review, string>({
			query: (reviewId) => `/reviews/${reviewId}`,
			providesTags: (_result, _error, id) => [{ type: 'Review', id }],
		}),

		submitReview: builder.mutation<
			Review,
			{ bikeId: string; bookingId: string; review: { text: string; imageUrl?: string; rating: number } }
		>({
			query: ({ bikeId, bookingId, review }) => ({
				url: `/reviews/${bikeId}/${bookingId}`,
				method: 'POST',
				body: review,
			}),
		}),

		likeReview: builder.mutation<Review, string>({
			query: (reviewId) => ({
				url: `/reviews/${reviewId}/like`,
				method: 'PATCH',
			}),
			invalidatesTags: (_result, _error, id) => [{ type: 'Review', id }],
		}),

		addComment: builder.mutation<Review, { reviewId: string; text: string }>({
			query: ({ reviewId, text }) => ({
				url: `/reviews/${reviewId}/comment`,
				method: 'PUT',
				body: { text },
			}),
			invalidatesTags: (_result, _error, { reviewId }) => [{ type: 'Review', id: reviewId }],
		}),




		addReply: builder.mutation<
			Review,
			{ reviewId: string; commentId: string; text: string }
		>({
			query: ({ reviewId, commentId, text }) => ({
				url: `/reviews/${reviewId}/comment/${commentId}/reply`,
				method: 'POST',
				body: { text },
			}),
			invalidatesTags: (_result, _error, { reviewId }) => [{ type: 'Review', id: reviewId }],
		}),
	}),
});

export const {
	useGetReviewQuery,
	useSubmitReviewMutation,
	useLikeReviewMutation,
	useAddCommentMutation,
	useAddReplyMutation,
} = reviewApi;
