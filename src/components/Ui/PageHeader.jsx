import React, { useState } from "react";
import { Download } from "lucide-react";
import Button from "./Button";
import SearchInput from "./SearchInput";
import Dropdown from "./DropDown";

const DATE_RANGE_OPTIONS = [
  { label: "Today", value: "today" },
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
];

const REGION_OPTIONS = [
  { label: "All Regions", value: "all" },
  { label: "North Zone", value: "north" },
  { label: "South Zone", value: "south" },
];

const STATUS_OPTIONS = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export default function PageHeader({
  title,
  subtitle,
  searchPlaceholder = "Search",

  onSearch,
  onExportClick,
  onFilterChange,

  showSearch = true,
  showExport = true,
  showFilters = true,
  customRightAction,

  children,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    dateRange: "",
    region: "",
    status: "",
    fleet: "",
  });

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearch) onSearch(val);
  };

  const handleFilterSelect = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    if (onFilterChange) onFilterChange(updatedFilters);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 xl:gap-4 w-full select-none mt-0 pt-0 shrink-0 min-w-0 overflow-visible">
      
      <div className="min-w-0 flex-1">
        <h1 className="text-[16px] font-bold text-white tracking-tight leading-tight truncate mb-1">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[12px] text-[#a1a1aa] leading-normal truncate max-w-full xl:max-w-xl 2xl:max-w-2xl mt-1">
            {subtitle}
          </p>
        )}
      </div>

      
      <div className="flex items-center gap-2 xl:gap-2.5 w-full lg:w-auto shrink-0 justify-between lg:justify-end min-w-0 flex-wrap overflow-visible z-20">
        {customRightAction && customRightAction}

        {showFilters && (
          <div className="flex items-center gap-2 overflow-visible relative z-30">
            <Dropdown
              label="Select Date Range"
              options={DATE_RANGE_OPTIONS}
              selectedValue={filters.dateRange}
              onSelect={(val) => handleFilterSelect("dateRange", val)}
              className="rounded-full bg-[#05070B] border-[#22252B] px-3.5 py-1.5 text-[11px] text-[#d4d4d8] hover:bg-[#12151c]"
            />
            <Dropdown
              label="Region"
              options={REGION_OPTIONS}
              selectedValue={filters.region}
              onSelect={(val) => handleFilterSelect("region", val)}
              className="rounded-full bg-[#05070B] border-[#22252B] px-3.5 py-1.5 text-[11px] text-[#d4d4d8] hover:bg-[#12151c]"
            />
            <Dropdown
              label="Status"
              options={STATUS_OPTIONS}
              selectedValue={filters.status}
              onSelect={(val) => handleFilterSelect("status", val)}
              className="rounded-full bg-[#05070B] border-[#22252B] px-3.5 py-1.5 text-[11px] text-[#d4d4d8] hover:bg-[#12151c]"
            />
          </div>
        )}

        {showSearch && (
          <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            containerClassName="w-full min-w-0 lg:w-[160px] xl:w-[200px]"
            className="w-full"
          />
        )}

        {showExport && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onExportClick && onExportClick({ ...filters, search: searchQuery })}
            aria-label="Download Data"
            className="!h-[38px] !w-[38px] !px-0 !py-0 !rounded-full !bg-[#05070B] !border-[#22252B] text-[#d4d4d8] hover:!bg-[#12151c] hover:text-white flex-shrink-0"
          >
            <Download size={16} className="shrink-0" />
          </Button>
        )}
        {children}
      </div>
    </div>
  );
}