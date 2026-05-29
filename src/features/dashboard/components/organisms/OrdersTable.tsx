import { IOrdersTableProps } from '../../types/props.types';
import {OrderRow} from '../molecules/OrderRow';



export default function OrdersTable({ orders = [], onConfirm, onDelete, isCompleted, onRowClick }: IOrdersTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-white">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Order name</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Date</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
            {!isCompleted && <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Actions</th>}
          </tr>
        </thead>
        <tbody className='overflow-y-auto'>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={isCompleted ? 3 : 4} className="px-6 py-12 text-center text-sm text-gray-400">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <OrderRow
                key={order.orderItemId}
                order={order}
                onConfirm={onConfirm}
                onDelete={onDelete}
                isCompleted={isCompleted}
                onRowClick={onRowClick}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}