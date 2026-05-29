import { IMenuItemProps } from "../../types/props.types";

export  function MenuItem({ icon, label, onClick, danger = false, disabled = false, hint }: IMenuItemProps) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); if (!disabled) onClick(); }}
      disabled={disabled}
      title={hint}
      className={`
        w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors
        ${disabled
          ? "opacity-35 cursor-not-allowed text-[#8B6F63]"
          : danger
            ? "text-red-500 hover:bg-red-50"
            : "text-[#3D2A22] hover:bg-[#FFF5F0]"
        }
      `}
    >
      <span className="shrink-0">{icon}</span>
      <span className="flex-1">{label}</span>
    </button>
  );
}