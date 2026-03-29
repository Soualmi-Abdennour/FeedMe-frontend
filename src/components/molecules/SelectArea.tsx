"use client"

import { cn } from '@/utils/shadcn.utils';

function SelectArea<T>({
    areaTitle,
    itemsList,
    selectedItemsList,
    handleSelect,
}: {
    areaTitle: string;
    itemsList: T[];
    selectedItemsList: T[];
    handleSelect:(value:T)=>void
}) {
    return (
        <div>
            <h1 className="text-2xl mt-4">{areaTitle}</h1>
            <div className="flex gap-10 flex-wrap border border-gray-500 p-3 rounded-sm">
                {itemsList.map((item) => (
                    <button
                        key={String(item)}
                        className={cn(
                            "rounded-md border-primary border px-3 py-2 cursor-pointer whitespace-nowrap",
                            selectedItemsList.includes(item)
                                ? "bg-primary text-white"
                                : "text-black"
                        )}
                        onClick={()=>handleSelect(item)}
                    >
                        <h2>{String(item)}</h2>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SelectArea
