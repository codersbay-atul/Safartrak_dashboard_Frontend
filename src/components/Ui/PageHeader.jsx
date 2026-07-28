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
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full select-none mt-0 pt-0 shrink-0">
      {/* 1. Left Title & Subtitle Area */}
      <div className="min-w-0">
        <h1 className="text-[15px] sm:text-[17px] font-bold text-white tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[12px] sm:text-[10px] text-[#a1a1aa] leading-normal truncate max-w-xs sm:max-w-xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* 2. Right Actions Container */}
      <div className="flex items-center gap-3 w-full lg:w-auto shrink-0 justify-between lg:justify-end">
        {/* Search Bar */}
        {showSearch && (
          <div className="relative flex-1 lg:flex-initial min-w-0 w-full lg:w-[220px]">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="w-full h-[40px] px-[14px] text-[15px] rounded-full bg-[#05070B] border border-[#22252B] placeholder:text-[#8B8D97] placeholder:text-[15px] focus:outline-none focus:border-[#FDBB24] text-white transition-all"
            />
            <Search
              size={18}
              className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#8B8D97] pointer-events-none"
              aria-hidden="true"
            />
          </div>
        )}

        {showFilter && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onFilterClick}
            aria-label="Filter"
            className="!h-[40px] !w-[40px] !px-0 !py-0 !rounded-full !bg-[#05070B] !border-[#22252B] text-[#d4d4d8] hover:!bg-[#12151c] hover:text-white flex-shrink-0"
          >
            <SlidersHorizontal size={18} className="shrink-0" />
          </Button>
        )}

        {showExport && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onExportClick}
            aria-label="Download Data"
            className="!h-[40px] !w-[40px] !px-0 !py-0 !rounded-full !bg-[#05070B] !border-[#22252B] text-[#d4d4d8] hover:!bg-[#12151c] hover:text-white flex-shrink-0"
          >
            <Download size={18} className="shrink-0" />
          </Button>
        )}

        {/* Dynamic Primary Action Button */}
        {children}
      </div>
    </div>
  );
}
