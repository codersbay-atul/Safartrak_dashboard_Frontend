import React from 'react';
import { LayoutDashboard, Bell, Calendar } from 'lucide-react';

export default function Navbar({ currentView }) {
  return (
    <header className="flex items-center justify-between px-6 py-2.5 border-b border-[#1f1f23] bg-[#09090b] sticky top-0 z-30 select-none">
      
      <div className="flex items-center gap-2 text-[11px] text-[#a1a1aa] font-medium tracking-wide">
        <LayoutDashboard size={14} className="text-[#71717a]" />
        
        {/* Dynamic Text Logic */}
        <div className="flex items-center gap-1.5">
          <span className={currentView === "routes" ? "text-[#71717a]" : "text-white font-semibold"}>
            Dashboard
          </span>
          {currentView === "routes" && (
            <>
              <span className="text-[#4b5563] font-normal">/</span>
              <span className="text-white font-semibold">Check Routes</span>
            </>
          )}
        </div>
      </div>

      {/* Right: Actions and User Controls (REMAINS EXACTLY SAME) */}
      <div className="flex items-center gap-3">
        {/* Notification Button */}
        <button className="p-1.5 rounded-full bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white transition-colors relative">
          <Bell size={14} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#ef4444] rounded-full"></span>
        </button>

        {/* Calendar Button */}
        <button className="p-1.5 rounded-full bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white transition-colors">
          <Calendar size={14} />
        </button>

        {/* Current Date Details */}
        <div className="text-right leading-tight">
          <p className="text-[10px] font-semibold text-white">Monday,</p>
          <p className="text-[9px] text-[#a1a1aa]">July 6, 2026</p>
        </div>

        {/* User Account Info */}
        <div className="flex items-center gap-2 pl-3 border-l border-[#27272a]">
          <div className="w-7 h-7 rounded-full bg-[#3b82f6] flex items-center justify-center text-white font-bold text-xs shadow-sm">
            AT
          </div>
          <div className="leading-tight">
            <p className="text-[10px] font-semibold text-white">Atul</p>
            <p className="text-[9px] text-[#a1a1aa]">Operations Admin</p>
          </div>
        </div>
      </div>

    </header>
  );
}