import React, { useState } from "react";
import { Search, ChevronDown, MoreVertical, ArrowUpDown } from "lucide-react";

// Mock Data matching your UI
const MOCK_VEHICLES = [
  {
    id: "1",
    vehicleNumber: "MH12AB3482",
    vehicleCategory: "Heavy Truck",
    dateTime: "Jul 6, 2026\n10:42 AM",
    fleetGroup: "West Fleet",
    driverName: "Ashoke Sharma",
    driverType: "Heavy Truck",
    deviceStatus: "GPS connected",
    signalStrength: "Strong Signal",
    lastUpdated: "15 sec ago",
    status: "Offline",
    statusType: "offline", // red
  },
  {
    id: "2",
    vehicleNumber: "MH12AB3482",
    vehicleCategory: "Heavy Truck",
    dateTime: "Jul 6, 2026\n10:42 AM",
    fleetGroup: "West Fleet",
    driverName: "Ashoke Sharma",
    driverType: "Heavy Truck",
    deviceStatus: "GPS connected",
    signalStrength: "Strong Signal",
    lastUpdated: "15 sec ago",
    status: "Weak Signal",
    statusType: "warning", // yellow
  },
];

const STATUS_TABS = ["All", "Tracking", "Offline", "Maintenance", "Unassigned"];

export default function VehicleListTable() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full bg-[#121214] border border-[#1d1d20] rounded-xl overflow-hidden select-none">
      
      {/* ----------------- TOP HEADER CONTROLS ----------------- */}
      <div className="p-3 sm:p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[#1d1d20]">
        
        {/* Title & Pill Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <h2 className="text-[14px] font-bold text-white tracking-tight shrink-0">
            Vehicle List
          </h2>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {STATUS_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1 text-[10px] font-medium rounded-full transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#27272a] text-white"
                      : "bg-[#18181b]/60 text-[#71717a] hover:text-[#a1a1aa] hover:bg-[#18181b]"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Dropdown: Fleet Group */}
          <div className="relative">
            <select className="appearance-none bg-[#18181b]/40 border border-[#27272a] text-[#a1a1aa] text-[10px] rounded-full pl-3 pr-7 py-1 focus:outline-none focus:border-[#FDBB24] cursor-pointer">
              <option>Fleet Group</option>
            </select>
            <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
          </div>

          {/* Dropdown: Vehicle Type */}
          <div className="relative">
            <select className="appearance-none bg-[#18181b]/40 border border-[#27272a] text-[#a1a1aa] text-[10px] rounded-full pl-3 pr-7 py-1 focus:outline-none focus:border-[#FDBB24] cursor-pointer">
              <option>Vehicle Type</option>
            </select>
            <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
          </div>

          {/* Dropdown: Tracking Status */}
          <div className="relative">
            <select className="appearance-none bg-[#18181b]/40 border border-[#27272a] text-[#a1a1aa] text-[10px] rounded-full pl-3 pr-7 py-1 focus:outline-none focus:border-[#FDBB24] cursor-pointer">
              <option>Tracking status</option>
            </select>
            <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
          </div>

          {/* Search Input */}
          <div className="relative min-w-[140px] sm:min-w-[170px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Vehicle..."
              className="w-full bg-[#18181b] border border-[#27272a] text-white text-[10px] rounded-full pl-3 pr-7 py-1 placeholder-[#71717a] focus:outline-none focus:border-[#FDBB24] transition-all"
            />
            <Search size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
          </div>

        </div>
      </div>

      {/* ----------------- DATA TABLE ----------------- */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          
          {/* Table Header */}
          <thead>
            <tr className="bg-[#09090b] border-b border-[#1d1d20] text-[#71717a] text-[10px] font-medium">
              <th className="py-2.5 px-3 pl-4">Vehicle Number</th>
              <th className="py-2.5 px-3">
                <div className="flex items-center gap-1 cursor-pointer hover:text-white">
                  Vehicle Type
                  <ArrowUpDown size={10} />
                </div>
              </th>
              <th className="py-2.5 px-3">Fleet Group</th>
              <th className="py-2.5 px-3">Driver</th>
              <th className="py-2.5 px-3">Device Status</th>
              <th className="py-2.5 px-3">Last Updated</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right pr-4">Action</th>
            </tr>
          </thead>

          {/* Table Rows */}
          <tbody className="divide-y divide-[#1d1d20]/50 text-[10.5px]">
            {MOCK_VEHICLES.map((item) => (
              <tr key={item.id} className="hover:bg-[#18181b]/30 transition-colors">
                
                {/* 1. Vehicle Number */}
                <td className="py-3 px-3 pl-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded bg-[#27272a]/60 shrink-0" />
                    <div>
                      <p className="font-semibold text-white leading-tight">{item.vehicleNumber}</p>
                      <p className="text-[9px] text-[#71717a]">{item.vehicleCategory}</p>
                    </div>
                  </div>
                </td>

                {/* 2. Vehicle Type / Date */}
                <td className="py-3 px-3">
                  <p className="text-[#a1a1aa] leading-tight whitespace-pre-line">{item.dateTime}</p>
                </td>

                {/* 3. Fleet Group */}
                <td className="py-3 px-3">
                  <p className="text-[#a1a1aa] font-medium">{item.fleetGroup}</p>
                </td>

                {/* 4. Driver */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#27272a]/80 shrink-0" />
                    <div>
                      <p className="font-medium text-white leading-tight">{item.driverName}</p>
                      <p className="text-[8.5px] text-[#71717a]">{item.driverType}</p>
                    </div>
                  </div>
                </td>

                {/* 5. Device Status */}
                <td className="py-3 px-3">
                  <div>
                    <p className="font-medium text-emerald-500 leading-tight">{item.deviceStatus}</p>
                    <p className="text-[8.5px] text-[#71717a]">{item.signalStrength}</p>
                  </div>
                </td>

                {/* 6. Last Updated */}
                <td className="py-3 px-3 text-[#a1a1aa]">
                  {item.lastUpdated}
                </td>

                {/* 7. Status Badge */}
                <td className="py-3 px-3">
                  {item.statusType === "offline" ? (
                    <span className="inline-block px-2 py-0.5 text-[9px] font-semibold text-rose-400 bg-rose-950/50 border border-rose-900/60 rounded-full">
                      {item.status}
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-0.5 text-[9px] font-semibold text-amber-400 bg-amber-950/50 border border-amber-900/60 rounded-full">
                      {item.status}
                    </span>
                  )}
                </td>

                {/* 8. Action */}
                <td className="py-3 px-3 text-right pr-4">
                  <button className="text-[#71717a] hover:text-white p-1 rounded transition-colors cursor-pointer">
                    <MoreVertical size={13} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}