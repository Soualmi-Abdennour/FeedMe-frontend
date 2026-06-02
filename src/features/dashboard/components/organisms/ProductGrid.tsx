"use client";

import { useState } from "react";
import { IProductGridProps } from "../../types/props.types";
import { ProductCard } from "../atoms/ProductCard";
import { ProductDetailPopup } from "@/features/shop/components/molecules/ProductDetailPopup";
import { ProductAppModel } from "@/features/shop/types/shop.types";



export const ProductGrid = ({
    products,
    isLoading,
    onEdit,
    onDelete,
}: IProductGridProps) => {
    const [selectedProduct, setSelectedProduct] = useState<ProductAppModel | null>(null);
    if (isLoading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6 overflow-y-auto">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-neutral-100 rounded-2xl h-52 animate-pulse" />
                ))}
            </div>
        );
    }

    if (!products.length) {
        return (
            <div className="flex items-center justify-center py-20 text-neutral-400 text-sm">
                No products yet. Add your first product!
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                {products.map((product) => (
                    <div key={product.id}
                        onClick={() => { setSelectedProduct(product) }}
                    >
                        <ProductCard
                            product={product}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    </div>
                ))}
            </div>
            {
                selectedProduct && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                        onClick={() => setSelectedProduct(null)}
                    >
                        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-fit h-full mx-4">
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/60 transition"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                            <ProductDetailPopup
                                product={selectedProduct}
                                onClose={() => setSelectedProduct(null)}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    );
};