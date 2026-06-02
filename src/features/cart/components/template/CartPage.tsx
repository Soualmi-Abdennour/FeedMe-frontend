"use client";

import { ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import { CartSection } from '../organism/CartSection';
import { useGetCartQuery, useClearCartMutation } from '../../store/cart.api.slice';
import { useRouter } from 'next/navigation';

function CartPage() {
  const router = useRouter();
  const [clearCart] = useClearCartMutation();
  const { data, isLoading, isError, refetch } = useGetCartQuery(undefined);
  const groups = data?.data?.allCartGroups || [];

  const handleClearCart = async () => {
    try {
      await clearCart().unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  if (isLoading) return <div className="text-center py-20">Loading cart...</div>;

  if (isError) return (
    <div className="min-h-[60vh] ">
      <ShoppingCart size={48} className="text-gray-300" />
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <button onClick={() => router.push('/shop')} className="text-[#F07030] font-semibold flex gap-2">
        <ArrowLeft size={20} /> Back to shop
      </button>
    </div>
  );

  if (groups.length === 0) return (
    <div className=" min-h-[60vh] ">
      <ShoppingCart size={48} className="text-gray-300" />
      <h2 className="text-2xl font-bold">Your cart is empty</h2>
      <button onClick={() => router.push('/shop')} className="text-[#F07030] font-semibold flex gap-2">
        <ArrowLeft size={20} /> Back to shop
      </button>
    </div>
  );

  return (
    <div className="  py-12 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <h1 className="text-4xl font-black">Shopping Cart</h1>
          <button
            onClick={handleClearCart}
            className="px-4 py-2 rounded-2xl border border-red-200 text-red-400 hover:bg-red-50 hover:text-red-500 hover:border-red-300 transition-all duration-200 text-sm font-semibold"
          >
            <Trash2 size={16} strokeWidth={2} />
            Clear Cart
          </button>
        </div>

        <div className=" w-full">
          {groups.map((group: any) => (
            <CartSection
              key={group.accountId}
              group={group}
              onRemoveGroup={refetch}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartPage