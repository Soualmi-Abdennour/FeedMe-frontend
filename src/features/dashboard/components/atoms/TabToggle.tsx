import { ITabToggleProps } from "../../types/props.types";

export default function TabToggle({ tabs, active, onChange }: ITabToggleProps) {
  return (
    <div className="flex gap-3">
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)} 
            className={`
              px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border
              ${isActive
                ? 'bg-orange-400 text-white border-orange-400 shadow-lg shadow-orange-200'
                : 'bg-[#fdf0e8] text-gray-700 border-[#e8d5c4] hover:bg-orange-50'
              }
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
