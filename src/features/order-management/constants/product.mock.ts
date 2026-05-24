import { ProductModel } from "../types/product.types";

export const MOCK_PRODUCTS: ProductModel[] = Array.from({ length: 8 }, (_, i) => ({
    id: `prod-${i + 1}`,
    name: "Small Tacos",
    price: 550,
    description: "Crispy tacos with spiced beef, fresh salsa and sour cream.",
    preparationTime: "15 min",
    category: "tacos",
    image: "/placeholder-product.png",
}));