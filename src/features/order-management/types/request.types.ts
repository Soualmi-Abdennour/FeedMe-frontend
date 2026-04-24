

import type { ProductModel } from '@/features/shop/types/shop.types';





export type OrderStatus = 'PENDING' | 'COMPLETE';

export interface OrderModel {
  id: string;
  name: string;
  date: string; // ISO string
  status: OrderStatus;
  product: ProductModel;  
  quantity?: number;
  description?: string;
  price?: number;
  
}
 