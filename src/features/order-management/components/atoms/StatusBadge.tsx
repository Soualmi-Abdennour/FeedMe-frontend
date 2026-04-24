import type { OrderStatus } from '../../types/request.types';

interface StatusBadgeProps {
  status: OrderStatus;  ///props li ghadi tji mn parent component 
}

const config: Record<OrderStatus, { label: string; className: string }> = {
  PENDING:  { label: 'PENDING',  className: 'bg-yellow-100 text-yellow-700 border border-yellow-300' },
  COMPLETE: { label: 'COMPLETE', className: 'bg-green-100  text-green-700  border border-green-300'  },
};
/** 🎯 الهدف من config

بدل ما ندير if/else كثيرة ❌

نستعمل object واحد ✔*/

export default function StatusBadge({ status }: StatusBadgeProps) { //استقبال status من parent component
  const { label, className } = config[status];
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold tracking-wide ${className}`}>
      {label}
    </span>
  );
}
