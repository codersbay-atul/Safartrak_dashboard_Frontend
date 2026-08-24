import React from "react";
import { Truck, Circle, LocateOff } from "lucide-react";
import { useDashboardSummary } from "../../hooks/useDashboardSummary";
import { useNavigate } from "react-router-dom";
import { MainStatsCard } from "../../components/Ui/MainLayoutUI/MainStatsCard";
import {
  DASHBOARD_SUMMARY_PLACEHOLDER,
  mapDashboardSummary,
} from "./mapDashboardSummary";

const VALUE_SKELETON = (
  <span
    className="inline-block h-3.5 w-8 rounded bg-zinc-700/80 animate-pulse align-middle"
    aria-hidden="true"
  />
);

function buildStatsData(summary, { isLoading = false } = {}) {
  const values = summary ?? DASHBOARD_SUMMARY_PLACEHOLDER;
  const valueOrSkeleton = (value) => (isLoading ? VALUE_SKELETON : value);

  return [
    {
      id: "total",
      icon: Truck,
      value: valueOrSkeleton(values.totalVehicles),
      subtitle:
        values.InactiveVehicles === "Not Available" ||
        values.InactiveVehicles === "-"
          ? "Inactive Vehicles"
          : `${values.InactiveVehicles} Inactive Vehicles`,
      title: "Total Vehicles",
      bgIcon: "bg-[#3B2A00]",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
    {
      id: "Inactive_vehicles",
      icon: Circle,
      value: valueOrSkeleton(values.InactiveVehicles),
      subtitle: "69% of Total Fleet",
      title: "Inactive Vehicle",
      bgIcon: "bg-[#052E16]",
      colorIcon: "text-[#16A34A]",
      showArrow: true,
    },
    {
      id: "maintenance-due",
      icon: Circle,
      value: valueOrSkeleton(values.maintenanceDue),
      subtitle: "6% of Total Fleet",
      title: "Idle",
      bgIcon: "bg-[#3B2A00]",
      colorIcon: "text-[#ffd60a]",
      
    },
    {
      id: "offline_vehicles",
      icon: Circle,
      value: valueOrSkeleton(values.noGps),
      subtitle: "Need Attention",
      title: "Offline",
      bgIcon: "bg-[#450A0A]",
      colorIcon: "text-[#B91C1C]",
      
    },
    {
      id: "no-gps",
      icon: LocateOff,
      value: valueOrSkeleton(values.noGps),
      subtitle: "Last Sync: 12 sec ago",
      title: "No GPS",
      bgIcon: "bg-[#172554]",
      colorIcon: "text-[#3b82f6]",
      
    },
  ];
}

export default function StatsCard() {
  const { summary, isLoading, isError, data } = useDashboardSummary();
  const navigate = useNavigate();

  const showLoadingSkeleton = isLoading && !data;

  const resolvedSummary = isError
    ? DASHBOARD_SUMMARY_PLACEHOLDER
    : summary ??
      (data ? mapDashboardSummary(data) : null) ??
      DASHBOARD_SUMMARY_PLACEHOLDER;

  const statsData = buildStatsData(resolvedSummary, {
    isLoading: showLoadingSkeleton,
  });

  return (
    <div className="grid grid-cols-[repeat(5,minmax(0,1fr))] gap-1.5 min-[1152px]:gap-2 xl:gap-2.5 mt-0 pt-0 select-none w-full shrink-0 min-w-0">
      {statsData.map((card) => (
        <div key={card.id} className="min-h-[100px] xl:min-h-[112px] min-w-0 [&>*]:h-full">
          <MainStatsCard
            {...card}
            onClick={card.id === "Inactive_vehicles" ? () => navigate("/vehicles") : card.onClick}
          />
        </div>
      ))}
    </div>
  );
}