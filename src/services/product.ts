// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_API_GATEWAY}/product/`,
		jsonContentType: 'application/json',
		timeout: 300000,
	}),
	tagTypes: ['PagingProducts'],
	endpoints: (builder) => ({
		getAllProductsByUserId: builder.query<
			PagingWrapper<Product>,
			{ userId: string; pageNumber: number; pageSize: number }
		>({
			query: ({ userId, pageNumber, pageSize }) => ({
				url: `${userId}/user`,
				method: 'GET',
				params: {
					pageNumber,
					pageSize,
				},
			}),
			// Always merge incoming data to the cache entry
			// merge: (currentCache, newItems) => {
			// 	currentCache.push(...newItems);
			// },
			// Refetch when the page arg changes
			forceRefetch({ currentArg, previousArg }) {
				return currentArg !== previousArg;
			},
			providesTags(result) {
				return [
					{
						type: 'PagingProducts',
						id: `${result?.number}-${result?.totalPages}-${result?.numberOfElements}-${result?.size}-${result?.totalElements}`,
					},
				];
			},
			transformErrorResponse(baseQueryReturnValue) {
				return baseQueryReturnValue.status;
			},
			transformResponse(rawResult: PagingWrapper<ProductResponse>) {
				const content = rawResult.content.map((response) => {
					const product: Product = {
						id: response.id,
						name: response.name,
						description: response.description,
						createdAt: new Date(response.createdAtMillis).toLocaleString(),
						updatedAt: response.updatedAtMillis
							? new Date(response.updatedAtMillis).toLocaleString()
							: '',
						status: response.isUsed ? 'ACTIVE' : 'INACTIVE',
					};
					return product;
				});
				return {
					...rawResult,
					content,
				};
			},
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllProductsByUserIdQuery } = productApi;
