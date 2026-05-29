import { IActionBarTextProps } from "../../types/props.types";


export  function TextLabel({
  children,
  variant = "body",
  color = "primary",
  className = "",
}: IActionBarTextProps) {
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
