import React, { useState } from "react";
import { Search, ChevronRight } from "lucide-react";

export default function VehiclesDetailsInfo() {
  const [activeFilter, setActiveFilter] = useState("Active");

  const vehicles = [
    { id: "MH14ZZ8765", type: "Heavy Truck", driver: "Ashoke Sharma", fleet: "West Fleet", status: "Active" },
    { id: "MH14ZZ8766", type: "Heavy Truck", driver: "Ashoke Sharma", fleet: "West Fleet", status: "Active" },
    { id: "MH14ZZ8767", type: "Heavy Truck", driver: "Ashoke Sharma", fleet: "West Fleet", status: "Active" },
    { id: "MH14ZZ8768", type: "Heavy Truck", driver: "Ashoke Sharma", fleet: "West Fleet", status: "Active" },
  ];

  const filters = ["All Routes", "Active", "Maint.", "Idle", "Offline"];

  return (
    <aside className="w-full h-full bg-[#12151a] flex flex-col p-2.5 rounded-xl border border-gray-800/80 min-h-0 overflow-hidden">
      <h2 className="text-xs font-bold mb-1.5 text-white shrink-0 tracking-wide">Vehicles</h2>

      {/* Search Input */}
      <div className="relative mb-1.5 shrink-0">
        <input
          type="text"
          placeholder="Search routes..."
          className="w-full bg-[#161a20] text-[10px] text-gray-300 rounded-md pl-2 pr-7 py-1 focus:outline-none focus:ring-1 focus:ring-amber-500 border border-gray-800"
        />
        <Search className="w-3 h-3 absolute right-2 top-1.5 text-gray-400" />
      </div>

      {/* Filter Badges */}
      <div className="flex items-center gap-1 mb-1.5 overflow-x-auto no-scrollbar shrink-0 pb-0.5">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-1.5 py-0.5 rounded text-[9px] whitespace-nowrap transition flex items-center gap-1 shrink-0 ${
                isActive
                  ? "bg-gray-800 text-white border border-gray-700 font-medium"
                  : "bg-[#161a20] text-gray-400 hover:text-gray-200"
              }`}
            >
              {filter !== "All Routes" && (
                <span
                  className={`w-1 h-1 rounded-full ${
                    filter === "Active" ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
              )}
              {filter}
            </button>
          );
        })}
      </div>

      {/* Vehicles List Container */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-0.5 custom-scrollbar min-h-0">
        {vehicles.map((v, i) => (
          <div
            key={i}
            className="bg-[#161a20] p-2 rounded-lg border border-gray-800/80 hover:border-amber-500/50 transition flex items-center justify-between cursor-pointer group"
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[10.5px] text-white">{v.id}</span>
                <span className="text-[8px] bg-green-950/80 text-green-400 px-1 py-0.2 rounded font-medium border border-green-800/40 flex items-center gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-green-400"></span>
                  {v.status}
                </span>
              </div>
              <p className="text-[9px] text-gray-400 leading-tight">{v.type}</p>
              <p className="text-[8.5px] text-gray-500 leading-tight">{v.driver} • {v.fleet}</p>
            </div>
            <button className="w-5 h-5 rounded bg-[#202630] flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition shrink-0">
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}