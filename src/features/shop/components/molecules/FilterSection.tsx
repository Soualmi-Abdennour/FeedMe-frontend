'use client';

import { SlidersHorizontal } from 'lucide-react';
import { SearchBar } from '@/features/shop/components/molecules/SearchBar';
import SortSelect from '@/features/shop/components/atoms/SortSelect';
import { IFilterSectionProps } from '../../types/props.types';



export default function FilterSection({ search, onSearch, sort, onSort }: IFilterSectionProps) {
  return (
    <div className="flex items-center gap-3 mb-4 ">
      <div className="flex-1">
        <SearchBar
          value={search}
          onChange={onSearch}
          onSearch={(v) => console.log(v)}
          placeholder="Search"
            className="w-[440px] h-[56px]" // fixed width & height

        />
      </div>
      <SortSelect value={sort} onChange={onSort} />
      <button className="flex items-center gap-2  rounded-lg px-4 py-2 font-bold text-md text-black  hover:bg-gray-50 whitespace-nowrap">
        <SlidersHorizontal size={15} />
        Order
      </button>
    </div>
  );
}