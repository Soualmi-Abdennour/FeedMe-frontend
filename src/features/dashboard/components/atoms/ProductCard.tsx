"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IProductCardProps } from "../../types/props.types";




export const ProductCard = ({ product, onEdit, onDelete }: IProductCardProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, []);

    return (
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100">
            <div ref={menuRef} className="absolute top-2 right-2 z-10">
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setMenuOpen((prev) => !prev)
                    }}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/30 transition"
                    aria-label="Options"
                >
                    <span className="text-white text-base font-bold leading-none">⋮</span>
                </button>

                {menuOpen && (
                    <div className="absolute right-0 mt-1 w-28 bg-white rounded-xl shadow-lg border border-neutral-100 overflow-hidden z-20">
                        <button
                            onClick={() => { setMenuOpen(false); onEdit(product); }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-neutral-50"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => { setMenuOpen(false); onDelete(product); }}
                            className="w-full text-left px-4 py-2 text-sm text-fail-500 hover:bg-fail-50"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            <div className="relative w-full h-36">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-3">
                <p className="text-sm font-semibold text-neutral-800 truncate">{product.name}</p>
                <p className="text-sm font-bold text-primary-500 mt-0.5">{product.price} DA</p>
            </div>
        </div>
    );
};