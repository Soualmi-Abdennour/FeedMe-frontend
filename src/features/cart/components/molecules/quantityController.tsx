import React, { useState, useEffect } from 'react';
import { CircleMinus, CirclePlus } from 'lucide-react';

interface Props {
  initialQty?: number;
  min?: number;
  max?: number;
  onApply: (qty: number) => void;
}

export const QuantityControl = ({
  initialQty = 1,
  min = 1,
  max = 99,
  onApply,
}: Props) => {
  const [qty, setQty] = useState(initialQty);

  // ← التعديل الوحيد
  useEffect(() => {
    setQty(initialQty);
  }, [initialQty]);

  const decrement = () => setQty(prev => Math.max(min, prev - 1));
  const increment = () => setQty(prev => Math.min(max, prev + 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) setQty(Math.min(max, Math.max(min, val)));
  };

  return (
    <div className="flex items-center gap-6 w-fit mt-4 bg-transparent">
      <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-4 py-2 shadow-sm ring-1 ring-black/5">
        <span className="text-[11px] font-extrabold tracking-widest text-blue-950/70">
          Quantity
        </span>
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-2 py-1">
          <button
            onClick={decrement}
            disabled={qty <= min}
            className="text-gray-400 hover:text-orange-500 disabled:opacity-20 transition-all duration-200 active:scale-75"
          >
            <CircleMinus size={22} strokeWidth={2.5} />
          </button>
          <input
            type="number"
            value={qty}
            onChange={handleChange}
            className="w-8 text-center bg-transparent border-none p-0 focus:ring-0 text-[15px] font-black text-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            onClick={increment}
            disabled={qty >= max}
            className="text-gray-400 hover:text-orange-500 disabled:opacity-20 transition-all duration-200 active:scale-75"
          >
            <CirclePlus size={22} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <button
        onClick={() => onApply(qty)}
        className="relative group flex items-center justify-center overflow-hidden bg-orange-500 hover:bg-orange-600 text-white text-[14px] font-bold h-[48px] px-10 rounded-2xl shadow-[0_8px_16px_-6px_rgba(249,115,22,0.5)] transition-all duration-300 active:scale-95 hover:-translate-y-1"
      >
        <span className="relative z-10 tracking-wide">Apply</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </button>
    </div>
  );
};