import { cn } from '@/utils/shadcn.utils';
import { IStatusBadgeProps } from '../../types/props.types';
import type { OrderStatus } from '../../types/order.types';
import { ORDER_STATUS } from '../../constants/order.constants';





export default function StatusBadge({ status }: IStatusBadgeProps) {
  
  const orderStatus = ORDER_STATUS[status] ?? {
    label: status ?? 'UNKNOWN',
    className: 'bg-gray-100 text-gray-700 border border-gray-300',
  };

  const { label, className } = orderStatus;

  return (
    <span className={cn("inline-flex items-center px-3 py-1 rounded-md text-xs font-bold tracking-wide", className)}>
      {label}
    </span>
  );
}