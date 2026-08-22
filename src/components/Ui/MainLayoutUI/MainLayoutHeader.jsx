import React, { useState } from "react";
import { Download } from "lucide-react";
import MainLayoutColor from "./MainLayoutColor";
import MainLayoutTextSize from "./MainLayoutTextSize";
import MainLayoutButton from "./MainLayoutButton";
import MainSearchInput from "./MainSearchInput";
import MainDropDown from "./MainDropDown";
import MainHeaderActionButton from "./MainHeaderActionButton";

export default function MainLayoutHeader({
  title,
  subtitle,
  searchPlaceholder = "Search Vehicle...",
  searchIconPosition = "left",
  onSearch,
  onExportClick,
  exportLabel,
  onFilterChange,
  showSearch = true,
  showExport = true,
  showFilters = true,
  dateRangeOptions = null,
  dateRangeLabel = "Select Date Range",
  regionOptions = null,
  regionLabel = "Region",
  statusOptions = null,
  statusLabel = "Status",
  actionButtonLabel = null,
  actionButtonIcon = null,
  onActionClick = null,
  actionButtonClassName = "",
  actionButtons = null,
  customFilters,
  customRightAction,
  className = "",
  children,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    dateRange: "",
    region: "",
    status: "",
    fleet: "",
  });

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleFilterSelect = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  return (
    <div
      className={`flex flex-col lg:flex-row lg:items-center justify-between gap-3 xl:gap-4 w-full select-none mt-0 pt-0 shrink-0 min-w-0 overflow-visible ${className}`.trim()}
    >
      {/* Left Side: Title & Subtitle */}
      <div className="min-w-0 flex-1">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="title"
          className="block truncate font-bold text-white text-[17px] xl:text-[18px]"
        >
          {title}
        </MainLayoutColor>

        {subtitle && (
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subtitle"
            className="mt-0.5 block whitespace-normal break-words font-normal text-zinc-400 leading-snug"
          >
            {subtitle}
          </MainLayoutColor>
        )}
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-2 xl:gap-2.5 w-full lg:w-auto shrink-0 justify-between lg:justify-end min-w-0 flex-wrap overflow-visible z-20">
        {customRightAction}

        {/* 1. Dropdown Filters */}
        {showFilters && (
          <div className="flex w-full sm:w-auto flex-wrap items-center gap-2 overflow-visible relative z-30">
            {customFilters ? (
              customFilters
            ) : (
              <>
                {dateRangeOptions?.length > 0 && (
                  <MainDropDown
                    label={dateRangeLabel}
                    options={dateRangeOptions}
                    selectedValue={filters.dateRange}
                    onSelect={(value) => handleFilterSelect("dateRange", value)}
                  />
                )}
                {regionOptions?.length > 0 && (
                  <MainDropDown
                    label={regionLabel}
                    options={regionOptions}
                    selectedValue={filters.region}
                    onSelect={(value) => handleFilterSelect("region", value)}
                  />
                )}
                {statusOptions?.length > 0 && (
                  <MainDropDown
                    label={statusLabel}
                    options={statusOptions}
                    selectedValue={filters.status}
                    onSelect={(value) => handleFilterSelect("status", value)}
                  />
                )}
              </>
            )}
          </div>
        )}

        {/* 2. Search Box */}
        {showSearch && (
          <MainSearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={searchPlaceholder}
            iconPosition={searchIconPosition}
            containerClassName="w-full min-w-0 lg:w-[170px] xl:w-[210px]"
            className="!rounded-full !bg-[#0c0d12] !border-[#22252b] !text-[12px] h-[34px]"
          />
        )}

        {/* 3. Action Buttons */}
        {actionButtons?.length > 0 &&
          actionButtons.map((btn, index) => (
            <MainHeaderActionButton
              key={index}
              icon={btn.icon}
              iconPosition={btn.iconPosition || "left"}
              onClick={btn.onClick}
              variant={btn.variant}
              className={btn.className}
            >
              {btn.label}
            </MainHeaderActionButton>
          ))}

        {actionButtonLabel && (
          <MainHeaderActionButton
            icon={actionButtonIcon}
            iconPosition="right"
            onClick={onActionClick}
            className={`min-w-[100px] ${actionButtonClassName}`}
          >
            {actionButtonLabel}
          </MainHeaderActionButton>
        )}

        {/* Fallback Export */}
        {showExport && (
          <MainLayoutButton
            variant="secondary"
            size="sm"
            onClick={() => onExportClick?.({ ...filters, search: searchQuery })}
            aria-label="Download Data"
            className="!h-[34px] !w-[34px] !px-0 !py-0 !rounded-full !bg-[#0c0d12] !border-[#22252b] text-[#d4d4d8] hover:!bg-[#181920] hover:text-white flex-shrink-0"
          >
            <Download size={14} />
          </MainLayoutButton>
        )}

        {children}
      </div>
    </div>
  );
}