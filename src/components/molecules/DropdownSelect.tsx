'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { PostMediaType } from '@/features/studio-and-publication/types/studio.types';
import { SlidersVertical } from 'lucide-react';

interface IDropdownSelect {
    menuLabel: string;
    currentValue: string[]
    selectOptions: {
        label: string,
        key: PostMediaType
        value: string
    }[],
    onChange: (value: string) => void;
}

export default function DropdownSelect({ menuLabel, selectOptions, currentValue, onChange }: IDropdownSelect) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    return (
        <div ref={ref} className="relative flex items-center gap-2">
            <button
                onClick={() => setOpen(!open)}
                className={`
                    flex items-center gap-1.5 px-3 py-2
                    rounded-lg  transition-colors duration-200
                    focus:outline-none
                    ${open
                        ? ' text-primary-400 '
                        : ' text-black hover:text-primary-500'
                    }
                `}
            >
                <SlidersVertical size={20} />
                <span className="font-bold text-lg">Filter</span>
            </button>
    
            {open && (
                <div className="absolute right-0 top-full mt-2 w-[260px] bg-white border-2 border-[#FFBD97] rounded-lg shadow-lg z-20 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#FFBD97]">
                        <div className="flex flex-col">
                            <span className="text-xs text-neutral-400">{menuLabel}</span>
                            <span className="text-sm text-neutral-900">
                                {currentValue.length > 0
                                    ? currentValue.join(", ")
                                    : "None selected"}
                            </span>
                        </div>
                        <ChevronDown size={14} className="text-gray-400 rotate-180" />
                    </div>
                    <ul className="py-1">
                        {selectOptions.map((opt) => (
                            <li
                                key={opt.key}
                                onClick={() => onChange(opt.value)}
                                className={`
                                    flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm
                                    transition-colors duration-150
                                    ${currentValue.includes(opt.value)
                                        ? 'text-orange-700 font-semibold'
                                        : 'text-neutral-500 hover:bg-orange-50 hover:text-orange-600'
                                    }
                                `}
                            >
                                {/* Checkbox indicator */}
                                <span className={`
                                    w-4 h-4 rounded flex items-center justify-center border-2 flex-shrink-0
                                    ${currentValue.includes(opt.value)
                                        ? 'bg-orange-500 border-orange-500'
                                        : 'border-neutral-300'
                                    }
                                `}>
                                    {currentValue.includes(opt.value) && (
                                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    )}
                                </span>
                                {opt.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}