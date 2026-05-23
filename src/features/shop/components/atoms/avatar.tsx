import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallback?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ //define the Avatar component with the AvatarProps interface (default values for size and fallback)
  src,
  alt,
  size = 'md',
  className = '',
  fallback = '?',
}) => {
  const sizeStyles = {
    sm: 'w-8 h-8', 
    /**w-8 → width = 2rem (32px)
    h-8 → height = 2rem (32px)
هذا small avatar */
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const sizePixels = { // Define pixel sizes for each size image
    sm: 32,
    md: 40,
    lg: 48, // quand on passe props size="lg" -> 3rem = 48px
    xl: 64,
  };

  const finalClassName = `${sizeStyles[size]} rounded-full overflow-hidden flex-shrink-0 ${className}`;

  return ( //(render)
    <div className={finalClassName}>
      <Image
        src={src}
        alt={alt}
        width={sizePixels[size]}
        height={sizePixels[size]}
        className="w-full h-full object-cover" //complate all container 
        priority={false}
      />
    </div>
  );
};
