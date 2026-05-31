import {  ProductFrom, ProductImage } from "./product.types";
import { OrderModel, OrderStatus } from "./order.types";
import { ProductAppModel } from "@/features/shop/types/shop.types";
import { Dispatch, SetStateAction } from "react";

export interface IProductCardProps {
    product: ProductAppModel;
    onEdit: (product: ProductAppModel) => void;
    onDelete: (product: ProductAppModel) => void;
}

export interface IStatusBadgeProps {
    status: OrderStatus;
}

export interface ITabToggleProps {
    tabs: {
        label:string
        value:string
    }[]; 
    active: string;
    onChange: (value: string) => void; 
}

export interface IDeleteProductModalProps {
    product: ProductAppModel | null;
    isLoading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export interface IOrderDetailPopupProps {
    order: OrderModel;
    onClose: () => void;
}

export interface IOrderRowProps {
    order: OrderModel;
    onConfirm: (id: string) => void;
    onDelete: (id: string) => void;
    isCompleted?: boolean;
    onRowClick?: (order: OrderModel) => void;
}

export interface IProductFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (payload: ProductFrom) => void;
    isLoading?: boolean;
    editProduct?: ProductAppModel | null;
}
export interface IProductFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (payload: ProductFrom) => void;
    isLoading?: boolean;
    editProduct?: ProductAppModel | null;
}
export interface IProductGridProps {
    products: ProductAppModel[];
    isLoading: boolean;
    onEdit: (product: ProductAppModel) => void;
    onDelete: (product: ProductAppModel) => void;
}
export interface IOrdersTableProps {
    orders?: OrderModel[];
    onConfirm: (id: string) => void;
    onDelete: (id: string) => void;
    isCompleted?: boolean;
    onRowClick?: (order: OrderModel) => void;
}
export interface IProductImageDropZone {
    profileImage:ProductImage 
    setProfileImage:Dispatch<SetStateAction<ProductImage>>
}