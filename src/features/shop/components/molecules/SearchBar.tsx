import React from 'react';
import { Input } from '../atoms/Input';
import { Icon } from '../atoms/Icon';

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
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
      <Input //call Input component
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