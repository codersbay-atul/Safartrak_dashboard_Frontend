import React, { useState } from "react";
import { Search, SlidersHorizontal, Download } from "lucide-react";
import Button from "./Button"; 

export default function PageHeader({

  title,
  subtitle,
  searchPlaceholder = "Search",
  
  // Functions
  onSearch,
  onFilterClick,
  onExportClick,
  
  showSearch = true,
  showFilter = true,
  showExport = true,
  
  children,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearch) onSearch(val);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 w-full select-none mt-0 pt-0 shrink-0">
      
      {/* 1. Left Title & Subtitle Area */}
      <div className="min-w-0">
        <h1 className="text-[15px] sm:text-[17px] font-bold text-white tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[9px] sm:text-[10px] text-[#a1a1aa] leading-normal truncate max-w-xs sm:max-w-xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* 2. Right Actions Container */}
      <div className="flex items-center gap-1.5 w-full sm:w-auto shrink-0 justify-between sm:justify-end">
        
        {/* Search Bar */}
        {showSearch && (
          <div className="relative flex-1 sm:flex-initial min-w-0 sm:min-w-[150px]">
            <Search
              size={11}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={searchPlaceholder}
              className="w-full pl-7 pr-2.5 py-1 text-[10px] rounded-lg bg-[#18181b] border border-[#27272a] placeholder-[#71717a] focus:outline-none focus:border-[#FDBB24] text-white transition-all"
            />
          </div>
        )}

        {/* Filter & Export Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          {showFilter && (
            <Button
              variant="secondary"
              size="sm"
              icon={SlidersHorizontal}
              onClick={onFilterClick}
              aria-label="Filter"
              className="px-2 py-1.5"
            />
          )}

          {showExport && (
            <Button
              variant="secondary"
              size="sm"
              icon={Download}
              onClick={onExportClick}
              aria-label="Download Data"
              className="px-2 py-1.5"
            />
          )}
        </div>

        {/* Dynamic Primary Action Button */}
        {children}

      </div>
    </div>
  );
}