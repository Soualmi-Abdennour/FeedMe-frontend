'use client';

import { X } from 'lucide-react';
import type { OrderModel } from '../../types/request.types';

const BASE_URL = "http://localhost:8000";

interface OrderDetailPopupProps {
  order: OrderModel;
  onClose: () => void;
}

export default function OrderDetailPopup({ order, onClose }: OrderDetailPopupProps) {
  const unitPrice = parseFloat(order.product?.price ?? '0');
  const quantity = order.quantity ?? 1;
  const totalPrice = unitPrice * quantity;

  const imageUrl = order.product?.image
    ? order.product.image.startsWith('http')
      ? order.product.image
      : `${BASE_URL}/${order.product.image.replace(/^\//, '')}`
    : null;

  const avatarUrl = order.user?.avatar
    ? order.user.avatar.startsWith('http')
      ? order.user.avatar
      : `${BASE_URL}/${order.user.avatar.replace(/^\//, '')}`
    : null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col md:flex-row overflow-hidden">

          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* Image */}
          <div className="w-full md:w-[45%] flex-shrink-0 bg-white p-4">
            <div className="w-full h-full min-h-[300px] md:min-h-[380px] rounded-xl overflow-hidden bg-gray-100">
              {imageUrl ? (
                <img src={imageUrl} alt={order.product?.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                  No image
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col gap-3 p-5">

            {/* Account holder */}
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">
              <span className="text-sm font-bold text-gray-800 whitespace-nowrap">Account holder:</span>
              <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-600 font-bold text-base overflow-hidden flex-shrink-0">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  order.user?.userName?.[0]?.toUpperCase() ?? '?'
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-gray-800 truncate">
                  {order.user?.fullName || order.user?.userName || '—'}
                </span>
                <span className="text-xs text-gray-400 truncate">
                  {order.user?.userName ?? '—'}
                </span>
              </div>
            </div>

            {/* Product name + Order date */}
            <div className="flex border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex-1 flex flex-col justify-center px-4 py-3 border-r border-gray-200">
                <span className="text-sm font-bold text-gray-800">Product name:</span>
                <span className="text-sm text-gray-500 mt-0.5">{order.product?.name ?? '—'}</span>
              </div>
              <div className="flex-1 flex flex-col justify-center px-4 py-3">
                <span className="text-sm font-bold text-gray-800">Order date:</span>
                <span className="text-sm text-gray-500 mt-0.5">
                  {new Date(order.createdAt).toLocaleDateString('en-GB')}
                </span>
              </div>
            </div>

            {/* Description */}
           {/* Description */}
<div className="border border-gray-200 rounded-xl px-4 py-3 flex-1">
  <span className="text-sm font-bold text-gray-800">Description:</span>
  <p className="text-sm text-gray-500 mt-0.5">
    {order.product?.description || '—'}
  </p>
</div>
            {/* Price · Quantity · Total */}
            <div className="grid grid-cols-3 border border-gray-200 rounded-xl overflow-hidden mt-auto">
              <div className="flex flex-col items-center justify-center px-2 py-3 border-r border-gray-200">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Price</span>
                <span className="text-sm font-semibold text-gray-800 mt-1">{unitPrice} DA</span>
              </div>
              <div className="flex flex-col items-center justify-center px-2 py-3 border-r border-gray-200">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Quantity</span>
                <span className="text-sm font-semibold text-gray-800 mt-1">{quantity}</span>
              </div>
              <div className="flex flex-col items-center justify-center px-2 py-3 bg-orange-50/30">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Price</span>
                <span className="text-sm font-bold text-[#E85C1A] mt-1">{totalPrice} DA</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}