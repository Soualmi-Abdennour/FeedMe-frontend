/*'use client';
 

 
interface CategoryPillProps {
  label: string;
  value: string;
  isActive: boolean;
  onClick: (value: string) => void;
}
 
export function CategoryPill({ label, value, isActive, onClick }: CategoryPillProps) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`
        inline-flex items-center justify-center whitespace-nowrap
        h-[46px] px-6 rounded-lg text-sm font-semibold
        border-2 transition-all duration-200 cursor-pointer
        ${
          isActive
            ? 'bg-[#FF7A00] text-white border-[#FF7A00]'
            : 'bg-white text-gray-700 border-gray-300 hover:border-[#FF7A00] hover:text-[#FF7A00]'
        }
      `}
    >
      {label}
    </button>
  );
}*/
'use client';

interface CategoryPillProps {
  label: string;
  value: string;
  isActive: boolean;
  onClick: (value: string) => void;
}

export function CategoryPill({ label, value, isActive, onClick }: CategoryPillProps) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`
       inline-flex items-center justify-center whitespace-nowrap
        h-[46px] px-6 rounded-lg text-sm font-semibold
        border-2 transition-all duration-200 cursor-pointer
        ${
          isActive
       ? 'bg-[#FF7A00] text-white border-[#FF7A00]'
            : 'bg-white text-gray-700 border-gray-300 hover:border-[#FF7A00] hover:text-[#FF7A00]'
        }
      `}
    >
      {label}
      {isActive}
    </button>
  );
}