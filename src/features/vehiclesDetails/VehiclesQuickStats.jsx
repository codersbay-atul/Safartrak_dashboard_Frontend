import React from "react";
import { Navigation, Fuel, Gauge, MapPin, Clock } from "lucide-react";
import useVehicleStats from "../../hooks/useVehicleStats";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

export default function VehiclesQuickStats({ uniqueId }) {
  const { stats, isLoading } = useVehicleStats(uniqueId);

  const topStats = [
    {
      label: "Distance Covered",
      value: stats ? `${stats.distance_km ?? 0} KM` : isLoading ? "…" : "-",
      sub: stats?.period ?? "Today",
      icon: Navigation,
    },
    {
      label: "Fuel Consumption",
      value: stats ? `${stats.fuel_consumption_l ?? 0} L` : isLoading ? "…" : "-",
      sub: stats?.period ?? "Today",
      icon: Fuel,
    },
    {
      label: "Average Mileage",
      value: stats ? `${stats.average_mileage_kmpl ?? "-"} km/L` : isLoading ? "…" : "-",
      sub: stats?.mileage_period ?? "This Week",
      icon: Gauge,
    },
    {
      label: "Trips Completed",
      value: stats ? `${stats.trips_completed ?? 0}` : isLoading ? "…" : "-",
      sub: stats?.period ?? "Today",
      icon: MapPin,
    },
    {
      label: "Engine Hours",
      value: stats ? `${stats.engine_hours ?? 0} h` : isLoading ? "…" : "-",
      sub: stats?.period ?? "Today",
      icon: Clock,
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-2 w-full select-none font-sans">
      {topStats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <MainLayoutColor
            key={idx}
            as="div"
            background="surface"
            border="cardBorder"
            borderHover="cardBorderHover"
            className="border p-2.5 rounded-xl flex items-center gap-2.5 transition-all group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#ffd60a]/10 border border-[#ffd60a]/20 flex items-center justify-center text-[#ffd60a] shrink-0 group-hover:scale-105 transition-transform">
              <Icon className="w-3.5 h-3.5" />
            </div>

            <div className="min-w-0 flex-1">
              {/* 12px Label (500 weight) */}
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="font-medium truncate leading-tight block"
              >
                {stat.label}
              </MainLayoutColor>

              {/* 14px Value (500 weight) */}
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="title"
                size="sectionTitle"
                className="font-medium tracking-tight leading-snug my-0.5 truncate block"
              >
                {stat.value}
              </MainLayoutColor>

              {/* Badge Text */}
              <span className="text-[#71717a] bg-[#18181b] border border-[#27272a] px-1.5 py-0.5 rounded-md inline-block leading-none">
                <MainLayoutTextSize size="badgeText" className="font-medium">
                  {stat.sub}
                </MainLayoutTextSize>
              </span>
            </div>
          </MainLayoutColor>
        );
      })}
    </div>
  );
}