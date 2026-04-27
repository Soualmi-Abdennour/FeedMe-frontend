import { ProductModel } from "../../shop/types/shop.types";
import { OrderModel } from "../types/request.types";

// 1. تعريف البيانات الوهمية للمنتجات (Mock Products)
export const MOCK_PRODUCTS: ProductModel[] = [
  {
    id: "prod-1",
    name: "Burger Deluxe",
    price: 1200,
    imageUrl: "/placeholder-product.png",
    category: "fast food",
    quantityAvailable: 10,
    description: "Delicious beef burger with cheese and fresh veggies.",
    preparationTime: 15,
    seller: {
      id: "seller-1",
      username: "Burger King DZ",
      avatarUrl: null,
    },
  },
  {
    id: "prod-2",
    name: "Pizza Margherita",
    price: 1500,
    imageUrl: "/placeholder-product.png",
    category: "italian",
    quantityAvailable: 5,
    description: "Classic pizza with tomato sauce, mozzarella, and basil.",
    preparationTime: 20,
    seller: {
      id: "seller-2",
      username: "Pizza Hut",
      avatarUrl: null,
    },
  },
];

// 2. توليد الطلبات الوهمية بناءً على المنتجات
export const MOCK_REQUESTS: OrderModel[] = Array.from({ length: 10 }, (_, i) => ({
  id: `req-${i + 1}`,
  name: `Order #${25 + i}`,
  date: '2026-04-01',
  status: i < 5 ? 'PENDING' : 'COMPLETE',
  product: MOCK_PRODUCTS[i % MOCK_PRODUCTS.length],
}));