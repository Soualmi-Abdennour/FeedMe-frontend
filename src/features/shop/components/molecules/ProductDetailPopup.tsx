'use client';

import { ShoppingCart, X } from 'lucide-react';
import { IProductDetailPopupProps } from '../../types/props.types';
import Image from 'next/image';
import { useAppSelector } from '@/store/base.store';
import Link from 'next/link';



export function ProductDetailPopup({ product, onClose, onAddToCart }: IProductDetailPopupProps) {
  const { user } = useAppSelector(state => state.user)
  const formatTime = (min: number) =>
    min >= 60 ? `${Math.floor(min / 60)}h ${min % 60}min` : `${min}min`;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Centered wrapper */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col md:flex-row overflow-hidden">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* Left: Image */}
          <div className="w-full md:w-[45%] flex-shrink-0 bg-white p-4">
            <div className="w-full h-full min-h-[300px] md:min-h-[380px] rounded-xl overflow-hidden bg-gray-100">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                  No image
                </div>
              )}
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex-1 flex flex-col gap-3 p-5">

            {/* Account holder — cliquable */}
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">
              <span className="text-sm font-bold text-gray-800 whitespace-nowrap">
                Account holder:
              </span>
              <Link
                href={`/profile/${product.seller.userName}`}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-600 font-bold text-base overflow-hidden flex-shrink-0">
                  {product.seller.avatarUrl ? (
                    <Image src={product.seller.avatarUrl} alt="" className="w-full h-full object-cover" width={40} height={40} />
                  ) : (
                    product.seller.userName[0].toUpperCase()
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-gray-800 truncate">
                    {product.seller.userName}
                  </span>
                  <span className="text-xs text-gray-400 truncate">
                    {product.seller.userName}
                  </span>
                </div>
              </Link>
            </div>

            {/* Product name + Prep time */}
            <div className="flex border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex-1 flex flex-col justify-center px-4 py-3 border-r border-gray-200">
                <span className="text-sm font-bold text-gray-800">Product name:</span>
                <span className="text-sm text-gray-500 mt-0.5">{product.name}</span>
              </div>
              <div className="flex-1 flex flex-col justify-center px-4 py-3">
                <span className="text-sm font-bold text-gray-800">Preparation time:</span>
                <span className="text-sm text-gray-500 mt-0.5">
                  {product.preparingTime ? formatTime(product.preparingTime) : 'N/A'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="flex-1 border border-gray-200 rounded-xl p-4">
              <p className="text-sm font-bold text-gray-800 mb-2">Description:</p>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-6">
                {product.description || '—'}
              </p>
            </div>

            {/* Price + Add to Cart */}
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-sm font-bold text-gray-800">Price:</span>
                <span className="text-sm text-gray-600">{product.price} DA</span>
              </div>
              {user?.role === "USER" && onAddToCart && <button
                onClick={onAddToCart}
                className="flex items-center gap-2 bg-[#E85C1A] hover:bg-orange-600 text-white font-semibold text-sm rounded-xl px-6 py-3 transition-colors active:scale-95"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}