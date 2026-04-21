import { fetchAPI } from "@/store/base.store";
import { ProductModel } from "../types/shop.types";

const BASE_URL = "http://localhost:8000";

interface BackendProduct {
  id: string;
  name: string;
  price: string;
  description: string; // موجودة في الواجهة
  image: string;
  preparingTime: number;
  category: string | string[];
  restaurant?: {
    id: string;
    restaurantName: string;
    restaurantLogoUrl: string | null;
    User?: {
      userName: string;
    };
  };
}

interface ProductsResponse {
  status: string;
  message: string;
  data: {
    products: BackendProduct[];
  };
  results: number;
  nextCursor?: string;
}

export const shopApiSlice = fetchAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query<ProductModel[], void>({
      query: () => ({
        url: "/store/products", 
        method: "GET",
      }),
      transformResponse: (response: ProductsResponse): ProductModel[] => {
        const productsArray = response.data?.products || [];

        return productsArray.map((p) => {
          const cleanProductPath = p.image?.replace(/^\//, "");
          const cleanLogoPath = p.restaurant?.restaurantLogoUrl?.replace(/^\//, "");

          return {
            id: p.id,
            name: p.name,
            description: p.description, // <--- أضفنا هذا السطر هنا ليظهر الوصف في التطبيق
            price: Number(p.price) || 0,
            
            imageUrl: cleanProductPath 
              ? (cleanProductPath.startsWith('http') ? cleanProductPath : `${BASE_URL}/${cleanProductPath}`) 
              : "/placeholder-product.png",
            
            category: Array.isArray(p.category) 
              ? p.category[0]?.toLowerCase() 
              : (p.category?.toLowerCase() || 'all'),
            preparationTime: p.preparingTime,
            
            seller: {
              id: p.restaurant?.id || "unknown",
              username: p.restaurant?.restaurantName || p.restaurant?.User?.userName || "Seller",
              
              avatarUrl: cleanLogoPath 
                ? (cleanLogoPath.startsWith('http') ? cleanLogoPath : `${BASE_URL}/${cleanLogoPath}`) 
                : null,
            },
          };
        });
      },
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetAllProductsQuery } = shopApiSlice;
