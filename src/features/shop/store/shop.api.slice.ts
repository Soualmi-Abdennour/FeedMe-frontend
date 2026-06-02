import { fetchAPI } from "@/store/base.store";
import { ProductsResponse } from "@/types/api.types";






export const shopApiSlice = fetchAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query<ProductsResponse, void>({
      query: () => ({
        url: "/store/products",
        method: "GET",
      }),
      providesTags: ['Products'],
    }),

    addProductToCart: build.mutation({
      query: (productId) => ({
        url: '/cart',
        method: 'POST',
        body: { productId },
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductToCartMutation
} = shopApiSlice;