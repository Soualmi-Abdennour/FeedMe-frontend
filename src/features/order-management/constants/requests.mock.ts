import { MOCK_PRODUCTS } from '@/features/shop/components/template/ShopPage';
import type { OrderModel } from '../types/request.types';
 
export const MOCK_REQUESTS: OrderModel[] = Array.from({ length: 8 }, (_, i) => ({
  id: `req-${i + 1}`,
  name: `Order #${25 + i}`,
  date: '2026-04-01',
  status: i < 5 ? 'PENDING' : 'COMPLETE',
  product: MOCK_PRODUCTS[i % MOCK_PRODUCTS.length],

})
);