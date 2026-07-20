import React from "react";
import { Search, SlidersHorizontal, Download, Plus } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full select-none mt-0 pt-0 shrink-0">
      
      {/* Left Info Area */}
      <div className="min-w-0">
        <h1 className="text-[15px] sm:text-[17px] font-bold text-white tracking-tight leading-tight">
          Good Morning, Atul
        </h1>
        <p className="text-[9px] sm:text-[10px] text-[#a1a1aa] leading-normal truncate max-w-xs sm:max-w-xl">
          Monitor vehicle locations, movement and fleet status in real time.
        </p>
      </div>

      {/* Right Actions Area */}
      <div className="flex items-center gap-1.5 w-full sm:w-auto shrink-0 justify-between sm:justify-end">
        
        {/* Search Bar */}
        <div className="relative flex-1 sm:flex-initial min-w-0 sm:min-w-[150px]">
          <Search
            size={11}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#71717a]"
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-7 pr-2.5 py-1 text-[10px] rounded-lg bg-[#18181b] border border-[#27272a] placeholder-[#71717a] focus:outline-none focus:border-[#FDBB24] text-white transition-all"
          />
        </div>

        {/* Action Icon Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button 
            aria-label="Filter"
            className="p-1.5 rounded-lg bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
          >
            <SlidersHorizontal size={11} />
          </button>

          <button 
            aria-label="Download Data"
            className="p-1.5 rounded-lg bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
          >
            <Download size={11} />
          </button>
        </div>

        {/* Add Vehicle Button */}
        <button className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FDBB24] text-black font-bold text-[10px] hover:bg-[#E9AE17] transition-colors shadow-sm whitespace-nowrap cursor-pointer shrink-0">
          <Plus size={11} />
          <span className="hidden xs:inline">Add Vehicle</span>
        </button>
      </div>
    </div>
  );
}