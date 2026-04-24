interface Tab { //one element 
  label: string;
  value: string;
}

interface TabToggleProps {
  tabs: Tab[]; //list of tabs 
  active: string; //tab selected 
  onChange: (value: string) => void; //function to call when tab changes, it receives the value of the selected tab
}

export default function TabToggle({ tabs, active, onChange }: TabToggleProps) {
  return (
    <div className="flex gap-3">
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)} // call onChange with the value of the selected tab when clicked . to pass the value of the selected tab to the parent component
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
