"use client";

import { Button } from "@/components/ui/button";
import { ProductAppModel } from "@/features/shop/types/shop.types";
import { mapProductDbToAppModel } from "@/features/shop/utils/shop.utils";
import React, { useState } from "react";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../store/productManagement.api.slice";
import {  ProductFrom } from "../../types/product.types";
import { buildProductForm } from "../../utils/productForm.utils";
import { DeleteProductModal } from "../molecules/DeleteProductModal";
import ProductForm from "../molecules/ProductForm";
import { ProductGrid } from "../organisms/ProductGrid";

export const ProductManagementPage: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTarget, setEditTarget] = useState<ProductAppModel | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductAppModel | null>(null);

  const { data, isLoading } = useGetProductsQuery();
  const products=data?.data?.products? data?.data?.products.map((product)=>mapProductDbToAppModel(product)) :[]
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAdd = async (payload: ProductFrom) => {
    try {
      await addProduct({
        formData: buildProductForm({ payload })
      }).unwrap();
      setShowAddModal(false);
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  const handleEdit = async (payload: ProductFrom) => {
    if (!editTarget) return;
    try {
      await updateProduct({ id: editTarget.id,formData:buildProductForm({payload}) }).unwrap();
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
    <div className="flex-1 p-6  h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-neutral-800">Product management:</h1>
        <Button
          onClick={() => setShowAddModal(true)}
          variant={"ghost"}
          className="flex items-center gap-2 px-5 py-2 border-2 border-primary-400 text-primary-500 rounded-full text-sm font-semibold hover:bg-primary-50 transition"
        >
          <span className="text-lg leading-none">+</span>
          Add product
        </Button>
      </div>

      <ProductGrid
        products={products}
        isLoading={isLoading}
        onEdit={setEditTarget}
        onDelete={setDeleteTarget}
      />

      <ProductForm
        key={showAddModal ? "add-open" : "add-closed"}
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAdd}
      />

      <ProductForm
        key={editTarget?.id ?? "edit-closed"}  
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