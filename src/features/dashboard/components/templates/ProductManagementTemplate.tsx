"use client";

import React, { useState } from "react";
import { ProductModel, AddProductPayload } from "../../types/product.types";
import { ProductGrid } from "../organisms/ProductGrid";
import { ProductFormModal } from "../molecules/ProductFormModal";
import { DeleteProductModal } from "../molecules/DeleteProductModal";
import {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../store/productManagementApi.slice";

export const ProductManagementTemplate: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTarget, setEditTarget] = useState<ProductModel | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductModel | null>(null);

  const { data: products = [], isLoading } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAdd = async (payload: AddProductPayload) => {
    try {
      await addProduct(payload).unwrap();
      setShowAddModal(false);
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  const handleEdit = async (payload: AddProductPayload) => {
    if (!editTarget) return;
    try {
      await updateProduct({ id: editTarget.id, ...payload }).unwrap();
      setEditTarget(null);
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProduct(deleteTarget.id).unwrap();
      setDeleteTarget(null);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="flex-1 p-6 bg-[#fdf6f0] min-h-screen">
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