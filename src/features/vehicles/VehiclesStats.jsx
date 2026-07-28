import React from "react";
import { Route, Map, Timer, Pause } from "lucide-react";
import { StatCard } from "../../components/Ui/StatsCards";
import { useVehicleSummary } from "../../hooks/useVehicleSummary";

export default function VehicleStats() {
  const { summary, isLoading } = useVehicleSummary();

  const cards = [
    {
      id: "total-vehicles",
      icon: Route,
      value: `${summary?.totalVehicles ?? "-"} Vehicles`,
      subtitle: "Across all fleet groups",
      bottomLabel: "Total Vehicles",
      bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
    {
      id: "tracking",
      icon: Map,
      value: summary?.tracking ?? "-",
      subtitle: "GPS connected",
      bottomLabel: "Tracking",
      bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
    {
      id: "offline",
      icon: Timer,
      value: summary?.offline ?? "-",
      subtitle: "Device disconnected",
      bottomLabel: "Offline",
      bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
    {
      id: "groups",
      icon: Pause,
      value: summary?.groups ? `${summary.groups} Groups` : "-",
      subtitle: "Organized by operations",
      bottomLabel: "Groups",
      bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-0 pt-0 select-none w-full shrink-0">
      {cards.map((card) => (
        <div key={card.id} className="min-h-[72px] [&>*]:h-full">
          <StatCard
            {...card}
            value={isLoading && !summary ? "Loading..." : card.value}
          />
        </div>
      ))}
    </div>
  );
}