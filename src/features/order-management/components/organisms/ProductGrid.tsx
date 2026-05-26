"use client";

import React from "react";
import { ProductModel } from "../../types/product.types";
import { ProductCard } from "../atoms/ProductCard";

interface ProductGridProps {
    products: ProductModel[];
    isLoading: boolean;
    onEdit: (product: ProductModel) => void;
    onDelete: (product: ProductModel) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
    products,
    isLoading,
    onEdit,
    onDelete,
}) => {
    if (isLoading) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
        {products.map((product) => (
        <ProductCard
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
        />
        ))}
    </div>
    );
};