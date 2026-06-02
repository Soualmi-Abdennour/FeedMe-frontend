import { fetchAPI } from "@/store/base.store";
import { OrderModel } from "../types/order.types";

interface OrdersResponse {
  data: {
    results: number;
    items: OrderModel[];
  };
}

export const orderManagementApiSlice = fetchAPI.injectEndpoints({
  endpoints: (build) => ({
    getIncomingOrders: build.query<OrderModel[], void>({
      query: () => '/orders/incoming',
      transformResponse: (response: OrdersResponse) =>
        response.data?.items || [],
      providesTags: ['Orders'],
    }),
    getAcceptedOrders: build.query<OrderModel[], void>({
      query: () => '/orders/accepted',
      transformResponse: (response: OrdersResponse) =>
        response.data?.items || [],
      providesTags: ['Orders'],
    }),
    updateOrderStatus: build.mutation<void, string>({
      query: (orderId) => ({
        url: `/orders/${orderId}/status`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Orders'],
    }),
    rejectOrder: build.mutation<void, string>({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});
export const {
  useGetIncomingOrdersQuery,
  useRejectOrderMutation,
  useGetAcceptedOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderManagementApiSlice;