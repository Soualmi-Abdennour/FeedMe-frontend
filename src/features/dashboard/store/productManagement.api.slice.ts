import { ProductAppModel } from "@/features/shop/types/shop.types";
import { fetchAPI } from "@/store/base.store";
import { AddProductPayload, ProductsResponse, UpdateProductPayload } from "@/types/api.types";

export const productManagementApiSlice = fetchAPI.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query<ProductsResponse, void>({
            query: () => "/products",
            providesTags: ["Products"],
        }),
        addProduct: build.mutation<ProductAppModel,AddProductPayload>({
            query: ({formData}) => ({
                url: "/products",
                method: "POST",
                body: formData 
            }),
            invalidatesTags: ["Products"],
        }),
        updateProduct: build.mutation<ProductAppModel, UpdateProductPayload>({
            query: ({ id, formData }) => ({
                url: `/products/${id}`, method: "PATCH", body: formData 
            }),
            invalidatesTags: ["Products"],
        }),
        deleteProduct: build.mutation<void, string>({
            query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
            invalidatesTags: ["Products"],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productManagementApiSlice;