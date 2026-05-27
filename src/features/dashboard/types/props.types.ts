import { ProductModel } from "./product.types";
import { OrderModel, OrderStatus } from "./request.types";

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