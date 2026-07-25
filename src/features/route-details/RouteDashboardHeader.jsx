import React, { useState } from "react";
import { Search } from "lucide-react";
import Dropdown from "../../components/ui/DropDown"; // Path verify kar lena (Ui vs ui)

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

  const handleSelect = (key, value, setter) => {
    setter(value);
    if (onFilterChange) {
      onFilterChange(key, value);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 w-full select-none mt-0 pt-0 shrink-0">
      {/* Left Info Area */}
      <div className="min-w-0">
        <h1 className="text-[15px] sm:text-[17px] font-bold text-white tracking-tight leading-tight">
          Current Route
        </h1>
        <p className="text-[9px] sm:text-[10px] text-[#a1a1aa] leading-normal truncate max-w-xs sm:max-w-xl">
          Track the selected vehicle's current trip and route progress.
        </p>
      </div>

      {/* Right Actions Area */}
      <div className="flex items-center gap-1.5 w-full sm:w-auto shrink-0 justify-between sm:justify-end flex-wrap sm:flex-nowrap">
        
        {/* Custom Dropdown Filters */}
        <div className="flex items-center gap-1 shrink-0 flex-wrap sm:flex-nowrap">
          <Dropdown
            label="Time"
            options={timeOptions}
            selectedValue={timeFilter}
            onSelect={(val) => handleSelect("time", val, setTimeFilter)}
          />

          <Dropdown
            label="Region"
            options={regionOptions}
            selectedValue={regionFilter}
            onSelect={(val) => handleSelect("region", val, setRegionFilter)}
          />

          <Dropdown
            label="Status"
            options={statusOptions}
            selectedValue={statusFilter}
            onSelect={(val) => handleSelect("status", val, setStatusFilter)}
          />

          <Dropdown
            label="Fleet"
            options={fleetOptions}
            selectedValue={fleetFilter}
            onSelect={(val) => handleSelect("fleet", val, setFleetFilter)}
          />
        </div>

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
            placeholder="Search Vehicle..."
            className="w-full pl-7 pr-2.5 py-1 text-[10px] rounded-lg bg-[#18181b] border border-[#27272a] placeholder-[#71717a] focus:outline-none focus:border-[#FDBB24] text-white transition-all"
          />
        </div>

      </div>
    </div>
  );
}