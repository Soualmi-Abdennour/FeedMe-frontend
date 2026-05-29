

import { Icon } from "@/components/atoms/Icon";
import type { KeyboardEvent } from "react";
import { IQASearchBarProps } from "../../types/props.types";
import { QASearchBarInput } from "../atoms/QASearchBarInput";



export  function QASearchBar({
  placeholder = "Search...",
  value,
  onChange,
  onSearch,
}: IQASearchBarProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      onSearch?.();
    }
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <QASearchBarInput
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
