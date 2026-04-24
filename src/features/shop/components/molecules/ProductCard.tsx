'use client';
//for card in product grid (feed)
import { Star, Clock } from 'lucide-react';
import type { ProductModel } from '@/features/shop/types/shop.types';

interface ProductCardProps {
  product: ProductModel;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow">

      {/* Seller info */}
      <div className="flex items-center gap-2 px-3 pt-3 pb-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          {product.seller.avatarUrl ? (
            <img
              src={product.seller.avatarUrl}
              alt={product.seller.username}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-orange-200 flex items-center justify-center text-orange-600 text-xs font-bold">
              {product.seller.username[0].toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <p className="text-xs font-medium text-gray-800 leading-tight">
            {product.seller.username}
          </p>
          <p className="text-[10px] text-gray-400">
            {product.seller.username}
          </p>
        </div>
      </div>

      {/* Product image */}
      <div className="mx-3 rounded-xl overflow-hidden bg-gray-100 h-36">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
            No image
          </div>
        )}
      </div>

      {/* Product info */}
  <div className="px-3 pt-2 pb-3">
  <p className="text-sm text-gray-800 font-medium">{product.name}</p>
  
  <div className="flex items-center justify-between mt-1">
    <p className="text-sm text-[#E85C1A] font-semibold">{product.price} DA</p>

    {product.preparationTime && (
      <div className="flex items-center gap-1 text-xs text-gray-600">
        <Clock size={14} className="text-orange-500" />
        <span>
      {product.preparationTime
  ? product.preparationTime >= 60
    ? `${Math.floor(product.preparationTime / 60)}h ${
        product.preparationTime % 60 !== 0
          ? product.preparationTime % 60 + 'min'
          : ''
      }`
    : `${product.preparationTime} min`
  : 'N/A'}
        </span>
      </div>
    )}
  </div>
</div>
{/* 
    ⭐ Rating
    <div className="flex items-center gap-1 mt-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={14}
          className={
            index < product.rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }
        />
      ))}

      
      <span className="text-xs text-gray-500 ml-1">
        ({product.rating}/5)
      </span>
    </div> */}










</div>

  );
}