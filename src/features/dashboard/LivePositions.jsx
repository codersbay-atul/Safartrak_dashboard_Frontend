import React from 'react';
import { ChevronRight } from 'lucide-react';
import LiveMap from "./LiveMap"; 

export default function LivePositions({ selectedVehicle, showRoutePath }) {
  return (
    <div className="w-full h-full min-h-[350px] lg:min-h-0 bg-[#121214] border border-[#1f1f23]/60 rounded-xl flex flex-col select-none overflow-hidden relative">
      
      {/* 1. Header Area */}
      <div className="flex items-center justify-between p-3 border-b border-[#1f1f23]/60 bg-[#121214]/90 z-10 shrink-0">
        <h3 className="text-[13px] font-bold text-white tracking-tight">
          Live Position
        </h3>
        <button className="flex items-center gap-0.5 text-[10.5px] font-bold text-[#FDBB24] hover:text-[#E9AE17] transition-colors cursor-pointer">
          View Map <ChevronRight size={13} />
        </button>
      </div>

      {/* 2. Map Container */}
      <div className="flex-1 min-h-0 w-full h-full relative overflow-hidden bg-[#161619]">
       
        <LiveMap selectedVehicle={selectedVehicle} showRoutePath={showRoutePath} />
      </div>

    </div>
  );
}