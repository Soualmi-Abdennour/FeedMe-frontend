"use client";

import { Button } from "@/components/ui/button";
import { ProductAppModel, ProductDbModel } from "@/features/shop/types/shop.types";
import { mapProductDbToAppModel } from "@/features/shop/utils/shop.utils";
import React, { useState } from "react";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetMyProductsQuery,
  useUpdateProductMutation,
} from "../../store/productManagement.api.slice";
import {  ProductFrom } from "../../types/product.types";
import { buildProductForm } from "../../utils/productForm.utils";
import { DeleteProductModal } from "../molecules/DeleteProductModal";
import ProductForm from "../molecules/ProductForm";
import { ProductGrid } from "../organisms/ProductGrid";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ApiResponse, SinglePostResponse } from "@/types/api.types";

export const ProductManagementPage: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTarget, setEditTarget] = useState<ProductAppModel | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductAppModel | null>(null);

  const { data, isLoading } = useGetMyProductsQuery();
  const products=data?.data?.products? data?.data?.products.map((product)=>mapProductDbToAppModel(product)) :[]

  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct,{isLoading:isDeleting}] = useDeleteProductMutation();

  const handleAdd = async (payload: ProductFrom) => {
    const fetchResponse = await addProduct({
      formData: buildProductForm({ payload })
    })
    const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
    const successResponse: ApiResponse<ProductDbModel> = fetchResponse.data as ApiResponse<ProductDbModel>
    if (error) {
      const errorResponse = error.data as ApiResponse<ProductDbModel>
      if (!errorResponse || errorResponse.status === "ERROR") {
        toast.error("Something Went wrong.")
      }
      else {
        toast.error(errorResponse.errors?.at(0)?.message ?? errorResponse.message)
      }
    }
    else {
      toast.success(successResponse.message)
      setShowAddModal(false);
    }
    
  };

  const handleEdit = async (payload: ProductFrom) => {
    if (!editTarget) return;
    const fetchResponse = await updateProduct({ id: editTarget.id, formData: buildProductForm({ payload }) })
    const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
    const successResponse: ApiResponse<ProductDbModel> = fetchResponse.data as ApiResponse<ProductDbModel>
    if (error) {
      const errorResponse = error.data as ApiResponse<ProductDbModel>
      if (!errorResponse || errorResponse.status === "ERROR") {
        toast.error("Something Went wrong.")
      }
      else {
        toast.error(errorResponse.errors?.at(0)?.message ?? errorResponse.message)
      }
    }
    else {
      toast.success(successResponse.message)
      setEditTarget(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const fetchResponse = await deleteProduct(deleteTarget.id)
            const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
    const successResponse: ApiResponse<ProductDbModel> = fetchResponse.data as ApiResponse<ProductDbModel>
            if (error) {                        
                        const errorResponse = error.data as ApiResponse<ProductDbModel>           
                        if (!errorResponse || errorResponse.status === "ERROR") {
                            toast.error("Something Went wrong.")
                        }
                        else {                
                            toast.error(errorResponse.errors?.at(0)?.message?? errorResponse.message)
                        }
                    }
            else {
                toast.success(successResponse.message)
                setDeleteTarget(null)
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
        isLoading={isDeleting}
      />
    </div>
  );
};