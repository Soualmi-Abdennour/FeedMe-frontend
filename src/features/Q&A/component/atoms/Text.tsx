/**
 * ATOM: Text
 * 
 * Rôle: Composant de typographie réutilisable pour différents niveaux de texte.
 * Utilisé dans: Titres, Descriptions, Corps de texte
 * 
 * Props:
 * - children: Contenu du texte
 * - variant: Type de texte ("h1", "h2", "h3", "body", "small", "caption")
 * - color?: Couleur du texte ("primary", "secondary", "muted")
 * - className?: Classes Tailwind supplémentaires
 */

interface TextProps {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "body" | "small" | "caption";
  color?: "primary" | "secondary" | "muted";
  className?: string;
}

export default function Text({
  children,
  variant = "body",
  color = "primary",
  className = "",
}: TextProps) {
  const variantClasses = {
    h1: "text-3xl font-bold",
    h2: "text-2xl font-bold",
    h3: "text-xl font-semibold",
    body: "text-base font-normal",
    small: "text-sm font-normal",
    caption: "text-xs font-normal",
  };

 const colorClasses = {
  primary: "text-[#3D2A22]",
  secondary: "text-[#6F564B]",
  muted: "text-gray-500",
};

  const Tag = variant.startsWith("h") ? (variant as any) : "p";

  return (
    <Tag
      className={`${variantClasses[variant]} ${colorClasses[color]} ${className}`}
    >
      {children}
    </Tag>
  );
}
