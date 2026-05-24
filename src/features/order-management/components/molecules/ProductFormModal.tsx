"use client";

import React, { useEffect, useRef, useState } from "react";
import { AddProductPayload, ProductModel } from "../../types/product.types";
import { KITCHEN_CATEGORY } from "@/constants/app.constants"; 

const EMPTY: AddProductPayload = {
    name: "",
    price: 0,
    description: "",
    preparationTime: "",
    category: "",
    image: null,
};

interface ProductFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (payload: AddProductPayload) => void;
    isLoading?: boolean;
    editProduct?: ProductModel | null;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    editProduct,
}) => {
    const [form, setForm] = useState<AddProductPayload>(EMPTY);
    const [preview, setPreview] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
    if (editProduct) {
        setForm({
        name: editProduct.name,
        price: editProduct.price,
        description: editProduct.description,
        preparationTime: editProduct.preparationTime,
        category: editProduct.category,
        image: null,
        });
        setPreview(editProduct.image || null);
    } else {
        setForm(EMPTY);
        setPreview(null);
    }
    }, [editProduct, isOpen]);

    if (!isOpen) return null;

    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "price" ? Number(value) : value }));
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm((prev) => ({ ...prev, image: file }));
    if (file) setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = () => {
    if (!form.name || !form.price || !form.category) return;
    onSubmit(form);
    };

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 flex flex-col gap-4">
        <h2 className="text-base font-bold text-neutral-800">
            {editProduct ? "Edit product:" : "Add product:"}
        </h2>

        {/* Image upload */}
        <div
            onClick={() => fileRef.current?.click()}
            className="w-full h-36 border-2 border-dashed border-neutral-300 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden hover:border-orange-400 transition"
        >
            {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="preview" className="w-full h-full object-cover" />
            ) : (
            <div className="flex flex-col items-center gap-1 text-neutral-400">
                <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M4 16l4-4 4 4 4-6 4 6M4 20h16M4 4h16" />
                </svg>
                <span className="text-xs">Add image</span>
            </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
        </div>

        <input
            name="name" value={form.name} onChange={handleChange}
            placeholder="Product Name"
            className="border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
        />
        <input
            name="preparationTime" value={form.preparationTime} onChange={handleChange}
            placeholder="Preparation time"
            className="border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
        />
        <textarea
            name="description" value={form.description} onChange={handleChange}
            placeholder="Description" rows={3}
            className="border border-neutral-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-primary-400"
        />
        <input
            name="price" type="number" value={form.price || ""} onChange={handleChange}
            placeholder="Price"
            className="border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
        />
        <select
            name="category" value={form.category} onChange={handleChange}
            className="border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400 bg-white"
        >
            <option value="">Categorie</option>
            {KITCHEN_CATEGORY.map((c) => (
            <option key={c.key} value={c.key}>{c.value}</option>
            ))}
        </select>

        <div className="flex gap-3 mt-1">
            <button
            onClick={onClose}
            className="flex-1 py-2 rounded-full border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50 transition"
            >
            Cancel
            </button>
            <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 py-2 rounded-full bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition disabled:opacity-60"
            >
            {isLoading ? "Saving…" : "Apply"}
            </button>
        </div>
        </div>
    </div>
    );
};