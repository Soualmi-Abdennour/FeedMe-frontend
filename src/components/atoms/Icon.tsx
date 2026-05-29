import React from 'react';
import { IIconProps } from '@/types/props.types';
import { ICON_MAP } from '@/constants/app.constants';


export const Icon: React.FC<IIconProps> = ({
  name,
  size = 'md',
  color = 'black',
  className = '',
  filled = false,
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  const colorStyles = {
    black: 'text-black',
    gray: 'text-gray-500',
    orange: 'text-orange-500',
    green: 'text-emerald-500',
    white: 'text-white',
    red: 'text-red-500',
  };

  const IconComponent = ICON_MAP[name as keyof typeof ICON_MAP];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      className={`${sizeStyles[size]} ${colorStyles[color]} transition-all duration-200 ${className}`}
      strokeWidth={2}
      fill={filled ? 'currentColor' : 'none'}
    />
  );
};