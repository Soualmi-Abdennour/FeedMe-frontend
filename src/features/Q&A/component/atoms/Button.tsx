/**
 * ATOM: Button
 * 
 * Rôle: Bouton réutilisable avec plusieurs variantes.
 * Utilisé dans: Formulaires, Actions, Navigation
 * 
 * Props:
 * - children: Contenu du bouton
 * - variant: Style du bouton ("primary", "secondary", "outline", "ghost")
 * - size: Taille du bouton ("sm", "md", "lg")
 * - onClick?: Fonction appelée au clic
 * - disabled?: Désactiver le bouton
 * - icon?: Icône avant le texte (optionnel)
 * - className?: Classes Tailwind supplémentaires
 */

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  icon,
  className = "",
  type = "button",
}: ButtonProps) {
  const variantClasses = {
    primary:
      "bg-orange-500 hover:bg-orange-600 text-white disabled:bg-gray-600 disabled:text-gray-400",
    secondary:
      "bg-gray-700 hover:bg-gray-600 text-white disabled:bg-gray-800 disabled:text-gray-500",
    outline:
      "border border-gray-600 hover:bg-gray-800 text-gray-300 disabled:opacity-50 disabled:text-gray-600",
    ghost: "hover:bg-gray-800 text-gray-300 disabled:opacity-50 disabled:text-gray-600",
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-lg font-medium transition-colors duration-200 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
