import React from "react";
import { Search, SlidersHorizontal, Download, Plus } from "lucide-react";

export default function DashboardHeader() {
  return (
    // mt-0 se vertical alignment bilkul upar ho jayegi aur height thodi choti kar di hai
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 w-full select-none mt-0 pt-0">
      
      {/* Left Info Area: Compact fonts and spacing */}
      <div className="flex-1 min-w-0">
        <h1 className="text-[16px] sm:text-lg font-bold text-white tracking-tight leading-none">
          Good Morning, Atul
        </h1>
        <p className="mt-0.5 text-[10px] text-[#a1a1aa] leading-normal max-w-2xl">
          Monitor vehicle locations, movement and fleet status in real time.
        </p>
      </div>

      {/* Right Actions Area: Heights reduced from py-1.5 to py-1 */}
      <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto shrink-0 justify-start sm:justify-end">
        
        {/* Search Bar */}
        <div className="relative flex-1 sm:flex-initial min-w-32">
          <Search
            size={12}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-[#71717a]"
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full sm:w-40 pl-7 pr-2.5 py-1 text-[10.5px] rounded-2xl bg-[#18181b] border border-[#27272a] placeholder-[#71717a] focus:outline-none focus:border-[#FDBB24] text-white transition-all"
          />
        </div>

        {/* Action Icon Buttons */}
        <div className="flex items-center gap-1">
          <button 
            aria-label="Filter"
            className="p-1 rounded-md bg-[#18181b] text-[#a1a1aa] hover:text-white transition-colors"
          >
            <SlidersHorizontal size={12} />
          </button>

          <button 
            aria-label="Download Data"
            className="p-1 rounded-md bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white transition-colors"
          >
            <Download size={12} />
          </button>
        </div>

        {/* Add Vehicle Button: Compact height */}
        <button className="flex items-center justify-center gap-1 flex-1 sm:flex-initial px-2.5 py-1 rounded-md bg-[#FDBB24] text-black font-bold text-[10.5px] hover:bg-[#E9AE17] transition-colors shadow-sm whitespace-nowrap">
          <Plus size={12} />
          Add Vehicle
        </button>
      </div>
    </div>
  );
}