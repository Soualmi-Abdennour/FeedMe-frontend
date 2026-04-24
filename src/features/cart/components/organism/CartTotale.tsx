"use client";
import { useState, useMemo, useEffect, useRef } from 'react';
import { AccountHeader } from '../molecules/AccountHeader';
import { OrderSummary } from '../molecules/OrderSummary';
import { CartItem } from '../organism/CartItem';
import { Toast } from '../atoms/Toast';
import { CartGroup } from '../../types/order';

interface Props {
  group: CartGroup;
  onRemoveGroup: () => void;
}

export const CartSection = ({ group, onRemoveGroup }: Props) => {
  const [items, setItems] = useState(group.items);
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(group.items.map(item => [item.id, item.qty]))
  );
  const [showToast, setShowToast] = useState(false);

  // ✅ Fix: cleanup timer to avoid memory leak
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleCompletePurchase = () => {
    setShowToast(true);
    timerRef.current = setTimeout(() => {
      setItems([]);
      onRemoveGroup();
    }, 2000);
  };

  const total = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.price * (quantities[item.id] ?? item.qty),
      0
    );
  }, [items, quantities]);

  const handleApply = (itemId: string, qty: number) => {
    setQuantities(prev => ({ ...prev, [itemId]: qty }));
  };

  const handleDelete = (itemId: string) => {
    const newItems = items.filter(i => i.id !== itemId);
    setItems(newItems);
    if (newItems.length === 0) onRemoveGroup();
  };

  if (items.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto bg-[#F5F4F0] rounded-[2.5rem] p-6 md:p-10 space-y-8 antialiased">

      <Toast
        message="Order completed successfully!"
        visible={showToast}
        onHide={() => setShowToast(false)}
      />

      {/* Account header — removed backdrop-blur (no transparent bg behind it) */}
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

        {/* Items list — changed to translate-y for better visual feel */}
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

        {/* Order summary — sticky wrapper only, fixed removed from OrderSummary */}
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