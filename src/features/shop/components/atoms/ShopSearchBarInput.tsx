import React from 'react';
import { IShopSearchBarInputProps } from '../../types/props.types';


export const ShopSearchBarInput: React.FC<IShopSearchBarInputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onKeyDown, 
  disabled = false,
  className = '',
  icon,
  iconPosition = 'left',
}) => {
const baseStyles = 'w-full px-4 py-2 border-2 border-[#FFBD97] rounded-lg focus:outline-none focus:border-orange-500 transition-colors';
  const disabledStyles = disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white';

  const finalClassName = `${baseStyles} ${disabledStyles} ${className}`;

  if (icon) {
    return (
      <div className="relative flex items-center">
        {iconPosition === 'left' && (
          <div className="absolute left-3 text-gray-400 pointer-events-none">{icon}</div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
                    onKeyDown={onKeyDown} 

          disabled={disabled}
          className={`${finalClassName} ${iconPosition === 'left' ? 'pl-10' : 'pr-10' }`}
        />
        {iconPosition === 'right' && ( // x
          <div className="absolute right-3 text-gray-400 pointer-events-none">{icon}</div>
        )}
      </div>
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
            onKeyDown={onKeyDown} 

      disabled={disabled}
      className={finalClassName}
    />
  );
};