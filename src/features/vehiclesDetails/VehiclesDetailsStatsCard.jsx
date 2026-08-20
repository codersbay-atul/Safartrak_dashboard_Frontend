import React from "react";
import { Route, Map, Timer, Pause } from "lucide-react";
import { useVehicleSummary } from "../../hooks/useVehicleSummary";
import { MainStatsCard } from "../../components/Ui/MainLayoutUI/MainStatsCard";

export default function VehiclesDetailsStatsCard() {
  const { summary, isLoading } = useVehicleSummary();

  const VEHICLE_STATS_DATA = [
    {
      id: "total-vehicles",
      icon: Route,
      value: isLoading ? "..." : (summary?.totalVehicles ?? "-"),
      subtitle: "Across all fleet",
      bottomLabel: "Total Vehicles",
      bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
    {
      id: "active-vehicle",
      icon: Map,
      value: isLoading ? "..." : (summary?.active ?? "-"),
      subtitle: "Currently Running",
      bottomLabel: "Active Vehicles",
      bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
    {
      id: "in-maintenance",
      icon: Timer,
      value: isLoading ? "..." : (summary?.inMaintenance ?? "-"),
      subtitle: "Under Maintenance",
      bottomLabel: "In Maintenance",
      bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
    {
      id: "critical-alerts",
      icon: Pause,
      value: isLoading ? "..." : (summary?.criticalAlerts ?? "-"),
      subtitle: "Required Attention",
      bottomLabel: "Critical Alerts",
      bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-0 pt-0 select-none w-full shrink-0">
      {VEHICLE_STATS_DATA.map((card) => (
        <div key={card.id} className="min-h-[72px] [&>*]:h-full">
          <MainStatsCard {...card} />
        </div>
      ))}
    </div>
  );
}