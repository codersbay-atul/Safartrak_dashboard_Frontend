import React from "react";
import {
  Gauge,
  Fuel,
  Battery,
  Activity,
  Clock,
  MapPin,
  Radio,
  Zap,
  Navigation,
  AlertCircle,
  Truck,
  User,
} from "lucide-react";

export default function VehiclesAndDriverInfo() {
  const vehicleDetails = [
    { label: "Model", value: "Prima 5530" },
    { label: "Year", value: "2024" },
    { label: "VIN Number", value: "MAT4825GH1234567", isMono: true },
    { label: "Engine Number", value: "ENG4825GHN7654321", isMono: true },
    { label: "Color", value: "White" },
    { label: "Vehicle Type", value: "Heavy Truck" },
    { label: "Registration No", value: "MH14AB3248", isAccent: true },
    { label: "Chassis No", value: "CHS4625GHN1234567", isMono: true },
    { label: "Fuel Type", value: "Diesel" },
    { label: "Capacity", value: "12 Tons" },
    { label: "Odometer", value: "45,682 km" },
  ];

  return (
    <div className="w-full h-full bg-[#121214] border border-[#27272a] p-3 rounded-xl flex flex-col justify-between min-h-0 overflow-hidden select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#27272a] shrink-0">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#ffd60a]" />
          <h3 className="font-bold text-[12px] text-white tracking-tight">
            Driver & Vehicle Information
          </h3>
        </div>
        
        {/* Live Status Badge */}
        <span className="text-[9.5px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Live Tracking
        </span>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-x-5 text-[10px] my-auto py-1 flex-1 items-center">
        
        {/* Left Side: Vehicle Details */}
        <div className="space-y-1">
          <div className="text-[9px] font-bold text-[#ffd60a] uppercase tracking-wider mb-1 flex items-center gap-1">
            <span>Vehicle Specifications</span>
          </div>

          {vehicleDetails.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-0.5 border-b border-[#27272a]/50 last:border-0"
            >
              <span className="text-[#a1a1aa] font-medium">{item.label}</span>
              <span
                className={`text-[10px] font-medium ${
                  item.isAccent
                    ? "text-[#ffd60a] font-bold"
                    : item.isMono
                    ? "font-mono text-[#d4d4d8] text-[9.5px]"
                    : "text-white"
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Right Side: Live Telematics */}
        <div className="space-y-1 border-l border-[#27272a] pl-4">
          <div className="text-[9px] font-bold text-[#ffd60a] uppercase tracking-wider mb-1 flex items-center gap-1">
            <span>Live Telematics</span>
          </div>

          {/* Speed */}
          <div className="flex items-center justify-between py-0.5 border-b border-[#27272a]/50">
            <span className="text-[#a1a1aa] flex items-center gap-1.5">
              <Gauge className="w-3 h-3 text-[#ffd60a]" /> Speed
            </span>
            <span className="font-bold text-white">52 km/h</span>
          </div>

          {/* Fuel Level */}
          <div className="flex items-center justify-between py-0.5 border-b border-[#27272a]/50">
            <span className="text-[#a1a1aa] flex items-center gap-1.5">
              <Fuel className="w-3 h-3 text-emerald-400" /> Fuel Level
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white">82%</span>
              <div className="w-10 bg-[#27272a] h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-[82%] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Battery */}
          <div className="flex items-center justify-between py-0.5 border-b border-[#27272a]/50">
            <span className="text-[#a1a1aa] flex items-center gap-1.5">
              <Battery className="w-3 h-3 text-sky-400" /> Battery
            </span>
            <span className="font-bold text-white">12.8V</span>
          </div>

          {/* Engine Health */}
          <div className="flex items-center justify-between py-0.5 border-b border-[#27272a]/50">
            <span className="text-[#a1a1aa] flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-emerald-400" /> Engine Health
            </span>
            <span className="font-bold text-emerald-400">Excellent</span>
          </div>

          {/* Trip Process */}
          <div className="flex items-center justify-between py-0.5 border-b border-[#27272a]/50">
            <span className="text-[#a1a1aa] flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-[#ffd60a]" /> Trip Progress
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white">72%</span>
              <div className="w-10 bg-[#27272a] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#ffd60a] h-full w-[72%] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* ETA */}
          <div className="flex items-center justify-between py-0.5 border-b border-[#27272a]/50">
            <span className="text-[#a1a1aa] flex items-center gap-1.5">
              <Navigation className="w-3 h-3 text-cyan-400" /> ETA
            </span>
            <span className="font-bold text-white">1 hr 24 min</span>
          </div>

          {/* Current Address */}
          <div className="flex items-center justify-between py-0.5 border-b border-[#27272a]/50">
            <span className="text-[#a1a1aa] flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-rose-400" /> Current Address
            </span>
            <span className="font-semibold text-white truncate max-w-[100px]" title="Andheri East, Mumbai">
              Andheri East, Mumbai
            </span>
          </div>

          {/* GPS Signal */}
          <div className="flex items-center justify-between py-0.5 border-b border-[#27272a]/50">
            <span className="text-[#a1a1aa] flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-indigo-400" /> GPS Signal
            </span>
            <span className="font-bold text-emerald-400">Strong</span>
          </div>

          {/* Ignition */}
          <div className="flex items-center justify-between py-0.5 border-b border-[#27272a]/50">
            <span className="text-[#a1a1aa] flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-emerald-400" /> Ignition
            </span>
            <span className="font-bold text-emerald-400">ON</span>
          </div>

          {/* Last Updated */}
          <div className="flex items-center justify-between py-0.5">
            <span className="text-[#a1a1aa] flex items-center gap-1.5">
              <AlertCircle className="w-3 h-3 text-[#71717a]" /> Last Updated
            </span>
            <span className="font-medium text-[#a1a1aa]">12 sec ago</span>
          </div>

        </div>

      </div>
    </div>
  );
}