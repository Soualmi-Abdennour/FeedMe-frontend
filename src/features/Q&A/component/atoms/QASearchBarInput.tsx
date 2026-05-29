/**
 * ATOM: Input
 * 
 * Rôle: Champ d'entrée réutilisable pour les formulaires.
 * Utilisé dans: Recherche, Formulaires, Filtres
 * 
 * Props:
 * - placeholder: Texte d'indication
 * - value: Valeur actuelle
 * - onChange: Fonction appelée lors du changement
 * - type: Type d'input ("text", "email", "password", "search")
 * - icon?: Icône avant le texte (optionnel)
 * - className?: Classes Tailwind supplémentaires
 */
import { useState, useEffect } from "react";
import { IQASearchBarInputProps } from "../../types/props.types";



export function QASearchBarInput({
  placeholder,
  value,
  onChange,
  type = "text",
  icon,
  className = "",
}: IQASearchBarInputProps) {
  const [localValue, setLocalValue] = useState(value ?? "");

  // keep localValue in sync when parent provides a value (controlled)
  useEffect(() => {
    setLocalValue(value ?? "");
  }, [value]);
  return (
    <div className="relative flex items-center w-full">
      {icon && (
        <span className="absolute left-4 text-[#8B6F63]">
          {icon}
        </span>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value ?? localValue}
        onChange={(e) => {
          const v = e.target.value;
          if (onChange) onChange(v);
          else setLocalValue(v);
        }}
   className={`
  w-full
  px-4
  py-3
  ${icon ? "pl-11" : ""}
  rounded-xl
  border
  shadow-sm
  transition-all
  focus:outline-none
  focus:ring-2
  ${className}
`}
      />
    </div>
  );
}