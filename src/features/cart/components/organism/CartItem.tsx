"use client";
import React from 'react';
import { Trash2 } from 'lucide-react';
import { ProductInfo } from '../molecules/ProductInfo';
import { ICartItem } from '../../types/props.types';
import Image from 'next/image';
import { QuantitiyController } from '../molecules/QuantityController';


export const CartItem = ({ item, onApply, onDelete,isDeleteLoading,isApplyLoading }: ICartItem) => {
  const handleDelete = () => {
    if (onDelete) onDelete(item.id);
  };

  return (
    <div className="group items-center  justify-between relative h-[200px] w-[780px] flex gap-3 border border-gray-100 hover:border-gray-200 rounded-tr-3xl rounded-br-3xl p-2 bg-white hover:shadow-md transition-all duration-300">

      <div className="absolute  left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#F07030] to-[#F0A060] rounded-l-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <button
        onClick={handleDelete}
        disabled={isDeleteLoading}
        className="absolute top-4 mr-[2.5px] right-0 w-7 h-7 rounded-full flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all duration-200"
        aria-label="Remove item"
      >
        <Trash2 size={18} strokeWidth={2} />
      </button>

      <div className="relative w-40 h-40 rounded-2xl  overflow-hidden flex-shrink-0">
        <Image
          src={item.image}
          alt={item.productName}
          className="object-cover w-full h-full"
          width={200}
          height={200}
          />
        <div className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
          {item.price} DA
        </div>
      </div>

      <div className="flex flex-col flex-1 pr-6 justify-between py-1">
        <ProductInfo
          name={item.productName}
          price={item.price}
          description={item.description}
        />
        <QuantitiyController
          initialQty={item.qty}
          onApply={onApply}
          isApplyLoading={isApplyLoading}
        />
      </div>

    </div>
  );
};