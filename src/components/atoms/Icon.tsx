import React from 'react';
import { IIconProps } from '@/types/props.types';
import { ICON_MAP } from '@/constants/app.constants';





export const Icon: React.FC<IIconProps> = ({
  name,
  size = 'md',
  color = 'black',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };

  const colorStyles = {
    black: 'text-black',
    gray: 'text-gray-600',
    orange: 'text-orange-500',
    white: 'text-white',
  };

  const IconComponent = ICON_MAP[name as keyof typeof ICON_MAP];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const finalClassName = `${sizeStyles[size]} ${colorStyles[color]} ${className}`;

  return <IconComponent className={finalClassName} />;
};