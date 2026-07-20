import React from 'react';
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
  MapPin as TrackIcon, // Using MapPin variant for Track Live
  RotateCcw, // Replay icon alternative
  Share2 
} from 'lucide-react';

export default function VehicleRouteDetails({ vehicle, onViewRoute, onClose }) {
  return (
    <div className="w-full h-full bg-[#16161a] border border-[#1f1f23] rounded-xl p-3.5 flex flex-col justify-between select-none overflow-hidden font-sans text-zinc-100">
      
      {/* 1. Top Header Row (Reflects exact layout without X icon) */}
      <div className="flex items-center justify-between pb-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-[13px] font-bold text-white tracking-tight">
            Vehicle Details
          </h3>
          <span className="text-[9px] font-bold text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded-sm flex items-center gap-1 shrink-0">
            <span className="w-1 h-1 rounded-full bg-[#10b981]"></span> Running
          </span>
        </div>
        
        <button 
          onClick={() => {/* Telemetry refresh context execution logic handles here */}}
          className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <RefreshCw size={13} className="stroke-[2.5]" />
        </button>
      </div>

      {/* 2. Profile Core Info Section */}
      <div className="flex items-center justify-between my-2 shrink-0 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 bg-[#d9d9d9] rounded-md shrink-0" />
          <div className="leading-tight min-w-0">
            <h4 className="text-[12.5px] font-bold text-white tracking-tight truncate">
              {vehicle?.plate || "MH14ZZ8765"}
            </h4>
            <p className="text-[10px] text-zinc-500 font-medium truncate mt-0.5">
              {vehicle?.driver || "Ashok Sharma"}
            </p>
          </div>
        </div>
        <div className="text-right leading-tight shrink-0">
          <p className="text-[12.5px] font-bold text-white">118 km</p>
          <p className="text-[10px] text-zinc-500 font-medium mt-0.5">Remaining Distance</p>
        </div>
      </div>

      {/* 3. Timeline Tracker with Labels */}
      <div className="mb-3 mt-1.5 px-1 shrink-0">
        <div className="relative w-full h-3 flex items-center">
          <div className="absolute left-0 right-0 h-[2.5px] bg-[#2e2e36] rounded-full" />
          <div className="absolute left-0 w-[55%] h-[2.5px] bg-[#FDBB24] rounded-full" />
          
          {/* Timeline Nodes */}
          <div className="absolute left-0 w-2.5 h-2.5 rounded-full bg-[#16161a] border-2 border-[#FDBB24] transform -translate-x-1/2 z-10" />
          <div className="absolute left-[35%] w-2.5 h-2.5 rounded-full bg-[#16161a] border-2 border-[#FDBB24] transform -translate-x-1/2 z-10" />
          <div className="absolute left-[55%] text-[11px] transform -translate-x-1/2 z-20 select-none pb-0.5 pointer-events-none">
            🚚
          </div>
          <div className="absolute left-[68%] w-2.5 h-2.5 rounded-full bg-[#16161a] border-2 border-[#2e2e36] transform -translate-x-1/2 z-10" />
          <div className="absolute right-0 w-2.5 h-2.5 rounded-full bg-[#16161a] border-2 border-[#2e2e36] transform translate-x-1/2 z-10" />
        </div>
        
        {/* Source and Destination Labels */}
        <div className="flex items-center justify-between mt-1 text-[9px] text-zinc-400 font-medium">
          <span>Mumbai Warehouse</span>
          <span>Pune Distribution Center</span>
        </div>
      </div>

      <div className="border-b border-dashed border-[#232329] w-full shrink-0 mb-3" />

      {/* 4. Specifications Metric Stack */}
      <div className="flex flex-col flex-1 py-0.5 text-[10.5px] gap-y-3 overflow-y-auto pr-0.5 mb-3 scrollbar-none">
        
        {/* Speed */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Gauge size={12.5} className="text-zinc-500 shrink-0" /> <span className="truncate">Speed</span>
          </div>
          <span className="font-bold text-white shrink-0">{vehicle?.speed || "52 km/h"}</span>
        </div>

        {/* Fuel Level */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Fuel size={12.5} className="text-zinc-500 shrink-0" /> <span className="truncate">Fuel Level</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-bold text-white">{vehicle?.fuel || "82%"}</span>
            <div className="w-12 h-[3px] bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#22c55e] rounded-full" style={{ width: '82%' }} />
            </div>
          </div>
        </div>

        {/* Battery */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Battery size={12.5} className="text-zinc-500 shrink-0" /> <span className="truncate">Battery</span>
          </div>
          <span className="font-bold text-white shrink-0">12.8V</span>
        </div>

        {/* Engine Health */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <ShieldCheck size={12.5} className="text-zinc-500 shrink-0" /> <span className="truncate">Engine Health</span>
          </div>
          <span className="font-bold text-zinc-200 shrink-0">Excellent</span>
        </div>

        {/* Odometer */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Milestone size={12.5} className="text-zinc-500 shrink-0" /> <span className="truncate">Odometer</span>
          </div>
          <span className="font-bold text-white shrink-0">186,240 km</span>
        </div>

        {/* Trip Process */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Waypoints size={12.5} className="text-zinc-500 shrink-0" /> <span className="truncate">Trip Process</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-bold text-white">72%</span>
            <div className="w-12 h-[3px] bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#FDBB24] rounded-full" style={{ width: '72%' }} />
            </div>
          </div>
        </div>

        {/* ETA */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Clock size={12.5} className="text-zinc-500 shrink-0" /> <span className="truncate">ETA</span>
          </div>
          <span className="font-bold text-white shrink-0">1 hr 24 min</span>
        </div>

        {/* Current Address */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <MapPin size={12.5} className="text-zinc-500 shrink-0" /> <span className="truncate">Current Address</span>
          </div>
          <span className="font-bold text-white text-right truncate pl-4 max-w-[150px]">
            Andheri East, Mumbai
          </span>
        </div>

        {/* GPS Signal */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Radio size={12.5} className="text-zinc-500 shrink-0" /> <span className="truncate">Gps Signal</span>
          </div>
          <span className="font-bold text-white shrink-0">Strong</span>
        </div>

        {/* Ignition */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Key size={12.5} className="text-zinc-500 shrink-0" /> <span className="truncate">Ignition</span>
          </div>
          <span className="font-bold text-[#10b981] shrink-0">ON</span>
        </div>

        {/* Last Updated */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Calendar size={12.5} className="text-zinc-500 shrink-0" /> <span className="truncate">Last Updated</span>
          </div>
          <span className="font-bold text-zinc-200 shrink-0">12 Second ago</span>
        </div>

      </div>

      <div className="border-b border-dashed border-[#232329] w-full shrink-0 mb-3" />

      {/* 5. Image Style Action Footer Buttons (3 Columns Layout) */}
      <div className="grid grid-cols-3 gap-2 shrink-0">
        
        {/* Track Live Card */}
        <button 
          onClick={onViewRoute}
          className="flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-lg border border-[#232329] bg-transparent hover:bg-zinc-800/40 transition-colors text-center text-zinc-400 hover:text-white cursor-pointer"
        >
          <TrackIcon size={14} className="text-zinc-400" />
          <span className="text-[9.5px] font-semibold tracking-wide">Track Live</span>
        </button>

        {/* Replay Card */}
        <button 
          onClick={() => {/* Route dynamic history replay simulation here */}}
          className="flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-lg border border-[#232329] bg-transparent hover:bg-zinc-800/40 transition-colors text-center text-zinc-400 hover:text-white cursor-pointer"
        >
          <div className="flex items-center justify-center rotate-180 scale-x-[-1]">
            <RotateCcw size={14} className="text-zinc-400" />
          </div>
          <span className="text-[9.5px] font-semibold tracking-wide">Replay</span>
        </button>

        {/* Share Card */}
        <button 
          onClick={() => {/* Action context for shared links creation hook */}}
          className="flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-lg border border-[#232329] bg-transparent hover:bg-zinc-800/40 transition-colors text-center text-zinc-400 hover:text-white cursor-pointer"
        >
          <Share2 size={14} className="text-zinc-400" />
          <span className="text-[9.5px] font-semibold tracking-wide">Share</span>
        </button>
      </div>

    </div>
  );
}