import { ProductAppModel } from "./shop.types";

export interface ICategoryPillProps {
    label: string;
    value: string;
    isActive: boolean;
    onClick: (value: string) => void;
}

export interface ISortSelectProps {
    value: 'price_desc' | 'price_asc' | 'time_asc' | 'time_desc' | 'random' | null;
    onChange: (value: 'price_desc' | 'price_asc' | 'time_asc' | 'time_desc' | 'random') => void;
}



export interface ICategoryBarProps {
    active: string[];
    onSelect: (value: string) => void;
    onApply?: () => void;
}

export interface IFilterSectionProps {
    search: string;
    onSearch: (value: string) => void;
    sort: 'price_desc' | 'price_asc' | 'time_asc' | 'time_desc' | 'random' | null;
    onSort: (value: 'price_desc' | 'price_asc' | 'time_asc' | 'time_desc' | 'random') => void;
}

export interface IProductDetailPopupProps {
    product: ProductAppModel;
    onClose: () => void;
    onAddToCart?: () => void;
}

export interface IShopSearchBarInputProps {
    type?: 'text' | 'email' | 'password' | 'number' | 'search';
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    className?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

export interface IShopSearchBarProps {
    value?: string;
    onChange?: (value: string) => void;
    onSearch?: (value: string) => void;
    placeholder?: string;
    className?: string;
}
export interface IProductGridProps {
    products: ProductAppModel[];
    isLoading: boolean;
    onProductClick: (product: ProductAppModel) => void;

}