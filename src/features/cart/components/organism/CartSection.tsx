"use client";
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePlaceOrderMutation, useRemoveCartItemMutation, useUpdateCartItemMutation } from '../../store/cart.api.slice';
import { ICartSection } from '../../types/props.types';
import { AccountHeader } from '../molecules/AccountHeader';
import { OrderSummary } from '../molecules/OrderSummary';
import { CartItem } from './CartItem';
import { Toast } from '@/components/molecules/Toast';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast } from 'sonner';
import { ApiResponse } from '@/types/api.types';



export const CartSection = ({ group, onRemoveGroup }: ICartSection) => {
  const [updateCartItem,{isLoading:updateCartItemLoading}] = useUpdateCartItemMutation();
  const [removeCartItem,{isLoading:removeCartItemLoading}] = useRemoveCartItemMutation();
  const [placeOrder,{isLoading:placeOrderLoading}] = usePlaceOrderMutation();

  const [items, setItems] = useState(group.items);
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(group.items.map(item => [item.id, item.qty]))
  );

  const handleCompletePurchase = async () => {
    const fetchResponse = await placeOrder({ restaurantProfileId: group.accountId })
    const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
    const successResponse: ApiResponse<null> = fetchResponse.data as ApiResponse<null>

    if (error) {
      const errorResponse = error.data as ApiResponse<null>
      if (!errorResponse || errorResponse.status === "ERROR") {
        toast.error("Something Went wrong.")
      }
      else {
        toast.error(errorResponse.errors?.at(0)?.message ?? errorResponse.message)
      }
    }
    else {
      toast.success(successResponse.message)
        setItems([]);
        onRemoveGroup();
    }

  };

  const total = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.price * (quantities[item.id] ?? item.qty),
      0
    );
  }, [items, quantities]);

  const handleApply = async (itemId: string, qty: number) => {
    const fetchResponse = await updateCartItem({ itemId, quantity: qty })
    const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
    const successResponse: ApiResponse<null> = fetchResponse.data as ApiResponse<null>

    if (error) {
      const errorResponse = error.data as ApiResponse<null>
      if (!errorResponse || errorResponse.status === "ERROR") {
        toast.error("Something Went wrong.")
      }
      else {
        toast.error(errorResponse.errors?.at(0)?.message ?? errorResponse.message)
      }
    }
    else {
      toast.success(successResponse.message)
      setQuantities(prev => ({ ...prev, [itemId]: qty }));
    }
  };

  const handleDelete = async (itemId: string) => {
    const fetchResponse = await removeCartItem(itemId)
    const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
    const successResponse: ApiResponse<null> = fetchResponse.data as ApiResponse<null>

    if (error) {
      const errorResponse = error.data as ApiResponse<null>
      if (!errorResponse || errorResponse.status === "ERROR") {
        toast.error("Something Went wrong.")
      }
      else {
        toast.error(errorResponse.errors?.at(0)?.message ?? errorResponse.message)
      }
    }
    else {
      toast.success(successResponse.message)
      const newItems = items.filter(i => i.id !== itemId);
      setItems(newItems);
      if (newItems.length === 0) onRemoveGroup();
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto bg-[#F5F4F0] rounded-[2.5rem] p-2 md:p-10 space-y-8 antialiased">

      <div className="bg-white border border-gray-100 rounded-3xl p-5 inline-flex items-center shadow-sm">
        <div className="px-2">
          <AccountHeader
            fullName={group.accountName}
            userName={group.userName}
            avatarSrc={group.accountAvatar}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-12 gap-[99px] items-start">
        <div className="lg:col-span-8 flex flex-col gap-5 w-full">
          {items.map(item => (
            <div key={item.id} className="transition-all duration-300 hover:-translate-y-0.5">
              <CartItem
                item={item}
                onApply={(qty) => handleApply(item.id, qty)}
                onDelete={handleDelete}
                isApplyLoading={updateCartItemLoading}
                isDeleteLoading={removeCartItemLoading}
              />
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 w-full sticky top-8">
          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-xl shadow-black/[0.03]">
            <OrderSummary
              total={total}
              onCompletePurchase={handleCompletePurchase}
              isLoading={placeOrderLoading}
            />
          </div>
        </div>

      </div>
    </div>
  );
};