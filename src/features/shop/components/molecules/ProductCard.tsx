'use client';
//for card in product grid (feed)
import type { ProductAppModel } from '@/features/shop/types/shop.types';
import { Clock } from 'lucide-react';
import Image from 'next/image';



export  function ProductCard({ product }: { product: ProductAppModel }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow">

      {/* Seller info */}
      <div className="flex items-center gap-2 px-3 pt-3 pb-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          <Image
            src={product.seller.avatarUrl ?? "/default/default-profile-image.png"}
            alt={product.seller.userName}
            className="w-full h-full object-cover"
            width={32}
            height={32}
          />
        </div> 
        <div>
          <p className="text-xs font-medium text-gray-800 leading-tight">
            {product.seller.userName}
          </p>
          <p className="text-[10px] text-gray-400">
            {product.seller.userName}
          </p>
        </div>
      </div>

      {/* Product image */}
      <div className="mx-3 rounded-xl overflow-hidden bg-gray-100 h-36">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            height={144}
            width={144}
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

          {product.preparingTime && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Clock size={14} className="text-orange-500" />
              <span>
                {product.preparingTime
                  ? product.preparingTime >= 60
                    ? `${Math.floor(product.preparingTime / 60)}h ${product.preparingTime % 60 !== 0
                      ? product.preparingTime % 60 + 'min'
                      : ''
                    }`
                    : `${product.preparingTime} min`
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