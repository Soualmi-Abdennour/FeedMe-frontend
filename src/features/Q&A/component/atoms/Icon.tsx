/**
 * ATOM: Icon
 * 
 * Rôle: Affiche des icônes réutilisables avec plusieurs variantes.
 * Utilisé dans: Boutons, Badges, Listes, Navigation
 * 
 * Props:
 * - name: Nom de l'icône (heart, comment, search, etc.)
 * - size: Taille de l'icône ("sm", "md", "lg")
 * - filled?: Si true, l'icône est remplie
 * - className?: Classes Tailwind supplémentaires
 */

import React from 'react';
import {
  Home,
  MessageSquareText,   // Questions
  CircleHelp,            // Help / FAQ
  Bookmark,              // Save later
  CheckCircle2,          // Correct answer
  Bell,
  User,
  Settings,
  LogOut,
  Search,
  Menu,
  FileText,
  Briefcase,
  Heart,
  Inbox,
  MessageCircle,
} from 'lucide-react';

interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'black' | 'gray' | 'orange' | 'green' | 'white'| 'red';
  className?: string;
    filled?: boolean;

}

const iconMap = {
  home: Home,

  // Q&A
  questions: MessageSquareText,
  'my-questions': CircleHelp,
  answers: Inbox,

  // Actions
  'save-later': Bookmark,
  correct: CheckCircle2,
  comment: MessageCircle,

  // General
  bell: Bell,
  user: User,
  settings: Settings,
  'log-out': LogOut,
  search: Search,
  menu: Menu,
  'file-text': FileText,
  briefcase: Briefcase,
  heart: Heart,
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color = 'black',
  className = '',
  filled = false
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

  const IconComponent = iconMap[name as keyof typeof iconMap];

  if (!IconComponent) return null;

  return (
    <IconComponent
      className={`${sizeStyles[size]} ${colorStyles[color]} transition-all duration-200 ${className}`}
      strokeWidth={2}
      fill={filled ? "currentColor" : "none"}
    />
  );
};