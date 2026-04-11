
'use client';

import ShopHeader from '@/features/shop/components/molecules/ShopHeader';
import FilterSection from '@/features/shop/components/molecules/FilterSection';
import CategoryBar from '@/features/shop/components/molecules/CategoryBar';
import ProductGrid from '@/features/shop/components/organism/ProductGrid';
import ProductDetailPopup from '@/features/shop/components/molecules/ProductDetailPopup';
import SuccessToast from '@/features/shop/components/atoms/SuccessToast';
import type { ProductModel } from '@/features/shop/types/shop.types';
import { useState, useMemo } from 'react';
import { KITCHEN_CATEGORY } from '@/constants/app.constants';



const CATEGORY_IMAGES: Record<string, string[]> = {
  italian: [
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092", // pasta
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38", // pizza
  ],
  FAST_FOOD: [
    "https://images.unsplash.com/photo-1550547660-d9450f859349", // burger
    "https://images.unsplash.com/photo-1606755962773-d324e0a13086", // fries
  ],
  SEAFOOD: [
  "https://images.unsplash.com/photo-1544943910-4c1dc44aab44",
  "https://images.unsplaclsh.com/photo-1565299585323-38174c4a6c1c",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  "https://images.unsplash.com/photo-1559847844-5315695dadae",
],
  asian: [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c", // sushi
    "https://images.unsplash.com/photo-1604908812823-6c1d7d1b79f1", // noodles
  ],
  DESSERTS_AND_SWEETS: [
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
  "https://images.unsplash.com/photo-1589308078059-be1415eab4c3",
  "https://images.unsplash.com/photo-1505253758473-96b7015fcd40",
  "https://images.unsplash.com/photo-1519864600265-abb23847ef2c",
],
  VEGETARIAN: [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
  "https://images.unsplash.com/photo-1505253210343-b1b5f1fbcf34",
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
],
HEALTHY_FOOD: [
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
  "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38",
  "https://images.unsplash.com/photo-1505576399279-565b52d4ac71",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
],
TRADITIONAL_DISH: [
  "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
  "https://images.unsplash.com/photo-1541518763669-27fef04b14ea",
  "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c",
  "https://images.unsplash.com/photo-1617196034183-421b4917c92d",
]
};

 

// Mock data pour les produits (20 produits avec catégories cycliques)
export const MOCK_PRODUCTS: ProductModel[] = Array.from({ length: 20 }).map((_, i) => {
  const category = KITCHEN_CATEGORY[i % KITCHEN_CATEGORY.length];

  const images = CATEGORY_IMAGES[category.key] || CATEGORY_IMAGES["FAST_FOOD"];
  const image = images[i % images.length];

  return {
    id: `${i + 1}`,
    name: `${category.value} Dish ${i + 1}`,
    price: 100 + i * 10,
    imageUrl: image,
    category: category.key.toLowerCase(), // this is fine for DB/frontend
    seller: {
      id: `s${i + 1}`,
      username: `seller${i + 1}`,
      avatarUrl: null,
    },
    ///rating: Math.floor(Math.random() * 5) + 1,
preparationTime: Math.floor(Math.random() * 120) + 5, // 5 to 125 minutes
  } as ProductModel;
});

export default function ShopPage() {
  // États pour les catégories
  const [active, setActive] = useState<string[]>(['all']);
  const [tempActive, setTempActive] = useState<string[]>(['all']);
  // États pour le tri et la recherche
const [sort, setSort] = useState<'price_desc' | 'price_asc' | 'time_asc' | 'time_desc' |'random' | null>(null);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null); //state for selected product in order to show the popup
const [toastVisible, setToastVisible] = useState(false);



  //categori section logic 
  const handleSelectCategory = (value: string) => {
    setTempActive((prev) => {
      // Si on clique sur "all", on réinitialise tout à "all"
      if (value === 'all') return ['all'];

      // Si on clique sur une autre catégorie, on enlève "all"
      const withoutAll = prev.filter((v) => v !== 'all');

      if (withoutAll.includes(value)) {
        const next = withoutAll.filter((v) => v !== value);
        // Si on a tout décoché, on remet "all" par défaut
        return next.length === 0 ? ['all'] : next;
      } else {
        return [...withoutAll, value];
      }
    });
  };

  const handleApply = () => {
    setActive(tempActive);
  };

 // LOGIQUE DE FILTRAGE COMBINÉE (Catégories + Recherche)


  const filteredProducts = useMemo(() => {
    // 1. D'abord on FILTRE
    let result = MOCK_PRODUCTS.filter((product) => {
      const matchesCategory = active.includes('all') || active.includes(product.category.toLowerCase());
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // 2. Ensuite on TRIE (Sort) 
  if (sort === 'price_asc') {
  result = [...result].sort((a, b) => a.price - b.price);
} else if (sort === 'price_desc') {
  result = [...result].sort((a, b) => b.price - a.price);
} else if (sort === 'time_asc') {
  result = [...result].sort((a, b) => (a.preparationTime || 0) - (b.preparationTime || 0));
} else if (sort === 'time_desc') {
  result = [...result].sort((a, b) => (b.preparationTime || 0) - (a.preparationTime || 0));
}else if (sort === 'random') {
  result = [...result].sort(() => Math.random() - 0.5);
}
    return result;
  }, [active, search, sort]);
  
  return (
    <div className="min-h-screen w-full bg-[#FFF5F0] px-4 md:px-10 py-8">
      <ShopHeader />
      
      <div className="flex flex-col gap-6">
        <FilterSection 
          search={search} 
          onSearch={setSearch} 
          sort={sort} 
          onSort={setSort} 
        />
        
        <CategoryBar
          active={tempActive}
          onSelect={handleSelectCategory}
          onApply={handleApply}
        />
      </div>
<SuccessToast
  visible={toastVisible}
  onDismiss={() => setToastVisible(false)}
/>
      <ProductGrid isLoading={false} products={filteredProducts} onProductClick={setSelectedProduct} />
      {selectedProduct && (
        
        <ProductDetailPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => setToastVisible(true)}
        />
      )}
    </div>
  );
}