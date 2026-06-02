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
    <div className="h-[200px] w-[780px] flex gap-3 border border-gray-100 hover:border-gray-200 rounded-tr-3xl rounded-br-3xl p-2 bg-white hover:shadow-md transition-all duration-300">

      <div className=" w-[3px] bg-gradient-to-b from-[#F07030] to-[#F0A060] rounded-l-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <button
        onClick={handleDelete}
        disabled={isDeleteLoading}
        className="mr-[2.5px] w-7 h-7 rounded-full  text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all duration-200"
        aria-label="Remove item"
      >
        <Trash2 size={18} strokeWidth={2} />
      </button>

      <div className=" w-40 h-40 rounded-2xl ">
        <Image
          src={item.image}
          alt={item.productName}
          className="object-cover w-full h-full"
          width={200}
          height={200}
          />
        <div className=" bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
          {item.price} DA
        </div>
      </div>

      <div className="pr-6  py-1">
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