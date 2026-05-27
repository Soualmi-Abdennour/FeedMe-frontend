export const ORDER_STATUS = {
  PENDING:  { label: 'PENDING',  className: 'bg-yellow-100 text-yellow-700 border border-yellow-300' },
  COMPLETE: { label: 'COMPLETE', className: 'bg-green-100  text-green-700  border border-green-300'  },
  ACCEPTED: { label: 'ACCEPTED', className: 'bg-blue-100   text-blue-700   border border-blue-300'   },
  CONFIRMED:{ label: 'CONFIRMED',className: 'bg-purple-100 text-purple-700 border border-purple-300' },
};

export const ORDERS_PAGE_TABS = [
  { label: 'Order Complete', value: 'complete' },
  { label: 'Order Pending', value: 'pending' },
];