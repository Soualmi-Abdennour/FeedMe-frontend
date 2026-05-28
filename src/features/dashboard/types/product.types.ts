import { KITCHEN_CATEGORY } from "@/constants/app.constants"; 

export type ProductCategory = typeof KITCHEN_CATEGORY[number]["key"];

export interface ProductAppModel {
    id: string;
    name: string;
    price: number;
    description: string;
    preparingTime: string;  
    category: ProductCategory | string;
    image: string;
}
export interface ProductsResponse {
    status: string;
    data: { results: number; products: ProductAppModel[] };
}
export interface AddProductPayload {
    name: string;
    price: number;
    description: string;
    preparationTime: string;
    category: string;
    image: File | null;
}

export interface UpdateProductPayload extends AddProductPayload {
    id: string;
}