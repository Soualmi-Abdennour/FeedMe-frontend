"use client";

import React, { useState } from "react";
import { ProductModel, AddProductPayload } from "../../types/product.types";
import { MOCK_PRODUCTS } from "../../constants/product.mock"; // adjust path
import { ProductGrid } from "../organisms/ProductGrid";
import { ProductFormModal } from "../molecules/ProductFormModal";
import { DeleteProductModal } from "../molecules/DeleteProductModal";

export const ProductManagementTemplate: React.FC = () => {
  const [products, setProducts] = useState<ProductModel[]>(MOCK_PRODUCTS);
  const [isLoading] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editTarget,   setEditTarget]   = useState<ProductModel | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductModel | null>(null);

  // ✅ Add
  const handleAdd = (payload: AddProductPayload) => {
    const newProduct: ProductModel = {
      id: `prod-${Date.now()}`,
      name: payload.name,
      price: payload.price,
      description: payload.description,
      preparationTime: payload.preparationTime,
      category: payload.category,
      image: payload.image
        ? URL.createObjectURL(payload.image)
        : "/placeholder-product.png",
    };
    setProducts((prev) => [newProduct, ...prev]);
    setShowAddModal(false);
  };

  const handleEdit = (payload: AddProductPayload) => {
    if (!editTarget) return;
    setProducts((prev) =>
      prev.map((p) =>
        p.id === editTarget.id
          ? {
              ...p,
              name: payload.name,
              price: payload.price,
              description: payload.description,
              preparationTime: payload.preparationTime,
              category: payload.category,
              image: payload.image
                ? URL.createObjectURL(payload.image)
                : p.image,
            }
          : p
      )
    );
    setEditTarget(null);
  };

  // ✅ Delete
  const handleDelete = () => {
    if (!deleteTarget) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="flex-1 p-6 bg-[#fdf6f0`] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-neutral-800">Product management:</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2 border-2 border-primary-400 text-primary-500 rounded-full text-sm font-semibold hover:bg-primary-50 transition"
        >
          <span className="text-lg leading-none">+</span>
          Add product
        </button>
      </div>

      <ProductGrid
        products={products}
        isLoading={isLoading}
        onEdit={setEditTarget}
        onDelete={setDeleteTarget}
      />

      <ProductFormModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAdd}
      />

      <ProductFormModal
        isOpen={!!editTarget}
        onClose={() => setEditTarget(null)}
        onSubmit={handleEdit}
        editProduct={editTarget}
      />

      <DeleteProductModal
        product={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};