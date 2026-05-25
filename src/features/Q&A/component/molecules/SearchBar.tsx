/**
 * MOLECULE: SearchBar
 * 
 * Rôle: Barre de recherche avec icône et placeholder.
 * Composée de: Input (atom) + Icon (atom)
 * Utilisé dans: Header, Sidebar
 * 
 * Props:
 * - placeholder: Texte d'indication
 * - value: Valeur actuelle
 * - onChange: Fonction appelée lors du changement
 * - onSearch?: Fonction appelée au submit
 */

import type { KeyboardEvent } from "react";
import Input from "../atoms/Input";
import {Icon} from "../atoms/Icon";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: () => void;
}

export default function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
  onSearch,
}: SearchBarProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      onSearch?.();
    }
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        icon={<Icon name="search" />}
        className="w-full bg-white placeholder:text-gray-500 border-gray-300"
      />
    </div>
  );
}
