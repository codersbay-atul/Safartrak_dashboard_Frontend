import React, { useState, useEffect } from 'react';

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

export default function VehiclesList({ onSelectVehicle, selectedVehicle }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(() => selectedVehicle?.id ?? null);

  useEffect(() => {
    if (selectedVehicle?.id != null) {
      setSelectedId(selectedVehicle.id);
    }
  }, [selectedVehicle?.id]);

  const handleSelectVehicle = (vehicle) => {
    setSelectedId(vehicle.id);
    if (onSelectVehicle) onSelectVehicle(vehicle);
  };

  useEffect(() => {
    if (selectedVehicle) return;
    if (vehicles.length === 0) return;

    handleSelectVehicle(vehicles[0]);
  }, []);

  return (
    <div className="w-full h-full bg-[#121214] border border-[#1f1f23] rounded-xl py-3 px-3 flex flex-col select-none overflow-hidden">
      
      {/* Title */}
      <h3 className="text-[15px] font-bold text-white tracking-tight mb-1.5 shrink-0">
        Vehicle List
      </h3>

      <div className="flex items-center gap-1 overflow-x-auto pb-1.5 mb-2 shrink-0 no-scrollbar flex-nowrap sm:flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter.label}
            onClick={() => setActiveFilter(filter.label)}
            className={`flex items-center gap-1 px-2.5 py-1 sm:px-1.5 sm:py-0.5 rounded-full text-[12px] sm:text-[8.5px] font-medium transition-all duration-200 bg-[#18181b] border border-[#27272a] text-[#d4d4d8] hover:border-zinc-600 cursor-pointer shrink-0
              ${activeFilter === filter.label ? "border-zinc-500 bg-zinc-800 text-white" : ""}`}
          >
            <span className={`w-1 h-1 rounded-sm ${filter.color}`} />
            {filter.label} {filter.count !== null && `(${filter.count})`}
          </button>
        ))}
      </div>

      {/* Vehicle Rows - Smooth layout redistribution */}
      <div className="flex flex-col gap-1.5 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {vehicles.map((vehicle) => {
          const isSelected = selectedId === vehicle.id;

          return (
            <div 
              key={vehicle.id}
              onClick={() => handleSelectVehicle(vehicle)}
              className={`flex items-center justify-between py-2 px-3.5 sm:py-1.5 rounded-lg border transition-all duration-200 w-full gap-3 shrink-0
                ${isSelected 
                  ? "bg-[#0c0c0e] border-[#a16207]/50 shadow-inner" 
                  : "bg-[#161619]/40 border-[#1f1f23]/60 hover:border-zinc-800"}`}
            >
              {/* Left Side Info */}
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-1.5 leading-none flex-wrap sm:flex-nowrap">
                  <span className="text-[14px] sm:text-[10.5px] font-bold text-white tracking-tight shrink-0">
                    {vehicle.plate}
                  </span>
                  <span className="text-[15px] text-zinc-600 hidden sm:inline">•</span>
                  <span className={`text-[12px] sm:text-[8.5px] font-semibold ${vehicle.statusColor} truncate`}>
                    {vehicle.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-[8.5px] sm:text-[10px] text-zinc-500 truncate mt-1 max-w-[140px] sm:max-w-[120px]">
                  <span className="truncate">{vehicle.driver}</span>
                  <span className="shrink-0">•</span>
                  <span className="truncate">{vehicle.info}</span>
                </div>
              </div>

              {/* Right Side Info */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <div className="text-right leading-none">
                  <p className="text-[15px] sm:text-[9.5px] font-bold text-white">
                    {vehicle.speed}
                  </p>
                  <p className="text-[10px] sm:text-[7.5px] text-zinc-500 mt-0.5 max-w-[55px] truncate">
                    {vehicle.location}
                  </p>
                </div>

                <button 
                  onClick={(event) => {
                    event.stopPropagation();
                    handleSelectVehicle(vehicle);
                  }}
                  className={`h-6 sm:h-5 px-2.5 sm:px-1.5 rounded text-[10px] sm:text-[8.5px] font-bold transition-all shrink-0 cursor-pointer flex items-center justify-center
                    ${isSelected
                      ? "text-[#FDBB24] border border-[#FDBB24] bg-[#FDBB24]/20 shadow"
                      : "text-[#a16207] border border-[#a16207]/30 bg-[#a16207]/5 hover:bg-[#a16207]/15"
                    }`}
                >
                  Details
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}