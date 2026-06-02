'use client';

import { CategoryBar } from '@/features/shop/components/molecules/CategoryBar';
import { FilterSection } from '@/features/shop/components/molecules/FilterSection';
import { ProductDetailPopup } from '@/features/shop/components/molecules/ProductDetailPopup';
import { ShopHeader } from '@/features/shop/components/molecules/ShopHeader';
import { ProductGrid } from '@/features/shop/components/organism/ProductGrid';
import type { ProductAppModel } from '@/features/shop/types/shop.types';
import { ApiResponse } from '@/types/api.types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useAddProductToCartMutation, useGetAllProductsQuery } from '../../store/shop.api.slice';
import { mapProductDbToAppModel } from '../../utils/shop.utils';

export default function ShopPage() {
  const { data, isLoading, isError } = useGetAllProductsQuery();
  const [addToCart, { isLoading: isAdding }] = useAddProductToCartMutation();
  const [active, setActive] = useState<string[]>(['all']);
  const [tempActive, setTempActive] = useState<string[]>(['all']);
  const [sort, setSort] = useState<'price_desc' | 'price_asc' | 'time_asc' | 'time_desc' | 'random' | null>(null);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ProductAppModel | null>(null);
  const products = useMemo(
    () =>
      data?.data?.products
        ? data.data.products.map((product) =>
          mapProductDbToAppModel(product)
        )
        : [],
    [data]
  );

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
    const fetchResponse = await addToCart(selectedProduct.id)
    const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
    const successResponse: ApiResponse<null> = fetchResponse.data as ApiResponse<null> 
    if (error) {
      const errorResponse = error.data as ApiResponse<null> 
      if (!errorResponse || errorResponse.status === "ERROR") {
        toast.error("Something Went wrong.")
      }
      else {
        toast.error(errorResponse.errors?.at(0)?.message ?? errorResponse.message)
      }
    }
    else {
      toast.success(successResponse.message)
      setSelectedProduct(null);
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
    else if (sort === 'time_asc') result = [...result].sort((a, b) => (a.preparingTime || 0) - (b.preparingTime || 0));
    else if (sort === 'time_desc') result = [...result].sort((a, b) => (b.preparingTime || 0) - (a.preparingTime || 0));
    else if (sort === 'random') result = [...result].sort(() => Math.random() - 0.5);

    return result;
  }, [products, active, search, sort]);

  if (isError) return (
    <div className="flex h-full items-center justify-center text-red-500">
      Error fetching products. Please try again later.
    </div>
  );

  return (
    <div className="min-h-full w-full flex flex-col px-4 md:px-10 py-8">
      <ShopHeader />
      <FilterSection search={search} onSearch={setSearch} sort={sort} onSort={setSort} />
      <div className="sticky top-0 z-10 bg-primary-50 py-5 flex flex-col gap-6 shrink-0">     
        <CategoryBar active={tempActive} onSelect={handleSelectCategory} onApply={handleApply} />
      </div>

    <div className='flex-1 min-h-0'>  
        <ProductGrid isLoading={isLoading} products={filteredProducts} onProductClick={setSelectedProduct} />
      </div>
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