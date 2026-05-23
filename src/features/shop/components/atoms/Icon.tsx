import React from 'react';
import {
  ShoppingCart,
  Bell,
  User,
  Settings,
  LogOut,
  Search,
  Star,
  ChevronDown,
  Menu,
  Home,
  FileText,
  HelpCircle,
  Briefcase,
  Heart,
} from 'lucide-react';

interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'black' | 'gray' | 'orange' | 'white';
  className?: string;
}

const iconMap = {
  'shopping-cart': ShoppingCart,
  'bell': Bell,
  'user': User,
  'settings': Settings,
  'log-out': LogOut,
  'search': Search,
  'star': Star,
  'chevron-down': ChevronDown,
  'menu': Menu,
  'home': Home,
  'file-text': FileText,
  'help-circle': HelpCircle,
  'briefcase': Briefcase,
  'heart': Heart,
};

export const Icon: React.FC<IconProps> = ({
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

  const IconComponent = iconMap[name as keyof typeof iconMap];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const finalClassName = `${sizeStyles[size]} ${colorStyles[color]} ${className}`;

  return <IconComponent className={finalClassName} />;
};