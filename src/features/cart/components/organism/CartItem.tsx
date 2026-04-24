// components/organisms/CartItem.tsx
"use client";
import React from 'react';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { ProductInfo } from '../molecules/ProductInfo';
import { QuantityControl } from '../molecules/quantityController';
import { CartItem as CartItemType } from '../../types/order';

interface Props {
  item: CartItemType;
  onApply: (qty: number) => void;
  onDelete?: (id: string) => void;
}

export const CartItem = ({ item, onApply, onDelete }: Props) => {
  const handleDelete = () => {
    if (onDelete) onDelete(item.id);
  };

  return (
    <div className="group relative flex gap-3 border border-gray-100 hover:border-gray-200 rounded-3xl p-2 bg-white hover:shadow-md transition-all duration-300">

      {/* Left accent bar on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#F07030] to-[#F0A060] rounded-l-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Delete button */}
      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all duration-200"
        aria-label="Remove item"
      >
        <Trash2 size={14} strokeWidth={2} />
      </button>

      {/* Image */}
      <div className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0">
        <Image
          src={item.image}
          alt={item.productName}
          fill
          className="object-cover"
          sizes="112px"
        />
        {/* Price badge over image */}
        <div className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
          {item.price} DA
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 pr-6 justify-between py-1">
        <ProductInfo
          name={item.productName}
          price={item.price}
          description={item.description}
        />
        <QuantityControl
          initialQty={item.qty}
          onApply={onApply}
        />
      </div>

    </div>
  );
};
