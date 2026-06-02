import { fetchAPI } from "@/store/base.store";

export const cartApiSlice = fetchAPI.injectEndpoints({
  endpoints: (build) => ({
    getCart: build.query({
      query: () => '/cart',
      providesTags: ['Cart'],
    }),
    updateCartItem: build.mutation({
      query: ({ itemId, quantity }) => ({
        url: `/cart/${itemId}`,
        method: 'PATCH',
        body: { quantity },
      }),
      invalidatesTags: ['Cart'],
    }),
    removeCartItem: build.mutation({
      query: (itemId) => ({
        url: `/cart/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    clearCart: build.mutation<void, void>({
      query: () => ({
        url: '/cart',
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),

    placeOrder: build.mutation({
      query: ({ restaurantProfileId }) => ({
        url: '/orders',
        method: 'POST',
        body: { restaurantProfileId },
      }),
    }),
  }),


});

export const {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
  usePlaceOrderMutation
} = cartApiSlice;