'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { ISortSelectProps } from '../../types/props.types';
import { SORT_OPTIONS } from '../../constants/shop.constants';



export default function SortSelect({ value, onChange }: ISortSelectProps) {
  const [open, setOpen] = useState(false); 
  const ref = useRef<HTMLDivElement>(null); //kat reference l-div dyal component bach tdetect clicks outside

  useEffect(() => { //Hadi logic bach close dropdown ila clickit f chi place kharej.
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  //Kat7ssb label li yban fl bouton te3 dropdown selon la valeur sélectionnée.
  const currentLabel = value  
    ? SORT_OPTIONS.find(opt => opt.value === value)?.label 
    : 'Order by type';
  return (
    <div ref={ref} className="relative ${className}">
      {/* Bouton principal - Styles calqués sur votre composant Input */}
      <button  //Button li katdir toggle l’ouverture dyal dropdown
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
        <span className={`text-sm ${value ? 'text-gray-800' : 'text-gray-400'}`}>
          {currentLabel}
        </span>
        
        <ChevronDown
          size={16} 
          className={`text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`} 
        />

      </button>

      {open && (
        <ul className="absolute w-full mt-1 bg-white border-2 border-[#FFBD97] rounded-lg shadow-lg z-20 py-1 overflow-hidden">
          {SORT_OPTIONS.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`
                px-4 py-2 cursor-pointer text-sm transition-colors
                ${value === opt.value 
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