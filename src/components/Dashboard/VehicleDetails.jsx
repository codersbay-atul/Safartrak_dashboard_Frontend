import React from 'react';
import { RefreshCw, Gauge, Fuel, Battery, ShieldCheck, Milestone, Waypoints, Clock, MapPin, Radio, Key, Calendar } from 'lucide-react';

// 1. prop mein "onViewRoute" aur "onClose" accept kiya
export default function VehicleDetails({ vehicle, onViewRoute, onClose }) {
  return (
    <div className="w-full h-full bg-[#16161a] border border-[#1f1f23] rounded-xl p-3 flex flex-col justify-between select-none overflow-hidden">
      
      {/* 1. Top Header Row */}
      <div className="flex items-center justify-between pb-1.5 shrink-0 border-b border-zinc-800/40">
        <div className="flex items-center gap-2">
          <h3 className="text-[12.5px] font-bold text-white tracking-tight">Vehicle Details</h3>
          <span className="text-[8.5px] font-bold text-[#10b981] bg-[#10b981]/10 px-1.5 py-0.5 rounded-sm flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#10b981]"></span> Running
          </span>
        </div>
        <button 
          onClick={onClose} // Optional: close trigger
          className="text-zinc-500 hover:text-white transition-colors"
        >
          <RefreshCw size={12} className="stroke-[2.5]" />
        </button>
      </div>

      {/* 2. Profile Core Info Section */}
      <div className="flex items-center justify-between my-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg shadow-inner shrink-0" />
          <div className="leading-none">
            <h4 className="text-[12px] font-extrabold text-white tracking-tight">
              {vehicle?.number || "MH14ZZ8765"}
            </h4>
            <p className="text-[9.5px] text-zinc-500 font-medium mt-0.5">
              {vehicle?.driver || "Ashok Sharma"}
            </p>
          </div>
        </div>
        <div className="text-right leading-none">
          <p className="text-[12px] font-extrabold text-white">118 km</p>
          <p className="text-[9.5px] text-zinc-500 font-medium mt-0.5">Remaining Distance</p>
        </div>
      </div>

      {/* 3. Timeline Tracker */}
      <div className="mb-2 mt-1 px-1 shrink-0">
        <div className="relative w-full h-4 flex items-center">
          <div className="absolute left-0 right-0 h-[2px] bg-zinc-800 rounded-full" />
          <div className="absolute left-0 w-[72%] h-[2px] bg-[#FDBB24] rounded-full" />
          <div className="absolute left-0 w-2 h-2 rounded-full bg-[#16161a] border-[2px] border-[#FDBB24] transform -translate-x-1/2 z-10" />
          <div className="absolute left-[38%] w-2 h-2 rounded-full bg-[#16161a] border-[2px] border-[#FDBB24] transform -translate-x-1/2 z-10" />
          <div className="absolute left-[72%] text-[13px] transform -translate-x-1/2 z-20 select-none pb-0.5 pointer-events-none">
            🚚
          </div>
          <div className="absolute right-0 w-2 h-2 rounded-full bg-[#16161a] border-[2px] border-zinc-700 transform translate-x-1/2 z-10" />
        </div>
        <p className="text-[10px] font-bold text-[#FDBB24] tracking-wide mt-1.5">72% Completed</p>
      </div>

      {/* 4. Specifications Metric Stack */}
      <div className="flex flex-col justify-between flex-1 py-1.5 text-[10.5px] gap-y-1">
        
        {/* Speed */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400 font-medium">
            <Gauge size={12} className="text-zinc-500 stroke-[2]" /> <span>Speed</span>
          </div>
          <span className="font-bold text-white">52 km/h</span>
        </div>

        {/* Fuel Level */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400 font-medium">
            <Fuel size={12} className="text-zinc-500 stroke-[2]" /> <span>Fuel Level</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-white">82%</span>
            <div className="w-12 h-[3px] bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#10b981] rounded-full" style={{ width: '82%' }} />
            </div>
          </div>
        </div>

        {/* Battery */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400 font-medium">
            <Battery size={12} className="text-zinc-500 stroke-[2]" /> <span>Battery</span>
          </div>
          <span className="font-bold text-white">12.8V</span>
        </div>

        {/* Engine Health */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400 font-medium">
            <ShieldCheck size={12} className="text-zinc-500 stroke-[2]" /> <span>Engine Health</span>
          </div>
          <span className="font-bold text-zinc-200">Excellent</span>
        </div>

        {/* Odometer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400 font-medium">
            <Milestone size={12} className="text-zinc-500 stroke-[2]" /> <span>Odometer</span>
          </div>
          <span className="font-bold text-white">186,240 km</span>
        </div>

        {/* Trip Process */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400 font-medium">
            <Waypoints size={12} className="text-zinc-500 stroke-[2]" /> <span>Trip Process</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-white">72%</span>
            <div className="w-12 h-[3px] bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#FDBB24] rounded-full" style={{ width: '72%' }} />
            </div>
          </div>
        </div>

        {/* ETA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400 font-medium">
            <Clock size={12} className="text-zinc-500 stroke-[2]" /> <span>ETA</span>
          </div>
          <span className="font-bold text-white">1 hr 24 min</span>
        </div>

        {/* Current Address */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400 font-medium shrink-0">
            <MapPin size={12} className="text-zinc-500 stroke-[2]" /> <span>Current Address</span>
          </div>
          <span className="font-bold text-white text-right truncate pl-4 max-w-[150px]">
            Andheri East, Mumbai
          </span>
        </div>

        {/* GPS Signal */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400 font-medium">
            <Radio size={12} className="text-zinc-500 stroke-[2]" /> <span>Gps Signal</span>
          </div>
          <span className="font-bold text-white">Strong</span>
        </div>

        {/* Ignition */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400 font-medium">
            <Key size={12} className="text-zinc-500 stroke-[2]" /> <span>Ignition</span>
          </div>
          <span className="font-bold text-[#10b981]">ON</span>
        </div>

        {/* Last Updated */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400 font-medium">
            <Calendar size={12} className="text-zinc-500 stroke-[2]" /> <span>Last Updated</span>
          </div>
          <span className="font-bold text-zinc-300">12 Second ago</span>
        </div>

      </div>

      {/* 5. Action Footer Button */}
      <div className="pt-2 shrink-0">
        <button 
          onClick={onViewRoute} // 2. Button par handler set kiya
          className="w-full h-8.5 rounded-lg text-[10.5px] font-bold text-[#FDBB24] border border-[#FDBB24]/30 bg-transparent hover:bg-[#FDBB24]/5 transition-all text-center flex items-center justify-center tracking-wide cursor-pointer"
        >
          View Route
        </button>
      </div>

    </div>
  );
}