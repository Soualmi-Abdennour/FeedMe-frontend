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
  userName: string;
  accountAvatar: string;
  items: CartItem[];
}