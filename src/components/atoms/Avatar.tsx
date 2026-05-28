import React from 'react';
import Image from 'next/image';
import { IAvatarProps } from '@/types/props.types';



export const Avatar: React.FC<IAvatarProps> = ({
  src,
  alt,
  size = 'md',
  className = '',
  fallback = '?',
}) => {
  const sizeStyles = {
    sm: 'w-8 h-8', 
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const sizePixels = { 
    sm: 32,
    md: 40,
    lg: 48, 
    xl: 64,
  };

  const finalClassName = `${sizeStyles[size]} rounded-full overflow-hidden flex-shrink-0 ${className}`;

  return ( 
    <div className={finalClassName}>
      <Image
        src={src}
        alt={alt}
        width={sizePixels[size]}
        height={sizePixels[size]}
        className="w-full h-full object-cover" 
        priority={false}
      />
    </div>
  );
};
