"use client";

import React from "react";
import { ProductAppModel } from "../../types/product.types";
import { IDeleteProductModalProps } from "../../types/props.types";
import { Button } from "@/components/ui/button";



export const DeleteProductModal = ({
    product,
    isLoading,
    onConfirm,
    onCancel,
}: IDeleteProductModalProps) => {
    if (!product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col gap-4">
                {onCancel && (
                    <button
                        onClick={onCancel}
                        className="absolute top-3 right-4 text-gray-500 hover:text-gray-900 text-xl font-bold"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                )}
                <h2 className="text-base font-bold text-neutral-800 text-center">
                    Delete product?
                </h2>
                <p className="text-sm text-neutral-500 text-center">
                    Do you want to delete{" "}
                    <span className="font-semibold text-neutral-700">{product.name}</span>?
                    This action cannot be undone.
                </p>
                <div className="flex gap-3 mt-1 border">
                    <Button
                        onClick={onCancel}
                        variant={"ghost"}
                        className="flex-1 py-2 rounded-full border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50 transition"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={isLoading}
                        variant={"fail"}
                        className="flex-1 py-2 rounded-full bg-fail-500 text-white text-sm font-semibold hover:bg-fail-600 transition disabled:opacity-60"
                    >
                        {isLoading ? "Deleting…" : "Delete"}
                    </Button>
                </div>
            </div>
        </div>
    );
};