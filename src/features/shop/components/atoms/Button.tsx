import React from 'react';
 
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}
 
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  leadingIcon,
  trailingIcon,
}) => {
  // Base — font-semibold, rounded-lg (8px), smooth transitions, focus ring
  const baseStyles =
    'inline-flex items-center justify-center gap-5 font-semibold rounded-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 select-none';
 
  // Figma primary/500 = #FF7A00  |  hover = primary/600 ≈ #E06D00
  const variantStyles: Record<string, string> = {
    primary:
      'bg-[#FF7A00] text-white hover:bg-[#E06D00] focus:ring-[#FF7A00]/50',
    secondary:
      'bg-white text-[#FF7A00] border-2 border-[#FF7A00] hover:bg-orange-50 focus:ring-[#FF7A00]/50',
    ghost:
      'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400/50',
    outline:
      'bg-transparent text-gray-700 border-2 border-gray-300 hover:border-gray-400 focus:ring-gray-400/50',
  };
 
  // Figma md: padding 10px 24px, height 46px  →  py-[10px] px-6
  // sm/lg proportionally adjusted
  const sizeStyles: Record<string, string> = {
    sm:  'px-4   py-1.5 text-sm  h-[34px]',
    md:  'px-6   py-[10px] text-base h-[46px]',   // ← Figma exact
    lg:  'px-8   py-3.5 text-lg  h-[56px]',
  };
 
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
 
  const finalClassName = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    disabledStyles,
    className,
  ]
    .filter(Boolean)
    .join(' ');
 
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={finalClassName}
    >
      {leadingIcon && <span className="flex-shrink-0">{leadingIcon}</span>}
      {children}
      {trailingIcon && <span className="flex-shrink-0">{trailingIcon}</span>}
    </button>
  );
};
 