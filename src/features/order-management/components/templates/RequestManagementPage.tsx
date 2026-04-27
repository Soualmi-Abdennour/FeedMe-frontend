'use client';

import { useState } from 'react';
import TabToggle from '../atoms/TabToggle';
import RequestTable from '../organisms/RequestTable';
import OrderDetailPopup from '../molecules/OrderDetailPopup';
import type { OrderModel } from '../../types/request.types';
import { 
  useGetIncomingOrdersQuery, 
  useGetAcceptedOrdersQuery,
  useUpdateOrderStatusMutation,
  useRejectOrderMutation
} from '../../store/orderManagementApi.slice';

const TABS = [
  { label: 'Order Complete', value: 'complete' },
  { label: 'Order Pending', value: 'pending' },
];

export default function RequestManagementPage() {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedOrder, setSelectedOrder] = useState<OrderModel | null>(null);

  const { data: incomingOrders = [], isLoading: loadingPending } = useGetIncomingOrdersQuery();
  const { data: acceptedOrders = [], isLoading: loadingAccepted } = useGetAcceptedOrdersQuery();
  const [rejectOrder] = useRejectOrderMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  // فلتر يدوي للتأكد من صحة البيانات
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
    <div className="p-8 min-h-screen bg-[#fdf6f0]">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Request management:</h1>

      <div className="flex justify-center mb-6">
        <TabToggle tabs={TABS} active={activeTab} onChange={setActiveTab} />
      </div>

      <RequestTable
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