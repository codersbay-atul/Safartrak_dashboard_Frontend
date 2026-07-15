import React from 'react';
import { ChevronRight } from 'lucide-react';
import LiveMap from "./LiveMap"; // Leaflet map dynamic component imported here

export default function LivePosition() {
  return (
    // Outer card structure strictly aligned with Vehicle Details & Vehicle List heights
    <div className="w-full h-full bg-[#121214] border border-[#1f1f23] rounded-xl flex flex-col select-none overflow-hidden relative">
      
      {/* 1. Header Area (Stays static and clean as per your style) */}
      <div className="flex items-center justify-between p-3 border-b border-[#1f1f23]/60 bg-[#121214]/90 z-10 shrink-0">
        <h3 className="text-[13px] font-bold text-white tracking-tight">
          Live Position
        </h3>
        <button className="flex items-center gap-0.5 text-[10.5px] font-bold text-[#FDBB24] hover:text-[#E9AE17] transition-colors">
          View Map <ChevronRight size={13} />
        </button>
      </div>

      {/* 2. Map Dynamic Content Container */}
      {/* 'flex-1 min-h-0' ensures the Leaflet map dynamically occupies all remaining vertical space */}
      <div className="flex-1 min-h-0 w-full relative overflow-hidden bg-[#161619]">
        <LiveMap />
      </div>

    </div>
  );
}