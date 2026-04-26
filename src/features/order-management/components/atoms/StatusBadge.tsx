import type { OrderStatus } from '../../types/request.types';

interface StatusBadgeProps {
  status: OrderStatus;
}

const config: Record<string, { label: string; className: string }> = {
  PENDING:  { label: 'PENDING',  className: 'bg-yellow-100 text-yellow-700 border border-yellow-300' },
  COMPLETE: { label: 'COMPLETE', className: 'bg-green-100  text-green-700  border border-green-300'  },
  ACCEPTED: { label: 'ACCEPTED', className: 'bg-blue-100   text-blue-700   border border-blue-300'   },
  CONFIRMED:{ label: 'CONFIRMED',className: 'bg-purple-100 text-purple-700 border border-purple-300' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  // ✅ fallback إذا جا status غير موجود في config
  const statusConfig = config[status] ?? {
    label: status ?? 'UNKNOWN',
    className: 'bg-gray-100 text-gray-700 border border-gray-300',
  };

  const { label, className } = statusConfig;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold tracking-wide ${className}`}>
      {label}
    </span>
  );
}