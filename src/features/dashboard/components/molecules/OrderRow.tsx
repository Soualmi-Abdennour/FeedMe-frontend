"use client";

import { Check, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { IOrderRowProps } from '../../types/props.types';
import StatusBadge from '../atoms/StatusBadge';



export  function OrderRow({ order, onConfirm, onDelete, isCompleted, onRowClick }: IOrderRowProps) {
  const [sliding, setSliding] = useState(false);

  const handleRowClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    onRowClick?.(order);
  };

  const handleConfirm = () => {
    setSliding(true);
    setTimeout(() => {
      onConfirm(order.orderId);
    }, 400);
  };

  const date = new Date(order.createdAt);

  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const formattedTime = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const showActions = !isCompleted && order.status === 'PENDING';

  return (
    <tr
      className="border-t border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={handleRowClick}
      style={{
        transform: sliding ? 'translateX(100%)' : 'translateX(0)',
        opacity: sliding ? 0 : 1,
        transition: 'transform 0.4s ease, opacity 0.4s ease',
      }}
    >
      <td className="px-6 py-4 text-sm text-gray-700 font-medium">
        {order.product?.name}
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">
        <div className="flex flex-col">
          <span>{formattedDate}</span>
          <span className="text-xs text-gray-400">{formattedTime}</span>
        </div>
      </td>

      <td className="px-6 py-4">
        <StatusBadge status={order.status} />
      </td>

      {!isCompleted && (
        <td className="px-6 py-4">
          {showActions && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleConfirm}
                className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors"
                title="Confirm"
              >
                <Check size={14} className="text-white" strokeWidth={3} />
              </button>

              <button
                onClick={() => onDelete(order.orderId)}
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </td>
      )}
    </tr>
  );
}
