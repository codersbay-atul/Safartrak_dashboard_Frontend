import React from "react";
import { Search, ChevronDown } from "lucide-react";

export default function RouteDashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 w-full select-none py-2 px-3 bg-[#121214] border border-[#1f1f23]/60 rounded-xl text-white">
      
      {/* Left Info Area - Stacked vertically on mobile, row aligned on desktop */}
      <div className="min-w-0">
        <h1 className="text-sm sm:text-[14px] font-bold text-white tracking-tight leading-tight">
          Current Route
        </h1>
        <p className="mt-0.5 text-[9.5px] text-[#71717a] leading-normal truncate">
          Track the selected vehicle's current trip and route progress.
        </p>
      </div>

      {/* Right Actions Area - Wrapping layout management */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full md:w-auto">
        
        {/* Dropdown Filters - Grid structure on tiny mobile screens, row on larger layouts */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-1.5 flex-1 sm:flex-initial">
          {/* Time Filter */}
          <div className="relative w-full sm:w-auto">
            <select className="appearance-none w-full bg-[#161619]/40 hover:bg-[#18181b] text-[10px] sm:text-[10.5px] text-[#a1a1aa] pl-2.5 pr-7 py-1.5 rounded-full border border-[#27272a] focus:outline-none cursor-pointer transition-colors text-ellipsis overflow-hidden whitespace-nowrap">
              <option>Last 24 Hours</option>
            </select>
            <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
          </div>

          {/* Region Filter */}
          <div className="relative w-full sm:w-auto">
            <select className="appearance-none w-full bg-[#161619]/40 hover:bg-[#18181b] text-[10px] sm:text-[10.5px] text-[#a1a1aa] pl-2.5 pr-7 py-1.5 rounded-full border border-[#27272a] focus:outline-none cursor-pointer transition-colors">
              <option>Region</option>
            </select>
            <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative w-full sm:w-auto">
            <select className="appearance-none w-full bg-[#161619]/40 hover:bg-[#18181b] text-[10px] sm:text-[10.5px] text-[#a1a1aa] pl-2.5 pr-7 py-1.5 rounded-full border border-[#27272a] focus:outline-none cursor-pointer transition-colors">
              <option>Status</option>
            </select>
            <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
          </div>

          {/* Fleet Filter */}
          <div className="relative w-full sm:w-auto">
            <select className="appearance-none w-full bg-[#161619]/40 hover:bg-[#18181b] text-[10px] sm:text-[10.5px] text-[#a1a1aa] pl-2.5 pr-7 py-1.5 rounded-full border border-[#27272a] focus:outline-none cursor-pointer transition-colors">
              <option>Fleet</option>
            </select>
            <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
          </div>
        </div>

        {/* Search Bar (Auto adjusts full width on mobile, standard width on desktop) */}
        <div className="relative w-full sm:w-auto min-w-[130px]">
          <input
            type="text"
            placeholder="Search Vehicle..."
            className="w-full sm:w-36 md:w-40 pl-3 pr-8 py-1.5 text-[10px] sm:text-[10.5px] rounded-full bg-transparent border border-[#27272a] placeholder-[#71717a] focus:outline-none focus:border-[#FDBB24] text-white transition-all bg-[#161619]/20"
          />
          <Search
            size={11}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717a]"
          />
        </div>

      </div>
    </div>
  );
}