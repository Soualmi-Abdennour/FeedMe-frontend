'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { ISuccessToastProps } from '@/types/props.types';



export default function SuccessToast({
  message = 'The operation was completed successfully',
  visible,
  onDismiss,
  duration = 3500,
}: ISuccessToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      if (duration > 0) {
        const t = setTimeout(() => {
          setShow(false);
          onDismiss?.();
        }, duration);
        return () => clearTimeout(t);
      }
    } else {
      setShow(false);
    }
  }, [visible, duration, onDismiss]);

  if (!show) return null;

  return (
    <div
      className="
        fixed top-4 left-4 z-[60]
        bg-white rounded-2xl shadow-md
        flex flex-col items-center justify-center gap-3
        px-6 py-5
        animate-in fade-in slide-in-from-top-2 duration-300
      "
      style={{ width: '224px', minHeight: '120px' }}
    >
      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-sm">
        <Check size={24} strokeWidth={3} className="text-white" />
      </div>
      <p className="text-sm font-medium text-gray-700 text-center leading-snug">
        {message}
      </p>
    </div>
  );
}