import React from "react";
import { Truck, Gauge, Clock, Route, Timer } from "lucide-react";
import { StatCard } from "../../components/Ui/StatsCard"; 

const TRIP_STATS_DATA = [
  {
    id: "trip-progress",
    icon: Truck,
    value: "72%",
    subtitle: "118 km Remaining",
    title: "Trip Progress",
    bgIcon: "bg-[#FDBB24]/10 border border-[#FDBB24]/20",
    colorIcon: "text-[#FDBB24]",
    showArrow: false,
  },
  {
    id: "current-speed",
    icon: Gauge,
    value: "52 km/h",
    subtitle: "Average: 48 km/h",
    title: "Current Speed",
    bgIcon: "bg-[#FDBB24]/10 border border-[#FDBB24]/20",
    colorIcon: "text-[#FDBB24]",
    showArrow: true,
  },
  {
    id: "eta",
    icon: Clock,
    value: "1h 24m",
    subtitle: "Expected at 11:25 AM",
    title: "ETA",
    bgIcon: "bg-[#FDBB24]/10 border border-[#FDBB24]/20",
    colorIcon: "text-[#FDBB24]",
    showArrow: true,
  },
  {
    id: "distance-travelled",
    icon: Route,
    value: "186 km",
    subtitle: "118 km Remaining",
    title: "Distance Travelled",
    bgIcon: "bg-[#FDBB24]/10 border border-[#FDBB24]/20",
    colorIcon: "text-[#FDBB24]",
    showArrow: true,
  },
  {
    id: "trip-duration",
    icon: Timer,
    value: "2h 18m",
    subtitle: "Started at 08:42 AM",
    title: "Trip Duration",
    bgIcon: "bg-[#FDBB24]/10 border border-[#FDBB24]/20",
    colorIcon: "text-[#FDBB24]",
    showArrow: true,
  },
];

export default function TripStatsCards() {
  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-0 pt-0 select-none w-full shrink-0">
      {TRIP_STATS_DATA.map((card) => (
        <StatCard key={card.id} {...card} />
      ))}
    </div>
  );
}