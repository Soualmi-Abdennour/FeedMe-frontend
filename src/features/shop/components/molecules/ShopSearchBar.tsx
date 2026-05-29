import React from 'react';
import { ShopSearchBarInput } from '../atoms/ShopSearchBarInput';
import { Icon } from '../../../../components/atoms/Icon';
import { IShopSearchBarProps } from '../../types/props.types';



export const ShopSearchBar: React.FC<IShopSearchBarProps> = ({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search',
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Empêche le comportement par défaut (ex: soumission de formulaire)
      onSearch?.(value);
    }
  };

  return (
    <div className={className}>
      <ShopSearchBarInput //call Input component
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        icon={<Icon name="search" size="md" />}
        iconPosition="left"
      />
    </div>
  );
};