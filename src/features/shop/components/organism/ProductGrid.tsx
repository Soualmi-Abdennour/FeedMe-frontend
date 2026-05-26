'use client';

import SkeletonCard from '@/features/shop/components/atoms/SkeletonCard';
import ProductCard from '@/features/shop/components/molecules/ProductCard';
import type { ProductModel } from '@/features/shop/types/shop.types';

interface ProductGridProps {
  products: ProductModel[];
  isLoading: boolean;
    onProductClick: (product: ProductModel) => void;

}

export default function ProductGrid({ products, isLoading,onProductClick  }: ProductGridProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {isLoading
        ? Array.from({ length: 8 }).map((_, i) => ( // Show 8 skeletons while loading
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

