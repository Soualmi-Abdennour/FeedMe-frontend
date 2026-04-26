"use client";
import { useState, useMemo, useEffect, useRef } from 'react';
import { AccountHeader } from '../molecules/AccountHeader';
import { OrderSummary } from '../molecules/OrderSummary';
import { CartItem } from '../organism/CartItem';
import { Toast } from '../atoms/Toast';
import { CartGroup } from '../../types/order';
import { useUpdateCartItemMutation, usePlaceOrderMutation, useRemoveCartItemMutation } from '../../store/cartApiSlice';

interface Props {
  group: CartGroup;
  onRemoveGroup: () => void;
}

export const CartSection = ({ group, onRemoveGroup }: Props) => {
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();
  const [placeOrder] = usePlaceOrderMutation();

  const [items, setItems] = useState(group.items);
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(group.items.map(item => [item.id, item.qty]))
  );
  const [showToast, setShowToast] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timerRef.current), []);

const handleCompletePurchase = async () => {
  try {
    await placeOrder({ restaurantProfileId: group.accountId }).unwrap();
    
    setShowToast(true);

    timerRef.current = setTimeout(() => {
      setItems([]);
      onRemoveGroup();
    }, 2000); 
  } catch (err) {
    console.error("Failed to complete purchase:", err);
  }
};

  const total = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.price * (quantities[item.id] ?? item.qty),
      0
    );
  }, [items, quantities]);

  const handleApply = async (itemId: string, qty: number) => {
    try {
      await updateCartItem({ itemId, quantity: qty }).unwrap();
      setQuantities(prev => ({ ...prev, [itemId]: qty }));
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleDelete = async (itemId: string) => {
    try {
      await removeCartItem(itemId).unwrap();
      const newItems = items.filter(i => i.id !== itemId);
      setItems(newItems);
      if (newItems.length === 0) onRemoveGroup();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto bg-[#F5F4F0] rounded-[2.5rem] p-6 md:p-10 space-y-8 antialiased">

      <Toast
        message="Order completed successfully!"
        visible={showToast}
        onHide={() => setShowToast(false)}
      />

      <div className="bg-white border border-gray-100 rounded-3xl p-5 inline-flex items-center shadow-sm">
        <div className="px-2">
          <AccountHeader
            fullName={group.accountName}
            userName={group.username}
            avatarSrc={group.accountAvatar}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <div className="lg:col-span-8 flex flex-col gap-5 w-full">
          {items.map(item => (
            <div key={item.id} className="transition-all duration-300 hover:-translate-y-0.5">
              <CartItem
                item={item}
                onApply={(qty) => handleApply(item.id, qty)}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 w-full sticky top-8">
          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-xl shadow-black/[0.03]">
            <OrderSummary
              total={total}
              onCompletePurchase={handleCompletePurchase}
            />
          </div>
        </div>

      </div>
    </div>
  );
};