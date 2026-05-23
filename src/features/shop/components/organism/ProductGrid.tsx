'use client';

import ProductCard from '@/features/shop/components/molecules/ProductCard';
import SkeletonCard from '@/features/shop/components/atoms/SkeletonCard';
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

/**2️⃣ متىisLoading تولي true؟

isLoading غالباً كتستعمل مع API fetch.
مثال عملي:

const [products, setProducts] = useState<ProductModel[]>([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  fetch('/api/products')
    .then(res => res.json())
    .then(data => {
      setProducts(data);
      setIsLoading(false); // بعد ما تجي البيانات، تولي false
    });
}, []);
البداية: isLoading = true → ProductGrid يوري SkeletonCard
بعد ما البيانات توصل: isLoading = false → ProductGrid يوري ProductCard
3️⃣ فالكود ديالك دابا
حيت عندك MOCK_PRODUCTS و ماشي fetch من API
دائما كتكتب: isLoading={false}
يعني ما غاديش تشوف SkeletonCard، غير المنتجات مباشرة */