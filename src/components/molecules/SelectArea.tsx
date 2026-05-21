"use client"

import { cn } from '@/utils/shadcn.utils';
import { Button } from '../ui/button';

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
            <div className="flex gap-5 flex-wrap m-3 p-3 rounded-sm">
                {itemsList.map((item) => (
                    <Button
                        variant='secondary'
                        key={String(item)}
                        className={cn(
                            "rounded-md font-normal border-primary border px-3 py-2 cursor-pointer whitespace-nowrap",
                            selectedItemsList.includes(item)
                                ? "bg-primary-500 text-white"
                                : "text-black"
                        )}
                        onClick={()=>handleSelect(item)}
                    >
                        <h2 className='text-xl'>{String(item)}</h2>
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default SelectArea
