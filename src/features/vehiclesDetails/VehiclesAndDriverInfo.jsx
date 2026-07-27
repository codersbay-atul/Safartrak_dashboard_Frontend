import React from "react";
import { Gauge, Fuel, Battery, Activity, Clock, MapPin, Radio, Zap, Navigation, AlertCircle } from "lucide-react";

export default function VehiclesAndDriverInfo() {
  return (
    <div className="w-full h-full bg-[#12151a] p-2.5 rounded-xl border border-gray-800/80 flex flex-col justify-between min-h-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-gray-800/80 shrink-0">
        <h3 className="font-bold text-[11px] text-white tracking-wide">Driver and Vehicle Information</h3>
        <span className="text-[10px] text-green-400 font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          Tracking
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] my-auto py-0.5">
        
        <div className="space-y-0.5">
          <div className="flex justify-between py-0.5 border-b border-gray-800/40"><span className="text-gray-400">Model</span><span className="font-semibold text-white">Prima 5530</span></div>
          <div className="flex justify-between py-0.5 border-b border-gray-800/40"><span className="text-gray-400">Year</span><span className="font-semibold text-white">2024</span></div>
          <div className="flex justify-between py-0.5 border-b border-gray-800/40"><span className="text-gray-400">VIN Number</span><span className="font-mono text-gray-200 text-[9px]">MAT4825GH1234567</span></div>
          <div className="flex justify-between py-0.5 border-b border-gray-800/40"><span className="text-gray-400">Engine Number</span><span className="font-mono text-gray-200 text-[9px]">ENG4825GHN7654321</span></div>
          <div className="flex justify-between py-0.5 border-b border-gray-800/40"><span className="text-gray-400">Color</span><span className="font-semibold text-white">White</span></div>
          <div className="flex justify-between py-0.5 border-b border-gray-800/40"><span className="text-gray-400">Vehicle Type</span><span className="font-semibold text-white">Heavy Truck</span></div>
          <div className="flex justify-between py-0.5 border-b border-gray-800/40"><span className="text-gray-400">Registration No</span><span className="font-mono text-amber-400 font-semibold">MH14AB3248</span></div>
          <div className="flex justify-between py-0.5 border-b border-gray-800/40"><span className="text-gray-400">Chassis No</span><span className="font-mono text-gray-200 text-[9px]">CHS4625ghn1234567</span></div>
          <div className="flex justify-between py-0.5 border-b border-gray-800/40"><span className="text-gray-400">Fuel Type</span><span className="font-semibold text-white">Diesel</span></div>
          <div className="flex justify-between py-0.5 border-b border-gray-800/40"><span className="text-gray-400">Capacity</span><span className="font-semibold text-white">12 Tons</span></div>
          <div className="flex justify-between py-0.5"><span className="text-gray-400">Odometer</span><span className="font-semibold text-white">45,682 km</span></div>
        </div>

        {/* Right Side Live Telematics */}
        <div className="space-y-0.5 border-l border-gray-800/60 pl-3">
          <div className="flex items-center justify-between py-0.5 border-b border-gray-800/40">
            <span className="text-gray-400 flex items-center gap-1.5"><Gauge className="w-3 h-3 text-amber-500" /> Speed</span>
            <span className="font-bold text-white">52 km/h</span>
          </div>
          <div className="flex items-center justify-between py-0.5 border-b border-gray-800/40">
            <span className="text-gray-400 flex items-center gap-1.5"><Fuel className="w-3 h-3 text-emerald-500" /> Fuel Level</span>
            <div className="flex items-center gap-1">
              <span className="font-bold text-white">82%</span>
              <div className="w-8 bg-gray-800 h-1 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full w-[82%]"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between py-0.5 border-b border-gray-800/40">
            <span className="text-gray-400 flex items-center gap-1.5"><Battery className="w-3 h-3 text-blue-400" /> Battery</span>
            <span className="font-bold text-white">12.8V</span>
          </div>
          <div className="flex items-center justify-between py-0.5 border-b border-gray-800/40">
            <span className="text-gray-400 flex items-center gap-1.5"><Activity className="w-3 h-3 text-emerald-400" /> Engine Health</span>
            <span className="font-bold text-emerald-400">Excellent</span>
          </div>
          <div className="flex items-center justify-between py-0.5 border-b border-gray-800/40">
            <span className="text-gray-400 flex items-center gap-1.5"><Gauge className="w-3 h-3 text-amber-400" /> Odometer</span>
            <span className="font-bold text-white">186,240 km</span>
          </div>
          <div className="flex items-center justify-between py-0.5 border-b border-gray-800/40">
            <span className="text-gray-400 flex items-center gap-1.5"><Clock className="w-3 h-3 text-amber-500" /> Trip Process</span>
            <div className="flex items-center gap-1">
              <span className="font-bold text-white">72%</span>
              <div className="w-8 bg-gray-800 h-1 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[72%]"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between py-0.5 border-b border-gray-800/40">
            <span className="text-gray-400 flex items-center gap-1.5"><Navigation className="w-3 h-3 text-cyan-400" /> ETA</span>
            <span className="font-semibold text-white">1 hr 24 min</span>
          </div>
          <div className="flex items-center justify-between py-0.5 border-b border-gray-800/40">
            <span className="text-gray-400 flex items-center gap-1.5"><MapPin className="w-3 h-3 text-red-400" /> Current Address</span>
            <span className="font-medium text-white truncate max-w-[85px]">Andheri East, Mumbai</span>
          </div>
          <div className="flex items-center justify-between py-0.5 border-b border-gray-800/40">
            <span className="text-gray-400 flex items-center gap-1.5"><Radio className="w-3 h-3 text-blue-400" /> Gps Signal</span>
            <span className="font-bold text-emerald-400">Strong</span>
          </div>
          <div className="flex items-center justify-between py-0.5 border-b border-gray-800/40">
            <span className="text-gray-400 flex items-center gap-1.5"><Zap className="w-3 h-3 text-green-400" /> Ignition</span>
            <span className="font-bold text-emerald-400">ON</span>
          </div>
          <div className="flex items-center justify-between py-0.5">
            <span className="text-gray-400 flex items-center gap-1.5"><AlertCircle className="w-3 h-3 text-gray-500" /> Last Updated</span>
            <span className="font-medium text-gray-300">12 Second ago</span>
          </div>
        </div>

      </div>
    </div>
  );
}