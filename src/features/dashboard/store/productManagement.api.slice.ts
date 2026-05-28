import { fetchAPI } from "@/store/base.store";
import { ProductAppModel, ProductsResponse, AddProductPayload, UpdateProductPayload } from "../types/product.types";

export const productManagementApiSlice = fetchAPI.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query<ProductAppModel[], void>({
            query: () => "/products",
            transformResponse: (response: ProductsResponse) => response.data?.products || [],
            providesTags: ["Products"],
        }),
        addProduct: build.mutation<ProductAppModel, AddProductPayload>({
            query: (payload) => {
                const formData = new FormData();
                formData.append("name", payload.name);
                formData.append("price", String(payload.price));
                formData.append("description", payload.description);
                formData.append("preparingTime", String(parseInt(payload.preparationTime)));
                formData.append("category", JSON.stringify([payload.category]));
                if (payload.image) formData.append("image", payload.image);
                return { url: "/products", method: "POST", body: formData };
            },
            invalidatesTags: ["Products"],
        }),
        updateProduct: build.mutation<ProductAppModel, UpdateProductPayload>({
            query: ({ id, ...payload }) => {
                const formData = new FormData();
                formData.append("name", payload.name);
                formData.append("price", String(payload.price));
                formData.append("description", payload.description);
                formData.append("preparingTime", String(parseInt(payload.preparationTime)));
                formData.append("category", JSON.stringify([payload.category]));
                if (payload.image) formData.append("image", payload.image);
                return { url: `/products/${id}`, method: "PATCH", body: formData };
            },
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