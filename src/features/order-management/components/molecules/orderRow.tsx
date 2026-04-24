import { Check, Trash2 } from 'lucide-react';
import StatusBadge from '../atoms/StatusBadge';
import type { OrderModel } from '../../types/request.types';
import { useState } from 'react';


interface OrderRowProps {
  order: OrderModel;
  onConfirm: (id: string) => void;
  onDelete: (id: string) => void;
  isCompleted?: boolean;
  onRowClick?: (order: OrderModel) => void;
}

export default function OrderRow({ order, onConfirm, onDelete, isCompleted, onRowClick }: OrderRowProps) {
    const [sliding, setSliding] = useState(false);

  const handleRowClick = (e: React.MouseEvent) => {
    // Only trigger if clicking on the row, not on buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onRowClick?.(order);
  };


// Handle confirm request with sliding animation
  const handleConfirm = () => {
    setSliding(true);
    setTimeout(() => {
      onConfirm(order.id);
    }, 400); // matches animation duration
  };

  return (
    <tr 
      className="border-t border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
onClick={handleRowClick}
style={{ // Slide out to right and fade out when confirming
        transform: sliding ? 'translateX(100%)' : 'translateX(0)',
        opacity: sliding ? 0 : 1,
        transition: 'transform 0.4s ease, opacity 0.4s ease',
      }}

    >
      {/* Order name */}
      <td className="px-6 py-4 text-sm text-gray-700 font-medium">
        {order.name}
      </td>

      {/* Date */}
      <td className="px-6 py-4 text-sm text-gray-600">
        {order.date}
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <StatusBadge status={order.status} />
      </td>

      {/* Actions */}
      {!isCompleted && (
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            {/* Confirm — green circle check */}
            <button
              //onClick={() => onConfirm(order.id)}
              onClick={handleConfirm}
              className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors"
              title="Confirm"
            >
              <Check size={14} className="text-white" strokeWidth={3} />
            </button>

            {/* Delete — trash icon */}
            <button
              onClick={() => onDelete(order.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}
