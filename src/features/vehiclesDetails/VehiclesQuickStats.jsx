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
    <div className="grid grid-cols-5 gap-2 w-full select-none">
      {topStats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="bg-[#121214] border border-[#27272a] p-2.5 rounded-xl flex items-center gap-2.5 hover:border-[#3f3f46] transition-all group"
          >
            {/* Icon Wrapper */}
            <div className="w-7 h-7 rounded-lg bg-[#ffd60a]/10 border border-[#ffd60a]/20 flex items-center justify-center text-[#ffd60a] shrink-0 group-hover:scale-105 transition-transform">
              <Icon className="w-3.5 h-3.5" />
            </div>

            {/* Stat Content */}
            <div className="min-w-0 flex-1">
              <p className="text-[9.5px] text-[#a1a1aa] font-medium truncate leading-tight">
                {stat.label}
              </p>
              <h3 className="text-[12px] font-bold text-white tracking-tight leading-snug my-0.5 truncate">
                {stat.value}
              </h3>
              <span className="text-[8.5px] font-semibold text-[#71717a] bg-[#18181b] border border-[#27272a] px-1.5 py-0.2 rounded-md inline-block leading-none">
                {stat.sub}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}