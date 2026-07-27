import React from "react";
import { Navigation, Fuel, Gauge, MapPin, Clock } from "lucide-react";

export default function VehiclesQuickStats() {
  const topStats = [
    { label: "Distance Covered", value: "305 KM", sub: "Today", icon: Navigation },
    { label: "Fuel Consumption", value: "38.6 L", sub: "Today", icon: Fuel },
    { label: "Average Mileage", value: "6.2 km/L", sub: "This Week", icon: Gauge },
    { label: "Trips Completed", value: "3", sub: "Today", icon: MapPin },
    { label: "Engine Hours", value: "7 h 42 min", sub: "Today", icon: Clock },
  ];

  return (
    <div className="grid grid-cols-5 gap-2 w-full">
      {topStats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="bg-[#12151a] p-2 rounded-lg border border-gray-800/80 flex items-center gap-2"
          >
            <div className="w-6 h-6 rounded bg-[#1c2128] flex items-center justify-center text-amber-500 shrink-0">
              <Icon className="w-3 h-3" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[9.5px] text-gray-400 font-medium truncate leading-tight">{stat.label}</p>
              <h3 className="text-xs font-bold text-white tracking-tight leading-tight my-0.5">{stat.value}</h3>
              <span className="text-[8.5px] text-gray-500 leading-none block">{stat.sub}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}