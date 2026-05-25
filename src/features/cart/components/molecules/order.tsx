import React, { useState } from "react";
import { QuantityControl } from "./quantityController";
import { OrderSummary } from "./OrderSummary";

interface Props {
  unitPrice: number;
}

export const OrderActions = ({ unitPrice }: Props) => {
  const [currentQty, setCurrentQty] = useState(1);
  const [totalPrice, setTotalPrice] = useState(unitPrice);

  const handleApply = (qty: number) => {
    setCurrentQty((prvQty) => qty);
    setTotalPrice(qty * unitPrice);
  };

  return (
    <div
      className="flex items-start justify-between gap-8 w-full
     bg-gray-50/50 p-4 rounded-2xl border border-dashed border-gray-200"
    >
      <div className="flex-1">
        <QuantityControl initialQty={currentQty} onApply={handleApply} />
      </div>

      <div className="w-[260px]">
        <OrderSummary total={totalPrice} onCompletePurchase={()=>{}} />
      </div>
    </div>
  );
};
