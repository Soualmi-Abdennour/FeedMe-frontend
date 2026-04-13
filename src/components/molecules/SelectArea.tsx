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
            <h1 className="text-2xl mt-4 py-5 text-left">{areaTitle}</h1>
            <div className="flex gap-5 flex-wrap justify-start text-2xl p-3 rounded-sm">
                {itemsList.map((item) => (
                    <button
                        key={String(item)}
                        className={cn(
                            "rounded-md border-primary-500 text-2xl border px-3 py-2 cursor-pointer whitespace-nowrap",
                            selectedItemsList.includes(item)
                                ? "bg-primary-500 text-white"
                                : "text-black"
                        )}
                        onClick={()=>handleSelect(item)}
                    >
                        <p className='font-normal text-xl '>{String(item)}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SelectArea
