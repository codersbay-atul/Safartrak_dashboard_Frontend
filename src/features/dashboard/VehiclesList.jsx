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

const statusDotClass = {
  Running: "bg-[#10b981]",
  Idle: "bg-[#f59e0b]",
  Critical: "bg-[#f97316]",
  Offline: "bg-[#ef4444]",
};

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
    <div className="w-full h-full bg-[#121214] border border-[#1f1f23] rounded-xl p-3.5 flex flex-col select-none overflow-hidden">
      
      {/* Title */}
      <h3 className="text-[13px] font-bold text-white tracking-tight mb-2.5 shrink-0">
        Vehicle List
      </h3>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2.5 shrink-0 no-scrollbar flex-nowrap">
        {filters.map((filter) => (
          <button
            key={filter.label}
            onClick={() => setActiveFilter(filter.label)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all duration-200 shrink-0 cursor-pointer
              ${activeFilter === filter.label
                ? "bg-[#27272a] border border-[#3f3f46] text-white"
                : "bg-[#18181b] border border-transparent text-[#a1a1aa] hover:text-[#d4d4d8]"
              }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${filter.color}`} />
            {filter.label} {filter.count !== null && `(${filter.count})`}
          </button>
        ))}
      </div>

      {/* Vehicle Rows - Smooth layout redistribution */}
      <div className="flex flex-col gap-2.5 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {vehicles.map((vehicle) => {
          const isSelected = selectedId === vehicle.id;

          return (
            <div 
              key={vehicle.id}
              onClick={() => handleSelectVehicle(vehicle)}
              className={`flex items-center justify-between py-2.5 px-3.5 rounded-lg border transition-all duration-200 w-full gap-3 shrink-0
                ${isSelected 
                  ? "bg-[#18181b] border-[#FDBB24]/70" 
                  : "bg-[#161618] border-[#1f1f23] hover:border-[#27272a]"}`}
            >
              {/* Left Side Info */}
              <div className="min-w-0 flex-1 flex flex-col justify-center gap-1">
                <div className="flex items-center gap-1.5 leading-none min-w-0">
                  <span className="text-[12px] font-bold text-white tracking-tight shrink-0">
                    {vehicle.plate}
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      statusDotClass[vehicle.status] || "bg-zinc-500"
                    }`}
                  />
                  <span className={`text-[11px] font-semibold ${vehicle.statusColor} truncate`}>
                    {vehicle.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-[10px] text-[#71717a] truncate max-w-[160px]">
                  <span className="truncate">{vehicle.driver}</span>
                  <span className="shrink-0 text-[#52525b]">•</span>
                  <span className="truncate">{vehicle.info}</span>
                </div>
              </div>

              {/* Right Side Info */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right leading-tight">
                  <p className="text-[12px] font-bold text-white">
                    {vehicle.speed}
                  </p>
                  <p className="text-[10px] text-[#71717a] mt-0.5 max-w-[60px] truncate">
                    {vehicle.location}
                  </p>
                </div>

                <button 
                  onClick={(event) => {
                    event.stopPropagation();
                    handleSelectVehicle(vehicle);
                  }}
                  className={`h-7 px-2.5 rounded-md text-[10px] font-semibold transition-all shrink-0 cursor-pointer flex items-center justify-center whitespace-nowrap
                    ${isSelected
                      ? "text-[#FDBB24] border border-[#FDBB24] bg-[#FDBB24]/10"
                      : "text-[#FDBB24] border border-[#FDBB24]/40 bg-transparent hover:bg-[#FDBB24]/10"
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
