import React from "react";
import { Route, Map, Timer, Pause } from "lucide-react";
import { StatCard } from "../../components/Ui/StatsCards";

const VEHICLE_STATS_DATA = [
  {
    id: "total-vehicles",
    icon: Route,
    value: "59 Vehicles",
    subtitle: "Across all fleet groups",
    bottomLabel: "Total Vehicles", // Bottom yellow footer text
    bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
    colorIcon: "text-[#ffd60a]",
    showArrow: false,
  },
  {
    id: "tracking",
    icon: Map,
    value: "53",
    subtitle: "GPS connected",
    bottomLabel: "Tracking",
    bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
    colorIcon: "text-[#ffd60a]",
    showArrow: false,
  },
  {
    id: "offline",
    icon: Timer,
    value: "6",
    subtitle: "Device disconnected",
    bottomLabel: "Offline",
    bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
    colorIcon: "text-[#ffd60a]",
    showArrow: false,
  },
  {
    id: "groups",
    icon: Pause,
    value: "8 Groups",
    subtitle: "Organized by operations",
    bottomLabel: "Device disconnected",
    bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
    colorIcon: "text-[#ffd60a]",
    showArrow: false,
  },
];

export default function VehicleStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-0 pt-0 select-none w-full shrink-0">
      {VEHICLE_STATS_DATA.map((card) => (
        <div key={card.id} className="min-h-[72px] [&>*]:h-full">
          <StatCard {...card} />
        </div>
      ))}
    </div>
  );
}