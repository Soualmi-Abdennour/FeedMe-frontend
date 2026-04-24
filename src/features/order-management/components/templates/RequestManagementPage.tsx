'use client';

import { useState } from 'react';
import TabToggle from '../atoms/TabToggle'; 
import RequestTable from '../organisms/RequestTable';
import OrderDetailPopup from '../molecules/OrderDetailPopup';
import type { OrderModel } from '../../types/request.types';
import { MOCK_REQUESTS } from '../../constants/requests.mock';


const TABS = [
  { label: 'Order Complete', value: 'complete' },
  { label: 'Order Pending',  value: 'pending'  },
];

export default function RequestManagementPage() {
  const [activeTab, setActiveTab] = useState('pending');
  const [requests, setRequests] = useState<OrderModel[]>(MOCK_REQUESTS);
  const [selectedOrder, setSelectedOrder] = useState<OrderModel | null>(null);


  const filtered = requests.filter((r) =>
    activeTab === 'pending' ? r.status === 'PENDING' : r.status === 'COMPLETE'
  );

  //change status to "complete" with sliding animation when confirm request
  const handleConfirm = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'COMPLETE' } : r))
    );
  };

  const handleDelete = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="p-8 min-h-screen bg-[#fdf6f0]">
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
        Request management:
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <TabToggle tabs={TABS} active={activeTab} onChange={setActiveTab} />
      </div>

      {/* Table */}
      <RequestTable
        requests={filtered}
        onConfirm={handleConfirm}
        onDelete={handleDelete}
        isCompleted={activeTab === 'complete'}
        onRowClick={setSelectedOrder}
      />

      {/* Order Detail Popup */}
      {selectedOrder && (
        <OrderDetailPopup
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
