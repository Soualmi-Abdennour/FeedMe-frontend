'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { PostMediaType } from '@/features/studio-and-publication/types/studio.types';

interface IDropdownSelect {
    menuLabel: string;
    currentValue: PostMediaType[]
    selectOptions: {
        label: string,
        value: PostMediaType
    }[],
    onChange: (value: PostMediaType) => void;
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
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(!open)}
                className={`
                    w-full  flex items-center justify-between
                    px-4 py-3 bg-white
                    border-2 border-[#FFBD97] rounded-lg
                    transition-colors duration-200
                    focus:outline-none
                    ${open ? 'border-orange-500' : 'hover:border-orange-400'}
                `}
            >
                <div className='flex flex-col justify-between flex-1'>
                    <span className='text-gray-400'>
                        {menuLabel}
                    </span>
                    <h3 className='text-gray-800'>
                        {currentValue.map((value) => value.toLowerCase()).join(", ")}
                    </h3>
                </div>
                <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}
                />

            </button>

            {open && (
                <ul className="absolute w-full mt-1 bg-white border-2 border-[#FFBD97] rounded-lg shadow-lg z-20 py-1 overflow-hidden">
                    {selectOptions.map((opt) => (
                        <li
                            key={opt.value}
                            onClick={() => {
                                onChange(opt.value);
                                setOpen(false);
                            }}
                            className={`
                                px-4 py-2 cursor-pointer text-sm transition-colors
                                ${currentValue.includes(opt.value)
                                    ? 'bg-orange-100 text-orange-700 font-semibold'
                                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                                }
                            `}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}