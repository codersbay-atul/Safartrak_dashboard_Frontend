import React, { useState } from 'react';

const filters = [
  { label: "All", count: null, color: "bg-[#71717a]" },
  { label: "Moving", count: null, color: "bg-[#10b981]" },
  { label: "Idle", count: null, color: "bg-[#f59e0b]" },
  { label: "Critical", count: 1, color: "bg-[#f97316]" },
  { label: "Offline", count: null, color: "bg-[#ef4444]" }
];

const vehicles = [
  { id: 1, plate: "MH12AB3482", status: "Running", statusColor: "text-[#10b981]", driver: "Ramesh Kumar", info: "Last Seen 18 mins ago", speed: "52 km/h", location: "Mumbai" },
  { id: 2, plate: "MH09XY1234", status: "Idle", statusColor: "text-[#f59e0b]", driver: "Rahul Singh", info: "Stopped 12 min ago", speed: "52 km/h", location: "Pune" },
  { id: 3, plate: "MH14ZZ8765", status: "Running", statusColor: "text-[#10b981]", driver: "Ashok Sharma", info: "Running Now", speed: "52 km/h", location: "Mumbai" },
  { id: 4, plate: "MH09XY1234", status: "Idle", statusColor: "text-[#f59e0b]", driver: "Rahul Singh", info: "Stopped 12 min ago", speed: "52 km/h", location: "Pune" },
  { id: 5, plate: "MH12AB3482", status: "Running", statusColor: "text-[#10b981]", driver: "Suresh Patil", info: "Last Seen 18 mins ago", speed: "52 km/h", location: "Mumbai" },
  { id: 6, plate: "MH09XY1234", status: "Idle", statusColor: "text-[#f59e0b]", driver: "Rahul Singh", info: "Stopped 12 min ago", speed: "52 km/h", location: "Pune" },
];

export default function VehicleList({ onSelectVehicle }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="w-full bg-[#121214] border border-[#1f1f23] rounded-xl p-3 flex flex-col select-none overflow-hidden h-full">
      
      {/* Title */}
      <h3 className="text-[13px] font-bold text-white tracking-tight mb-2 shrink-0">
        Vehicle List
      </h3>

      {/* Filter Badges */}
      <div className="flex items-center gap-1 flex-wrap mb-2 shrink-0">
        {filters.map((filter) => (
          <button
            key={filter.label}
            onClick={() => setActiveFilter(filter.label)}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-medium transition-all duration-200 bg-[#18181b] border border-[#27272a] text-[#d4d4d8] hover:border-zinc-600
              ${activeFilter === filter.label ? "border-zinc-500 bg-zinc-800 text-white" : ""}`}
          >
            <span className={`w-1 h-1 rounded-sm ${filter.color}`} />
            {filter.label} {filter.count !== null && `(${filter.count})`}
          </button>
        ))}
      </div>

      {/* Vehicle Rows */}
      <div className="flex flex-col gap-1.5 justify-start overflow-y-auto pr-0.5 custom-scrollbar flex-1">
        {vehicles.slice(0, 6).map((vehicle) => {
          const isSelected = selectedId === vehicle.id;

          return (
            <div 
              key={vehicle.id} 
              className={`flex items-center justify-between py-2 px-2.5 rounded-lg border transition-all duration-200 w-full gap-2
                ${isSelected 
                  ? "bg-[#0c0c0e] border-[#a16207]/50 shadow-inner" 
                  : "bg-[#161619]/40 border-[#1f1f23]/60 hover:border-zinc-800"}`}
            >
              {/* Left Side Info */}
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-1.5 leading-tight">
                  <span className="text-[11.5px] font-bold text-white tracking-tight shrink-0">
                    {vehicle.plate}
                  </span>
                  <span className="text-[9px] text-zinc-600 shrink-0">•</span>
                  <span className={`text-[9.5px] font-semibold ${vehicle.statusColor} truncate`}>
                    {vehicle.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-[9px] text-zinc-500 truncate mt-0.5 max-w-35">
                  <span className="truncate">{vehicle.driver}</span>
                  <span className="shrink-0">•</span>
                  <span className="truncate">{vehicle.info}</span>
                </div>
              </div>

              {/* Right Side Info */}
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="text-right leading-none">
                  <p className="text-[10.5px] font-bold text-white">
                    {vehicle.speed}
                  </p>
                  <p className="text-[8px] text-zinc-500 mt-0.5 max-w-11.25 truncate">
                    {vehicle.location}
                  </p>
                </div>

                {/* Saare buttons default me same color ke hain, tap par highlight badlega */}
                <button 
                  onClick={() => {
                    if (vehicle.driver === "Ashok Sharma" && onSelectVehicle) {
                      setSelectedId(vehicle.id); 
                      onSelectVehicle(vehicle);
                    }
                  }}
                  className={`h-5 px-1.5 rounded text-[9px] font-medium transition-all shrink-0 cursor-pointer
                    ${isSelected
                      ? "text-[#FDBB24] border border-[#FDBB24] bg-[#FDBB24]/20 shadow"
                      : "text-[#a16207] border border-[#a16207]/30 bg-[#a16207]/5 hover:bg-[#a16207]/15"
                    }`}
                >
                  View Details
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}