import React from 'react';

export default function Popover({ isOpen, children, className = "w-64 right-0" }) {
  if (!isOpen) return null;

  return (
    <div 
      className={`absolute top-full mt-2 bg-[#121214] border border-[#27272a] rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 ${className}`}
    >
      {children}
    </div>
  );
}