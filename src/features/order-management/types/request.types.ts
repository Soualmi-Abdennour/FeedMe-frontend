export type OrderStatus = 'PENDING' | 'ACCEPTED';

export interface OrderProduct {
  id: string;
  name: string;
  image: string;
  price: string;
    description?: string; // ✅

}

export interface OrderUser {
  id: string;
  userName: string;
  fullName: string | null;
  avatar: string | null;
}

export interface OrderModel {
  orderId: string;
  orderItemId: string;
  status: OrderStatus;
  createdAt: string;
  product: OrderProduct;
  quantity: number;
  user: OrderUser;
}