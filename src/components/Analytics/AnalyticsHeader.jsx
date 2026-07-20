import React from "react";
import { Search, ChevronDown, Download } from "lucide-react";

export default function AnalyticsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 w-full select-none mt-0 pt-0">
      
      {/* Left Info Area */}
      <div className="flex-1 min-w-0">
        <h1 className="text-[16px] sm:text-lg font-bold text-white tracking-tight leading-none">
          Analytics
        </h1>
        <p className="mt-1 text-[10px] text-[#a1a1aa] leading-normal max-w-2xl">
          Understand fleet usage, movement and operational performance.
        </p>
      </div>

      {/* Right Actions Area */}
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0 justify-start sm:justify-end">
        
        {/* Search Bar - Icon on Right side */}
        <div className="relative flex-1 sm:flex-initial min-w-36">
          <input
            type="text"
            placeholder="Search Vehicle..."
            className="w-full sm:w-44 pr-8 pl-3 py-1 text-[10.5px] rounded-2xl bg-[#18181b]/40 border border-[#27272a] placeholder-[#71717a] focus:outline-none focus:border-[#FDBB24] text-white transition-all"
          />
          <Search
            size={12}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a]"
          />
        </div>

        {/* Dropdown Selector */}
        <div className="relative flex-1 sm:flex-initial">
          <button className="w-full sm:w-auto flex items-center justify-between gap-4 px-3 py-1 text-[10.5px] rounded-2xl bg-[#18181b]/40 border border-[#27272a] text-[#d4d4d8] hover:border-zinc-600 transition-colors cursor-pointer">
            <span>All Vehicles (59)</span>
            <ChevronDown size={12} className="text-[#71717a]" />
          </button>
        </div>

        {/* Export Data Button (Yellow Filled) */}
        <button className="flex items-center justify-center gap-1.5 flex-1 sm:flex-initial px-3 py-1 rounded-md bg-[#FDBB24] text-black font-bold text-[10.5px] hover:bg-[#E9AE17] transition-colors shadow-sm whitespace-nowrap cursor-pointer">
          Export Data
          <Download size={12} strokeWidth={2.5} />
        </button>
      </div>

    </div>
  );
}