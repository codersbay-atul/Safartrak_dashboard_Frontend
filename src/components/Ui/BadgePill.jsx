import React from 'react';

export default function BadgePill({ 
  label, 
  count = null, 
  dotColor = "bg-[#71717a]", 
  isActive = false, 
  onClick 
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-2.5 py-1 sm:px-1.5 sm:py-0.5 rounded-full text-[9px] sm:text-[8.5px] font-medium transition-all duration-200 bg-[#18181b] border border-[#27272a] text-[#d4d4d8] hover:border-zinc-600 cursor-pointer shrink-0 ${
        isActive ? "border-zinc-500 bg-zinc-800 text-white" : ""
      }`}
    >
      <span className={`w-1 h-1 rounded-sm ${dotColor}`} />
      {label} {count !== null && `(${count})`}
    </button>
  );
}