import { ProductDbModel } from "@/features/shop/types/shop.types";
import { fetchAPI } from "@/store/base.store";
import { AddProductPayload, ApiResponse, ProductsResponse, UpdateProductPayload } from "@/types/api.types";

export const productManagementApiSlice = fetchAPI.injectEndpoints({
    endpoints: (build) => ({
        getMyProducts: build.query<ProductsResponse, void>({
            query: () => "/products",
            providesTags: ["Products"],
        }),
        addProduct: build.mutation<ApiResponse<ProductDbModel>,AddProductPayload>({
            query: ({formData}) => ({
                url: "/products",
                method: "POST",
                body: formData 
            }),
            invalidatesTags: ["Products"],
        }),
        updateProduct: build.mutation<ApiResponse<ProductDbModel>, UpdateProductPayload>({
            query: ({ id, formData }) => ({
                url: `/products/${id}`, method: "PATCH", body: formData 
            }),
            invalidatesTags: ["Products"],
        }),
        deleteProduct: build.mutation<ApiResponse<ProductDbModel>, string>({
            query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
            invalidatesTags: ["Products"],
        }),
    }),
});

export const {
    useGetMyProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productManagementApiSlice;