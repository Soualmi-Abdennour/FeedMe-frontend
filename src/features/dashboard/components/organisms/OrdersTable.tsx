import { IRequestTableProps } from '../../types/props.types';
import RequestRow from '../molecules/OrderRow';



export default function OrdersTable({ requests = [], onConfirm, onDelete, isCompleted, onRowClick }: IRequestTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-white">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Request name</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Date</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
            {!isCompleted && <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Actions</th>}
          </tr>
        </thead>
        <tbody className='overflow-y-auto'>
          {requests.length === 0 ? (
            <tr>
              <td colSpan={isCompleted ? 3 : 4} className="px-6 py-12 text-center text-sm text-gray-400">
                No requests found.
              </td>
            </tr>
          ) : (
            requests.map((req) => (
              <RequestRow
                key={req.orderItemId}
                order={req}
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