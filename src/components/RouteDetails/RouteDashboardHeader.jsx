import React from "react";
import { Search, ChevronDown } from "lucide-react";

export default function RouteDashboardHeader() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 w-full select-none py-2 px-4 bg-black text-white">
      
      {/* Left Info Area */}
      <div className="flex-1 min-w-0">
        <h1 className="text-sm sm:text-[15px] font-bold text-white tracking-tight leading-none">
          Current Route
        </h1>
        <p className="mt-1 text-[10px] text-[#71717a] leading-normal">
          Track the selected vehicle's current trip and route progress.
        </p>
      </div>

      {/* Right Actions Area (Filters + Search) */}
      <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto shrink-0 justify-start lg:justify-end">
        
        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Time Filter */}
          <div className="relative">
            <select className="appearance-none bg-transparent hover:bg-[#18181b] text-[10.5px] text-[#a1a1aa] pl-3 pr-7 py-1.5 rounded-full border border-[#27272a] focus:outline-none cursor-pointer transition-colors">
              <option>Last 24 Hours</option>
            </select>
            <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
          </div>

          {/* Region Filter */}
          <div className="relative">
            <select className="appearance-none bg-transparent hover:bg-[#18181b] text-[10.5px] text-[#a1a1aa] pl-3 pr-7 py-1.5 rounded-full border border-[#27272a] focus:outline-none cursor-pointer transition-colors">
              <option>Region</option>
            </select>
            <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select className="appearance-none bg-transparent hover:bg-[#18181b] text-[10.5px] text-[#a1a1aa] pl-3 pr-7 py-1.5 rounded-full border border-[#27272a] focus:outline-none cursor-pointer transition-colors">
              <option>Status</option>
            </select>
            <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
          </div>

          {/* Fleet Filter */}
          <div className="relative">
            <select className="appearance-none bg-transparent hover:bg-[#18181b] text-[10.5px] text-[#a1a1aa] pl-3 pr-7 py-1.5 rounded-full border border-[#27272a] focus:outline-none cursor-pointer transition-colors">
              <option>Fleet</option>
            </select>
            <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
          </div>
        </div>

        {/* Search Bar (Icon on the Right) */}
        <div className="relative flex-1 sm:flex-initial min-w-[140px]">
          <input
            type="text"
            placeholder="Search Vehicle..."
            className="w-full sm:w-44 pl-3 pr-8 py-1.5 text-[10.5px] rounded-full bg-transparent border border-[#27272a] placeholder-[#71717a] focus:outline-none focus:border-[#FDBB24] text-white transition-all"
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