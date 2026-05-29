import { CartGroup, CartItem } from "./cart.types";

export interface IAccountHeader {
    fullName: string;
    userName: string;
    avatarSrc: string;
}

export interface IProductInfo {
    name: string;
    price: number;
    description: string;
}

export interface IQuantityControllerProps {
  initialQty?: number;
  min?: number;
  max?: number;
  onApply: (qty: number) => void;
}

export interface ICartItem {
  item: CartItem;
  onApply: (qty: number) => void;
  onDelete?: (id: string) => void;
}

export interface ICartSection {
  group: CartGroup;
  onRemoveGroup: () => void;
}