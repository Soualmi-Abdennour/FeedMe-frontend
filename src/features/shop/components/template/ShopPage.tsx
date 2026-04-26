'use client';

import ShopHeader from '@/features/shop/components/molecules/ShopHeader';
import FilterSection from '@/features/shop/components/molecules/FilterSection';
import CategoryBar from '@/features/shop/components/molecules/CategoryBar';
import ProductGrid from '@/features/shop/components/organism/ProductGrid';
import ProductDetailPopup from '@/features/shop/components/molecules/ProductDetailPopup';
import SuccessToast from '@/features/shop/components/atoms/SuccessToast';
import type { ProductModel } from '@/features/shop/types/shop.types';
import { useState, useMemo } from 'react';
import { useGetAllProductsQuery, useAddToCartMutation } from '../../store/shopApi.slice';

export default function ShopPage() {
  const { data: products = [], isLoading, isError } = useGetAllProductsQuery();
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();

  const [active, setActive] = useState<string[]>(['all']);
  const [tempActive, setTempActive] = useState<string[]>(['all']);
  const [sort, setSort] = useState<'price_desc' | 'price_asc' | 'time_asc' | 'time_desc' | 'random' | null>(null);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  // الدوال المفقودة التي كنت تحتاجها
  const handleSelectCategory = (value: string) => {
    setTempActive((prev) => {
      if (value === 'all') return ['all'];
      const withoutAll = prev.filter((v) => v !== 'all');
      if (withoutAll.includes(value)) {
        const next = withoutAll.filter((v) => v !== value);
        return next.length === 0 ? ['all'] : next;
      } else {
        return [...withoutAll, value];
      }
    });
  };

  const handleApply = () => {
    setActive(tempActive);
  };

 const handleAddToCart = async () => {
  if (!selectedProduct) return;
  try {
    await addToCart(selectedProduct.id).unwrap();
    setToastVisible(true);
    setSelectedProduct(null);
    setTimeout(() => setToastVisible(false),  1000); // ✅
  } catch (err) {
    console.error("Failed to add to cart:", err);
  }
};
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory = 
        active.includes('all') || 
active.some(cat => cat.toLowerCase() === product.category?.toLowerCase())
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sort === 'price_asc') result = [...result].sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') result = [...result].sort((a, b) => b.price - a.price);
    else if (sort === 'time_asc') result = [...result].sort((a, b) => (a.preparationTime || 0) - (b.preparationTime || 0));
    else if (sort === 'time_desc') result = [...result].sort((a, b) => (b.preparationTime || 0) - (a.preparationTime || 0));
    else if (sort === 'random') result = [...result].sort(() => Math.random() - 0.5);

    return result;
  }, [products, active, search, sort]);

  if (isError) return (
    <div className="flex h-screen items-center justify-center text-red-500">
      Error fetching products. Please try again later.
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#FFF5F0] px-4 md:px-10 py-8">
      <ShopHeader />
      
      <div className="flex flex-col gap-6">
        <FilterSection search={search} onSearch={setSearch} sort={sort} onSort={setSort} />
        <CategoryBar active={tempActive} onSelect={handleSelectCategory} onApply={handleApply} />
      </div>

      <SuccessToast visible={toastVisible} onDismiss={() => setToastVisible(false)} />

      <ProductGrid isLoading={isLoading} products={filteredProducts} onProductClick={setSelectedProduct} />

      {selectedProduct && (
        <ProductDetailPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}