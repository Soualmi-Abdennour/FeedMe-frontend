"use client";

export const OrderSummary = ({ total, onCompletePurchase }: { total: number; onCompletePurchase: () => void }) => {
  
  return (
    <div className="bg-white rounded-[2rem] p-6 border border-gray-50 
    shadow-[0_15px_40px_rgba(0,0,0,0.04)] flex flex-col gap-6 w-full">
      
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
          <span className="text-orange-500 text-sm">🛒</span>
        </div>
        <h3 className="font-bold text-gray-400 text-[11px] uppercase tracking-[0.15em]">
          Order Summary
        </h3>
      </div>

      <div className="flex justify-between items-center py-2 border-y border-gray-50">
        <span className="text-gray-400 text-sm font-medium">Total Price</span>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-gray-900 tracking-tight">
            {total.toLocaleString()}
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase">DA</span>
        </div>
      </div>

      <button 
        onClick={onCompletePurchase}
        className="w-full bg-[#F27430] hover:bg-[#d95f26] text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:shadow-orange-200 hover:shadow-lg active:scale-[0.98]"
      >
        <span className="text-base">🛍️</span>
        Complete Purchase
      </button>
      
      
    </div>
  );
};