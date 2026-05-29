

import type { KeyboardEvent } from "react";
import SearchBarInput from "../atoms/SearchBarInput";
import { Icon } from "@/components/atoms/Icon";
import { ISearchBarProps } from "../../types/props.types";



export default function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
  onSearch,
}: ISearchBarProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      onSearch?.();
    }
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <SearchBarInput
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
