import React, { useState } from "react";
import { Search, Calendar, ChevronDown } from "lucide-react";

const DATE_RANGE_OPTIONS = [
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "7days" },
  { label: "Last 30 Days", value: "30days" },
  { label: "Custom", value: "custom" },
];

export default function VehicleFilterReport({ onFilterChange, onGenerateReport, onReset }) {
  const [filters, setFilters] = useState({
    vehicle: "",
    dateRange: "",
    fromDate: "",
    toDate: "",
  });

  const [isRangeOpen, setIsRangeOpen] = useState(false);

  const handleInputChange = (field, value) => {
    const updated = { ...filters, [field]: value };
    setFilters(updated);
    if (onFilterChange) onFilterChange(updated);
  };

  const handleReset = () => {
    const resetData = {
      vehicle: "",
      dateRange: "",
      fromDate: "",
      toDate: "",
    };
    setFilters(resetData);
    if (onReset) onReset(resetData);
  };

  const handleGenerate = () => {
    if (onGenerateReport) onGenerateReport(filters);
  };

  return (
    <div className="w-full bg-[#121214] border border-[#27272a] rounded-2xl p-4 shadow-xl text-white select-none">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 flex-1 min-w-0">
          <div>
            <label className="block text-[11px] font-medium text-[#a1a1aa] mb-1.5">
              Vehicle
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search Vehicle..."
                value={filters.vehicle}
                onChange={(e) => handleInputChange("vehicle", e.target.value)}
                className="w-full bg-[#18181b]/80 border border-[#27272a] focus:border-[#ffd60a] rounded-full pl-4 pr-9 py-2 text-[12px] text-white placeholder-[#52525b] focus:outline-none transition-all"
              />
              <Search
                size={15}
                className="absolute right-3 text-[#71717a] pointer-events-none"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-[11px] font-medium text-[#a1a1aa] mb-1.5">
              Date Range
            </label>
            <button
              type="button"
              onClick={() => setIsRangeOpen((prev) => !prev)}
              className="w-full flex items-center justify-between bg-[#18181b]/80 border border-[#27272a] focus:border-[#ffd60a] rounded-full px-3.5 py-2 text-[12px] text-white focus:outline-none transition-all"
            >
              <div className="flex items-center gap-2 truncate">
                <Calendar size={15} className="text-[#a1a1aa] shrink-0" />
                <span className="truncate">
                  {DATE_RANGE_OPTIONS.find((opt) => opt.value === filters.dateRange)?.label || "Select Date Range"}
                </span>
              </div>
              <ChevronDown size={14} className="text-[#a1a1aa] shrink-0 ml-1" />
            </button>

            {isRangeOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-full z-50 bg-[#121215] border border-[#27272a] rounded-xl shadow-2xl py-1">
                {DATE_RANGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      handleInputChange("dateRange", opt.value);
                      setIsRangeOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-[11.5px] text-[#d4d4d8] hover:bg-[#1f1f23] hover:text-white transition-colors"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#a1a1aa] mb-1.5">
              From
            </label>
            <div className="relative flex items-center">
              <Calendar
                size={15}
                className="absolute left-3 text-[#a1a1aa] pointer-events-none z-10"
              />
              <input
                type="date"
                value={filters.fromDate}
                onChange={(e) => handleInputChange("fromDate", e.target.value)}
                className="w-full bg-[#121214] border border-[#27272a] focus:border-[#ffd60a] rounded-full pl-9 pr-3 py-2 text-[12px] text-white focus:outline-none appearance-none transition-all [color-scheme:dark]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#a1a1aa] mb-1.5">
              To
            </label>
            <div className="relative flex items-center">
              <Calendar
                size={15}
                className="absolute left-3 text-[#a1a1aa] pointer-events-none z-10"
              />
              <input
                type="date"
                value={filters.toDate}
                onChange={(e) => handleInputChange("toDate", e.target.value)}
                className="w-full bg-[#121214] border border-[#27272a] focus:border-[#ffd60a] rounded-full pl-9 pr-3 py-2 text-[12px] text-white focus:outline-none appearance-none transition-all [color-scheme:dark]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2 rounded-lg text-[12px] font-semibold text-[#d4d4d8] bg-[#18181b]/80 border border-[#27272a] hover:bg-[#27272a] transition-all cursor-pointer"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            className="px-5 py-2 rounded-lg text-[12px] font-bold text-black bg-[#ffd60a] hover:bg-[#e6c200] transition-all cursor-pointer shadow-md"
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}