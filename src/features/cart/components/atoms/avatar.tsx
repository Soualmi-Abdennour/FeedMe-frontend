import React, { useState } from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallback?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  className = '',
  fallback = '?',
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const finalClassName = `${sizeStyles[size]} rounded-full overflow-hidden flex-shrink-0 ${className}`;

  // ✅ fallback إذا فشل تحميل الصورة
  if (imgError || !src) {
    return (
      <div className={`${finalClassName} bg-orange-100 flex items-center justify-center`}>
        <span className="text-[#F07030] font-bold text-sm">{fallback}</span>
      </div>
    );
  }

  return (
    <div className={finalClassName}>
      {/* ✅ img عادي بدل next/image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setImgError(true)}
      />
    </div>
  );
};