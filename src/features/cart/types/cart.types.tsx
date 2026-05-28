// types/order.ts
export interface CartItem {
  id: string;
  productName: string;
  price: number;
  description: string;
  image: string;
  qty: number;
  accountId: string;
}

export interface CartGroup {
  accountId: string;
  accountName: string;
  username: string;
  accountAvatar: string;
  items: CartItem[];
}