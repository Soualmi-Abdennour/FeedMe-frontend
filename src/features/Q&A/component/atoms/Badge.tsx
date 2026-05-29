// interface BadgeProps {
//   children: React.ReactNode;
//   variant?: "primary" | "secondary" | "outline";
//   icon?: React.ReactNode;
// }

// export default function Badge({
//   children,
//   variant = "secondary",
//   icon,
// }: BadgeProps) {
//   const variantClasses = {
//     primary:
//       "bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium",
//     secondary:
//       "bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium",
//     outline:
//       "border border-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm font-medium",
//   };

//   return (
//     <span className={`inline-flex items-center gap-1 ${variantClasses[variant]}`}>
//       {icon && <span>{icon}</span>}
//       {children}
//     </span>
//   );
// }
