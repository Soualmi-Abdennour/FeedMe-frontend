"use client";

import React from "react";
import { ProductModel } from "../../types/product.types";

interface DeleteProductModalProps {
    product: ProductModel | null;
    isLoading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
    product,
    isLoading,
    onConfirm,
    onCancel,
}) => {
    if (!product) return null;

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col gap-4">
        <h2 className="text-base font-bold text-neutral-800 text-center">
            Delete product?
        </h2>
        <p className="text-sm text-neutral-500 text-center">
            Do you want to delete{" "}
            <span className="font-semibold text-neutral-700">{product.name}</span>?
            This action cannot be undone.
        </p>
        <div className="flex gap-3 mt-1">
            <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-full border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50 transition"
            >
            Cancel
            </button>
            <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-2 rounded-full bg-fail-500 text-white text-sm font-semibold hover:bg-fail-600 transition disabled:opacity-60"
        >
            {isLoading ? "Deleting…" : "Delete"}
            </button>
        </div>
    </div>
    </div>
    );
};