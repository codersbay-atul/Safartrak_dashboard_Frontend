import React from 'react';
import { RefreshCw, X, Gauge, Fuel, Battery, ShieldCheck, Milestone, Waypoints, Clock, MapPin, Radio, Key, Calendar } from 'lucide-react';

export default function VehiclesDetail({ vehicle, onViewRoute, onClose }) {
  return (
    <div className="w-full h-full bg-[#16161a] border border-[#1f1f23] rounded-xl p-3 flex flex-col justify-between select-none overflow-hidden">
      
      {/* 1. Top Header Row (Optimized with Refresh + Close side-by-side) */}
      <div className="flex items-center justify-between pb-1.5 shrink-0 border-b border-zinc-800/40">
        <div className="flex items-center gap-1.5 min-w-0">
          <h3 className="text-[11.5px] sm:text-xs font-bold text-white tracking-tight truncate">
            Vehicle Details
          </h3>
          <span className="text-[8px] font-bold text-[#10b981] bg-[#10b981]/10 px-1.5 py-0.5 rounded-sm flex items-center gap-1 shrink-0">
            <span className="w-1 h-1 rounded-full bg-[#10b981]"></span> Running
          </span>
        </div>
        
        {/* Right Controls Container */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Refresh Action Trigger */}
          <button 
            onClick={() => {/* Refresh telemetry log context logic handles here */}}
            className="text-zinc-550 hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw size={11} className="stroke-[2.5]" />
          </button>
          
          {/* Close Action Trigger (Right of Refresh) */}
          <button 
            onClick={onClose}
            className="text-zinc-550 hover:text-rose-400 transition-colors cursor-pointer"
          >
            <X size={13} className="stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 2. Profile Core Info Section */}
      <div className="flex items-center justify-between my-2.5 shrink-0 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 bg-zinc-800 border border-zinc-700/50 rounded-md shadow-inner shrink-0 flex items-center justify-center">
            🚚
          </div>
          <div className="leading-tight min-w-0">
            <h4 className="text-[11px] sm:text-[12px] font-extrabold text-white tracking-tight truncate">
              {vehicle?.plate || "MH14ZZ8765"}
            </h4>
            <p className="text-[9px] text-zinc-500 font-medium truncate">
              {vehicle?.driver || "Ashok Sharma"}
            </p>
          </div>
        </div>
        <div className="text-right leading-tight shrink-0">
          <p className="text-[11px] sm:text-[12px] font-extrabold text-white">118 km</p>
          <p className="text-[9px] text-zinc-550 font-medium">Remaining</p>
        </div>
      </div>

      {/* 3. Timeline Tracker */}
      <div className="mb-2 mt-0.5 px-1 shrink-0">
        <div className="relative w-full h-3 flex items-center">
          <div className="absolute left-0 right-0 h-[1.5px] bg-zinc-800 rounded-full" />
          <div className="absolute left-0 w-[72%] h-[1.5px] bg-[#FDBB24] rounded-full" />
          <div className="absolute left-0 w-1.5 h-1.5 rounded-full bg-[#16161a] border-[1.5px] border-[#FDBB24] transform -translate-x-1/2 z-10" />
          <div className="absolute left-[38%] w-1.5 h-1.5 rounded-full bg-[#16161a] border-[1.5px] border-[#FDBB24] transform -translate-x-1/2 z-10" />
          <div className="absolute left-[72%] text-[10px] transform -translate-x-1/2 z-20 select-none pb-0.5 pointer-events-none">
            🚚
          </div>
          <div className="absolute right-0 w-1.5 h-1.5 rounded-full bg-[#16161a] border-[1.5px] border-zinc-700 transform translate-x-1/2 z-10" />
        </div>
        <p className="text-[8.5px] font-bold text-[#FDBB24] tracking-wide mt-1">72% Completed</p>
      </div>

      {/* 4. Specifications Metric Stack */}
      <div className="flex flex-col flex-1 py-1 text-[9.5px] sm:text-[10px] gap-y-2 overflow-y-auto pr-0.5 mb-1.5 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        
        {/* Speed */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-1.5 text-zinc-400 font-medium min-w-0">
            <Gauge size={11.5} className="text-zinc-550 shrink-0" /> <span className="truncate">Speed</span>
          </div>
          <span className="font-bold text-white shrink-0">{vehicle?.speed || "52 km/h"}</span>
        </div>

        {/* Fuel Level */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-1.5 text-zinc-400 font-medium min-w-0">
            <Fuel size={11.5} className="text-zinc-550 shrink-0" /> <span className="truncate">Fuel Level</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-bold text-white">82%</span>
            <div className="w-8 sm:w-10 h-[2.5px] bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#10b981] rounded-full" style={{ width: '82%' }} />
            </div>
          </div>
        </div>

        {/* Battery */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-1.5 text-zinc-400 font-medium min-w-0">
            <Battery size={11.5} className="text-zinc-550 shrink-0" /> <span className="truncate">Battery</span>
          </div>
          <span className="font-bold text-white shrink-0">12.8V</span>
        </div>

        {/* Engine Health */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-1.5 text-zinc-400 font-medium min-w-0">
            <ShieldCheck size={11.5} className="text-zinc-550 shrink-0" /> <span className="truncate">Engine Health</span>
          </div>
          <span className="font-bold text-zinc-200 shrink-0">Excellent</span>
        </div>

        {/* Odometer */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-1.5 text-zinc-400 font-medium min-w-0">
            <Milestone size={11.5} className="text-zinc-550 shrink-0" /> <span className="truncate">Odometer</span>
          </div>
          <span className="font-bold text-white shrink-0">186,240 km</span>
        </div>

        {/* Trip Process */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-1.5 text-zinc-400 font-medium min-w-0">
            <Waypoints size={11.5} className="text-zinc-550 shrink-0" /> <span className="truncate">Trip Process</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-bold text-white">72%</span>
            <div className="w-8 sm:w-10 h-[2.5px] bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#FDBB24] rounded-full" style={{ width: '72%' }} />
            </div>
          </div>
        </div>

        {/* ETA */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-1.5 text-zinc-400 font-medium min-w-0">
            <Clock size={11.5} className="text-zinc-550 shrink-0" /> <span className="truncate">ETA</span>
          </div>
          <span className="font-bold text-white shrink-0">1 hr 24m</span>
        </div>

        {/* Current Address */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-1.5 text-zinc-400 font-medium min-w-0">
            <MapPin size={11.5} className="text-zinc-550 shrink-0" /> <span className="truncate">Address</span>
          </div>
          <span className="font-bold text-white text-right truncate pl-2 max-w-[110px] sm:max-w-[130px]">
            Andheri E, Mumbai
          </span>
        </div>

        {/* GPS Signal */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-1.5 text-zinc-400 font-medium min-w-0">
            <Radio size={11.5} className="text-zinc-550 shrink-0" /> <span className="truncate">GPS</span>
          </div>
          <span className="font-bold text-white shrink-0">Strong</span>
        </div>

        {/* Ignition */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-1.5 text-zinc-400 font-medium min-w-0">
            <Key size={11.5} className="text-zinc-550 shrink-0" /> <span className="truncate">Ignition</span>
          </div>
          <span className="font-bold text-[#10b981] shrink-0">ON</span>
        </div>

        {/* Last Updated */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-1.5 text-zinc-400 font-medium min-w-0">
            <Calendar size={11.5} className="text-zinc-550 shrink-0" /> <span className="truncate">Last Updated</span>
          </div>
          <span className="font-bold text-zinc-300 shrink-0">12s ago</span>
        </div>

      </div>

      {/* 5. Action Footer Button */}
      <div className="pt-2 border-t border-zinc-800/20 shrink-0">
        <button 
          onClick={onViewRoute}
          className="w-full h-8 rounded-lg text-[10px] sm:text-[11px] font-bold text-[#FDBB24] border border-[#FDBB24]/30 bg-transparent hover:bg-[#FDBB24]/5 transition-all text-center flex items-center justify-center tracking-wide cursor-pointer"
        >
          View Route
        </button>
      </div>

    </div>
  );
}