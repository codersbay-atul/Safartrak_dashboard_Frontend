import React from "react";
import {
  RefreshCw,
  Gauge,
  Fuel,
  Battery,
  ShieldCheck,
  Milestone,
  Waypoints,
  Clock,
  MapPin,
  Radio,
  Key,
  Calendar,
} from "lucide-react";

export default function DashboardVehicleDetails({ vehicle, onViewRoute }) {
  return (
    <div className="w-full h-full bg-[#16161a] border border-[#1f1f23] rounded-xl p-3.5 flex flex-col justify-between select-none overflow-hidden font-sans text-zinc-100">
      {/* 1. Header */}
      <div className="flex items-center justify-between pb-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-[15px] font-bold text-white tracking-tight">
            Vehicle Details
          </h3>
          <span className="text-[15px] font-bold text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded-sm flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" /> Running
          </span>
        </div>

        <button
          type="button"
          onClick={() => {}}
          className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <RefreshCw size={15} className="stroke-[2.5]" />
        </button>
      </div>

      {/* 2. Vehicle Summary */}
      <div className="flex items-center justify-between my-2 shrink-0 gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 bg-[#d9d9d9] rounded-md shrink-0" />
          <div className="leading-tight min-w-0">
            <h4 className="text-[15px] font-bold text-white tracking-tight truncate">
              {vehicle?.plate || "MH14ZZ8765"}
            </h4>
            <p className="text-[15px] text-zinc-500 font-medium truncate mt-0.5">
              {vehicle?.driver || "Ashok Sharma"}
            </p>
          </div>
        </div>
        <div className="text-right leading-tight shrink-0">
          <p className="text-[15px] font-bold text-white">118 km</p>
          <p className="text-[15px] text-zinc-500 font-medium mt-0.5">
            Remaining Distance
          </p>
        </div>
      </div>

      {/* 3. Trip Progress */}
      <div className="mb-3 mt-1.5 px-1 shrink-0">
        <div className="relative w-full h-4 flex items-center">
          <div className="absolute left-0 right-0 h-[2.5px] bg-[#2e2e36] rounded-full" />
          <div className="absolute left-0 w-[72%] h-[2.5px] bg-[#FDBB24] rounded-full" />
          <div className="absolute left-0 w-2.5 h-2.5 rounded-full bg-[#16161a] border-2 border-[#FDBB24] transform -translate-x-1/2 z-10" />
          <div className="absolute left-[38%] w-2.5 h-2.5 rounded-full bg-[#16161a] border-2 border-[#FDBB24] transform -translate-x-1/2 z-10" />
          <div className="absolute left-[72%] text-[15px] transform -translate-x-1/2 z-20 select-none pb-0.5 pointer-events-none">
            🚚
          </div>
          <div className="absolute right-0 w-2.5 h-2.5 rounded-full bg-[#16161a] border-2 border-[#2e2e36] transform translate-x-1/2 z-10" />
        </div>
        <p className="text-[15px] font-bold text-[#FDBB24] tracking-wide mt-1.5">
          72% Completed
        </p>
      </div>

      <div className="border-b border-dashed border-[#232329] w-full shrink-0 mb-3" />

      {/* 4. Vehicle Information List */}
      <div className="flex flex-col flex-1 py-0.5 text-[15px] gap-y-3 overflow-y-auto pr-0.5 mb-3 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Gauge size={15} className="text-zinc-500 shrink-0" />
            <span className="truncate">Speed</span>
          </div>
          <span className="font-bold text-white shrink-0">
            {vehicle?.speed || "52 km/h"}
          </span>
        </div>

        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Fuel size={15} className="text-zinc-500 shrink-0" />
            <span className="truncate">Fuel Level</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-bold text-white">82%</span>
            <div className="w-12 h-[3px] bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#22c55e] rounded-full" style={{ width: "82%" }} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Battery size={15} className="text-zinc-500 shrink-0" />
            <span className="truncate">Battery</span>
          </div>
          <span className="font-bold text-white shrink-0">12.8V</span>
        </div>

        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <ShieldCheck size={15} className="text-zinc-500 shrink-0" />
            <span className="truncate">Engine Health</span>
          </div>
          <span className="font-bold text-zinc-200 shrink-0">Excellent</span>
        </div>

        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Milestone size={15} className="text-zinc-500 shrink-0" />
            <span className="truncate">Odometer</span>
          </div>
          <span className="font-bold text-white shrink-0">186,240 km</span>
        </div>

        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Waypoints size={15} className="text-zinc-500 shrink-0" />
            <span className="truncate">Trip Progress</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-bold text-white">72%</span>
            <div className="w-12 h-[3px] bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#FDBB24] rounded-full" style={{ width: "72%" }} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Clock size={15} className="text-zinc-500 shrink-0" />
            <span className="truncate">ETA</span>
          </div>
          <span className="font-bold text-white shrink-0">1 hr 24 min</span>
        </div>

        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <MapPin size={15} className="text-zinc-500 shrink-0" />
            <span className="truncate">Current Address</span>
          </div>
          <span className="font-bold text-white text-right truncate pl-4 max-w-[150px]">
            Andheri East, Mumbai
          </span>
        </div>

        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Radio size={15} className="text-zinc-500 shrink-0" />
            <span className="truncate">GPS Signal</span>
          </div>
          <span className="font-bold text-white shrink-0">Strong</span>
        </div>

        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Key size={15} className="text-zinc-500 shrink-0" />
            <span className="truncate">Ignition</span>
          </div>
          <span className="font-bold text-[#10b981] shrink-0">ON</span>
        </div>

        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Calendar size={15} className="text-zinc-500 shrink-0" />
            <span className="truncate">Last Updated</span>
          </div>
          <span className="font-bold text-zinc-200 shrink-0">12 Second ago</span>
        </div>
      </div>

      <div className="border-b border-dashed border-[#232329] w-full shrink-0 mb-3" />

      {/* 5. Bottom Action */}
      <div className="shrink-0">
        <button
          type="button"
          onClick={onViewRoute}
          className="w-full h-10 rounded-lg text-[15px] font-bold text-[#FDBB24] border border-[#FDBB24]/30 bg-transparent hover:bg-[#FDBB24]/5 transition-all text-center flex items-center justify-center tracking-wide cursor-pointer"
        >
          View Route
        </button>
      </div>
    </div>
  );
}
