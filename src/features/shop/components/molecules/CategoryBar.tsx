
'use client';

import { KITCHEN_CATEGORY } from '@/constants/app.constants';
import { CategoryPill } from '../atoms/CategoryPill';
import { ICategoryBarProps } from '../../types/props.types';



export  function CategoryBar({ active, onSelect, onApply }: ICategoryBarProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide flex-1 py-1">
        <CategoryPill
          label="All"
          value="all"
          isActive={active.includes('all')}
          onClick={onSelect}
        />
        {KITCHEN_CATEGORY.map((cat) => (
          <CategoryPill
            key={cat.key}
            label={cat.value}
           value={cat.value.toLowerCase()}
isActive={active.includes(cat.value.toLowerCase())}
            onClick={onSelect}
          />
        ))}
      </div>
      
      <button
        onClick={onApply}
          className={`
          inline-flex items-center justify-center whitespace-nowrap
          h-[46px] px-6 rounded-lg text-sm font-semibold
          border-2 transition-all duration-200 cursor-pointer
          bg-[#FF7A00] text-white hover:bg-orange-600
          focus:ring-[#FF7A00]/50
        `}
      >
        Apply
       </button>
    </div>
  );
};
;7