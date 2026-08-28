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
      id: "Inactive-vehicle",
      icon: Map,
      value: isLoading ? "..." : (summary?.Inactive ?? "-"),
      subtitle: "Currently Running",
      bottomLabel: "Inactive Vehicles",
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 min-[1152px]:gap-3.5 xl:gap-4 mt-0 pt-0 select-none w-full shrink-0">
      {VEHICLE_STATS_DATA.map((card) => (
        <div key={card.id} className="min-h-[112px] xl:min-h-[124px] [&>*]:h-full">
          <MainStatsCard
            {...card}
            padding="p-3 min-[1152px]:p-3.5 xl:p-4"
            footerSpacing="pt-2.5 mt-2"
          />
        </div>
      ))}
    </div>
  );
}