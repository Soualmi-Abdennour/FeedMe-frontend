'use client';

import { useState } from 'react';
import TabToggle from '../atoms/TabToggle';
import OrdersTable from '../organisms/OrdersTable';
import OrderDetailPopup from '../molecules/OrderDetailPopup';
import type { OrderModel } from '../../types/order.types';
import {
  useGetIncomingOrdersQuery,
  useGetAcceptedOrdersQuery,
  useUpdateOrderStatusMutation,
  useRejectOrderMutation
} from '../../store/orderManagement.api.slice';
import { ORDERS_PAGE_TABS } from '../../constants/order.constants';



export default function OrderManagementPage() {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedOrder, setSelectedOrder] = useState<OrderModel | null>(null);

  const { data: incomingOrders = [], isLoading: loadingPending } = useGetIncomingOrdersQuery();
  const { data: acceptedOrders = [], isLoading: loadingAccepted } = useGetAcceptedOrdersQuery();
  const [rejectOrder] = useRejectOrderMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const pendingOrders = incomingOrders.filter(o => o.status === 'PENDING');
  const completedOrders = acceptedOrders.filter(o => o.status === 'ACCEPTED');

  const filtered = activeTab === 'pending' ? pendingOrders : completedOrders;

  const handleConfirm = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId).unwrap();
    } catch (error) {
      console.error("Failed to accept order:", error);
    }
  };

  const handleDelete = async (orderId: string) => {
    try {
      await rejectOrder(orderId).unwrap();
    } catch (error) {
      console.error("Failed to reject order:", error);
    }
  };

  if (loadingPending || loadingAccepted) return (
    <div className="text-center py-20">Loading orders...</div>
  );

  return (
    <div className="p-8 h-full border-2">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Order management:</h1>

      <div className="flex justify-center mb-6">
        <TabToggle tabs={ORDERS_PAGE_TABS} active={activeTab} onChange={setActiveTab} />
      </div>

      <OrdersTable
        requests={filtered}
        onConfirm={handleConfirm}
        onDelete={handleDelete}
        isCompleted={activeTab === 'complete'}
        onRowClick={setSelectedOrder}
      />

      {selectedOrder && (
        <OrderDetailPopup
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}