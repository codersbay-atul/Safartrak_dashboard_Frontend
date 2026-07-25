import React from 'react';

export default function UserAvatar({ initials = "AT", name = "Atul", role = "Operations Admin", onClick }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity focus:outline-none select-none shrink-0"
    >
      <div className="w-7 h-7 rounded-full bg-[#3b82f6] flex items-center justify-center text-white font-bold text-xs shadow-sm shrink-0">
        {initials}
      </div>
      <div className="leading-none hidden md:block text-left">
        <p className="text-[15px] font-semibold text-white truncate">{name}</p>
        <p className="text-[10px] text-[#a1a1aa] mt-0.5 truncate">{role}</p>
      </div>
    </button>
  );
}