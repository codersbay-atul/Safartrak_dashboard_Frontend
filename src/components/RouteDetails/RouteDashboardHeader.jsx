import React, { useState } from "react";
import { Search } from "lucide-react";
import Dropdown from "../Ui/DropDown"

export default function RouteDashboardHeader({ onFilterChange, onSearch }) {
  const [timeFilter, setTimeFilter] = useState("24h");
  const [regionFilter, setRegionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [fleetFilter, setFleetFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const timeOptions = [
    { label: "Last 24 Hours", value: "24h" },
    { label: "Last 7 Days", value: "7d" },
    { label: "Last 30 Days", value: "30d" },
  ];

  const regionOptions = [
    { label: "All Regions", value: "all" },
    { label: "Mumbai Zone", value: "mumbai" },
    { label: "Pune Zone", value: "pune" },
    { label: "Delhi NCR", value: "delhi" },
  ];

  const statusOptions = [
    { label: "All Status", value: "all" },
    { label: "Moving", value: "moving" },
    { label: "Idle", value: "idle" },
    { label: "Stopped", value: "stopped" },
  ];

  const fleetOptions = [
    { label: "All Fleets", value: "all" },
    { label: "Heavy Logistics", value: "heavy" },
    { label: "Express Delivery", value: "express" },
  ];

  // Helper handler
  const handleSelect = (key, value, setter) => {
    setter(value);
    if (onFilterChange) {
      onFilterChange(key, value);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 w-full select-none py-2 px-3 bg-[#121214] border border-[#1f1f23]/60 rounded-xl text-white">
      
      {/* Left Info Area */}
      <div className="min-w-0">
        <h1 className="text-sm sm:text-[14px] font-bold text-white tracking-tight leading-tight">
          Current Route
        </h1>
        <p className="mt-0.5 text-[9.5px] text-[#71717a] leading-normal truncate">
          Track the selected vehicle's current trip and route progress.
        </p>
      </div>

      {/* Right Actions Area */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full md:w-auto">
        
        {/* Custom Dropdown Filters */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-1.5 flex-1 sm:flex-initial">
          
          {/* Time Filter */}
          <Dropdown
            label="Time"
            options={timeOptions}
            selectedValue={timeFilter}
            onSelect={(val) => handleSelect("time", val, setTimeFilter)}
          />

          {/* Region Filter */}
          <Dropdown
            label="Region"
            options={regionOptions}
            selectedValue={regionFilter}
            onSelect={(val) => handleSelect("region", val, setRegionFilter)}
          />

          {/* Status Filter */}
          <Dropdown
            label="Status"
            options={statusOptions}
            selectedValue={statusFilter}
            onSelect={(val) => handleSelect("status", val, setStatusFilter)}
          />

          {/* Fleet Filter */}
          <Dropdown
            label="Fleet"
            options={fleetOptions}
            selectedValue={fleetFilter}
            onSelect={(val) => handleSelect("fleet", val, setFleetFilter)}
          />

        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-auto min-w-[130px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (onSearch) onSearch(e.target.value);
            }}
            placeholder="Search Vehicle..."
            className="w-full sm:w-36 md:w-40 pl-3 pr-8 py-1.5 text-[10px] sm:text-[10.5px] rounded-full bg-[#161619]/20 border border-[#27272a] placeholder-[#71717a] focus:outline-none focus:border-[#FDBB24] text-white transition-all"
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