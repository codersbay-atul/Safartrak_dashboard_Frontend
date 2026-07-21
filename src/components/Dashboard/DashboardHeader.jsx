import React, { useState } from "react";
import { Search, SlidersHorizontal, Download, Plus } from "lucide-react";
import Button from "../Ui/Button";

export default function DashboardHeader({
  userName = "Atul",
  onSearch,
  onFilterClick,
  onExportClick,
  onAddVehicleClick,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 w-full select-none mt-0 pt-0 shrink-0">
      
      {/* Left Info Area */}
      <div className="min-w-0">
        <h1 className="text-[15px] sm:text-[17px] font-bold text-white tracking-tight leading-tight">
          Good Morning, {userName}
        </h1>
        <p className="text-[9px] sm:text-[10px] text-[#a1a1aa] leading-normal truncate max-w-xs sm:max-w-xl">
          Monitor vehicle locations, movement and fleet status in real time.
        </p>
      </div>

    
      <div className="flex items-center gap-1.5 w-full sm:w-auto shrink-0 justify-between sm:justify-end">
        
        {/* Search Bar Input */}
        <div className="relative flex-1 sm:flex-initial min-w-0 sm:min-w-[150px]">
          <Search
            size={11}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search"
            className="w-full pl-7 pr-2.5 py-1 text-[10px] rounded-lg bg-[#18181b] border border-[#27272a] placeholder-[#71717a] focus:outline-none focus:border-[#FDBB24] text-white transition-all"
          />
        </div>

        <div className="flex items-center gap-1 shrink-0">
          
          <Button
            variant="secondary"
            size="sm"
            icon={SlidersHorizontal}
            onClick={onFilterClick}
            aria-label="Filter"
            className="px-2 py-1.5"
          />

          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={onExportClick}
            aria-label="Download Data"
            className="px-2 py-1.5"
          />
        </div>

    
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={onAddVehicleClick}
          className="font-bold whitespace-nowrap text-[10px]"
        >
          <span className="hidden xs:inline">Add Vehicle</span>
        </Button>

      </div>
    </div>
  );
}