'use client';

import SkeletonCard from '@/features/shop/components/atoms/SkeletonCard';
import ProductCard from '@/features/shop/components/molecules/ProductCard';
import { IProductGridProps } from '../../types/props.types';



export default function ProductGrid({ products, isLoading,onProductClick  }: IProductGridProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {isLoading
        ? Array.from({ length: 8 }).map((_, i) => ( 
            <SkeletonCard key={i} />
          ))
        : products.map((product) => (
            <div
              key={product.id} 
              onClick={() => onProductClick(product)}
              className="cursor-pointer"
            >
              <ProductCard product={product} />
            </div>
      ))}
    </div>
  );
}

