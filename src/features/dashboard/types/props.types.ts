import { AddProductPayload, ProductModel } from "./product.types";
import { OrderModel, OrderStatus } from "./order.types";

export interface IProductCardProps {
    product: ProductModel;
    onEdit: (product: ProductModel) => void;
    onDelete: (product: ProductModel) => void;
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
    product: ProductModel | null;
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
    onSubmit: (payload: AddProductPayload) => void;
    isLoading?: boolean;
    editProduct?: ProductModel | null;
}
export interface IProductGridProps {
    products: ProductModel[];
    isLoading: boolean;
    onEdit: (product: ProductModel) => void;
    onDelete: (product: ProductModel) => void;
}
export interface IRequestTableProps {
    requests?: OrderModel[];
    onConfirm: (id: string) => void;
    onDelete: (id: string) => void;
    isCompleted?: boolean;
    onRowClick?: (order: OrderModel) => void;
}