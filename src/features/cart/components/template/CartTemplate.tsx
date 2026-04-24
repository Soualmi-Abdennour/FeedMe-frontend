"use client";

import { useState } from 'react';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { CartSection } from '../organism/CartTotale';
import { CartGroup } from '../../types/order';

interface Props {
  initialGroups: CartGroup[];
}

export const CartTemplate = ({ initialGroups }: Props) => {
  const [groups, setGroups] = useState<CartGroup[]>(initialGroups);

  const handleRemoveGroup = (accountId: string) => {
    setGroups(prev => prev.filter(g => g.accountId !== accountId));
  };

  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5">
        <div className="w-20 h-20 rounded-3xl bg-[#FFF0E8] flex items-center justify-center">
          <ShoppingCart size={36} className="text-[#F07030]" strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Your cart is empty</h2>
          <p className="text-sm text-gray-400">Looks like you have not added anything yet.</p>
        </div>
        <button className="flex items-center gap-2 text-[#F07030] font-semibold text-sm hover:gap-3 transition-all duration-200">
          <ArrowLeft size={16} strokeWidth={2.5} />
          Go back to shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">

        <header className="mb-10 text-center lg:text-left">
          <h1 className="text-4xl font-black text-gray-900 mb-2">My Basket</h1>
         
        </header>

        <div className="space-y-16">
          {groups.map((group) => (
            <CartSection
              key={group.accountId}
              group={group}
              onRemoveGroup={() => handleRemoveGroup(group.accountId)}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
