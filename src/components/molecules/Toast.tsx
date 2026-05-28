import { IToast } from '@/types/props.types';
import { useEffect, useState } from 'react';



export const Toast = ({ message, visible, onHide, duration = 3000 }: IToast) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onHide();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!show) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex flex-col items-center gap-2 bg-white border border-green-100 rounded-2xl shadow-md px-6 py-4 min-w-[220px]">
        {/* Circle icon */}
        <div className="w-10 h-10 rounded-full bg-green-100 border-4 border-green-200 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        {/* Message */}
        <p className="text-sm text-center text-gray-700 font-medium">
          {message}
        </p>
      </div>
    </div>
  );
};